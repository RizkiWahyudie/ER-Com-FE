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
  SimpleGrid,
  Avatar,
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const categories = [
  "Services",
  "Media Relation",
  "CSR",
  "Broadcast",
  "Media Service",
  "Events",
  "Digital Work",
];

const allProjects = [
  {
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=360&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Events",
  },
  {
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=360&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Events",
  },
  {
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=360&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Events",
  },
  {
    img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=360&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Events",
  },
  {
    img: "https://images.unsplash.com/photo-1551817958-d9d86fb29431?w=600&h=360&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Events",
  },
  {
    img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=360&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Events",
  },
  {
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=360&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Media Relation",
  },
  {
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=360&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Media Relation",
  },
  {
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=360&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "CSR",
  },
];

const PER_PAGE = 6;

function ProjectCard({ img, title, desc, author, date }) {
  return (
    <Box
      borderRadius="20px"
      overflow="hidden"
      bg="#fff"
      boxShadow="0 4px 24px rgba(0,0,0,0.18)"
      transition="transform 0.25s ease, box-shadow 0.25s ease"
      _hover={{ transform: "translateY(-6px)", boxShadow: "0 12px 36px rgba(0,0,0,0.28)" }}
    >
      {/* Image */}
      <Box h="200px" overflow="hidden">
        <Image
          src={img}
          alt={title}
          w="full"
          h="full"
          objectFit="cover"
          transition="transform 0.4s ease"
          _groupHover={{ transform: "scale(1.05)" }}
        />
      </Box>

      {/* Content */}
      <Box p={5}>
        <VStack align="flex-start" spacing={3}>
          <Heading
            as="h3"
            fontSize="16px"
            fontWeight="700"
            color="#2563EB"
            lineHeight="1.4"
            noOfLines={2}
          >
            {title}
          </Heading>
          <Text fontSize="13px" color="#555" lineHeight="1.65" noOfLines={3}>
            {desc}
          </Text>

          <HStack spacing={3} pt={1}>
            <Avatar
              size="sm"
              name={author}
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces"
            />
            <VStack spacing={0} align="flex-start">
              <Text fontSize="13px" fontWeight="600" color="#111">
                {author}
              </Text>
              <Text fontSize="11px" color="#888">
                {date}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}

export default function HighlightPage() {
  const [activeCategory, setActiveCategory] = useState("Events");
  const [page, setPage] = useState(1);

  const filtered =
    activeCategory === "Services"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setPage(1);
  };

  return (
    <Box
      position="relative"
      bg="#000"
      _before={{
        content: '""',
        position: "fixed",
        inset: 0,
        background:
          "radial-gradient(ellipse at 10% 20%, rgba(29,78,216,0.25) 0%, transparent 50%), " +
          "radial-gradient(ellipse at 88% 72%, rgba(194,65,12,0.28) 0%, transparent 48%)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Navbar />

      {/* ── Hero ── */}
      <Box
        position="relative"
        w="full"
        minH="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        backgroundImage="url('/assets/hero/hero-bg.png')"
        backgroundSize="cover"
        backgroundPosition="center"
      >
        {/* Overlay */}
        <Box
          position="absolute"
          top={0} left={0} right={0} bottom={0}
          background="linear-gradient(180deg, rgba(5,6,10,0.45) 0%, rgba(5,6,10,0.3) 50%, rgba(5,6,10,0.88) 85%, rgba(5,6,10,1) 100%)"
          zIndex={0}
        />

        {/* Heading */}
        <Container
          maxW="4xl"
          px={{ base: 6, md: 8 }}
          textAlign="center"
          position="relative"
          zIndex={1}
          pt={{ base: "160px", md: "220px" }}
        >
          <VStack spacing={{ base: 5, md: 7 }}>
            <Heading
              as="h1"
              fontSize={{ base: "48px", md: "70px", xl: "84px" }}
              fontWeight="800"
              color="#fff"
              lineHeight="1.08"
              letterSpacing="-1.5px"
              fontFamily="Plus Jakarta Sans"
            >
              See Our{" "}
              <Text as="span" color="var(--accent)">
                Projects.
              </Text>
              <br />
              So You Know.
            </Heading>
            <Text
              fontSize={{ base: "14px", md: "16px" }}
              color="rgba(255,255,255,0.7)"
              maxW="500px"
              lineHeight="1.65"
            >
              We help businesses communicate with confidence through strategic PR and
              communication solutions. ER Communication partners with brands to
              strengthen reputation and drive meaningful impact.
            </Text>
          </VStack>
        </Container>

        {/* Stats */}
        <HStack
          spacing={{ base: 8, md: 20 }}
          justify="space-evenly"
          w="full"
          position="relative"
          zIndex={1}
          pb={{ base: 4, md: 8 }}
        >
          <VStack spacing={1.5}>
            <Text
              fontSize={{ base: "13px", md: "15px", lg: "24px" }}
              fontWeight="600"
              color="var(--accent)"
              textTransform="uppercase"
            >
              Clients
            </Text>
            <Text
              fontSize={{ base: "42px", md: "48px", lg: "52px" }}
              fontWeight="700"
              color="#fff"
              fontFamily="Plus Jakarta Sans"
            >
              500+
            </Text>
          </VStack>
          <Box w="1px" h="120px" bg="rgba(255,255,255,0.15)" />
          <VStack spacing={1.5}>
            <Text
              fontSize={{ base: "13px", md: "15px", lg: "24px" }}
              fontWeight="600"
              color="var(--accent)"
              textTransform="uppercase"
            >
              Achievements
            </Text>
            <Text
              fontSize={{ base: "42px", md: "48px", lg: "52px" }}
              fontWeight="700"
              color="#fff"
              fontFamily="Plus Jakarta Sans"
            >
              57+
            </Text>
          </VStack>
        </HStack>
      </Box>

      {/* ── Pioneer Section ── */}
      <Box bg="transparent" py={{ base: 16, md: 24 }} overflow="hidden">
        <Container maxW="7xl" px={{ base: 6, md: 8 }}>
          <Flex align="center" justify="space-between" gap={8}>
            <VStack align="flex-start" spacing={4} maxW="520px">
              <Heading
                as="h2"
                fontSize={{ base: "28px", md: "44px", lg: "52px" }}
                fontWeight="700"
                color="#fff"
                fontFamily="Plus Jakarta Sans"
                lineHeight="1.15"
              >
                We&apos;re the pioneer of the<br />
                PR otomotive industry
              </Heading>
              <Text fontSize={{ base: "14px", md: "15px" }} color="rgba(255,255,255,0.55)" lineHeight="1.7" maxW="380px">
                ER Communication is one of leading agency in Indonesia and we specialize
                in consumer lifestyle.
              </Text>
            </VStack>

            {/* Decorative pill outline */}
            <Box
              display={{ base: "none", lg: "block" }}
              w="180px"
              h="100px"
              borderRadius="full"
              border="3px solid rgba(255,255,255,0.7)"
              flexShrink={0}
              mr="-40px"
            />
          </Flex>
        </Container>
      </Box>

      {/* ── Filter Tabs ── */}
      <Box bg="transparent" pb={8}>
        <Container maxW="7xl" px={{ base: 6, md: 8 }}>
          <Flex gap={3} flexWrap="wrap">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <Box
                  key={cat}
                  as="button"
                  onClick={() => handleCategory(cat)}
                  px={{ base: 4, md: 5 }}
                  py={2}
                  borderRadius="full"
                  border="1px solid"
                  borderColor={isActive ? "#fff" : "rgba(255,255,255,0.25)"}
                  bg={isActive ? "#fff" : "transparent"}
                  color={isActive ? "#000" : "rgba(255,255,255,0.65)"}
                  fontSize="14px"
                  fontWeight={isActive ? "600" : "400"}
                  transition="all 0.2s"
                  _hover={{ borderColor: "#fff", color: isActive ? "#000" : "#fff" }}
                >
                  {cat}
                </Box>
              );
            })}
          </Flex>
        </Container>
      </Box>

      {/* ── Project Cards ── */}
      <Box bg="transparent" py={{ base: 8, md: 12 }}>
        <Container maxW="7xl" px={{ base: 6, md: 8 }}>
          {paginated.length > 0 ? (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
              {paginated.map((project, idx) => (
                <ProjectCard key={idx} {...project} />
              ))}
            </SimpleGrid>
          ) : (
            <Text textAlign="center" color="rgba(255,255,255,0.3)" py={16} fontSize="15px">
              No projects in this category yet.
            </Text>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Flex justify="center" align="center" gap={2} mt={12}>
              <Box
                as="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                w="36px" h="36px"
                borderRadius="full"
                border="1px solid rgba(255,255,255,0.2)"
                color="#fff"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="14px"
                _hover={{ bg: "rgba(255,255,255,0.08)" }}
                transition="all 0.2s"
              >
                ‹
              </Box>

              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                const isActive = currentPage === p;
                return (
                  <Box
                    key={p}
                    as="button"
                    onClick={() => setPage(p)}
                    w="36px" h="36px"
                    borderRadius="full"
                    bg={isActive ? "#2563EB" : "transparent"}
                    border="1px solid"
                    borderColor={isActive ? "#2563EB" : "rgba(255,255,255,0.2)"}
                    color={isActive ? "#fff" : "rgba(255,255,255,0.6)"}
                    fontSize="14px"
                    fontWeight={isActive ? "700" : "400"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    transition="all 0.2s"
                    _hover={{ bg: isActive ? "#1d4ed8" : "rgba(255,255,255,0.08)" }}
                  >
                    {p}
                  </Box>
                );
              })}

              <Box
                as="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                w="36px" h="36px"
                borderRadius="full"
                bg="#2563EB"
                color="#fff"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="14px"
                _hover={{ bg: "#1d4ed8" }}
                transition="all 0.2s"
              >
                ›
              </Box>
            </Flex>
          )}
        </Container>
      </Box>

      <FooterSection />
    </Box>
  );
}
