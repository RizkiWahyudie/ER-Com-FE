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
  useColorModeValue,
} from "@chakra-ui/react";
import { FaPlay, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { getMediaCarouselSlides } from "@/lib/api";

export default function MediaCarousel() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [perView, setPerView] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [slidesData, setSlidesData] = useState([]);

  useEffect(() => {
    getMediaCarouselSlides().then(setSlidesData);
  }, []);

  const cardBg = useColorModeValue(
    "radial-gradient(circle at 50% 0%, rgba(0,37,85,0.06) 0%, rgba(0,13,44,0.03) 30%, rgba(2,91,207,0) 70%), #f0f4fa",
    "radial-gradient(circle at 50% 0%, rgba(0,37,85,0.8) 0%, rgba(0,13,44,0.4) 30%, rgba(2,91,207,0) 70%), #030712"
  );
  const cardBorder = useColorModeValue("rgba(0,0,0,0.1)", "rgba(255,255,255,0.1)");
  const tagColor = useColorModeValue("#1a202c", "#fff");
  const dotInactive = useColorModeValue("rgba(0,0,0,0.2)", "rgba(255,255,255,1)");

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

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % pages);
    }, 3000);
    return () => clearInterval(interval);
  }, [idx, pages, isHovered]);

  const handleSlideClick = (categoryTitle) => {
    router.push(`/services?cat=${encodeURIComponent(categoryTitle)}`);
  };

  const handlePrev = () => setIdx((idx - 1 + pages) % pages);
  const handleNext = () => setIdx((idx + 1) % pages);
  const slideWidth = 100 / perView;

  if (slidesData.length === 0) return null;

  return (
    <Box
      w="full"
      bg="var(--background)"
      py={{ base: 12, md: 16 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Container maxW="7xl" px={{ base: 6, md: 0 }} mx="auto">
        <VStack spacing={7} align="stretch">
          {/* Carousel Track */}
          <Box overflow="hidden" w="full" py={5}>
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
                  bg={cardBg}
                  borderRadius="18px"
                  p={4}
                  border={`1px solid ${cardBorder}`}
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
                        )}
                      </Box>
                    ))}
                  </Box>
                  <Heading
                    as="h3"
                    size="sm"
                    color={tagColor}
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
                  bg={i === idx ? "#025BCF" : dotInactive}
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
