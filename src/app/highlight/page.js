"use client";

import { useEffect, useState } from "react";
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
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import HighlightGallery from "@/components/HighlightGallery";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { getStatsSection } from "@/lib/api";

const categories = [
  "All",
  "News",
  "Media Coverage",
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
    category: "Media Coverage",
  },
  {
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=360&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Media Coverage",
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

function ProjectCard({ img, title, desc, author, date, id }) {
  return (
    <Link href={`/highlight/${id}`} style={{ textDecoration: "none", display: "block" }}>
      <Box
        borderRadius={{ base: "20px", md: "35px" }}
        overflow="hidden"
        bg="rgba(255,255,255,1)"
        transition="transform 0.25s ease, box-shadow 0.25s ease"
        _hover={{
          transform: "translateY(-6px)",
          boxShadow: "0 12px 36px rgba(0,0,0,0.4)",
        }}
      >
        {/* Image */}
        <Box h={{ base: "180px", md: "200px" }} overflow="hidden">
          <Image
            src={img}
            alt={title}
            w="full"
            h="full"
            objectFit="cover"
            transition="transform 0.4s ease"
            _hover={{ transform: "scale(1.05)" }}
          />
        </Box>

        {/* Content */}
        <Box p={5}>
          <VStack align="flex-start" spacing={{ base: 3, md: 6 }}>
            <VStack align="flex-start" spacing={{ base: 1, md: 2 }}>
              <Heading
                as="h3"
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="700"
                color="#003e8fff"
                fontFamily="Plus Jakarta Sans"
                lineHeight="1.4"
                noOfLines={2}
              >
                {title}
              </Heading>
              <Text fontSize={{ base: 'sm', md: 'md' }} color="#002c66ff" lineHeight="1.65" noOfLines={3}>
                {desc}
              </Text>
            </VStack>

            <HStack spacing={3} pt={1} w="full" justify="space-between" align="center">
              <HStack spacing={3}>
                <Avatar
                  size={{ base: 'sm', md: 'md' }}
                  name={author}
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces"
                />
                <VStack spacing={-1} align="flex-start">
                  <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="600" color="rgba(0,0,0,0.75)">
                    {author}
                  </Text>
                  <Text fontSize={{ base: 'xs', md: 'sm' }} color="rgba(0,0,0,0.55)">
                    {date}
                  </Text>
                </VStack>
              </HStack>

              <Box
                as="span"
                display="inline-flex"
                alignItems="center"
                gap="6px"
                px={{ base: 4, md: 4 }}
                py={{ base: 2, md: 2 }}
                borderRadius="full"
                bg="#025BCF"
                color="#fff"
                fontSize="xs"
                fontWeight="600"
                flexShrink={0}
                transition="all 0.2s"
                _hover={{ bg: "#004badff", transform: "translateX(2px)" }}
              >
                Read More <FaArrowRight />
              </Box>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Link>
  );
}

const FALLBACK_STATS = [
  { stat_label: "Clients", stat_number: "500+" },
  { stat_label: "Achievements", stat_number: "57+" },
];

export default function HighlightPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [stats, setStats] = useState(FALLBACK_STATS);

  useEffect(() => {
    getStatsSection().then(setStats);
  }, []);

  const filtered =
    activeCategory === "All"
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
      bg="#05060A"
    >
      <Navbar />

      {/* ── Hero with BG Image ── */}
      <Box
        position="relative"
        w="full"
        minH="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        backgroundImage="url('/assets/highlight/hero-bg.png')"
        backgroundSize="cover"
        backgroundPosition="center"
      >
        {/* Dark overlay */}
        <Box
          position="absolute"
          top={0} left={0} right={0} bottom={0}
          background="linear-gradient(180deg, rgba(5,6,10,0.5) 0%, rgba(5,6,10,0.3) 40%, rgba(5,6,10,0.85) 80%, rgba(5,6,10,1) 100%)"
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
              fontSize={{ base: "58px", sm: "48px", md: "72px", xl: "96px" }}
              color="#fff"
              fontWeight="600"
              lineHeight="1.05"
              letterSpacing="-1.5px"
              fontFamily="Plus Jakarta Sans"
            >
              See Our{" "}
              <Text as="span" color="var(--accent)">
                Projects
              </Text>
              .<br />
              So You Know.
            </Heading>
            <Text
              fontSize={{ base: "15px", md: "18px", xl: "20px" }}
              color="#ffffff"
              maxW="3xl"
              lineHeight="1.4"
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
          {stats.map((stat, index) => (
            <HStack key={stat.id ?? stat.stat_label} spacing={{ base: 8, md: 20 }}>
              {index > 0 && <Box w="1px" h="120px" bg="rgba(255,255,255,0.15)" />}
              <VStack spacing={1.5}>
                <Text
                  fontSize={{ base: "13px", md: "15px", lg: "24px" }}
                  fontWeight="600"
                  color="var(--accent)"
                  textTransform="uppercase"
                >
                  {stat.stat_label}
                </Text>
                <Text
                  fontSize={{ base: "42px", md: "48px", lg: "52px" }}
                  fontWeight="700"
                  color="#fff"
                  fontFamily="Plus Jakarta Sans"
                >
                  {stat.stat_number}
                </Text>
              </VStack>
            </HStack>
          ))}
        </HStack>
      </Box>

      {/* ── Gallery: Video Slider + Photo Marquee ── */}
      <HighlightGallery />

      {/* ── Showcasing Section ── */}
      <Box bg="transparent" pt={{ base: 0, md: 20 }} pb={{ base: 12, md: 20 }} overflow="hidden" position="relative">
        <Image src="/assets/media/media-shape.svg" alt="background" position="absolute" display={{ base: "none", lg: "block" }} top={20} right={0} zIndex={0} />
        <Container maxW="7xl" px={{ base: 6, md: 8 }}>
          {/* Section Header with shape */}
          <Flex
            align="center"
            justify="space-between"
            mb={{ base: 8, md: 12 }}
            gap={6}
          >
            <VStack align="flex-start" spacing={4} maxW="5xl">
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "4xl", lg: "6xl" }}
                fontWeight="500"
                color="#fff"
                fontFamily="Plus Jakarta Sans"
                lineHeight="1.15"
              >
                Showcasing Our<br />
                Communication Excellence
              </Heading>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color="rgba(255,255,255,0.75)"
                lineHeight="1.7"
                maxW="2xl"
              >
                Take a closer look at the projects and collaborations that demonstrate our experience in delivering effective communication solutions.
              </Text>
            </VStack>

            {/* Decorative half-pill shape */}
            <Image
              src="/assets/media/media-shape.svg"
              alt="Decorative shape"
              display={{ base: "none", lg: "block" }}
              h="120px"
              mr="-40px"
              opacity={0.85}
              visibility="hidden"
            />
          </Flex>

          {/* Filter Tabs */}
          <Flex gap={3} flexWrap="wrap" mb={{ base: 8, md: 10 }}>
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
                  borderColor={isActive ? "#fff" : "rgba(255,255,255,0.35)"}
                  bg={isActive ? "#fff" : "transparent"}
                  color={isActive ? "#000" : "rgba(255,255,255,0.75)"}
                  fontSize={{ base: "13px", md: "14px" }}
                  fontWeight={isActive ? "600" : "400"}
                  transition="all 0.2s"
                  _hover={{ borderColor: "#fff", color: isActive ? "#000" : "#fff" }}
                >
                  {cat}
                </Box>
              );
            })}
          </Flex>

          {/* Project Cards Grid */}
          {paginated.length > 0 ? (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
              {paginated.map((project, idx) => (
                <ProjectCard key={idx} {...project} id={allProjects.indexOf(project)} />
              ))}
            </SimpleGrid>
          ) : (
            <Text textAlign="center" color="rgba(255,255,255,0.3)" py={16} fontSize="15px">
              No projects in this category yet.
            </Text>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Flex justify="center" align="center" gap={{ base: 2, md: 4 }} mt={12}>
              <Box
                as="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                w="36px" h="36px"
                borderRadius="full"
                bg="rgb(255, 255, 255, 0.1)"
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={{ base: 'sm', md: 'md' }}
                _hover={{ bg: "#025BCF" }}
                transition="all 0.2s"
              >
                <IoIosArrowBack />
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
                    bg={isActive ? "white" : "transparent"}
                    border="1px solid"
                    borderColor={isActive ? "white" : "rgba(255,255,255,0.55)"}
                    color={isActive ? "#025BCF" : "rgba(255,255,255,0.75)"}
                    fontSize={{ base: 'sm', md: 'lg' }}
                    fontWeight={isActive ? "700" : "400"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    transition="all 0.2s"
                    _hover={{ bg: isActive ? "#025BCF" : "rgba(255,255,255,0.08)", color: isActive ? "white" : "rgba(255,255,255,0.75)", borderColor: isActive ? "#025BCF" : "rgba(255,255,255,0.75)" }}
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
                bg="rgb(255, 255, 255, 0.1)"
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={{ base: 'sm', md: 'md' }}
                _hover={{ bg: "#025BCF" }}
                transition="all 0.2s"
              >
                <IoIosArrowForward />
              </Box>
            </Flex>
          )}
        </Container>
      </Box>

      {/* ── Contact & Footer ── */}
      <ContactSection />
      <FooterSection />
    </Box>
  );
}
