"use client";

import { useEffect, useState } from "react";
import { Box, Container, VStack, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { getHeroSection } from "@/lib/api";

const FALLBACK_HERO = {
  headlineLines: [
    { text: "Explore Our Services for", color: null },
    { text: "Your Company Needs.", color: null },
  ],
  subheadline:
    "Discover how ER Communications helps company build trust, strengthen reputation, " +
    "and create meaningful connections through strategic communication solutions.",
};

export default function ServicesHeroSection() {
  const [hero, setHero] = useState(FALLBACK_HERO);

  useEffect(() => {
    getHeroSection("service").then((apiHero) => {
      if (apiHero?.headlineLines?.length > 0) setHero(apiHero);
    });
  }, []);

  const overlay = useColorModeValue("#fff", "#05060a");
  const headingText = useColorModeValue("#3C87F9", "#fff");
  const subHeadingText = useColorModeValue("rgba(0, 0, 0, 0.65)", "#a0aab8");
  return (
    <Box
      w="full"
      bg={overlay}
      backgroundImage="radial-gradient(ellipse 700px 500px at 50% 30%, rgba(255, 87, 34, 0.25), transparent 65%)"
      pt={{ base: 32, md: 40 }}
      pb={{ base: 12, md: 16 }}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="5xl" px={{ base: 6, md: 6 }} mx="auto" position="relative" zIndex={1}>
        <VStack spacing={6} align="center" textAlign="center">
          <Box
            px={{ base: 4, md: 6 }}
            py={{ base: 1.5, md: 2 }}
            bgGradient="linear(to-r, #ff7043, #e64a19)"
            borderRadius="50px"
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight="600"
            color="white"
            boxShadow="0 4px 14px rgba(230, 74, 25, 0.4)"
          >
            Services
          </Box>
          <Heading
            as="h1"
            fontSize={{ base: "42px", md: "56px", lg: "64px" }}
            color={headingText}
            fontWeight="700"
            lineHeight="1.15"
            letterSpacing="-1px"
            fontFamily="Plus Jakarta Sans"
          >
            {hero.headlineLines.map((line, idx) => (
              <Text as="span" display="block" key={idx} color={line.color || headingText}>
                {line.text}
              </Text>
            ))}
          </Heading>
          <Text
            fontSize={{ base: "sm", md: "16px", lg: "18px" }}
            color={subHeadingText}
            maxW="2xl"
            lineHeight="1.6"
          >
            {hero.subheadline}
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}