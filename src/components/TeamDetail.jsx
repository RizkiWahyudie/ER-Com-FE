"use client";

import { Box, Container, Flex, Heading, Text, VStack, Grid, GridItem, Image } from "@chakra-ui/react";

const teamData = [
  {
    name: "Ingga Mawardy",
    role: "Technology Law Associate",
    img: "/assets/team/team-card-pp-1.png",
  },
  {
    name: "Sandra Monte",
    role: "Social Media Specialist",
    img: "/assets/team/team-card-pp-2.png",
  },
  {
    name: "Anton Samuel",
    role: "Head of IT",
    img: "/assets/team/team-card-pp-3.png",
  },
  {
    name: "Luke Ernser",
    role: "iOS Developer",
    img: "/assets/team/team-card-pp-4.png",
  },
  {
    name: "Maryann Olson",
    role: "Android Developer",
    img: "/assets/team/team-card-pp-5.png",
  },
  {
    name: "Vanessa Waters",
    role: "System Engineer",
    img: "/assets/team/team-card-pp-6.png",
  },
  {
    name: "Robert Martin",
    role: "Account Executive",
    img: "/assets/team/team-card-pp-7.png",
  },
  {
    name: "Angga Febri",
    role: "Designer",
    img: "/assets/team/team-card-pp-8.png",
  },
];

export default function TeamDetail() {
  return (
    <Box bg="#05060a" py={{ base: 12, md: 20 }} overflow="hidden" position="relative">
      <Image src="/assets/media/media-shape.svg" alt="background" position="absolute" display={{ base: "none", lg: "block" }} top={20} right={0} zIndex={0} />
      <Container maxW="7xl" px={{ base: 6, md: 8 }} mx="auto">
        {/* Section Header with shape */}
        <Flex
          align="center"
          justify="space-between"
          mb={{ base: 10, md: 16 }}
          gap={6}
        >
          <VStack align="flex-start" spacing={4} maxW="5xl">
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "4xl", lg: "6xl" }}
              fontWeight="500"
              color="#fff"
              fontFamily="Plus Jakarta Sans"
              lineHeight="1.15"
            >
              See And Explore More<br />
              About Our Amazing Team.
            </Heading>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="rgba(255,255,255,0.75)"
              lineHeight="1.7"
              maxW="2xl"
            >
              Get to know the experts behind ER Communications and the people driving every successful communication strategy.
            </Text>
          </VStack>

          {/* Outline Pill Shape */}
          <Box
            border="5px solid #fff"
            borderRadius="full"
            w={{ base: "140px", md: "200px", lg: "300px" }}
            h={{ base: "60px", md: "80px", lg: "100px" }}
            visibility="hidden"
            mr="-100px"
            opacity={0.9}
          />
        </Flex>

        {/* Team Members Grid */}
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={{ base: 6, md: 8 }}
        >
          {teamData.map((member, idx) => (
            <GridItem key={idx} role="group">
              <VStack align="flex-start" spacing={4}>
                {/* Profile Image Container */}
                <Box
                  w="full"
                  h={{ base: "280px", sm: "300px", md: "344" }}
                  borderRadius="15px"
                  overflow="hidden"
                  position="relative"
                  transition="all 0.3s ease"
                  _groupHover={{
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  <Image
                    src={member.img}
                    alt={member.name}
                    w="full"
                    h="full"
                    objectFit="cover"
                    fallbackSrc="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
                  />
                </Box>

                {/* Name Badge */}
                <Box
                  px={4}
                  py={1.5}
                  borderRadius="full"
                  border="1.5px solid #006adbff"
                  bg="transparent"
                  display="inline-block"
                  transition="all 0.2s"
                  _groupHover={{
                    borderColor: "#006adbff",
                    bg: "rgba(2, 91, 207, 0.08)",
                  }}
                >
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="600"
                    color="#006adbff"
                    textTransform="uppercase"
                    letterSpacing="1px"
                    fontFamily="Plus Jakarta Sans"
                    _groupHover={{
                      color: "#006adbff",
                    }}
                  >
                    {member.name}
                  </Text>
                </Box>

                {/* Role */}
                <Text
                  fontSize={{ base: "xs", md: "sm" }}
                  color="rgba(255,255,255,0.75)"
                  fontWeight="400"
                  fontFamily="Plus Jakarta Sans"
                  mt="-8px"
                >
                  {member.role}
                </Text>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
