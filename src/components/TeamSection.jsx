"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Grid,
  Heading,
  Text,
  Button,
  Image,
  Flex,
  Icon,
  Divider
} from "@chakra-ui/react";
import Link from "next/link";
import { FaArrowUp, FaArrowRight, FaArrowLeft } from "react-icons/fa";

const teamMembers = [
  {
    name: "Ingga Mawardy",
    role: "Founder & CEO",
    img: "/assets/team/team-1.png",
  },
  {
    name: "Sarah Putri",
    role: "Creative Director",
    img: "/assets/team/team-2.png",
  },
  {
    name: "Andi Wijaya",
    role: "Lead Strategist",
    img: "/assets/team/team-3.png",
  },
  {
    name: "Rina Kartika",
    role: "Account Manager",
    img: "/assets/team/team-1.png",
  },
  {
    name: "Budi Santoso",
    role: "Senior PR Manager",
    img: "/assets/team/team-2.png",
  },
];

export default function TeamSection({ teamHome = 1 }) {
  const [activeTab, setActiveTab] = useState("Teams");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = teamMembers[selectedIdx];

  const prevIdx =
  (selectedIdx - 1 + teamMembers.length) % teamMembers.length;

  const nextIdx =
  (selectedIdx + 1) % teamMembers.length;

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      w="full"
      bg="linear-gradient(180deg, var(--background) 0%, #0c1426 50%, var(--background) 100%)"
      py={{ base: 20, md: 20 }}
      position="relative"
    >
      <Container maxW="8xl" px={{ base: 6, md: 6 }} mx="auto">
        <VStack spacing={{ base: 12, md: 16 }} align="stretch">

          {/* Main Content */}
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            gap={{ base: 8, md: 15 }}
            alignItems="center"
            maxW="8xl"
            mx="auto"
            w="full"
          >
            {/* Team Photo */}
            <Flex justify="center" position="relative" h="auto">
              <VStack gap={{ base: 6, md: 10 }} align="center">
                <Box
                  position="relative"
                  w={{ base: "100%", md: "880px" }}
                  maxW="880px"
                  h={{ base: "250px", md: "620px" }}
                >
                  {teamMembers.map((member, idx) => {
                    const isActive = idx === selectedIdx;
                    const isPrev = idx === prevIdx;
                    const isNext = idx === nextIdx;

                    return (
                      <Box
                        key={idx}
                        position="absolute"
                        left="50%"
                        top="50%"
                        transform={{
                          base: `translate(-50%, -50%) ${
                            isActive
                              ? "translateX(0) scale(1)"
                              : isPrev
                              ? "translateX(-55px) scale(.8)"
                              : isNext
                              ? "translateX(55px) scale(.8)"
                              : "scale(.6)"
                          }`,
                          md: `translate(-50%, -50%) ${
                            isActive
                              ? "translateX(0) scale(1)"
                              : isPrev
                              ? "translateX(-190px) scale(.82)"
                              : isNext
                              ? "translateX(190px) scale(.82)"
                              : "scale(.6)"
                          }`,
                        }}
                        opacity={isActive ? 1 : isPrev || isNext ? 0.35 : 0}
                        filter={isActive ? "blur(0)" : "blur(6px)"}
                        zIndex={isActive ? 3 : isPrev || isNext ? 2 : 0}
                        transition="all .55s cubic-bezier(.22,1,.36,1)"
                      >
                        <Image
                          src={member.img}
                          w={{
                            base: "240px",
                            sm: "300px",
                            md: "880px",
                          }}
                          h={{
                            base: "240px",
                            sm: "380px",
                            md: "620px",
                          }}
                          objectFit="cover"
                          borderRadius={{
                            base: "120px 120px 0 0",
                            md: "220px 220px 0 0",
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>

                {/* Avatar */}
                <HStack justify="center" spacing={3.5}>
                  {teamMembers.map((member, idx) => (
                    <Box
                      key={idx}
                      w={{ base: "50px", md: "64px", xl: "90px" }}
                      h={{ base: "50px", md: "64px", xl: "90px" }}
                      borderRadius="full"
                      overflow="hidden"
                      cursor="pointer"
                      onClick={() => setSelectedIdx(idx)}
                    >
                      <Image
                        src={member.img}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                      />
                    </Box>
                  ))}
                </HStack>
              </VStack>
              

              {/* Photo Navigation */}
              <Button
                position="absolute"
                left={{ base: "0px", md: "20px", xl: "195px" }}
                top="50%"
                transform="translateY(-50%)"
                w={{ base: "42px", md: "48px" }}
                h={{ base: "42px", md: "48px" }}
                borderRadius="full"
                bg="transparent"
                color="#fff"
                border="1px solid white"
                fontSize={{ base: "2xl", md: "xl" }}
                zIndex={5}
                _hover={{ transform: "translateY(-50%) scale(1.08)" }}
                onClick={() => setSelectedIdx((selectedIdx - 1 + teamMembers.length) % teamMembers.length)}
              >
                <FaArrowLeft fontSize={{ base: "2xl", md: "xl" }} />
              </Button>

              <Button
                position="absolute"
                right={{ base: "0px", md: "20px", xl: "195px" }}
                top="50%"
                transform="translateY(-50%)"
                w={{ base: "42px", md: "48px" }}
                h={{ base: "42px", md: "48px" }}
                borderRadius="full"
                bg="transparent"
                color="#fff"
                border="1px solid white"
                fontSize={{ base: "md", md: "xl" }}
                zIndex={5}
                _hover={{ transform: "translateY(-50%) scale(1.08)" }}
                onClick={() => setSelectedIdx((selectedIdx + 1) % teamMembers.length)}
              >
                <FaArrowRight fontSize={{ base: "md", md: "xl" }} />
              </Button>
            </Flex>

            {/* Team Info */}
            <VStack align={{ base: "center", md: "flex-start" }} spacing={6} textAlign={{ base: "center", md: "left" }}>
              <Heading size={{ base: "lg", md: "3xl" }} color="#fff" lineHeight="1.2" fontWeight={400}>
                Meet the People Behind Every Great Project.
              </Heading>
              <Text fontSize={{ base: "sm", md: "lg" }} color="#c4c1c1">
                A team of professionals dedicated to helping company strengthen reputation, and create meaningful connections.
              </Text>
              <Box my={{ base: 3, md: 6 }}></Box>
              <Box>
                <Divider borderColor="var(--primary)" borderWidth="1.5px" mb={3} />
                <Heading as="h2" size="xl" color="var(--primary)" mb={1}>
                  {selected.name}
                </Heading>
                <Text fontSize={{ base: "sm", md: "md" }} color="#c4c1c1">
                  {selected.role}
                </Text> 
              </Box>
              {teamHome == 0 ? null : (
                <Link href="/team">
                  <Button
                    size="sm"
                    px={{ base: 4, md: 6 }}
                    py={{ base: 1.5, md: 6 }}
                    mt={{ base: 3, md: 6 }}
                    borderRadius="50px"
                    bg="transparent"
                    color="white"
                    border="1px solid white"
                    fontSize={{ base: "xs", md: "md" }}
                    fontWeight="500"
                    _hover={{ bg: "white", color: "black" }}
                  >
                    <HStack spacing={2}>
                      <Text>View All</Text>
                      <FaArrowRight size={14} />
                    </HStack>
                  </Button>
                </Link>
              )}
            </VStack>
          </Grid>
        </VStack>
      </Container>

      {/* WhatsApp Float */}
      {/* <Flex
        position="fixed"
        right={6}
        bottom={6}
        w="58px"
        h="58px"
        borderRadius="full"
        bg="#22c55e"
        align="center"
        justify="center"
        boxShadow="0 10px 30px rgba(34, 197, 94, 0.5)"
        zIndex={60}
        as="a"
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon as={FaWhatsapp} color="#fff" w={7} h={7} />
      </Flex> */}

      {showScrollTop && (
        <Flex
          position="fixed"
          right={6}
          bottom={6}
          w={{ base: "24px", lg: "58px" }}
          h={{ base: "24px", lg: "58px" }}
          borderRadius="full"
          bg="rgba(1, 1, 1, 0.5)"
          p={{ base: 5, lg: 0 }}
          align="center"
          justify="center"  
          cursor="pointer"
          zIndex={60}
          boxShadow="sm"
          transition="0.2s"
          _hover={{
            transform: "translateY(-8px)",
          }}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <Icon as={FaArrowUp} color="white" boxSize={{ base: 4, lg: 5 }} />
        </Flex>
      )}
    </Box>
  );
}
