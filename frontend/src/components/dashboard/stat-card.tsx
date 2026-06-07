"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  gradient: string;
  trend?: "up" | "down";
}

export function StatCard({ title, value, change, icon: Icon, gradient, trend }: StatCardProps) {
  return (
    <GlassCard glow>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-2">{title}</p>
          <h3 className="text-3xl font-bold mb-2">{value}</h3>
          {change && (
            <p className={cn(
              "text-sm font-medium",
              trend === "up" ? "text-green-400" : "text-red-400"
            )}>
              {change}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </GlassCard>
  );
}
