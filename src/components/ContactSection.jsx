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
      {/* Abstract blob animation styles */}
      <style>{`
        @keyframes ab1 {
          0%   { transform: translate(0%,0%)     scale(1)    ; border-radius: 60% 40% 72% 28% / 55% 65% 35% 70%; opacity: 0.85; }
          20%  { transform: translate(8%, -10%)  scale(1.08) ; border-radius: 40% 60% 35% 65% / 70% 38% 62% 30%; opacity: 1;    }
          40%  { transform: translate(18%, 5%)   scale(1.04) ; border-radius: 75% 25% 55% 45% / 32% 75% 42% 58%; opacity: 0.9;  }
          60%  { transform: translate(10%, 14%)  scale(0.95) ; border-radius: 48% 52% 70% 30% / 62% 42% 30% 70%; opacity: 1;    }
          80%  { transform: translate(-4%, 8%)   scale(1.06) ; border-radius: 35% 65% 42% 58% / 55% 30% 70% 38%; opacity: 0.88; }
          100% { transform: translate(0%,0%)     scale(1)    ; border-radius: 60% 40% 72% 28% / 55% 65% 35% 70%; opacity: 0.85; }
        }
        @keyframes ab2 {
          0%   { transform: translate(0%,0%)     scale(1)    ; border-radius: 42% 58% 30% 70% / 65% 38% 62% 35%; opacity: 0.8;  }
          25%  { transform: translate(-12%, 6%)  scale(1.1)  ; border-radius: 70% 30% 62% 38% / 35% 70% 28% 65%; opacity: 0.95; }
          50%  { transform: translate(-6%, -12%) scale(0.93) ; border-radius: 30% 70% 50% 50% / 72% 28% 55% 48%; opacity: 1;    }
          75%  { transform: translate(10%, -6%)  scale(1.07) ; border-radius: 55% 45% 72% 28% / 42% 60% 38% 62%; opacity: 0.85; }
          100% { transform: translate(0%,0%)     scale(1)    ; border-radius: 42% 58% 30% 70% / 65% 38% 62% 35%; opacity: 0.8;  }
        }
        @keyframes ab3 {
          0%   { transform: translate(0%,0%)     scale(1)    ; border-radius: 65% 35% 58% 42% / 48% 62% 38% 55%; opacity: 0.7;  }
          30%  { transform: translate(-8%, -8%)  scale(1.12) ; border-radius: 38% 62% 42% 58% / 68% 32% 60% 40%; opacity: 0.9;  }
          55%  { transform: translate(12%, -4%)  scale(0.96) ; border-radius: 68% 32% 65% 35% / 38% 68% 30% 62%; opacity: 1;    }
          80%  { transform: translate(5%, 12%)   scale(1.05) ; border-radius: 52% 48% 35% 65% / 60% 42% 65% 32%; opacity: 0.78; }
          100% { transform: translate(0%,0%)     scale(1)    ; border-radius: 65% 35% 58% 42% / 48% 62% 38% 55%; opacity: 0.7;  }
        }
        @keyframes ab4 {
          0%   { transform: translate(0%,0%)     scale(1)    ; border-radius: 55% 45% 65% 35% / 60% 52% 45% 62%; opacity: 0.75; }
          20%  { transform: translate(6%, 10%)   scale(1.09) ; border-radius: 35% 65% 48% 52% / 38% 68% 32% 58%; opacity: 0.88; }
          45%  { transform: translate(-10%, 4%)  scale(0.94) ; border-radius: 68% 32% 38% 62% / 55% 35% 68% 42%; opacity: 1;    }
          70%  { transform: translate(-5%, -10%) scale(1.06) ; border-radius: 42% 58% 68% 32% / 62% 48% 38% 68%; opacity: 0.82; }
          100% { transform: translate(0%,0%)     scale(1)    ; border-radius: 55% 45% 65% 35% / 60% 52% 45% 62%; opacity: 0.75; }
        }
        @keyframes ab5 {
          0%   { transform: translate(0%,0%)     scale(1)    ; border-radius: 48% 52% 62% 38% / 38% 58% 42% 65%; opacity: 0.65; }
          35%  { transform: translate(14%, -8%)  scale(1.11) ; border-radius: 65% 35% 38% 62% / 62% 38% 68% 35%; opacity: 0.85; }
          65%  { transform: translate(-6%, 12%)  scale(0.92) ; border-radius: 38% 62% 68% 32% / 42% 65% 32% 68%; opacity: 0.95; }
          100% { transform: translate(0%,0%)     scale(1)    ; border-radius: 48% 52% 62% 38% / 38% 58% 42% 65%; opacity: 0.65; }
        }
        @keyframes abOrange1 {
          0%   { transform: translate(0%,0%)     scale(1)    ; border-radius: 58% 42% 68% 32% / 52% 65% 38% 60%; opacity: 0.5;  }
          30%  { transform: translate(-8%, 10%)  scale(1.08) ; border-radius: 32% 68% 45% 55% / 68% 35% 62% 42%; opacity: 0.65; }
          60%  { transform: translate(10%, -5%)  scale(0.95) ; border-radius: 65% 35% 55% 45% / 40% 62% 35% 68%; opacity: 0.55; }
          100% { transform: translate(0%,0%)     scale(1)    ; border-radius: 58% 42% 68% 32% / 52% 65% 38% 60%; opacity: 0.5;  }
        }
        @keyframes abOrange2 {
          0%   { transform: translate(0%,0%)     scale(1)    ; border-radius: 45% 55% 38% 62% / 62% 42% 58% 38%; opacity: 0.4;  }
          40%  { transform: translate(8%, -12%)  scale(1.1)  ; border-radius: 68% 32% 58% 42% / 38% 65% 35% 62%; opacity: 0.6;  }
          70%  { transform: translate(-12%, -4%) scale(0.96) ; border-radius: 38% 62% 65% 35% / 58% 38% 68% 32%; opacity: 0.5;  }
          100% { transform: translate(0%,0%)     scale(1)    ; border-radius: 45% 55% 38% 62% / 62% 42% 58% 38%; opacity: 0.4;  }
        }
      `}</style>

      {/* ── Blue blobs (dominant — full coverage) ── */}
      {/* Top-right large */}
      <Box position="absolute" top="-25%" right="-8%"
        w={{ base: "560px", md: "800px" }} h={{ base: "560px", md: "800px" }}
        bg="radial-gradient(circle at 40% 40%, rgba(0,120,255,0.88) 0%, rgba(0,80,210,0.55) 40%, transparent 68%)"
        style={{ animation: "ab1 7s ease-in-out infinite" }}
        pointerEvents="none" zIndex={0}
      />
      {/* Bottom-left large */}
      <Box position="absolute" bottom="-30%" left="-10%"
        w={{ base: "500px", md: "740px" }} h={{ base: "500px", md: "740px" }}
        bg="radial-gradient(circle at 55% 55%, rgba(0,150,255,0.8) 0%, rgba(0,100,230,0.5) 42%, transparent 68%)"
        style={{ animation: "ab2 9s ease-in-out infinite" }}
        pointerEvents="none" zIndex={0}
      />
      {/* Center */}
      <Box position="absolute" top="20%" left="30%"
        w={{ base: "380px", md: "580px" }} h={{ base: "380px", md: "580px" }}
        bg="radial-gradient(circle at 50% 48%, rgba(30,140,255,0.55) 0%, rgba(0,90,200,0.3) 48%, transparent 70%)"
        style={{ animation: "ab3 11s ease-in-out infinite" }}
        pointerEvents="none" zIndex={0}
      />
      {/* Top-left medium */}
      <Box position="absolute" top="-10%" left="-5%"
        w={{ base: "340px", md: "520px" }} h={{ base: "340px", md: "520px" }}
        bg="radial-gradient(circle at 45% 42%, rgba(0,100,240,0.65) 0%, rgba(0,70,190,0.38) 45%, transparent 68%)"
        style={{ animation: "ab4 8s ease-in-out infinite" }}
        pointerEvents="none" zIndex={0}
      />
      {/* Bottom-right medium */}
      <Box position="absolute" bottom="-15%" right="10%"
        w={{ base: "300px", md: "460px" }} h={{ base: "300px", md: "460px" }}
        bg="radial-gradient(circle at 52% 50%, rgba(50,170,255,0.6) 0%, rgba(0,110,220,0.35) 50%, transparent 70%)"
        style={{ animation: "ab5 6s ease-in-out infinite" }}
        pointerEvents="none" zIndex={0}
      />

      {/* ── Orange blobs (accent — subtle) ── */}
      {/* Bottom-center orange */}
      <Box position="absolute" bottom="-20%" left="35%"
        w={{ base: "320px", md: "480px" }} h={{ base: "320px", md: "480px" }}
        bg="radial-gradient(circle at 50% 55%, rgba(234,88,12,0.52) 0%, rgba(194,65,12,0.28) 45%, transparent 68%)"
        style={{ animation: "abOrange1 10s ease-in-out infinite" }}
        pointerEvents="none" zIndex={0}
      />
      {/* Top-center orange */}
      <Box position="absolute" top="-5%" left="40%"
        w={{ base: "260px", md: "400px" }} h={{ base: "260px", md: "400px" }}
        bg="radial-gradient(circle at 48% 45%, rgba(251,115,0,0.42) 0%, rgba(180,60,10,0.22) 48%, transparent 70%)"
        style={{ animation: "abOrange2 13s ease-in-out infinite" }}
        pointerEvents="none" zIndex={0}
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
