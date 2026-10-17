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
import { apiGet, getTeamSection, getPortfolioSection, getPartnerLogos, getTestimonials, getTimelineIntro, getTimelinePages } from "@/lib/api";

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

  const timelineIntro = await getTimelineIntro();
  const timelineItems = await getTimelinePages();

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
      <TeamSection members={teamMembers} porto={portfolioImages} />
      <PortfolioSection images={portfolioImages} />
      <ContactSection />
      <FooterSection />
    </>
  );
}
