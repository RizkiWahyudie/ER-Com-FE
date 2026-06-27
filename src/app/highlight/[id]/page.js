"use client";

import { use } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Image,
  Flex,
  Avatar,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { FaArrowLeft, FaClock, FaTag } from "react-icons/fa";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const allProjects = [
  {
    id: "0",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Events",
    readTime: "5 min read",
  },
  {
    id: "1",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=600&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Events",
    readTime: "4 min read",
  },
  {
    id: "2",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=600&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Events",
    readTime: "6 min read",
  },
  {
    id: "3",
    img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=600&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Events",
    readTime: "3 min read",
  },
  {
    id: "4",
    img: "https://images.unsplash.com/photo-1551817958-d9d86fb29431?w=1200&h=600&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Events",
    readTime: "7 min read",
  },
  {
    id: "5",
    img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=600&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Events",
    readTime: "5 min read",
  },
  {
    id: "6",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=600&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Media Relation",
    readTime: "4 min read",
  },
  {
    id: "7",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=600&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "Media Relation",
    readTime: "6 min read",
  },
  {
    id: "8",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=600&fit=crop",
    title: "Lorem ipsum dolor sit ametero irseo",
    desc: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo.",
    author: "Alex Turner",
    date: "August 2, 2021",
    category: "CSR",
    readTime: "5 min read",
  },
];

const articleContent = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
];

function RelatedCard({ id, img, title, author, date, category }) {
  return (
    <Link href={`/highlight/${id}`} style={{ textDecoration: "none" }}>
      <Box
        borderRadius="16px"
        overflow="hidden"
        bg="#fff"
        boxShadow="0 4px 20px rgba(0,0,0,0.12)"
        transition="transform 0.3s cubic-bezier(0.34,1.3,0.64,1), box-shadow 0.3s ease"
        _hover={{
          transform: "translateY(-8px) scale(1.02)",
          boxShadow: "0 20px 40px rgba(37,99,235,0.15)",
        }}
        sx={{
          "&:hover img": { transform: "scale(1.07)" },
        }}
      >
        <Box h="160px" overflow="hidden">
          <Image
            src={img}
            alt={title}
            w="full" h="full"
            objectFit="cover"
            transition="transform 0.45s ease"
          />
        </Box>
        <Box p={4}>
          <Box
            display="inline-block"
            bg="rgba(37,99,235,0.1)"
            color="#2563EB"
            fontSize="11px"
            fontWeight="600"
            px={3} py={0.5}
            borderRadius="full"
            mb={2}
          >
            {category}
          </Box>
          <Text fontSize="14px" fontWeight="700" color="#111" lineHeight="1.45" noOfLines={2} mb={3}>
            {title}
          </Text>
          <HStack spacing={2}>
            <Avatar
              size="xs"
              name={author}
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces"
            />
            <Text fontSize="11px" color="#888">{author} · {date}</Text>
          </HStack>
        </Box>
      </Box>
    </Link>
  );
}

