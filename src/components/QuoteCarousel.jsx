"use client";

import {
  VStack,
  HStack,
  Text,
  Flex,
  Circle,
  Box,
  Container,
  Skeleton,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

// ambil inisial dari nama, misal "Geri Cusenza" -> "GC"
function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const FALLBACK_TESTIMONIALS = [
  {
    quote:
      "Working with ER Communication transformed our entire brand presence. Their strategic approach and creative execution exceeded all our expectations.",
    name: "Geri Cusenza",
    role: "Global Creative Director",
  },
  {
    quote:
      "The team delivers excellence consistently. From event production to digital campaigns, ER Communication is our most trusted partner in Indonesia.",
    name: "Michael Chen",
    role: "VP of Marketing, APAC",
  },
  {
    quote:
      "Outstanding professionalism and attention to detail. They took our complex brief and delivered a flawless campaign that resonated across all target markets.",
    name: "Sarah Jenkins",
    role: "Head of Communications",
  },
];

export default function QuoteCarousel({ testimonials: testimonialsProp, isLoading = false }) {
  const testimonials = useMemo(() => {
    if (Array.isArray(testimonialsProp) && testimonialsProp.length > 0) {
      return testimonialsProp;
    }
    return FALLBACK_TESTIMONIALS;
  }, [testimonialsProp]);
  const itemsPerView = useBreakpointValue({ base: 1, md: 2, lg: 3 }) ?? 3;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const bgColor = useColorModeValue("#fff", "#05060A");
  const cardBg = useColorModeValue("rgba(0, 0, 0, 0)", "rgba(255, 255, 255, 0.02)");
  const cardBorder = useColorModeValue("rgba(33, 150, 243,0.08)", "rgba(255, 255, 255, 0.08)");
  const cardBoxShadow = useColorModeValue("0 4px 16px 0 rgba(33, 150, 243, 0.1)", "0 8px 32px 0 rgba(0, 0, 0, 0.1)");
  const cardHoverBorder = useColorModeValue("rgba(33, 150, 243, 0.4)", "rgba(33, 150, 243, 0.4)");
  const cardHoverBg = useColorModeValue("rgba(0,0,0,0)", "rgba(255, 255, 255, 0.04)");
  const quoteColor = useColorModeValue("rgba(0,0,0,0.75)", "rgba(255, 255, 255, 0.85)");
  const nameColor = useColorModeValue("#1a202c", "#fff");
  const roleColor = useColorModeValue("#718096", "#8b93a7");
  const dotInactive = useColorModeValue("rgba(0,0,0,0.2)", "rgba(255, 255, 255, 0.3)");
  const navBg = useColorModeValue("rgba(240,240,255,0.9)", "rgba(10,15,25,0.85)");
  const skeletonStartColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const skeletonEndColor = useColorModeValue("gray.300", "whiteAlpha.300");

  const maxIndex = useMemo(
    () => Math.max(0, testimonials.length - itemsPerView),
    [itemsPerView, testimonials.length]
  );

  // clamp activeIndex if viewport resize changes maxIndex
  const safeIndex = Math.min(activeIndex, maxIndex);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev >= maxIndex) {
        return 0;
      }
      return prev + 1;
    });
  }, [maxIndex]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev <= 0) {
        return maxIndex;
      }
      return prev - 1;
    });
  }, [maxIndex]);

  // Auto-slide tiap 3 detik
  useEffect(() => {
    if (isHovered || maxIndex <= 0) return;
    const interval = setInterval(() => {
      goToNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex, maxIndex, isHovered, goToNext]);


  if (isLoading) {
    return (
      <Box
        w="full"
        bgColor={bgColor}
        py={{ base: 12, md: 20 }}
      >
        <Container maxW="7xl" px={{ base: 6, md: 6 }} mx="auto">
          <Skeleton
            h="18px"
            w={{ base: "260px", md: "420px" }}
            mx="auto"
            mb={{ base: 8, md: 12 }}
            borderRadius="md"
            startColor={skeletonStartColor}
            endColor={skeletonEndColor}
          />
          <Flex gap={6} justify="center">
            {[0, 1, 2].slice(0, itemsPerView).map((idx) => (
              <Box
                key={idx}
                flex={`0 0 ${100 / itemsPerView}%`}
                minW={`${100 / itemsPerView}%`}
                px={3}
              >
                <Box
                  bg={cardBg}
                  borderRadius="18px"
                  p={{ base: 6, md: 8 }}
                  border={`1px solid ${cardBorder}`}
                  minH={{ base: "220px", md: "245px" }}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <VStack align="flex-start" spacing={3} w="full">
                    <Skeleton h="16px" w="100%" borderRadius="md" startColor={skeletonStartColor} endColor={skeletonEndColor} />
                    <Skeleton h="16px" w="90%" borderRadius="md" startColor={skeletonStartColor} endColor={skeletonEndColor} />
                    <Skeleton h="16px" w="65%" borderRadius="md" startColor={skeletonStartColor} endColor={skeletonEndColor} />
                  </VStack>
                  <HStack spacing={4} align="center" mt={6}>
                    <Skeleton w="46px" h="46px" borderRadius="full" startColor={skeletonStartColor} endColor={skeletonEndColor} />
                    <VStack align="flex-start" spacing={1.5} flex={1}>
                      <Skeleton h="16px" w="100px" borderRadius="md" startColor={skeletonStartColor} endColor={skeletonEndColor} />
                      <Skeleton h="12px" w="70px" borderRadius="md" startColor={skeletonStartColor} endColor={skeletonEndColor} />
                    </VStack>
                  </HStack>
                </Box>
              </Box>
            ))}
          </Flex>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      w="full"
      bgColor={bgColor}
      py={{ base: 12, md: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Container maxW="7xl" px={{ base: 6, md: 6 }} mx="auto">
        {/* Trust Line */}
        <Text
          textAlign="center"
          color="#2196f3"
          maxW={{ base: "80%", md: "100%" }}
          mx="auto"
          fontSize={{ base: "sm", md: "md" }}
          fontWeight="600"
          letterSpacing="wider"
          textTransform="uppercase"
          mb={{ base: 8, md: 12 }}
        >
          Trusted by over 500+ clients of Indonesia’s leading companies
        </Text>

        <Box position="relative" w="full">
          {/* Prev Button */}
          {maxIndex > 0 && (
            <Circle
              size="40px"
              fontSize="md"
              bg={navBg}
              border="1.5px solid #2196f3"
              color="#2196f3"
              position="absolute"
              left={{ base: -2, md: -12 }}
              top="50%"
              transform="translateY(-50%)"
              zIndex={2}
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ bg: "#2196f3", color: "white" }}
              onClick={goToPrev}
              aria-label="Previous testimonial"
              display={{ base: "none", md: "flex" }}
            >
              <FaArrowLeft />
            </Circle>
          )}

          {/* Next Button */}
          {maxIndex > 0 && (
            <Circle
              size="40px"
              fontSize="md"
              bg={navBg}
              border="1.5px solid #2196f3"
              color="#2196f3"
              position="absolute"
              right={{ base: -2, md: -12 }}
              top="50%"
              transform="translateY(-50%)"
              zIndex={2}
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ bg: "#2196f3", color: "white" }}
              onClick={goToNext}
              aria-label="Next testimonial"
              display={{ base: "none", md: "flex" }}
            >
              <FaArrowRight />
            </Circle>
          )}

          {/* Carousel Track */}
          <Box overflow="hidden" w="full" py={5} px={2}>
            <Flex
              transform={`translateX(-${safeIndex * (100 / itemsPerView)}%)`}
              transition="transform 0.5s ease"
            >
              {testimonials.map((testimonial, idx) => (
                <Box
                  key={idx}
                  flex={`0 0 ${100 / itemsPerView}%`}
                  minW={`${100 / itemsPerView}%`}
                  px={3}
                >
                  <Box
                    bg={cardBg}
                    borderRadius="18px"
                    p={{ base: 6, md: 8 }}
                    border={`1px solid ${cardBorder}`}
                    h="full"
                    minH={{ base: "220px", md: "245px" }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    boxShadow={cardBoxShadow}
                    transition="all 0.3s ease"
                    _hover={{
                      transform: "translateY(-6px)",
                      borderColor: cardHoverBorder,
                      boxShadow: "0 12px 30px rgba(33, 150, 243, 0.15)",
                      bg: cardHoverBg,
                    }}
                  >
                    {/* Quote Text */}
                    <Text
                      fontSize={{ base: "sm", md: "md" }}
                      lineHeight="1.6"
                      color={quoteColor}
                      mb={6}
                      fontFamily="Plus Jakarta Sans"
                    >
                      "{testimonial.quote}"
                    </Text>

                    {/* Author Info */}
                    <HStack spacing={4} align="center">
                      <Circle
                        size="44px"
                        bg="#2196f3"
                        color="white"
                        fontWeight="700"
                        fontSize="sm"
                      >
                        {getInitials(testimonial.name)}
                      </Circle>
                      <VStack spacing={0} align="flex-start">
                        <Text fontWeight="700" color={nameColor} fontSize="sm">
                          {testimonial.name}
                        </Text>
                        <Text color={roleColor} fontSize="xs">
                          {testimonial.role}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </Box>
              ))}
            </Flex>
          </Box>

          {/* Dots Indicator */}
          {maxIndex > 0 && (
            <HStack justify="center" spacing={2} mt={6}>
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <Box
                  key={i}
                  w={i === activeIndex ? "24px" : "8px"}
                  h="8px"
                  borderRadius={i === activeIndex ? "5px" : "full"}
                  bg={i === activeIndex ? "#2196f3" : "rgba(255, 255, 255, 0.3)"}
                  cursor="pointer"
                  transition="all 0.2s"
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </HStack>
          )}
        </Box>
      </Container>
    </Box>
  );
}

