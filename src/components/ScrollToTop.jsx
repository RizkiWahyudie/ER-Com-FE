"use client";

import { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            bottom: "40px",
            right: "40px",
            zIndex: 999,
          }}
        >
          <IconButton
            icon={<ChevronUpIcon w={8} h={8} />}
            onClick={scrollToTop}
            bg="black"
            color="white"
            _dark={{ bg: "white", color: "black", _hover: { bg: "gray.200" } }}
            _hover={{ bg: "gray.800", transform: "scale(1.1)" }}
            transition="all 0.2s"
            isRound
            size="lg"
            w="56px"
            h="56px"
            boxShadow="0px 4px 12px rgba(0, 0, 0, 0.15)"
            aria-label="Scroll to top"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
