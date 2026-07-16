"use client";

import {
  VStack,
  HStack,
  Text,
  Flex,
  Circle,
  Box,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

// Placeholder testimonial data
const testimonials = [
  {
    quote:
      "I imagine we can change the world, one heart, one face or one body at a time. We think outside the lines of our craft.",
    name: "Garin Setiawan",
    role: "Co-Founder",
  },
  {
    quote:
      "Great communication isn't about talking louder, it's about building trust that lasts long after the conversation ends.",
    name: "Geri Cusenza",
    role: "Founder Sabastian",
  },
  {
    quote:
      "Every brand has a story worth telling. Our job is to make sure the world listens with clarity and confidence.",
    name: "Amanda Putri",
    role: "Creative Director",
  },
  {
    quote:
      "We don't just manage reputations, we build relationships that turn clients into long-term partners.",
    name: "Bima Aditya",
    role: "Head of Strategy",
  },
  {
    quote:
      "I imagine we can change the world, one heart, one face or one body at a time. We think outside the lines of our craft.",
    name: "Garin Setiawan",
    role: "Co-Founder",
  },
  {
    quote:
      "Great communication isn't about talking louder, it's about building trust that lasts long after the conversation ends.",
    name: "Geri Cusenza",
    role: "Founder Sabastian",
  },
  {
    quote:
      "Every brand has a story worth telling. Our job is to make sure the world listens with clarity and confidence.",
    name: "Amanda Putri",
    role: "Creative Director",
  },
  {
    quote:
      "We don't just manage reputations, we build relationships that turn clients into long-term partners.",
    name: "Bima Aditya",
    role: "Head of Strategy",
  },
];

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

export default function QuoteCarousel() {
  const itemsPerView = useBreakpointValue({ base: 1, md: 2, lg: 3 }) ?? 3;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const maxIndex = useMemo(
    () => Math.max(0, testimonials.length - itemsPerView),
    [itemsPerView]
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

  return (
    <Box
      w="full"
      bgColor="#05060A"
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
              bg="rgba(10,15,25,0.85)"
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
              bg="rgba(10,15,25,0.85)"
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
          <Box overflow="hidden" w="full" py={5}>
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
                    bg="rgba(255, 255, 255, 0.02)"
                    borderRadius="18px"
                    p={{ base: 6, md: 8 }}
                    border="1px solid rgba(255, 255, 255, 0.08)"
                    h="full"
                    minH={{ base: "220px", md: "245px" }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.37)"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: "translateY(-6px)",
                      borderColor: "rgba(33, 150, 243, 0.4)",
                      boxShadow: "0 12px 30px rgba(33, 150, 243, 0.15)",
                      bg: "rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    {/* Quote Text */}
                    <Text
                      fontSize={{ base: "sm", md: "md" }}
                      lineHeight="1.6"
                      color="rgba(255, 255, 255, 0.85)"
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
                        <Text fontWeight="700" color="#fff" fontSize="sm">
                          {testimonial.name}
                        </Text>
                        <Text color="#8b93a7" fontSize="xs">
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

