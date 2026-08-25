"use client";

import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Button,
  Text,
  Image,
  Circle,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";

// Uploaded video files have no static thumbnail from the CMS, so instead of
// an <img> we render the <video> itself and nudge it to a tiny offset once
// its metadata loads — browsers then paint that frame as a static poster
// without ever starting playback.
function VideoFrameThumbnail({ src, alt }) {
  const videoRef = useRef(null);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video && video.currentTime === 0) {
      video.currentTime = 0.1;
    }
  };

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      preload="metadata"
      onLoadedMetadata={handleLoadedMetadata}
      aria-label={alt}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}

export default function PortfolioSection({ images }) {
  const portfolioImages = Array.isArray(images) ? images : [];
  const itemsPerView = useBreakpointValue({ base: 2, md: 3 }) ?? 3;
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const sectionBg = useColorModeValue("#fff", "#030712");
  const headingColor = useColorModeValue("#1a202c", "#e4e4e4");
  const btnColor = useColorModeValue("#025BCF", "white");
  const btnBorder = useColorModeValue("#025BCF", "white");
  const btnHoverBg = useColorModeValue("#025BCF", "white");
  const btnHoverColor = useColorModeValue("white", "black");
  const navBtnBg = useColorModeValue("rgba(0,0,0,0.08)", "rgba(10,15,25,0.85)");

  const maxIndex = useMemo(
    () => Math.max(0, portfolioImages.length - itemsPerView),
    [itemsPerView]
  );

  // clamp index kalau breakpoint berubah (misal resize dari desktop ke mobile)
  const safeIndex = Math.min(index, maxIndex);

  // useEffect(() => {
  //   if (isHovered || maxIndex <= 0) return;
  //   const interval = setInterval(() => {
  //     setIndex((prev) => {
  //       if (prev >= maxIndex) {
  //         return 0;
  //       }
  //       return prev + 1;
  //     });
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [index, maxIndex, isHovered]);

  useEffect(() => {
    if (maxIndex <= 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const handlePrev = () => setIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setIndex((prev) => Math.min(maxIndex, prev + 1));

  const showPrev = safeIndex > 0;
  const showNext = safeIndex < maxIndex;

  const itemWidthPercent = 100 / itemsPerView;

  if (portfolioImages.length === 0) return null;

  return (
    <Box
      w="full"
      bg={sectionBg}
      py={{ base: 20, md: 20 }}
    >
      <Container maxW="7xl" px={{ base: 6, md: 6 }} mx="auto">
        <VStack spacing={{ base: 4, md: 8 }} align="center">
          {/* Title */}
          <Heading
            as="h2"
            textAlign="center"
            fontSize={{ base: "2xl", md: "5xl" }}
            fontWeight="500"
            color={headingColor}
            fontFamily="Plus Jakarta Sans"
          >
            See our Portfolio and More
          </Heading>

          {/* Carousel */}
          <Box position="relative" w="full">
            {/* Prev Button */}
            {showPrev && (
              <Circle
                size={{ base: "36px", md: "44px" }}
                fontSize={{ base: "lg", md: "2xl" }}
                bg={navBtnBg}
                border="1.5px solid #2196f3"
                color="#2196f3"
                position="absolute"
                left={{ base: 1, md: -14 }}
                top={{ md: "50%" }}
                bottom={{ base: "-18%", md: "auto" }}
                transform={{ base: "translateY(0%)", md: "translateY(-50%)" }}
                zIndex={2}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ bg: "#2196f3", color: "white" }}
                onClick={handlePrev}
                aria-label="Previous"
              >
                <IoIosArrowBack />
              </Circle>
            )}

            {/* Next Button */}
            {showNext && (
              <Circle
                size={{ base: "36px", md: "44px" }}
                fontSize={{ base: "lg", md: "2xl" }}
                bg={navBtnBg}
                border="1.5px solid #2196f3"
                color="#2196f3"
                position="absolute"
                right={{ base: 1, md: -14 }}
                top={{ md: "50%" }}
                bottom={{ base: "-18%", md: "auto" }}
                transform={{ base: "translateY(0%)", md: "translateY(-50%)" }}
                zIndex={2}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ bg: "#2196f3", color: "white" }}
                onClick={handleNext}
                aria-label="Next"
              >
                <IoIosArrowForward />
              </Circle>
            )}

            {/* Track */}
            <Box overflow="hidden" w="full" py={{ base: 6, md: 8 }}>
              <HStack
                spacing={0}
                transform={`translateX(-${safeIndex * itemWidthPercent}%)`}
                transition="transform 0.4s ease"
                align="stretch"
              >
                {portfolioImages.map((item, idx) => (
                  <Box
                    key={idx}
                    flex={`0 0 ${itemWidthPercent}%`}
                    px={{ base: 2, md: 3 }}
                  >
                    <Box
                      borderRadius="18px"
                      overflow="hidden"
                      h={{ base: "220px", md: "380px" }}
                      transition="transform 0.3s, box-shadow 0.3s"
                      _hover={{
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.4)",
                      }}
                    >
                      {item.type === "video" ? (
                        <VideoFrameThumbnail src={item.src} alt={`Portfolio ${idx + 1}`} />
                      ) : (
                        <Image
                          src={item.src}
                          alt={`Portfolio ${idx + 1}`}
                          w="full"
                          h="full"
                          objectFit="cover"
                        />
                      )}
                    </Box>
                  </Box>
                ))}
              </HStack>
            </Box>
          </Box>

          {/* View All Button */}
          <Link href="/highlight">
            <Button
              size="sm"
              px={{ base: 4, md: 6 }}
              py={{ base: 1.5, md: 6 }}
              borderRadius="50px"
              bg="transparent"
              color={btnColor}
              border={`1px solid ${btnBorder}`}
              fontSize={{ base: "xs", md: "md" }}
              fontWeight="500"
              _hover={{ bg: btnHoverBg, color: btnHoverColor }}
            >
              <HStack spacing={2}>
                <Text>View All</Text>
                <FaArrowRight size={14} />
              </HStack>
            </Button>
          </Link>
        </VStack>
      </Container>
    </Box>
  );
}
