"use client";

import { useState } from "react";
import {
  Box,
  Container,
  VStack,
  Text,
  Heading,
  Image,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import QuoteCarousel from "@/components/QuoteCarousel";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const categories = ["All", "Government", "National Corporate", "Multinational Corporate"];

const clients = [
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

  const filtered = activeCategory === "All"
    ? clients
    : clients.filter((c) => c.type === activeCategory);

  return (
    <Box
      position="relative"
      bg="#05060A"
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
              color="#fff"
              fontWeight="700"
              lineHeight="1.05"
              letterSpacing="-1.8px"
              fontFamily="Plus Jakarta Sans"
            >
              Trusted by Indonesia&apos;s<br />
              Leading Companies
            </Heading>

            <Text
              fontSize={{ base: "18px", md: "110px", xl: "19px" }}
              color="#ffffff"
              maxW="2xl"
              lineHeight="1.6"
              opacity={0.85}
            >
              Companies are ditching legacy platforms for the ability to deliver
              an engaging experience at every level.
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
                  borderColor={isActive ? "#fff" : "rgba(255,255,255,0.22)"}
                  bg={isActive ? "#fff" : "transparent"}
                  color={isActive ? "#000" : "rgba(255,255,255,0.65)"}
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight={isActive ? "600" : "400"}
                  transition="all 0.2s"
                  _hover={{
                    borderColor: "#fff",
                    color: isActive ? "#000" : "#fff",
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
                  filter: "brightness(1.3)",
                }}
              >
                <Image
                  src={client.src}
                  alt={client.name}
                  maxH={{ base: "60px", md: "140px" }}
                  maxW={{ base: "160px", md: "290px" }}
                  objectFit="contain"
                  filter="brightness(0) invert(1)"
                  opacity={0.75}
                  transition="all 0.3s ease"
                  _hover={{ opacity: 1 }}
                />
              </Flex>
            ))}
          </SimpleGrid>

          {filtered.length === 0 && (
            <Text textAlign="center" color="rgba(255,255,255,0.3)" py={16} fontSize="15px">
              No clients in this category yet.
            </Text>
          )}
        </Container>
      </Box>

      {/* ── Quote Carousel ── */}
      <Box pb={{ base: 12, md: 24 }}>
        <QuoteCarousel />
      </Box>

      {/* ── Contact & Footer ── */}
      <ContactSection />
      <FooterSection />
    </Box>
  );
}
