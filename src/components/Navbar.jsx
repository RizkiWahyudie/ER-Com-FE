"use client";

import {
  Box,
  Flex,
  HStack,
  Link,
  Icon,
  Image,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaWhatsapp } from "react-icons/fa";

const navItems = [
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Clients", href: "#clients" },
  { label: "Highlight", href: "#highlight" },
  { label: "Contact", href: "#contact" },
  { label: "Career", href: "#career" },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={50}
      display="flex"
      justifyContent="center"
      py={{  base: 4, md: 6 }}
    >
      <Box
        bg="rgba(255, 255, 255, 0.4)"
        backdropFilter="blur(14px)"
        // border="1px solid rgba(255, 255, 255, 0.03)"
        boxShadow="inset 0 2px 8px rgba(255, 255, 255, 0), inset 0 -2px 8px rgba(255, 255, 255, 0.35)"
        px={6}
        py={2}
        borderRadius="50px"
        w={{ base: "full", md: "auto" }}
        mx={4}
      >
        <Flex 
          align="center" 
          gap={{ base: 0, md: 12 }}
          w={{ base: "full", md: "auto" }}
          justifyContent={{ base: "space-between", md: "flex-start" }}
        >
          {/* Mobile Menu Button - Left on mobile */}
          <IconButton
            icon={<HamburgerIcon w={6} h={6} />}
            display={{ base: "flex", md: "none" }}
            variant="unstyled"
            onClick={onOpen}
            color="#fff"
            flexShrink={0}
          />

          {/* Logo - Center on mobile */}
          <Box 
            w={{ base: "50px", md: "70px" }} 
            h="auto"
            textAlign={{ base: "center", md: "left" }}
          >
            <Image 
              src="/assets/hero/navbar-logo-sm.svg" 
              alt="ER Communication Logo"
              maxW="100%"
              h="auto"
            />
          </Box>

          {/* Desktop Navigation */}
          <HStack
            spacing={6}
            display={{ base: "none", md: "flex" }}
            flex={1}
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                fontSize="14px"
                color="#e9eaec"
                fontWeight="500"
                transition="color 0.2s"
                _hover={{ color: "#fff" }}
              >
                {item.label}
              </Link>
            ))}
          </HStack>

          {/* WhatsApp Button - Right */}
          <Flex
            as="a"
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            align="center"
            justify="center"
            w={{  base: "36px", md: "42px" }}
            h={{ base: "36px", md: "42px" }}
            bg="#00E510"
            borderRadius="full"
            boxShadow="0 6px 18px rgba(34, 197, 94, 0.45)"
            cursor="pointer"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.05)" }}
            flexShrink={0}
          >
            <Icon as={FaWhatsapp} color="#fff" w={{ base: 5, lg: 7 }} h={{ base: 5, lg: 7 }} />
          </Flex>
        </Flex>
      </Box>

      {/* Mobile Menu Drawer */}
      <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="#0f131c" pt={16} borderBottom="1px solid rgba(255, 255, 255, 0.08)">
          <DrawerCloseButton color="#fff" />
          <DrawerBody>
            <VStack spacing={4}>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  fontSize="14px"
                  color="rgba(207, 213, 227, 1)"
                  fontWeight="500"
                  _hover={{ color: "#fff" }}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
