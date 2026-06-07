"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Code, Play, Clock, Award, Loader2 } from "lucide-react";

const challenges = [
  { 
    title: "Arrays & Strings", 
    difficulty: "Easy", 
    time: "15 min", 
    points: 100,
    category: "arrays",
    description: "Practice array manipulation and string problems"
  },
  { 
    title: "Data Structures", 
    difficulty: "Medium", 
    time: "30 min", 
    points: 200,
    category: "data-structures",
    description: "Master linked lists, stacks, queues, and trees"
  },
  { 
    title: "System Design", 
    difficulty: "Hard", 
    time: "60 min", 
    points: 500,
    category: "system-design",
    description: "Design scalable distributed systems"
  }
];

export default function TechnicalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const handleStartChallenge = async (index: number, challenge: any) => {
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
          type: "technical",
          category: challenge.category,
          difficulty: challenge.difficulty.toLowerCase(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store interview session
        localStorage.setItem("currentInterview", JSON.stringify(data.interview));
        localStorage.setItem("interviewType", "technical");
        
        // Navigate to interview session page
        router.push(`/dashboard/technical/session?id=${data.interview._id}`);
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
        <h1 className="text-4xl font-bold mb-2">Technical Interviews</h1>
        <p className="text-gray-400">Practice coding challenges with AI feedback</p>
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
        {challenges.map((challenge, i) => (
          <GlassCard key={i} glow>
            <div className="flex items-start justify-between mb-4">
              <Code className="w-10 h-10 text-blue-500" />
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                challenge.difficulty === "Easy" ? "bg-green-500/20 text-green-400" :
                challenge.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                "bg-red-500/20 text-red-400"
              }`}>
                {challenge.difficulty}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{challenge.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {challenge.time}
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4" />
                {challenge.points} pts
              </div>
            </div>
            <AnimatedButton 
              icon={loading === i ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />} 
              className="w-full"
              onClick={() => handleStartChallenge(i, challenge)}
              disabled={loading !== null}
            >
              {loading === i ? "Starting..." : "Start Challenge"}
            </AnimatedButton>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
