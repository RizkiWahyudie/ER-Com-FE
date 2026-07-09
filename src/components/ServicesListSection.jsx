"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Icon,
  Flex,
  Image,
  Portal,
  HStack,
  VStack,
} from "@chakra-ui/react";
import {
  FaArrowRight,
  FaArrowLeft,
  FaPlay,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaImages,
  FaVideo,
} from "react-icons/fa";

// ─── Hierarchical Data (4 levels deep) ──────────────────────────────
const servicesData = [
  {
    title: "Media Relation",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=600&fit=crop",
    colSpan: 1,
    photoCount: 24,
    videoCount: 8,
    children: [
      {
        title: "Prescon",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=600&fit=crop",
        photoCount: 12,
        videoCount: 4,
        children: [
          {
            title: "Prescon 2024",
            image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&h=600&fit=crop",
            photoCount: 6,
            videoCount: 2,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop", videoId: "dQw4w9WgXcQ" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop", videoId: "jNQXAC9IVRw" },
            ],
          },
          {
            title: "Prescon 2023",
            image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=900&h=600&fit=crop",
            photoCount: 5,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop", videoId: "9bZkp7q19f0" },
            ],
          },
          {
            title: "Prescon Q1",
            image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&h=600&fit=crop",
            photoCount: 5,
            videoCount: 2,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop", videoId: "kJQP7kiw5Fk" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop", videoId: "dQw4w9WgXcQ" },
            ],
          },
          {
            title: "Prescon Q2",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&h=600&fit=crop",
            photoCount: 6,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop", videoId: "jNQXAC9IVRw" },
            ],
          },
          {
            title: "Prescon Q3",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=600&fit=crop",
            photoCount: 4,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop", videoId: "9bZkp7q19f0" },
            ],
          },
          {
            title: "Prescon Q4",
            image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&h=600&fit=crop",
            photoCount: 5,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop", videoId: "kJQP7kiw5Fk" },
            ],
          },
        ],
      },
      {
        title: "Press Release",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=900&h=600&fit=crop",
        photoCount: 8,
        videoCount: 3,
        children: [
          {
            title: "Press Release 2024",
            image: "https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=900&h=600&fit=crop",
            photoCount: 4,
            videoCount: 2,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop", videoId: "dQw4w9WgXcQ" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop", videoId: "jNQXAC9IVRw" },
            ],
          },
          {
            title: "Press Release 2023",
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=600&fit=crop",
            photoCount: 4,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop", videoId: "9bZkp7q19f0" },
            ],
          },
        ],
      },
      {
        title: "Media Gathering",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&h=600&fit=crop",
        photoCount: 10,
        videoCount: 3,
        children: [
          {
            title: "Gathering 2024",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&h=600&fit=crop",
            photoCount: 5,
            videoCount: 2,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop", videoId: "dQw4w9WgXcQ" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop", videoId: "jNQXAC9IVRw" },
            ],
          },
          {
            title: "Gathering 2023",
            image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&h=600&fit=crop",
            photoCount: 5,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop", videoId: "9bZkp7q19f0" },
            ],
          },
        ],
      },
      {
        title: "Interview",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&h=600&fit=crop",
        photoCount: 9,
        videoCount: 2,
        children: [
          {
            title: "Interview 2024",
            image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&h=600&fit=crop",
            photoCount: 5,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop", videoId: "kJQP7kiw5Fk" },
            ],
          },
          {
            title: "Interview 2023",
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=600&fit=crop",
            photoCount: 4,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop", videoId: "dQw4w9WgXcQ" },
            ],
          },
        ],
      },
      {
        title: "Media Visit",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&h=600&fit=crop",
        photoCount: 11,
        videoCount: 4,
        children: [
          {
            title: "Media Visit 2024",
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&h=600&fit=crop",
            photoCount: 6,
            videoCount: 2,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop", videoId: "jNQXAC9IVRw" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop", videoId: "9bZkp7q19f0" },
            ],
          },
          {
            title: "Media Visit 2023",
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&h=600&fit=crop",
            photoCount: 5,
            videoCount: 2,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop", videoId: "kJQP7kiw5Fk" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop", videoId: "dQw4w9WgXcQ" },
            ],
          },
        ],
      },
      {
        title: "Press Tour",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&h=600&fit=crop",
        photoCount: 7,
        videoCount: 2,
        children: [
          {
            title: "Press Tour 2024",
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&h=600&fit=crop",
            photoCount: 4,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop", videoId: "jNQXAC9IVRw" },
            ],
          },
          {
            title: "Press Tour 2023",
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=600&fit=crop",
            photoCount: 3,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop", videoId: "9bZkp7q19f0" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Social & Digital",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&h=600&fit=crop",
    colSpan: 1,
    photoCount: 30,
    videoCount: 10,
    children: [
      {
        title: "Social Media Management",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&h=600&fit=crop",
        photoCount: 10,
        videoCount: 3,
        children: [
          {
            title: "Social Media 2024",
            image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&h=600&fit=crop",
            photoCount: 5,
            videoCount: 2,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop", videoId: "dQw4w9WgXcQ" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop", videoId: "jNQXAC9IVRw" },
            ],
          },
          {
            title: "Social Media 2023",
            image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=900&h=600&fit=crop",
            photoCount: 5,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop", videoId: "9bZkp7q19f0" },
            ],
          },
        ],
      },
      {
        title: "Digital Campaign",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop",
        photoCount: 8,
        videoCount: 3,
        children: [
          {
            title: "Campaign 2024",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop",
            photoCount: 4,
            videoCount: 2,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop", videoId: "kJQP7kiw5Fk" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop", videoId: "dQw4w9WgXcQ" },
            ],
          },
          {
            title: "Campaign 2023",
            image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=900&h=600&fit=crop",
            photoCount: 4,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop", videoId: "jNQXAC9IVRw" },
            ],
          },
        ],
      },
      {
        title: "Content Creation",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&h=600&fit=crop",
        photoCount: 7,
        videoCount: 2,
        children: [
          {
            title: "Content 2024",
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&h=600&fit=crop",
            photoCount: 4,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop", videoId: "9bZkp7q19f0" },
            ],
          },
          {
            title: "Content 2023",
            image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&h=600&fit=crop",
            photoCount: 3,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop", videoId: "kJQP7kiw5Fk" },
            ],
          },
        ],
      },
      {
        title: "KOL Management",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&h=600&fit=crop",
        photoCount: 5,
        videoCount: 2,
        children: [
          {
            title: "KOL 2024",
            image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&h=600&fit=crop",
            photoCount: 3,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop", videoId: "dQw4w9WgXcQ" },
            ],
          },
          {
            title: "KOL 2023",
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&h=600&fit=crop",
            photoCount: 2,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop", videoId: "jNQXAC9IVRw" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Media Event",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=600&fit=crop",
    colSpan: 1,
    photoCount: 36,
    videoCount: 12,
    children: [
      {
        title: "Corporate Event",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=600&fit=crop",
        photoCount: 10,
        videoCount: 3,
        children: [
          {
            title: "Corp Event 2024",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=600&fit=crop",
            photoCount: 5,
            videoCount: 2,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop", videoId: "dQw4w9WgXcQ" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop", videoId: "jNQXAC9IVRw" },
            ],
          },
          {
            title: "Corp Event 2023",
            image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&h=600&fit=crop",
            photoCount: 5,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop", videoId: "9bZkp7q19f0" },
            ],
          },
        ],
      },
      {
        title: "Exhibition",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&h=600&fit=crop",
        photoCount: 8,
        videoCount: 3,
        children: [
          {
            title: "Exhibition 2024",
            image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&h=600&fit=crop",
            photoCount: 4,
            videoCount: 2,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop", videoId: "kJQP7kiw5Fk" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop", videoId: "dQw4w9WgXcQ" },
            ],
          },
          {
            title: "Exhibition 2023",
            image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&h=600&fit=crop",
            photoCount: 4,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop", videoId: "jNQXAC9IVRw" },
            ],
          },
        ],
      },
      {
        title: "Launching Event",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&h=600&fit=crop",
        photoCount: 9,
        videoCount: 3,
        children: [
          {
            title: "Launching 2024",
            image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&h=600&fit=crop",
            photoCount: 5,
            videoCount: 2,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop", videoId: "dQw4w9WgXcQ" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop", videoId: "9bZkp7q19f0" },
            ],
          },
          {
            title: "Launching 2023",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&h=600&fit=crop",
            photoCount: 4,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop", videoId: "kJQP7kiw5Fk" },
            ],
          },
        ],
      },
      {
        title: "Gala Dinner",
        image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=900&h=600&fit=crop",
        photoCount: 9,
        videoCount: 3,
        children: [
          {
            title: "Gala Dinner 2024",
            image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=900&h=600&fit=crop",
            photoCount: 5,
            videoCount: 2,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop", videoId: "jNQXAC9IVRw" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop", videoId: "9bZkp7q19f0" },
            ],
          },
          {
            title: "Gala Dinner 2023",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=600&fit=crop",
            photoCount: 4,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop", videoId: "dQw4w9WgXcQ" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Brand & Strategic",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=600&fit=crop",
    colSpan: 1,
    photoCount: 22,
    videoCount: 7,
    children: [
      {
        title: "Brand Activation",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=600&fit=crop",
        photoCount: 8,
        videoCount: 3,
        children: [
          {
            title: "Activation 2024",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=600&fit=crop",
            photoCount: 4,
            videoCount: 2,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop", videoId: "dQw4w9WgXcQ" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop", videoId: "jNQXAC9IVRw" },
            ],
          },
          {
            title: "Activation 2023",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&h=600&fit=crop",
            photoCount: 4,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop", videoId: "9bZkp7q19f0" },
            ],
          },
        ],
      },
      {
        title: "Strategic Communication",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&h=600&fit=crop",
        photoCount: 7,
        videoCount: 2,
        children: [
          {
            title: "Strat Comm 2024",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&h=600&fit=crop",
            photoCount: 4,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop", videoId: "kJQP7kiw5Fk" },
            ],
          },
          {
            title: "Strat Comm 2023",
            image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&h=600&fit=crop",
            photoCount: 3,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop", videoId: "dQw4w9WgXcQ" },
            ],
          },
        ],
      },
      {
        title: "CSR Program",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=600&fit=crop",
        photoCount: 7,
        videoCount: 2,
        children: [
          {
            title: "CSR 2024",
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=600&fit=crop",
            photoCount: 4,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop", videoId: "jNQXAC9IVRw" },
            ],
          },
          {
            title: "CSR 2023",
            image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&h=600&fit=crop",
            photoCount: 3,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop", videoId: "9bZkp7q19f0" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "International Event",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&h=600&fit=crop",
    colSpan: 2,
    photoCount: 28,
    videoCount: 9,
    children: [
      {
        title: "International Conference",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&h=600&fit=crop",
        photoCount: 8,
        videoCount: 3,
        children: [
          {
            title: "Conference 2024",
            image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&h=600&fit=crop",
            photoCount: 4,
            videoCount: 2,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop", videoId: "dQw4w9WgXcQ" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop", videoId: "jNQXAC9IVRw" },
            ],
          },
          {
            title: "Conference 2023",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=600&fit=crop",
            photoCount: 4,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop", videoId: "9bZkp7q19f0" },
            ],
          },
        ],
      },
      {
        title: "Trade Expo",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&h=600&fit=crop",
        photoCount: 7,
        videoCount: 2,
        children: [
          {
            title: "Trade Expo 2024",
            image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&h=600&fit=crop",
            photoCount: 4,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop", videoId: "kJQP7kiw5Fk" },
            ],
          },
          {
            title: "Trade Expo 2023",
            image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&h=600&fit=crop",
            photoCount: 3,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop", videoId: "dQw4w9WgXcQ" },
            ],
          },
        ],
      },
      {
        title: "Overseas Summit",
        image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=900&h=600&fit=crop",
        photoCount: 6,
        videoCount: 2,
        children: [
          {
            title: "Summit 2024",
            image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=900&h=600&fit=crop",
            photoCount: 3,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop", videoId: "jNQXAC9IVRw" },
            ],
          },
          {
            title: "Summit 2023",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=600&fit=crop",
            photoCount: 3,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop", videoId: "9bZkp7q19f0" },
            ],
          },
        ],
      },
      {
        title: "Delegation Visit",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=600&fit=crop",
        photoCount: 7,
        videoCount: 2,
        children: [
          {
            title: "Delegation 2024",
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=600&fit=crop",
            photoCount: 4,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop", videoId: "kJQP7kiw5Fk" },
            ],
          },
          {
            title: "Delegation 2023",
            image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=900&h=600&fit=crop",
            photoCount: 3,
            videoCount: 1,
            media: [
              { type: "photo", src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop" },
              { type: "photo", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" },
              { type: "video", thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop", videoId: "dQw4w9WgXcQ" },
            ],
          },
        ],
      },
    ],
  },
];


