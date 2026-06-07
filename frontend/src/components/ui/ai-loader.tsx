"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";

interface AILoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

export function AILoader({ text = "AI Processing...", size = "md" }: AILoaderProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
          className={sizes[size]}
        >
          <Brain className="w-full h-full text-blue-500" />
        </motion.div>
        
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sparkles className="w-6 h-6 text-purple-500" />
        </motion.div>
      </div>
      
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-sm text-gray-400"
      >
        {text}
      </motion.p>
    </div>
  );
}
