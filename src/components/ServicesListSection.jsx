"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Icon,
  Flex,
  Image,
  Portal,
  HStack,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaArrowRight,
  FaArrowLeft,
  FaPlay,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaImages,
  FaVideo,
} from "react-icons/fa";
import { getServicesListSection } from "@/lib/api";

// ─── CSS Keyframes ───────────────────────────────────────────────────
const animationStyles = `
  @keyframes slsFadeInUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slsFadeInRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slsFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slsSlideUp {
    from { opacity: 0; transform: translateY(32px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes slsFadeOut {
    from { opacity: 1; }
    to   { opacity: 0; }
  }
  @keyframes slsImgIn {
    from { opacity: 0; transform: scale(0.97); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes slsPopIn {
    from { opacity: 0; transform: scale(0.92) translateY(20px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
`;

// ─── Lightbox (single photo/video fullscreen) ────────────────────────
function MediaLightbox({ media, index, onClose }) {
  const [current, setCurrent] = useState(index);
  const [visible, setVisible] = useState(false);
  const item = media[current];

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
    setCurrent((i) => (i - 1 + media.length) % media.length);
  }, [media.length]);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % media.length);
  }, [media.length]);

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
      {/* Backdrop */}
      <Box
        position="fixed" inset={0} zIndex={10100}
        bg="rgba(0,0,0,0.95)" backdropFilter="blur(20px)"
        style={{ animation: `${visible ? "slsFadeIn" : "slsFadeOut"} 280ms ease both` }}
        onClick={close}
      />

      {/* Panel */}
      <Box
        position="fixed" inset={0} zIndex={10101}
        display="flex" alignItems="center" justifyContent="center"
        px={{ base: 4, md: 10 }} py={{ base: 4, md: 8 }}
        pointerEvents="none"
      >
        <Box
          position="relative" w="full" maxW="960px" pointerEvents="auto"
          style={{
            animation: visible
              ? "slsSlideUp 320ms cubic-bezier(0.34,1.26,0.64,1) both"
              : "slsFadeOut 280ms ease both",
          }}
        >
          {item.type === "video" ? (
            <Box
              borderRadius="20px" overflow="hidden"
              boxShadow="0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)"
              bg="#0a0a0f" pt="56.25%"
              position="relative"
            >
              {item.videoId ? (
                <Box
                  as="iframe" key={current}
                  position="absolute" top={0} left={0} w="full" h="full"
                  src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0`}
                  title={`Video ${current + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen border="none"
                />
              ) : (
                <Box
                  as="video" key={current}
                  position="absolute" top={0} left={0} w="full" h="full"
                  src={item.src} poster={item.thumb}
                  controls autoPlay
                />
              )}
            </Box>
          ) : (
            <Box
              borderRadius="20px" overflow="hidden"
              boxShadow="0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)"
              bg="#0a0a0f"
              minH={{ base: "240px", md: "520px" }}
              display="flex" alignItems="center" justifyContent="center"
            >
              <Image
                key={current} src={item.src}
                alt={`Media ${current + 1}`}
                w="full" maxH={{ base: "60vh", md: "78vh" }}
                objectFit="contain"
                style={{ animation: "slsImgIn 300ms ease both" }}
              />
            </Box>
          )}
          <Text textAlign="center" color="rgba(255,255,255,0.6)" fontSize="13px" mt={3} fontWeight="500">
            {current + 1} / {media.length}
          </Text>
        </Box>
      </Box>

      {/* Close */}
      <Flex
        position="fixed" top={{ base: 4, md: 6 }} right={{ base: 4, md: 6 }}
        zIndex={10102} w="44px" h="44px" borderRadius="full"
        bg="rgba(255,255,255,0.08)" border="1px solid rgba(255,255,255,0.12)"
        backdropFilter="blur(8px)" align="center" justify="center"
        cursor="pointer" onClick={close} transition="all 0.2s"
        _hover={{ bg: "rgba(255,255,255,0.18)", transform: "scale(1.08)" }}
      >
        <Icon as={FaTimes} color="#fff" w={4} h={4} />
      </Flex>

      {/* Prev */}
      <Flex
        position="fixed" left={{ base: 3, md: 8 }} top="50%" transform="translateY(-50%)"
        zIndex={10102} w={{ base: "42px", md: "52px" }} h={{ base: "42px", md: "52px" }}
        borderRadius="full" bg="rgba(255,255,255,0.08)" border="1px solid rgba(255,255,255,0.12)"
        backdropFilter="blur(8px)" align="center" justify="center" cursor="pointer"
        onClick={prev} transition="all 0.2s"
        _hover={{ bg: "rgba(255,255,255,0.2)", transform: "translateY(-50%) scale(1.08)" }}
      >
        <Icon as={FaChevronLeft} color="#fff" w={4} h={4} />
      </Flex>

      {/* Next */}
      <Flex
        position="fixed" right={{ base: 3, md: 8 }} top="50%" transform="translateY(-50%)"
        zIndex={10102} w={{ base: "42px", md: "52px" }} h={{ base: "42px", md: "52px" }}
        borderRadius="full" bg="rgba(229,62,62,0.85)" border="1px solid rgba(229,62,62,0.4)"
        backdropFilter="blur(8px)" align="center" justify="center" cursor="pointer"
        onClick={next} transition="all 0.2s"
        _hover={{ bg: "#E53E3E", transform: "translateY(-50%) scale(1.08)" }}
      >
        <Icon as={FaChevronRight} color="#fff" w={4} h={4} />
      </Flex>
    </Portal>
  );
}

