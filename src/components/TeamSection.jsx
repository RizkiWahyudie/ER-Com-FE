"use client";

import { useState } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Image,
  Flex,
  Grid,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const teamMembers = [
  {
    name: "Ingga Mawardy",
    role: "Technology Law Associate",
    img: "/assets/team/team-card-pp-1.png",
    bgImg: "/assets/team/team-card-bg-1.png",
  },
  {
    name: "Sandra Monte",
    role: "Social Media Specialist",
    img: "/assets/team/team-card-pp-2.png",
    bgImg: "/assets/team/team-card-bg-2.png",
  },
  {
    name: "Anton Samuel",
    role: "Head of IT",
    img: "/assets/team/team-card-pp-3.png",
    bgImg: "/assets/team/team-card-bg-3.png",
  },
  {
    name: "Luke Ernser",
    role: "iOS Developer",
    img: "/assets/team/team-card-pp-4.png",
    bgImg: "/assets/team/team-card-bg-4.png",
  },
  {
    name: "Maryann Olson",
    role: "Android Developer",
    img: "/assets/team/team-card-pp-5.png",
    bgImg: "/assets/team/team-card-bg-5.png",
  },
  {
    name: "Vanessa Waters",
    role: "System Engineer",
    img: "/assets/team/team-card-pp-6.png",
    bgImg: "/assets/team/team-card-bg-6.png",
  },
  {
    name: "Robert Martin",
    role: "Account Executive",
    img: "/assets/team/team-card-pp-7.png",
    bgImg: "/assets/team/team-card-bg-7.png",
  },
  {
    name: "Angga Febri",
    role: "Designer",
    img: "/assets/team/team-card-pp-8.png",
    bgImg: "/assets/team/team-card-bg-8.png",
  },
];

export default function TeamSection({ teamHome = 1 }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = teamMembers[selectedIdx];

  // Get current active and next 2 members for the preview carousel on the right
  const getPreviewMembers = () => {
    const preview = [];
    for (let i = 0; i < 2; i++) {
      const idx = (selectedIdx + i) % teamMembers.length;
      preview.push({ ...teamMembers[idx], originalIdx: idx });
    }
    return preview;
  };

  const previewMembers = getPreviewMembers();

  return (
    <VStack bg="#030712" gap={{ base: 4, lg: 8 }}>
      <Box
        w="full"
        position="relative"
        py={{ base: 16, md: 0 }}
        overflow="hidden"
        bgImage={`url('${selected.bgImg}')`}
        bgSize="cover"
        bgPosition="center"
        transition="background-image 0.6s ease-in-out"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        h={{ lg: '80vh' }}
      >
        {/* Dark Overlay Layer */}
        <Box
          position="absolute"
          inset={0}
          background="linear-gradient(to right, rgba(5,6,10,0.98) 0%, rgba(5,6,10,0.85) 45%, rgba(5,6,10,0.4) 100%)"
          zIndex={0}
        />

        <Container maxW="8xl" px={{ base: 6, md: 8 }} position="relative" zIndex={1}>
          <Flex
            gap={{ base: 12, lg: 16 }}
            alignItems="center"
            flexDirection={{ base: "column", lg: "row" }}
            justifyContent="space-between"
          >
            {/* Left Column - Team Info */}
            <VStack align="flex-start" spacing={6} maxW="xl" flex={{ lg: "40%" }}>
              <VStack align="flex-start" spacing={4}>
                <Heading
                  as="h2"
                  fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
                  fontWeight="500"
                  color="#fff"
                  fontFamily="Plus Jakarta Sans"
                  lineHeight="1.2"
                >
                  See And Explore<br />
                  More About Our<br />
                  Amazing Team.
                </Heading>
                <Text
                  fontSize={{ base: "sm", md: "md" }}
                  color="rgba(255,255,255,0.7)"
                  lineHeight="1.7"
                >
                  Get to know the experts behind ER Communications and the people driving every successful communication strategy.
                </Text>
              </VStack>

              {/* Accent Line */}
              <Box w="120px" h="2.5px" bg="#006adb" />

              {/* Selected Member Info */}
              <VStack align="flex-start" spacing={2}>
                <Heading
                  as="h3"
                  fontSize={{ base: "2xl", md: "4xl" }}
                  color="#006adb"
                  fontWeight="700"
                  fontFamily="Plus Jakarta Sans"
                >
                  {selected.name}
                </Heading>
                <Text
                  fontSize={{ base: "sm", md: "md" }}
                  color="rgba(255,255,255,0.8)"
                  fontWeight="500"
                >
                  as {selected.role}
                </Text>
              </VStack>

              {/* Contact Button */}
              <Button
                bg="#006adb"
                color="#fff"
                borderRadius="full"
                px={8}
                py={6}
                fontSize="sm"
                fontWeight="600"
                _hover={{
                  bg: "#0056b3",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(0, 106, 219, 0.4)",
                }}
                transition="all 0.2s"
              >
                Contact
              </Button>
            </VStack>

            {/* Right Column - Carousel Cards Stack */}
            <Flex
              w="full"
              align="center"
              justify={{ base: "center", lg: "flex-start" }}
              position="relative"
              flex={{ lg: "60%" }}
            >
              <VStack gap={{ base: 4, lg: 8 }}>
                <HStack spacing={{ base: 4, md: 6 }} align="center" overflow="visible">
                  {previewMembers.map((member, i) => {
                    const isActive = i === 0;
                    return (
                      <Box
                        key={member.originalIdx}
                        position="relative"
                        borderRadius="24px"
                        overflow="hidden"
                        w={{
                          base: isActive ? "220px" : "110px",
                          sm: isActive ? "280px" : "150px",
                          md: isActive ? "320px" : "200px",
                          lg: isActive ? "380px" : "292px",
                        }}
                        h={{
                          base: isActive ? "280px" : "140px",
                          sm: isActive ? "340px" : "190px",
                          md: isActive ? "380px" : "240px",
                          lg: isActive ? "500px" : "346px",
                        }}
                        border={isActive ? "4px solid #fff" : "none"}
                        boxShadow={isActive ? "0 20px 40px rgba(0,0,0,0.5)" : "none"}
                        cursor="pointer"
                        onClick={() => setSelectedIdx(member.originalIdx)}
                        transition="all 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
                        opacity={isActive ? 1 : 0.65}
                        _hover={{
                          opacity: 1,
                          transform: isActive ? "none" : "scale(1.05)",
                        }}
                      >
                        <Image
                          src={member.img}
                          alt={member.name}
                          w="full"
                          h="full"
                          objectFit="cover"
                        />
                      </Box>
                    );
                  })}
                </HStack>
                {/* Dots Indicator */}
                <HStack spacing={2.5}>
                  {teamMembers.map((_, idx) => (
                    <Box
                      key={idx}
                      w={idx === selectedIdx ? "20px" : "7px"}
                      h="7px"
                      borderRadius="full"
                      bg={idx === selectedIdx ? "#fff" : "rgba(255, 255, 255, 0.35)"}
                      cursor="pointer"
                      transition="all 0.3s ease"
                      onClick={() => setSelectedIdx(idx)}
                    />
                  ))}
                </HStack>
              </VStack>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <VStack spacing={6} align="center">
        {/* View All Button */}
        {teamHome === 1 && (
          <Link href="/team">
            <Button
              size="sm"
              px={{ base: 4, md: 6 }}
              py={{ base: 1.5, md: 6 }}
              borderRadius="50px"
              bg="transparent"
              color="white"
              border="2px solid white"
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
        )}
      </VStack>
    </VStack>
  );
}
