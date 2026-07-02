"use client";

import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ServicesHeroSection from "@/components/ServicesHeroSection";
import ServicesListSection from "@/components/ServicesListSection";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <ServicesHeroSection />
      <ServicesListSection />
      <FooterSection />
    </>
  );
}
