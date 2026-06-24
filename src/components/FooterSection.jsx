"use client";

import { Box, Container, Grid, VStack, HStack, Text, Link, Icon, Flex } from "@chakra-ui/react";
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      w="full"
      bg="#070810"
      py={{ base: 16, md: 15 }}
      borderTop="1px solid rgba(255, 255, 255, 0.05)"
    >
      <Container maxW="1180px" px={{ base: 6, md: 6 }} mx="auto">
        <VStack spacing={8} align="stretch">
          {/* Footer Grid */}
          <Grid
            templateColumns={{ base: "1fr", md: "1.2fr 1fr 1fr 1.4fr" }}
            gap={{ base: 8, md: 8 }}
          >
            {/* Company Info */}
            <VStack align={{ base: "center", md: "flex-start" }} spacing={3}>
              <Box fontSize="34px" fontWeight="800" letterSpacing="-1px">
                <Box as="span" color="var(--primary)">
                  ER
                </Box>
                <Box as="span" color="var(--accent)">
                  +
                </Box>
              </Box>
              <Text fontSize="xs" color="rgba(90, 98, 122, 1)" letterSpacing="2px" textTransform="uppercase">
                Communication
              </Text>
              <Text fontSize="xs" color="rgba(139, 147, 167, 1)">
                Building trust and driving impact through strategic communication.
              </Text>
            </VStack>

            {/* Solutions */}
            <VStack align={{ base: "center", md: "flex-start" }} spacing={4}>
              <Text fontSize="sm" fontWeight="600" color="#fff">
                Solutions
              </Text>
              <VStack spacing={2} align={{ base: "center", md: "flex-start" }}>
                <Link fontSize="xs" color="rgba(139, 147, 167, 1)" _hover={{ color: "var(--primary)" }}>
                  Media Relations
                </Link>
                <Link fontSize="xs" color="rgba(139, 147, 167, 1)" _hover={{ color: "var(--primary)" }}>
                  Brand Strategy
                </Link>
                <Link fontSize="xs" color="rgba(139, 147, 167, 1)" _hover={{ color: "var(--primary)" }}>
                  Events & Activation
                </Link>
                <Link fontSize="xs" color="rgba(139, 147, 167, 1)" _hover={{ color: "var(--primary)" }}>
                  Digital Campaign
                </Link>
              </VStack>
            </VStack>

            {/* Company */}
            <VStack align={{ base: "center", md: "flex-start" }} spacing={4}>
              <Text fontSize="sm" fontWeight="600" color="#fff">
                Company
              </Text>
              <VStack spacing={2} align={{ base: "center", md: "flex-start" }}>
                <Link fontSize="xs" color="rgba(139, 147, 167, 1)" _hover={{ color: "var(--primary)" }}>
                  About Us
                </Link>
                <Link fontSize="xs" color="rgba(139, 147, 167, 1)" _hover={{ color: "var(--primary)" }}>
                  Our Team
                </Link>
                <Link fontSize="xs" color="rgba(139, 147, 167, 1)" _hover={{ color: "var(--primary)" }}>
                  Portfolio
                </Link>
                <Link fontSize="xs" color="rgba(139, 147, 167, 1)" _hover={{ color: "var(--primary)" }}>
                  Contact
                </Link>
              </VStack>
            </VStack>

            {/* Legal */}
            <VStack align={{ base: "center", md: "flex-start" }} spacing={4}>
              <Text fontSize="sm" fontWeight="600" color="#fff">
                Legal
              </Text>
              <VStack spacing={2} align={{ base: "center", md: "flex-start" }}>
                <Link fontSize="xs" color="rgba(139, 147, 167, 1)" _hover={{ color: "var(--primary)" }}>
                  Privacy Policy
                </Link>
                <Link fontSize="xs" color="rgba(139, 147, 167, 1)" _hover={{ color: "var(--primary)" }}>
                  Terms of Service
                </Link>
                <Link fontSize="xs" color="rgba(139, 147, 167, 1)" _hover={{ color: "var(--primary)" }}>
                  Cookie Policy
                </Link>
              </VStack>
            </VStack>
          </Grid>

          {/* Divider */}
          <Box h="1px" bg="rgba(255, 255, 255, 0.05)" />

          {/* Bottom Footer */}
          <Flex
            justify={{ base: "center", md: "space-between" }}
            align="center"
            flexDir={{ base: "column", md: "row" }}
            gap={4}
            py={4}
            fontSize="xs"
            color="rgba(90, 98, 122, 1)"
          >
            <Text textAlign={{ base: "center", md: "left" }}>
              © {currentYear} ER+ Communication. All rights reserved.
            </Text>

            {/* Socials */}
            <HStack spacing={2.5}>
              <Box
                w="30px"
                h="30px"
                borderRadius="full"
                bg="rgba(255, 255, 255, 0.06)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ bg: "var(--primary)" }}
              >
                <Icon as={FaFacebook} fontSize="xs" color="rgba(207, 213, 227, 1)" />
              </Box>
              <Box
                w="30px"
                h="30px"
                borderRadius="full"
                bg="rgba(255, 255, 255, 0.06)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ bg: "var(--primary)" }}
              >
                <Icon as={FaLinkedin} fontSize="xs" color="rgba(207, 213, 227, 1)" />
              </Box>
              <Box
                w="30px"
                h="30px"
                borderRadius="full"
                bg="rgba(255, 255, 255, 0.06)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ bg: "var(--primary)" }}
              >
                <Icon as={FaTwitter} fontSize="xs" color="rgba(207, 213, 227, 1)" />
              </Box>
              <Box
                w="30px"
                h="30px"
                borderRadius="full"
                bg="rgba(255, 255, 255, 0.06)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ bg: "var(--primary)" }}
              >
                <Icon as={FaInstagram} fontSize="xs" color="rgba(207, 213, 227, 1)" />
              </Box>
            </HStack>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
}
