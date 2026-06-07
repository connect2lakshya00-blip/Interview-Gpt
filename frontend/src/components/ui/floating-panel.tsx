"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingPanelProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FloatingPanel({ children, className, delay = 0 }: FloatingPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      className={cn(
        "relative rounded-3xl p-8",
        "bg-gradient-to-br from-white/10 to-white/5",
        "backdrop-blur-2xl border border-white/20",
        "shadow-2xl shadow-blue-500/20",
        className
      )}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
