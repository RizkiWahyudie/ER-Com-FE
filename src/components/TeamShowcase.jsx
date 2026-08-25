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
import { motion } from "framer-motion";
import { keyframes } from "@emotion/react";

const MotionBox = motion(Box);

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

// Fixed per-card tilt so the scattered photo-wall layout is identical on
// server and client render — Math.random() here would cause a hydration
// mismatch since this list can start from server-rendered fallback data.
const ROTATIONS = [-6, 4, -8, 5, -3, 7, -5, 3];

// Above this many members the scattered wall stops fitting one row nicely,
// so it switches from wrapping to a sideways auto-scrolling marquee instead.
const MARQUEE_THRESHOLD = 6;

// Track holds two back-to-back copies of the same sequence; translating
// exactly -50% loops it seamlessly without a visible reset jump.
const marquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

// drop-shadow (unlike box-shadow) follows the PNG's alpha shape, so this
// stack of tiny zero-blur offsets traces a white outline around the
// silhouette itself instead of drawing a rectangle behind it.
const SILHOUETTE_OUTLINE = [
  "drop-shadow(1.5px 0 0 #fff)",
  "drop-shadow(-1.5px 0 0 #fff)",
  "drop-shadow(0 1.5px 0 #fff)",
  "drop-shadow(0 -1.5px 0 #fff)",
  "drop-shadow(1.5px 1.5px 0 #fff)",
  "drop-shadow(-1.5px -1.5px 0 #fff)",
  "drop-shadow(1.5px -1.5px 0 #fff)",
  "drop-shadow(-1.5px 1.5px 0 #fff)",
].join(" ");

const glow = keyframes`
  0%, 100% { filter: ${SILHOUETTE_OUTLINE} drop-shadow(0 0 10px rgba(2, 90, 146, 0.65)); }
  50% { filter: ${SILHOUETTE_OUTLINE} drop-shadow(0 0 22px rgba(2, 90, 146, 0.95)); }
`;

export default function TeamShowcase({ members }) {
  const teamData = Array.isArray(members) && members.length > 0 ? members : FALLBACK_TEAM_DATA;
  const [hoveredKey, setHoveredKey] = useState(null);

  const nameColor = useColorModeValue("#1a202c", "#fff");
  const roleColor = useColorModeValue("rgba(0,0,0,0.6)", "rgba(255,255,255,0.65)");

  const isMarquee = teamData.length > MARQUEE_THRESHOLD;
  const cardsForLayout = isMarquee ? [...teamData, ...teamData] : teamData;
  const marqueeDuration = teamData.length * 2.4;

  const renderCard = (member, i, copyIdx) => {
    const idx = i % teamData.length;
    const rotation = ROTATIONS[idx % ROTATIONS.length];
    const cardKey = `${copyIdx}-${idx}`;
    const isHovered = hoveredKey === cardKey;

    return (
      <MotionBox
        key={cardKey}
        position="relative"
        flexShrink={0}
        ml={idx === 0 ? 0 : { base: "-18px", md: "-32px" }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
      >
        <Box
          position="relative"
          w={{ base: "150px", sm: "180px", md: "220px" }}
          transform={`rotate(${isHovered ? 0 : rotation}deg) scale(${isHovered ? 1.08 : 1})`}
          transformOrigin="center bottom"
          transition="transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)"
          zIndex={isHovered ? 30 : idx}
          cursor="pointer"
          onMouseEnter={() => setHoveredKey(cardKey)}
          onMouseLeave={() => setHoveredKey(null)}
        >
          <Image
            src={member.silhouette ?? member.img}
            alt={member.name}
            w="full"
            h={{ base: "160px", sm: "190px", md: "240px" }}
            objectFit="contain"
            userSelect="none"
            draggable="false"
            sx={{
              filter: isHovered ? undefined : SILHOUETTE_OUTLINE,
              animation: isHovered ? `${glow} 1.6s ease-in-out infinite` : "none",
              transition: "filter 0.3s ease",
            }}
          />
          <VStack
            spacing={0}
            align="center"
            mt={2}
            opacity={isHovered ? 1 : 0}
            transform={isHovered ? "translateY(0)" : "translateY(-6px)"}
            transition="all 0.3s ease"
            pointerEvents="none"
          >
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
      </MotionBox>
    );
  };

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
        {isMarquee ? (
          // ── Sideways auto-scrolling wall (many members) ──
          <Box
            overflow="hidden"
            w="full"
            sx={{
              "&:hover .team-marquee-track": { animationPlayState: "paused" },
              maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            }}
          >
            <Flex
              className="team-marquee-track"
              wrap="nowrap"
              align="center"
              w="fit-content"
              sx={{ animation: `${marquee} ${marqueeDuration}s linear infinite` }}
            >
              {cardsForLayout.map((member, i) =>
                renderCard(member, i, Math.floor(i / teamData.length))
              )}
            </Flex>
          </Box>
        ) : (
          // ── Scattered Photo Wall (static, no scroll) ──
          <Flex wrap="wrap" justify="center" align="center" rowGap={{ base: 10, md: 16 }}>
            {teamData.map((member, i) => renderCard(member, i, 0))}
          </Flex>
        )}
      </Container>
    </Box>
  );
}
