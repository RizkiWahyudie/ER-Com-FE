"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  Box,
  Button,
  Container,
  VStack,
  Heading,
  Text,
  HStack,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react";
import { getHeroSection, getStatsSection, sanitizeRichText } from "@/lib/api";

const AUTO_SLIDE_INTERVAL = 4000;

export default function HeroSection() {
  const [heroes, setHeroes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    getHeroSection("home")
      .then((data) => {
        if (!isMounted) return;
        if (Array.isArray(data) && data.length > 0) {
          setHeroes(data);
        } else {
          setHeroes([]);
        }
      })
      .catch(() => {
        if (isMounted) setHeroes([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    getStatsSection()
      .then((data) => {
        if (isMounted && Array.isArray(data)) {
          setStats(data);
        }
      })
      .catch(() => {
        if (isMounted) setStats([]);
      })
      .finally(() => {
        if (isMounted) setLoadingStats(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-slide timer — only when there are multiple slides
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
    // Reset the auto-slide timer so it doesn't immediately jump
    startTimer();
  };

  // Resolve the currently displayed hero
  const currentHero = heroes[activeIndex] ?? null;
  const showDots = heroes.length > 1;

  const overlay = useColorModeValue(
    "radial-gradient(ellipse at center bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 85%), linear-gradient(180deg,rgba(5, 6, 10, 0) 0%,rgba(5, 6, 10, 0.1) 30%,rgba(5, 6, 10, 0.2) 60%,rgba(5, 6, 10, 0.3) 75%,rgba(255, 255, 255, 0.97) 90%,rgba(255, 255, 255, 1) 100%)",
    "radial-gradient(ellipse at center bottom, rgba(5, 6, 10, 0) 0%, rgba(5, 6, 10, 0) 85%), linear-gradient(180deg,rgba(5, 6, 10, 0) 0%,rgba(5, 6, 10, 0.1) 30%,rgba(5, 6, 10, 0.2) 60%,rgba(5, 6, 10, 0.3) 75%,rgba(5, 6, 10, 0.97) 90%,rgba(5, 6, 10, 1) 100%  )"
  );
  const bnw = useColorModeValue("#000", "#fff");
  const skeletonStartColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const skeletonEndColor = useColorModeValue("gray.300", "whiteAlpha.300");

  return (
    <Box
      position="relative"
      w="full"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      bg="var(--background)"
      overflow="hidden"
    >
      {/* Background Media — stacked for crossfade */}
      {!loading && heroes.length > 0
        ? heroes.map((hero, idx) =>
            hero.background_media_type === "video" ? (
              <Box
                key={hero.id ?? idx}
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                opacity={idx === activeIndex ? 1 : 0}
                transition="opacity 0.8s ease-in-out"
                zIndex={0}
                overflow="hidden"
              >
                <video
                  src={hero.backgroundImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    pointerEvents: "none",
                  }}
                />
              </Box>
            ) : hero.backgroundImage ? (
              <Box
                key={hero.id ?? idx}
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                backgroundImage={`url('${hero.backgroundImage}')`}
                backgroundSize="cover"
                backgroundPosition="center"
                opacity={idx === activeIndex ? 1 : 0}
                transition="opacity 0.8s ease-in-out"
                zIndex={0}
              />
            ) : null
          )
        : null}

      {/* Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        background={overlay}
        opacity={!loading && heroes.length > 0 ? 1 : 0}
        transition="opacity 0.8s ease-in-out"
        zIndex={1}
        pointerEvents="none"
      />

      <HStack
        spacing={{ base: 8, md: 20 }}
        justify="center"
        flexDir={{ base: "column", md: "row" }}
      />

      {/* Content */}
      <Container
        maxW="7xl"
        w="full"
        position="relative"
        zIndex={2}
        px={{ base: 6, md: 6 }}
        mx="auto"
      >
        <VStack
          spacing={{ base: 6, md: 8, lg: 12 }}
          align="center"
          textAlign="center"
          w="full"
        >
          {/* Main Heading */}
          <Box position="relative" w="full" minH={{ base: "100px", md: "140px" }}>
            {loading ? (
              <VStack
                spacing={{ base: 3, md: 4 }}
                align="center"
                justify="center"
                w="full"
                maxW="4xl"
                mx="auto"
                py={1}
              >
                <Skeleton
                  h={{ base: "38px", md: "52px", lg: "62px" }}
                  w={{ base: "85%", md: "70%", lg: "60%" }}
                  maxW="720px"
                  borderRadius="lg"
                  startColor={skeletonStartColor}
                  endColor={skeletonEndColor}
                />
                <Skeleton
                  h={{ base: "38px", md: "52px", lg: "62px" }}
                  w={{ base: "65%", md: "50%", lg: "42%" }}
                  maxW="480px"
                  borderRadius="lg"
                  startColor={skeletonStartColor}
                  endColor={skeletonEndColor}
                />
              </VStack>
            ) : heroes.length > 0 ? (
              heroes.map((hero, idx) => (
                <Heading
                  key={hero.id ?? idx}
                  as={idx === activeIndex ? "h1" : "div"}
                  fontSize={{ base: "42px", md: "56px", lg: "64px" }}
                  color="#fff"
                  fontWeight="700"
                  lineHeight="1.15"
                  letterSpacing="-1px"
                  fontFamily="Plus Jakarta Sans"
                  position={idx === 0 ? "relative" : "absolute"}
                  top={0}
                  left={0}
                  right={0}
                  opacity={idx === activeIndex ? 1 : 0}
                  transition="opacity 0.6s ease-in-out"
                  pointerEvents={idx === activeIndex ? "auto" : "none"}
                >
                  {hero.headlineLines && hero.headlineLines.length > 0 ? (
                    hero.headlineLines.map((line, lIdx) => (
                      <Text
                        as="span"
                        display="block"
                        key={lIdx}
                        color={line.color || "#fff"}
                        dangerouslySetInnerHTML={{ __html: line.html || line.text }}
                      />
                    ))
                  ) : (
                    <Text
                      as="span"
                      display="block"
                      color="#fff"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeRichText(hero.headline),
                      }}
                    />
                  )}
                </Heading>
              ))
            ) : null}
          </Box>

          {/* Subtitle */}
          <Box position="relative" w="full" minH={{ base: "50px", md: "60px" }}>
            {loading ? (
              <VStack
                spacing={2.5}
                align="center"
                justify="center"
                w="full"
                maxW="2xl"
                mx="auto"
              >
                <Skeleton
                  h={{ base: "14px", md: "16px" }}
                  w="95%"
                  borderRadius="md"
                  startColor={skeletonStartColor}
                  endColor={skeletonEndColor}
                />
                <Skeleton
                  h={{ base: "14px", md: "16px" }}
                  w="80%"
                  borderRadius="md"
                  startColor={skeletonStartColor}
                  endColor={skeletonEndColor}
                />
                <Skeleton
                  h={{ base: "14px", md: "16px" }}
                  w="55%"
                  borderRadius="md"
                  startColor={skeletonStartColor}
                  endColor={skeletonEndColor}
                />
              </VStack>
            ) : heroes.length > 0 ? (
              heroes.map((hero, idx) => (
                <Text
                  key={hero.id ?? idx}
                  fontSize={{ base: "sm", md: "16px", lg: "18px" }}
                  color="#a0aab8"
                  maxW="2xl"
                  mx="auto"
                  lineHeight="1.6"
                  position={idx === 0 ? "relative" : "absolute"}
                  top={0}
                  left={0}
                  right={0}
                  opacity={idx === activeIndex ? 1 : 0}
                  transition="opacity 0.6s ease-in-out"
                  pointerEvents={idx === activeIndex ? "auto" : "none"}
                  dangerouslySetInnerHTML={{
                    __html: sanitizeRichText(hero.subheadline),
                  }}
                />
              ))
            ) : null}
          </Box>

          {/* CTA Button */}
          {!loading && currentHero?.cta_text && currentHero?.cta_url && (
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
          {!loading && showDots && (
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
      <HStack
        spacing={{ base: 8, md: 20 }}
        justify="space-evenly"
        flexDir="row"
        pb={{ base: 4, md: 8 }}
        w={{ xl: "7xl" }}
        position="relative"
        zIndex={2}
      >
        {loadingStats && stats.length === 0 ? (
          [1, 2, 3].map((_, index) => (
            <HStack key={index} spacing={{ base: 8, md: 20 }}>
              {index > 0 && <Box w="1px" h="120px" bg="rgba(255, 255, 255, 0.15)" />}
              <VStack spacing={2} align="center">
                <Skeleton
                  h={{ base: "13px", md: "15px", lg: "20px" }}
                  w={{ base: "65px", md: "85px", lg: "110px" }}
                  borderRadius="md"
                  startColor={skeletonStartColor}
                  endColor={skeletonEndColor}
                />
                <Skeleton
                  h={{ base: "38px", md: "44px", lg: "50px" }}
                  w={{ base: "75px", md: "95px", lg: "120px" }}
                  borderRadius="md"
                  startColor={skeletonStartColor}
                  endColor={skeletonEndColor}
                />
              </VStack>
            </HStack>
          ))
        ) : (
          stats.map((stat, index) => (
            <HStack key={stat.id ?? stat.stat_label} spacing={{ base: 8, md: 20 }}>
              {index > 0 && <Box w="1px" h="120px" bg="rgba(255, 255, 255, 0.15)" />}
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
          ))
        )}
      </HStack>
    </Box>
  );
}