export default function BlogDetailPage({ params }) {
  const { id: rawId } = use(params);
  const id = parseInt(rawId ?? "0");
  const post = allProjects[id] ?? allProjects[0];
  const related = allProjects.filter((_, i) => i !== id).slice(0, 3);

  return (
    <Box
      position="relative"
      bg="#000"
      _before={{
        content: '""',
        position: "fixed",
        inset: 0,
        background:
          "radial-gradient(ellipse at 10% 20%, rgba(29,78,216,0.2) 0%, transparent 50%), " +
          "radial-gradient(ellipse at 88% 75%, rgba(194,65,12,0.22) 0%, transparent 48%)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Navbar />

      {/* ── Hero Banner ── */}
      <Box position="relative" w="full" h={{ base: "320px", md: "520px" }} overflow="hidden">
        <Image
          src={post.img}
          alt={post.title}
          w="full" h="full"
          objectFit="cover"
        />
        <Box
          position="absolute"
          inset={0}
          background="linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)"
        />

        {/* Back button */}
        <Link href="/highlight">
          <Flex
            position="absolute"
            top={{ base: "90px", md: "110px" }}
            left={{ base: 6, md: 12 }}
            align="center"
            gap={2}
            color="#fff"
            fontSize="14px"
            fontWeight="500"
            cursor="pointer"
            opacity={0.85}
            _hover={{ opacity: 1 }}
            transition="opacity 0.2s"
            zIndex={1}
          >
            <Icon as={FaArrowLeft} w={3} h={3} />
            Back to Highlight
          </Flex>
        </Link>

        {/* Category badge */}
        <Box
          position="absolute"
          bottom={{ base: 6, md: 10 }}
          left={{ base: 6, md: 12 }}
          bg="#2563EB"
          color="#fff"
          fontSize="12px"
          fontWeight="600"
          px={4} py={1}
          borderRadius="full"
        >
          {post.category}
        </Box>
      </Box>

      {/* ── Article ── */}
      <Box position="relative" zIndex={1}>
        <Container maxW="780px" px={{ base: 6, md: 8 }} py={{ base: 10, md: 16 }}>
          <VStack align="stretch" spacing={8}>

            {/* Title */}
            <Heading
              as="h1"
              fontSize={{ base: "26px", md: "38px", lg: "44px" }}
              fontWeight="800"
              color="#fff"
              lineHeight="1.2"
              fontFamily="Plus Jakarta Sans"
            >
              {post.title}
            </Heading>

            {/* Meta */}
            <HStack spacing={6} flexWrap="wrap">
              <HStack spacing={3}>
                <Avatar
                  size="sm"
                  name={post.author}
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces"
                />
                <VStack spacing={0} align="flex-start">
                  <Text fontSize="14px" fontWeight="700" color="#fff">{post.author}</Text>
                  <Text fontSize="12px" color="rgba(255,255,255,0.45)">{post.date}</Text>
                </VStack>
              </HStack>
              <HStack spacing={1} color="rgba(255,255,255,0.45)" fontSize="13px">
                <Icon as={FaClock} w={3} h={3} />
                <Text>{post.readTime}</Text>
              </HStack>
              <HStack spacing={1} color="rgba(255,255,255,0.45)" fontSize="13px">
                <Icon as={FaTag} w={3} h={3} />
                <Text>{post.category}</Text>
              </HStack>
            </HStack>

            {/* Divider */}
            <Box h="1px" bg="rgba(255,255,255,0.1)" />

            {/* Lead paragraph */}
            <Text
              fontSize={{ base: "16px", md: "18px" }}
              color="rgba(255,255,255,0.85)"
              lineHeight="1.8"
              fontWeight="500"
            >
              {post.desc}
            </Text>

            {/* Body paragraphs */}
            {articleContent.map((para, i) => (
              <Text
                key={i}
                fontSize={{ base: "15px", md: "16px" }}
                color="rgba(255,255,255,0.6)"
                lineHeight="1.85"
              >
                {para}
              </Text>
            ))}

            {/* Pull quote */}
            <Box
              borderLeft="4px solid #2563EB"
              pl={6}
              py={2}
              my={2}
            >
              <Text
                fontSize={{ base: "17px", md: "20px" }}
                color="#fff"
                fontStyle="italic"
                lineHeight="1.6"
                fontFamily="Plus Jakarta Sans"
              >
                &ldquo;ER Communication partners with brands to strengthen reputation
                and drive meaningful impact across every channel.&rdquo;
              </Text>
            </Box>

            {articleContent.slice(0, 2).map((para, i) => (
              <Text
                key={`b-${i}`}
                fontSize={{ base: "15px", md: "16px" }}
                color="rgba(255,255,255,0.6)"
                lineHeight="1.85"
              >
                {para}
              </Text>
            ))}

            {/* Divider */}
            <Box h="1px" bg="rgba(255,255,255,0.1)" />

            {/* Author card */}
            <Flex
              gap={5}
              align="center"
              bg="rgba(255,255,255,0.04)"
              border="1px solid rgba(255,255,255,0.08)"
              borderRadius="16px"
              p={5}
            >
              <Avatar
                size="lg"
                name={post.author}
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces"
                flexShrink={0}
              />
              <VStack align="flex-start" spacing={1}>
                <Text fontSize="15px" fontWeight="700" color="#fff">{post.author}</Text>
                <Text fontSize="12px" color="rgba(255,255,255,0.4)">Senior PR Consultant · ER Communication</Text>
                <Text fontSize="13px" color="rgba(255,255,255,0.55)" lineHeight="1.6">
                  Helping brands navigate complex media landscapes with clarity and strategic precision.
                </Text>
              </VStack>
            </Flex>
          </VStack>
        </Container>

        {/* ── Related Articles ── */}
        <Box py={{ base: 10, md: 16 }} borderTop="1px solid rgba(255,255,255,0.07)">
          <Container maxW="7xl" px={{ base: 6, md: 8 }}>
            <Heading
              as="h3"
              fontSize={{ base: "22px", md: "28px" }}
              fontWeight="700"
              color="#fff"
              fontFamily="Plus Jakarta Sans"
              mb={8}
            >
              Related Articles
            </Heading>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
              {related.map((item) => (
                <RelatedCard key={item.id} {...item} />
              ))}
            </SimpleGrid>
          </Container>
        </Box>
      </Box>

      <FooterSection />
    </Box>
  );
}
