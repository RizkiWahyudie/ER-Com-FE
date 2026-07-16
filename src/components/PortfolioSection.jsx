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
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

const portfolioImages = [
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=600&h=600&fit=crop",
];

export default function PortfolioSection() {
  const itemsPerView = useBreakpointValue({ base: 2, md: 3 }) ?? 3;
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const maxIndex = useMemo(
    () => Math.max(0, portfolioImages.length - itemsPerView),
    [itemsPerView]
  );

  // clamp index kalau breakpoint berubah (misal resize dari desktop ke mobile)
  const safeIndex = Math.min(index, maxIndex);

  useEffect(() => {
    if (isHovered || maxIndex <= 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [index, maxIndex, isHovered]);

  const handlePrev = () => setIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setIndex((prev) => Math.min(maxIndex, prev + 1));

  const showPrev = safeIndex > 0;
  const showNext = safeIndex < maxIndex;

  const itemWidthPercent = 100 / itemsPerView;

  return (
    <Box
      w="full"
      bg="#05060a"
      py={{ base: 20, md: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Container maxW="7xl" px={{ base: 6, md: 6 }} mx="auto">
        <VStack spacing={{ base: 4, md: 8 }} align="center">
          {/* Title */}
          <Heading
            as="h2"
            textAlign="center"
            fontSize={{ base: "2xl", md: "5xl" }}
            fontWeight="500"
            color="#e4e4e4"
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
                bg="rgba(10,15,25,0.85)"
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
                bg="rgba(10,15,25,0.85)"
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
                {portfolioImages.map((src, idx) => (
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
                      <Image
                        src={src}
                        alt={`Portfolio ${idx + 1}`}
                        w="full"
                        h="full"
                        objectFit="cover"
                      />
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
              color="white"
              border="1px solid white"
              fontSize={{ base: "xs", md: "md" }}
              fontWeight="500"
              _hover={{ bg: "white", color: "black" }}
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