// ─── Gallery Popup (Level 4) ─────────────────────────────────────────
function GalleryPopup({ title, photoCount, videoCount, media, onClose }) {
  const [visible, setVisible] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && lightboxIdx === null) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, lightboxIdx]);

  const photos = media.filter((m) => m.type === "photo");
  const videos = media.filter((m) => m.type === "video");

  return (
    <Portal>
      {/* Backdrop */}
      <Box
        position="fixed" inset={0} zIndex={10000}
        bg="rgba(0,0,0,0.92)" backdropFilter="blur(18px)"
        style={{ animation: `${visible ? "slsFadeIn" : "slsFadeOut"} 280ms ease both` }}
        onClick={close}
      />

      {/* Content Panel */}
      <Box
        position="fixed" inset={0} zIndex={10001}
        display="flex" alignItems="flex-start" justifyContent="center"
        overflowY="auto" px={{ base: 4, md: 8 }} py={{ base: 16, md: 12 }}
      >
        <Box
          w="full" maxW="900px" onClick={(e) => e.stopPropagation()}
          style={{
            animation: visible
              ? "slsPopIn 380ms cubic-bezier(0.34,1.26,0.64,1) both"
              : "slsFadeOut 280ms ease both",
          }}
        >
          {/* Header */}
          <VStack spacing={1} mb={8} align="center">
            <Heading
              as="h3" fontSize={{ base: "2xl", md: "3xl" }}
              color="#fff" fontWeight="700" fontFamily="Plus Jakarta Sans"
              textAlign="center"
            >
              {title}
            </Heading>
            <HStack spacing={3}>
              <HStack spacing={1.5}>
                <Icon as={FaImages} color="rgba(255,255,255,0.5)" boxSize={3.5} />
                <Text fontSize="13px" color="rgba(255,255,255,0.5)" fontWeight="500">
                  {photoCount} Foto
                </Text>
              </HStack>
              <Text color="rgba(255,255,255,0.25)" fontSize="13px">•</Text>
              <HStack spacing={1.5}>
                <Icon as={FaVideo} color="rgba(255,255,255,0.5)" boxSize={3} />
                <Text fontSize="13px" color="rgba(255,255,255,0.5)" fontWeight="500">
                  {videoCount} Video
                </Text>
              </HStack>
            </HStack>
          </VStack>

          {/* Photo Grid */}
          {photos.length > 0 && (
            <Grid
              templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
              gap={3} mb={videos.length > 0 ? 6 : 0}
            >
              {photos.map((photo, idx) => (
                <GridItem
                  key={`photo-${idx}`}
                  borderRadius="14px" overflow="hidden" cursor="pointer"
                  position="relative" role="group"
                  h={{ base: "140px", md: "200px" }}
                  onClick={() => setLightboxIdx(idx)}
                  transition="transform 0.3s cubic-bezier(0.34,1.26,0.64,1), box-shadow 0.3s ease"
                  _hover={{
                    transform: "translateY(-3px) scale(1.02)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
                  }}
                  style={{
                    animation: `slsFadeInUp 400ms ease ${idx * 40}ms both`,
                  }}
                >
                  <Image
                    src={photo.src} alt={`Photo ${idx + 1}`}
                    w="full" h="full" objectFit="cover"
                    transition="transform 0.4s ease"
                    _groupHover={{ transform: "scale(1.06)" }}
                  />
                  <Box
                    position="absolute" inset={0}
                    bg="rgba(0,0,0,0)" transition="background 0.3s"
                    _groupHover={{ bg: "rgba(0,0,0,0.3)" }}
                  />
                </GridItem>
              ))}
            </Grid>
          )}

          {/* Video Grid */}
          {videos.length > 0 && (
            <Grid
              templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
              gap={3}
            >
              {videos.map((video, idx) => {
                const mediaIdx = photos.length + idx;
                return (
                  <GridItem
                    key={`video-${idx}`}
                    borderRadius="14px" overflow="hidden" cursor="pointer"
                    position="relative" role="group"
                    h={{ base: "140px", md: "200px" }}
                    onClick={() => setLightboxIdx(mediaIdx)}
                    transition="transform 0.3s cubic-bezier(0.34,1.26,0.64,1), box-shadow 0.3s ease"
                    _hover={{
                      transform: "translateY(-3px) scale(1.02)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
                    }}
                    style={{
                      animation: `slsFadeInUp 400ms ease ${(photos.length + idx) * 40}ms both`,
                    }}
                  >
                    {video.thumb ? (
                      <Image
                        src={video.thumb} alt={`Video ${idx + 1}`}
                        w="full" h="full" objectFit="cover"
                        transition="transform 0.4s ease"
                        _groupHover={{ transform: "scale(1.06)" }}
                      />
                    ) : (
                      <Box
                        w="full" h="full"
                        bgGradient="linear(135deg, #1e293b, #0a0a0f)"
                        transition="transform 0.4s ease"
                        _groupHover={{ transform: "scale(1.06)" }}
                      />
                    )}
                    <Box
                      position="absolute" inset={0}
                      bg="rgba(0,0,0,0.15)" transition="background 0.3s"
                      _groupHover={{ bg: "rgba(0,0,0,0.4)" }}
                    />
                    {/* Play icon */}
                    <Flex position="absolute" inset={0} align="center" justify="center">
                      <Flex
                        w={{ base: "40px", md: "52px" }} h={{ base: "40px", md: "52px" }}
                        borderRadius="full"
                        bg="rgba(255,255,255,0.2)" backdropFilter="blur(6px)"
                        border="2px solid rgba(255,255,255,0.3)"
                        align="center" justify="center"
                        transition="all 0.25s"
                        _groupHover={{ bg: "rgba(255,255,255,0.35)", transform: "scale(1.1)" }}
                      >
                        <Icon as={FaPlay} color="#fff" ml="2px" />
                      </Flex>
                    </Flex>
                  </GridItem>
                );
              })}
            </Grid>
          )}
        </Box>
      </Box>

      {/* Close button */}
      <Flex
        position="fixed" top={{ base: 4, md: 6 }} right={{ base: 4, md: 6 }}
        zIndex={10002} w="44px" h="44px" borderRadius="full"
        bg="rgba(255,255,255,0.08)" border="1px solid rgba(255,255,255,0.12)"
        backdropFilter="blur(8px)" align="center" justify="center"
        cursor="pointer" onClick={close} transition="all 0.2s"
        _hover={{ bg: "rgba(255,255,255,0.18)", transform: "scale(1.08)" }}
      >
        <Icon as={FaTimes} color="#fff" w={4} h={4} />
      </Flex>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <MediaLightbox
          media={media}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </Portal>
  );
}

