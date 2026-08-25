"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Flex,
  VStack,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

const FALLBACK_TEAM_DATA = [
  {
    name: "Andi Wijaya",
    role: "Lead Strategist",
    img: "/assets/team/team-detail/team-1.png",
  },
  {
    name: "Sarah Putri",
    role: "Creative Director",
    img: "/assets/team/team-detail/team-2.png",
  },
  {
    name: "Ingga Mawardy",
    role: "Founder & CEO",
    img: "/assets/team/team-detail/team-3.png",
  },
  {
    name: "Rina Kartika",
    role: "Account Manager",
    img: "/assets/team/team-detail/team-4.png",
  },
  {
    name: "Budi Santoso",
    role: "Senior PR Manager",
    img: "/assets/team/team-detail/team-5.png",
  },
];

// Fixed per-card tilt/vertical-lift so the scattered photo-wall layout is
// identical on server and client render — Math.random() here would cause
// a hydration mismatch since this list can start from server-rendered fallback data.
const ROTATIONS = [-6, 4, -8, 5, -3, 7, -5, 3];
const LIFTS = [0, 22, -8, 30, -16, 12, -24, 6];

export default function TeamShowcase({ members }) {
  const teamData = Array.isArray(members) && members.length > 0 ? members : FALLBACK_TEAM_DATA;
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const cardBg = useColorModeValue("#fff", "#12141b");
  const nameColor = useColorModeValue("#1a202c", "#fff");
  const roleColor = useColorModeValue("rgba(0,0,0,0.55)", "rgba(255,255,255,0.6)");

  return (
    <Box w="full" position="relative" overflow="hidden" py={{ base: 10, md: 16 }}>
      <Box
        position="absolute"
        top="0"
        left="35%"
        w="1200px"
        h="800px"
        style={{ background: "radial-gradient(ellipse at center, #025A92 0%, transparent 60%)" }}
        pointerEvents="none"
        zIndex={0}
      />
      <Box
        position="absolute"
        top="0"
        right="35%"
        w="1200px"
        h="800px"
        style={{ background: "radial-gradient(ellipse at center, #012892 0%, transparent 60%)" }}
        pointerEvents="none"
        zIndex={0}
      />

      <Container maxW="7xl" px={{ base: 6, md: 8 }} position="relative" zIndex={1}>
        {/* ── Scattered Photo Wall (static, no carousel) ── */}
        <Flex
          wrap="wrap"
          justify="center"
          align="flex-end"
          rowGap={{ base: 10, md: 16 }}
        >
          {teamData.map((member, idx) => {
            const rotation = ROTATIONS[idx % ROTATIONS.length];
            const lift = LIFTS[idx % LIFTS.length];
            const isHovered = hoveredIdx === idx;

            return (
              <Box
                key={idx}
                position="relative"
                ml={idx === 0 ? 0 : { base: "-18px", md: "-32px" }}
                mt={`${lift}px`}
                transform={`rotate(${isHovered ? 0 : rotation}deg) scale(${isHovered ? 1.08 : 1})`}
                transformOrigin="center bottom"
                transition="all 0.35s cubic-bezier(0.22, 1, 0.36, 1)"
                zIndex={isHovered ? 30 : idx}
                cursor="pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <Box
                  bg={cardBg}
                  p="10px"
                  pb="14px"
                  borderRadius="6px"
                  boxShadow={isHovered ? "0 24px 44px rgba(0,0,0,0.4)" : "0 10px 24px rgba(0,0,0,0.22)"}
                  w={{ base: "150px", sm: "180px", md: "220px" }}
                >
                  <Image
                    src={member.silhouette ?? member.img}
                    alt={member.name}
                    w="full"
                    h={{ base: "160px", sm: "190px", md: "240px" }}
                    objectFit="cover"
                    borderRadius="2px"
                    userSelect="none"
                    draggable="false"
                  />
                  <VStack spacing={0} mt={2} align="center">
                    <Text
                      fontSize={{ base: "12px", md: "14px" }}
                      fontWeight="700"
                      color={nameColor}
                      noOfLines={1}
                    >
                      {member.name}
                    </Text>
                    <Text fontSize={{ base: "10px", md: "12px" }} color={roleColor} noOfLines={1}>
                      {member.role}
                    </Text>
                  </VStack>
                </Box>
              </Box>
            );
          })}
        </Flex>
      </Container>
    </Box>
  );
}
