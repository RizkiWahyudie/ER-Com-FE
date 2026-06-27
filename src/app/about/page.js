"use client";

import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Grid,
  GridItem,
  Flex,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { FaUsers, FaGlobeAsia, FaBullseye, FaCompass } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const features = [
  {
    icon: FaUsers,
    title: "Trusted Expertise",
    desc: "With decades of industry experience, we deliver communication strategies built on insight, credibility, and proven results.",
  },
  {
    icon: FaGlobeAsia,
    title: "Reputation First",
    desc: "We help organizations build, strengthen, and protect their reputation through strategic communication initiatives.",
  },
  {
    icon: FaBullseye,
    title: "Client-Centric Approach",
    desc: "Every solution is tailored to align with our clients' objectives, challenges, and long-term business goals.",
  },
  {
    icon: FaCompass,
    title: "Meaningful Engagement",
    desc: "We create impactful connections between brands, stakeholders, media, and communities.",
  },
];

const timelineItems = [
  {
    year: "1970",
    title: "Announcement",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis vivamus at mattis bibendum congue cras id interdum. Risus leo et.",
  },
  {
    year: "2016",
    title: "Announcement",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis vivamus at mattis bibendum congue cras id interdum. Risus leo et.",
  },
  {
    year: "2018",
    title: "Announcement",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis vivamus at mattis bibendum congue cras id interdum. Risus leo et.",
  },
  {
    year: "2026",
    title: "Announcement",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis vivamus at mattis bibendum congue cras id interdum. Risus leo et.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* ── Hero Section ── */}
      <Box
        position="relative"
        w="full"
        minH="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        backgroundImage="url('/assets/hero/hero-bg.png')"
        backgroundSize="cover"
        backgroundPosition="center"
      >
        {/* Gradient overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          background="linear-gradient(180deg, rgba(5,6,10,0.3) 0%, rgba(5,6,10,0.2) 40%, rgba(5,6,10,0.75) 75%, rgba(5,6,10,0.98) 100%)"
          zIndex={0}
        />

        {/* Heading */}
        <Container
          maxW="7xl"
          w="full"
          position="relative"
          zIndex={1}
          px={{ base: 6, md: 8 }}
          pt={{ base: "160px", md: "220px" }}
        >
          <VStack spacing={{ base: 5, md: 8 }} align="center" textAlign="center" w="full">
            <Heading
              as="h1"
              fontSize={{ base: "52px", md: "72px", xl: "90px" }}
              color="#fff"
              fontWeight="700"
              lineHeight="1.05"
              letterSpacing="-1.5px"
              fontFamily="Plus Jakarta Sans"
            >
              Know Us{" "}
              <Text as="span" color="var(--accent)">
                More.
              </Text>
              <br />
              Get Closer.
            </Heading>

            <Text
              fontSize={{ base: "15px", md: "17px", xl: "19px" }}
              color="#ffffff"
              maxW="2xl"
              lineHeight="1.6"
              opacity={0.85}
            >
              We help businesses communicate with confidence through strategic PR and
              communication solutions. ER Communication partners with brands to
              strengthen reputation and drive meaningful impact.
            </Text>
          </VStack>
        </Container>

        {/* Stats — match HeroSection exactly */}
        <HStack
          spacing={{ base: 8, md: 20 }}
          justify="space-evenly"
          w="full"
          position="relative"
          zIndex={1}
          pb={{ base: 4, md: 8 }}
        >
          <VStack spacing={1.5}>
            <Text
              fontSize={{ base: "13px", md: "15px", lg: "24px" }}
              fontWeight="600"
              color="var(--accent)"
              textTransform="uppercase"
            >
              Clients
            </Text>
            <Text
              fontSize={{ base: "42px", md: "48px", lg: "52px" }}
              fontWeight="700"
              color="#fff"
              fontFamily="Plus Jakarta Sans"
            >
              500+
            </Text>
          </VStack>

          <Box w="1px" h="120px" bg="rgba(255, 255, 255, 0.15)" />

          <VStack spacing={1.5}>
            <Text
              fontSize={{ base: "13px", md: "15px", lg: "24px" }}
              fontWeight="600"
              color="var(--accent)"
              textTransform="uppercase"
            >
              Achievements
            </Text>
            <Text
              fontSize={{ base: "42px", md: "48px", lg: "52px" }}
              fontWeight="700"
              color="#fff"
              fontFamily="Plus Jakarta Sans"
            >
              57+
            </Text>
          </VStack>
        </HStack>
      </Box>

      {/* ── About ER Communications ── */}
      <Box py={{ base: 20, md: 28 }} background="linear-gradient(180deg, #05060A 0%, #05060A 100%)">
        <Container maxW="4xl" px={{ base: 6, md: 8 }} textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: "32px", md: "44px", lg: "52px" }}
            color="#fff"
            fontWeight="700"
            fontFamily="Plus Jakarta Sans"
            mb={8}
          >
            About ER Communications
          </Heading>
          <Text
            fontSize={{ base: "15px", md: "16px" }}
            color="rgba(255,255,255,0.65)"
            lineHeight="1.8"
            maxW="700px"
            mx="auto"
          >
            ER Communication (Effective &amp; Responsibility) is one of Indonesia&apos;s pioneer PR
            agencies with over 57 years of experience. ER Communication is a communications
            consultancy specializing in corporate communications, crisis and issues management and
            marketing communications. It provides strategic counseling on top of services you would
            expect from a Communication agency.
          </Text>
        </Container>
      </Box>

      {/* ── What Drives Section ── */}
      <Box
        py={{ base: 16, md: 24 }}
        background="linear-gradient(180deg, #05060A 0%, #0B1525 100%)"
      >
        <Container maxW="7xl" px={{ base: 6, md: 8 }}>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            gap={{ base: 4, md: 12 }}
            mb={{ base: 12, md: 16 }}
          >
            <Heading
              as="h2"
              fontSize={{ base: "28px", md: "38px", lg: "46px" }}
              color="#fff"
              fontWeight="700"
              fontFamily="Plus Jakarta Sans"
              maxW={{ md: "480px" }}
              lineHeight="1.15"
            >
              What drives ER Communications?
            </Heading>
            <Text
              fontSize={{ base: "14px", md: "15px" }}
              color="rgba(255,255,255,0.6)"
              maxW={{ md: "300px" }}
              lineHeight="1.7"
            >
              Becoming a pioneer PR Agency national &amp; international. Offering tailored solutions
              that align with each client&apos;s business objectives.
            </Text>
          </Flex>

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={5}>
            {features.map((feature, idx) => (
              <GridItem key={idx}>
                <Box
                  bg="rgba(255,255,255,0.06)"
                  border="1px solid rgba(255,255,255,0.07)"
                  borderRadius="20px"
                  p={{ base: 6, md: 8 }}
                  h="full"
                  _hover={{ bg: "rgba(255,255,255,0.09)" }}
                  transition="background 0.2s"
                >
                  <HStack align="flex-start" spacing={5}>
                    <Flex
                      w="58px"
                      h="58px"
                      borderRadius="full"
                      bg="#2563EB"
                      align="center"
                      justify="center"
                      flexShrink={0}
                    >
                      <Icon as={feature.icon} color="#fff" w={6} h={6} />
                    </Flex>
                    <VStack align="flex-start" spacing={2}>
                      <Text fontSize={{ base: "15px", md: "17px" }} fontWeight="700" color="#fff">
                        {feature.title}
                      </Text>
                      <Text
                        fontSize={{ base: "13px", md: "14px" }}
                        color="rgba(255,255,255,0.55)"
                        lineHeight="1.7"
                      >
                        {feature.desc}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Timeline Section ── */}
      <Box
        py={{ base: 20, md: 32 }}
        position="relative"
        overflow="hidden"
        bg="#080C14"
        _before={{
          content: '""',
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background:
            "radial-gradient(ellipse at 5% 40%, rgba(29, 78, 216, 0.45) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 85% 75%, rgba(194, 65, 12, 0.55) 0%, transparent 45%)",
          zIndex: 0,
        }}
      >
        <Container maxW="7xl" px={{ base: 6, md: 8 }} position="relative" zIndex={1}>
          <Flex direction={{ base: "column", md: "row" }} gap={{ base: 12, md: 20 }} align="flex-start">
            {/* Left */}
            <Box flexShrink={0} maxW={{ md: "260px" }}>
              <Heading
                as="h2"
                fontSize={{ base: "42px", md: "56px", lg: "64px" }}
                fontWeight="700"
                color="#fff"
                fontFamily="Plus Jakarta Sans"
                lineHeight="1"
                mb={6}
              >
                Timeline
              </Heading>
              <Text fontSize={{ base: "13px", md: "14px" }} color="rgba(255,255,255,0.5)" lineHeight="1.8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis cursus,
                mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
                libero vitae erat.
              </Text>
            </Box>

            {/* Right */}
            <VStack
              flex={1}
              align="stretch"
              spacing={0}
              divider={<Divider borderColor="rgba(255,255,255,0.1)" />}
            >
              {timelineItems.map((item, idx) => (
                <Box key={idx} py={8}>
                  <HStack align="flex-start" spacing={6}>
                    <Box
                      w="14px"
                      h="14px"
                      borderRadius="full"
                      bg="rgba(255,255,255,0.25)"
                      border="2px solid rgba(255,255,255,0.45)"
                      mt="6px"
                      flexShrink={0}
                    />
                    <VStack align="flex-start" spacing={2}>
                      <Text
                        fontSize={{ base: "22px", md: "28px" }}
                        fontWeight="700"
                        color="#fff"
                        fontFamily="Plus Jakarta Sans"
                      >
                        {item.year}
                      </Text>
                      <Text fontSize={{ base: "14px", md: "15px" }} fontWeight="700" color="#fff">
                        {item.title}
                      </Text>
                      <Text
                        fontSize={{ base: "13px", md: "14px" }}
                        color="rgba(255,255,255,0.5)"
                        lineHeight="1.7"
                        maxW="560px"
                      >
                        {item.desc}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Flex>
        </Container>
      </Box>

      <FooterSection />
    </>
  );
}