// ─── CSS Keyframes ───────────────────────────────────────────────────
const animationStyles = `
  @keyframes slsFadeInUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slsFadeInRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slsFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slsSlideUp {
    from { opacity: 0; transform: translateY(32px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes slsFadeOut {
    from { opacity: 1; }
    to   { opacity: 0; }
  }
  @keyframes slsImgIn {
    from { opacity: 0; transform: scale(0.97); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes slsPopIn {
    from { opacity: 0; transform: scale(0.92) translateY(20px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
`;

// ─── Lightbox (single photo/video fullscreen) ────────────────────────
function MediaLightbox({ media, index, onClose }) {
  const [current, setCurrent] = useState(index);
  const [visible, setVisible] = useState(false);
  const item = media[current];

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 280);
  }, [onClose]);

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + media.length) % media.length);
  }, [media.length]);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % media.length);
  }, [media.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, prev, next]);

  return (
    <Portal>
      {/* Backdrop */}
      <Box
        position="fixed" inset={0} zIndex={10100}
        bg="rgba(0,0,0,0.95)" backdropFilter="blur(20px)"
        style={{ animation: `${visible ? "slsFadeIn" : "slsFadeOut"} 280ms ease both` }}
        onClick={close}
      />

      {/* Panel */}
      <Box
        position="fixed" inset={0} zIndex={10101}
        display="flex" alignItems="center" justifyContent="center"
        px={{ base: 4, md: 10 }} py={{ base: 4, md: 8 }}
        pointerEvents="none"
      >
        <Box
          position="relative" w="full" maxW="960px" pointerEvents="auto"
          style={{
            animation: visible
              ? "slsSlideUp 320ms cubic-bezier(0.34,1.26,0.64,1) both"
              : "slsFadeOut 280ms ease both",
          }}
        >
          {item.type === "video" ? (
            <Box
              borderRadius="20px" overflow="hidden"
              boxShadow="0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)"
              bg="#0a0a0f" pt="56.25%"
              position="relative"
            >
              <Box
                as="iframe" key={current}
                position="absolute" top={0} left={0} w="full" h="full"
                src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0`}
                title={`Video ${current + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen border="none"
              />
            </Box>
          ) : (
            <Box
              borderRadius="20px" overflow="hidden"
              boxShadow="0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)"
              bg="#0a0a0f"
              minH={{ base: "240px", md: "520px" }}
              display="flex" alignItems="center" justifyContent="center"
            >
              <Image
                key={current} src={item.src}
                alt={`Media ${current + 1}`}
                w="full" maxH={{ base: "60vh", md: "78vh" }}
                objectFit="contain"
                style={{ animation: "slsImgIn 300ms ease both" }}
              />
            </Box>
          )}
          <Text textAlign="center" color="rgba(255,255,255,0.6)" fontSize="13px" mt={3} fontWeight="500">
            {current + 1} / {media.length}
          </Text>
        </Box>
      </Box>

      {/* Close */}
      <Flex
        position="fixed" top={{ base: 4, md: 6 }} right={{ base: 4, md: 6 }}
        zIndex={10102} w="44px" h="44px" borderRadius="full"
        bg="rgba(255,255,255,0.08)" border="1px solid rgba(255,255,255,0.12)"
        backdropFilter="blur(8px)" align="center" justify="center"
        cursor="pointer" onClick={close} transition="all 0.2s"
        _hover={{ bg: "rgba(255,255,255,0.18)", transform: "scale(1.08)" }}
      >
        <Icon as={FaTimes} color="#fff" w={4} h={4} />
      </Flex>

      {/* Prev */}
      <Flex
        position="fixed" left={{ base: 3, md: 8 }} top="50%" transform="translateY(-50%)"
        zIndex={10102} w={{ base: "42px", md: "52px" }} h={{ base: "42px", md: "52px" }}
        borderRadius="full" bg="rgba(255,255,255,0.08)" border="1px solid rgba(255,255,255,0.12)"
        backdropFilter="blur(8px)" align="center" justify="center" cursor="pointer"
        onClick={prev} transition="all 0.2s"
        _hover={{ bg: "rgba(255,255,255,0.2)", transform: "translateY(-50%) scale(1.08)" }}
      >
        <Icon as={FaChevronLeft} color="#fff" w={4} h={4} />
      </Flex>

      {/* Next */}
      <Flex
        position="fixed" right={{ base: 3, md: 8 }} top="50%" transform="translateY(-50%)"
        zIndex={10102} w={{ base: "42px", md: "52px" }} h={{ base: "42px", md: "52px" }}
        borderRadius="full" bg="rgba(229,62,62,0.85)" border="1px solid rgba(229,62,62,0.4)"
        backdropFilter="blur(8px)" align="center" justify="center" cursor="pointer"
        onClick={next} transition="all 0.2s"
        _hover={{ bg: "#E53E3E", transform: "translateY(-50%) scale(1.08)" }}
      >
        <Icon as={FaChevronRight} color="#fff" w={4} h={4} />
      </Flex>
    </Portal>
  );
}

