"use client";

import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Image,
  Button,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { sanitizeRichText } from "@/lib/api";

const FALLBACK_ABOUT_HEADLINE = "About ER Communications";
const FALLBACK_ABOUT_DESCRIPTION =
  "ER Communication (Effective &amp; Responsibility) is one of " +
  "Indonesia's pioneer PR agencies with over 57 years of experience. " +
  "ER Communication is a communications consultancy specializing in " +
  "corporate communications, crisis and issues management and " +
  "marketing communications. It provides strategic counseling on top " +
  "of services you would expect from a Communication agency.";
const FALLBACK_SERVICES_HEADLINE = "We're the pioneer of the<br>PR otomotive industry";
const FALLBACK_SERVICES_SUBTEXT =
  "Er communication is one of leading agency in Indonesia and we " +
  "specialize in consumer lifestyle.";

export default function HeadlineSection({ about, servicesSettings }) {
  const headingColor = useColorModeValue("#1a202c", "#fff");
  const textColor = useColorModeValue("#4a5568", "#e3e4e6");
  const btnColor = useColorModeValue("#1a202c", "white");
  const btnBorder = useColorModeValue("#1a202c", "white");
  const btnHoverBg = useColorModeValue("#1a202c", "white");
  const btnHoverColor = useColorModeValue("white", "black");

  return (
    <Box w="full" bg="var(--background)" position="relative" id="aboutus">
      <Image
        src="/assets/media/media-shape.svg"
        alt="ER Communication Logo"
        maxW="100%"
        h="auto"
        position="absolute"
        top="40%"
        right={0}
        pt={{ base: 20, md: 48 }}
        visibility={{ base: "hidden", md: "visible" }}
      />
      <Container maxW="7xl" px={{ base: 6, md: 0 }} mx="auto">
        <VStack align={{ base: 'start', md: 'center' }} spacing={4} flex={1} py={{ base: 20, md: 32 }}>
          <Heading
            as="h2"
            fontSize={{ base: "3xl", md: "40px", lg: "60px" }}
            fontWeight="700"
            lineHeight="1.15"
            letterSpacing="-0.5px"
            fontFamily="Plus Jakarta Sans"
            textAlign={{ base: 'start', md: 'center' }}
            color={headingColor}
            dangerouslySetInnerHTML={{ __html: sanitizeRichText(about?.headline) || FALLBACK_ABOUT_HEADLINE }}
          />
          <Text
            fontSize={{ base: "sm", md: "16px", lg: "18px" }}
            color={textColor}
            maxW="6xl"
            lineHeight="1.6"
            textAlign={{ base: 'start', md: 'center' }}
            dangerouslySetInnerHTML={{ __html: sanitizeRichText(about?.description) || FALLBACK_ABOUT_DESCRIPTION }}
          />
          <Link href="/about">
            <Button
              size="sm"
              px={{ base: 4, md: 6 }}
              py={{ base: 1.5, md: 6 }}
              borderRadius="50px"
              bg="transparent"
              color={btnColor}
              border={`2px solid ${btnBorder}`}
              fontSize={{ base: "xs", md: "md" }}
              fontWeight="500"
              _hover={{ bg: btnHoverBg, color: btnHoverColor }}
            >
              <HStack spacing={2}>
                <Text>View All</Text>
                <FaArrowRight size={14} />
              </HStack>
            </Button>
          </Link>
        </VStack>
        <VStack align="flex-start" spacing={4} flex={1}>
          <Heading
            as="h2"
            fontSize={{ base: "3xl", md: "40px", lg: "60px" }}
            fontWeight="700"
            lineHeight="1.15"
            letterSpacing="-0.5px"
            fontFamily="Plus Jakarta Sans"
            color={headingColor}
            dangerouslySetInnerHTML={{ __html: sanitizeRichText(servicesSettings?.headline) || FALLBACK_SERVICES_HEADLINE }}
          />
          <Text
            fontSize={{ base: "sm", md: "16px", lg: "18px" }}
            color={textColor}
            maxW="480px"
            lineHeight="1.6"
            dangerouslySetInnerHTML={{ __html: sanitizeRichText(servicesSettings?.subtext) || FALLBACK_SERVICES_SUBTEXT }}
          />
          <Link href="/services">
            <Button
              size="sm"
              px={{ base: 4, md: 6 }}
              py={{ base: 1.5, md: 6 }}
              borderRadius="50px"
              bg="transparent"
              color={btnColor}
              border={`2px solid ${btnBorder}`}
              fontSize={{ base: "xs", md: "md" }}
              fontWeight="500"
              _hover={{ bg: btnHoverBg, color: btnHoverColor }}
            >
              <HStack spacing={2}>
                <Text>View All</Text>
                <FaArrowRight size={14} />
              </HStack>
            </Button>
          </Link>
        </VStack>
      </Container>
    </Box>
  );
}
