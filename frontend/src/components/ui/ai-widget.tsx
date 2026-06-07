"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./glass-card";
import { Brain, Sparkles } from "lucide-react";

interface AIWidgetProps {
  title: string;
  description: string;
  status?: "active" | "idle" | "processing";
}

export function AIWidget({ title, description, status = "idle" }: AIWidgetProps) {
  const statusColors = {
    active: "text-green-400",
    idle: "text-gray-400",
    processing: "text-blue-400"
  };

  return (
    <GlassCard glow>
      <div className="flex items-start gap-4">
        <motion.div
          animate={status === "processing" ? {
            rotate: 360,
            scale: [1, 1.1, 1]
          } : {}}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity }
          }}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0"
        >
          <Brain className="w-6 h-6 text-white" />
        </motion.div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold">{title}</h3>
            {status === "processing" && (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
            )}
          </div>
          <p className="text-sm text-gray-400 mb-2">{description}</p>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              status === "active" ? "bg-green-400" :
              status === "processing" ? "bg-blue-400" :
              "bg-gray-400"
            }`} />
            <span className={`text-xs ${statusColors[status]}`}>
              {status === "active" ? "Active" :
               status === "processing" ? "Processing" :
               "Idle"}
            </span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