// ─── Gallery Popup (Level 4) ─────────────────────────────────────────
function GalleryPopup({ title, photoCount, videoCount, media, onClose }) {
  const [visible, setVisible] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && lightboxIdx === null) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, lightboxIdx]);

  const photos = media.filter((m) => m.type === "photo");
  const videos = media.filter((m) => m.type === "video");

  return (
    <Portal>
      {/* Backdrop */}
      <Box
        position="fixed" inset={0} zIndex={10000}
        bg="rgba(0,0,0,0.92)" backdropFilter="blur(18px)"
        style={{ animation: `${visible ? "slsFadeIn" : "slsFadeOut"} 280ms ease both` }}
        onClick={close}
      />

      {/* Content Panel */}
      <Box
        position="fixed" inset={0} zIndex={10001}
        display="flex" alignItems="flex-start" justifyContent="center"
        overflowY="auto" px={{ base: 4, md: 8 }} py={{ base: 16, md: 12 }}
      >
        <Box
          w="full" maxW="900px" onClick={(e) => e.stopPropagation()}
          style={{
            animation: visible
              ? "slsPopIn 380ms cubic-bezier(0.34,1.26,0.64,1) both"
              : "slsFadeOut 280ms ease both",
          }}
        >
          {/* Header */}
          <VStack spacing={1} mb={8} align="center">
            <Heading
              as="h3" fontSize={{ base: "2xl", md: "3xl" }}
              color="#fff" fontWeight="700" fontFamily="Plus Jakarta Sans"
              textAlign="center"
            >
              {title}
            </Heading>
            <HStack spacing={3}>
              <HStack spacing={1.5}>
                <Icon as={FaImages} color="rgba(255,255,255,0.5)" boxSize={3.5} />
                <Text fontSize="13px" color="rgba(255,255,255,0.5)" fontWeight="500">
                  {photoCount} Foto
                </Text>
              </HStack>
              <Text color="rgba(255,255,255,0.25)" fontSize="13px">•</Text>
              <HStack spacing={1.5}>
                <Icon as={FaVideo} color="rgba(255,255,255,0.5)" boxSize={3} />
                <Text fontSize="13px" color="rgba(255,255,255,0.5)" fontWeight="500">
                  {videoCount} Video
                </Text>
              </HStack>
            </HStack>
          </VStack>

          {/* Photo Grid */}
          {photos.length > 0 && (
            <Grid
              templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
              gap={3} mb={videos.length > 0 ? 6 : 0}
            >
              {photos.map((photo, idx) => (
                <GridItem
                  key={`photo-${idx}`}
                  borderRadius="14px" overflow="hidden" cursor="pointer"
                  position="relative" role="group"
                  h={{ base: "140px", md: "200px" }}
                  onClick={() => setLightboxIdx(idx)}
                  transition="transform 0.3s cubic-bezier(0.34,1.26,0.64,1), box-shadow 0.3s ease"
                  _hover={{
                    transform: "translateY(-3px) scale(1.02)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
                  }}
                  style={{
                    animation: `slsFadeInUp 400ms ease ${idx * 40}ms both`,
                  }}
                >
                  <Image
                    src={photo.src} alt={`Photo ${idx + 1}`}
                    w="full" h="full" objectFit="cover"
                    transition="transform 0.4s ease"
                    _groupHover={{ transform: "scale(1.06)" }}
                  />
                  <Box
                    position="absolute" inset={0}
                    bg="rgba(0,0,0,0)" transition="background 0.3s"
                    _groupHover={{ bg: "rgba(0,0,0,0.3)" }}
                  />
                </GridItem>
              ))}
            </Grid>
          )}

          {/* Video Grid */}
          {videos.length > 0 && (
            <Grid
              templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
              gap={3}
            >
              {videos.map((video, idx) => {
                const mediaIdx = photos.length + idx;
                return (
                  <GridItem
                    key={`video-${idx}`}
                    borderRadius="14px" overflow="hidden" cursor="pointer"
                    position="relative" role="group"
                    h={{ base: "140px", md: "200px" }}
                    onClick={() => setLightboxIdx(mediaIdx)}
                    transition="transform 0.3s cubic-bezier(0.34,1.26,0.64,1), box-shadow 0.3s ease"
                    _hover={{
                      transform: "translateY(-3px) scale(1.02)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
                    }}
                    style={{
                      animation: `slsFadeInUp 400ms ease ${(photos.length + idx) * 40}ms both`,
                    }}
                  >
                    <Image
                      src={video.thumb} alt={`Video ${idx + 1}`}
                      w="full" h="full" objectFit="cover"
                      transition="transform 0.4s ease"
                      _groupHover={{ transform: "scale(1.06)" }}
                    />
                    <Box
                      position="absolute" inset={0}
                      bg="rgba(0,0,0,0.15)" transition="background 0.3s"
                      _groupHover={{ bg: "rgba(0,0,0,0.4)" }}
                    />
                    {/* Play icon */}
                    <Flex position="absolute" inset={0} align="center" justify="center">
                      <Flex
                        w={{ base: "40px", md: "52px" }} h={{ base: "40px", md: "52px" }}
                        borderRadius="full"
                        bg="rgba(255,255,255,0.2)" backdropFilter="blur(6px)"
                        border="2px solid rgba(255,255,255,0.3)"
                        align="center" justify="center"
                        transition="all 0.25s"
                        _groupHover={{ bg: "rgba(255,255,255,0.35)", transform: "scale(1.1)" }}
                      >
                        <Icon as={FaPlay} color="#fff" ml="2px" />
                      </Flex>
                    </Flex>
                  </GridItem>
                );
              })}
            </Grid>
          )}
        </Box>
      </Box>

      {/* Close button */}
      <Flex
        position="fixed" top={{ base: 4, md: 6 }} right={{ base: 4, md: 6 }}
        zIndex={10002} w="44px" h="44px" borderRadius="full"
        bg="rgba(255,255,255,0.08)" border="1px solid rgba(255,255,255,0.12)"
        backdropFilter="blur(8px)" align="center" justify="center"
        cursor="pointer" onClick={close} transition="all 0.2s"
        _hover={{ bg: "rgba(255,255,255,0.18)", transform: "scale(1.08)" }}
      >
        <Icon as={FaTimes} color="#fff" w={4} h={4} />
      </Flex>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <MediaLightbox
          media={media}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </Portal>
  );
}

