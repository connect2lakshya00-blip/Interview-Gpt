"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Code,
  MessageSquare,
  Mic,
  FileText,
  BarChart3,
  BookOpen,
  Settings,
  Brain,
  Bot,
  Trophy
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Code, label: "Technical", href: "/dashboard/technical" },
  { icon: MessageSquare, label: "HR Interview", href: "/dashboard/hr-interview" },
  { icon: Code, label: "DSA Practice", href: "/dashboard/dsa" },
  { icon: Mic, label: "Voice Interview", href: "/dashboard/voice" },
  { icon: FileText, label: "Resume", href: "/dashboard/resume" },
  { icon: BookOpen, label: "Knowledge", href: "/dashboard/knowledge" },
  { icon: Bot, label: "AI Assistant", href: "/dashboard/ai-assistant" },
  { icon: Trophy, label: "Leaderboard", href: "/dashboard/leaderboard" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" }
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-64 glass-strong border-r border-white/10 p-6 z-40"
    >
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Brain className="w-8 h-8 text-blue-500" />
        <span className="text-xl font-bold">InterviewGPT</span>
      </Link>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="block">
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer",
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
}
