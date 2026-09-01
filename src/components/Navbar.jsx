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
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaWhatsapp } from "react-icons/fa";
import NextLink from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { getSocialSection } from "@/lib/api";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();
  const bgNav = useColorModeValue("rgba(0, 0, 0, 0.3)", "rgba(255, 255, 255, 0.4)");
  const [waNumber, setWaNumber] = useState("6281234567890");

  useEffect(() => {
    getSocialSection().then((data) => {
      if (data?.whatsapp) {
        setWaNumber(data.whatsapp.replace(/[^0-9]/g, ''));
      }
    });
  }, []);

  const navItems = [
    {
      label: "About Us",
      href: pathname === "/" ? "#aboutus" : "/about",
    },
    { label: "Services", href: "/services" },
    { label: "Clients", href: "/clients" },
    { label: "Highlight", href: "/highlight" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "/#contact" },
    { label: "Career", href: "/career" },
  ];

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
        bg={bgNav}
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
          <NextLink href="/">
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
          </NextLink>

          {/* Desktop Navigation */}
          <HStack
            spacing={6}
            display={{ base: "none", md: "flex" }}
            flex={1}
          >
            {navItems.map((item) => (
              <NextLink key={item.label} href={item.href}>
                <Text
                  fontSize="14px"
                  color="#e9eaec"
                  fontWeight="500"
                  transition="color 0.2s"
                  _hover={{ color: "#fff" }}
                >
                  {item.label}
                </Text>
              </NextLink>
            ))}
          </HStack>

          {/* WhatsApp Button - Right */}
          <Flex
            as="a"
            href={`https://wa.me/${waNumber}`}
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

      {/* Theme Toggle (Outside Navbar Shape) */}
      <ThemeToggle 
        display={{ base: "none", md: "flex" }}
        position="absolute"
        right={{ base: 10, md: 8, xl: 12 }}
        top="50%"
        transform="translateY(-50%)"
      />

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
