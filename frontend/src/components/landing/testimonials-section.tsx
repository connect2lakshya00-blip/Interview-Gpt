"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer at Google",
    avatar: "SJ",
    rating: 5,
    text: "InterviewGPT helped me land my dream job at Google. The AI feedback was incredibly accurate and helped me improve my technical interview skills significantly."
  },
  {
    name: "Michael Chen",
    role: "Product Manager at Meta",
    avatar: "MC",
    rating: 5,
    text: "The behavioral interview practice was game-changing. I felt so much more confident going into my interviews after using this platform."
  },
  {
    name: "Emily Rodriguez",
    role: "Data Scientist at Amazon",
    avatar: "ER",
    rating: 5,
    text: "The analytics dashboard helped me identify my weak areas and track my improvement over time. Absolutely worth every penny!"
  },
  {
    name: "David Kim",
    role: "Full Stack Developer at Netflix",
    avatar: "DK",
    rating: 5,
    text: "Best interview prep platform I've used. The AI is incredibly smart and provides feedback that's actually useful."
  },
  {
    name: "Jessica Taylor",
    role: "UX Designer at Apple",
    avatar: "JT",
    rating: 5,
    text: "The voice interview feature made me so much more comfortable with verbal communication. Highly recommend!"
  },
  {
    name: "Alex Martinez",
    role: "DevOps Engineer at Microsoft",
    avatar: "AM",
    rating: 5,
    text: "InterviewGPT's technical interview practice is unmatched. It covers everything from algorithms to system design."
  }
];

export function TestimonialsSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Loved by
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Thousands of Users
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See what our users have to say about their interview preparation journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="h-full">
                <Quote className="w-10 h-10 text-blue-500/30 mb-4" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
