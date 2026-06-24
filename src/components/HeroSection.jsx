"use client";

import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  HStack,
} from "@chakra-ui/react";

export default function HeroSection() {
  return (
    <Box
      position="relative"
      w="full"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
    >
      {/* Background Image */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundImage="url('/assets/hero/hero-bg.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        // filter="brightness(0.55) saturate(0.85)"
        zIndex={-2}
      />

      {/* Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        background="radial-gradient(ellipse at center bottom, rgba(5, 6, 10, 0) 0%, rgba(5, 6, 10, 0) 85%), linear-gradient(
          180deg,
          rgba(5, 6, 10, 0) 0%,
          rgba(5, 6, 10, 0.1) 30%,
          rgba(5, 6, 10, 0.2) 60%,
          rgba(5, 6, 10, 0.3) 75%,
          rgba(5, 6, 10, 0.97) 90%,
          rgba(5, 6, 10, 1) 100%
        )"
        zIndex={-1}
      />

      <HStack
        spacing={{ base: 8, md: 20 }}
        justify="center"
        flexDir={{ base: "column", md: "row" }}
      >
      </HStack>

      {/* Content */}
      <Container maxW="7xl" w="full" position="relative" zIndex={0} px={{ base: 6, md: 6 }} mx="auto">
        <VStack
          spacing={{ base: 6, md: 8, lg: 12 }}
          align="center"
          textAlign="center"
          w="full"
        >
          {/* Main Heading */}
          <Heading
            as="h1"
            fontSize={{ base: "58px", sm: "48px", md: "72px", xl: "96px" }}
            color="#fff"
            fontWeight="700"
            lineHeight="1.05"
            letterSpacing="-1.5px"
            fontFamily="Plus Jakarta Sans"
          >
            We are Building{" "}
            <Text as="span" color="var(--accent)">
              Trust
            </Text>
            .<br />
            Driving Impact.
          </Heading>

          {/* Subtitle */}
          <Text
            fontSize={{ base: "15px", md: "18px", xl: "20px" }}
            color="#ffffff"
            maxW="3xl"
            lineHeight="1.4"
          >
            We help businesses communicate with confidence through strategic PR and
            communication solutions. At ER Communication, we share our knowledge to
            strengthen reputation and drive meaningful impact.
          </Text>
        </VStack>
      </Container>
      <HStack
        spacing={{ base: 8, md: 20 }}
        justify="space-evenly"
        flexDir="row"
        pb={{ base: 4, md: 8 }}
        w={{ xl:"7xl" }}
      >
        {/* Clients Stat */}
        <VStack spacing={1.5}>
          <Text
            fontSize={{ base: "13px", md: "15px", lg: "24px" }}
            fontWeight="600"
            color="var(--accent)"
            textTransform="uppercase"
          >
            Clients
          </Text>
          <Text
            fontSize={{ base: "42px", md: "48px", lg: "52px" }}
            fontWeight="700"
            color="#fff"
            fontFamily="Plus Jakarta Sans"
          >
            500+
          </Text>
        </VStack>

        {/* Divider */}
        <Box w="1px" h="120px" bg="rgba(255, 255, 255, 0.15)" />

        {/* Achievements Stat */}
        <VStack spacing={1.5}>
          <Text
            fontSize={{ base: "13px", md: "15px", lg: "24px" }}
            fontWeight="600"
            color="var(--accent)"
            textTransform="uppercase"
          >
            Achievements
          </Text>
          <Text
            fontSize={{ base: "42px", md: "48px", lg: "52px" }}
            fontWeight="700"
            color="#fff"
            fontFamily="Plus Jakarta Sans"
          >
            57+
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}
