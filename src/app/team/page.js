"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  Box,
  Button,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import TeamShowcase from "@/components/TeamShowcase";
import TeamDetail from "@/components/TeamDetail";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import { getHeroSection, getTeamSection } from "@/lib/api";

const FALLBACK_HERO = {
  headlineLines: [{ text: "Meet The People Behind Great Project.", color: null }],
  subheadline:
    "A team of professionals dedicated to helping company strengthen reputation, and create meaningful connections.",
  backgroundImage: null,
  hasBgImage: false,
};

const AUTO_SLIDE_INTERVAL = 4000;

export default function TeamPage() {
  const [members, setMembers] = useState([]);
  const [banners, setBanners] = useState([]);
  const [heroes, setHeroes] = useState([FALLBACK_HERO]);
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    getTeamSection().then((data) => {
      setMembers(data.members);
      setBanners(data.banners);
    });

    getHeroSection("team").then((apiHeroes) => {
      if (apiHeroes.length > 0) setHeroes(apiHeroes);
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

  const hasBg = heroes.length > 0 && heroes.some((h) => Boolean(h.hasBgImage || h.backgroundImage));
  const currentHero = heroes[activeIndex] ?? heroes[0] ?? FALLBACK_HERO;
  const showDots = heroes.length > 1;

  const pageBg = useColorModeValue("#f7f8fc", "#05060A");
  const headingText = useColorModeValue("#3C87F9", "#fff");
  const subHeadingText = useColorModeValue("rgba(0, 0, 0, 0.65)", "#a0aab8");
  const bgOverlay = useColorModeValue(
    "radial-gradient(ellipse at center bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 85%), linear-gradient(180deg,rgba(5, 6, 10, 0) 0%,rgba(5, 6, 10, 0.1) 30%,rgba(5, 6, 10, 0.2) 60%,rgba(255, 255, 255, 0.3) 75%,rgba(255, 255, 255, 0.97) 90%,rgba(255, 255, 255, 1) 100%)",
    "radial-gradient(ellipse at center bottom, rgba(5, 6, 10, 0) 0%, rgba(5, 6, 10, 0) 85%), linear-gradient(180deg,rgba(5, 6, 10, 0) 0%,rgba(5, 6, 10, 0.1) 30%,rgba(5, 6, 10, 0.2) 60%,rgba(5, 6, 10, 0.3) 75%,rgba(5, 6, 10, 0.97) 90%,rgba(5, 6, 10, 1) 100%)"
  );

  return (
    <Box position="relative" bg={pageBg}>
      {/* Orange glow — top center (only when without BG) */}
      {!hasBg && (
        <Box
          position="absolute"
          top="-100px"
          left="50%"
          transform="translateX(-50%)"
          w={{ base: "100%", md: "1200px" }}
          h={{ base: "100%", md: "800px" }}
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(216, 98, 29, 0.3) 0%, transparent 60%)",
          }}
          pointerEvents="none"
          zIndex={0}
        />
      )}

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
                Teams
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
                    fontSize={{ base: "16px", md: "19px" }}
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
              background:
                "radial-gradient(ellipse at center top, rgba(29,78,216,0.45) 0%, transparent 60%)",
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
            <VStack
              spacing={{ base: 5, md: 8 }}
              align="center"
              textAlign="center"
              w="full"
            >
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
                Teams
              </Box>

              {/* Headline with crossfade */}
              <Box position="relative" w="full" minH={{ base: "90px", md: "140px" }}>
                {heroes.map((h, idx) => (
                  <Heading
                    key={h.id ?? idx}
                    as={idx === activeIndex ? "h1" : "div"}
                    fontSize={{ base: "42px", md: "72px", xl: "90px" }}
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
                        <Text as="span" display="block" key={lIdx} color={headingText}>
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
                    fontSize={{ base: "16px", md: "19px" }}
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

      {/* ── Team Showcase (Interactive Carousel) ── */}
      <Box pb={{ base: 6, md: 20 }}>
        <TeamShowcase banners={banners} />
      </Box>

      {/* ── Team Detail Grid Section ── */}
      <TeamDetail members={members} />

      {/* ── Contact ── */}
      <ContactSection />

      {/* ── Footer ── */}
      <FooterSection />
    </Box>
  );
}
