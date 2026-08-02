"use client";

import { Suspense, useEffect, useState } from "react";
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
  Image,
  useColorModeValue,
  useColorMode
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import TimelineSection from "@/components/TimelineSection";
import PartnersSection from "@/components/PartnersSection";
import ServicesListSection from "@/components/ServicesListSection";
import ContactSection from "@/components/ContactSection";
import {
  getAboutFeatures,
  getAboutMilestones,
  getAboutSection,
  getHeroSection,
  getPartnerLogos,
  getStatsSection,
} from "@/lib/api";

const FALLBACK_ABOUT_SECTION = {
  headline: "About ER Communications",
  description:
    "ER Communication (Effective &amp; Responsibility) is one of Indonesia&apos;s pioneer PR " +
    "agencies with over 57 years of experience. ER Communication is a communications " +
    "consultancy specializing in corporate communications, crisis and issues management and " +
    "marketing communications. It provides strategic counseling on top of services you would " +
    "expect from a Communication agency.",
};

const FALLBACK_HERO = {
  headlineLines: ["Know Us More.", "Get Closer."],
  subheadline:
    "We help businesses communicate with confidence through strategic PR and communication solutions. ER Communication partners with brands to strengthen reputation and drive meaningful impact.",
  backgroundImage: "/assets/bg-about.png",
};

const FEATURE_ICONS = [
  "/assets/about/about-icon-1.svg",
  "/assets/about/about-icon-2.svg",
  "/assets/about/about-icon-3.svg",
  "/assets/about/about-icon-4.svg",
];

const FALLBACK_FEATURES = [
  {
    title: "Creative Experience",
    desc: "With decades of industry experience, we deliver communication strategies built on insight, credibility, and proven results.",
  },
  {
    title: "Impactful Outreach",
    desc: "We help organizations build, strengthen, and protect their reputation through strategic communication initiatives.",
  },
  {
    title: "Client-Centric Approach",
    desc: "Every solution is tailored to align with our clients' objectives, challenges, and long-term business goals.",
  },
  {
    title: "Meaningful Engagement",
    desc: "We create impactful connections between brands, stakeholders, media, and communities.",
  },
];

const FALLBACK_TIMELINE_ITEMS = [
  {
    year: "1970",
    title: "Announcement",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis vivamus at mattis bibendum congue cras id interdum. Risus leo et.",
  },
  {
    year: "2015",
    title: "Announcement",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis vivamus at mattis bibendum congue cras id interdum. Risus leo et.",
  },
  {
    year: "2018",
    title: "Announcement",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis vivamus at mattis bibendum congue cras id interdum. Risus leo et.",
  },
  {
    year: "2020",
    title: "Announcement",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis vivamus at mattis bibendum congue cras id interdum. Risus leo et.",
  },
];

const FALLBACK_FEATURES_WITH_ICONS = FALLBACK_FEATURES.map((feature, idx) => ({
  ...feature,
  icon: FEATURE_ICONS[idx % FEATURE_ICONS.length],
}));

