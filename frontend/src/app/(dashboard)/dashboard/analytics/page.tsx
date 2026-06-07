"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { GlassCard } from "@/components/ui/glass-card";
import { TrendingUp, Target, Award, Zap, Loader2 } from "lucide-react";

interface DashboardStats {
  totalInterviews: number;
  avgScore: number;
  dailyStreak: number;
  interviewsByType: {
    hr: number;
    technical: number;
    dsa: number;
    coding: number;
    voice: number;
  };
  recentInterviews: any[];
  performanceData: any[];
  skillWeaknesses: any[];
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("http://localhost:5000/api/analytics/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setStats(data.stats);
      } else {
        setError(data.message || "Failed to fetch analytics");
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400">
        {error}
      </div>
    );
  }

  const statCards = [
    { 
      icon: TrendingUp, 
      label: "Total Interviews", 
      value: stats?.totalInterviews || 0, 
      color: "from-blue-500 to-cyan-500" 
    },
    { 
      icon: Target, 
      label: "Average Score", 
      value: `${stats?.avgScore || 0}%`, 
      color: "from-purple-500 to-pink-500" 
    },
    { 
      icon: Award, 
      label: "HR Interviews", 
      value: stats?.interviewsByType.hr || 0, 
      color: "from-green-500 to-emerald-500" 
    },
    { 
      icon: Zap, 
      label: "Streak", 
      value: `${stats?.dailyStreak || 0} days`, 
      color: "from-orange-500 to-red-500" 
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-gray-400">Track your progress and performance</p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <GlassCard key={i} glow>
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
            <div className="text-3xl font-bold">{stat.value}</div>
          </GlassCard>
        ))}
      </div>

      <GlassCard>
        <h3 className="text-xl font-bold mb-4">Interview Breakdown</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-400">{stats?.interviewsByType.technical || 0}</div>
            <div className="text-sm text-gray-400">Technical</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="text-2xl font-bold text-purple-400">{stats?.interviewsByType.dsa || 0}</div>
            <div className="text-sm text-gray-400">DSA</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="text-2xl font-bold text-green-400">{stats?.interviewsByType.voice || 0}</div>
            <div className="text-sm text-gray-400">Voice</div>
          </div>
        </div>
      </GlassCard>

      {stats?.recentInterviews && stats.recentInterviews.length > 0 && (
        <GlassCard>
          <h3 className="text-xl font-bold mb-4">Recent Interviews</h3>
          <div className="space-y-3">
            {stats.recentInterviews.map((interview, i) => (
              <div key={i} className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                <div>
                  <div className="font-semibold capitalize">{interview.type} Interview</div>
                  <div className="text-sm text-gray-400">
                    {new Date(interview.completedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-400">{interview.overallScore}%</div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      <ProgressChart />
    </div>
  );
}
