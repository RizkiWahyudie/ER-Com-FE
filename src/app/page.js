import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HeadlineSection from "@/components/HeadlineSection";
import MediaCarousel from "@/components/MediaCarousel";
import TimelineSection from "@/components/TimelineSection";
import PartnersSection from "@/components/PartnersSection";
import TeamSection from "@/components/TeamSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import QuoteCarousel from "@/components/QuoteCarousel";
import { apiGet, getTeamSection, getPortfolioSection, getPartnerLogos, getTestimonials } from "@/lib/api";

export default async function HomePage() {
  let about = null;
  try {
    about = await apiGet("/sections/about");
  } catch {
    about = null;
  }

  let servicesSettings = null;
  try {
    const services = await apiGet("/sections/services");
    servicesSettings = services?.settings ?? null;
  } catch {
    servicesSettings = null;
  }

  let timelineIntro = null;
  try {
    const items = await apiGet("/about-section4-items");
    if (Array.isArray(items) && items.length > 0) {
      const firstItem = items
        .filter((item) => item.is_active !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))[0] ?? null;
      timelineIntro = firstItem && {
        ...firstItem,
        description: firstItem.description?.replace(/<[^>]*>/g, "").trim() ?? "",
      };
    }
  } catch {
    timelineIntro = null;
  }

  let timelineItems = null;
  try {
    const pages = await apiGet("/about-section4-pages");
    if (Array.isArray(pages) && pages.length > 0) {
      timelineItems = pages
        .filter((page) => page.is_active !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((page) => ({
          year: page.year,
          title: page.title,
          desc: page.description,
        }));
    }
  } catch {
    timelineItems = null;
  }

  const testimonials = await getTestimonials();

  const partnerLogos = await getPartnerLogos();

  const { members: teamMembers } = await getTeamSection();
  const { images: portfolioImages } = await getPortfolioSection();

  return (
    <>
      <Navbar />
      <HeroSection />
      <HeadlineSection about={about} servicesSettings={servicesSettings} />
      <MediaCarousel />
      <TimelineSection intro={timelineIntro} items={timelineItems} />
      <QuoteCarousel testimonials={testimonials} />
      <PartnersSection logos={partnerLogos} />
      <TeamSection members={teamMembers} />
      <PortfolioSection images={portfolioImages} />
      <ContactSection />
      <FooterSection />
    </>
  );
}