// ─── Collage Card ────────────────────────────────────────────────────
function CollageCard({ item, index, isLevel1, onClick }) {
  return (
    <GridItem
      colSpan={{ base: 1, md: isLevel1 ? (item.colSpan || 1) : 1 }}
      position="relative"
      borderRadius={{ base: "16px", md: "20px" }}
      overflow="hidden"
      h={{ base: "220px", md: isLevel1 ? (item.colSpan === 2 ? "320px" : "380px") : "280px" }}
      bgImage={`url('${item.image}')`}
      bgSize="cover"
      bgPos="center"
      transition="transform 0.4s ease, box-shadow 0.4s ease"
      _hover={{
        transform: "translateY(-6px)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
        "& > .card-overlay": {
          background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.15) 100%)",
        },
        "& .card-play": {
          transform: "scale(1.12)",
          bg: "rgba(255,255,255,0.3)",
        },
      }}
      cursor="pointer"
      role="group"
      onClick={onClick}
      style={{
        animation: `slsFadeInUp 500ms ease ${index * 80}ms both`,
      }}
    >
      {/* Gradient Overlay */}
      <Box
        className="card-overlay"
        position="absolute"
        inset={0}
        background="linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.25) 100%)"
        transition="background 0.4s ease"
      />

      {/* Play Button */}
      <Flex position="absolute" inset={0} align="center" justify="center" zIndex={2}>
        <Flex
          className="card-play"
          w={{ base: "44px", md: "56px" }}
          h={{ base: "44px", md: "56px" }}
          borderRadius="full"
          bg="rgba(255,255,255,0.18)"
          backdropFilter="blur(8px)"
          border="2px solid rgba(255,255,255,0.25)"
          align="center"
          justify="center"
          transition="all 0.3s ease"
        >
          <Icon as={FaPlay} color="#fff" boxSize={{ base: 4, md: 5 }} ml="2px" />
        </Flex>
      </Flex>

      {/* Title + Stats */}
      <Box position="absolute" bottom={0} left={0} w="full" p={{ base: 4, md: 6 }} zIndex={2}>
        <Heading
          as="h3"
          fontSize={{ base: "lg", md: isLevel1 ? "2xl" : "xl" }}
          color="white"
          fontWeight="700"
          fontFamily="Plus Jakarta Sans"
          mb={1.5}
          textTransform="uppercase"
          letterSpacing="0.5px"
        >
          {item.title}
        </Heading>
        <HStack spacing={2}>
          <Text fontSize={{ base: "11px", md: "12px" }} color="rgba(255,255,255,0.6)" fontWeight="500">
            {item.photoCount} Foto
          </Text>
          <Text fontSize={{ base: "11px", md: "12px" }} color="rgba(255,255,255,0.35)">•</Text>
          <Text fontSize={{ base: "11px", md: "12px" }} color="rgba(255,255,255,0.6)" fontWeight="500">
            {item.videoCount} Video
          </Text>
        </HStack>
      </Box>

      {/* Arrow Icon */}
      <Flex
        position="absolute"
        top={{ base: 4, md: 5 }}
        right={{ base: 4, md: 5 }}
        w={{ base: "32px", md: "40px" }}
        h={{ base: "32px", md: "40px" }}
        borderRadius="full"
        border="1px solid rgba(255,255,255,0.2)"
        bg="rgba(255,255,255,0.06)"
        backdropFilter="blur(8px)"
        color="white"
        align="center"
        justify="center"
        transform="rotate(-45deg)"
        transition="all 0.3s ease"
        _groupHover={{
          transform: "rotate(0deg)",
          bg: "white",
          color: "black",
        }}
        zIndex={2}
      >
        <Icon as={FaArrowRight} boxSize={{ base: 3, md: 3.5 }} />
      </Flex>
    </GridItem>
  );
}

