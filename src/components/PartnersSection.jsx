"use client";

import { Box, Container, Grid, Heading, Text, VStack, Icon, HStack, Image, Button, useColorModeValue } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FaArrowRight } from "react-icons/fa";
import { useMemo } from "react";
import Link from "next/link";

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

// Scroll ke atas infinite
const scrollUp = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
`;

function LogoColumn({ logos, duration, reverse = false }) {
  // duplicate logos supaya loop mulus (translateY -50% pas balik ke awal)
  const doubled = [...logos, ...logos];

  return (
    <Box
      position="relative"
      overflow="hidden"
      h={{ base: "420px", md: "560px" }}
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        h: "80px",
        bg: "linear-gradient(to bottom, var(--background), transparent)",
        zIndex: 2,
        pointerEvents: "none",
      }}
      _after={{
        content: '""',
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        h: "80px",
        bg: "linear-gradient(to top, var(--background), transparent)",
        zIndex: 2,
        pointerEvents: "none",
      }}
      sx={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      <VStack
        spacing={3.5}
        animation={`${scrollUp} ${duration}s linear infinite`}
        sx={{
          animationDirection: reverse ? "reverse" : "normal",
          "&:hover": {
            animationPlayState: "paused",
          },
        }}
      >
        {doubled.map((partner, idx) => (
          <Box
            key={idx}
            w="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            py={2}
          >
            <Image src={partner} alt={`Partner Logo ${idx + 1}`} />
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default function PartnersSection() {
  const half = Math.ceil(partners.length / 2);
  const colA = useMemo(() => partners.slice(0, half), [half]);
  const colB = useMemo(() => partners.slice(half), [half]);

  const headingColor = useColorModeValue("#1a202c", "#fff");
  const textColor = useColorModeValue("#718096", "#bab9c4");
  const statColor = useColorModeValue("#1a202c", "#ffffff");
  const btnColor = useColorModeValue("#025BCF", "white");
  const btnBorder = useColorModeValue("#025BCF", "white");
  const btnHoverBg = useColorModeValue("#025BCF", "white");
  const btnHoverColor = useColorModeValue("white", "black");

  return (
    <Box
      w="full"
      bg="var(--background)"
      backgroundImage="radial-gradient(ellipse 900px 500px at 10% 40%, rgba(33, 150, 243, 0.18), transparent 65%)"
      py={{ base: 20, md: 20 }}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="7xl" px={{ base: 6, md: 6 }} mx="auto">
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1.2fr" }}
          gap={{ base: 12, md: 15 }}
          alignItems="center"
        >
          {/* Left Content */}
          <VStack align="flex-start" spacing={6} w={{ base: "full", md: "80%" }}>
            <Heading
              fontSize={{ base: "2xl", md: "5xl" }}
              fontWeight="500"
              lineHeight="1.15"
              fontFamily="Plus Jakarta Sans"
              color={headingColor}
            >
              Partnering with Brands that Lead with Impact.
            </Heading>
            <Text fontSize={{ base: "sm", md: "lg" }} color={textColor} lineHeight="1.6">
              Companies are leveraging our platform to bring transparency to their work.
            </Text>
            <Link href="/clients">
              <Button
                size="sm"
                px={{ base: 4, md: 6 }}
                py={{ base: 1.5, md: 6 }}
                borderRadius="50px"
                bg="transparent"
                color={btnColor}
                border={`1px solid ${btnBorder}`}
                mb={{ base: 2, md: 6 }}
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
            <Box>
              <HStack spacing={3} align="center">
                <Icon
                  as={FaArrowRight}
                  color="#00EB8D"
                  fontSize={{ base: "md", md: "3xl" }}
                  rounded="full"
                  transform="rotate(-45deg)"
                />
                <Text fontSize={{ base: "sm", md: "3xl" }} color={statColor} fontWeight="600">
                  65% attendance rate
                </Text>
              </HStack>
              <Text fontSize={{ base: "xs", md: "sm" }} color="#bab9c4">
                avg attendance for our clients
              </Text>
            </Box>
          </VStack>

          {/* Logo Columns - auto scroll up */}
          <Grid
            templateColumns="1fr 1fr"
            gap={3.5}
            w={{ base: "full", xl: "70%" }}
            justifySelf="end"
          >
            <LogoColumn logos={colA} duration={22} />
            <LogoColumn logos={colB} duration={26} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}