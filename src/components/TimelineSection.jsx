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

export default function TimelineSection() {
  return (
    <Box
      w="full"
      bg="var(--background)"
      backgroundImage="radial-gradient(ellipse at 20% 50%, rgba(33, 150, 243, 0.08), transparent 60%)"
      py={{ base: 20, md: 20 }}
    >
      <Container maxW="7xl" px={{ base: 6, md: 0 }} mx="auto">
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
            {/* Timeline Line */}
            {/* <Box
              position="absolute"
              top="50%"
              left={0}
              right={0}
              h="1px"
              bg="linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
              display={{ base: "none", md: "block" }}
            /> */}

            {/* Items */}
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
                <HStack>
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
              </VStack>
            ))}
          </Flex>

          {/* Trust Line */}
          <Text textAlign="center" color="#2196f3" fontSize={{ base: "md", md: "lg" }}>
            Trusted by over 500+ clients of Indonesia’s leading companies
          </Text>

          {/* Quote Block */}
          <VStack spacing={6} maxW="760px" textAlign="center">
            <Text
              fontSize={{ base: "xl", md: "3xl" }}
              fontWeight="500"
              lineHeight="1.5"
              color="white"
              fontFamily="Plus Jakarta Sans"
            >
              "I imagine we can change the world, one heart, one face or one
              body at a time. We think outside the lines of our craft."
            </Text>
            <HStack justify="center" gap={4}>
              <Image
                src="/assets/hero/navbar-logo-sm.svg"
                alt="ER Communication Logo"
                w="50px"
                h="50px"
                backgroundColor="white"
                rounded="full"
              />
              <VStack spacing={0} align="flex-start" fontSize={{ base: "sm", md: "md" }}>
                <Text fontWeight="700" color="#fff">
                  Garin Setiawan
                </Text>
                <Text color="#8b93a7">Co-Founder</Text>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
