"use client";

import { useState } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

const teamData = [
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

export default function TeamShowcase() {
  const [activeIndex, setActiveIndex] = useState(2); // center by default

  const getOffset = (idx) => {
    const total = teamData.length;
    let diff = idx - activeIndex;
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;
    return diff;
  };

  const dotInactive = useColorModeValue("rgba(0,0,0,0.2)", "rgba(255,255,255,0.85)");
  const dotHover = useColorModeValue("rgba(0,0,0,0.4)", "rgba(255,255,255,0.45)");
  const textNameColor = useColorModeValue("rgba(2, 91, 207, 1)", "rgba(2, 91, 207, 1)");
  const textRoleColor = useColorModeValue("rgba(107, 107, 107, 1)", "rgba(107, 107, 107, 1)");
  const badgeBg = useColorModeValue("linear(to-r, #FFFFFF 0%, #eeeeeeff 50%, #b1b1b1ff 100%)", "linear(to-r, #FFFFFF 0%, #eeeeeeff 50%, #b1b1b1ff 100%)");
  const bgGradient = useColorModeValue("linear(to-t, #f7f8fc, transparent)", "linear(to-t, #070708ff, transparent)");

  return (
    <Box
      w="full"
      position="relative"
      overflow="hidden"
    >

      <Box
        position="absolute"
        top="0"
        left="35%"
        w="1200px"
        h="800px"
        style={{
          background:
            "radial-gradient(ellipse at center, #025A92 0%, transparent 60%)",
        }}
        pointerEvents="none"
        zIndex={0}
      />

      <Box
        position="absolute"
        top="0"
        right="35%"
        w="1200px"
        h="800px"
        style={{
          background:
            "radial-gradient(ellipse at center, #012892 0%, transparent 60%)",
        }}
        pointerEvents="none"
        zIndex={0}
      />

      <Container
        maxW="full"
        px={0}
        position="relative"
        zIndex={1}
      >
        <VStack spacing={0}>
          {/* ── Group Photo Carousel ── */}
          <Box
            position="relative"
            w="full"
            h={{ base: "400px", sm: "480px", md: "600px", xl:"120vh", "2xl":"95vh" }}
            display="flex"
            alignItems="start"
            justifyContent="center"
          >
            {teamData.map((member, idx) => {
              const diff = getOffset(idx);
              const absDiff = Math.abs(diff);
              const isActive = diff === 0;

              // Positions — overlapping group photo style
              // Active = center, large. ±1 = slightly behind/shorter. ±2 = further behind.
              const xOffsetBase = diff * 22; // % offset from center (mobile)
              const xOffsetMd = diff * 18;   // % offset from center (desktop)

              const scaleVal = isActive ? 1 : absDiff === 1 ? 1 : 1;
              const zIdx = isActive ? 10 : absDiff === 1 ? 6 : 2;
              const opacityVal = isActive ? 1 : absDiff === 1 ? 0.7 : 0.45;
              const blurVal = isActive ? 0 : absDiff === 1 ? 1 : 2.5;

              // Height: active tallest, others shorter
              const heightBase = isActive ? "360px" : absDiff === 1 ? "300px" : "260px";
              const heightSm = isActive ? "430px" : absDiff === 1 ? "360px" : "310px";
              const heightMd = isActive ? "540px" : absDiff === 1 ? "460px" : "400px";
              const heightXl = isActive ? "740px" : absDiff === 1 ? "670px" : "620px";

              return (
                <Box
                  key={idx}
                  position="absolute"
                  bottom="0"
                  left="50%"
                  transform={{
                    base: `translateX(calc(-50% + ${xOffsetBase}vw)) scale(${scaleVal})`,
                    md: `translateX(calc(-50% + ${xOffsetMd}vw)) scale(${scaleVal})`,
                  }}
                  // opacity={opacityVal}
                  zIndex={zIdx}
                  // filter={`blur(${blurVal}px)`}
                  transition="all 0.65s cubic-bezier(0.22, 1, 0.36, 1)"
                  cursor="pointer"
                  onClick={() => setActiveIndex(idx)}
                  // willChange="transform, opacity"
                  transformOrigin="bottom center"
                >
                  <Image
                    src={member.img}
                    alt={member.name}
                    h={{ base: heightBase, sm: heightSm, md: heightMd, xl: heightXl }}
                    w="auto"
                    maxW="none"
                    objectFit="contain"
                    objectPosition="bottom"
                    userSelect="none"
                    draggable="false"
                    zIndex={1}
                  />
                </Box>
              );
            })}

            {/* Bottom gradient fade to black */}
            <Box
              position="absolute"
              bottom="-10px"
              left="0"
              right="0"
              h="130px"
              bgGradient={bgGradient}
              pointerEvents="none"
              zIndex={11}
            />
          </Box>

          {/* Name badge — positioned overlapping bottom of photos */}
          <Box position="relative" zIndex={12} mt="-100px">
            <VStack spacing={{ base: 6, md: 12 }}>
              <Box
                bgGradient={badgeBg}
                backdropFilter="blur(24px)"
                borderRadius="full"
                px={7}
                py={3}
                textAlign="center"
              >
                <Text
                  color={textNameColor}
                  fontWeight="700"
                  fontSize={{ base: "md", md: "xl" }}
                  lineHeight="1.3"
                >
                  {teamData[activeIndex].name}
                </Text>
                <Text
                  color={textRoleColor}
                  fontSize={{ base: "xs", md: "md" }}
                  fontWeight="400"
                >
                  {teamData[activeIndex].role}
                </Text>
              </Box>

              {/* Pagination dots */}
              <HStack spacing={2} justify="center">
                {teamData.map((_, idx) => (
                  <Box
                    key={idx}
                    w={idx === activeIndex ? "26px" : "10px"}
                    h="10px"
                    borderRadius="full"
                    bg={
                      idx === activeIndex
                        ? "rgba(2, 91, 207, 1)"
                        : dotInactive
                    }
                    cursor="pointer"
                    transition="all 0.35s ease"
                    onClick={() => setActiveIndex(idx)}
                    _hover={{
                      bg:
                        idx === activeIndex
                          ? "linear-gradient(135deg, #3b82f6, #60a5fa)"
                          : dotHover,
                    }}
                  />
                ))}
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
