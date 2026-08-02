const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://cms-ercommunication.arunikasolusiinovasi.tech/api/v1";
const STORAGE_BASE_URL = API_BASE_URL.replace(/\/api\/v1\/?$/, "");

// CMS rich-text fields sometimes come wrapped in block-level tags
// (<h1>-<h6>, <p>, <div>). Injecting those as-is nests a block element
// inside the Chakra Heading/Text that renders it, and the nested tag's
// own default font-size overrides the size we set on the outer element.
// Strip the wrapper tags (turning them into line breaks) while keeping
// inline formatting like <strong>, <span style="color:...">, and <br>.
export function sanitizeRichText(html) {
  if (!html) return "";
  return html
    .replace(/<\/(h[1-6]|p|div)>\s*/gi, "<br/>")
    .replace(/<(h[1-6]|p|div)[^>]*>/gi, "")
    .replace(/(<br\s*\/?>\s*)+$/i, "")
    .trim();
}

export async function apiGet(path) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status}`);
  }

  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message ?? `Failed to post ${path}: ${res.status}`);
  }

  return data;
}

export async function getAboutFeatures() {
  try {
    const data = await apiGet("/about-sections");
    const items = Array.isArray(data) ? data : [];
    return items
      .filter((item) => item.is_active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((item) => ({
        title: item.title,
        desc: item.description?.replace(/<[^>]*>/g, "").trim() ?? "",
      }));
  } catch {
    return [];
  }
}

export async function getAboutMilestones() {
  try {
    const data = await apiGet("/about-milestones");
    const items = Array.isArray(data?.data)
      ? data.data
          .filter((item) => item.is_active !== false)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((item) => ({
            year: item.year,
            title: item.headline,
            desc: sanitizeRichText(item.headline_description),
          }))
      : [];
    return { settings: data?.settings ?? null, items };
  } catch {
    return { settings: null, items: [] };
  }
}

export async function getGridServices() {
  try {
    const data = await apiGet("/services");
    const items = Array.isArray(data?.data) ? data.data : [];
    return items
      .filter((item) => item.is_active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((item) => ({
        title: item.name,
        img: item.cover_image ? `${STORAGE_BASE_URL}/storage/${item.cover_image}` : null,
      }))
      .filter((item) => item.img);
  } catch {
    return [];
  }
}

function toStorageUrl(path) {
  return path ? `${STORAGE_BASE_URL}/storage/${path}` : null;
}

function sumCounts(nodes) {
  return nodes.reduce(
    (acc, node) => ({
      photoCount: acc.photoCount + node.photoCount,
      videoCount: acc.videoCount + node.videoCount,
    }),
    { photoCount: 0, videoCount: 0 }
  );
}

function mapServiceSubItem(subItem) {
  const image = toStorageUrl(subItem.thumbnail);
  const media = image ? [{ type: "photo", src: image }] : [];
  return {
    title: subItem.name,
    image,
    photoCount: media.length,
    videoCount: 0,
    media,
  };
}

function mapServiceItem(item) {
  const children = Array.isArray(item.sub_items)
    ? item.sub_items
        .filter((sub) => sub.is_active !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map(mapServiceSubItem)
    : [];

  const thumb = toStorageUrl(item.thumbnail);
  const video = toStorageUrl(item.preview_video);
  const hasChildren = children.length > 0;

  const ownMedia = [
    ...(thumb ? [{ type: "photo", src: thumb }] : []),
    ...(video ? [{ type: "video", thumb, src: video }] : []),
  ];

  const counts = hasChildren
    ? sumCounts(children)
    : {
        photoCount: ownMedia.filter((m) => m.type === "photo").length,
        videoCount: ownMedia.filter((m) => m.type === "video").length,
      };

  return {
    title: item.name,
    image: thumb ?? video,
    photoCount: counts.photoCount,
    videoCount: counts.videoCount,
    children: hasChildren ? children : undefined,
    media: hasChildren ? undefined : ownMedia,
  };
}

export async function getServicesListSection() {
  try {
    const data = await apiGet("/services");
    const categories = Array.isArray(data?.data) ? data.data : [];

    return categories
      .filter((cat) => cat.is_active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((cat) => {
        const children = Array.isArray(cat.items)
          ? cat.items
              .filter((item) => item.is_active !== false)
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
              .map(mapServiceItem)
          : [];
        const counts = sumCounts(children);
        return {
          title: cat.name,
          image: toStorageUrl(cat.cover_image),
          colSpan: 1,
          photoCount: counts.photoCount,
          videoCount: counts.videoCount,
          children,
        };
      });
  } catch {
    return [];
  }
}

function htmlToLines(html) {
  if (!html) return [];
  return html
    .replace(/<\/(p|div|h[1-6])>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

export async function getHeroSection(type) {
  try {
    const data = await apiGet(`/sections/hero/${type}`);
    if (!data) return null;
    return {
      headlineLines: htmlToLines(data.headline),
      subheadline: htmlToLines(data.subheadline).join(" "),
      backgroundImage: data.background_image_url ?? null,
    };
  } catch {
    return null;
  }
}

export async function getAboutSection() {
  try {
    const data = await apiGet("/sections/about");
    if (!data) return null;
    return {
      headline: sanitizeRichText(data.headline),
      description: sanitizeRichText(data.description),
    };
  } catch {
    return null;
  }
}

export async function getPortfolioSection() {
  try {
    const data = await apiGet("/portfolio");
    const items = Array.isArray(data?.data) ? data.data : [];
    const images = items
      .filter((item) => item.is_published !== false)
      .map((item) => item.cover_image_url)
      .filter(Boolean);
    return { images };
  } catch {
    return { images: [] };
  }
}

const FALLBACK_STATS = [
  { stat_label: "Clients", stat_number: "500+" },
  { stat_label: "Achievements", stat_number: "57+" },
];

export async function getStatsSection() {
  try {
    const data = await apiGet("/stats");
    if (Array.isArray(data) && data.length > 0) {
      return data
        .filter((stat) => stat.is_active !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }
    return FALLBACK_STATS;
  } catch {
    return FALLBACK_STATS;
  }
}

export async function getTeamSection() {
  try {
    const data = await apiGet("/sections/team");
    const members = Array.isArray(data?.members)
      ? data.members
          .filter((member) => member.is_active !== false)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((member) => ({
            name: member.name,
            role: member.position,
            img: member.photo_url,
            whatsapp: member.whatsapp,
            email: member.email,
          }))
      : [];
    return { settings: data?.settings ?? null, members };
  } catch {
    return { settings: null, members: [] };
  }
}
