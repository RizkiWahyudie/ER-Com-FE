"use client";

import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Image,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useMemo } from "react";

const FALLBACK_TIMELINE_ITEMS = [
  {
    year: "1970",
    title: "Years of establishment",
    desc: "More than 57 years in the field",
  },
  {
    year: "500",
    title: "Projects are launched",
    desc: "A lot of projects are done",
  },
  {
    year: "50",
    title: "Clients are satisfied",
    desc: "These people love us",
  },
  {
    year: "12",
    title: "Projects in work",
    desc: "What we do right now",
  },
];

const TIMELINE_IMAGE_POOL = [
  [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces",
  ],
  [
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
  ],
  [
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
  ],
  [
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=faces",
  ],
];

const floatDot = keyframes`
  0% { transform: translateY(0) scale(1); opacity: 0.4; }
  50% { transform: translateY(-14px) scale(1.15); opacity: 1; }
  100% { transform: translateY(0) scale(1); opacity: 0.4; }
`;

function generateDots(count) {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    top: Math.random() * 90 + 5,
    left: Math.random() * 95 + 2,
    size: Math.random() * 6 + 4,
    duration: Math.random() * 2 + 2.5,
    delay: Math.random() * 2,
  }));
}

const FALLBACK_INTRO_YEAR = "2026";
const FALLBACK_INTRO_DESCRIPTION =
  "Whether it's media relations, public communication or brand " +
  "strategy, we help organizations communicate with clarity, trust, " +
  "credibility, confidence in a fast-moving world. And the results? " +
  "The numbers speak for themselves.";

export default function TimelineSection({ intro, items }) {
  const dots = useMemo(() => generateDots(14), []);
  const timelineItems =
    Array.isArray(items) && items.length > 0 ? items : FALLBACK_TIMELINE_ITEMS;

  const yearColor = useColorModeValue("#1a202c", "#fff");
  const titleColor = useColorModeValue("#2d3748", "#f0f0f0");
  const descColor = useColorModeValue("#718096", "#a0a0a0");
  const introYearColor = useColorModeValue("rgba(0,0,0,0.4)", "rgba(255, 255, 255, 0.5)");
  const introTextColor = useColorModeValue("#2d3748", "#ffffff");

  return (
    <Box
      w="full"
      bg="var(--background)"
      backgroundImage="radial-gradient(ellipse at 20% 50%, rgba(33, 150, 243, 0.08), transparent 60%)"
      py={{ base: 20, md: 20 }}
      position="relative"
      overflow="hidden"
    >
      {/* Floating orange dots */}
      {dots.map((dot) => (
        <Box
          key={dot.id}
          position="absolute"
          top={`${dot.top}%`}
          left={`${dot.left}%`}
          w={`${dot.size}px`}
          h={`${dot.size}px`}
          borderRadius="full"
          bg="#ff5722"
          boxShadow="0 0 8px rgba(255, 87, 34, 0.6)"
          animation={`${floatDot} ${dot.duration}s ease-in-out ${dot.delay}s infinite`}
          pointerEvents="none"
          zIndex={0}
        />
      ))}

      <Container maxW="8xl" px={{ base: 6, md: 0 }} mx="auto" position="relative" zIndex={1}>
        <VStack spacing={20} align="center">
          {/* Intro Text */}
          <HStack
            gap={6}
            textAlign="start"
            alignItems="flex-start"
            flexDir={{ base: "column", md: "row" }}
          >
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="bold"
              color={introYearColor}
            >
              {intro?.year ?? FALLBACK_INTRO_YEAR}
            </Text>
            <Text
              color={introTextColor}
              maxW="680px"
              fontSize={{ base: "lg", md: "2xl" }}
              lineHeight={{ lg: "32px" }}
            >
              {intro?.description ?? FALLBACK_INTRO_DESCRIPTION}
            </Text>
          </HStack>

          {/* Timeline */}
          <Flex
            position="relative"
            justify="space-between"
            w="full"
            gap={8}
            pt={{ base: 10, lg: 24 }}
            pb={{ base: 8, lg: 16 }}
            px={5}
            flexWrap={{ base: "wrap", md: "nowrap" }}
          >
            {timelineItems.map((item, idx) => {
              const up = idx % 2 === 0;
              const img = TIMELINE_IMAGE_POOL[idx % TIMELINE_IMAGE_POOL.length];
              return (
              <VStack
                key={idx}
                spacing={4}
                align="start"
                textAlign="start"
                flex={1}
                transform={up ? "translateY(-80px)" : "translateY(0)"}
                position="relative"
                zIndex={1}
              >
                <Heading
                  as="div"
                  fontSize={{ base: "38px", lg: "68px" }}
                  fontWeight="700"
                  color={yearColor}
                  fontFamily="Plus Jakarta Sans"
                >
                  {item.year}
                </Heading>
                <VStack spacing={0} align="start">
                  <Text fontSize={{ base: "lg", lg: "2xl" }} color={titleColor}>
                    {item.title}
                  </Text>
                  <Text fontSize={{ base: "sm", lg: "md" }} color={descColor}>
                    {item.desc}
                  </Text>
                </VStack>

                <HStack spacing={0} align="center" w="full">
                  <HStack spacing={0} zIndex={1}>
                    {img.map((src, imgIdx) => (
                      <Box
                        key={imgIdx}
                        w="50px"
                        h="50px"
                        borderRadius="full"
                        overflow="hidden"
                        border="3px solid #d6d6d6"
                        boxShadow="0 4px 12px rgba(0,0,0,0.5)"
                        ml={imgIdx === 0 ? 0 : "-24px"}
                      >
                        <Image
                          src={src}
                          alt={item.title}
                          w="full"
                          h="full"
                          objectFit="cover"
                        />
                      </Box>
                    ))}
                  </HStack>

                  {/* Shape connector */}
                  <Image
                    src={
                      idx % 2 === 0
                        ? "/assets/shape-story-1.svg"
                        : "/assets/shape-story-2.svg"
                    }
                    alt="shape connector"
                    flex={1}
                    ml={-5}
                    mt={idx % 2 === 0 ? "-30px" : "30px"}
                    display={{ base: "none", md: "block" }}
                    zIndex={0}
                  />
                </HStack>
              </VStack>
              );
            })}
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
}