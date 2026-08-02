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
  useToast,
  useColorModeValue,
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

export default function CareerPage() {
  const toast = useToast();
  
  const pageBg = useColorModeValue("#f7f8fc", "#05060A");
  const fieldBg = useColorModeValue("#fff", "rgba(0,0,0,0.6)");
  const fieldBorder = useColorModeValue("#cbd5e1", "#1d4ed8");
  const fieldHoverBorder = useColorModeValue("#94a3b8", "#3b82f6");
  const fieldFocusBorder = useColorModeValue("#3b82f6", "#60a5fa");
  const fieldColor = useColorModeValue("#1e293b", "white");
  const fieldPlaceholder = useColorModeValue("rgba(0,0,0,0.4)", "rgba(255,255,255,0.35)");
  const labelColor = useColorModeValue("#1e40af", "#3b82f6");
  const textColor = useColorModeValue("#1e293b", "#fff");
  const subtextColor = useColorModeValue("#64748b", "rgba(255,255,255,0.45)");
  const selectOptionBg = useColorModeValue("#fff", "#0a0f1e");
  const selectOptionColor = useColorModeValue("#000", "white");
  const dropzoneBgDefault = useColorModeValue("#fff", "rgba(0, 0, 0, 0.4)");
  const dropzoneBorderDefault = useColorModeValue("#cbd5e1", "rgba(29, 78, 216, 0.6)");
  const headingText = useColorModeValue("#3C87F9", "#fff");
  const subHeadingText = useColorModeValue("rgba(0, 0, 0, 0.65)", "#a0aab8");

  const fieldStyle = {
    h: { base: "50px", md: "56px" },
    px: 6,
    borderRadius: "full",
    bg: fieldBg,
    border: `1.5px solid ${fieldBorder}`,
    color: fieldColor,
    fontSize: { base: "14px", md: "15px" },
    _placeholder: { color: fieldPlaceholder },
    _hover: { border: `1.5px solid ${fieldHoverBorder}` },
    _focus: { border: `1.5px solid ${fieldFocusBorder}`, boxShadow: `0 0 0 1px ${fieldHoverBorder}` },
  };

  const selectStyle = {
    h: { base: "50px", md: "56px" },
    borderRadius: "full",
    bg: fieldBg,
    border: `1.5px solid ${fieldBorder}`,
    color: fieldColor,
    fontSize: { base: "14px", md: "15px" },
    _hover: { border: `1.5px solid ${fieldHoverBorder}`, cursor: "pointer" },
    _focus: { border: `1.5px solid ${fieldFocusBorder}`, boxShadow: `0 0 0 1px ${fieldHoverBorder}` },
    iconColor: "#3b82f6",
    iconSize: "16px",
    sx: {
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none",
      option: { bg: selectOptionBg, color: selectOptionColor },
      "& + .chakra-select__icon-wrapper": {
        right: "20px",
        color: "#3b82f6",
        pointerEvents: "none",
      },
    },
  };
  const [form, setForm] = useState({
    position: "Marketing Team",
    employmentType: "Full time",
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [isDragActive, setIsDragActive] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setResumeFile(file);
      if (errors.resumeFile) {
        setErrors((prev) => ({ ...prev, resumeFile: "" }));
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    setResumeFile(file);
    if (file && errors.resumeFile) {
      setErrors((prev) => ({ ...prev, resumeFile: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const tempErrors = {};
    if (!form.fullName.trim()) {
      tempErrors.fullName = "Nama lengkap wajib diisi";
    }
    if (!form.email.trim()) {
      tempErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Format email tidak valid";
    }
    if (!form.phone.trim()) {
      tempErrors.phone = "Nomor telepon wajib diisi";
    }
    if (!form.address.trim()) {
      tempErrors.address = "Alamat wajib diisi";
    }
    if (!resumeFile) {
      tempErrors.resumeFile = "Resume / CV wajib diunggah";
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      toast({
        title: "Gagal Mengirim",
        description: "Harap isi semua field wajib yang kosong.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-center",
      });
      return;
    }

    console.log(form, resumeFile);
    toast({
      title: "Lamaran Berhasil Dikirim!",
      description: "Tim kami akan segera meninjau CV Anda.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-center",
    });

    // Clear form
    setForm({
      position: "Marketing Team",
      employmentType: "Full time",
      fullName: "",
      email: "",
      phone: "",
      address: "",
    });
    setResumeFile(null);
    setErrors({});
  };

  return (
    <Box
      position="relative"
      bg={pageBg}
    >
      {/* Blue glow — top center */}
      <Box
        position="fixed"
        top="-100px"
        left="50%"
        transform="translateX(-50%)"
        w="1200px"
        h="800px"
        style={{
          background: "radial-gradient(ellipse at center, rgba(216, 98, 29, 0.3) 0%, transparent 60%)",
        }}
        pointerEvents="none"
        zIndex={0} />

      <Navbar />

      {/* ── Hero ── */}
      <Box
        position="relative"
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        {/* Blue glow — top center */}
        <Box
          position="absolute"
          top="-60px"
          left="50%"
          transform="translateX(-50%)"
          w="800px"
          h="500px"
          style={{
            background: "radial-gradient(ellipse at center top, rgba(29,78,216,0.45) 0%, transparent 60%)",
          }}
          pointerEvents="none" />

        <Container
          maxW="7xl"
          px={{ base: 6, md: 8 }}
          textAlign="center"
          position="relative"
          zIndex={1}
          pt={{ base: "130px", md: "150px" }}
          pb={{ base: 10, md: 14 }}
        >
          <VStack spacing={{ base: 5, md: 8 }} align="center" textAlign="center" w="full">
            <Box
              display="inline-block"
              bg="linear-gradient(135deg, #E53E3E 0%, #e09f74ff 100%)"
              color="#fff"
              fontSize="lg"
              fontWeight="600"
              px={4}
              py={1}
              borderRadius="full"
            >
              Career
            </Box>

            <Heading
              as="h1"
              fontSize={{ base: "52px", md: "72px", xl: "90px" }}
              color={headingText}
              fontWeight="700"
              lineHeight="1.05"
              letterSpacing="-1.8px"
              fontFamily="Plus Jakarta Sans"
            >
              Your Next Career<br />
              Starts Here With Us.
            </Heading>

            <Text
              fontSize={{ base: "18px", md: "110px", xl: "19px" }}
              color={subHeadingText}
              maxW="2xl"
              lineHeight="1.6"
              opacity={0.85}
            >
              Join ER Communications and grow alongside a team dedicated to
              delivering impactful communication solutions for leading companies.
            </Text>
          </VStack>
        </Container>
      </Box>

      <Container
        maxW="5xl"
        px={{ base: 6, md: 8 }}
        position="relative"
        zIndex={1}
        py={{ base: 20, md: 28 }}
      >
        {/* ── Form ── */}
        <VStack as="form" onSubmit={handleSubmit} spacing={{ base: 5, md: 6 }} align="stretch">
          {/* Position + Employment type */}
          <Flex gap={5} direction={{ base: "column", md: "row" }}>
            <Box flex={1}>
              <Text fontSize={{ base: 'sm', md: 'md' }} color={labelColor} fontWeight="500" mb={2}>
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
              <Text fontSize={{ base: 'sm', md: 'md' }} color={labelColor} fontWeight="500" mb={2}>
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
            <Text fontSize={{ base: 'sm', md: 'md' }} color={labelColor} fontWeight="500" mb={2}>
              Full name *
            </Text>
            <Input
              name="fullName"
              placeholder="Full name"
              value={form.fullName}
              onChange={handleChange}
              {...fieldStyle}
              borderColor={errors.fullName ? "#E53E3E" : fieldBorder}
              _hover={{ borderColor: errors.fullName ? "#E53E3E" : fieldHoverBorder }}
            />
            {errors.fullName && (
              <Text color="#E53E3E" fontSize="xs" mt={1.5} pl={4}>
                {errors.fullName}
              </Text>
            )}
          </Box>

          {/* Email */}
          <Box>
            <Text fontSize={{ base: 'sm', md: 'md' }} color={labelColor} fontWeight="500" mb={2}>
              Email *
            </Text>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              {...fieldStyle}
              borderColor={errors.email ? "#E53E3E" : fieldBorder}
              _hover={{ borderColor: errors.email ? "#E53E3E" : fieldHoverBorder }}
            />
            {errors.email && (
              <Text color="#E53E3E" fontSize="xs" mt={1.5} pl={4}>
                {errors.email}
              </Text>
            )}
          </Box>

          {/* Phone */}
          <Box>
            <Text fontSize={{ base: 'sm', md: 'md' }} color={labelColor} fontWeight="500" mb={2}>
              Phone number *
            </Text>
            <Input
              name="phone"
              type="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={handleChange}
              {...fieldStyle}
              borderColor={errors.phone ? "#E53E3E" : fieldBorder}
              _hover={{ borderColor: errors.phone ? "#E53E3E" : fieldHoverBorder }}
            />
            {errors.phone && (
              <Text color="#E53E3E" fontSize="xs" mt={1.5} pl={4}>
                {errors.phone}
              </Text>
            )}
          </Box>

          {/* Address */}
          <Box>
            <Text fontSize={{ base: 'sm', md: 'md' }} color={labelColor} fontWeight="500" mb={2}>
              Address *
            </Text>
            <Input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              {...fieldStyle}
              borderColor={errors.address ? "#E53E3E" : fieldBorder}
              _hover={{ borderColor: errors.address ? "#E53E3E" : fieldHoverBorder }}
            />
            {errors.address && (
              <Text color="#E53E3E" fontSize="xs" mt={1.5} pl={4}>
                {errors.address}
              </Text>
            )}
          </Box>

          <Box>
            <Text fontSize={{ base: 'sm', md: 'md' }} color={labelColor} fontWeight="500" mb={2}>
              Upload Resume / CV *
            </Text>

            {/* Hidden real file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              style={{ display: "none" }}
              onChange={handleFileChange} />

            {/* Dropzone Container */}
            <Flex
              position="relative"
              align="center"
              justify="space-between"
              w="full"
              minH="130px"
              px={{ base: 6, md: 10 }}
              py={6}
              borderRadius={{ base: "20px", md: "35px" }}
              bg={isDragActive ? "rgba(29, 78, 216, 0.08)" : dropzoneBgDefault}
              border="2px dashed"
              borderColor={resumeFile
                ? "#10B981"
                : errors.resumeFile
                  ? "#E53E3E"
                  : isDragActive
                    ? "#3b82f6"
                    : dropzoneBorderDefault}
              transition="all 0.25s ease"
              _hover={{
                borderColor: resumeFile ? "#10B981" : errors.resumeFile ? "#E53E3E" : "#3b82f6",
                bg: "rgba(29, 78, 216, 0.04)",
              }}
              cursor="pointer"
              onClick={() => fileInputRef.current?.click()}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              {/* Center Content: Icon and Text */}
              <Flex direction="column" align="center" justify="center" flex={1} textAlign="center">
                {/* Small File Icon with Plus */}
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  w="40px"
                  h="40px"
                  borderRadius="full"
                  bg="rgba(59, 130, 246, 0.1)"
                  mb={3}
                  color={errors.resumeFile ? "#E53E3E" : "#3b82f6"}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                </Box>

                {resumeFile ? (
                  <VStack spacing={1}>
                    <Text fontSize="15px" fontWeight="600" color={textColor}>
                      {resumeFile.name}
                    </Text>
                    <Text fontSize="12px" color={subtextColor}>
                      {(resumeFile.size / 1024).toFixed(0)} KB — Ready to send
                    </Text>
                  </VStack>
                ) : (
                  <VStack spacing={1}>
                    <Text fontSize="14px" fontWeight="500" color={textColor}>
                      <Text as="span" color={errors.resumeFile ? "#E53E3E" : "#3B82F6"} fontWeight="600" textDecoration="underline" _hover={{ color: errors.resumeFile ? "#fc8181" : "#60a5fa" }}>
                        Click here
                      </Text>{" "}
                      to upload your file or drag.
                    </Text>
                    <Text fontSize="12px" color={subtextColor}>
                      Supported Format: PDF, DOC, DOCX (10mb max)
                    </Text>
                  </VStack>
                )}
              </Flex>
            </Flex>
            {errors.resumeFile && (
              <Text color="#E53E3E" fontSize="xs" mt={1.5} pl={4}>
                {errors.resumeFile}
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
              bg="var(--accent)"
              color="#fff"
              borderRadius="full"
              px={10}
              h={{ base: "48px", md: "52px" }}
              fontSize={{ base: "14px", md: "15px" }}
              fontWeight="600"
              flexShrink={0}
              _hover={{ opacity: 0.9, transform: "translateY(-2px)" }}
              _active={{ opacity: 0.85 }}
              transition="all 0.2s"
              boxShadow="0 8px 24px rgba(229,62,62,0.35)"
            >
              Send Application
            </Button>

            <Text fontSize={{ base: "sm", md: "md" }} color={subtextColor} lineHeight="1.6">
              By clicking{" "}
              <Text as="span" fontWeight="700" color={textColor}>
                Send application
              </Text>
              , you agree to our User Agreement, Privacy Policy, and Cookie Policy.
            </Text>
          </Flex>
        </VStack>
      </Container>
      <FooterSection />
    </Box>
  );
}
