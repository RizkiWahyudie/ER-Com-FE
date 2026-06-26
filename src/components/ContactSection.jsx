"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  VStack,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  Flex,
  HStack
} from "@chakra-ui/react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <Box
      w="full"
      bgImage="url('/assets/contact/contact-bg.png')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      py={{ base: 20, md: 20 }}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="7xl" px={{ base: 6, md: 6 }} mx="auto" position="relative" zIndex={1}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
          gap={{ base: 8, md: 12, xl: 24 }}
        >
          {/* Left Side */}
          <VStack align={{ base: "center", md: "flex-start" }} flex={1.2} spacing={8}>
            <VStack align={{ base: "center", md: "flex-start" }} spacing={4} textAlign={{ base: "center", md: "left" }} color="#d4dbeb">
              <Heading as="h2" size={{ base: "lg", md: "xl" }}>
                Ready TO Contact Us for Professional PR Support?
              </Heading>
              <Text fontSize={{ base: "sm", md: "md" }} color="#d4dbeb">
                If you require assistance with PR matters, our experienced team is here to help. Please use the form below to get in touch with our team and discuss your company needs.
              </Text>
            </VStack>

            {/* Map */}
            <Box
              w={{ base: "full", md: "80%" }}
              h={{ base: "200px", md: "300px" }}
              borderRadius="14px"
              overflow="hidden"
              border="1px solid rgba(255, 255, 255, 0.1)"
            >
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ filter: "hue-rotate(180deg) invert(0.9)", border: "none" }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.8159147128544!2d106.80665931531557!3d-6.163726395427357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34ef7%3A0x146bb1fbf7c03c87!2sJakarta!5e0!3m2!1sid!2sid!4v1234567890"
                title="Location"
              />
            </Box>
          </VStack>

          {/* Right Side - Form */}
          <Box
            position="relative"
            overflow="hidden"
            flex={0.8}
            bg="rgba(128, 128, 128, 0.18)"
            backdropFilter="blur(20px)"
            // WebkitBackdropFilter="blur(20px)"
            borderRadius="40px"
            border="1px solid rgba(255,255,255,.08)"
            px={{ base: 6, md: 10 }}
            py={{ base: 8, md: 10 }}
            boxShadow="
              0 30px 60px rgba(0,0,0,.25),
              inset 0 1px 0 rgba(255,255,255,.08)
            "
          >
            <VStack
              as="form"
              onSubmit={handleSubmit}
              spacing={5}
              align="stretch"
            >
              {/* Heading */}
              <VStack spacing={1}>
                <Text
                  fontSize={{ base: "xl", md: "4xl" }}
                  fontWeight="600"
                  textAlign="center"
                  bgGradient="linear(to-r, white, #4DA8FF)"
                  bgClip="text"
                >
                  GET IN TOUCH
                </Text>

                <Text
                  color="rgba(255,255,255,.7)"
                  fontSize={{ base: "md", lg: "lg" }}
                >
                  We're available 24 / 7
                </Text>
              </VStack>

              {/* Name */}
              <Input
                placeholder="Your Name"
                h="46px"
                px={5}
                borderRadius="999px"
                bg="rgba(128, 128, 128, 0.2)"
                backdropFilter="blur(20px)"
                // WebkitBackdropFilter="blur(20px)"
                border="0.5px solid rgba(255,255,255,0.15)"
                color="white"
                fontSize="14px"
                fontWeight="400"
                transition="all .25s ease"
                _placeholder={{
                  color: "rgba(255,255,255,.45)",
                }}
                _hover={{
                  borderColor: "rgba(255,255,255,.25)",
                }}
                _focus={{
                  bg: "rgba(128,128,128,.24)",
                  borderColor: "var(--primary)",
                  boxShadow: "0 0 0 1px var(--primary)",
                }}
              />

              {/* Phone */}
              <Input
                placeholder="Your Contact Number"
                h="46px"
                px={5}
                borderRadius="999px"
                bg="rgba(128, 128, 128, 0.2)"
                backdropFilter="blur(20px)"
                // WebkitBackdropFilter="blur(20px)"
                border="0.5px solid rgba(255,255,255,0.15)"
                color="white"
                fontSize="14px"
                fontWeight="400"
                transition="all .25s ease"
                _placeholder={{
                  color: "rgba(255,255,255,.45)",
                }}
                _hover={{
                  borderColor: "rgba(255,255,255,.25)",
                }}
                _focus={{
                  bg: "rgba(128,128,128,.24)",
                  borderColor: "var(--primary)",
                  boxShadow: "0 0 0 1px var(--primary)",
                }}
              />

              <Textarea
                placeholder="How can we help?"
                minH="140px"
                px={5}
                borderRadius="20px"
                bg="rgba(128, 128, 128, 0.2)"
                backdropFilter="blur(20px)"
                // WebkitBackdropFilter="blur(20px)"
                border="0.5px solid rgba(255,255,255,0.15)"
                color="white"
                fontSize="14px"
                fontWeight="400"
                transition="all .25s ease"
                _placeholder={{
                  color: "rgba(255,255,255,.45)",
                }}
                _hover={{
                  borderColor: "rgba(255,255,255,.25)",
                }}
                _focus={{
                  bg: "rgba(128,128,128,.24)",
                  borderColor: "var(--primary)",
                  boxShadow: "0 0 0 1px var(--primary)",
                }}
              />

              {/* Bottom */}
              <Flex
                justify="space-between"
                align="center"
                pt={2}
              >
                <Button
                  variant="outline"
                  borderRadius="999px"
                  borderColor="rgba(255,255,255,.4)"
                  color="white"
                  leftIcon={<Text fontSize="lg">+</Text>}
                  bg="transparent"
                  px={6}
                  _hover={{
                    bg: "rgba(255,255,255,.05)"
                  }}
                >
                  REQUEST CALLBACK
                </Button>

                <Button
                  type="submit"
                  borderRadius="999px"
                  px={8}
                  bgGradient="linear(to-r, #F8F8F8, #63B3ED)"
                  color="#1A202C"
                  fontWeight="700"
                  _hover={{
                    bgGradient:
                      "linear(to-r, #FFFFFF, #4299E1)"
                  }}
                >
                  SEND
                </Button>
              </Flex>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