// ─── Main Component ──────────────────────────────────────────────────
export default function ServicesListSection() {
  // Navigation state: array of selected item indices at each level
  const [path, setPath] = useState([]); // e.g. [0] = Media Relation, [0, 0] = Prescon
  const [animKey, setAnimKey] = useState(0);
  const [popupData, setPopupData] = useState(null);
  const containerRef = useRef(null);

  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    if (catParam !== null) {
      const idx = parseInt(catParam, 10);
      if (!isNaN(idx) && idx >= 0 && idx < servicesData.length) {
        setPath([idx]);
        hasInitialized.current = true;
      } else {
        const foundIdx = servicesData.findIndex(
          (s) => s.title.toLowerCase() === catParam.toLowerCase()
        );
        if (foundIdx !== -1) {
          setPath([foundIdx]);
          hasInitialized.current = true;
        }
      }
    }
  }, [catParam]);

  // Derive current items from the path
  const getCurrentItems = useCallback(() => {
    let items = servicesData;
    for (const idx of path) {
      items = items[idx].children;
    }
    return items;
  }, [path]);

  const currentItems = getCurrentItems();
  const currentLevel = path.length + 1; // Level 1, 2, or 3

  // Build breadcrumb titles
  const breadcrumbTitles = path.map((idx, depth) => {
    let items = servicesData;
    for (let d = 0; d < depth; d++) {
      items = items[d === 0 ? path[0] : path[d]].children;
    }
    return items[idx].title;
  });

  // Get the current section title (for Level 2+)
  const currentTitle = breadcrumbTitles.length > 0
    ? breadcrumbTitles[breadcrumbTitles.length - 1]
    : null;

  const handleCardClick = (idx) => {
    const item = currentItems[idx];

    if (currentLevel === 3) {
      // Level 3 → Open popup gallery (Level 4)
      setPopupData(item);
    } else {
      // Level 1 or 2 → Navigate deeper
      setPath((prev) => [...prev, idx]);
      setAnimKey((k) => k + 1);
      // Scroll to section
      if (containerRef.current) {
        const top = containerRef.current.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  const handleBack = () => {
    setPath((prev) => prev.slice(0, -1));
    setAnimKey((k) => k + 1);
  };

  // Grid columns based on level
  const getGridColumns = () => {
    if (currentLevel === 1) {
      return { base: "1fr", md: "repeat(2, 1fr)" };
    }
    return { base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" };
  };

  return (
    <Box w="full" bg="#05060a" pb={{ base: 20, md: 32 }} ref={containerRef}>
      <style>{animationStyles}</style>
      <Container maxW="7xl" px={{ base: 4, md: 6 }} mx="auto">

        {/* Level Header (Back + Title) — shown on Level 2+ */}
        {currentLevel > 1 && (
          <Box
            mb={{ base: 6, md: 10 }}
            style={{ animation: "slsFadeInRight 400ms ease both" }}
            key={`header-${animKey}`}
          >
            {/* Back Button */}
            <Flex
              align="center"
              gap={3}
              cursor="pointer"
              onClick={handleBack}
              role="group"
              mb={4}
              w="fit-content"
            >
              <Flex
                w={{ base: "36px", md: "42px" }}
                h={{ base: "36px", md: "42px" }}
                borderRadius="full"
                border="1px solid rgba(255,255,255,0.15)"
                bg="rgba(255,255,255,0.04)"
                backdropFilter="blur(8px)"
                align="center"
                justify="center"
                transition="all 0.3s ease"
                _groupHover={{
                  bg: "rgba(255,255,255,0.12)",
                  borderColor: "rgba(255,255,255,0.3)",
                  transform: "translateX(-3px)",
                }}
              >
                <Icon as={FaArrowLeft} color="rgba(255,255,255,0.7)" boxSize={3.5} />
              </Flex>
              <Text
                fontSize={{ base: "13px", md: "14px" }}
                color="rgba(255,255,255,0.5)"
                fontWeight="500"
                transition="color 0.2s"
                _groupHover={{ color: "rgba(255,255,255,0.8)" }}
              >
                Back
              </Text>
            </Flex>

            {/* Section Title */}
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "4xl" }}
              color="#fff"
              fontWeight="700"
              fontFamily="Plus Jakarta Sans"
              textAlign="center"
              textTransform="uppercase"
              letterSpacing="1px"
            >
              {currentTitle}
            </Heading>
          </Box>
        )}

        {/* Card Grid */}
        <Grid
          key={`grid-${animKey}`}
          templateColumns={getGridColumns()}
          gap={{ base: 3, md: 5 }}
        >
          {currentItems.map((item, idx) => (
            <CollageCard
              key={`${animKey}-${idx}`}
              item={item}
              index={idx}
              isLevel1={currentLevel === 1}
              onClick={() => handleCardClick(idx)}
            />
          ))}
        </Grid>
      </Container>

      {/* Gallery Popup (Level 4) */}
      {popupData && (
        <GalleryPopup
          title={popupData.title}
          photoCount={popupData.photoCount}
          videoCount={popupData.videoCount}
          media={popupData.media}
          onClose={() => setPopupData(null)}
        />
      )}
    </Box>
  );
}