// Helper to split items array into chunks (rows)
const chunkArray = (arr, chunkSize = 2) => {
  const results = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    results.push(arr.slice(i, i + chunkSize));
  }
  return results;
};

// ─── Service Row (Manages Card Expansion on Hover) ────────────────────
function ServiceRow({ items, isLevel1, onCardClick, startIndex, animKey }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const isSingle = items.length === 1;

  return (
    <Flex
      w="full"
      flexDir={{ base: "column", md: "row" }}
      gap={{ base: 4, md: 5 }}
      mb={{ base: 4, md: 5 }}
    >
      {items.map((item, idx) => {
        const globalIdx = startIndex + idx;
        const isHovered = hoveredIdx === idx;

        // Calculate flex expansion ratio
        let flexRatio = "1 1 0%";
        if (!isSingle) {
          if (hoveredIdx !== null) {
            flexRatio = isHovered ? "1.8 1 0%" : "0.7 1 0%";
          }
        }

        return (
          <CollageCard
            key={`${animKey}-${globalIdx}`}
            item={item}
            index={globalIdx}
            isLevel1={isLevel1}
            isSingle={isSingle}
            isHovered={isHovered}
            flexRatio={flexRatio}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => onCardClick(globalIdx)}
          />
        );
      })}
    </Flex>
  );
}

