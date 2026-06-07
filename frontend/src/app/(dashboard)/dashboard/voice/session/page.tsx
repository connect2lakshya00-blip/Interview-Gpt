"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Mic, MicOff, Volume2, SkipForward, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

interface Question {
  question: string;
  expectedAnswer?: string;
}

interface Interview {
  _id: string;
  questions: Question[];
  type: string;
}

export default function VoiceSessionPage() {
  const router = useRouter();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [timeSpent, setTimeSpent] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    startInterview();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorder) {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startInterview = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/interview/generate", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: "hr",
          category: "general",
          difficulty: "medium"
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setInterview(data.interview);
      
      // Speak first question
      speakQuestion(data.interview.questions[0].question);
    } catch (err: any) {
      setError(err.message || "Failed to start interview");
    }
  };

  const speakQuestion = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        setAudioChunks(chunks);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setError("");

      // Start timer
      timerRef.current = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    } catch (err) {
      setError("Microphone access denied");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  const submitAnswer = async () => {
    if (!transcript.trim() && audioChunks.length === 0) {
      setError("Please record your answer first");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/interview/submit-answer", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          interviewId: interview?._id,
          questionIndex: currentQuestionIndex,
          answer: transcript || "Voice response recorded",
          timeSpent
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // Move to next question
      if (interview && currentQuestionIndex < interview.questions.length - 1) {
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        setTranscript("");
        setAudioChunks([]);
        setTimeSpent(0);
        speakQuestion(interview.questions[nextIndex].question);
      } else {
        // Complete interview
        completeInterview();
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit answer");
    } finally {
      setIsProcessing(false);
    }
  };

  const completeInterview = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/interview/complete", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          interviewId: interview?._id
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // Redirect to results
      router.push(`/dashboard/voice/results?id=${interview?._id}`);
    } catch (err: any) {
      setError(err.message || "Failed to complete interview");
    }
  };

  const skipQuestion = () => {
    if (interview && currentQuestionIndex < interview.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setTranscript("");
      setAudioChunks([]);
      setTimeSpent(0);
      speakQuestion(interview.questions[nextIndex].question);
    } else {
      completeInterview();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!interview) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GlassCard className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p>Starting your interview...</p>
        </GlassCard>
      </div>
    );
  }

  const currentQuestion = interview.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Voice Interview Session</h1>
            <p className="text-gray-400">
              Question {currentQuestionIndex + 1} of {interview.questions.length}
            </p>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-5 h-5" />
            <span className="font-mono text-lg">{formatTime(timeSpent)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / interview.questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard glow className="p-8">
              <div className="flex items-start gap-4 mb-6">
                {isSpeaking && (
                  <div className="flex gap-1">
                    <div className="w-1 h-8 bg-blue-500 rounded animate-pulse" style={{ animationDelay: '0s' }} />
                    <div className="w-1 h-8 bg-purple-500 rounded animate-pulse" style={{ animationDelay: '0.1s' }} />
                    <div className="w-1 h-8 bg-pink-500 rounded animate-pulse" style={{ animationDelay: '0.2s' }} />
                  </div>
                )}
                <Volume2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Question</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {currentQuestion.question}
                  </p>
                </div>
              </div>

              {/* Recording Status */}
              <div className="flex items-center justify-center py-8">
                <motion.div
                  animate={isRecording ? {
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1]
                  } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                  className={`w-32 h-32 rounded-full flex items-center justify-center ${
                    isRecording
                      ? 'bg-gradient-to-br from-red-500 to-pink-500'
                      : 'bg-gradient-to-br from-blue-500 to-purple-500'
                  }`}
                >
                  {isRecording ? (
                    <MicOff className="w-16 h-16 text-white" />
                  ) : (
                    <Mic className="w-16 h-16 text-white" />
                  )}
                </motion.div>
              </div>

              {/* Transcript */}
              {transcript && (
                <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-sm text-gray-400 mb-2">Your Response:</p>
                  <p className="text-gray-300">{transcript}</p>
                </div>
              )}

              {/* Controls */}
              <div className="flex gap-4 mt-8">
                {!isRecording ? (
                  <AnimatedButton
                    onClick={startRecording}
                    icon={<Mic className="w-5 h-5" />}
                    className="flex-1"
                    disabled={isProcessing}
                  >
                    Start Recording
                  </AnimatedButton>
                ) : (
                  <AnimatedButton
                    onClick={stopRecording}
                    icon={<MicOff className="w-5 h-5" />}
                    variant="secondary"
                    className="flex-1"
                  >
                    Stop Recording
                  </AnimatedButton>
                )}

                <AnimatedButton
                  onClick={submitAnswer}
                  icon={currentQuestionIndex === interview.questions.length - 1 ? <CheckCircle className="w-5 h-5" /> : <SkipForward className="w-5 h-5" />}
                  variant="outline"
                  className="flex-1"
                  disabled={isRecording || isProcessing || (audioChunks.length === 0 && !transcript)}
                  loading={isProcessing}
                >
                  {isProcessing ? "Processing..." : currentQuestionIndex === interview.questions.length - 1 ? "Finish" : "Next Question"}
                </AnimatedButton>

                <AnimatedButton
                  onClick={skipQuestion}
                  variant="ghost"
                  disabled={isRecording || isProcessing}
                >
                  Skip
                </AnimatedButton>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        {/* Tips */}
        <GlassCard className="p-4">
          <p className="text-sm text-gray-400">
            💡 <span className="font-semibold">Tips:</span> Speak clearly, take your time, and provide detailed answers. Your responses are being recorded and analyzed by AI.
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
