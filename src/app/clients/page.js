"use client";

import { useState } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Image,
  Flex,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Navbar from "@/components/Navbar";
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

const testimonials = [
  {
    quote: '"I imagine we can change the world, one head, one face or one body at a time. We think outside the lines of our craft."',
    name: "Geri Cusenza",
    role: "Founder Sabastian",
  },
  {
    quote: '"ER Communication has been a game changer for our brand. Their strategic approach and deep media network delivered results beyond our expectations."',
    name: "Andi Pratama",
    role: "CEO, National Corp",
  },
  {
    quote: '"Working with ER Communication gave us the confidence to navigate complex media landscapes with clarity and impact."',
    name: "Siti Rahayu",
    role: "Head of PR, Gov Agency",
  },
];

function ClientCard({ src, name }) {
  return (
    <Box
      className="client-card"
      position="relative"
      overflow="hidden"
      borderRadius="16px"
      border="1px solid rgba(255,255,255,0.07)"
      bg="rgba(255,255,255,0.03)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={8}
      h="120px"
      cursor="pointer"
      transition="all 0.35s cubic-bezier(0.34,1.56,0.64,1)"
      _hover={{
        transform: "translateY(-8px) scale(1.04)",
        border: "1px solid rgba(33,150,243,0.5)",
        bg: "rgba(33,150,243,0.07)",
        boxShadow: "0 20px 40px rgba(33,150,243,0.2), 0 0 0 1px rgba(33,150,243,0.15)",
      }}
      sx={{
        "&:hover .logo-img": {
          filter: "brightness(0) invert(1)",
          opacity: 1,
        },
        "&:hover .shine": {
          left: "120%",
        },
      }}
    >
      {/* Shine sweep */}
      <Box
        className="shine"
        position="absolute"
        top={0}
        left="-60%"
        w="40%"
        h="full"
        bg="linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.12) 50%, transparent 80%)"
        transform="skewX(-15deg)"
        transition="left 0.55s ease"
        pointerEvents="none"
        zIndex={1}
      />

      <Image
        className="logo-img"
        src={src}
        alt={name}
        maxH="48px"
        maxW="140px"
        objectFit="contain"
        filter="brightness(0) invert(1)"
        opacity={0.55}
        transition="all 0.35s ease"
        position="relative"
        zIndex={2}
      />
    </Box>
  );
}

export default function ClientsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const filtered = activeCategory === "All"
    ? clients
    : clients.filter((c) => c.type === activeCategory);

  const prev = () => setTestimonialIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setTestimonialIdx((i) => (i + 1) % testimonials.length);
  const current = testimonials[testimonialIdx];

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <Box
        position="relative"
        w="full"
        minH={{ base: "60vh", md: "68vh" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="#000"
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
        {/* Orange glow — bottom right */}
        <Box
          position="absolute"
          bottom="-80px"
          right="-100px"
          w="500px"
          h="400px"
          style={{
            background: "radial-gradient(ellipse at center, rgba(194,65,12,0.4) 0%, transparent 65%)",
          }}
          pointerEvents="none"
        />

        <Container
          maxW="3xl"
          px={{ base: 6, md: 8 }}
          textAlign="center"
          position="relative"
          zIndex={1}
          pt={{ base: "130px", md: "150px" }}
          pb={{ base: 16, md: 20 }}
        >
          <VStack spacing={5}>
            <Box
              display="inline-block"
              bg="var(--accent)"
              color="#fff"
              fontSize="13px"
              fontWeight="600"
              px={4}
              py={1}
              borderRadius="full"
            >
              Clients
            </Box>

            <Heading
              as="h1"
              fontSize={{ base: "38px", md: "62px", xl: "72px" }}
              fontWeight="800"
              color="#fff"
              lineHeight="1.1"
              letterSpacing="-1px"
              fontFamily="Plus Jakarta Sans"
            >
              Trusted by Indonesia&apos;s<br />
              Leading Companies
            </Heading>

            <Text
              fontSize={{ base: "14px", md: "16px" }}
              color="rgba(255,255,255,0.5)"
              maxW="400px"
              lineHeight="1.6"
            >
              Companies are ditching legacy platforms for the ability to deliver
              an engaging experience at every level.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* ── Filter Tabs ── */}
      <Box bg="#000" pb={10}>
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
                  fontSize={{ base: "13px", md: "14px" }}
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
      <Box bg="#000" py={{ base: 8, md: 12 }}>
        <Container maxW="7xl" px={{ base: 6, md: 8 }}>
          <SimpleGrid
            columns={{ base: 2, sm: 3, md: 4 }}
            spacing={4}
          >
            {filtered.map((client, idx) => (
              <ClientCard key={`${activeCategory}-${idx}`} src={client.src} name={client.name} />
            ))}
          </SimpleGrid>

          {filtered.length === 0 && (
            <Text textAlign="center" color="rgba(255,255,255,0.3)" py={16} fontSize="15px">
              No clients in this category yet.
            </Text>
          )}
        </Container>
      </Box>

      {/* ── Testimonial ── */}
      <Box bg="#000" py={{ base: 16, md: 24 }}>
        <Container maxW="3xl" px={{ base: 6, md: 8 }} textAlign="center">
          <VStack spacing={8}>
            <Text fontSize={{ base: "13px", md: "14px" }} color="#2196f3" fontWeight="500">
              Trusted by over 500+ clients of Indonesia&apos;s leading companies
            </Text>

            <Text
              fontSize={{ base: "20px", md: "26px", lg: "30px" }}
              color="#fff"
              lineHeight="1.55"
              fontWeight="400"
              fontFamily="Plus Jakarta Sans"
              minH={{ md: "130px" }}
            >
              {current.quote}
            </Text>

            <Flex align="center" justify="center" gap={6} w="full">
              <IconButton
                icon={<FaChevronLeft />}
                onClick={prev}
                borderRadius="full"
                variant="outline"
                borderColor="rgba(255,255,255,0.25)"
                color="#fff"
                size="md"
                _hover={{ bg: "rgba(255,255,255,0.08)" }}
                aria-label="Previous"
              />

              <HStack spacing={3}>
                <Image
                  src="/assets/hero/navbar-logo-sm.svg"
                  alt="avatar"
                  w="40px"
                  h="40px"
                  borderRadius="full"
                  bg="white"
                  p="3px"
                />
                <VStack spacing={0} align="flex-start">
                  <Text fontSize="14px" fontWeight="700" color="#fff">
                    {current.name}
                  </Text>
                  <Text fontSize="12px" color="rgba(255,255,255,0.5)">
                    {current.role}
                  </Text>
                </VStack>
              </HStack>

              <IconButton
                icon={<FaChevronRight />}
                onClick={next}
                borderRadius="full"
                bg="#2196f3"
                color="#fff"
                size="md"
                _hover={{ bg: "#1d7fd4" }}
                border="none"
                aria-label="Next"
              />
            </Flex>
          </VStack>
        </Container>
      </Box>

      <ContactSection />
      <FooterSection />
    </>
  );
}
