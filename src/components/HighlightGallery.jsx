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
  Portal,
  useColorModeValue
} from "@chakra-ui/react";
import {
  FaPlay,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
} from "react-icons/fa";

// ─── Data ────────────────────────────────────────────────────────────
const videos = [
  {
    id: "dQw4w9WgXcQ",
    title: "ER Communication — Corporate Highlight",
    thumb: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=500&fit=crop",
  },
  {
    id: "jNQXAC9IVRw",
    title: "ER Communication — Media Relations",
    thumb: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=500&fit=crop",
  },
  {
    id: "9bZkp7q19f0",
    title: "ER Communication — CSR Campaign",
    thumb: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&h=500&fit=crop",
  },
  {
    id: "kJQP7kiw5Fk",
    title: "ER Communication — Event Coverage",
    thumb: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&h=500&fit=crop",
  },
];

const galleryPhotos = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1551817958-d9d86fb29431?w=600&h=400&fit=crop",
];

// ─── Video Popup ─────────────────────────────────────────────────────
function VideoPopup({ videos: vids, index, onClose }) {
  const [current, setCurrent] = useState(index);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 280);
  }, [onClose]);

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + vids.length) % vids.length);
  }, [vids.length]);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % vids.length);
  }, [vids.length]);

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
        @keyframes vpFadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes vpFadeOut { from { opacity: 1 } to { opacity: 0 } }
        @keyframes vpSlideUp { from { opacity: 0; transform: translateY(32px) scale(0.96) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>

      {/* Backdrop */}
      <Box
        position="fixed"
        inset={0}
        zIndex={9999}
        bg="rgba(0,0,0,0.92)"
        backdropFilter="blur(18px)"
        style={{
          animation: `${visible ? "vpFadeIn" : "vpFadeOut"} 280ms ease both`,
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
          maxW="960px"
          pointerEvents="auto"
          style={{
            animation: visible
              ? "vpSlideUp 320ms cubic-bezier(0.34,1.26,0.64,1) both"
              : "vpFadeOut 280ms ease both",
          }}
        >
          {/* iframe wrapper */}
          <Box
            borderRadius="20px"
            overflow="hidden"
            boxShadow="0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)"
            position="relative"
            bg="#0a0a0f"
            pt="56.25%" /* 16:9 aspect ratio */
          >
            <Box
              as="iframe"
              key={current}
              position="absolute"
              top={0}
              left={0}
              w="full"
              h="full"
              src={`https://www.youtube.com/embed/${vids[current].id}?autoplay=1&rel=0`}
              title={vids[current].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              border="none"
            />
          </Box>

          {/* Video title */}
          <Text
            textAlign="center"
            color="rgba(255,255,255,0.7)"
            fontSize="14px"
            mt={4}
            fontWeight="500"
          >
            {vids[current].title} — {current + 1} / {vids.length}
          </Text>
        </Box>
      </Box>

      {/* Close button */}
      <Flex
        position="fixed"
        top={{ base: 4, md: 6 }}
        right={{ base: 4, md: 6 }}
        zIndex={10001}
        w="44px"
        h="44px"
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
        _hover={{
          bg: "rgba(255,255,255,0.2)",
          transform: "translateY(-50%) scale(1.08)",
        }}
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
        bg="rgba(229,62,62,0.85)"
        border="1px solid rgba(229,62,62,0.4)"
        backdropFilter="blur(8px)"
        align="center"
        justify="center"
        cursor="pointer"
        onClick={next}
        transition="all 0.2s"
        _hover={{
          bg: "#E53E3E",
          transform: "translateY(-50%) scale(1.08)",
        }}
      >
        <Icon as={FaChevronRight} color="#fff" w={4} h={4} />
      </Flex>
    </Portal>
  );
}

// ─── Photo Lightbox ──────────────────────────────────────────────────
function PhotoLightbox({ photos, index, onClose }) {
  const [current, setCurrent] = useState(index);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 280);
  }, [onClose]);

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const next = useCallback(() => {
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
            animation: visible
              ? "lbSlideUp 320ms cubic-bezier(0.34,1.26,0.64,1) both"
              : "lbFadeOut 280ms ease both",
          }}
        >
          {/* Image */}
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
            />

            {/* Gradient bottom */}
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              h="80px"
              background="linear-gradient(0deg, rgba(0,0,0,0.55) 0%, transparent 100%)"
              borderBottomRadius="20px"
              pointerEvents="none"
            />

            {/* Counter */}
            <Box
              position="absolute"
              bottom={4}
              left="50%"
              transform="translateX(-50%)"
              bg="rgba(0,0,0,0.5)"
              backdropFilter="blur(8px)"
              borderRadius="full"
              px={4}
              py={1}
              border="1px solid rgba(255,255,255,0.1)"
            >
              <Text
                fontSize="12px"
                color="rgba(255,255,255,0.7)"
                fontWeight="500"
              >
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
                onClick={() => setCurrent(i)}
                w={i === current ? "20px" : "6px"}
                h="6px"
                borderRadius="full"
                bg={i === current ? "#E53E3E" : "rgba(255,255,255,0.25)"}
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
        w="44px"
        h="44px"
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

      {/* Prev */}
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
        _hover={{
          bg: "rgba(255,255,255,0.2)",
          transform: "translateY(-50%) scale(1.08)",
        }}
      >
        <Icon as={FaChevronLeft} color="#fff" w={4} h={4} />
      </Flex>

      {/* Next */}
      <Flex
        position="fixed"
        right={{ base: 3, md: 8 }}
        top="50%"
        transform="translateY(-50%)"
        zIndex={10001}
        w={{ base: "42px", md: "52px" }}
        h={{ base: "42px", md: "52px" }}
        borderRadius="full"
        bg="rgba(229,62,62,0.85)"
        border="1px solid rgba(229,62,62,0.4)"
        backdropFilter="blur(8px)"
        align="center"
        justify="center"
        cursor="pointer"
        onClick={next}
        transition="all 0.2s"
        _hover={{
          bg: "#E53E3E",
          transform: "translateY(-50%) scale(1.08)",
        }}
      >
        <Icon as={FaChevronRight} color="#fff" w={4} h={4} />
      </Flex>
    </Portal>
  );
}