// ─── Collage Card ────────────────────────────────────────────────────
function CollageCard({
  item,
  index,
  isLevel1,
  isSingle,
  isHovered,
  flexRatio,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  const defaultDesc = `Explore ${item.title} portfolio, press coverage, and media documentation.`;
  const descriptionText = item.desc || item.description || defaultDesc;
  const displayGrid = isLevel1 && Array.isArray(item.media) && item.media.length > 1;

  return (
    <Box
      flex={{ base: "none", md: isSingle ? "1 1 0%" : flexRatio }}
      w={{ base: "full", md: "auto" }}
      position="relative"
      borderRadius={{ base: "16px", md: "24px" }}
      overflow="hidden"
      h={{ base: "260px", md: isLevel1 ? "380px" : "320px" }}
      bgImage={displayGrid ? "none" : `url('${item.image}')`}
      bgSize="cover"
      bgPos="center"
      bg="#1a1a24"
      cursor="pointer"
      role="group"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      transition="flex 0.5s cubic-bezier(0.25, 1, 0.5, 1), transform 0.4s ease, box-shadow 0.4s ease"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
        "& > .card-overlay": {
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.15) 100%)",
        },
        "& .card-play": {
          transform: "scale(1.12)",
          bg: "rgba(255,255,255,0.3)",
        },
      }}
      style={{
        animation: `slsFadeInUp 500ms ease ${index * 80}ms both`,
      }}
    >
      {/* 2x2 Media Grid for Level 1 */}
      {displayGrid && (
        <Box
          display="grid"
          gridTemplateColumns={item.media.length === 2 ? "1fr 1fr" : "1fr 1fr"}
          gridTemplateRows={item.media.length <= 2 ? "1fr" : "1fr 1fr"}
          gap={1}
          position="absolute"
          inset={0}
          w="full"
          h="full"
        >
          {item.media.slice(0, 4).map((img, imgIdx) => (
            <Box
              key={imgIdx}
              bgImage={img.src || img.thumb ? `url('${img.src || img.thumb}')` : undefined}
              bgGradient={img.src || img.thumb ? undefined : "linear(135deg, #1e293b, #0a0a0f)"}
              bgSize="cover"
              bgPos="center"
              position="relative"
              overflow="hidden"
            >
              {img.type === "video" && (
                <Flex
                  position="absolute"
                  inset={0}
                  justify="center"
                  align="center"
                >
                  <Box
                    boxSize={{ base: 8, lg: 10 }}
                    borderRadius="full"
                    bg="rgba(255, 255, 255, 0.3)"
                    backdropFilter="blur(4px)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={FaPlay} color="#fff" boxSize={3} ml="2px" />
                  </Box>
                </Flex>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Gradient Overlay */}
      <Box
        className="card-overlay"
        position="absolute"
        inset={0}
        background="linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.2) 100%)"
        transition="background 0.4s ease"
      />

      {/* Title + Subheading + Stats Container */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        p={{ base: 4, md: 6 }}
        zIndex={2}
      >
        <Box
          bg={isHovered ? "rgba(255, 255, 255, 0.18)" : "transparent"}
          backdropFilter={isHovered ? "blur(16px)" : "none"}
          borderRadius={isHovered ? { base: "16px", md: "20px" } : "0px"}
          boxShadow={isHovered ? "0 8px 32px 0 rgba(0, 0, 0, 0.2)" : "none"}
          p={isHovered ? { base: 4, md: 5 } : 0}
          maxW={{ base: "full", md: isHovered ? "92%" : "100%" }}
          transition="all 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
        >
          <Heading
            as="h3"
            fontSize={{ base: "22px", md: isLevel1 ? "32px" : "24px", lg: isHovered ? "28px" : "40px" }}
            color="white"
            fontWeight="700"
            fontFamily="Plus Jakarta Sans"
            lineHeight="1.15"
            letterSpacing="0.3px"
            transition="font-size 0.3s ease"
          >
            {item.title}
          </Heading>

          {/* Subheading Description (Expands & Fades in smoothly on Hover) */}
          <Box
            maxH={isHovered ? "120px" : "0px"}
            opacity={isHovered ? 1 : 0}
            overflow="hidden"
            transition="max-height 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s ease, margin-top 0.3s ease"
            mt={isHovered ? 2.5 : 0}
          >
            <Text
              fontSize={{ base: "xs", md: "md" }}
              color="rgba(255, 255, 255, 0.9)"
              lineHeight="1.5"
              fontWeight="400"
            >
              {descriptionText}
            </Text>
          </Box>

          <HStack spacing={2} mt={isHovered ? 2.5 : 1.5}>
            <Text fontSize={{ base: "xs", md: "sm" }} color="rgba(255,255,255,0.7)" fontWeight="500">
              {item.photoCount} Foto
            </Text>
            <Text fontSize={{ base: "xs", md: "sm" }} color="rgba(255,255,255,0.4)">•</Text>
            <Text fontSize={{ base: "xs", md: "sm" }} color="rgba(255,255,255,0.7)" fontWeight="500">
              {item.videoCount} Video
            </Text>
          </HStack>
        </Box>
      </Box>

      {/* Arrow Icon */}
      <Flex
        position="absolute"
        top={{ base: 4, md: 5 }}
        right={{ base: 4, md: 5 }}
        w={{ base: "32px", md: "40px" }}
        h={{ base: "32px", md: "40px" }}
        borderRadius="full"
        border="1px solid rgba(255,255,255,0.2)"
        bg="rgba(255,255,255,0.06)"
        backdropFilter="blur(8px)"
        color="white"
        align="center"
        justify="center"
        transform="rotate(-45deg)"
        transition="all 0.3s ease"
        _groupHover={{
          transform: "rotate(0deg)",
          bg: "white",
          color: "black",
        }}
        zIndex={2}
      >
        <Icon as={FaArrowRight} boxSize={{ base: 3, md: 3.5 }} />
      </Flex>
    </Box>
  );
}

// ─── Main Component ──────────────────────────────────────────────────
export default function ServicesListSection() {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    getServicesListSection().then((data) => {
      if (data.length > 0) setServicesData(data);
    });
  }, []);

  // Navigation state: array of selected item indices at each level
  const [path, setPath] = useState([]); // e.g. [0] = Media Relation, [0, 0] = Prescon
  const [animKey, setAnimKey] = useState(0);
  const [popupData, setPopupData] = useState(null);
  const containerRef = useRef(null);

  const pageBg = useColorModeValue("#fff", "#05060a");
  const headingColor = useColorModeValue("#1a202c", "#fff");
  const textColor = useColorModeValue("#4a5568", "rgba(255,255,255,0.7)");
  const backBtnBorder = useColorModeValue("rgba(0,0,0,0.15)", "rgba(255,255,255,0.15)");
  const backBtnBg = useColorModeValue("rgba(0,0,0,0.04)", "rgba(255,255,255,0.04)");
  const backBtnHoverBg = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.12)");
  const backBtnHoverBorder = useColorModeValue("rgba(0,0,0,0.3)", "rgba(255,255,255,0.3)");

  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    if (catParam !== null) {
      const idx = parseInt(catParam, 10);
      if (!isNaN(idx) && idx >= 0 && idx < servicesData.length) {
        setPath([idx]);
        hasInitialized.current = true;
      } else {
        const foundIdx = servicesData.findIndex(
          (s) => s.title.toLowerCase() === catParam.toLowerCase()
        );
        if (foundIdx !== -1) {
          setPath([foundIdx]);
          hasInitialized.current = true;
        }
      }
    }
  }, [catParam, servicesData]);

  // Derive current items from the path
  const getCurrentItems = useCallback(() => {
    let items = servicesData;
    for (const idx of path) {
      items = items[idx]?.children ?? [];
    }
    return items;
  }, [path, servicesData]);

  const currentItems = getCurrentItems();
  const currentLevel = path.length + 1; // Level 1, 2, or 3

  // Build breadcrumb titles
  const breadcrumbTitles = path.map((idx, depth) => {
    let items = servicesData;
    for (let d = 0; d < depth; d++) {
      items = items[d === 0 ? path[0] : path[d]].children;
    }
    return items[idx].title;
  });

  // Get the current section title (for Level 2+)
  const currentTitle = breadcrumbTitles.length > 0
    ? breadcrumbTitles[breadcrumbTitles.length - 1]
    : null;

  const handleCardClick = (idx) => {
    const item = currentItems[idx];

    if (Array.isArray(item.children)) {
      // Has nested items (category or item with sub_items) → navigate deeper
      setPath((prev) => [...prev, idx]);
      setAnimKey((k) => k + 1);
      // Scroll to section
      if (containerRef.current) {
        const top = containerRef.current.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else {
      // Leaf item (no sub_items) → open its own media in the gallery popup
      setPopupData(item);
    }
  };

  const handleBack = () => {
    setPath((prev) => prev.slice(0, -1));
    setAnimKey((k) => k + 1);
  };

  // Grid columns based on level
  const getGridColumns = () => {
    if (currentLevel === 1) {
      return { base: "1fr", md: "repeat(2, 1fr)" };
    }
    return { base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" };
  };

  return (
    <Box w="full" bg={pageBg} pb={{ base: 20, md: 32 }} ref={containerRef}>
      <style>{animationStyles}</style>
      <Container maxW="7xl" px={{ base: 4, md: 6 }} mx="auto">

        {/* Level Header (Back + Title) — shown on Level 2+ */}
        {currentLevel > 1 && (
          <Box
            mb={{ base: 6, md: 10 }}
            style={{ animation: "slsFadeInRight 400ms ease both" }}
            key={`header-${animKey}`}
          >
            {/* Back Button */}
            <Flex
              align="center"
              gap={3}
              cursor="pointer"
              onClick={handleBack}
              role="group"
              mb={4}
              w="fit-content"
            >
              <Flex
                w={{ base: "36px", md: "42px" }}
                h={{ base: "36px", md: "42px" }}
                borderRadius="full"
                border={`1px solid ${backBtnBorder}`}
                bg={backBtnBg}
                backdropFilter="blur(8px)"
                align="center"
                justify="center"
                transition="all 0.3s ease"
                _groupHover={{
                  bg: backBtnHoverBg,
                  borderColor: backBtnHoverBorder,
                  transform: "translateX(-3px)",
                }}
              >
                <Icon as={FaArrowLeft} color={textColor} boxSize={3.5} />
              </Flex>
              <Text
                fontSize={{ base: "13px", md: "14px" }}
                color={textColor}
                fontWeight="500"
                transition="color 0.2s"
                _groupHover={{ color: headingColor }}
              >
                Back
              </Text>
            </Flex>

            {/* Section Title */}
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "4xl" }}
              color={headingColor}
              fontWeight="700"
              fontFamily="Plus Jakarta Sans"
              textAlign="center"
              textTransform="uppercase"
              letterSpacing="1px"
            >
              {currentTitle}
            </Heading>
          </Box>
        )}

        {/* Card Rows */}
        <Box key={`grid-${animKey}`} w="full">
          {chunkArray(currentItems, 2).map((rowItems, rIdx) => (
            <ServiceRow
              key={`row-${animKey}-${rIdx}`}
              items={rowItems}
              isLevel1={currentLevel === 1}
              onCardClick={handleCardClick}
              startIndex={rIdx * 2}
              animKey={animKey}
            />
          ))}
        </Box>
      </Container>

      {/* Gallery Popup (Level 4) */}
      {popupData && (
        <GalleryPopup
          title={popupData.title}
          photoCount={popupData.photoCount}
          videoCount={popupData.videoCount}
          media={popupData.media}
          onClose={() => setPopupData(null)}
        />
      )}
    </Box>
  );
}
