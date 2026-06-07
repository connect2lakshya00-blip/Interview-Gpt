"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Brain, Code, MessageSquare, BarChart3, Mic, FileText } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced AI evaluates your responses and provides personalized feedback in real-time.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Code,
    title: "Technical Interviews",
    description: "Practice coding challenges with live code execution and instant feedback.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: MessageSquare,
    title: "HR & Behavioral",
    description: "Master behavioral questions with AI-driven conversation practice.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track your progress with detailed analytics and improvement insights.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: Mic,
    title: "Voice Interviews",
    description: "Practice with voice-based interviews for realistic preparation.",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: FileText,
    title: "Resume Analysis",
    description: "Get AI-powered resume feedback and optimization suggestions.",
    gradient: "from-pink-500 to-rose-500"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Powerful Features for
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Interview Success
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to ace your next interview, powered by cutting-edge AI technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="h-full" glow>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
