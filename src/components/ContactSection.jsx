"use client";

import { useEffect, useState } from "react";
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
  HStack,
  useToast
} from "@chakra-ui/react";
import { apiPost, getContactInfo } from "@/lib/api";

const INITIAL_FORM_DATA = {
  name: "",
  business_name: "",
  email: "",
  contact_number: "",
  message: "",
};

const FALLBACK_MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.8159147128544!2d106.80665931531557!3d-6.163726395427357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34ef7%3A0x146bb1fbf7c03c87!2sJakarta!5e0!3m2!1sid!2sid!4v1234567890";

export default function ContactSection() {
  const toast = useToast();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mapEmbedUrl, setMapEmbedUrl] = useState(FALLBACK_MAP_EMBED_URL);

  useEffect(() => {
    getContactInfo().then((contacts) => {
      if (contacts && contacts.length > 0 && contacts[0].mapEmbedUrl) {
        setMapEmbedUrl(contacts[0].mapEmbedUrl);
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await apiPost("/contact-messages", formData);
      toast({
        title: "Berhasil Dikirim!",
        description: "Kami akan segera menghubungi Anda.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-center",
      });
      setFormData(INITIAL_FORM_DATA);
    } catch (err) {
      toast({
        title: "Gagal Mengirim",
        description: err.message ?? "Terjadi kesalahan, silakan coba lagi.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      w="full"
      bg="#05060a"
      py={{ base: 20, md: 20 }}
      position="relative"
      overflow="hidden"
      id="contact"
      sx={{
        "@keyframes blobMove1": {
          "0%": {
            transform: "translate(0%, 0%) scale(1) rotate(0deg)",
          },
          "25%": {
            transform: "translate(3%, -2%) scale(1.01) rotate(1deg)",
          },
          "50%": {
            transform: "translate(-2%, 3%) scale(1.02) rotate(-1deg)",
          },
          "75%": {
            transform: "translate(-3%, -2%) scale(1.01) rotate(1.5deg)",
          },
          "100%": {
            transform: "translate(0%, 0%) scale(1) rotate(0deg)",
          },
        },
        "@keyframes blobMove2": {
          "0%": {
            transform: "translate(0%, 0%) scale(1.01) rotate(0deg)",
          },
          "33%": {
            transform: "translate(-4%, 3%) scale(1.02) rotate(-1.5deg)",
          },
          "66%": {
            transform: "translate(3%, -3%) scale(1.01) rotate(2deg)",
          },
          "100%": {
            transform: "translate(0%, 0%) scale(1.01) rotate(0deg)",
          },
        },
      }}
    >
      {/* Animated blob layer 1 — primary */}
      <Box
        position="absolute"
        top="-5%"
        left="-5%"
        w="110%"
        h="110%"
        bgImage="url('/assets/contact/contact-bg-2.png')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        opacity={0.85}
        animation="blobMove1 18s ease-in-out infinite"
        willChange="transform"
        pointerEvents="none"
      />
      {/* Animated blob layer 2 — secondary for depth */}
      <Box
        position="absolute"
        top="-4%"
        left="-4%"
        w="108%"
        h="108%"
        bgImage="url('/assets/contact/contact-bg.png')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        opacity={0.35}
        animation="blobMove2 24s ease-in-out infinite"
        willChange="transform"
        filter="blur(30px)"
        pointerEvents="none"
      />
      <Container maxW="7xl" px={{ base: 6, md: 6 }} mx="auto" position="relative" zIndex={1}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          gap={{ base: 8, md: 12, xl: 24 }}
          w="full"
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
                style={{ border: "none" }}
                src={mapEmbedUrl}
                title="Location"
              />
            </Box>
          </VStack>

          {/* Right Side - Form */}
          <Box
            position="relative"
            w="full"
            overflow="hidden"
            flex={0.8}
            bg="rgba(128, 128, 128, 0.2)"
            backdropFilter="blur(40px)"
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
                  fontSize={{ base: "sm", lg: "lg" }}
                >
                  We're available 24 / 7
                </Text>
              </VStack>

              {/* Name */}
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                isRequired
                placeholder="Your Name"
                h="46px"
                px={5}
                borderRadius="999px"
                bg="rgba(128, 128, 128, 0.2)"
                backdropFilter="blur(20px)"
                // WebkitBackdropFilter="blur(20px)"
                border="0.5px solid rgba(255,255,255,0.15)"
                color="white"
                fontSize={{ base: "sm", lg: "md" }}
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
              
              {/* Business */}
              <Input
                name="business_name"
                value={formData.business_name}
                onChange={handleChange}
                placeholder="Your Business Name"
                h="46px"
                px={5}
                borderRadius="999px"
                bg="rgba(128, 128, 128, 0.2)"
                backdropFilter="blur(20px)"
                // WebkitBackdropFilter="blur(20px)"
                border="0.5px solid rgba(255,255,255,0.15)"
                color="white"
                fontSize={{ base: "sm", lg: "md" }}
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
              
              {/* Email */}
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                isRequired
                placeholder="Your Email"
                h="46px"
                px={5}
                borderRadius="999px"
                bg="rgba(128, 128, 128, 0.2)"
                backdropFilter="blur(20px)"
                // WebkitBackdropFilter="blur(20px)"
                border="0.5px solid rgba(255,255,255,0.15)"
                color="white"
                fontSize={{ base: "sm", lg: "md" }}
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
                name="contact_number"
                type="tel"
                value={formData.contact_number}
                onChange={handleChange}
                placeholder="Your Contact Number"
                h="46px"
                px={5}
                borderRadius="999px"
                bg="rgba(128, 128, 128, 0.2)"
                backdropFilter="blur(20px)"
                // WebkitBackdropFilter="blur(20px)"
                border="0.5px solid rgba(255,255,255,0.15)"
                color="white"
                fontSize={{ base: "sm", lg: "md" }}
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
                name="message"
                value={formData.message}
                onChange={handleChange}
                isRequired
                placeholder="How can we help?"
                minH="140px"
                px={5}
                borderRadius="20px"
                bg="rgba(128, 128, 128, 0.2)"
                backdropFilter="blur(20px)"
                // WebkitBackdropFilter="blur(20px)"
                border="0.5px solid rgba(255,255,255,0.15)"
                color="white"
                fontSize={{ base: "sm", lg: "md" }}
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
                justify="right"
                align="center"
                pt={2}
              >
                {/* <Button
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
                </Button> */}

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="SENDING"
                  borderRadius="999px"
                  px={8}
                  bgGradient="linear(to-r, #F8F8F8, #63B3ED)"
                  color="#1A202C"
                  fontWeight="700"
                  fontSize={{ base: "sm", lg: "lg" }}
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
