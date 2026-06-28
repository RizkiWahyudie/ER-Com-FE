"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Image,
  Flex,
  Icon,
  SimpleGrid,
  Portal,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { FaPlay, FaArrowRight, FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const featuredSlides = [
  {
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop",
    label: "Media Event",
  },
  {
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    label: "Brand Strategy",
  },
  {
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=600&fit=crop",
    label: "Media Relation",
  },
];

const allGridPhotos = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1551818255-e6e10579a0ab?w=600&h=400&fit=crop",
];

const INITIAL_COUNT = 6;
const BATCH_SIZE = 6;

function Lightbox({ photos, index, onClose }) {
  const [current, setCurrent] = useState(index);
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 280);
  }, [onClose]);

  const prev = useCallback(() => {
    setImgLoaded(false);
    setCurrent((i) => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const next = useCallback(() => {
    setImgLoaded(false);
    setCurrent((i) => (i + 1) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, prev, next]);

  return (
    <Portal>
      <style>{`
        @keyframes lbFadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes lbFadeOut { from { opacity: 1 } to { opacity: 0 } }
        @keyframes lbSlideUp { from { opacity: 0; transform: translateY(32px) scale(0.96) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes lbImgIn   { from { opacity: 0; transform: scale(0.97) } to { opacity: 1; transform: scale(1) } }
      `}</style>

      {/* Backdrop */}
      <Box
        position="fixed"
        inset={0}
        zIndex={9999}
        bg="rgba(0,0,0,0.92)"
        backdropFilter="blur(18px)"
        style={{
          animation: `${visible ? "lbFadeIn" : "lbFadeOut"} 280ms ease both`,
        }}
        onClick={close}
      />

      {/* Panel */}
      <Box
        position="fixed"
        inset={0}
        zIndex={10000}
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={{ base: 4, md: 10 }}
        py={{ base: 4, md: 8 }}
        pointerEvents="none"
      >
        <Box
          position="relative"
          w="full"
          maxW="1000px"
          pointerEvents="auto"
          style={{
            animation: visible ? "lbSlideUp 320ms cubic-bezier(0.34,1.26,0.64,1) both" : "lbFadeOut 280ms ease both",
          }}
        >
          {/* Image wrapper */}
          <Box
            borderRadius="20px"
            overflow="hidden"
            boxShadow="0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)"
            position="relative"
            bg="#0a0a0f"
            minH={{ base: "240px", md: "520px" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              key={current}
              src={photos[current]}
              alt={`Photo ${current + 1}`}
              w="full"
              maxH={{ base: "60vh", md: "78vh" }}
              objectFit="contain"
              style={{ animation: "lbImgIn 300ms ease both" }}
              onLoad={() => setImgLoaded(true)}
            />

            {/* Gradient bottom */}
            <Box
              position="absolute"
              bottom={0} left={0} right={0}
              h="80px"
              background="linear-gradient(0deg, rgba(0,0,0,0.55) 0%, transparent 100%)"
              borderBottomRadius="20px"
              pointerEvents="none"
            />

            {/* Counter bottom center */}
            <Box
              position="absolute"
              bottom={4}
              left="50%"
              transform="translateX(-50%)"
              bg="rgba(0,0,0,0.5)"
              backdropFilter="blur(8px)"
              borderRadius="full"
              px={4} py={1}
              border="1px solid rgba(255,255,255,0.1)"
            >
              <Text fontSize="12px" color="rgba(255,255,255,0.7)" fontWeight="500">
                {current + 1} / {photos.length}
              </Text>
            </Box>
          </Box>

          {/* Dot strip */}
          <Flex justify="center" gap={1.5} mt={4}>
            {photos.map((_, i) => (
              <Box
                key={i}
                as="button"
                onClick={() => { setImgLoaded(false); setCurrent(i); }}
                w={i === current ? "20px" : "6px"}
                h="6px"
                borderRadius="full"
                bg={i === current ? "#2563EB" : "rgba(255,255,255,0.25)"}
                transition="all 0.3s ease"
              />
            ))}
          </Flex>
        </Box>
      </Box>

      {/* Close button */}
      <Flex
        position="fixed"
        top={{ base: 4, md: 6 }}
        right={{ base: 4, md: 6 }}
        zIndex={10001}
        w="44px" h="44px"
        borderRadius="full"
        bg="rgba(255,255,255,0.08)"
        border="1px solid rgba(255,255,255,0.12)"
        backdropFilter="blur(8px)"
        align="center"
        justify="center"
        cursor="pointer"
        onClick={close}
        transition="all 0.2s"
        _hover={{ bg: "rgba(255,255,255,0.18)", transform: "scale(1.08)" }}
      >
        <Icon as={FaTimes} color="#fff" w={4} h={4} />
      </Flex>

      {/* Prev arrow */}
      <Flex
        position="fixed"
        left={{ base: 3, md: 8 }}
        top="50%"
        transform="translateY(-50%)"
        zIndex={10001}
        w={{ base: "42px", md: "52px" }}
        h={{ base: "42px", md: "52px" }}
        borderRadius="full"
        bg="rgba(255,255,255,0.08)"
        border="1px solid rgba(255,255,255,0.12)"
        backdropFilter="blur(8px)"
        align="center"
        justify="center"
        cursor="pointer"
        onClick={prev}
        transition="all 0.2s"
        _hover={{ bg: "rgba(255,255,255,0.2)", transform: "translateY(-50%) scale(1.08)" }}
      >
        <Icon as={FaChevronLeft} color="#fff" w={4} h={4} />
      </Flex>

      {/* Next arrow */}
      <Flex
        position="fixed"
        right={{ base: 3, md: 8 }}
        top="50%"
        transform="translateY(-50%)"
        zIndex={10001}
        w={{ base: "42px", md: "52px" }}
        h={{ base: "42px", md: "52px" }}
        borderRadius="full"
        bg="rgba(37,99,235,0.85)"
        border="1px solid rgba(37,99,235,0.4)"
        backdropFilter="blur(8px)"
        align="center"
        justify="center"
        cursor="pointer"
        onClick={next}
        transition="all 0.2s"
        _hover={{ bg: "#2563EB", transform: "translateY(-50%) scale(1.08)" }}
      >
        <Icon as={FaChevronRight} color="#fff" w={4} h={4} />
      </Flex>
    </Portal>
  );
}

export default function PortofolioPage() {
  const [slideIdx, setSlideIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isLoading, setIsLoading] = useState(false);
  const [newlyAdded, setNewlyAdded] = useState(new Set());
  const gridRef = useRef(null);

  const gridPhotos = allGridPhotos.slice(0, visibleCount);
  const hasMore = visibleCount < allGridPhotos.length;

  const nextSlide = () => setSlideIdx((i) => (i + 1) % featuredSlides.length);

  const handleViewAll = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      const prevCount = visibleCount;
      const nextCount = Math.min(visibleCount + BATCH_SIZE, allGridPhotos.length);
      const added = new Set();
      for (let i = prevCount; i < nextCount; i++) added.add(i);
      setNewlyAdded(added);
      setVisibleCount(nextCount);
      setIsLoading(false);
      setTimeout(() => setNewlyAdded(new Set()), 700);
    }, 600);
  }, [isLoading, hasMore, visibleCount]);

  return (
    <>
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
        <Box
          position="absolute"
          top={0} left={0} right={0} bottom={0}
          background="linear-gradient(180deg, rgba(5,6,10,0.35) 0%, rgba(5,6,10,0.25) 50%, rgba(5,6,10,0.88) 85%, rgba(5,6,10,1) 100%)"
          zIndex={0}
        />

        <Container
          maxW="4xl"
          px={{ base: 6, md: 8 }}
          textAlign="center"
          position="relative"
          zIndex={1}
          pt={{ base: "160px", md: "220px" }}
        >
          <VStack spacing={{ base: 5, md: 8 }}>
            <Heading
              as="h1"
              fontSize={{ base: "52px", md: "72px", xl: "90px" }}
              color="#fff"
              fontWeight="700"
              lineHeight="1.05"
              letterSpacing="-1.5px"
              fontFamily="Plus Jakarta Sans"
            >
              Know Us{" "}
              <Text as="span" color="var(--accent)">More.</Text>
              <br />
              Get Closer.
            </Heading>
            <Text
              fontSize={{ base: "15px", md: "17px" }}
              color="rgba(255,255,255,0.75)"
              maxW="2xl"
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
            <Text fontSize={{ base: "13px", md: "15px", lg: "24px" }} fontWeight="600" color="var(--accent)" textTransform="uppercase">
              Clients
            </Text>
            <Text fontSize={{ base: "42px", md: "48px", lg: "52px" }} fontWeight="700" color="#fff" fontFamily="Plus Jakarta Sans">
              500+
            </Text>
          </VStack>
          <Box w="1px" h="120px" bg="rgba(255,255,255,0.15)" />
          <VStack spacing={1.5}>
            <Text fontSize={{ base: "13px", md: "15px", lg: "24px" }} fontWeight="600" color="var(--accent)" textTransform="uppercase">
              Achievements
            </Text>
            <Text fontSize={{ base: "42px", md: "48px", lg: "52px" }} fontWeight="700" color="#fff" fontFamily="Plus Jakarta Sans">
              57+
            </Text>
          </VStack>
        </HStack>
      </Box>

      {/* ── Our Projects ── */}
      <Box bg="var(--background)" py={{ base: 16, md: 24 }}>
        <Container maxW="4xl" px={{ base: 6, md: 8 }} textAlign="center">
          <VStack spacing={4}>
            <Heading
              as="h2"
              fontSize={{ base: "28px", md: "44px", lg: "50px" }}
              fontWeight="600"
              color="#fff"
              fontFamily="Plus Jakarta Sans"
              lineHeight="1.2"
            >
              Our projects with<br />
              companies that trust us.
            </Heading>
            <Text fontSize={{ base: "13px", md: "15px" }} color="rgba(255,255,255,0.45)" maxW="380px" lineHeight="1.6">
              Companies are ditching legacy platforms for the ability to deliver an engaging
              experience at every level.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* ── Featured Carousel ── */}
      <Box bg="var(--background)" pb={{ base: 4, md: 6 }}>
        <Container maxW="7xl" px={{ base: 6, md: 8 }}>
          <Box
            position="relative"
            borderRadius="20px"
            overflow="hidden"
            h={{ base: "280px", md: "480px" }}
          >
            <Image
              src={featuredSlides[slideIdx].img}
              alt={featuredSlides[slideIdx].label}
              w="full"
              h="full"
              objectFit="cover"
              transition="opacity 0.4s ease"
            />

            {/* Dark overlay */}
            <Box
              position="absolute"
              inset={0}
              bg="rgba(5,6,10,0.35)"
            />

            {/* Play button center */}
            <Flex
              position="absolute"
              inset={0}
              align="center"
              justify="center"
            >
              <Flex
                w={{ base: "52px", md: "68px" }}
                h={{ base: "52px", md: "68px" }}
                borderRadius="full"
                bg="rgba(255,255,255,0.25)"
                backdropFilter="blur(8px)"
                align="center"
                justify="center"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ bg: "rgba(255,255,255,0.4)", transform: "scale(1.08)" }}
              >
                <Icon as={FaPlay} color="#fff" w={5} h={5} ml={1} />
              </Flex>
            </Flex>

            {/* Next arrow */}
            <Flex
              position="absolute"
              right={4}
              top="50%"
              transform="translateY(-50%)"
              w="44px"
              h="44px"
              borderRadius="full"
              bg="rgba(255,255,255,0.15)"
              backdropFilter="blur(8px)"
              align="center"
              justify="center"
              cursor="pointer"
              onClick={nextSlide}
              transition="all 0.2s"
              _hover={{ bg: "rgba(255,255,255,0.3)" }}
            >
              <Icon as={FaArrowRight} color="#fff" w={4} h={4} />
            </Flex>

            {/* Dot indicators */}
            <HStack position="absolute" bottom={4} left="50%" transform="translateX(-50%)" spacing={2}>
              {featuredSlides.map((_, i) => (
                <Box
                  key={i}
                  as="button"
                  onClick={() => setSlideIdx(i)}
                  w={i === slideIdx ? "24px" : "8px"}
                  h="8px"
                  borderRadius="full"
                  bg={i === slideIdx ? "#fff" : "rgba(255,255,255,0.45)"}
                  transition="all 0.3s"
                />
              ))}
            </HStack>
          </Box>
        </Container>
      </Box>

      {/* ── Photo Grid ── */}
      <Box bg="var(--background)" py={{ base: 4, md: 6 }} pb={{ base: 16, md: 24 }}>
        <style>{`
          @keyframes gridFadeIn {
            from { opacity: 0; transform: translateY(20px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
        <Container maxW="7xl" px={{ base: 6, md: 8 }}>
          <SimpleGrid ref={gridRef} columns={{ base: 2, md: 3 }} spacing={3}>
            {gridPhotos.map((src, idx) => (
              <Box
                key={src}
                borderRadius="14px"
                overflow="hidden"
                h={{ base: "140px", md: "220px" }}
                cursor="pointer"
                position="relative"
                role="group"
                onClick={() => setLightboxIdx(idx)}
                transition="transform 0.3s cubic-bezier(0.34,1.26,0.64,1), box-shadow 0.3s ease"
                _hover={{
                  transform: "translateY(-4px) scale(1.02)",
                  boxShadow: "0 16px 40px rgba(37,99,235,0.25)",
                }}
                style={
                  newlyAdded.has(idx)
                    ? { animation: `gridFadeIn 0.55s cubic-bezier(0.34,1.26,0.64,1) both` }
                    : undefined
                }
              >
                <Image
                  src={src}
                  alt={`Portfolio ${idx + 1}`}
                  w="full"
                  h="full"
                  objectFit="cover"
                  transition="transform 0.45s ease"
                  _groupHover={{ transform: "scale(1.07)" }}
                />

                {/* Hover overlay */}
                <Box
                  position="absolute"
                  inset={0}
                  bg="rgba(5,6,10,0)"
                  transition="background 0.3s"
                  _groupHover={{ bg: "rgba(5,6,10,0.45)" }}
                />

                {/* Expand icon center */}
                <Flex
                  position="absolute"
                  inset={0}
                  align="center"
                  justify="center"
                  opacity={0}
                  transition="opacity 0.3s ease"
                  _groupHover={{ opacity: 1 }}
                >
                  <Flex
                    w="44px" h="44px"
                    borderRadius="full"
                    bg="rgba(255,255,255,0.15)"
                    backdropFilter="blur(8px)"
                    border="1px solid rgba(255,255,255,0.25)"
                    align="center"
                    justify="center"
                    transition="transform 0.25s ease"
                    _groupHover={{ transform: "scale(1.1)" }}
                  >
                    <Icon as={FaExpand} color="#fff" w={3.5} h={3.5} />
                  </Flex>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>

          {/* View All button */}
          {hasMore && (
            <Flex justify="center" mt={{ base: 8, md: 12 }}>
              <Button
                onClick={handleViewAll}
                isLoading={isLoading}
                disabled={isLoading}
                px={10}
                py={6}
                fontSize={{ base: "14px", md: "15px" }}
                fontWeight="600"
                fontFamily="Plus Jakarta Sans"
                color="#fff"
                bg="transparent"
                border="1.5px solid rgba(37,99,235,0.6)"
                borderRadius="full"
                letterSpacing="0.02em"
                position="relative"
                overflow="hidden"
                transition="all 0.3s ease"
                _hover={{
                  bg: "rgba(37,99,235,0.15)",
                  borderColor: "#2563EB",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 32px rgba(37,99,235,0.3)",
                }}
                _active={{ transform: "translateY(0)" }}
                spinner={<Spinner size="sm" color="#2563EB" />}
              >
                {isLoading ? "Loading..." : `View All (${allGridPhotos.length - visibleCount} more)`}
              </Button>
            </Flex>
          )}
        </Container>
      </Box>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          photos={gridPhotos}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}

      <ContactSection />
      <FooterSection />
    </>
  );
}
