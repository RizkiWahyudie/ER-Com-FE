"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  GridItem,
  Image,
  Button,
  IconButton,
  Icon,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaAddressCard } from "react-icons/fa";
import ContactCardModal from "@/components/ContactCardModal";

const teamData = [
  {
    name: "Ingga Mawardy",
    role: "Technology Law Associate",
    img: "/assets/team/team-card-pp-1.png",
    whatsapp: "+62 813-2345-6789",
    email: "hello@ingga-ercomm.com",
  },
  {
    name: "Sandra Monte",
    role: "Social Media Specialist",
    img: "/assets/team/team-card-pp-2.png",
    whatsapp: "+62 813-2345-6790",
    email: "sandra@ercomm.com",
  },
  {
    name: "Anton Samuel",
    role: "Head of IT",
    img: "/assets/team/team-card-pp-3.png",
    whatsapp: "+62 813-2345-6791",
    email: "anton@ercomm.com",
  },
  {
    name: "Luke Ernser",
    role: "iOS Developer",
    img: "/assets/team/team-card-pp-4.png",
    whatsapp: "+62 813-2345-6792",
    email: "luke@ercomm.com",
  },
  {
    name: "Maryann Olson",
    role: "Android Developer",
    img: "/assets/team/team-card-pp-5.png",
    whatsapp: "+62 813-2345-6793",
    email: "maryann@ercomm.com",
  },
  {
    name: "Vanessa Waters",
    role: "System Engineer",
    img: "/assets/team/team-card-pp-6.png",
    whatsapp: "+62 813-2345-6794",
    email: "vanessa@ercomm.com",
  },
  {
    name: "Robert Martin",
    role: "Account Executive",
    img: "/assets/team/team-card-pp-7.png",
    whatsapp: "+62 813-2345-6795",
    email: "robert@ercomm.com",
  },
  {
    name: "Angga Febri",
    role: "Designer",
    img: "/assets/team/team-card-pp-8.png",
    whatsapp: "+62 813-2345-6796",
    email: "angga@ercomm.com",
  },
];

export default function TeamDetail() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMember, setSelectedMember] = useState(null);

  const sectionBg = useColorModeValue("#f7f8fc", "#05060a");
  const headingColor = useColorModeValue("#1a202c", "#fff");
  const textColor = useColorModeValue("#4a5568", "rgba(255,255,255,0.75)");
  const pillBorder = useColorModeValue("5px solid #1a202c", "5px solid #fff");
  const nameBorder = useColorModeValue("1.5px solid #006adbff", "1.5px solid #006adbff");
  const nameColor = useColorModeValue("#006adbff", "#006adbff");

  const handleOpenContact = (member) => {
    setSelectedMember(member);
    onOpen();
  };

  return (
    <Box bg={sectionBg} py={{ base: 12, md: 20 }} overflow="hidden" position="relative">
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
              color={headingColor}
              fontFamily="Plus Jakarta Sans"
              lineHeight="1.15"
            >
              See And Explore More<br />
              About Our Amazing Team.
            </Heading>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color={textColor}
              lineHeight="1.7"
              maxW="2xl"
            >
              Get to know the experts behind ER Communications and the people driving every successful communication strategy.
            </Text>
          </VStack>

          {/* Outline Pill Shape */}
          <Box
            border={pillBorder}
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
                  h={{ base: "280px", sm: "300px", md: "344px" }}
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

                  {/* Hover Overlay with Contact Button (Desktop/Tablet Only) */}
                  <Flex
                    position="absolute"
                    inset={0}
                    bg="rgba(5, 6, 10, 0.6)"
                    backdropFilter="blur(4px)"
                    align="center"
                    justify="center"
                    opacity={0}
                    visibility="hidden"
                    transition="all 0.3s ease"
                    _groupHover={{
                      opacity: 1,
                      visibility: "visible",
                    }}
                    display={{ base: "none", md: "flex" }}
                  >
                    <Button
                      bg="#006adb"
                      color="white"
                      borderRadius="full"
                      px={6}
                      py={4}
                      fontSize="xs"
                      fontWeight="600"
                      _hover={{ bg: "#0056b3", transform: "scale(1.05)" }}
                      transition="all 0.2s"
                      onClick={() => handleOpenContact(member)}
                    >
                      Contact
                    </Button>
                  </Flex>
                </Box>

                {/* Name Badge and Mobile Trigger */}
                <HStack justify="space-between" w="full" align="center">
                  <Box
                    px={4}
                    py={1.5}
                    borderRadius="full"
                    border={nameBorder}
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
                      color={nameColor}
                      textTransform="uppercase"
                      letterSpacing="1px"
                      fontFamily="Plus Jakarta Sans"
                    >
                      {member.name}
                    </Text>
                  </Box>

                  {/* Mobile Contact Icon */}
                  <IconButton
                    aria-label="Contact Member"
                    icon={<Icon as={FaAddressCard} />}
                    variant="ghost"
                    color="#006adb"
                    fontSize="xl"
                    display={{ base: "flex", md: "none" }}
                    onClick={() => handleOpenContact(member)}
                    _hover={{ bg: "rgba(2, 91, 207, 0.1)" }}
                    _active={{ bg: "rgba(2, 91, 207, 0.2)" }}
                  />
                </HStack>

                {/* Role */}
                <Text
                  fontSize={{ base: "xs", md: "sm" }}
                  color={textColor}
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

      {/* Reusable Contact Card Modal */}
      <ContactCardModal
        isOpen={isOpen}
        onClose={onClose}
        member={selectedMember}
      />
    </Box>
  );
}
