"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  VStack,
  Text,
  Heading,
  Image,
  Flex,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import QuoteCarousel from "@/components/QuoteCarousel";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import { getClientCategories, getClients, getHeroSection, getTestimonials } from "@/lib/api";

const FALLBACK_HERO = {
  headlineLines: [
    { text: "Trusted by Indonesia's", color: null },
    { text: "Leading Companies", color: null },
  ],
  subheadline:
    "Companies are ditching legacy platforms for the ability to deliver " +
    "an engaging experience at every level.",
};

const FALLBACK_CATEGORIES = ["Government", "National Corporate", "Multinational Corporate"];

const FALLBACK_CLIENTS = [
  { src: "/assets/partner/partner-logo-1.png",  name: "Partner 1",  type: "Government" },
  { src: "/assets/partner/partner-logo-2.png",  name: "Partner 2",  type: "Government" },
  { src: "/assets/partner/partner-logo-3.png",  name: "Partner 3",  type: "Government" },
  { src: "/assets/partner/partner-logo-4.png",  name: "Partner 4",  type: "Government" },
  { src: "/assets/partner/partner-logo-5.png",  name: "Partner 5",  type: "National Corporate" },
  { src: "/assets/partner/partner-logo-6.png",  name: "Partner 6",  type: "National Corporate" },
  { src: "/assets/partner/partner-logo-7.png",  name: "Partner 7",  type: "National Corporate" },
  { src: "/assets/partner/partner-logo-8.png",  name: "Partner 8",  type: "National Corporate" },
  { src: "/assets/partner/partner-logo-9.png",  name: "Partner 9",  type: "Multinational Corporate" },
  { src: "/assets/partner/partner-logo-10.png", name: "Partner 10", type: "Multinational Corporate" },
  { src: "/assets/partner/partner-logo-11.png", name: "Partner 11", type: "Multinational Corporate" },
  { src: "/assets/partner/partner-logo-12.png", name: "Partner 12", type: "Multinational Corporate" },
];

