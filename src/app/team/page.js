"use client";

import { Box, Container, VStack, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import TeamShowcase from "@/components/TeamShowcase";
import TeamDetail from "@/components/TeamDetail";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

export default function TeamPage() {
  const pageBg = useColorModeValue("#f7f8fc", "#05060A");
  const headingText = useColorModeValue("#3C87F9", "#fff");
  const subHeadingText = useColorModeValue("rgba(0, 0, 0, 0.65)", "#a0aab8");
  
  return (
    <Box position="relative" bg={pageBg}>
      <Box position="relative" bg={pageBg}>
      {/* Orange glow — top center (matches career page) */}
      <Box
        position="absolute"
        top="-100px"
        left="50%"
        transform="translateX(-50%)"
        w={{ base: "100%", md: "1200px" }}
        h={{ base: "100%", md: "800px" }}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(216, 98, 29, 0.3) 0%, transparent 60%)",
        }}
        pointerEvents="none"
        zIndex={0}
      />

      <Navbar />

      {/* ── Hero ── */}
      <Box
        position="relative"
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        {/* Blue glow — top center */}
        <Box
          position="absolute"
          top="-60px"
          left="50%"
          transform="translateX(-50%)"
          w="800px"
          h="500px"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(29,78,216,0.45) 0%, transparent 60%)",
          }}
          pointerEvents="none"
        />

        <Container
          maxW="7xl"
          px={{ base: 6, md: 8 }}
          textAlign="center"
          position="relative"
          zIndex={1}
          pt={{ base: "130px", md: "150px" }}
          pb={{ base: 10, md: 14 }}
        >
          <VStack
            spacing={{ base: 5, md: 8 }}
            align="center"
            textAlign="center"
            w="full"
          >
            <Box
              display="inline-block"
              bg="linear-gradient(135deg, #E53E3E 0%, #e09f74ff 100%)"
              color="#fff"
              fontSize="lg"
              fontWeight="600"
              px={4}
              py={1}
              borderRadius="full"
            >
              Teams
            </Box>

            <Heading
              as="h1"
              fontSize={{ base: "42px", md: "72px", xl: "90px" }}
              color={headingText}
              fontWeight="700"
              lineHeight="1.05"
              letterSpacing="-1.8px"
              fontFamily="Plus Jakarta Sans"
            >
              Meet The People
              <br />
              Behind Great Project.
            </Heading>

            <Text
              fontSize={{ base: "16px", md: "19px" }}
              color={subHeadingText}
              maxW="2xl"
              lineHeight="1.6"
              opacity={0.85}
            >
              A team of professionals dedicated to helping company strengthen
              reputation, and create meaningful connections.
            </Text>
          </VStack>
        </Container>
      </Box>
      </Box>

      {/* ── Team Showcase (Interactive Carousel) ── */}
      <Box pb={{ base: 6, md: 20 }}>
        <TeamShowcase />
      </Box>

      {/* ── Team Detail Grid Section ── */}
      <TeamDetail />

      {/* ── Contact ── */}
      <ContactSection />

      {/* ── Footer ── */}
      <FooterSection />
    </Box>
  );
}
