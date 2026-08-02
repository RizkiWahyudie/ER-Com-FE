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
import { FaAddressCard, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import ContactCardModal from "@/components/ContactCardModal";

const teamData = [
  {
    name: "Ingga Mawardy",
    role: "Technology Law Associate",
    img: "/assets/team/team-card-pp-1.png",
    whatsapp: "+62 813-2345-6789",
    email: "hello@ingga-ercomm.com",
    bio: "Ingga brings legal & technology expertise, blending strategy and compliance into every communication touchpoint.",
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Sandra Monte",
    role: "Social Media Specialist",
    img: "/assets/team/team-card-pp-2.png",
    whatsapp: "+62 813-2345-6790",
    email: "sandra@ercomm.com",
    bio: "Sandra crafts compelling social narratives, driving audience engagement and brand voice across digital platforms.",
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Anton Samuel",
    role: "Head of IT",
    img: "/assets/team/team-card-pp-3.png",
    whatsapp: "+62 813-2345-6791",
    email: "anton@ercomm.com",
    bio: "Anton leads technology infrastructure, ensuring seamless digital systems and secure enterprise solutions.",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Luke Ernser",
    role: "iOS Developer",
    img: "/assets/team/team-card-pp-4.png",
    whatsapp: "+62 813-2345-6792",
    email: "luke@ercomm.com",
    bio: "Luke builds high-performance mobile experiences with modern iOS architectures and fluid animations.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Maryann Olson",
    role: "Android Developer",
    img: "/assets/team/team-card-pp-5.png",
    whatsapp: "+62 813-2345-6793",
    email: "maryann@ercomm.com",
    bio: "Maryann specializes in native Android apps, focusing on performance, clean code, and user experience.",
    socials: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  {
    name: "Vanessa Waters",
    role: "System Engineer",
    img: "/assets/team/team-card-pp-6.png",
    whatsapp: "+62 813-2345-6794",
    email: "vanessa@ercomm.com",
    bio: "Vanessa optimizes cloud architecture and server systems to ensure reliability and scalability.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Robert Martin",
    role: "Account Executive",
    img: "/assets/team/team-card-pp-7.png",
    whatsapp: "+62 813-2345-6795",
    email: "robert@ercomm.com",
    bio: "Robert connects clients with strategic solutions, cultivating long-term partnerships and client success.",
    socials: {
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Angga Febri",
    role: "Designer",
    img: "/assets/team/team-card-pp-8.png",
    whatsapp: "+62 813-2345-6796",
    email: "angga@ercomm.com",
    bio: "Angga creates intuitive visual systems, brand identities, and stunning digital interfaces.",
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
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

                  {/* Hover Overlay with Blue Background, Socials, Bio, and Contact Button */}
                  <Flex
                    position="absolute"
                    inset={0}
                    bg="#006adb"
                    p={{ base: 5, md: 6 }}
                    flexDir="column"
                    justify="space-between"
                    align="flex-start"
                    opacity={0}
                    visibility="hidden"
                    transition="all 0.35s ease"
                    _groupHover={{
                      opacity: 1,
                      visibility: "visible",
                    }}
                    display={{ base: "none", md: "flex" }}
                  >
                    {/* Top: Social Media Icons (if available) */}
                    <HStack spacing={2}>
                      {member.socials?.facebook && (
                        <Flex
                          as="a"
                          href={member.socials.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          w="32px"
                          h="32px"
                          borderRadius="full"
                          bg="rgba(0, 0, 0, 0.25)"
                          color="white"
                          align="center"
                          justify="center"
                          transition="all 0.2s"
                          _hover={{ bg: "white", color: "#006adb" }}
                        >
                          <Icon as={FaFacebook} fontSize="14px" />
                        </Flex>
                      )}
                      {member.socials?.instagram && (
                        <Flex
                          as="a"
                          href={member.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          w="32px"
                          h="32px"
                          borderRadius="full"
                          bg="rgba(0, 0, 0, 0.25)"
                          color="white"
                          align="center"
                          justify="center"
                          transition="all 0.2s"
                          _hover={{ bg: "white", color: "#006adb" }}
                        >
                          <Icon as={FaInstagram} fontSize="14px" />
                        </Flex>
                      )}
                      {member.socials?.linkedin && (
                        <Flex
                          as="a"
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          w="32px"
                          h="32px"
                          borderRadius="full"
                          bg="rgba(0, 0, 0, 0.25)"
                          color="white"
                          align="center"
                          justify="center"
                          transition="all 0.2s"
                          _hover={{ bg: "white", color: "#006adb" }}
                        >
                          <Icon as={FaLinkedin} fontSize="14px" />
                        </Flex>
                      )}
                      {member.socials?.twitter && (
                        <Flex
                          as="a"
                          href={member.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          w="32px"
                          h="32px"
                          borderRadius="full"
                          bg="rgba(0, 0, 0, 0.25)"
                          color="white"
                          align="center"
                          justify="center"
                          transition="all 0.2s"
                          _hover={{ bg: "white", color: "#006adb" }}
                        >
                          <Icon as={FaTwitter} fontSize="14px" />
                        </Flex>
                      )}
                      {member.socials?.github && (
                        <Flex
                          as="a"
                          href={member.socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          w="32px"
                          h="32px"
                          borderRadius="full"
                          bg="rgba(0, 0, 0, 0.25)"
                          color="white"
                          align="center"
                          justify="center"
                          transition="all 0.2s"
                          _hover={{ bg: "white", color: "#006adb" }}
                        >
                          <Icon as={FaGithub} fontSize="14px" />
                        </Flex>
                      )}
                    </HStack>

                    {/* Middle: Bio / Description Content */}
                    <Text
                      color="white"
                      fontSize={{ base: "xs", md: "14px" }}
                      lineHeight="1.6"
                      fontWeight="400"
                      fontFamily="Plus Jakarta Sans"
                      my="auto"
                    >
                      {member.bio || `${member.name} brings expertise and dedication to the ER Communications team.`}
                    </Text>

                    {/* Bottom: Contact Button */}
                    <Button
                      bg="white"
                      color="#006adb"
                      borderRadius="full"
                      px={6}
                      py={2}
                      h="36px"
                      fontSize="xs"
                      fontWeight="600"
                      _hover={{ bg: "rgba(255, 255, 255, 0.9)", transform: "translateY(-2px)" }}
                      transition="all 0.2s"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenContact(member);
                      }}
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
