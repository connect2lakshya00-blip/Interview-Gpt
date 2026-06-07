"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { MessageSquare, Play, Clock, Loader2 } from "lucide-react";

const categories = [
  { 
    id: 1, 
    title: "General Questions",
    category: "general", 
    difficulty: "Easy", 
    time: "15 min",
    description: "Tell me about yourself, strengths, weaknesses",
    icon: MessageSquare
  },
  { 
    id: 2, 
    title: "Behavioral Questions",
    category: "behavioral", 
    difficulty: "Medium", 
    time: "20 min",
    description: "Leadership, teamwork, conflict resolution",
    icon: MessageSquare
  },
  { 
    id: 3, 
    title: "Situational Questions",
    category: "situational", 
    difficulty: "Hard", 
    time: "25 min",
    description: "Problem-solving under pressure, decision-making",
    icon: MessageSquare
  }
];

export default function HRInterviewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const handleStartPractice = async (index: number, category: any) => {
    setLoading(index);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        router.push("/login");
        return;
      }

      const response = await fetch("http://localhost:5000/api/interview/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: "hr",
          category: category.category,
          difficulty: category.difficulty.toLowerCase(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store interview session
        localStorage.setItem("currentInterview", JSON.stringify(data.interview));
        localStorage.setItem("interviewType", "hr");
        
        // Navigate to interview session page (reuse voice session page)
        router.push(`/dashboard/voice/session?id=${data.interview._id}&type=hr`);
      } else {
        setError(data.message || "Failed to start interview");
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect to server");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">HR Interview Practice</h1>
        <p className="text-gray-400">Master behavioral questions with AI feedback</p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400"
        >
          {error}
        </motion.div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <GlassCard key={cat.id} glow>
            <cat.icon className="w-10 h-10 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{cat.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                cat.difficulty === "Easy" ? "bg-green-500/20 text-green-400" :
                cat.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                "bg-red-500/20 text-red-400"
              }`}>
                {cat.difficulty}
              </span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {cat.time}
              </div>
            </div>
            <AnimatedButton 
              icon={loading === i ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />} 
              className="w-full"
              onClick={() => handleStartPractice(i, cat)}
              disabled={loading !== null}
            >
              {loading === i ? "Starting..." : "Start Practice"}
            </AnimatedButton>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
