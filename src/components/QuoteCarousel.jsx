"use client";

import {
  VStack,
  HStack,
  Text,
  Flex,
  Circle,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-slide tiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [goToNext]);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <Box w="full" bgColor="#05060A" py={{ base: 8, md: 16 }}>
      {/* Trust Line */}
      <Text textAlign="center" color="#2196f3" maxW={{ base: '80%', md: '100%' }} mx="auto" fontSize={{ base: "md", md: "lg" }} mb={{ base: 8, md: 12 }}>
        Trusted by over 500+ clients of Indonesia’s leading companies
      </Text>
      <Flex
        align={{ base: 'end', md: 'center' }}
        justify="center"
        gap={{ base: 4, md: 10 }}
        w="full"
        maxW="7xl"
        px={{ base: 6, md: 0 }}
        position="relative"
        mx="auto"
      >
        {/* Prev Button */}
        <Circle
          size={{ base: '36px', md: '48px' }}
          border="1.5px solid #2196f3"
          color="#2196f3"
          cursor="pointer"
          flexShrink={0}
          transition="all 0.2s"
          _hover={{ bg: "rgba(33,150,243,0.15)" }}
          onClick={goToPrev}
          aria-label="Previous testimonial"
        >
          <FaArrowLeft />
        </Circle>

        <VStack spacing={6} maxW="760px" textAlign="center">
          <Text
            fontSize={{ base: "lg", md: "3xl" }}
            fontWeight="500"
            lineHeight="1.5"
            color="white"
            fontFamily="Plus Jakarta Sans"
          >
            "{activeTestimonial.quote}"
          </Text>
          <HStack justify="center" gap={4}>
            <Circle
              size="50px"
              bg="white"
              color="#2196f3"
              fontWeight="700"
              fontSize="md"
            >
              {getInitials(activeTestimonial.name)}
            </Circle>
            <VStack spacing={0} align="flex-start" fontSize={{ base: "sm", md: "md" }}>
              <Text fontWeight="700" color="#fff">
                {activeTestimonial.name}
              </Text>
              <Text color="#8b93a7">{activeTestimonial.role}</Text>
            </VStack>
          </HStack>
        </VStack>

        {/* Next Button */}
        <Circle
          size={{ base: '36px', md: '48px' }}
          border="1.5px solid #2196f3"
          color="#2196f3"
          cursor="pointer"
          flexShrink={0}
          transition="all 0.2s"
          _hover={{ bg: "rgba(33,150,243,0.15)" }}
          onClick={goToNext}
          aria-label="Next testimonial"
        >
          <FaArrowRight />
        </Circle>
      </Flex>
    </Box>
  );
}
