"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  Box,
  Button,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Image,
  Flex,
  SimpleGrid,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import HighlightGallery from "@/components/HighlightGallery";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { getHeroSection, getBlogCategories, getBlogPosts, getStatsSection, sanitizeRichText } from "@/lib/api";

const FALLBACK_HEADLINE = 'See Our <span style="color:var(--accent)">Projects</span>.<br/>So You Know.';
const FALLBACK_SUBHEADLINE =
  "We help businesses communicate with confidence through strategic PR and " +
  "communication solutions. ER Communication partners with brands to " +
  "strengthen reputation and drive meaningful impact.";

const FALLBACK_HERO = {
  headline: FALLBACK_HEADLINE,
  subheadline: FALLBACK_SUBHEADLINE,
  backgroundImage: "/assets/highlight/hero-bg.png",
  hasBgImage: true,
};

const AUTO_SLIDE_INTERVAL = 4000;

const FALLBACK_CATEGORIES = [
  "News",
  "Media Coverage",
  "CSR",
  "Broadcast",
  "Media Service",
  "Events",
  "Digital Work",
];

const FALLBACK_PROJECTS = [
  {
    id: "fallback-1",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=360&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Events",
  },
  {
    id: "fallback-2",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=360&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Events",
  },
  {
    id: "fallback-3",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=360&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Events",
  },
  {
    id: "fallback-4",
    img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=360&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Events",
  },
  {
    id: "fallback-5",
    img: "https://images.unsplash.com/photo-1551817958-d9d86fb29431?w=600&h=360&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Events",
  },
  {
    id: "fallback-6",
    img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=360&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Events",
  },
  {
    id: "fallback-7",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=360&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Media Coverage",
  },
  {
    id: "fallback-8",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=360&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Media Coverage",
  },
  {
    id: "fallback-9",
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
  const [categories, setCategories] = useState(["All", ...FALLBACK_CATEGORIES]);
  const [allProjects, setAllProjects] = useState(FALLBACK_PROJECTS);
  const [heroes, setHeroes] = useState([FALLBACK_HERO]);
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    getStatsSection().then(setStats);

    getHeroSection("highlight")
      .then((apiHeroes) => {
        if (apiHeroes.length > 0) setHeroes(apiHeroes);
      })
      .catch(() => setHeroes([FALLBACK_HERO]));

    getBlogCategories().then((apiCategories) => {
      if (apiCategories.length > 0) setCategories(["All", ...apiCategories]);
    });

    getBlogPosts().then((apiProjects) => {
      if (apiProjects.length > 0) setAllProjects(apiProjects);
    });
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (heroes.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroes.length);
    }, AUTO_SLIDE_INTERVAL);
  }, [heroes.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goToSlide = (index) => {
    setActiveIndex(index);
    startTimer();
  };

  const currentHero = heroes[activeIndex] ?? heroes[0] ?? FALLBACK_HERO;
  const showDots = heroes.length > 1;

  const pageBg = useColorModeValue("#fff", "#05060A");
  const headingColor = useColorModeValue("#1a202c", "#fff");
  const textColor = useColorModeValue("#4a5568", "rgba(255,255,255,0.75)");
  const tabActiveBg = useColorModeValue("#1e293b", "#fff");
  const tabActiveColor = useColorModeValue("#fff", "#000");
  const tabInactiveBorder = useColorModeValue("rgba(0,0,0,0.35)", "rgba(255,255,255,0.35)");
  const tabInactiveColor = useColorModeValue("rgba(0,0,0,0.75)", "rgba(255,255,255,0.75)");
  const tabHoverBorder = useColorModeValue("#1e293b", "#fff");
  const emptyTextColor = useColorModeValue("rgba(0,0,0,0.4)", "rgba(255,255,255,0.3)");
  const pageBtnBg = useColorModeValue("rgba(0,0,0,0.05)", "rgba(255,255,255,0.1)");
  const pageBtnColor = useColorModeValue("#1e293b", "white");
  const pageBtnHoverBg = useColorModeValue("rgba(0,0,0,0.1)", "#025BCF");
  const pageBtnActiveBg = useColorModeValue("#1e293b", "white");
  const pageBtnActiveColor = useColorModeValue("white", "#025BCF");
  const pageBtnInactiveBorder = useColorModeValue("rgba(0,0,0,0.3)", "rgba(255,255,255,0.55)");

  const overlay = useColorModeValue("radial-gradient(ellipse at center bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 85%), linear-gradient(180deg,rgba(5, 6, 10, 0) 0%,rgba(5, 6, 10, 0.1) 30%,rgba(5, 6, 10, 0.2) 60%,rgba(255, 255, 255, 0.3) 75%,rgba(255, 255, 255, 0.97) 90%,rgba(255, 255, 255, 1) 100%)", "radial-gradient(ellipse at center bottom, rgba(5, 6, 10, 0) 0%, rgba(5, 6, 10, 0) 85%), linear-gradient(180deg,rgba(5, 6, 10, 0) 0%,rgba(5, 6, 10, 0.1) 30%,rgba(5, 6, 10, 0.2) 60%,rgba(5, 6, 10, 0.3) 75%,rgba(5, 6, 10, 0.97) 90%,rgba(5, 6, 10, 1) 100%  )");
  const bnw = useColorModeValue("#000", "#fff");

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
      bg={pageBg}
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
      >
        {/* Background Images — stacked for crossfade */}
        {heroes.map((h, idx) => (
          <Box
            key={h.id ?? idx}
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            backgroundImage={`url('${h.backgroundImage || "/assets/highlight/hero-bg.png"}')`}
            backgroundSize="cover"
            backgroundPosition="center"
            opacity={idx === activeIndex ? 1 : 0}
            transition="opacity 0.8s ease-in-out"
            zIndex={0}
          />
        ))}

        {/* Dark overlay */}
        <Box
          position="absolute"
          top={0} left={0} right={0} bottom={0}
          background={overlay}
          zIndex={1}
        />
        {/* Heading */}
        <Container
          maxW="4xl"
          px={{ base: 6, md: 8 }}
          textAlign="center"
          position="relative"
          zIndex={2}
          pt={{ base: "160px", md: "220px" }}
        >
          <VStack spacing={{ base: 5, md: 7 }}>
            {/* Headline with crossfade */}
            <Box position="relative" w="full" minH={{ base: "100px", md: "140px" }}>
              {heroes.map((h, idx) => (
                <Heading
                  key={h.id ?? idx}
                  as={idx === activeIndex ? "h1" : "div"}
                  fontSize={{ base: "58px", sm: "48px", md: "72px", xl: "96px" }}
                  color="#fff"
                  fontWeight="600"
                  lineHeight="1.05"
                  letterSpacing="-1.5px"
                  fontFamily="Plus Jakarta Sans"
                  position={idx === 0 ? "relative" : "absolute"}
                  top={0}
                  left={0}
                  right={0}
                  opacity={idx === activeIndex ? 1 : 0}
                  transition="opacity 0.6s ease-in-out"
                  pointerEvents={idx === activeIndex ? "auto" : "none"}
                  dangerouslySetInnerHTML={{ __html: sanitizeRichText(h.headline) || FALLBACK_HEADLINE }}
                />
              ))}
            </Box>

            {/* Subheadline with crossfade */}
            <Box position="relative" w="full" minH={{ base: "50px", md: "60px" }}>
              {heroes.map((h, idx) => (
                <Text
                  key={h.id ?? idx}
                  fontSize={{ base: "15px", md: "18px", xl: "20px" }}
                  color="#ffffff"
                  maxW="3xl"
                  mx="auto"
                  lineHeight="1.4"
                  position={idx === 0 ? "relative" : "absolute"}
                  top={0}
                  left={0}
                  right={0}
                  opacity={idx === activeIndex ? 1 : 0}
                  transition="opacity 0.6s ease-in-out"
                  pointerEvents={idx === activeIndex ? "auto" : "none"}
                  dangerouslySetInnerHTML={{ __html: sanitizeRichText(h.subheadline) || FALLBACK_SUBHEADLINE }}
                />
              ))}
            </Box>

            {/* CTA Button */}
            {currentHero?.cta_text && currentHero?.cta_url && (
              <Button
                as="a"
                href={currentHero.cta_url}
                target={currentHero.cta_url.startsWith("http") ? "_blank" : "_self"}
                rel={currentHero.cta_url.startsWith("http") ? "noopener noreferrer" : undefined}
                variant="outline"
                bg="transparent"
                color="#fff"
                borderColor="#fff"
                borderWidth="1.5px"
                borderRadius="999px"
                px={8}
                py={5}
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="600"
                transition="all 0.25s ease"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.12)",
                  borderColor: "#fff",
                  transform: "translateY(-1px)",
                }}
                _active={{
                  bg: "rgba(255, 255, 255, 0.2)",
                  transform: "translateY(0)",
                }}
              >
                {currentHero.cta_text}
              </Button>
            )}

            {/* Carousel Dots */}
            {showDots && (
              <HStack spacing={2.5} justify="center">
                {heroes.map((_, idx) => (
                  <Box
                    key={idx}
                    as="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    w={idx === activeIndex ? "28px" : "10px"}
                    h="10px"
                    borderRadius="full"
                    bg={idx === activeIndex ? "#fff" : "rgba(255, 255, 255, 0.35)"}
                    transition="all 0.3s ease"
                    cursor="pointer"
                    _hover={{ bg: idx === activeIndex ? "#fff" : "rgba(255, 255, 255, 0.55)" }}
                    onClick={() => goToSlide(idx)}
                  />
                ))}
              </HStack>
            )}
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
                  color={bnw}
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
                color={headingColor}
                fontFamily="Plus Jakarta Sans"
                lineHeight="1.15"
              >
                Showcasing Our<br />
                Communication Excellence
              </Heading>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color={textColor}
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
                  borderColor={isActive ? tabHoverBorder : tabInactiveBorder}
                  bg={isActive ? tabActiveBg : "transparent"}
                  color={isActive ? tabActiveColor : tabInactiveColor}
                  fontSize={{ base: "13px", md: "14px" }}
                  fontWeight={isActive ? "600" : "400"}
                  transition="all 0.2s"
                  _hover={{ borderColor: tabHoverBorder, color: isActive ? tabActiveColor : tabHoverBorder }}
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
                <ProjectCard key={project.id ?? idx} {...project} />
              ))}
            </SimpleGrid>
          ) : (
            <Text textAlign="center" color={emptyTextColor} py={16} fontSize="15px">
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
                bg={pageBtnBg}
                color={pageBtnColor}
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={{ base: 'sm', md: 'md' }}
                _hover={{ bg: pageBtnHoverBg, color: "white" }}
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
                    bg={isActive ? pageBtnActiveBg : "transparent"}
                    border="1px solid"
                    borderColor={isActive ? pageBtnActiveBg : pageBtnInactiveBorder}
                    color={isActive ? pageBtnActiveColor : tabInactiveColor}
                    fontSize={{ base: 'sm', md: 'lg' }}
                    fontWeight={isActive ? "700" : "400"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    transition="all 0.2s"
                    _hover={{ 
                      bg: isActive ? pageBtnHoverBg : pageBtnBg, 
                      color: isActive ? "white" : tabInactiveColor, 
                      borderColor: isActive ? pageBtnHoverBg : tabInactiveColor 
                    }}
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