// ─── Main Component ──────────────────────────────────────────────────
export default function HighlightGallery() {
  const [videoPopupIdx, setVideoPopupIdx] = useState(null);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [videoSlide, setVideoSlide] = useState(0);
  const marqueeRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const prevVideo = () =>
    setVideoSlide((i) => (i - 1 + videos.length) % videos.length);
  const nextVideo = () =>
    setVideoSlide((i) => (i + 1) % videos.length);

  // Duplicate photos for seamless marquee
  const marqueePhotos = [...galleryPhotos, ...galleryPhotos];

  const overlay = useColorModeValue("radial-gradient(ellipse at center bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 85%), linear-gradient(180deg,rgba(5, 6, 10, 0) 0%,rgba(5, 6, 10, 0.1) 30%,rgba(5, 6, 10, 0.2) 60%,rgba(255, 255, 255, 0.3) 75%,rgba(255, 255, 255, 0.97) 90%,rgba(255, 255, 255, 1) 100%)", "radial-gradient(ellipse at center bottom, rgba(5, 6, 10, 0) 0%, rgba(5, 6, 10, 0) 85%), linear-gradient(180deg,rgba(5, 6, 10, 0) 0%,rgba(5, 6, 10, 0.1) 30%,rgba(5, 6, 10, 0.2) 60%,rgba(5, 6, 10, 0.3) 75%,rgba(5, 6, 10, 0.97) 90%,rgba(5, 6, 10, 1) 100%  )");
  const bnw = useColorModeValue("#000", "#fff");
  const sectionBg = useColorModeValue("#fff", "#05060A");
  const subHeading = useColorModeValue("#000", "rgba(255,255,255,0.7)");

  return (
    <Box bg={sectionBg} py={{ base: 12, md: 20 }} overflow="hidden">
      {/* ── Section Heading ── */}
      <Container maxW="7xl" px={{ base: 6, md: 8 }}>
        <VStack spacing={4} align="center" textAlign="center" mb={{ base: 10, md: 16 }}>
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "4xl", lg: "6xl" }}
            fontWeight="500"
            color={bnw}
            fontFamily="Plus Jakarta Sans"
            lineHeight="1.15"
          >
            Our Projects With
            <br />
            Companies That Trust Us.
          </Heading>
          <Text
            fontSize={{ base: "sm", md: "lg" }}
            color={subHeading}
            lineHeight="1.7"
            maxW="xl"
          >
            Companies are ditching legacy platforms for the ability to deliver an
            engaging experience at every level.
          </Text>
        </VStack>
      </Container>

      {/* ── Section 1: Video Slider ── */}
      <Container maxW="7xl" px={{ base: 6, md: 8 }} mb={{ base: 10, md: 16 }}>
        <Box position="relative" borderRadius="20px" overflow="hidden">
          {/* Current video thumbnail */}
          <Box
            position="relative"
            h={{ base: "240px", md: "480px" }}
            cursor="pointer"
            onClick={() => setVideoPopupIdx(videoSlide)}
          >
            <Image
              key={videoSlide}
              src={videos[videoSlide].thumb}
              alt={videos[videoSlide].title}
              w="full"
              h="full"
              objectFit="cover"
              transition="opacity 0.4s ease"
            />

            {/* Dark overlay */}
            <Box position="absolute" inset={0} bg="rgba(5,6,10,0.35)" />

            {/* Play button center */}
            <Flex position="absolute" inset={0} align="center" justify="center">
              <Flex
                w={{ base: "56px", md: "80px" }}
                h={{ base: "56px", md: "80px" }}
                borderRadius="full"
                bg="rgba(255,255,255,0.2)"
                backdropFilter="blur(8px)"
                border="2px solid rgba(255,255,255,0.3)"
                align="center"
                justify="center"
                transition="all 0.25s"
                _hover={{
                  bg: "rgba(255,255,255,0.35)",
                  transform: "scale(1.1)",
                }}
              >
                <Icon
                  as={FaPlay}
                  color="#fff"
                  w={{ base: 5, md: 7 }}
                  h={{ base: 5, md: 7 }}
                  ml={1}
                />
              </Flex>
            </Flex>
          </Box>

          {/* Prev arrow */}
          <Flex
            position="absolute"
            left={4}
            top="50%"
            transform="translateY(-50%)"
            w={{ base: "38px", md: "48px" }}
            h={{ base: "38px", md: "48px" }}
            borderRadius="full"
            bg="rgba(255,255,255,0.12)"
            border="1px solid rgba(255,255,255,0.2)"
            backdropFilter="blur(8px)"
            align="center"
            justify="center"
            cursor="pointer"
            onClick={(e) => {
              e.stopPropagation();
              prevVideo();
            }}
            transition="all 0.2s"
            _hover={{ bg: "rgba(255,255,255,0.25)" }}
            zIndex={2}
          >
            <Icon as={FaChevronLeft} color="#fff" w={3.5} h={3.5} />
          </Flex>

          {/* Next arrow */}
          <Flex
            position="absolute"
            right={4}
            top="50%"
            transform="translateY(-50%)"
            w={{ base: "38px", md: "48px" }}
            h={{ base: "38px", md: "48px" }}
            borderRadius="full"
            bg="rgba(255,255,255,0.12)"
            border="1px solid rgba(255,255,255,0.2)"
            backdropFilter="blur(8px)"
            align="center"
            justify="center"
            cursor="pointer"
            onClick={(e) => {
              e.stopPropagation();
              nextVideo();
            }}
            transition="all 0.2s"
            _hover={{ bg: "rgba(255,255,255,0.25)" }}
            zIndex={2}
          >
            <Icon as={FaChevronRight} color="#fff" w={3.5} h={3.5} />
          </Flex>

          {/* Dot indicators */}
          <HStack
            position="absolute"
            bottom={4}
            left="50%"
            transform="translateX(-50%)"
            spacing={2}
            zIndex={2}
          >
            {videos.map((_, i) => (
              <Box
                key={i}
                as="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setVideoSlide(i);
                }}
                w={i === videoSlide ? "24px" : "8px"}
                h="8px"
                borderRadius="full"
                bg={i === videoSlide ? "#fff" : "rgba(255,255,255,0.45)"}
                transition="all 0.3s"
              />
            ))}
          </HStack>
        </Box>
      </Container>

      {/* ── Section 2: Photo Gallery Marquee ── */}
      <Box
        position="relative"
        w="full"
        overflow="hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <style>{`
          @keyframes marqueeScroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>

        {/* Row 1 — top row */}
        <Flex
          ref={marqueeRef}
          gap={3}
          w="max-content"
          py={1.5}
          sx={{
            animation: "marqueeScroll 90s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {marqueePhotos.map((src, idx) => (
            <Box
              key={`row1-${idx}`}
              flexShrink={0}
              w={{ base: "170px", md: "320px" }}
              h={{ base: "110px", md: "220px" }}
              borderRadius="14px"
              overflow="hidden"
              cursor="pointer"
              position="relative"
              role="group"
              onClick={() => setLightboxIdx(idx % galleryPhotos.length)}
              transition="transform 0.3s cubic-bezier(0.34,1.26,0.64,1), box-shadow 0.3s ease"
              _hover={{
                transform: "translateY(-4px) scale(1.02)",
                boxShadow: "0 16px 40px rgba(229,62,62,0.25)",
              }}
            >
              <Image
                src={src}
                alt={`Gallery ${(idx % galleryPhotos.length) + 1}`}
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

              {/* Expand icon */}
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
                  w="44px"
                  h="44px"
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
        </Flex>

        {/* Row 2 — bottom row, offset and reverse direction */}
        <Flex
          gap={3}
          w="max-content"
          py={1.5}
          mt={3}
          sx={{
            animation: "marqueeScroll 90s linear infinite reverse",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {[...marqueePhotos].reverse().map((src, idx) => {
            const realIdx =
              (galleryPhotos.length - 1 - (idx % galleryPhotos.length)) %
              galleryPhotos.length;
            return (
              <Box
                key={`row2-${idx}`}
                flexShrink={0}
                w={{ base: "170px", md: "320px" }}
                h={{ base: "100px", md: "220px" }}
                borderRadius="14px"
                overflow="hidden"
                cursor="pointer"
                position="relative"
                role="group"
                onClick={() => setLightboxIdx(realIdx)}
                transition="transform 0.3s cubic-bezier(0.34,1.26,0.64,1), box-shadow 0.3s ease"
                _hover={{
                  transform: "translateY(-4px) scale(1.02)",
                }}
              >
                <Image
                  src={src}
                  alt={`Gallery ${realIdx + 1}`}
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

                {/* Expand icon */}
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
                    w="44px"
                    h="44px"
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
            );
          })}
        </Flex>
      </Box>

      {/* ── Popups ── */}
      {videoPopupIdx !== null && (
        <VideoPopup
          videos={videos}
          index={videoPopupIdx}
          onClose={() => setVideoPopupIdx(null)}
        />
      )}

      {lightboxIdx !== null && (
        <PhotoLightbox
          photos={galleryPhotos}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </Box>
  );
}
