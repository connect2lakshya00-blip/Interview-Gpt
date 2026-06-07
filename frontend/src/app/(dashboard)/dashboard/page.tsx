"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { StatCard } from "@/components/dashboard/stat-card";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { GlassCard } from "@/components/ui/glass-card";
import { Target, TrendingUp, Award, Clock, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const name = localStorage.getItem("userName") || "User";
    setUserName(name);
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
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
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return "Just now";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  const totalInterviews = stats?.totalInterviews || 0;
  const avgScore = stats?.avgScore || 0;
  const dailyStreak = stats?.dailyStreak || 0;
  const recentInterviews = stats?.recentInterviews || [];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">Welcome back, {userName}! 👋</h1>
        <p className="text-gray-400">Here&apos;s your interview preparation progress</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Interviews"
          value={totalInterviews}
          change={totalInterviews > 0 ? "Keep going!" : "Start your first interview"}
          icon={Target}
          gradient="from-blue-500 to-cyan-500"
          trend={totalInterviews > 0 ? "up" : undefined}
        />
        <StatCard
          title="Average Score"
          value={`${avgScore}%`}
          change={avgScore > 75 ? "Great performance!" : avgScore > 0 ? "Keep improving" : "No data yet"}
          icon={TrendingUp}
          gradient="from-purple-500 to-pink-500"
          trend={avgScore > 75 ? "up" : undefined}
        />
        <StatCard
          title="Daily Streak"
          value={dailyStreak}
          change={`${dailyStreak} consecutive day${dailyStreak !== 1 ? 's' : ''}`}
          icon={Award}
          gradient="from-green-500 to-emerald-500"
          trend={dailyStreak > 0 ? "up" : undefined}
        />
        <StatCard
          title="HR Interviews"
          value={stats?.interviewsByType?.hr || 0}
          change="Completed"
          icon={Clock}
          gradient="from-orange-500 to-red-500"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ProgressChart />
        
        <GlassCard>
          <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
          {recentInterviews.length > 0 ? (
            <div className="space-y-4">
              {recentInterviews.slice(0, 5).map((interview: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition">
                  <div>
                    <div className="font-semibold capitalize">{interview.type} Interview</div>
                    <div className="text-sm text-gray-400">{formatTimeAgo(interview.completedAt)}</div>
                  </div>
                  <div className="text-2xl font-bold text-blue-400">{interview.overallScore}%</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">No interviews completed yet</p>
              <p className="text-sm text-gray-500">Start your first interview to see your progress here</p>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
