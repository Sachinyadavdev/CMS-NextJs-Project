"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import RausLogoGif from "../assets/Raus-Logo-gif-unscreen.gif";

interface IntroGifProps {
  children: React.ReactNode;
}

export default function IntroGif({ children }: IntroGifProps) {
  const [showGif, setShowGif] = useState(false);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    if (!hasSeenIntro) {
      setShowGif(true);
      const timer = setTimeout(() => {
        setShowGif(false);
        localStorage.setItem("hasSeenIntro", "true");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {showGif && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
          >
            {/* Background subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                  backgroundSize: "50px 50px",
                }}
              />
            </div>

            <div className="relative flex flex-col items-center justify-center">
              {/* Main logo container */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative"
              >
                {/* Subtle outer glow */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="absolute inset-0 -m-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl blur-xl opacity-50"
                />

                {/* Logo container with subtle border */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-200/50">
                  <Image
                    src={RausLogoGif}
                    alt="RAUS"
                    width={300}
                    height={300}
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Progress bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 3.8, ease: "linear" }}
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent origin-left"
                />
              </motion.div>

              {/* Loading text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-8 text-center"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="text-sm text-gray-600 font-light tracking-wider uppercase"
                >
                  Loading
                </motion.p>

                {/* Subtle dot animation */}
                <motion.div className="flex justify-center space-x-1 mt-3">
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 1 + index * 0.2,
                        duration: 0.3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: 0.4,
                      }}
                      className="w-1 h-1 bg-gray-400 rounded-full"
                    />
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Bottom copyright - subtle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="absolute bottom-8 text-center"
            >
              <p className="text-xs text-gray-400 font-light">RAUS</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
