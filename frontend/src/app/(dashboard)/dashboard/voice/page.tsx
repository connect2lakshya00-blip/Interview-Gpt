"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Mic, Play, Volume2, AlertCircle, History, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VoicePage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const handleStartInterview = async () => {
    setIsChecking(true);
    setError("");
    
    try {
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      
      // Redirect to interview session
      router.push("/dashboard/voice/session");
    } catch (err) {
      setError("Microphone permission denied. Please enable microphone access and try again.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleTestAudio = async () => {
    setError("");
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Test text-to-speech
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("Audio test successful! Your microphone is working properly.");
        window.speechSynthesis.speak(utterance);
      }
      
      alert("✓ Microphone working! Audio test successful.");
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      setError("Cannot access microphone. Please check your browser permissions.");
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">Voice Interview</h1>
        <p className="text-gray-400">Practice with voice-based interview simulations</p>
      </motion.div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <GlassCard glow className="max-w-2xl mx-auto">
        <div className="text-center p-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-6">
            <Mic className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Start Voice Interview</h3>
          <p className="text-gray-400 mb-8">
            Practice your communication skills with AI-powered voice interviews
          </p>
          <div className="flex gap-4 justify-center">
            <AnimatedButton 
              icon={<Play className="w-5 h-5" />} 
              size="lg"
              onClick={handleStartInterview}
              loading={isChecking}
              disabled={isChecking}
            >
              {isChecking ? "Checking Audio..." : "Start Interview"}
            </AnimatedButton>
            <AnimatedButton 
              icon={<Volume2 className="w-5 h-5" />} 
              size="lg" 
              variant="outline"
              onClick={handleTestAudio}
            >
              Test Audio
            </AnimatedButton>
          </div>
        </div>
      </GlassCard>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <GlassCard className="text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <Mic className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold mb-2">Voice Recognition</h4>
          <p className="text-sm text-gray-400">
            Real-time speech-to-text transcription
          </p>
        </GlassCard>

        <GlassCard className="text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold mb-2">AI Analysis</h4>
          <p className="text-sm text-gray-400">
            Get detailed feedback on your responses
          </p>
        </GlassCard>

        <GlassCard className="text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <History className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold mb-2">Track Progress</h4>
          <p className="text-sm text-gray-400">
            Review past interviews and improvements
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
