"use client";

import { motion } from "framer-motion";
import { Brain, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AnimatedButton } from "@/components/ui/animated-button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass-strong rounded-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold">InterviewGPT</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-gray-300 hover:text-white transition">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-300 hover:text-white transition">
                Pricing
              </Link>
              <Link href="/login">
                <AnimatedButton variant="ghost" size="sm">
                  Login
                </AnimatedButton>
              </Link>
              <Link href="/register">
                <AnimatedButton size="sm">
                  Get Started
                </AnimatedButton>
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="md:hidden mt-4 pt-4 border-t border-white/10"
            >
              <div className="flex flex-col gap-4">
                <Link href="#features" className="text-gray-300 hover:text-white transition">
                  Features
                </Link>
                <Link href="#pricing" className="text-gray-300 hover:text-white transition">
                  Pricing
                </Link>
                <Link href="/login" className="text-gray-300 hover:text-white transition">
                  Login
                </Link>
                <Link href="/register">
                  <AnimatedButton className="w-full">
                    Get Started
                  </AnimatedButton>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
