"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Loader2, Clock, CheckCircle, XCircle, Send, ArrowRight } from "lucide-react";

export default function TechnicalSessionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const interviewId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [interview, setInterview] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [timerInterval, setTimerInterval] = useState<any>(null);

  useEffect(() => {
    loadInterview();

    // Start timer
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    setTimerInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const loadInterview = () => {
    try {
      const stored = localStorage.getItem("currentInterview");
      if (stored) {
        const data = JSON.parse(stored);
        setInterview(data);
      }
    } catch (err) {
      console.error("Failed to load interview:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      alert("Please provide an answer");
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/interview/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          interviewId: interview._id,
          questionIndex: currentQuestionIndex,
          answer: answer,
          timeSpent: timeSpent,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setFeedback(data.feedback);
        setTimeSpent(0); // Reset timer for next question
      } else {
        alert(data.message || "Failed to submit answer");
      }
    } catch (err: any) {
      alert(err.message || "Failed to submit answer");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < interview.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer("");
      setFeedback(null);
    } else {
      handleCompleteInterview();
    }
  };

  const handleCompleteInterview = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/interview/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          interviewId: interview._id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("completedInterview", JSON.stringify(data.interview));
        router.push("/dashboard/voice/results");
      }
    } catch (err) {
      console.error("Failed to complete interview:", err);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No interview found</h2>
          <AnimatedButton onClick={() => router.push("/dashboard/technical")}>
            Back to Technical
          </AnimatedButton>
        </div>
      </div>
    );
  }

  const currentQuestion = interview.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / interview.questions.length) * 100;

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Technical Interview</h1>
          <div className="flex items-center gap-2 text-blue-400">
            <Clock className="w-5 h-5" />
            <span className="text-xl font-mono">{formatTime(timeSpent)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/5 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-sm text-gray-400 mt-2">
          Question {currentQuestionIndex + 1} of {interview.questions.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <GlassCard className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Question</h2>
            <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-wrap">
              {currentQuestion.question}
            </p>
          </GlassCard>

          {!feedback ? (
            <GlassCard>
              <h3 className="text-xl font-bold mb-4">Your Answer</h3>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here... Explain your approach, algorithm, time complexity, etc."
                className="w-full h-64 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 resize-none text-gray-300 font-mono"
              />
              <div className="mt-4 flex justify-end">
                <AnimatedButton
                  icon={submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  onClick={handleSubmitAnswer}
                  disabled={submitting || !answer.trim()}
                >
                  {submitting ? "Submitting..." : "Submit Answer"}
                </AnimatedButton>
              </div>
            </GlassCard>
          ) : (
            <GlassCard>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">AI Feedback</h3>
                <div className="flex items-center gap-2">
                  {feedback.score >= 70 ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400" />
                  )}
                  <span className="text-3xl font-bold text-blue-400">{feedback.score}%</span>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6 mb-6">
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {feedback.feedback}
                </p>
              </div>

              <AnimatedButton
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={handleNextQuestion}
                className="w-full"
              >
                {currentQuestionIndex < interview.questions.length - 1
                  ? "Next Question"
                  : "Complete Interview"}
              </AnimatedButton>
            </GlassCard>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
