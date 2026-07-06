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
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useMemo } from "react";

const timelineItems = [
  {
    year: "1970",
    title: "Years of establishment",
    desc: "More than 57 years in the field",
    img: [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces",
    ],
    up: true,
  },
  {
    year: "500",
    title: "Projects are launched",
    desc: "A lot of projects are done",
    img: [
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
    ],
  },
  {
    year: "50",
    title: "Clients are satisfied",
    desc: "These people love us",
    img: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
    ],
    up: true,
  },
  {
    year: "12",
    title: "Projects in work",
    desc: "What we do right now",
    img: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=faces",
    ],
  },
];



// keyframes untuk dot oren yang "floating"
const floatDot = keyframes`
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.4;
  }
  50% {
    transform: translateY(-14px) scale(1.15);
    opacity: 1;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.4;
  }
`;

// generate posisi dot secara random tiap kali komponen mount (reload halaman)
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



export default function TimelineSection() {
  const dots = useMemo(() => generateDots(14), []);

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
              color="rgba(255, 255, 255, 0.5)"
            >
              2026
            </Text>
            <Text
              color="#ffffff"
              maxW="680px"
              fontSize={{ base: "lg", md: "2xl" }}
              lineHeight={{ lg: "32px" }}
            >
              Whether it's media relations, public communication or brand
              strategy, we help organizations communicate with clarity, trust,
              credibility, confidence in a fast-moving world. And the results?
              The numbers speak for themselves.
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
            {timelineItems.map((item, idx) => (
              <VStack
                key={idx}
                spacing={4}
                align="start"
                textAlign="start"
                flex={1}
                transform={item.up ? "translateY(-80px)" : "translateY(0)"}
                position="relative"
                zIndex={1}
              >
                <Heading
                  as="div"
                  fontSize={{ base: "38px", lg: "68px" }}
                  fontWeight="700"
                  color="#fff"
                  fontFamily="Plus Jakarta Sans"
                >
                  {item.year}
                </Heading>
                <VStack spacing={0} align="start">
                  <Text fontSize={{ base: "lg", lg: "2xl" }} color="#f0f0f0">
                    {item.title}
                  </Text>
                  <Text fontSize={{ base: "sm", lg: "md" }} color="#a0a0a0">
                    {item.desc}
                  </Text>
                </VStack>

                <HStack spacing={0} align="center" w="full">
                  <HStack spacing={0} zIndex={1}>
                    {item.img.map((src, imgIdx) => (
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

                  {/* Shape connector kanan foto, selang-seling per index */}
                  <Image
                    src={
                      idx % 2 === 0
                        ? "/assets/shape-story-1.svg"
                        : "/assets/shape-story-2.svg"
                    }
                    alt="shape connector"
                    flex={1}
                    ml={-5}
                    mt={
                      idx % 2 === 0
                        ? "-30px"
                        : "30px"
                    }
                    display={{ base: "none", md: "block" }}
                    zIndex={0}
                  />
                </HStack>
              </VStack>
            ))}
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
}