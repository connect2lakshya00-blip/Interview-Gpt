"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  animate?: boolean;
}

export function GradientBorder({ 
  children, 
  className, 
  borderWidth = 2,
  animate = true 
}: GradientBorderProps) {
  return (
    <div className={cn("relative rounded-2xl p-[2px]", className)}>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        animate={animate ? {
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: "200% 200%"
        }}
      />
      <div className="relative bg-black rounded-2xl">
        {children}
      </div>
    </div>
  );
}
