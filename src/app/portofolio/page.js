"use client";

import { useState } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Image,
  Flex,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaPlay, FaArrowRight } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const featuredSlides = [
  {
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop",
    label: "Media Event",
  },
  {
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    label: "Brand Strategy",
  },
  {
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=600&fit=crop",
    label: "Media Relation",
  },
];

const gridPhotos = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
];

export default function PortofolioPage() {
  const [slideIdx, setSlideIdx] = useState(0);

  const nextSlide = () => setSlideIdx((i) => (i + 1) % featuredSlides.length);

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
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
        <Box
          position="absolute"
          top={0} left={0} right={0} bottom={0}
          background="linear-gradient(180deg, rgba(5,6,10,0.35) 0%, rgba(5,6,10,0.25) 50%, rgba(5,6,10,0.88) 85%, rgba(5,6,10,1) 100%)"
          zIndex={0}
        />

        <Container
          maxW="4xl"
          px={{ base: 6, md: 8 }}
          textAlign="center"
          position="relative"
          zIndex={1}
          pt={{ base: "160px", md: "220px" }}
        >
          <VStack spacing={{ base: 5, md: 8 }}>
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
              <Text as="span" color="var(--accent)">More.</Text>
              <br />
              Get Closer.
            </Heading>
            <Text
              fontSize={{ base: "15px", md: "17px" }}
              color="rgba(255,255,255,0.75)"
              maxW="2xl"
              lineHeight="1.65"
            >
              We help businesses communicate with confidence through strategic PR and
              communication solutions. ER Communication partners with brands to
              strengthen reputation and drive meaningful impact.
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
          <VStack spacing={1.5}>
            <Text fontSize={{ base: "13px", md: "15px", lg: "24px" }} fontWeight="600" color="var(--accent)" textTransform="uppercase">
              Clients
            </Text>
            <Text fontSize={{ base: "42px", md: "48px", lg: "52px" }} fontWeight="700" color="#fff" fontFamily="Plus Jakarta Sans">
              500+
            </Text>
          </VStack>
          <Box w="1px" h="120px" bg="rgba(255,255,255,0.15)" />
          <VStack spacing={1.5}>
            <Text fontSize={{ base: "13px", md: "15px", lg: "24px" }} fontWeight="600" color="var(--accent)" textTransform="uppercase">
              Achievements
            </Text>
            <Text fontSize={{ base: "42px", md: "48px", lg: "52px" }} fontWeight="700" color="#fff" fontFamily="Plus Jakarta Sans">
              57+
            </Text>
          </VStack>
        </HStack>
      </Box>

      {/* ── Our Projects ── */}
      <Box bg="var(--background)" py={{ base: 16, md: 24 }}>
        <Container maxW="4xl" px={{ base: 6, md: 8 }} textAlign="center">
          <VStack spacing={4}>
            <Heading
              as="h2"
              fontSize={{ base: "28px", md: "44px", lg: "50px" }}
              fontWeight="600"
              color="#fff"
              fontFamily="Plus Jakarta Sans"
              lineHeight="1.2"
            >
              Our projects with<br />
              companies that trust us.
            </Heading>
            <Text fontSize={{ base: "13px", md: "15px" }} color="rgba(255,255,255,0.45)" maxW="380px" lineHeight="1.6">
              Companies are ditching legacy platforms for the ability to deliver an engaging
              experience at every level.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* ── Featured Carousel ── */}
      <Box bg="var(--background)" pb={{ base: 4, md: 6 }}>
        <Container maxW="7xl" px={{ base: 6, md: 8 }}>
          <Box
            position="relative"
            borderRadius="20px"
            overflow="hidden"
            h={{ base: "280px", md: "480px" }}
          >
            <Image
              src={featuredSlides[slideIdx].img}
              alt={featuredSlides[slideIdx].label}
              w="full"
              h="full"
              objectFit="cover"
              transition="opacity 0.4s ease"
            />

            {/* Dark overlay */}
            <Box
              position="absolute"
              inset={0}
              bg="rgba(5,6,10,0.35)"
            />

            {/* Play button center */}
            <Flex
              position="absolute"
              inset={0}
              align="center"
              justify="center"
            >
              <Flex
                w={{ base: "52px", md: "68px" }}
                h={{ base: "52px", md: "68px" }}
                borderRadius="full"
                bg="rgba(255,255,255,0.25)"
                backdropFilter="blur(8px)"
                align="center"
                justify="center"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ bg: "rgba(255,255,255,0.4)", transform: "scale(1.08)" }}
              >
                <Icon as={FaPlay} color="#fff" w={5} h={5} ml={1} />
              </Flex>
            </Flex>

            {/* Next arrow */}
            <Flex
              position="absolute"
              right={4}
              top="50%"
              transform="translateY(-50%)"
              w="44px"
              h="44px"
              borderRadius="full"
              bg="rgba(255,255,255,0.15)"
              backdropFilter="blur(8px)"
              align="center"
              justify="center"
              cursor="pointer"
              onClick={nextSlide}
              transition="all 0.2s"
              _hover={{ bg: "rgba(255,255,255,0.3)" }}
            >
              <Icon as={FaArrowRight} color="#fff" w={4} h={4} />
            </Flex>

            {/* Dot indicators */}
            <HStack position="absolute" bottom={4} left="50%" transform="translateX(-50%)" spacing={2}>
              {featuredSlides.map((_, i) => (
                <Box
                  key={i}
                  as="button"
                  onClick={() => setSlideIdx(i)}
                  w={i === slideIdx ? "24px" : "8px"}
                  h="8px"
                  borderRadius="full"
                  bg={i === slideIdx ? "#fff" : "rgba(255,255,255,0.45)"}
                  transition="all 0.3s"
                />
              ))}
            </HStack>
          </Box>
        </Container>
      </Box>

      {/* ── Photo Grid ── */}
      <Box bg="var(--background)" py={{ base: 4, md: 6 }} pb={{ base: 16, md: 24 }}>
        <Container maxW="7xl" px={{ base: 6, md: 8 }}>
          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3}>
            {gridPhotos.map((src, idx) => (
              <Box
                key={idx}
                borderRadius="14px"
                overflow="hidden"
                h={{ base: "140px", md: "200px" }}
                cursor="pointer"
                position="relative"
                _hover={{ "& img": { transform: "scale(1.06)" } }}
              >
                <Image
                  src={src}
                  alt={`Portfolio ${idx + 1}`}
                  w="full"
                  h="full"
                  objectFit="cover"
                  transition="transform 0.4s ease"
                />
                <Box
                  position="absolute"
                  inset={0}
                  bg="rgba(5,6,10,0)"
                  transition="background 0.3s"
                  _hover={{ bg: "rgba(37,99,235,0.15)" }}
                />
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <ContactSection />
      <FooterSection />
    </>
  );
}
