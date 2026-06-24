"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  VStack,
  HStack,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  Checkbox,
  FormControl,
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
      background="linear-gradient(135deg, #0a1530 0%, #0d2b5c 50%, #1a4a8c 100%)"
      py={{ base: 20, md: 20 }}
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        right: "-200px",
        top: "-200px",
        w: "600px",
        h: "600px",
        borderRadius: "full",
        background: "radial-gradient(circle, rgba(33, 150, 243, 0.3), transparent 70%)",
        filter: "blur(40px)",
        pointerEvents: "none",
      }}
    >
      <Container maxW="1180px" px={{ base: 6, md: 6 }} mx="auto" position="relative" zIndex={1}>
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={{ base: 8, md: 12 }}
        >
          {/* Left Side */}
          <VStack align={{ base: "center", md: "flex-start" }} spacing={8}>
            <VStack align={{ base: "center", md: "flex-start" }} spacing={4} textAlign={{ base: "center", md: "left" }}>
              <Heading as="h2" size={{ base: "lg", md: "2xl" }}>
                Let's Work<br />
                Together
              </Heading>
              <Text fontSize={{ base: "sm", md: "md" }} color="rgba(207, 213, 227, 1)">
                Get in touch with us for any inquiries about our services or to discuss your next project.
              </Text>
            </VStack>

            {/* Map */}
            <Box
              w="full"
              h="200px"
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
            bg="rgba(255, 255, 255, 0.06)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            borderRadius="18px"
            p={8}
          >
            <VStack as="form" onSubmit={handleSubmit} spacing={4}>
              <Heading as="h3" size="lg" fontWeight="700" fontSize="22px">
                Get In Touch
              </Heading>
              <Text fontSize="xs" color="rgba(207, 213, 227, 1)">
                Send us a message and we'll respond as soon as possible.
              </Text>

              {/* Form Fields */}
              <FormControl>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  bg="rgba(0, 0, 0, 0.25)"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  borderRadius="10px"
                  color="#fff"
                  fontSize="sm"
                  py={3}
                  px={4}
                  _placeholder={{ color: "rgba(139, 147, 167, 1)" }}
                  _focus={{
                    outline: "none",
                    borderColor: "var(--primary)",
                    boxShadow: "0 0 0 1px var(--primary)",
                  }}
                  required
                />
              </FormControl>

              <FormControl>
                <Textarea
                  name="message"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  bg="rgba(0, 0, 0, 0.25)"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  borderRadius="10px"
                  color="#fff"
                  fontSize="sm"
                  py={3}
                  px={4}
                  minH="120px"
                  resize="vertical"
                  _placeholder={{ color: "rgba(139, 147, 167, 1)" }}
                  _focus={{
                    outline: "none",
                    borderColor: "var(--primary)",
                    boxShadow: "0 0 0 1px var(--primary)",
                  }}
                  required
                />
              </FormControl>

              {/* Footer */}
              <HStack justify="space-between" align="center" w="full">
                <Checkbox
                  name="consent"
                  isChecked={formData.consent}
                  onChange={handleChange}
                  colorScheme="blue"
                  size="sm"
                >
                  <Text fontSize="xs" color="rgba(207, 213, 227, 1)">
                    I agree to the terms
                  </Text>
                </Checkbox>
                <Button
                  type="submit"
                  px={7.5}
                  py={2.5}
                  borderRadius="50px"
                  bg="#fff"
                  color="#05060a"
                  fontWeight="600"
                  fontSize="sm"
                  _hover={{ bg: "rgba(255, 255, 255, 0.9)" }}
                >
                  Send
                </Button>
              </HStack>
            </VStack>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
