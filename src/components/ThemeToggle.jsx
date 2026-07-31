"use client";

import { Box, Image, useColorMode, Flex } from "@chakra-ui/react";

export default function ThemeToggle(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Box
      as="button"
      onClick={toggleColorMode}
      position="relative"
      w="71.58px"
      h="25px"
      borderRadius="35.88px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p="2.15px"
      overflow="hidden"
      transition="all 0.3s ease"
      boxShadow="0px -0.54px 0.72px rgba(0, 0, 0, 0.25), 0px 0.72px 0.72px rgba(252, 252, 252, 0.94), inset 0px 0.18px 1.79px rgba(0, 0, 0, 0.25), inset 0px 1.44px 1.44px rgba(0, 0, 0, 0.25)"
      {...props}
    >
      {/* Background Image depending on theme */}
      <Image
        src={isDark ? "/assets/bg%20button%20dark.svg" : "/assets/bg%20button%20light.svg"}
        alt="Theme Background"
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        objectFit="cover"
        zIndex="0"
      />

      {/* Sliding Icon Container */}
      <Flex
        position="absolute"
        zIndex="1"
        top="-2px"
        left={isDark ? "calc(100% - 32px)" : "0"}
        transition="left 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)"
        w="32px"
        h="32px"
        alignItems="center"
        justifyContent="center"
        bg="transparent"
        borderRadius="full"
      >
        <Image
          src={isDark ? "/assets/moon%20dark.svg" : "/assets/sun%20light.svg"}
          alt={isDark ? "Moon Icon" : "Sun Icon"}
          w="24px"
          h="24px"
        />
      </Flex>
    </Box>
  );
}
