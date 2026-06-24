"use client";

import { Box, Container, Grid, Heading, Text, VStack, HStack, Button } from "@chakra-ui/react";

const portfolioCards = [
  {
    tag: "Media Relation",
    title: "Build relation for every\nneed of your company",
    description: "We help build relationships and create strong brand strategy.",
    icon: "📄",
    bg: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop",
  },
  {
    tag: "Media Event",
    title: "All your conversations\nin one place",
    description: "We create, deliver and execute the best media events for our clients.",
    icon: "📅",
    bg: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
  },
  {
    tag: "Brand Strategy",
    title: "Comprehensive brand\nstrategy solutions",
    description: "From market analysis to brand positioning, we deliver comprehensive strategies.",
    icon: "🎯",
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
            fontSize={{ base: "24px", md: "32px" }}
            fontWeight="600"
            color="#fff"
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
                p={5}
                backgroundImage={`linear-gradient(180deg, rgba(5,6,10,0.3) 0%, rgba(5,6,10,0.92) 80%), url('${card.bg}')`}
                backgroundSize="cover"
                backgroundPosition="center"
                transition="transform 0.3s, box-shadow 0.3s"
                _hover={{ transform: "translateY(-4px)", boxShadow: "0 12px 24px rgba(0,0,0,0.4)" }}
              >
                {/* Tag */}
                <Box
                  alignSelf="flex-start"
                  px={3.5}
                  py={1.5}
                  bg="rgba(255, 255, 255, 0.15)"
                  backdropFilter="blur(8px)"
                  borderRadius="50px"
                  fontSize="xs"
                  fontWeight="500"
                  color="#fff"
                >
                  {card.tag}
                </Box>

                {/* Body */}
                <VStack align="stretch" spacing={3}>
                  <Heading
                    as="h3"
                    size="md"
                    color="#fff"
                    fontWeight="700"
                    lineHeight="1.25"
                  >
                    {card.title}
                  </Heading>
                  <Text fontSize="xs" color="rgba(207, 213, 227, 1)">
                    {card.description}
                  </Text>
                </VStack>

                {/* Footer */}
                <HStack justify="space-between" align="center">
                  <Box
                    w="36px"
                    h="36px"
                    borderRadius="10px"
                    bg="rgba(255, 255, 255, 0.1)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="lg"
                  >
                    {card.icon}
                  </Box>
                  <Button
                    size="sm"
                    px={5}
                    py={1.5}
                    borderRadius="50px"
                    bg="var(--primary)"
                    color="#fff"
                    fontSize="xs"
                    fontWeight="500"
                    _hover={{ bg: "#1976d2" }}
                  >
                    See More
                  </Button>
                </HStack>
              </Box>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
}
