"use client";

import { Box, Container, Grid, GridItem, Heading, Icon, Flex } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

const services = [
  {
    title: "Media Relation",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=600&fit=crop",
    colSpan: 1,
  },
  {
    title: "Social & Digital",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&h=600&fit=crop",
    colSpan: 1,
  },
  {
    title: "Media Event",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=600&fit=crop",
    colSpan: 1,
  },
  {
    title: "Brand & Strategic",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=600&fit=crop",
    colSpan: 1,
  },
  {
    title: "International Event",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&h=600&fit=crop",
    colSpan: 2,
  },
];

export default function ServicesListSection() {
  return (
    <Box w="full" bg="#05060a" pb={{ base: 20, md: 32 }}>
      <Container maxW="7xl" px={{ base: 6, md: 6 }} mx="auto">
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={{ base: 4, md: 6 }}>
          {services.map((service, idx) => (
            <GridItem
              key={idx}
              colSpan={{ base: 1, md: service.colSpan }}
              position="relative"
              borderRadius="30px"
              overflow="hidden"
              h={{ base: "300px", md: "400px", lg: "450px" }}
              bgImage={`url('${service.image}')`}
              bgSize="cover"
              bgPos="center"
              transition="transform 0.4s ease, box-shadow 0.4s ease"
              _hover={{
                transform: "translateY(-6px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                "& > .overlay": {
                  background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 100%)",
                },
                "& .arrow-icon": {
                  transform: "rotate(0deg)",
                  bg: "white",
                  color: "black",
                }
              }}
              cursor="pointer"
              role="group"
            >
              {/* Gradient Overlay */}
              <Box
                className="overlay"
                position="absolute"
                inset={0}
                background="linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.3) 100%)"
                transition="background 0.4s ease"
              />

              {/* Title */}
              <Box position="absolute" bottom={0} left={0} w="full" p={{ base: 6, md: 10 }}>
                <Heading
                  as="h3"
                  fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                  color="white"
                  fontWeight="700"
                  fontFamily="Plus Jakarta Sans"
                >
                  {service.title}
                </Heading>
              </Box>

              {/* Arrow Icon */}
              <Flex
                className="arrow-icon"
                position="absolute"
                top={{ base: 6, md: 8 }}
                right={{ base: 6, md: 8 }}
                w={{ base: "40px", md: "52px" }}
                h={{ base: "40px", md: "52px" }}
                borderRadius="full"
                border="1px solid rgba(255,255,255,0.3)"
                bg="transparent"
                color="white"
                align="center"
                justify="center"
                backdropFilter="blur(10px)"
                transform="rotate(-45deg)"
                transition="all 0.3s ease"
              >
                <Icon as={FaArrowRight} boxSize={{ base: 4, md: 5 }} />
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
