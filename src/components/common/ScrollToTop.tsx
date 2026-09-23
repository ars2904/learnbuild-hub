"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 p-3.5 rounded-2xl bg-[#0B132B] border-2 border-brand-blue/60 text-white shadow-2xl shadow-brand-blue/30 hover:bg-brand-blue hover:border-brand-blue hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center justify-center backdrop-blur-md"
        >
          <ChevronUp className="w-5 h-5 text-blue-400 group-hover:text-white group-hover:-translate-y-1 transition-all duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
