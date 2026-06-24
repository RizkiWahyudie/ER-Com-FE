"use client";

import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Image
} from "@chakra-ui/react";

export default function HeadlineSection() {
  return (
    <Box w="full" bg="var(--background)" position="relative">
      <Image
        src="/assets/media/media-shape.svg"
        alt="ER Communication Logo"
        maxW="100%"
        h="auto"
        position="absolute"
        top={0}
        right={0}
        pt={{ base: 20, md: 48 }}
        visibility={{ base: "hidden", md: "visible" }}
      />
      <Container
        maxW="7xl"
        px={{ base: 6, md: 0 }}
        mx="auto"
        pt={{ base: 20, md: 48 }}
      >
        <VStack spacing={16} align="stretch">
          <VStack align="flex-start" spacing={4} flex={1}>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "40px", lg: "60px" }}
              fontWeight="700"
              lineHeight="1.15"
              letterSpacing="-0.5px"
              fontFamily="Plus Jakarta Sans"
              color="#fff"
            >
              We're the pioneer of the
              <br />
              PR otomotive industry
            </Heading>
            <Text
              fontSize={{ base: "sm", md: "16px", lg: "18px" }}
              color="#e3e4e6"
              maxW="480px"
              lineHeight="1.6"
            >
              Er communication is one of leading agency in Indonesia and we
              specialize in consumer lifestyle.
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
