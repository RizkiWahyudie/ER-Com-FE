"use client";

import { useState, useRef } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Input,
  Button,
  Flex,
  Select,
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const positions = [
  "Marketing Team",
  "Public Relations",
  "Content Creator",
  "Media Relations",
  "Corporate Communications",
  "Digital Strategy",
];

const employmentTypes = ["Full time", "Part time", "Internship", "Freelance"];

const fieldStyle = {
  h: "56px",
  px: 6,
  borderRadius: "full",
  bg: "rgba(0,0,0,0.6)",
  border: "1.5px solid #1d4ed8",
  color: "white",
  fontSize: "15px",
  _placeholder: { color: "rgba(255,255,255,0.35)" },
  _hover: { border: "1.5px solid #3b82f6" },
  _focus: { border: "1.5px solid #60a5fa", boxShadow: "0 0 0 1px #3b82f6" },
};

const selectStyle = {
  ...fieldStyle,
  sx: {
    option: { bg: "#0a0f1e", color: "white" },
  },
};

export default function CareerPage() {
  const [form, setForm] = useState({
    position: "Marketing Team",
    employmentType: "Full time",
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <Box
      position="relative"
      bg="#000"
      minH="100vh"
      overflow="hidden"
    >
      {/* Blue glow — left */}
      <Box
        position="fixed"
        top="10%"
        left="-100px"
        w="500px"
        h="600px"
        style={{
          background: "radial-gradient(ellipse at center, rgba(29,78,216,0.28) 0%, transparent 65%)",
        }}
        pointerEvents="none"
        zIndex={0}
      />
      {/* Orange glow — center */}
      <Box
        position="fixed"
        top="5%"
        left="50%"
        transform="translateX(-50%)"
        w="700px"
        h="500px"
        style={{
          background: "radial-gradient(ellipse at center, rgba(180,60,10,0.35) 0%, transparent 60%)",
        }}
        pointerEvents="none"
        zIndex={0}
      />

      <Navbar />

      <Container
        maxW="800px"
        px={{ base: 6, md: 8 }}
        position="relative"
        zIndex={1}
        pt={{ base: "120px", md: "140px" }}
        pb={{ base: 20, md: 24 }}
      >
        <VStack spacing={12} align="stretch">

          {/* ── Hero Text ── */}
          <VStack spacing={4} textAlign="center">
            <Box
              display="inline-block"
              bg="var(--accent)"
              color="#fff"
              fontSize="13px"
              fontWeight="600"
              px={4}
              py={1}
              borderRadius="full"
            >
              Career
            </Box>

            <Heading
              as="h1"
              fontSize={{ base: "38px", md: "62px", xl: "72px" }}
              fontWeight="800"
              color="#fff"
              lineHeight="1.1"
              letterSpacing="-1.5px"
              fontFamily="Plus Jakarta Sans"
            >
              Your next Career<br />
              Starts Here With Us.
            </Heading>

            <Text
              fontSize={{ base: "14px", md: "15px" }}
              color="rgba(255,255,255,0.45)"
              maxW="460px"
              lineHeight="1.65"
              mx="auto"
            >
              Join ER Communications and grow alongside a team dedicated to
              delivering impactful communication solutions for leading companies.
            </Text>
          </VStack>

          {/* ── Form ── */}
          <VStack as="form" onSubmit={handleSubmit} spacing={6} align="stretch">

            {/* Row 1 — Position + Employment type */}
            <Flex gap={5} direction={{ base: "column", md: "row" }}>
              <Box flex={1}>
                <Text fontSize="13px" color="#3b82f6" fontWeight="500" mb={2}>
                  Position applying for *
                </Text>
                <Select
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  {...selectStyle}
                >
                  {positions.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </Select>
              </Box>

              <Box flex={1}>
                <Text fontSize="13px" color="#3b82f6" fontWeight="500" mb={2}>
                  Employment type *
                </Text>
                <Select
                  name="employmentType"
                  value={form.employmentType}
                  onChange={handleChange}
                  {...selectStyle}
                >
                  {employmentTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </Select>
              </Box>
            </Flex>

            {/* Full Name */}
            <Box>
              <Text fontSize="13px" color="#3b82f6" fontWeight="500" mb={2}>
                Full name *
              </Text>
              <Input
                name="fullName"
                placeholder="Full name"
                value={form.fullName}
                onChange={handleChange}
                {...fieldStyle}
              />
            </Box>

            {/* Email */}
            <Box>
              <Text fontSize="13px" color="#3b82f6" fontWeight="500" mb={2}>
                Email *
              </Text>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                {...fieldStyle}
              />
            </Box>

            {/* Phone */}
            <Box>
              <Text fontSize="13px" color="#3b82f6" fontWeight="500" mb={2}>
                Phone number *
              </Text>
              <Input
                name="phone"
                type="tel"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
                {...fieldStyle}
              />
            </Box>

            {/* Address */}
            <Box>
              <Text fontSize="13px" color="#3b82f6" fontWeight="500" mb={2}>
                Address *
              </Text>
              <Input
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                {...fieldStyle}
              />
            </Box>

            {/* Upload Resume */}
            <Box>
              <Text fontSize="13px" color="#3b82f6" fontWeight="500" mb={2}>
                Upload Resume / CV *
              </Text>

              {/* Hidden real file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                onChange={(e) => setResumeFile(e.target.files[0] || null)}
              />

              {/* Styled trigger */}
              <Flex
                as="button"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                align="center"
                justify="space-between"
                w={{ base: "full", md: "320px" }}
                h="56px"
                px={6}
                borderRadius="full"
                bg="rgba(0,0,0,0.6)"
                border="1.5px solid #1d4ed8"
                cursor="pointer"
                transition="border 0.2s"
                _hover={{ border: "1.5px solid #3b82f6" }}
              >
                <Text
                  fontSize="15px"
                  color={resumeFile ? "#fff" : "rgba(255,255,255,0.35)"}
                  noOfLines={1}
                  textAlign="left"
                  flex={1}
                  mr={3}
                >
                  {resumeFile ? resumeFile.name : "From Files"}
                </Text>
                <Box color="#3b82f6" fontSize="12px" flexShrink={0}>▼</Box>
              </Flex>

              {resumeFile && (
                <Text fontSize="12px" color="rgba(255,255,255,0.4)" mt={1} pl={2}>
                  {(resumeFile.size / 1024).toFixed(0)} KB — {resumeFile.type || "file"}
                </Text>
              )}
            </Box>

            {/* Submit */}
            <Flex
              align={{ base: "flex-start", md: "center" }}
              direction={{ base: "column", md: "row" }}
              gap={{ base: 5, md: 8 }}
              pt={2}
            >
              <Button
                type="submit"
                bg="#2563EB"
                color="#fff"
                borderRadius="full"
                px={10}
                h="52px"
                fontSize="15px"
                fontWeight="600"
                flexShrink={0}
                _hover={{ bg: "#1d4ed8", transform: "translateY(-2px)" }}
                _active={{ bg: "#1e40af" }}
                transition="all 0.2s"
                boxShadow="0 8px 24px rgba(37,99,235,0.4)"
              >
                Send application
              </Button>

              <Text fontSize={{ base: "13px", md: "14px" }} color="rgba(255,255,255,0.5)" lineHeight="1.6">
                By clicking{" "}
                <Text as="span" fontWeight="700" color="rgba(255,255,255,0.8)">
                  Send application
                </Text>
                , you agree to our User Agreement, Privacy Policy, and Cookie Policy.
              </Text>
            </Flex>
          </VStack>
        </VStack>
      </Container>

      <FooterSection />
    </Box>
  );
}
