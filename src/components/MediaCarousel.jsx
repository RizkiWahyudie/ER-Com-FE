"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Button,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaPlay, FaArrowRight, FaArrowLeft } from "react-icons/fa";

const slidesData = [
  {
    tag: "Media Relation",
    imgs: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=300&h=300&fit=crop",
    ],
  },
  {
    tag: "Social & Digital",
    imgs: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=300&h=300&fit=crop",
    ],
  },
  {
    tag: "Media Event",
    imgs: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=300&h=300&fit=crop",
    ],
  },
  {
    tag: "Brand & Strategic",
    imgs: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=300&h=300&fit=crop",
    ],
  },
  {
    tag: "International Event",
    imgs: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300&h=300&fit=crop",
    ],
  },
];

export default function MediaCarousel() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 520) setPerView(1);
      else if (window.innerWidth < 900) setPerView(2);
      else setPerView(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSlideClick = (categoryTitle) => {
    router.push(`/services?cat=${encodeURIComponent(categoryTitle)}`);
  };

  const pages = Math.max(1, slidesData.length - perView + 1);
  const handlePrev = () => setIdx((idx - 1 + pages) % pages);
  const handleNext = () => setIdx((idx + 1) % pages);
  const slideWidth = 100 / perView;

  return (
    <Box w="full" bg="var(--background)" py={{ base: 12, md: 16 }}>
      <Container maxW="7xl" px={{ base: 6, md: 0 }} mx="auto">
        <VStack spacing={7} align="stretch">
          {/* Carousel Track */}
          <Box overflow="hidden" w="full">
            <Flex
              gap={{ base: 6, md: 4 }}
              transform={`translateX(calc(-${idx * slideWidth}% - ${idx * 24}px))`}
              transition="transform 0.5s ease"
            >
              {slidesData.map((slide, slideIdx) => (
                <Box
                  key={slideIdx}
                  flex={`0 0 calc(${slideWidth}% - ${(perView - 1) * 6}px)`}
                  minW={`calc(${slideWidth}% - ${(perView - 1) * 6}px)`}
                  bg={`
                        radial-gradient(circle at 50% 0%,
                        rgba(0, 37, 85, 0.8) 0%,
                        rgba(0, 13, 44, 0.4) 30%,
                        rgba(2, 91, 207, 0) 70%
                        ),
                        #030712
                    `}
                  borderRadius="18px"
                  p={4}
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  cursor="pointer"
                  onClick={() => handleSlideClick(slide.tag)}
                  transition="transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
                  _hover={{
                    transform: "translateY(-6px)",
                    borderColor: "rgba(2, 91, 207, 0.4)",
                    boxShadow: "0 12px 30px rgba(2, 91, 207, 0.15)",
                  }}
                >
                  {/* Image Grid 2x2 */}
                  <Box
                    display="grid"
                    gridTemplateColumns="1fr 1fr"
                    gap={3}
                    mb={4}
                  >
                    {slide.imgs.map((img, imgIdx) => (
                      <Box
                        key={imgIdx}
                        aspectRatio="1"
                        borderRadius="10px"
                        bgImage={`url('${img}')`}
                        bgSize="cover"
                        bgPos="center"
                        position="relative"
                        overflow="hidden"
                      >
                        <Flex
                          position="absolute"
                          inset={0}
                          justify="center"
                          align="center"
                        >
                          <Button
                            boxSize={{ base: 10, lg: 12 }}
                            borderRadius="full"
                            bg="rgba(255, 255, 255, 0.3)"
                            color="#05060a"
                            _hover={{ bg: "rgba(255, 255, 255, 0.5)" }}
                            transition="all 0.2s"
                          >
                            <Icon
                              as={FaPlay}
                              color="#025BCF"
                              boxSize={{ base: 6, lg: 8 }}
                            />
                          </Button>
                        </Flex>
                      </Box>
                    ))}
                  </Box>
                  <Heading
                    as="h3"
                    size="sm"
                    color="#fff"
                    fontSize={{ base: "16px", md: "18px", lg: "32px" }}
                    fontWeight="400"
                    textAlign="center"
                  >
                    {slide.tag}
                  </Heading>
                </Box>
              ))}
            </Flex>
          </Box>

          {/* Controls Footer */}
          <Flex justify="space-between" align="center" w="full">
            {/* Arrows */}
            <HStack spacing={3}>
              <Button
                w={{ base: "32px", lg: "48px" }}
                h={{ base: "32px", lg: "48px" }}
                borderRadius="full"
                bg="rgba(255, 255, 255, 0.95)"
                color="#025BCF"
                onClick={handlePrev}
                _hover={{
                    transform: "scale(1.08)",
                    bg: "#f8f8f8",
                }}
                _active={{
                    bg: "#d3d3d3",
                    transform: "scale(0.95)",
                }}
                transition="transform 0.2s"
                visibility={{ base: "visible", md: "hidden" }}
              >
                <Icon as={FaArrowLeft} boxSize={{ base: 3, lg: 5 }} />
              </Button>
              <Button
                w={{ base: "32px", lg: "48px" }}
                h={{ base: "32px", lg: "48px" }}
                borderRadius="full"
                bg="#025BCF"
                color="#fff"
                onClick={handleNext}
                _hover={{
                    transform: "scale(1.08)",
                    bg: "#0A6FE8",
                }}
                _active={{
                    bg: "#01479F",
                    transform: "scale(0.95)",
                }}
                transition="transform 0.2s"
                visibility="hidden"
              >
                <Icon as={FaArrowRight} boxSize={{ base: 3, lg: 5 }} />
              </Button>
            </HStack>

            {/* Dots */}
            <HStack spacing={2}>
              {Array.from({ length: pages }).map((_, i) => (
                <Box
                  key={i}
                  w={i === idx ? "24px" : {  base: "8px", lg: "12px" }}
                  h={{ base: "8px", lg: "12px" }}
                  borderRadius={i === idx ? "5px" : "full"}
                  bg={i === idx ? "#025BCF" : "rgba(255, 255, 255, 1)"}
                  cursor="pointer"
                  transition="all 0.2s"
                  onClick={() => setIdx(i)}
                />
              ))}
            </HStack>

            {/* Arrows */}
            <HStack spacing={3}>
              <Button
                w={{ base: "32px", lg: "48px" }}
                h={{ base: "32px", lg: "48px" }}
                borderRadius="full"
                bg="rgba(255, 255, 255, 0.95)"
                color="#025BCF"
                onClick={handlePrev}
                _hover={{
                    transform: "scale(1.08)",
                    bg: "#f8f8f8",
                }}
                _active={{
                    bg: "#d3d3d3",
                    transform: "scale(0.95)",
                }}
                transition="transform 0.2s"
                visibility={{ base: "hidden", md: "visible" }}
              >
                <Icon as={FaArrowLeft} boxSize={{ base: 3, lg: 5 }} />
              </Button>
              <Button
                w={{ base: "32px", lg: "48px" }}
                h={{ base: "32px", lg: "48px" }}
                borderRadius="full"
                bg="#025BCF"
                color="#fff"
                onClick={handleNext}
                _hover={{
                    transform: "scale(1.08)",
                    bg: "#0A6FE8",
                }}
                _active={{
                    bg: "#01479F",
                    transform: "scale(0.95)",
                }}
                transition="transform 0.2s"
              >
                <Icon as={FaArrowRight} boxSize={{ base: 3, lg: 5 }} />
              </Button>
            </HStack>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
}
