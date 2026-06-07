"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  CheckCircle, 
  TrendingUp, 
  MessageSquare, 
  Target, 
  Award,
  Home,
  RotateCcw,
  Loader2
} from "lucide-react";

interface Feedback {
  confidenceScore: number;
  communicationScore: number;
  technicalAccuracy: number;
  grammarScore: number;
  strengths: string[];
  improvements: string[];
  aiSummary: string;
}

interface InterviewResult {
  _id: string;
  type: string;
  overallScore: number;
  feedback: Feedback;
  questions: any[];
  completedAt: string;
}

export default function VoiceResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const interviewId = searchParams.get("id");
  
  const [results, setResults] = useState<InterviewResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (interviewId) {
      fetchResults();
    }
  }, [interviewId]);

  const fetchResults = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/interview/${interviewId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setResults(data.interview);
    } catch (err: any) {
      setError(err.message || "Failed to load results");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "from-green-500 to-emerald-500";
    if (score >= 60) return "from-blue-500 to-cyan-500";
    if (score >= 40) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Average";
    return "Needs Improvement";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GlassCard className="p-8 text-center">
          <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin text-blue-500" />
          <p>Loading your results...</p>
        </GlassCard>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GlassCard className="p-8 text-center">
          <p className="text-red-400 mb-4">{error || "Results not found"}</p>
          <AnimatedButton onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </AnimatedButton>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">Interview Results</h1>
        <p className="text-gray-400">Voice Interview Completed</p>
      </motion.div>

      {/* Overall Score */}
      <GlassCard glow className="p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-32 h-32 mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-5xl font-bold mb-2">{Math.round(results.overallScore)}%</h2>
          <p className="text-xl text-gray-300 mb-4">{getScoreLabel(results.overallScore)}</p>
          <p className="text-gray-400">
            Completed {new Date(results.completedAt).toLocaleDateString()}
          </p>
        </motion.div>
      </GlassCard>

      {/* Detailed Scores */}
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { label: "Confidence", score: results.feedback.confidenceScore, icon: TrendingUp },
          { label: "Communication", score: results.feedback.communicationScore, icon: MessageSquare },
          { label: "Technical Accuracy", score: results.feedback.technicalAccuracy, icon: Target },
          { label: "Grammar & Clarity", score: results.feedback.grammarScore, icon: Award }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getScoreColor(item.score)} flex items-center justify-center`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400">{item.label}</p>
                  <p className="text-2xl font-bold">{item.score}%</p>
                </div>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${getScoreColor(item.score)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* AI Summary */}
      <GlassCard>
        <h3 className="text-xl font-bold mb-4">AI Analysis</h3>
        <p className="text-gray-300 leading-relaxed">
          {results.feedback.aiSummary}
        </p>
      </GlassCard>

      {/* Strengths & Improvements */}
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            Strengths
          </h3>
          <ul className="space-y-2">
            {results.feedback.strengths.map((strength, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300">
                <span className="text-green-500 mt-1">•</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-500" />
            Areas for Improvement
          </h3>
          <ul className="space-y-2">
            {results.feedback.improvements.map((improvement, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300">
                <span className="text-blue-500 mt-1">•</span>
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <AnimatedButton
          onClick={() => router.push("/dashboard/voice")}
          icon={<RotateCcw className="w-5 h-5" />}
          className="flex-1"
        >
          Try Another Interview
        </AnimatedButton>
        <AnimatedButton
          onClick={() => router.push("/dashboard")}
          icon={<Home className="w-5 h-5" />}
          variant="outline"
          className="flex-1"
        >
          Back to Dashboard
        </AnimatedButton>
      </div>
    </div>
  );
}
