"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  gradient?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  hover = true, 
  glow = false,
  gradient = false 
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      className={cn(
        "relative rounded-2xl p-6",
        "bg-white/5 backdrop-blur-xl",
        "border border-white/10",
        hover && "transition-all duration-300 cursor-pointer",
        glow && "shadow-[0_0_30px_rgba(59,130,246,0.3)]",
        gradient && "bg-gradient-to-br from-white/10 to-white/5",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
