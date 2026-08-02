"use client";

import { Box, Flex, Heading, Text, Button, Image, HStack, Container, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import NextLink from "next/link";

export default function NotFound() {
  const bgColor = useColorModeValue("#fff", "#070810");
  const headingText = useColorModeValue("#3C87F9", "#fff");
  const subHeadingText = useColorModeValue("rgba(0, 0, 0, 0.65)", "#a0aab8");
  return (
    <>
      <Navbar />
      <Box
        position="relative"
        w="full"
        minH="100vh"
        bg={bgColor}
        display="flex"
        alignItems="center"
        pt={{ base: 32, md: 24 }}
        pb={20}
        overflow="hidden"
      >
        {/* Glow Effect - Orange (bottom left) */}
        <Box
          position="absolute"
          top="10%"
          left="5%"
          w={{ base: "400px", md: "800px" }}
          h={{ base: "400px", md: "800px" }}
          bg="radial-gradient(circle, rgba(199, 86, 24, 0.35) 0%, rgba(7, 8, 16, 0) 70%)"
          zIndex={0}
          transform="translate(-20%, -20%)"
        />

        {/* Glow Effect - Blue (behind illustration, right side) */}
        <Box
          position="absolute"
          top="5%"
          right="0%"
          w={{ base: "500px", md: "900px" }}
          h={{ base: "500px", md: "900px" }}
          bg="radial-gradient(circle, rgba(74, 128, 246, 0.35) 0%, rgba(7, 8, 16, 0) 65%)"
          zIndex={0}
          transform="translate(15%, -10%)"
        />
        
        <Container maxW="7xl" position="relative" zIndex={1} px={{ base: 6, md: 6 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 12, md: 8 }} alignItems="center">
            
            {/* Left Content */}
            <Flex direction="column" gap={6} pt={{ base: 10, md: 0 }} order={{ base: 2, md: 1 }}>
              <Heading
                as="h1"
                fontSize={{ base: "5xl", md: "7xl", lg: "84px" }}
                color={headingText}
                fontWeight="700"
                lineHeight="1.1"
                fontFamily="Plus Jakarta Sans, sans-serif"
                letterSpacing="-1.5px"
              >
                Uh oh, this<br />
                page wasn't<br />
                found.
              </Heading>
              
              <Text fontSize={{ base: "md", md: "18px" }} color={subHeadingText} maxW="420px" lineHeight="1.6">
                It seems you are lost, if your journey feels this way too, contact us or try again.
              </Text>
              
              <HStack spacing={4} pt={4} flexWrap="wrap" gap={4}>
                <Button
                  as={NextLink}
                  href="/"
                  bg="#4A80F6"
                  color="white"
                  borderRadius="full"
                  px={8}
                  py={6}
                  fontSize="16px"
                  fontWeight="500"
                  _hover={{ bg: "#3666cf" }}
                  m={0}
                >
                  Back to Home
                </Button>
                <Button
                  as={NextLink}
                  href="/#contact"
                  bg="transparent"
                  color="#4A80F6"
                  border="1px solid #4A80F6"
                  borderRadius="full"
                  px={8}
                  py={6}
                  fontSize="16px"
                  fontWeight="500"
                  _hover={{ bg: "#4A80F6", color: "white" }}
                  m={0}
                >
                  Contact Us
                </Button>
              </HStack>
            </Flex>

            {/* Right Image */}
            <Flex justify="center" position="relative" mt={{ base: 10, md: 0 }} order={{ base: 1, md: 2 }}>
              <Box
                position="relative"
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="0 20px 40px rgba(0, 0, 0, 0.4)"
                w="full"
                maxW={{ base: "100%", sm: "400px", md: "500px" }}
                transform={{ md: "scale(1.05)" }}
                transition="transform 0.3s ease"
                _hover={{ transform: { md: "scale(1.08)" } }}
              >
                <Image
                  src="/assets/404-illustration.png"
                  alt="404 Not Found"
                  w="full"
                  h="auto"
                  objectFit="cover"
                />
              </Box>
            </Flex>
            
          </SimpleGrid>
        </Container>
      </Box>
      <FooterSection />
    </>
  );
}
