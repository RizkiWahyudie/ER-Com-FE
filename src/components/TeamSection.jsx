"use client";

import { useState } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Grid,
  Heading,
  Text,
  Button,
  Image,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";

const teamMembers = [
  {
    name: "Ingga Mawardy",
    role: "Founder & CEO",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop&crop=faces",
  },
  {
    name: "Sarah Putri",
    role: "Creative Director",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop&crop=faces",
  },
  {
    name: "Andi Wijaya",
    role: "Lead Strategist",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop&crop=faces",
  },
  {
    name: "Rina Kartika",
    role: "Account Manager",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&h=500&fit=crop&crop=faces",
  },
  {
    name: "Budi Santoso",
    role: "Senior PR Manager",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop&crop=faces",
  },
];

const tabs = ["Clients", "Teams", "Experiences"];

export default function TeamSection() {
  const [activeTab, setActiveTab] = useState("Teams");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = teamMembers[selectedIdx];

  return (
    <Box
      w="full"
      bg="linear-gradient(180deg, var(--background) 0%, #0c1426 50%, var(--background) 100%)"
      py={{ base: 20, md: 20 }}
      position="relative"
    >
      <Container maxW="7xl" px={{ base: 6, md: 6 }} mx="auto">
        <VStack spacing={{ base: 12, md: 16 }} align="stretch">
          {/* Tabs */}
          <HStack justify="center" spacing={3.5}>
            {tabs.map((tab) => (
              <Button
                key={tab}
                px={{  base: 6, lg: 12 }}
                py={{ base: 3, lg: 6 }}
                borderRadius="full"
                border="1px solid rgba(255, 255, 255, 0.2)"
                color={activeTab === tab ? "#05060a" : "rgba(207, 213, 227, 1)"}
                bg={activeTab === tab ? "#fff" : "rgba(255, 255, 255, 0.03)"}
                fontSize={{ base: "sm", md: "lg" }}
                fontWeight="500"
                onClick={() => setActiveTab(tab)}
                transition="all 0.25s"
                _hover={{ bg: activeTab === tab ? "#fff" : "rgba(255, 255, 255, 0.08)" }}
              >
                {tab}
              </Button>
            ))}
          </HStack>

          {/* Main Content */}
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            gap={{ base: 8, md: 15 }}
            alignItems="center"
            maxW="7xl"
            mx="auto"
            w="full"
          >
            {/* Team Photo */}
            <Flex justify="center" position="relative" h="auto">
              <Box
                position="relative"
                w={{ base: "280px", md: "340px" }}
                h={{ base: "280px", md: "340px" }}
                borderRadius="full"
                overflow="hidden"
                background="radial-gradient(circle at 30% 30%, var(--primary) 0%, #0c1426 70%)"
                p={1.5}
              >
                <Image
                  src={selected.img}
                  alt={selected.name}
                  w="full"
                  h="full"
                  objectFit="cover"
                  borderRadius="full"
                />
              </Box>

              {/* Photo Navigation */}
              <Button
                position="absolute"
                left={{ base: "-20px", md: "-10px" }}
                top="50%"
                transform="translateY(-50%)"
                w="42px"
                h="42px"
                borderRadius="full"
                bg="rgba(255, 255, 255, 0.95)"
                color="#05060a"
                fontSize="22px"
                zIndex={2}
                _hover={{ transform: "translateY(-50%) scale(1.08)" }}
                onClick={() => setSelectedIdx((selectedIdx - 1 + teamMembers.length) % teamMembers.length)}
              >
                ‹
              </Button>

              <Button
                position="absolute"
                right={{ base: "-20px", md: "-10px" }}
                top="50%"
                transform="translateY(-50%)"
                w="42px"
                h="42px"
                borderRadius="full"
                bg="var(--primary)"
                color="#fff"
                fontSize="22px"
                zIndex={2}
                _hover={{ transform: "translateY(-50%) scale(1.08)" }}
                onClick={() => setSelectedIdx((selectedIdx + 1) % teamMembers.length)}
              >
                ›
              </Button>
            </Flex>

            {/* Team Info */}
            <VStack align={{ base: "center", md: "flex-start" }} spacing={6} textAlign={{ base: "center", md: "left" }}>
              <Heading size={{ base: "lg", md: "3xl" }} w={{ base: "full", md: "80%" }} color="#fff" lineHeight="1.2" fontWeight={400}>
                Meet the People Behind Every Great Project.
              </Heading>
              <Text fontSize={{ base: "sm", md: "md" }} color="#fff">
                A team of professionals dedicated to helping company strengthen reputation, and create meaningful connections.
              </Text>
              <Box>
                <Heading as="h3" size="lg" color="var(--primary)" mb={1}>
                  {selected.name}
                </Heading>
                <Text fontSize="xs" color="rgba(139, 147, 167, 1)">
                  {selected.role}
                </Text> 
              </Box>
              <Button
                className="pill-btn dark"
                mt={4}
                px={7}
                py={2.5}
                borderRadius="full"
                bg="#fff"
                color="#05060a"
                fontSize="sm"
                fontWeight="600"
              >
                See All Teams
              </Button>
            </VStack>
          </Grid>

          {/* Team Avatars */}
          <HStack justify="center" spacing={3.5}>
            {teamMembers.map((member, idx) => (
              <Box
                key={idx}
                w="54px"
                h="54px"
                borderRadius="full"
                border="2px solid var(--primary)"
                overflow="hidden"
                cursor="pointer"
                transition="transform 0.2s"
                _hover={{ transform: "scale(1.1)" }}
                onClick={() => setSelectedIdx(idx)}
              >
                <Image
                  src={member.img}
                  alt={member.name}
                  w="full"
                  h="full"
                  objectFit="cover"
                />
              </Box>
            ))}
          </HStack>
        </VStack>
      </Container>

      {/* WhatsApp Float */}
      <Flex
        position="fixed"
        right={6}
        bottom={6}
        w="58px"
        h="58px"
        borderRadius="full"
        bg="#22c55e"
        align="center"
        justify="center"
        boxShadow="0 10px 30px rgba(34, 197, 94, 0.5)"
        zIndex={60}
        as="a"
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon as={FaWhatsapp} color="#fff" w={7} h={7} />
      </Flex>
    </Box>
  );
}
