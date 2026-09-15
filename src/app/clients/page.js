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
  backgroundImage: null,
  hasBgImage: false,
};

const AUTO_SLIDE_INTERVAL = 4000;

const FALLBACK_CATEGORIES = [
  "Finance & Banking",
  "Technology",
  "Healthcare",
  "Retail & FMCG",
  "Energy & Mining",
  "Government & NGO",
];

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
  const [heroes, setHeroes] = useState([FALLBACK_HERO]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    getClientCategories().then((apiCategories) => {
      if (apiCategories.length > 0) setCategories(["All", ...apiCategories]);
    });

    getClients().then((apiClients) => {
      if (apiClients.length > 0) setClients(apiClients);
    });

    getHeroSection("client").then((apiHeroes) => {
      if (apiHeroes.length > 0) setHeroes(apiHeroes);
    });

    getTestimonials().then(setTestimonials);
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

  const hasBg = heroes.length > 0 && heroes.some((h) => Boolean(h.hasBgImage || h.backgroundImage));
  const currentHero = heroes[activeIndex] ?? heroes[0] ?? FALLBACK_HERO;
  const showDots = heroes.length > 1;

  const pageBg = useColorModeValue("#fff", "#05060A");
  const tabActiveBg = useColorModeValue("#1e293b", "#fff");
  const tabActiveColor = useColorModeValue("#fff", "#000");
  const tabInactiveBorder = useColorModeValue("rgba(0,0,0,0.22)", "rgba(255,255,255,0.22)");
  const tabInactiveColor = useColorModeValue("rgba(0,0,0,0.65)", "rgba(255,255,255,0.65)");
  const tabHoverBorder = useColorModeValue("#1e293b", "#fff");
  const emptyTextColor = useColorModeValue("rgba(0,0,0,0.4)", "rgba(255,255,255,0.3)");

  const headingText = useColorModeValue("#3C87F9", "#fff");
  const subHeadingText = useColorModeValue("rgba(0, 0, 0, 0.65)", "#a0aab8");
  const bgOverlay = useColorModeValue(
    "radial-gradient(ellipse at center bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 85%, linear-gradient(180deg,rgba(5, 6, 10, 0) 0%,rgba(5, 6, 10, 0.1) 30%,rgba(5, 6, 10, 0.2) 60%,rgba(255, 255, 255, 0.3) 75%,rgba(255, 255, 255, 0.97) 90%,rgba(255, 255, 255, 1) 100%)",
    "radial-gradient(ellipse at center bottom, rgba(5, 6, 10, 0) 0%, rgba(5, 6, 10, 0) 85%, linear-gradient(180deg,rgba(5, 6, 10, 0) 0%,rgba(5, 6, 10, 0.1) 30%,rgba(5, 6, 10, 0.2) 60%,rgba(5, 6, 10, 0.3) 75%,rgba(5, 6, 10, 0.97) 90%,rgba(5, 6, 10, 1) 100%)"
  );

  const filtered = activeCategory === "All"
    ? clients
    : clients.filter((c) => c.type === activeCategory);

  return (
    <Box
      position="relative"
      bg={pageBg}
      _before={
        hasBg
          ? undefined
          : {
              content: '""',
              position: "fixed",
              inset: 0,
              background:
                "radial-gradient(ellipse at 15% 20%, rgba(29,78,216,0.22) 0%, transparent 50%), " +
                "radial-gradient(ellipse at 85% 75%, rgba(194,65,12,0.25) 0%, transparent 50%)",
              pointerEvents: "none",
              zIndex: 0,
            }
      }
    >
      <Navbar />

      {/* ── Hero Section ── */}
      {hasBg ? (
        <Box
          position="relative"
          w="full"
          minH={{ base: "80vh", md: "100vh" }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          pt={{ base: "140px", md: "180px" }}
          pb={{ base: 12, md: 16 }}
          overflow="hidden"
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
              backgroundImage={`url('${h.backgroundImage}')`}
              backgroundSize="cover"
              backgroundPosition="center"
              opacity={idx === activeIndex ? 1 : 0}
              transition="opacity 0.8s ease-in-out"
              zIndex={0}
            />
          ))}

          {/* Gradient overlay */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            background={bgOverlay}
            zIndex={1}
          />

          <Container maxW="7xl" px={{ base: 6, md: 8 }} textAlign="center" position="relative" zIndex={2}>
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

              {/* Headline with crossfade */}
              <Box position="relative" w="full" minH={{ base: "90px", md: "140px" }}>
                {heroes.map((h, idx) => (
                  <Heading
                    key={h.id ?? idx}
                    as={idx === activeIndex ? "h1" : "div"}
                    fontSize={{ base: "52px", md: "72px", xl: "90px" }}
                    color="#fff"
                    fontWeight="700"
                    lineHeight="1.05"
                    letterSpacing="-1.8px"
                    fontFamily="Plus Jakarta Sans"
                    position={idx === 0 ? "relative" : "absolute"}
                    top={0}
                    left={0}
                    right={0}
                    opacity={idx === activeIndex ? 1 : 0}
                    transition="opacity 0.6s ease-in-out"
                    pointerEvents={idx === activeIndex ? "auto" : "none"}
                  >
                    {h.headlineLines && h.headlineLines.length > 0 ? (
                      h.headlineLines.map((line, lIdx) => (
                        <Text as="span" display="block" key={lIdx} color={line.color || "#fff"}>
                          {line.text}
                        </Text>
                      ))
                    ) : (
                      <Text as="span" display="block" color="#fff" dangerouslySetInnerHTML={{ __html: h.headline }} />
                    )}
                  </Heading>
                ))}
              </Box>

              {/* Subheadline with crossfade */}
              <Box position="relative" w="full" minH={{ base: "50px", md: "60px" }}>
                {heroes.map((h, idx) => (
                  <Text
                    key={h.id ?? idx}
                    fontSize={{ base: "18px", md: "20px", xl: "21px" }}
                    color="#ffffff"
                    maxW="2xl"
                    mx="auto"
                    lineHeight="1.6"
                    position={idx === 0 ? "relative" : "absolute"}
                    top={0}
                    left={0}
                    right={0}
                    opacity={idx === activeIndex ? 0.85 : 0}
                    transition="opacity 0.6s ease-in-out"
                    pointerEvents={idx === activeIndex ? "auto" : "none"}
                  >
                    {h.subheadline}
                  </Text>
                ))}
              </Box>

              {/* CTA Button — only when background exists */}
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
        </Box>
      ) : (
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

              {/* Headline with crossfade */}
              <Box position="relative" w="full" minH={{ base: "90px", md: "140px" }}>
                {heroes.map((h, idx) => (
                  <Heading
                    key={h.id ?? idx}
                    as={idx === activeIndex ? "h1" : "div"}
                    fontSize={{ base: "52px", md: "72px", xl: "90px" }}
                    color={headingText}
                    fontWeight="700"
                    lineHeight="1.05"
                    letterSpacing="-1.8px"
                    fontFamily="Plus Jakarta Sans"
                    position={idx === 0 ? "relative" : "absolute"}
                    top={0}
                    left={0}
                    right={0}
                    opacity={idx === activeIndex ? 1 : 0}
                    transition="opacity 0.6s ease-in-out"
                    pointerEvents={idx === activeIndex ? "auto" : "none"}
                  >
                    {h.headlineLines && h.headlineLines.length > 0 ? (
                      h.headlineLines.map((line, lIdx) => (
                        <Text as="span" display="block" key={lIdx} color={line.color || headingText}>
                          {line.text}
                        </Text>
                      ))
                    ) : (
                      <Text as="span" display="block" color={headingText} dangerouslySetInnerHTML={{ __html: h.headline }} />
                    )}
                  </Heading>
                ))}
              </Box>

              {/* Subheadline with crossfade */}
              <Box position="relative" w="full" minH={{ base: "50px", md: "60px" }}>
                {heroes.map((h, idx) => (
                  <Text
                    key={h.id ?? idx}
                    fontSize={{ base: "18px", md: "20px", xl: "21px" }}
                    color={subHeadingText}
                    maxW="2xl"
                    mx="auto"
                    lineHeight="1.6"
                    position={idx === 0 ? "relative" : "absolute"}
                    top={0}
                    left={0}
                    right={0}
                    opacity={idx === activeIndex ? 0.85 : 0}
                    transition="opacity 0.6s ease-in-out"
                    pointerEvents={idx === activeIndex ? "auto" : "none"}
                  >
                    {h.subheadline}
                  </Text>
                ))}
              </Box>

              {/* Carousel Dots (without CTA, matching no-bg style) */}
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
                      bg={idx === activeIndex ? headingText : "rgba(128, 128, 128, 0.35)"}
                      transition="all 0.3s ease"
                      cursor="pointer"
                      _hover={{ bg: idx === activeIndex ? headingText : "rgba(128, 128, 128, 0.6)" }}
                      onClick={() => goToSlide(idx)}
                    />
                  ))}
                </HStack>
              )}
            </VStack>
          </Container>
        </Box>
      )}

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
