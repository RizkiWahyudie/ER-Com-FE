import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  HStack,
} from "@chakra-ui/react";
import { apiGet, getStatsSection, sanitizeRichText } from "@/lib/api";

const FALLBACK_HEADLINE =
  'We are Building <span style="color:var(--accent)">Trust</span>.<br/>Driving Impact.';
const FALLBACK_SUBHEADLINE =
  "We help businesses communicate with confidence through strategic PR and " +
  "communication solutions. At ER Communication, we share our knowledge to " +
  "strengthen reputation and drive meaningful impact.";

export default async function HeroSection() {
  let hero = null;
  try {
    hero = await apiGet("/sections/hero/home");
  } catch {
    hero = null;
  }

  const stats = await getStatsSection();

  return (
    <Box
      position="relative"
      w="full"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
    >
      {/* Background Image */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundImage={`url('${hero?.background_image_url ?? "/assets/hero/hero-bg-new.png"}')`}
        backgroundSize="cover"
        backgroundPosition="center"
        // filter="brightness(0.55) saturate(0.85)"
        zIndex={-2}
      />

      {/* Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        background="radial-gradient(ellipse at center bottom, rgba(5, 6, 10, 0) 0%, rgba(5, 6, 10, 0) 85%), linear-gradient(
          180deg,
          rgba(5, 6, 10, 0) 0%,
          rgba(5, 6, 10, 0.1) 30%,
          rgba(5, 6, 10, 0.2) 60%,
          rgba(5, 6, 10, 0.3) 75%,
          rgba(5, 6, 10, 0.97) 90%,
          rgba(5, 6, 10, 1) 100%
        )"
        zIndex={-1}
      />

      <HStack
        spacing={{ base: 8, md: 20 }}
        justify="center"
        flexDir={{ base: "column", md: "row" }}
      >
      </HStack>

      {/* Content */}
      <Container maxW="7xl" w="full" position="relative" zIndex={0} px={{ base: 6, md: 6 }} mx="auto">
        <VStack
          spacing={{ base: 6, md: 8, lg: 12 }}
          align="center"
          textAlign="center"
          w="full"
        >
          {/* Main Heading */}
          <Heading
            as="h1"
            fontSize={{ base: "42px", md: "56px", lg: "64px" }}
            color="#fff"
            fontWeight="700"
            lineHeight="1.15"
            letterSpacing="-1px"
            fontFamily="Plus Jakarta Sans"
            dangerouslySetInnerHTML={{ __html: sanitizeRichText(hero?.headline) || FALLBACK_HEADLINE }}
          />

          {/* Subtitle */}
          <Text
            fontSize={{ base: "sm", md: "16px", lg: "18px" }}
            color="#a0aab8"
            maxW="2xl"
            lineHeight="1.6"
            dangerouslySetInnerHTML={{ __html: sanitizeRichText(hero?.subheadline) || FALLBACK_SUBHEADLINE }}
          />
        </VStack>
      </Container>
      <HStack
        spacing={{ base: 8, md: 20 }}
        justify="space-evenly"
        flexDir="row"
        pb={{ base: 4, md: 8 }}
        w={{ xl:"7xl" }}
      >
        {stats.map((stat, index) => (
          <HStack key={stat.id ?? stat.stat_label} spacing={{ base: 8, md: 20 }}>
            {index > 0 && <Box w="1px" h="120px" bg="rgba(255, 255, 255, 0.15)" />}
            <VStack spacing={1.5}>
              <Text
                fontSize={{ base: "13px", md: "15px", lg: "24px" }}
                fontWeight="600"
                color="var(--accent)"
                textTransform="uppercase"
              >
                {stat.stat_label}
              </Text>
              <Text
                fontSize={{ base: "42px", md: "48px", lg: "52px" }}
                fontWeight="700"
                color="#fff"
                fontFamily="Plus Jakarta Sans"
              >
                {stat.stat_number}
              </Text>
            </VStack>
          </HStack>
        ))}
      </HStack>
    </Box>
  );
}