export default function ClientsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState(["All", ...FALLBACK_CATEGORIES]);
  const [clients, setClients] = useState([]);
  const [hero, setHero] = useState(FALLBACK_HERO);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    getClientCategories().then((apiCategories) => {
      if (apiCategories.length > 0) setCategories(["All", ...apiCategories]);
    });

    getClients().then((apiClients) => {
      if (apiClients.length > 0) setClients(apiClients);
    });

    getHeroSection("client").then((apiHero) => {
      if (apiHero?.headlineLines?.length > 0) setHero(apiHero);
    });

    getTestimonials().then(setTestimonials);
  }, []);

  const pageBg = useColorModeValue("#fff", "#05060A");
  const tabActiveBg = useColorModeValue("#1e293b", "#fff");
  const tabActiveColor = useColorModeValue("#fff", "#000");
  const tabInactiveBorder = useColorModeValue("rgba(0,0,0,0.22)", "rgba(255,255,255,0.22)");
  const tabInactiveColor = useColorModeValue("rgba(0,0,0,0.65)", "rgba(255,255,255,0.65)");
  const tabHoverBorder = useColorModeValue("#1e293b", "#fff");
  const emptyTextColor = useColorModeValue("rgba(0,0,0,0.4)", "rgba(255,255,255,0.3)");

  const headingText = useColorModeValue("#3C87F9", "#fff");
  const subHeadingText = useColorModeValue("rgba(0, 0, 0, 0.65)", "#a0aab8");

  const filtered = activeCategory === "All"
    ? clients
    : clients.filter((c) => c.type === activeCategory);

  return (
    <Box
      position="relative"
      bg={pageBg}
      _before={{
        content: '""',
        position: "fixed",
        inset: 0,
        background:
          "radial-gradient(ellipse at 15% 20%, rgba(29,78,216,0.22) 0%, transparent 50%), " +
          "radial-gradient(ellipse at 85% 75%, rgba(194,65,12,0.25) 0%, transparent 50%)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Navbar />

      {/* ── Hero ── */}
      <Box
        position="relative"
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        {/* Blue glow — top center */}
        <Box
          position="absolute"
          top="-60px"
          left="50%"
          transform="translateX(-50%)"
          w="800px"
          h="500px"
          style={{
            background: "radial-gradient(ellipse at center top, rgba(29,78,216,0.45) 0%, transparent 60%)",
          }}
          pointerEvents="none"
        />

        <Container
          maxW="7xl"
          px={{ base: 6, md: 8 }}
          textAlign="center"
          position="relative"
          zIndex={1}
          pt={{ base: "130px", md: "150px" }}
          pb={{ base: 10, md: 14 }}
        >
          <VStack spacing={{ base: 5, md: 8 }} align="center" textAlign="center" w="full">
            <Box
              display="inline-block"
              bg="linear-gradient(135deg, #E53E3E 0%, #e09f74ff 100%)"
              color="#fff"
              fontSize="lg"
              fontWeight="600"
              px={4}
              py={1}
              borderRadius="full"
            >
              Clients
            </Box>

            <Heading
              as="h1"
              fontSize={{ base: "52px", md: "72px", xl: "90px" }}
              color={headingText}
              fontWeight="700"
              lineHeight="1.05"
              letterSpacing="-1.8px"
              fontFamily="Plus Jakarta Sans"
            >
              {hero.headlineLines.map((line, idx) => (
                <Text as="span" display="block" key={idx} color={headingText}>
                  {line.text}
                </Text>
              ))}
            </Heading>

            <Text
              fontSize={{ base: "18px", md: "110px", xl: "19px" }}
              color={subHeadingText}
              maxW="2xl"
              lineHeight="1.6"
              opacity={0.85}
            >
              {hero.subheadline}
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* ── Filter Tabs ── */}
      <Box bg="transparent" pt={{ base: 8, md: 16 }} pb={{ base: 4, md: 8 }}>
        <Container maxW="7xl" px={{ base: 6, md: 8 }}>
          <Flex justify="center" gap={3} flexWrap="wrap">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <Box
                  key={cat}
                  as="button"
                  onClick={() => setActiveCategory(cat)}
                  px={{ base: 4, md: 6 }}
                  py={2}
                  borderRadius="full"
                  border="1px solid"
                  borderColor={isActive ? tabHoverBorder : tabInactiveBorder}
                  bg={isActive ? tabActiveBg : "transparent"}
                  color={isActive ? tabActiveColor : tabInactiveColor}
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight={isActive ? "600" : "400"}
                  transition="all 0.2s"
                  _hover={{
                    borderColor: tabHoverBorder,
                    color: isActive ? tabActiveColor : tabHoverBorder,
                  }}
                >
                  {cat}
                </Box>
              );
            })}
          </Flex>
        </Container>
      </Box>

      {/* ── Logo Grid ── */}
      <Box bg="transparent" py={{ base: 8, md: 16 }}>
        <Container maxW="7xl" px={{ base: 6, md: 8 }}>
          <SimpleGrid
            columns={{ base: 2, md: 3 }}
            spacingX={{ base: 8, md: 12 }}
            spacingY={{ base: 10, md: 16 }}
            justifyItems="center"
            alignItems="center"
          >
            {filtered.map((client, idx) => (
              <Flex
                key={`${activeCategory}-${idx}`}
                align="center"
                justify="center"
                py={{ base: 4, md: 6 }}
                px={{ base: 4, md: 8 }}
                transition="all 0.3s ease"
                _hover={{
                  transform: "scale(1.08)",
                  filter: "brightness(1.1)",
                }}
              >
                <Image
                  src={client.src}
                  alt={client.name}
                  maxH={{ base: "60px", md: "140px" }}
                  maxW={{ base: "160px", md: "290px" }}
                  objectFit="contain"
                  borderRadius={{ base: "8px", md: "12px" }}
                  transition="all 0.3s ease"
                />
              </Flex>
            ))}
          </SimpleGrid>

          {filtered.length === 0 && (
            <Text textAlign="center" color={emptyTextColor} py={16} fontSize="15px">
              No clients in this category yet.
            </Text>
          )}
        </Container>
      </Box>

      {/* ── Quote Carousel ── */}
      <Box pb={{ base: 12, md: 24 }}>
        <QuoteCarousel testimonials={testimonials} />
      </Box>

      {/* ── Contact & Footer ── */}
      <ContactSection />
      <FooterSection />
    </Box>
  );
}
