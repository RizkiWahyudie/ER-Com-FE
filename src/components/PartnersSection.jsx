"use client";

import { Box, Container, Grid, Heading, Text, VStack, Icon, HStack, Image } from "@chakra-ui/react";
import {FaArrowRight} from "react-icons/fa";

const partners = [
  "/assets/partner/partner-logo-1.png",
  "/assets/partner/partner-logo-2.png",
  "/assets/partner/partner-logo-3.png",
  "/assets/partner/partner-logo-4.png",
  "/assets/partner/partner-logo-5.png",
  "/assets/partner/partner-logo-6.png",
  "/assets/partner/partner-logo-7.png",
  "/assets/partner/partner-logo-8.png",
  "/assets/partner/partner-logo-9.png",
  "/assets/partner/partner-logo-10.png",
  "/assets/partner/partner-logo-11.png",
  "/assets/partner/partner-logo-12.png",
];

export default function PartnersSection() {
  return (
    <Box w="full" bg="var(--background)" py={{ base: 20, md: 20 }}>
      <Container maxW="7xl" px={{ base: 6, md: 6 }} mx="auto">
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1.2fr" }}
          gap={{ base: 12, md: 15 }}
          alignItems="center"
        >
          {/* Left Content */}
          <VStack align="flex-start" spacing={6} w={{  base: "full", md: "80%" }}>
            <Heading 
              fontSize={{ base: "2xl", md: "5xl" }}
              fontWeight="500"
              lineHeight="1.15"
              fontFamily="Plus Jakarta Sans"
              color="#fff"
            >
              Partnering with<br />
              Brands that Lead<br />
              with Impact.
            </Heading>
            <Text fontSize={{ base: "sm", md: "lg" }} color="#bab9c4" lineHeight="1.6">
              Companies are leveraging our platform to bring transparency to their work.
            </Text>
            <Box>
              <HStack spacing={3} align="center">
                <Icon as={FaArrowRight} color="#00EB8D" fontSize={{ base: "md", md: "3xl" }} rounded="full" transform="rotate(-45deg)" />
                <Text fontSize={{ base: "sm", md: "3xl" }} color="#ffffff" fontWeight="600">
                  65% attendance rate
                </Text>
              </HStack>
              <Text fontSize={{ base: "xs", md: "sm" }} color="#bab9c4">
                avg attendance for our clients
              </Text>
            </Box>
          </VStack>

          {/* Logo Grid */}
          <Grid templateColumns="1fr 1fr" gap={3.5} w={{ base: "full", xl: "70%" }} justifySelf="end">
            {partners.map((partner, idx) => (
              <Box
                key={idx}
              >
                <Image src={partner} alt={`Partner Logo ${idx + 1}`} />
              </Box>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
