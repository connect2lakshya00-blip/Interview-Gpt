"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", score: 65 },
  { name: "Tue", score: 72 },
  { name: "Wed", score: 68 },
  { name: "Thu", score: 78 },
  { name: "Fri", score: 85 },
  { name: "Sat", score: 82 },
  { name: "Sun", score: 90 }
];

export function ProgressChart() {
  return (
    <GlassCard>
      <h3 className="text-xl font-bold mb-6">Performance Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0,0,0,0.8)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px"
            }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: "#3b82f6", r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