export default function AboutPage() {
  const [features, setFeatures] = useState(FALLBACK_FEATURES_WITH_ICONS);
  const [timelineSettings, setTimelineSettings] = useState(null);
  const [timelineItems, setTimelineItems] = useState(FALLBACK_TIMELINE_ITEMS);
  const [hero, setHero] = useState(FALLBACK_HERO);
  const [stats, setStats] = useState([]);
  const [aboutSection, setAboutSection] = useState(FALLBACK_ABOUT_SECTION);
  const [partnerLogos, setPartnerLogos] = useState([]);

  useEffect(() => {
    getAboutFeatures().then((apiFeatures) => {
      if (apiFeatures.length > 0) {
        setFeatures(
          apiFeatures.map((feature, idx) => ({
            ...feature,
            icon: FEATURE_ICONS[idx % FEATURE_ICONS.length],
          }))
        );
      }
    });

    getAboutMilestones().then(({ settings, items }) => {
      setTimelineSettings(settings);
      if (items.length > 0) setTimelineItems(items);
    });

    getHeroSection("about").then((apiHero) => {
      if (apiHero?.headlineLines?.length > 0) setHero(apiHero);
    });

    getStatsSection().then(setStats);

    getAboutSection().then((apiAboutSection) => {
      if (apiAboutSection?.headline) setAboutSection(apiAboutSection);
    });

    getPartnerLogos().then(setPartnerLogos);
  }, []);

  const particles = [
    { top: "5%", left: "8%", size: "9px", color: "#F97316", opacity: 0.8, duration: "4s", delay: "0s" },
    { top: "10%", left: "25%", size: "7px", color: "#334155", opacity: 0.7, duration: "5s", delay: "0.4s" },
    { top: "8%", left: "60%", size: "8px", color: "#F97316", opacity: 0.6, duration: "4.5s", delay: "0.9s" },
    { top: "15%", left: "88%", size: "10px", color: "#F97316", opacity: 0.7, duration: "5.5s", delay: "0.2s" },
    { top: "22%", left: "40%", size: "6px", color: "#1E293B", opacity: 0.8, duration: "4s", delay: "1.1s" },
    { top: "28%", left: "72%", size: "9px", color: "#F97316", opacity: 0.5, duration: "6s", delay: "0.6s" },
    { top: "35%", left: "15%", size: "7px", color: "#334155", opacity: 0.7, duration: "5s", delay: "1.3s" },
    { top: "40%", left: "55%", size: "8px", color: "#F97316", opacity: 0.7, duration: "6.5s", delay: "0.3s" },
    { top: "45%", left: "90%", size: "8px", color: "#1E293B", opacity: 0.6, duration: "4.5s", delay: "0.8s" },
    { top: "48%", left: "5%", size: "9px", color: "#F97316", opacity: 0.9, duration: "5s", delay: "0.5s" },
    { top: "55%", left: "35%", size: "6px", color: "#334155", opacity: 0.6, duration: "4s", delay: "1.4s" },
    { top: "58%", left: "78%", size: "10px", color: "#F97316", opacity: 0.6, duration: "5.5s", delay: "0.7s" },
    { top: "62%", left: "20%", size: "7px", color: "#1E293B", opacity: 0.8, duration: "4.8s", delay: "1.0s" },
    { top: "68%", left: "62%", size: "9px", color: "#F97316", opacity: 0.7, duration: "6s", delay: "0.2s" },
    { top: "72%", left: "92%", size: "8px", color: "#334155", opacity: 0.7, duration: "5s", delay: "0.9s" },
    { top: "78%", left: "10%", size: "8px", color: "#F97316", opacity: 0.8, duration: "6.5s", delay: "0.4s" },
    { top: "82%", left: "45%", size: "7px", color: "#1E293B", opacity: 0.6, duration: "4.5s", delay: "1.2s" },
    { top: "88%", left: "70%", size: "9px", color: "#F97316", opacity: 0.6, duration: "5.5s", delay: "0.6s" },
    { top: "92%", left: "28%", size: "6px", color: "#334155", opacity: 0.7, duration: "4s", delay: "1.5s" },
    { top: "95%", left: "85%", size: "10px", color: "#F97316", opacity: 0.7, duration: "6s", delay: "0.1s" },
  ];

  const bgGradient = useColorModeValue("linear-gradient(180deg, #fff 0%, #fff 100%)", "linear-gradient(180deg, #05060A 0%, #05060A 100%)");
  const sectionBg = useColorModeValue("#fff", "#05060A");
  const headingColor = useColorModeValue("#1a202c", "#fff");
  const textColor = useColorModeValue("#4a5568", "rgba(255,255,255,0.65)");
  const cardBg = useColorModeValue("rgba(0,0,0,0.03)", "rgba(255,255,255,0.06)");
  const cardHoverBg = useColorModeValue("rgba(0,0,0,0.06)", "rgba(255,255,255,0.09)");
  const descColor = useColorModeValue("#718096", "rgba(255,255,255,0.85)");
  const dotColor = useColorModeValue("#1d4ed8", "white");
  const lineBg = useColorModeValue("rgba(0,0,0,0.2)", "rgba(255,255,255,0.5)");
  const overlay = useColorModeValue("radial-gradient(ellipse at center bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 85%), linear-gradient(180deg,rgba(5, 6, 10, 0) 0%,rgba(5, 6, 10, 0.1) 30%,rgba(5, 6, 10, 0.2) 60%,rgba(255, 255, 255, 0.3) 75%,rgba(255, 255, 255, 0.97) 90%,rgba(255, 255, 255, 1) 100%)", "radial-gradient(ellipse at center bottom, rgba(5, 6, 10, 0) 0%, rgba(5, 6, 10, 0) 85%), linear-gradient(180deg,rgba(5, 6, 10, 0) 0%,rgba(5, 6, 10, 0.1) 30%,rgba(5, 6, 10, 0.2) 60%,rgba(5, 6, 10, 0.3) 75%,rgba(5, 6, 10, 0.97) 90%,rgba(5, 6, 10, 1) 100%  )");
  const bnw = useColorModeValue("#000", "#fff");

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
        backgroundImage={`url('${hero.backgroundImage}')`}
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
          background={overlay}
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
              letterSpacing="-1.8px"
              fontFamily="Plus Jakarta Sans"
            >
              {hero.headlineLines.map((line, idx) => (
                <Text as="span" display="block" key={idx}>
                  {line}
                </Text>
              ))}
            </Heading>

            <Text
              fontSize={{ base: "18px", md: "110px", xl: "19px" }}
              color="#ffffff"
              maxW="3xl"
              lineHeight="1.6"
              opacity={0.85}
            >
              {hero.subheadline}
            </Text>
          </VStack>
        </Container>

        {/* Stats */}
        <HStack
          spacing={{ base: 8, md: 20 }}
          justify="space-evenly"
          w="full"
          position="relative"
          zIndex={1}
          pb={{ base: 4, md: 8 }}
        >
          {stats.map((stat, index) => (
            <HStack key={stat.id ?? stat.stat_label} spacing={{ base: 8, md: 20 }}>
              {index > 0 && <Box w="1px" h="120px" bg="rgba(255, 255, 255, 0.15)" />}
              <VStack spacing={1.5}>
                <Text
                  fontSize={{ base: "16px", md: "18px", lg: "27px" }}
                  fontWeight="600"
                  color="var(--accent)"
                  textTransform="uppercase"
                >
                  {stat.stat_label}
                </Text>
                <Text
                  fontSize={{ base: "42px", md: "48px", lg: "52px" }}
                  fontWeight="700"
                  color={bnw}
                  fontFamily="Plus Jakarta Sans"
                >
                  {stat.stat_number}
                </Text>
              </VStack>
            </HStack>
          ))}
        </HStack>
      </Box>

      {/* ── About ER Communications ── */}
      <Box py={{ base: 20, md: 28 }} background={bgGradient}>
        <Container maxW="4xl" px={{ base: 6, md: 8 }} textAlign="center">
          <Heading
            fontSize={{ base: "2xl", md: "3xl", lg: "6xl" }}
            color={headingColor}
            fontWeight="400"
            fontFamily="Plus Jakarta Sans"
            mb={8}
            dangerouslySetInnerHTML={{ __html: aboutSection.headline }}
          />
          <Text
            fontSize={{ base: "sm", md: "lg" }}
            color={textColor}
            lineHeight="1.8"
            maxW="4xl"
            mx="auto"
            dangerouslySetInnerHTML={{ __html: aboutSection.description }}
          />
        </Container>
      </Box>

      <Box
        position="relative"
        overflow="hidden"
        bg={sectionBg}
        _before={{
          content: '""',
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background:
            "radial-gradient(circle at 20% 40%, rgba(29, 78, 216, 0.25) 0%, transparent 40%), " +
            "radial-gradient(circle at 80% 60%, rgba(194, 65, 12, 0.35) 0%, transparent 40%)",
          zIndex: 0,
        }}
      >
        {/* ── What Drives Section ── */}
        <Box
          py={{ base: 16, md: 24 }}
        >
          <Container maxW="7xl" px={{ base: 6, md: 8 }}>
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align={{ base: "flex-start", md: "center" }}
              gap={{ base: 4, md: 6 }}
              mb={{ base: 12, md: 16 }}
            >
              <Heading
                fontSize={{ base: "28px", md: "38px", lg: "5xl" }}
                color={headingColor}
                fontWeight="500"
                fontFamily="Plus Jakarta Sans"
                maxW={{ md: "70%" }}
                lineHeight="1.15"
              >
                What drives ER Communications?
              </Heading>
              <Text
                fontSize={{ base: "sm", md: "lg" }}
                color={textColor}
                maxW={{ md: "30%" }}
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
                    bg={cardBg}
                    borderRadius="20px"
                    p={{ base: 6, md: 10 }}
                    h="full"
                    _hover={{ bg: cardHoverBg }}
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
                        <Image src={feature.icon} alt="Feature" width={{ base: 6, md: 14 }} height={{ base: 6, md: 8 }} />
                      </Flex>
                      <VStack align="flex-start" spacing={2}>
                        <Text fontSize={{ base: "md", md: "xl" }} fontWeight="500" color={headingColor}>
                          {feature.title}
                        </Text>
                        <Text
                          fontSize={{ base: "sm", md: "lg" }}
                          color={descColor}
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
          sx={{
            "@keyframes floatParticle": {
              "0%": { transform: "translate(0, 0)" },
              "50%": { transform: "translate(9px, -10px)" },
              "100%": { transform: "translate(-9px, 8px)" },
            },
          }}
        >
          <Box position="absolute" inset={0} zIndex={0} pointerEvents="none" overflow="hidden">
            {particles.map((p, i) => (
              <Box
                key={i}
                position="absolute"
                top={p.top}
                left={p.left}
                w={p.size}
                h={p.size}
                borderRadius="full"
                bg={p.color}
                opacity={p.opacity}
                sx={{
                  animation: `${p.duration} ease-in-out infinite alternate`,
                  animationName: "floatParticle",
                  animationDelay: p.delay,
                }}
              />
            ))}
          </Box>

          <Container maxW="4xl" position="relative" zIndex={1}>
            <VStack spacing={20} align="center">
              {/* Title */}
              <VStack spacing={4} textAlign="center">
                <Heading
                  fontSize={{ base: "xl", md: "5xl" }}
                  fontWeight="600"
                  color={headingColor}
                  fontFamily="Plus Jakarta Sans"
                >
                  {timelineSettings?.title ?? "Timeline"}
                </Heading>
                <Text fontSize={{ base: "sm", md: "lg" }} color={textColor} lineHeight="1.8" maxW="600px">
                  {timelineSettings?.description ??
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis vivamus at mattis bibendum congue cras id interdum. Risus leo et."}
                </Text>
              </VStack>

              {/* Vertical Timeline Centered */}
              <Box position="relative" w="full" maxW="8xl" mx="auto">
                {/* Central Line */}
                <Box
                  position="absolute"
                  left={{ base: '3%', md: '50%' }}
                  top="0"
                  bottom="0"
                  w="3px"
                  rounded="full"
                  bg={lineBg}
                  transform="translateX(-50%)"
                />

                <VStack spacing={{ base: 10, md: 16 }} align="stretch" w="full" position="relative">
                  {timelineItems.map((item, idx) => {
                    const isRight = idx % 2 === 0; // genap (0,2,...) -> kanan; ganjil -> kiri
                    return (
                      <Flex key={idx} w="full" justify={{ base: 'start', md: 'center'}} position="relative">
                        {/* Dot */}
                        <Box
                          position="absolute"
                          left={{ base: '3%', md: '50%' }}
                          top="12px"
                          w={{ base: '12px', md: '20px'}}
                          h={{ base: '12px', md: '20px'}}
                          borderRadius="full"
                          bg={dotColor}
                          transform="translateX(-50%)"
                          zIndex={2}
                        />

                        {/* Content Left or Right */}
                        <Box
                          w={{ base: 'full', md: "50%" }}
                          ml={isRight ? { base: '0', md: "50%" } : { base: '0', md: "-50%" }}
                          pl={isRight ? { base: '40px', md: 10 } : '40px'}
                          pr={isRight ? 0 : { base: 0, md: 10 }}
                        >
                          <VStack
                            align={isRight ? "flex-start" : {base: 'flex-start', md: "flex-end"}}
                            spacing={1}
                            textAlign={isRight ? "left" : {base: 'left', md: "right"}}
                          >
                            <Text
                              fontSize={{ base: "20px", md: "2xl" }}
                              fontWeight="700"
                              color={headingColor}
                              fontFamily="Plus Jakarta Sans"
                            >
                              {item.year}
                            </Text>
                            <Text fontSize={{ base: "md", md: "xl" }} fontWeight="600" color={headingColor}>
                              {item.title}
                            </Text>
                            <Text
                              fontSize={{ base: "sm", md: "lg" }}
                              color={descColor}
                              lineHeight="1.6"
                            >
                              {item.desc}
                            </Text>
                          </VStack>
                        </Box>
                      </Flex>
                    );
                  })}
                </VStack>
              </Box>
            </VStack>
          </Container>
        </Box>
      </Box>

      <Suspense fallback={null}>
        <ServicesListSection />
      </Suspense>

      {/* ── Additional Sections ── */}
      <TimelineSection />
      <PartnersSection logos={partnerLogos} />
      <ContactSection />
      <FooterSection />
    </>
  );
}
