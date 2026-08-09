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

export async function apiPostFormData(path, formData) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    body: formData,
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

// Items are the deepest navigable level (category → item). Their
// sub_items aren't a further navigation level — they're additional
// photos folded into the item's own gallery.
function mapServiceItem(item) {
  const thumb = toStorageUrl(item.thumbnail);
  const video = toStorageUrl(item.preview_video);

  const subMedia = Array.isArray(item.sub_items)
    ? item.sub_items
        .filter((sub) => sub.is_active !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((sub) => toStorageUrl(sub.thumbnail))
        .filter(Boolean)
        .map((src) => ({ type: "photo", src }))
    : [];

  const media = [
    ...(thumb ? [{ type: "photo", src: thumb }] : []),
    ...(video ? [{ type: "video", thumb, src: video }] : []),
    ...subMedia,
  ];

  return {
    title: item.name,
    image: thumb ?? video,
    photoCount: media.filter((m) => m.type === "photo").length,
    videoCount: media.filter((m) => m.type === "video").length,
    media,
  };
}

// An item counts as a "video" tile if it has a preview_video attached,
// regardless of whether it also has its own thumbnail image. Only
// items the CMS marked is_selected are eligible for the carousel.
function collectCategoryMedia(cat, limit = 4) {
  const media = [];
  const items = Array.isArray(cat.items)
    ? cat.items
        .filter((item) => item.is_active !== false && item.is_selected === true)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : [];

  for (const item of items) {
    const itemThumb = toStorageUrl(item.thumbnail);
    const isVideo = Boolean(item.preview_video);
    if (itemThumb || isVideo) {
      media.push({ src: itemThumb, type: isVideo ? "video" : "photo" });
      if (media.length >= limit) break;
    }

    const subItems = Array.isArray(item.sub_items)
      ? item.sub_items
          .filter((sub) => sub.is_active !== false)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      : [];
    for (const sub of subItems) {
      const subThumb = toStorageUrl(sub.thumbnail);
      if (subThumb) media.push({ src: subThumb, type: "photo" });
      if (media.length >= limit) break;
    }
    if (media.length >= limit) break;
  }

  if (media.length === 0) {
    const cover = toStorageUrl(cat.cover_image);
    if (cover) media.push({ src: cover, type: "photo" });
  }

  return media.slice(0, limit);
}

export async function getMediaCarouselSlides() {
  try {
    const data = await apiGet("/services");
    const categories = Array.isArray(data?.data) ? data.data : [];

    return categories
      .filter((cat) => cat.is_active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((cat) => ({
        tag: cat.name,
        imgs: collectCategoryMedia(cat),
      }))
      .filter((slide) => slide.imgs.length > 0);
  } catch {
    return [];
  }
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

// Same line-splitting as htmlToLines, but keeps the inline
// color from a wrapping <span style="color: ...">, since CMS
// headlines set color per line rather than on the whole block.
function htmlToColoredLines(html) {
  if (!html) return [];
  return html
    .replace(/<\/(p|div|h[1-6])>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .split("\n")
    .map((chunk) => {
      const colorMatch = chunk.match(/color:\s*([^;"']+)/i);
      const text = chunk
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/gi, " ")
        .replace(/\s+/g, " ")
        .trim();
      return text ? { text, color: colorMatch ? colorMatch[1].trim() : null } : null;
    })
    .filter(Boolean);
}

export async function getHeroSection(type) {
  try {
    const data = await apiGet(`/sections/hero/${type}`);
    if (!data) return null;
    return {
      headlineLines: htmlToColoredLines(data.headline),
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

export async function getPartnerLogos() {
  try {
    const clients = await apiGet("/clients");
    const data = Array.isArray(clients?.data) ? clients.data : [];
    return data
      .filter((client) => client.is_active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((client) => client.logo_image_url)
      .filter(Boolean);
  } catch {
    return [];
  }
}

export async function getTestimonials() {
  try {
    const testimonials = await apiGet("/testimonials");
    const data = Array.isArray(testimonials?.data) ? testimonials.data : [];
    return data
      .filter((item) => item.is_active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((item) => ({
        quote: item.testimonial_text?.replace(/<[^>]*>/g, "").trim() ?? "",
        name: item.name,
        role: item.company_role,
      }));
  } catch {
    return [];
  }
}

function formatBlogDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function mapBlogPost(post) {
  const plainContent = post.content?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() ?? "";
  return {
    id: post.slug,
    img: post.cover_image_url,
    title: post.title,
    desc: post.excerpt?.trim() || plainContent.slice(0, 180),
    content: post.content ?? "",
    author: post.author,
    date: formatBlogDate(post.published_at),
    category: post.category?.name ?? "",
  };
}

export async function getBlogPosts() {
  try {
    const data = await apiGet("/blog");
    const posts = Array.isArray(data?.data) ? data.data : [];
    return posts
      .filter((post) => post.is_published !== false)
      .map(mapBlogPost)
      .filter((post) => post.img);
  } catch {
    return [];
  }
}

export async function getBlogPost(slug) {
  try {
    const post = await apiGet(`/blog/${encodeURIComponent(slug)}`);
    if (!post?.slug) return null;
    return mapBlogPost(post);
  } catch {
    return null;
  }
}

export async function getBlogCategories() {
  try {
    const data = await apiGet("/blog-categories");
    const categories = Array.isArray(data) ? data : [];
    return categories
      .filter((cat) => cat.is_active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((cat) => cat.name);
  } catch {
    return [];
  }
}

export async function getClients() {
  try {
    const clients = await apiGet("/clients");
    const data = Array.isArray(clients?.data) ? clients.data : [];
    return data
      .filter((client) => client.is_active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((client) => ({
        src: client.logo_image_url,
        name: client.name,
        type: client.category?.name ?? "",
      }))
      .filter((client) => client.src);
  } catch {
    return [];
  }
}

export async function getClientCategories() {
  try {
    const data = await apiGet("/client-categories");
    const categories = Array.isArray(data) ? data : [];
    return categories
      .filter((cat) => cat.is_active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((cat) => cat.name);
  } catch {
    return [];
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

// /portfolio has no video data — these YouTube IDs are placeholders paired
// with real portfolio thumbnails until the CMS exposes an actual video field.
const PLACEHOLDER_VIDEO_IDS = ["dQw4w9WgXcQ", "jNQXAC9IVRw", "9bZkp7q19f0", "kJQP7kiw5Fk"];

export async function getHighlightGallery() {
  try {
    const data = await apiGet("/portfolio");
    const items = Array.isArray(data?.data) ? data.data : [];
    const published = items.filter((item) => item.is_published !== false && item.cover_image_url);

    const photos = published.map((item) => item.cover_image_url);

    const videos = published.map((item, idx) => ({
      id: PLACEHOLDER_VIDEO_IDS[idx % PLACEHOLDER_VIDEO_IDS.length],
      title: item.project_title ?? "ER Communication Highlight",
      thumb: item.cover_image_url,
    }));

    return { photos, videos };
  } catch {
    return { photos: [], videos: [] };
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

export async function getCareers() {
  try {
    const data = await apiGet("/careers");
    const careers = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
    return careers
      .filter((job) => job.is_active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((job) => ({
        slug: job.slug,
        title: job.title,
        employmentType: job.employment_type ?? "",
      }))
      .filter((job) => job.slug && job.title);
  } catch {
    return [];
  }
}

export async function submitCareerApplication(slug, { name, email, phone, address, cv }) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("address", address);
  formData.append("cv", cv);
  return apiPostFormData(`/careers/${encodeURIComponent(slug)}/apply`, formData);
}
