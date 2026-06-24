"use client";

import { useState, useEffect } from "react";
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
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=300&h=300&fit=crop",
    ],
  },
  {
    tag: "Media Relation",
    imgs: [
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=300&fit=crop",
    ],
  },
  {
    tag: "Media Relation",
    imgs: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=300&h=300&fit=crop",
    ],
  },
  {
    tag: "Media Relation",
    imgs: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=300&h=300&fit=crop",
    ],
  },
  {
    tag: "Media Relation",
    imgs: [
      "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=300&h=300&fit=crop",
    ],
  },
];

export default function MediaCarousel() {
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
                        rgba(0, 19, 44, 0.4) 30%,
                        rgba(2, 91, 207, 0) 70%
                        ),
                        #030712
                    `}
                  borderRadius="18px"
                  p={4}
                  border="1px solid rgba(255, 255, 255, 0.1)"
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
