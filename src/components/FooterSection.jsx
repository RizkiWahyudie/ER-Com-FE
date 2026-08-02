"use client";

import { Box, Container, Grid, VStack, HStack, Text, Link, Icon, Flex, Image, useColorModeValue } from "@chakra-ui/react";
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  const sectionBg = useColorModeValue("rgba(0, 60, 255, 0.075)", "#070810");
  const dividerColor = useColorModeValue("#e0c0bb", "#751f0c");
  const linkColor = useColorModeValue("#718096", "#BCBCBC");
  const bottomTextColor = useColorModeValue("#718096", "#cfcfcf");

  return (
    <Box
      w="full"
      bg={sectionBg}
      py={{ base: 14, md: '50px' }}
    >
      <Container maxW="7xl" px={{ base: 6, md: 6 }} mx="auto">
        <VStack spacing={8} align={{ md: "stretch" }}>
          {/* Footer Grid */}
          <Grid
            templateColumns={{ base: "1fr", md: "1.2fr 1fr 1fr 1.4fr" }}
            gap={{ base: 8, md: 8 }}
          >
            {/* Company Info */}
            <Image
              src="/assets/hero/navbar-logo.svg"
              w={{ base: "140px", md: "177px" }}
              h={{ base: "78px", md: "118px" }}
              mx={{ base: "auto", md:"0px" }}
            />

            {/* Solutions */}
            <VStack align={{ base: "center", md: "flex-start" }} spacing={{ base: 4, md: 6 }}>
              <Text fontSize={{ base: "sm", md: "lg" }} fontWeight="600" color="#C73818">
                Useful Links
              </Text>
              <VStack spacing={{ base: 2, md: 4 }} align={{ base: "center", md: "flex-start" }}>
                <Link fontSize={{ base: "xs", md: "md" }}  color={linkColor} _hover={{ color: "#C73818" }}>
                  Media Relations
                </Link>
                <Link fontSize={{ base: "xs", md: "md" }}  color={linkColor} _hover={{ color: "#C73818" }}>
                  Brand Strategy
                </Link>
                <Link fontSize={{ base: "xs", md: "md" }}  color={linkColor} _hover={{ color: "#C73818" }}>
                  Events & Activation
                </Link>
                <Link fontSize={{ base: "xs", md: "md" }}  color={linkColor} _hover={{ color: "#C73818" }}>
                  Digital Campaign
                </Link>
              </VStack>
            </VStack>

            {/* Company */}
            <VStack align={{ base: "center", md: "flex-start" }} spacing={4}>
              <Text fontSize={{ base: "sm", md: "lg" }} fontWeight="600" color="#C73818">
                Help
              </Text>
              <VStack spacing={{ base: 2, md: 4 }} align={{ base: "center", md: "flex-start" }}>
                <Link fontSize={{ base: "xs", md: "md" }}  color={linkColor} _hover={{ color: "#C73818" }}>
                  About Us
                </Link>
                <Link fontSize={{ base: "xs", md: "md" }}  color={linkColor} _hover={{ color: "#C73818" }}>
                  Our Team
                </Link>
                <Link fontSize={{ base: "xs", md: "md" }}  color={linkColor} _hover={{ color: "#C73818" }}>
                  Portfolio
                </Link>
                <Link fontSize={{ base: "xs", md: "md" }}  color={linkColor} _hover={{ color: "#C73818" }}>
                  Contact
                </Link>
              </VStack>
            </VStack>

            {/* Legal */}
            <VStack align={{ base: "center", md: "flex-start" }} spacing={4}>
              <Text fontSize={{ base: "sm", md: "lg" }} fontWeight="600" color="#C73818">
                Connect With Us
              </Text>
              <VStack spacing={{ base: 2, md: 4 }} align={{ base: "center", md: "flex-start" }}>
                <Link fontSize={{ base: "xs", md: "md" }}  color={linkColor} _hover={{ color: "#C73818" }}>
                  Privacy Policy
                </Link>
                <Link fontSize={{ base: "xs", md: "md" }}  color={linkColor} _hover={{ color: "#C73818" }}>
                  Terms of Service
                </Link>
                <Link fontSize={{ base: "xs", md: "md" }}  color={linkColor} _hover={{ color: "#C73818" }}>
                  Cookie Policy
                </Link>
              </VStack>
            </VStack>
          </Grid>

          {/* Divider */}
          <Box h="1px" bg={dividerColor} />

          {/* Bottom Footer */}
          <Flex
            justify={{ base: "center", md: "space-between" }}
            align="center"
            flexDir={{ base: "column", md: "row" }}
            gap={4}
            py={4}
            fontSize={{ base: "xs", md: "md" }}
            color={bottomTextColor}
          >
            <Text textAlign={{ base: "center", md: "left" }}>
              © {currentYear} All Right Reserved.
            </Text>

            {/* Socials */}
            <HStack spacing={2.5}>
              <Box
                w="40px"
                h="40px"
                borderRadius="full"
                bg="transparent"
                border="1px solid #C73818"
                color="#C73818"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ bg: "white" }}
              >
                <Icon as={FaFacebook} fontSize="lg" />
              </Box>
              <Box
                w="40px"
                h="40px"
                borderRadius="full"
                bg="transparent"
                border="1px solid #C73818"
                color="#C73818"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ bg: "white" }}
              >
                <Icon as={FaTwitter} fontSize="lg" />
              </Box>
              <Box
                w="40px"
                h="40px"
                borderRadius="full"
                bg="transparent"
                border="1px solid #C73818"
                color="#C73818"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ bg: "white" }}
              >
                <Icon as={FaInstagram} fontSize="lg" />
              </Box>
            </HStack>

            {/* Theme Toggle (Mobile view only - below social media) */}
            <Box display={{ base: "block", md: "none" }} mt={2}>
              <ThemeToggle />
            </Box>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
}
