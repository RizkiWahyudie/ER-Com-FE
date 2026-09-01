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
        icon: item.icon ?? null,
      }));
  } catch {
    return [];
  }
}

export async function getTimelineIntro() {
  try {
    const data = await apiGet("/about-section4-items");
    const items = Array.isArray(data) ? data : [];
    const firstItem = items
      .filter((item) => item.is_active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))[0];

    if (!firstItem) return null;

    return {
      year: firstItem.year,
      description: firstItem.description?.replace(/<[^>]*>/g, "").trim() ?? "",
    };
  } catch {
    return null;
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
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${STORAGE_BASE_URL}/storage/${path}`;
}

// Pulls the 11-char video ID out of any common YouTube URL shape
// (watch?v=, youtu.be/, embed/, shorts/) while ignoring extra query
// params like &list=... or &start_radio=... that CMS users paste in.
function extractYoutubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:.*[?&]v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

// YouTube exposes a predictable, no-auth thumbnail endpoint; Vimeo and
// uploaded/direct video files have no equivalent, so this only ever
// resolves for YouTube links.
function getVideoThumbnail(url) {
  const videoId = extractYoutubeId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
}

function isVimeoUrl(url) {
  return /vimeo\.com\//i.test(String(url ?? ""));
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
function normalizeMediaArray(mediaArray) {
  if (!Array.isArray(mediaArray)) return [];
  return mediaArray
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((m) => {
      if (m.media_type === "youtube") {
        const videoId = extractYoutubeId(m.youtube_url);
        return { type: "video", thumb: m.thumbnail_url || getVideoThumbnail(m.youtube_url), videoId };
      }
      if (m.media_type === "video") {
        return { type: "video", thumb: m.thumbnail_url, src: toStorageUrl(m.file_url) };
      }
      return { type: "photo", src: toStorageUrl(m.file_url) || m.thumbnail_url };
    });
}

function mapServiceItem(item) {
  const itemMedia = normalizeMediaArray(item.media);
  
  const subMedia = Array.isArray(item.sub_items)
    ? item.sub_items
        .filter((sub) => sub.is_active !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .flatMap((sub) => normalizeMediaArray(sub.media))
    : [];

  const media = [...itemMedia, ...subMedia];
  const coverImage = toStorageUrl(item.cover_image) || toStorageUrl(item.thumbnail);

  return {
    title: item.name,
    image: media[0]?.src || media[0]?.thumb || coverImage,
    desc: item.description,
    photoCount: media.filter((m) => m.type === "photo").length,
    videoCount: media.filter((m) => m.type === "video").length,
    media,
  };
}

function collectCategoryMedia(cat, limit = 4) {
  const media = normalizeMediaArray(cat.media);
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
        const catMedia = normalizeMediaArray(cat.media);
        const children = Array.isArray(cat.items)
          ? cat.items
              .filter((item) => item.is_active !== false)
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
              .map(mapServiceItem)
          : [];
        const counts = sumCounts(children);
        
        return {
          title: cat.name,
          image: catMedia[0]?.src || catMedia[0]?.thumb || toStorageUrl(cat.cover_image),
          media: catMedia.length > 0 ? catMedia : [],
          colSpan: 1,
          photoCount: catMedia.filter(m => m.type === "photo").length || counts.photoCount,
          videoCount: catMedia.filter(m => m.type === "video").length || counts.videoCount,
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
    // Video-only items (no uploaded cover) still need a tile. YouTube links
    // get their official thumbnail; uploaded/direct video files are handed
    // to the client as a video source so it can show the first frame itself.
    // Vimeo has no no-auth thumbnail endpoint, so it's dropped like before.
    const images = items
      .filter((item) => item.is_published !== false)
      .map((item) => {
        if (item.cover_image_url) return { type: "image", src: item.cover_image_url };

        const youtubeThumb = getVideoThumbnail(item.preview_video);
        if (youtubeThumb) return { type: "image", src: youtubeThumb };

        if (item.preview_video_url && !isVimeoUrl(item.preview_video)) {
          return { type: "video", src: item.preview_video_url };
        }

        return null;
      })
      .filter(Boolean);
    return { images };
  } catch {
    return { images: [] };
  }
}

// preview_video can be a relative path to an uploaded file, or (if the CMS
// user pastes one) a full YouTube/Vimeo/direct-file URL. Detect which so the
// popup knows whether to embed a provider iframe or play a native <video>.
// preview_video_url is the CMS's own pre-resolved absolute URL for uploaded
// files, so it's preferred over reconstructing the storage path by hand.
function resolvePreviewVideo(raw, resolvedUrl) {
  if (!raw && !resolvedUrl) return null;
  const value = String(raw ?? resolvedUrl).trim();
  if (!value) return null;

  const youtubeMatch = value.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/i
  );
  if (youtubeMatch) {
    return { kind: "embed", embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&rel=0` };
  }

  const vimeoMatch = value.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeoMatch) {
    return { kind: "embed", embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1` };
  }

  const src = resolvedUrl ?? (/^https?:\/\//i.test(value) ? value : toStorageUrl(value));
  return { kind: "file", src };
}

export async function getHighlightGallery() {
  try {
    const data = await apiGet("/portfolio");
    const items = Array.isArray(data?.data) ? data.data : [];
    // A video-only item (no cover uploaded) still has cover_image_url === null,
    // so it must not be dropped just for lacking a thumbnail.
    const published = items.filter(
      (item) => item.is_published !== false && (item.cover_image_url || item.preview_video_url)
    );

    const photos = published.map((item) => item.cover_image_url).filter(Boolean);

    const videos = published.map((item) => {
      const video = resolvePreviewVideo(item.preview_video, item.preview_video_url);
      return {
        type: video ? "video" : "image",
        video,
        title: item.project_title ?? "ER Communication Highlight",
        thumb: item.cover_image_url ?? null,
      };
    });

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
            silhouette: member.photo_silhouette_url ?? member.photo_url,
            whatsapp: member.whatsapp,
            email: member.email,
            bgImg: member.background_image_url,
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

export async function getSocialSection() {
  try {
    const data = await apiGet("/sections/social");
    const items = Array.isArray(data?.social_media) ? data.social_media : [];
    return {
      whatsapp: data?.whatsapp_number ?? null,
      copyright: data?.copyright_text ?? null,
      links: items
        .map((item) => ({ url: item.url, icon: item.icon, label: item.label }))
        .filter((item) => item.url),
    };
  } catch {
    return { whatsapp: null, copyright: null, links: [] };
  }
}

export async function getContactInfo() {
  try {
    const data = await apiGet("/contacts");
    const items = Array.isArray(data) ? data : [];
    const activeContacts = items
      .filter((item) => item.is_active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    if (activeContacts.length === 0) return [];

    return activeContacts.map((contact) => ({
      label: contact.label ?? "",
      address: contact.address ?? "",
      phone: contact.phone ?? "",
      email: contact.email ?? "",
      mapEmbedUrl: contact.map_embed_url ?? null,
    }));
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
