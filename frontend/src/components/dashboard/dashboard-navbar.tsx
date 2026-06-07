"use client";

import { Bell, Search, User } from "lucide-react";
import { motion } from "framer-motion";

export function DashboardNavbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-64 right-0 h-20 glass-strong border-b border-white/10 px-8 flex items-center justify-between z-30"
    >
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search interviews, analytics..."
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-white/5 rounded-xl transition">
          <Bell className="w-6 h-6 text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        
        <button className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-xl transition">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold">John Doe</div>
            <div className="text-xs text-gray-400">Pro Member</div>
          </div>
        </button>
      </div>
    </motion.nav>
  );
}
