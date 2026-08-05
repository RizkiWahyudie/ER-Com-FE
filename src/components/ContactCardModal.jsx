"use client";

import { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Image,
  Circle,
  Grid,
  Icon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useToast,
  GridItem,
} from "@chakra-ui/react";
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaQrcode, FaArrowLeft } from "react-icons/fa";

export default function ContactCardModal({ isOpen, onClose, member }) {
  const toast = useToast();
  const [showQR, setShowQR] = useState(false);

  // Reset ke tampilan profile setiap kali modal dibuka ulang / member ganti
  useEffect(() => {
    if (isOpen) setShowQR(false);
  }, [isOpen, member]);

  if (!member) return null;

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${label} perusahaan berhasil di Copy`,
      status: "success",
      duration: 2500,
      isClosable: true,
      position: "bottom-center"
    });
  };

  // Data vCard supaya waktu discan, kontak bisa langsung ke-save ke HP
  const vCard = `BEGIN:VCARD
    VERSION:3.0
    FN:${member.name}
    TITLE:${member.role}
    TEL:${member.whatsapp}
    EMAIL:${member.email}
    ORG:ER Communications
    END:VCARD`;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=12&data=${encodeURIComponent(vCard)}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
      <ModalOverlay bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(8px)" />
      <ModalContent
        bg="transparent"
        boxShadow="none"
        maxW={{ base: "345px", sm: "380px", lg: "450px" }}
        w="full"
        m="auto"
        border="none"
      >
        <Box
          position="relative"
          w="full"
          borderRadius="40px"
          border="1px solid rgba(255, 255, 255, 0.08)"
          bgImage="url('/assets/team/bg-card-contact.svg')"
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgColor="#05060A"
          p={{ base: 5, sm: 6 }}
          boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.9)"
          overflow="hidden"
        >
          {/* Inner Glassmorphic Card */}
          <Box
            w="full"
            borderRadius="28px"
            border="1.5px solid rgba(255, 255, 255, 0.18)"
            bg="rgba(0, 0, 0, 0.35)"
            backdropFilter="blur(24px)"
            p={{ base: 5, sm: 7 }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            position="relative"
          >
            {/* Modal Close Button */}
            <ModalCloseButton
              color="rgba(255, 255, 255, 0.7)"
              position="absolute"
              top="16px"
              left="16px"
              borderRadius="full"
              _hover={{ bg: "rgba(255, 255, 255, 0.1)", color: "white" }}
              zIndex={2}
            />

            {/* Logo on Top Right */}
            <Box position="absolute" top="16px" right="20px" w="65px" h="auto" zIndex={2}>
              <Image src="/assets/hero/navbar-logo-sm.svg" alt="ER Communication Logo" maxW="100%" h="auto" />
            </Box>

            {/* ===== Swap Area: Profile <-> QR ===== */}
            <Grid
              templateColumns="1fr"
              templateRows="1fr"
              w="full"
              mt={10}
              alignItems="start"
            >
              {/* --- Profile View --- */}
              <GridItem
                gridArea="1 / 1 / 2 / 2"
                as={VStack}
                w="full"
                spacing={0}
                opacity={showQR ? 0 : 1}
                transform={showQR ? "scale(0.92)" : "scale(1)"}
                pointerEvents={showQR ? "none" : "auto"}
                transition="opacity 0.35s ease, transform 0.35s ease"
              >
                {/* Profile Photo */}
                <Box
                  borderRadius="70px"
                  overflow="hidden"
                  boxSize="150px"
                  boxShadow="0 10px 25px rgba(0,0,0,0.5)"
                >
                  <Image src={member.img} alt={member.name} w="full" h="full" objectFit="cover" />
                </Box>

                {/* Member Info */}
                <VStack spacing={1} mt={5} w="full" textAlign="center">
                  <Heading
                    as="h3"
                    fontSize={{ base: "xl", sm: "2xl" }}
                    fontWeight="800"
                    letterSpacing="wide"
                    bgGradient="linear(to-r, #FFA07A, #FFF, #00BFFF)"
                    bgClip="text"
                    textTransform="uppercase"
                  >
                    {member.name}
                  </Heading>
                  <Text fontSize={{ base: "sm", lg: "md" }} color="rgba(255, 255, 255, 0.75)" fontWeight="500">
                    {member.role}
                  </Text>
                </VStack>

                {/* Switch to QR Button */}
                <Button
                  mt={4}
                  size="sm"
                  leftIcon={<Icon as={FaQrcode} />}
                  bg="rgba(255, 255, 255, 0.06)"
                  border="1px solid rgba(255, 255, 255, 0.15)"
                  color="white"
                  borderRadius="full"
                  fontWeight="600"
                  _hover={{ bg: "rgba(255, 255, 255, 0.14)", transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                  onClick={() => setShowQR(true)}
                >
                  Tampilkan Contact QR
                </Button>
              </GridItem>

              {/* --- QR View --- */}
              <GridItem
                gridArea="1 / 1 / 2 / 2"
                as={VStack}
                w="full"
                spacing={4}
                opacity={showQR ? 1 : 0}
                transform={showQR ? "scale(1)" : "scale(0.92)"}
                pointerEvents={showQR ? "auto" : "none"}
                transition="opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s"
              >
                <Box
                  bg="white"
                  p={3}
                  borderRadius="20px"
                  boxShadow="0 10px 25px rgba(0,0,0,0.5)"
                >
                  <Image
                    src={qrUrl}
                    alt={`QR Contact ${member.name}`}
                    boxSize={{ base: "180px", sm: "200px" }}
                    borderRadius="10px"
                  />
                </Box>

                <VStack spacing={0} textAlign="center">
                  <Text fontSize="sm" fontWeight="700" color="white">
                    {member.name}
                  </Text>
                  <Text fontSize="xs" color="rgba(255,255,255,0.6)">
                    Scan untuk simpan kontak
                  </Text>
                </VStack>

                <Button
                  size="sm"
                  leftIcon={<Icon as={FaArrowLeft} />}
                  bg="rgba(255, 255, 255, 0.06)"
                  border="1px solid rgba(255, 255, 255, 0.15)"
                  color="white"
                  borderRadius="full"
                  fontWeight="600"
                  _hover={{ bg: "rgba(255, 255, 255, 0.14)", transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                  onClick={() => setShowQR(false)}
                >
                  Kembali ke Profil
                </Button>
              </GridItem>
            </Grid>

            {/* Member Contacts */}
            <VStack spacing={3} mt={6} align="stretch" w="full">
              {/* WhatsApp */}
              <HStack
                as="a"
                href={`https://wa.me/${member.whatsapp?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${member.name}, I would like to inquire about ER Communications services.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                spacing={3}
                bg="rgba(255, 255, 255, 0.03)"
                border="1px solid rgba(255, 255, 255, 0.08)"
                borderRadius="14px"
                px={4}
                py={2.5}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(255, 255, 255, 0.4)",
                  transform: "translateY(-2px)"
                }}
              >
                <Icon as={FaWhatsapp} color="#ffffffff" boxSize={6} />
                <VStack align="flex-start" spacing={0} flex={1}>
                  <Text fontSize={{ base: 'xs', lg: 'sm' }} color="rgba(255, 255, 255, 0.55)">WhatsApp</Text>
                  <Text fontSize={{ base: 'sm', lg: 'md' }} fontWeight="600" color="white">{member.whatsapp}</Text>
                </VStack>
              </HStack>

              {/* Email */}
              <HStack
                as="a"
                href={`mailto:${member.email}`}
                spacing={3}
                bg="rgba(255, 255, 255, 0.03)"
                border="1px solid rgba(255, 255, 255, 0.08)"
                borderRadius="14px"
                px={4}
                py={2.5}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(255, 255, 255, 0.4)",
                  transform: "translateY(-2px)"
                }}
              >
                <Icon as={FaEnvelope} color="#ffffffff" boxSize={6} />
                <VStack align="flex-start" spacing={0} flex={1}>
                  <Text fontSize={{ base: 'xs', lg: 'sm' }} color="rgba(255, 255, 255, 0.55)">Email</Text>
                  <Text fontSize={{ base: 'sm', lg: 'md' }} fontWeight="600" color="white" isTruncated>{member.email}</Text>
                </VStack>
              </HStack>
            </VStack>

            {/* Divider */}
            <Box w="full" h="1px" bg="rgba(255, 255, 255, 0.12)" my={5} />

            {/* Company Info Header */}
            <Text fontSize={{ base: 'xs', lg: 'sm' }} fontWeight="600" color="rgba(255,255,255,0.55)" letterSpacing="wider" textTransform="uppercase" mb={3}>
              Hubungi Perusahaan
            </Text>

            {/* Company Contacts Icons Row */}
            <HStack spacing={5} justify="center" w="full" mb={1}>
              <Circle
                size="45px"
                bg="rgba(255, 255, 255, 0.04)"
                border="1px solid rgba(255, 255, 255, 0.08)"
                color="#ffffffff"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ bg: "#2196f3", color: "white", transform: "scale(1.1)" }}
                onClick={() => handleCopy("+62 21 5550199", "Telepon")}
                title="Copy Telepon Perusahaan"
              >
                <Icon as={FaPhone} boxSize={5} />
              </Circle>

              <Circle
                size="45px"
                bg="rgba(255, 255, 255, 0.04)"
                border="1px solid rgba(255, 255, 255, 0.08)"
                color="#ffffffff"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ bg: "#2196f3", color: "white", transform: "scale(1.1)" }}
                onClick={() => handleCopy("info@ercomm.com", "Email")}
                title="Copy Email Perusahaan"
              >
                <Icon as={FaEnvelope} boxSize={5} />
              </Circle>

              <Circle
                size="45px"
                bg="rgba(255, 255, 255, 0.04)"
                border="1px solid rgba(255, 255, 255, 0.08)"
                color="#ffffffff"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ bg: "#2196f3", color: "white", transform: "scale(1.1)" }}
                onClick={() => handleCopy("Sudirman Central Business District (SCBD) Lot 28, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan, 12190", "Alamat")}
                title="Copy Alamat Perusahaan"
              >
                <Icon as={FaMapMarkerAlt} boxSize={5} />
              </Circle>
            </HStack>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
}