"use client";

import { Box, Container, Grid, Heading, Text, VStack, HStack, Button, Divider, Image } from "@chakra-ui/react";

const portfolioCards = [
  {
    tag: "Media Relation",
    title: "Build relation for every\nneed of your company",
    description: "We help build relationships and create strong brand strategy.",
    icon: "/assets/services/service-icon-1.svg",
    bg: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop",
  },
  {
    tag: "Media Event",
    title: "All your conversations\nin one place",
    description: "We create, deliver and execute the best media events for our clients.",
    icon: "/assets/services/service-icon-2.svg",
    bg: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
  },
  {
    tag: "Brand Strategy",
    title: "Comprehensive brand\nstrategy solutions",
    description: "From market analysis to brand positioning, we deliver comprehensive strategies.",
    icon: "/assets/services/service-icon-3.svg",
    bg: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  },
];

export default function PortfolioSection() {
  return (
    <Box w="full" bg="#05060a" py={{ base: 20, md: 20 }}>
      <Container maxW="1180px" px={{ base: 6, md: 6 }} mx="auto">
        <VStack spacing={16} align="center">
          {/* Title */}
          <Heading
            as="h2"
            textAlign="center"
            fontSize={{ base: "2xl", md: "5xl" }}
            fontWeight="500"
            color="#e4e4e4"
            fontFamily="Plus Jakarta Sans"
          >
            See our Portfolio and Services
          </Heading>

          {/* Cards Grid */}
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={6}
            w="full"
          >
            {portfolioCards.map((card, idx) => (
              <Box
                key={idx}
                position="relative"
                borderRadius="18px"
                overflow="hidden"
                minH="340px"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                py={{ base: 5, md: 12 }}
                px={{ base: 5, md: 6 }}
                backgroundImage={`linear-gradient(180deg, rgba(5,6,10,0.3) 0%, rgba(5,6,10,0.92) 80%), url('${card.bg}')`}
                backgroundSize="cover"
                backgroundPosition="center"
                transition="transform 0.3s, box-shadow 0.3s"
                _hover={{ transform: "translateY(-4px)", boxShadow: "0 12px 24px rgba(0,0,0,0.4)" }}
              >
                {/* Tag */}
                <Box
                  alignSelf="flex-start"
                  px={{ base: 3.5, md: 5 }}
                  py={{ base: 1.5, md: 2.5 }}
                  mb={{ base: 4, md: 6 }}
                  bg="transparent"
                  border="1.5px solid white"
                  borderRadius="50px"
                  fontSize={{ base: "xs", md: "md" }}
                  fontWeight="500"
                  color="#fff"
                >
                  {card.tag}
                </Box>

                {/* Body */}
                <VStack align="stretch" spacing={{ base: 4, md: 6 }}>
                  <Text
                    fontSize={{ base: "md", md: "2xl" }}
                    color="#fff"
                    fontWeight="500"
                    lineHeight="1.25"
                  >
                    {card.title}
                  </Text>
                  <Text fontSize={{ base: "xs", md: "md" }} color="#dee1e7">
                    {card.description}
                  </Text>
                </VStack>

                {/* Footer */}
                <VStack w="full" gap={{ base: 4, md: 6 }} mt={{ base: 4, md: 6 }}>
                  <Divider />
                  <HStack justify="space-between" align="center" w="full">
                    <Image
                      src={card.icon}
                      w="36px"
                      h="36px"
                    />
                    <Button
                      size="sm"
                      px={{ base: 4, md: 6 }}
                      py={{ base: 1.5, md: 6 }}
                      borderRadius="50px"
                      bg="white"
                      color="black"
                      fontSize={{ base: "xs", md: "md" }}
                      fontWeight="500"
                      _hover={{ bg: "#1976d2", color: "white" }}
                    >
                      See More
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
}
