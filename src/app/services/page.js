import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ServicesHeroSection from "@/components/ServicesHeroSection";
import ServicesListSection from "@/components/ServicesListSection";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <ServicesHeroSection />
      <Suspense fallback={null}>
        <ServicesListSection />
      </Suspense>
      <FooterSection />
    </>
  );
}
