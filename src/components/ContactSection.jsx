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
      bg="#05060a"
      py={{ base: 20, md: 20 }}
      position="relative"
      overflow="hidden"
    >
      {/* Water flow animation styles */}
      <style>{`
        @keyframes blobFlow1 {
          0%   { transform: translate(0%,   0%)   scale(1)    rotate(0deg);   border-radius: 62% 38% 68% 32% / 52% 58% 42% 68%; opacity: 0.9; }
          15%  { transform: translate(5%,  -8%)   scale(1.07) rotate(10deg);  border-radius: 38% 62% 32% 68% / 68% 38% 62% 32%; opacity: 1;   }
          30%  { transform: translate(9%,   3%)   scale(1.03) rotate(-5deg);  border-radius: 72% 28% 55% 45% / 35% 72% 45% 55%; opacity: 0.88;}
          45%  { transform: translate(3%,  12%)   scale(0.96) rotate(-14deg); border-radius: 45% 55% 72% 28% / 58% 42% 28% 72%; opacity: 1;   }
          60%  { transform: translate(-7%,  7%)   scale(1.05) rotate(6deg);   border-radius: 58% 42% 42% 58% / 42% 64% 36% 58%; opacity: 0.92;}
          75%  { transform: translate(-5%, -4%)   scale(0.98) rotate(18deg);  border-radius: 35% 65% 62% 38% / 65% 35% 55% 45%; opacity: 1;   }
          90%  { transform: translate(2%,  -9%)   scale(1.04) rotate(-8deg);  border-radius: 68% 32% 48% 52% / 48% 68% 42% 58%; opacity: 0.9; }
          100% { transform: translate(0%,   0%)   scale(1)    rotate(0deg);   border-radius: 62% 38% 68% 32% / 52% 58% 42% 68%; opacity: 0.9; }
        }
        @keyframes blobFlow2 {
          0%   { transform: translate(0%,   0%)   scale(1)    rotate(0deg);   border-radius: 42% 58% 32% 68% / 62% 38% 68% 32%; opacity: 0.85;}
          20%  { transform: translate(-8%,  6%)   scale(1.09) rotate(-18deg); border-radius: 68% 32% 58% 42% / 38% 68% 32% 62%; opacity: 0.95;}
          40%  { transform: translate(-3%, -9%)   scale(0.94) rotate(8deg);   border-radius: 32% 68% 48% 52% / 72% 28% 52% 48%; opacity: 1;   }
          55%  { transform: translate(8%,  -5%)   scale(1.06) rotate(-12deg); border-radius: 58% 42% 68% 32% / 45% 55% 38% 62%; opacity: 0.88;}
          70%  { transform: translate(6%,   8%)   scale(0.97) rotate(15deg);  border-radius: 48% 52% 38% 62% / 62% 42% 68% 38%; opacity: 1;   }
          85%  { transform: translate(-5%,  3%)   scale(1.03) rotate(-6deg);  border-radius: 65% 35% 55% 45% / 32% 68% 45% 55%; opacity: 0.9; }
          100% { transform: translate(0%,   0%)   scale(1)    rotate(0deg);   border-radius: 42% 58% 32% 68% / 62% 38% 68% 32%; opacity: 0.85;}
        }
        @keyframes blobFlow3 {
          0%   { transform: translate(0%,   0%)   scale(1)    rotate(0deg);   border-radius: 55% 45% 62% 38% / 48% 58% 42% 52%; opacity: 0.75;}
          18%  { transform: translate(10%, -5%)   scale(1.08) rotate(22deg);  border-radius: 38% 62% 42% 58% / 68% 32% 58% 42%; opacity: 0.9; }
          35%  { transform: translate(4%,  10%)   scale(0.95) rotate(-12deg); border-radius: 68% 32% 58% 42% / 38% 62% 32% 68%; opacity: 1;   }
          52%  { transform: translate(-9%,  6%)   scale(1.07) rotate(8deg);   border-radius: 42% 58% 35% 65% / 55% 45% 65% 35%; opacity: 0.82;}
          68%  { transform: translate(-6%, -8%)   scale(0.98) rotate(-20deg); border-radius: 62% 38% 68% 32% / 32% 68% 48% 52%; opacity: 0.95;}
          84%  { transform: translate(5%,  -3%)   scale(1.04) rotate(10deg);  border-radius: 35% 65% 52% 48% / 65% 35% 38% 62%; opacity: 0.78;}
          100% { transform: translate(0%,   0%)   scale(1)    rotate(0deg);   border-radius: 55% 45% 62% 38% / 48% 58% 42% 52%; opacity: 0.75;}
        }
        @keyframes ripple {
          0%, 100% { transform: scale(1);   opacity: 0.15; }
          50%       { transform: scale(1.18); opacity: 0.06; }
        }
      `}</style>

      {/* Animated water blobs */}
      <Box
        position="absolute"
        top="-20%"
        right="-10%"
        w={{ base: "500px", md: "720px" }}
        h={{ base: "500px", md: "720px" }}
        bg="radial-gradient(circle at 42% 38%, rgba(0,130,255,0.9) 0%, rgba(0,90,210,0.65) 38%, transparent 68%)"
        style={{ animation: "blobFlow1 7s ease-in-out infinite" }}
        pointerEvents="none"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="-25%"
        right="12%"
        w={{ base: "400px", md: "620px" }}
        h={{ base: "400px", md: "620px" }}
        bg="radial-gradient(circle at 55% 52%, rgba(0,160,255,0.75) 0%, rgba(0,110,225,0.5) 42%, transparent 68%)"
        style={{ animation: "blobFlow2 9s ease-in-out infinite" }}
        pointerEvents="none"
        zIndex={0}
      />
      <Box
        position="absolute"
        top="25%"
        right="-8%"
        w={{ base: "300px", md: "480px" }}
        h={{ base: "300px", md: "480px" }}
        bg="radial-gradient(circle at 50% 48%, rgba(40,190,255,0.6) 0%, rgba(0,110,210,0.35) 48%, transparent 68%)"
        style={{ animation: "blobFlow3 11s ease-in-out infinite" }}
        pointerEvents="none"
        zIndex={0}
      />
      {/* Ripple layer */}
      <Box
        position="absolute"
        top="0%" right="-5%"
        w={{ base: "600px", md: "860px" }}
        h={{ base: "600px", md: "860px" }}
        borderRadius="full"
        border="60px solid rgba(0,130,255,0.12)"
        style={{ animation: "ripple 5s ease-in-out infinite" }}
        pointerEvents="none"
        zIndex={0}
      />

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
