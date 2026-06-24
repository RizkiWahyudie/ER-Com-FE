"use client";

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

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HeadlineSection />
      <MediaCarousel />
      <TimelineSection />
      <PartnersSection />
      <TeamSection />
      <PortfolioSection />
      <ContactSection />
      <FooterSection />
    </>
  );
}
