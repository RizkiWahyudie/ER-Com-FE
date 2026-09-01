"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Flex,
  Text,
  Image,
  Heading,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

const FALLBACK_TEAM_DATA = [
  {
    name: "John Doe",
    role: "Lead Strategist",
    img: "/assets/team/banner/banner_team_1.webp",
  },
  {
    name: "Sarah Smith",
    role: "Creative Director",
    img: "/assets/team/banner/banner_team_2.webp",
  },
  {
    name: "Ingga Mawardy",
    role: "Founder & CEO",
    img: "/assets/team/banner/banner_team_3.webp",
  },
  {
    name: "Rina Kartika",
    role: "Account Manager",
    img: "/assets/team/banner/banner_team_4.webp",
  },
  {
    name: "Budi Santoso",
    role: "Senior PR Manager",
    img: "/assets/team/banner/banner_team_5.webp",
  },
  {
    name: "Ahmad Rizki",
    role: "Tech Lead",
    img: "/assets/team/banner/banner_team_6.webp",
  },
];

// Thicker white outline for the cutout effect
const outlineSize = "2px";
const SILHOUETTE_OUTLINE = [
  `drop-shadow(${outlineSize} 0 0 #fff)`,
  `drop-shadow(-${outlineSize} 0 0 #fff)`,
  `drop-shadow(0 ${outlineSize} 0 #fff)`,
  `drop-shadow(0 -${outlineSize} 0 #fff)`,
  `drop-shadow(${outlineSize} ${outlineSize} 0 #fff)`,
  `drop-shadow(-${outlineSize} -${outlineSize} 0 #fff)`,
  `drop-shadow(${outlineSize} -${outlineSize} 0 #fff)`,
  `drop-shadow(-${outlineSize} ${outlineSize} 0 #fff)`,
].join(" ");

export default function TeamShowcase({ members }) {
  const teamData = Array.isArray(members) && members.length > 0 ? members : FALLBACK_TEAM_DATA;
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <Box w="full" position="relative" pt={{ base: 10, md: 4 }} pb={0} overflow="hidden">
      <Container maxW="7xl" px={{ base: 6, md: 8 }} position="relative" zIndex={2}>
        <Flex 
          direction={{ base: "column", md: "row" }} 
          justify={{ md: "space-between" }} 
          align={{ md: "flex-start" }}
          gap={4}
        >
          
          <Text 
            color="rgba(255,255,255,0.7)" 
            fontWeight="600" 
            fontSize="sm" 
            letterSpacing="widest"
            mt={{ base: 2, md: 6 }}
          >
            &lt;&lt; SWIPE LEFT TO SEE MORE &gt;&gt;
          </Text>
        </Flex>
      </Container>

      {/* Horizontal Scroll Container */}
      <Box
        w="full"
        mt={{ base: 6, md: 10 }}
        overflowX="auto"
        overflowY="hidden"
        css={{
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
        position="relative"
        zIndex={1}
      >
        <Flex 
          w="max-content" 
          px={{ base: 6, md: 12 }} 
          align="flex-end"
        >
          {teamData.map((member, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <Box
                key={idx}
                position="relative"
                cursor="pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                mx={{ base: -2, md: -4 }}
                transition="transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)"
                zIndex={isHovered ? 10 : idx}
                transformOrigin="bottom center"
              >
                <Image
                  src={member.silhouette ?? member.img}
                  alt={member.name}
                  h={{ base: "320px", sm: "400px", md: "480px", lg: "550px" }}
                  objectFit="contain"
                  userSelect="none"
                  draggable="false"
                  // filter={SILHOUETTE_OUTLINE}
                />

                {/* Hover Badge */}
                <AnimatePresence>
                  {isHovered && (
                    <MotionBox
                      position="absolute"
                      bottom="15%"
                      left="50%"
                      initial={{ opacity: 0, y: 10, x: "-50%" }}
                      animate={{ opacity: 1, y: 0, x: "-50%" }}
                      exit={{ opacity: 0, y: 10, x: "-50%" }}
                      transition={{ duration: 0.2 }}
                      bg="#fdf6e3"
                      px={4}
                      py={2}
                      border="2px solid #1a1a1a"
                      boxShadow="3px 3px 0 #1a1a1a"
                      whiteSpace="nowrap"
                      pointerEvents="none"
                    >
                      <Text 
                        fontFamily="'Caveat', 'Comic Sans MS', cursive" 
                        fontWeight="700" 
                        color="#1a1a1a" 
                        fontSize={{ base: "md", md: "xl" }}
                        lineHeight="1.2"
                      >
                        {member.name}
                      </Text>
                      <Text 
                        fontFamily="'Caveat', 'Comic Sans MS', cursive" 
                        color="#555" 
                        fontSize={{ base: "sm", md: "md" }}
                        lineHeight="1.2"
                      >
                        {member.role}
                      </Text>
                    </MotionBox>
                  )}
                </AnimatePresence>
              </Box>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
}
