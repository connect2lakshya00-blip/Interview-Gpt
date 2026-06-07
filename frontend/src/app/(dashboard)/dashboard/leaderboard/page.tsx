"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Trophy, Medal, Award, TrendingUp, Target, Loader2, Crown, Star } from "lucide-react";

interface LeaderboardEntry {
  _id: string;
  userName: string;
  totalPoints: number;
  interviewsCompleted: number;
  averageScore: number;
  tier: string;
  badges: any[];
  rank: number;
}

interface UserRank {
  position: number;
  totalPoints: number;
  tier: string;
}

export default function LeaderboardPage() {
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<UserRank | null>(null);
  const [userRanking, setUserRanking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tiers, setTiers] = useState<any[]>([]);

  useEffect(() => {
    fetchLeaderboard();
    fetchUserRanking();
    fetchTiers();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("http://localhost:5000/api/ranking/leaderboard?limit=50", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        setLeaderboard(data.leaderboard);
        setUserRank(data.userRank);
      }
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    }
  };

  const fetchUserRanking = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/ranking/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        setUserRanking(data.ranking);
      }
    } catch (err) {
      console.error("Failed to fetch user ranking:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTiers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/ranking/tiers", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        setTiers(data.tiers);
      }
    } catch (err) {
      console.error("Failed to fetch tiers:", err);
    }
  };

  const getTierColor = (tier: string) => {
    const colors: { [key: string]: string } = {
      Bronze: "from-orange-700 to-orange-500",
      Silver: "from-gray-400 to-gray-300",
      Gold: "from-yellow-600 to-yellow-400",
      Platinum: "from-slate-400 to-slate-200",
      Diamond: "from-cyan-500 to-blue-400",
      Master: "from-purple-600 to-purple-400",
      Grandmaster: "from-red-600 to-orange-500",
    };
    return colors[tier] || "from-gray-600 to-gray-400";
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-600" />;
    return <span className="text-gray-400">#{rank}</span>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-2">🏆 Leaderboard</h1>
        <p className="text-gray-400">Compete with others and climb the ranks!</p>
      </motion.div>

      {/* User Stats Card */}
      {userRanking && (
        <GlassCard glow className="border-2 border-blue-500/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Your Ranking</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-lg">Rank #{userRank?.position || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span className="text-lg">{userRanking.totalPoints} points</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-500" />
                  <span className="text-lg">{userRanking.interviewsCompleted} interviews</span>
                </div>
              </div>
            </div>
            <div className={`px-6 py-3 rounded-xl bg-gradient-to-r ${getTierColor(userRanking.tier)} text-white font-bold text-xl`}>
              {userRanking.tier}
            </div>
          </div>

          {/* Badges */}
          {userRanking.badges && userRanking.badges.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <h4 className="text-sm font-semibold mb-2">Badges Earned</h4>
              <div className="flex gap-2">
                {userRanking.badges.map((badge: any, i: number) => (
                  <div key={i} className="text-2xl" title={badge.name}>
                    {badge.icon}
                  </div>
                ))}
              </div>
            </div>
          )}
        </GlassCard>
      )}

      {/* Tier Requirements */}
      <GlassCard>
        <h3 className="text-xl font-bold mb-4">Tier System</h3>
        <div className="grid md:grid-cols-4 lg:grid-cols-7 gap-3">
          {tiers.map((tier) => (
            <div key={tier.name} className="text-center">
              <div className={`h-12 rounded-lg bg-gradient-to-r ${getTierColor(tier.name)} flex items-center justify-center mb-2`}>
                <span className="text-white font-bold text-sm">{tier.name}</span>
              </div>
              <p className="text-xs text-gray-400">{tier.minPoints}+ pts</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Leaderboard */}
      <GlassCard>
        <h3 className="text-2xl font-bold mb-6">Top Performers</h3>
        <div className="space-y-3">
          {leaderboard.map((entry) => (
            <div
              key={entry._id}
              className={`flex items-center justify-between p-4 rounded-xl transition ${
                entry.rank <= 3 ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30" : "bg-white/5"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 flex items-center justify-center">
                  {getRankIcon(entry.rank)}
                </div>
                <div>
                  <div className="font-bold text-lg">{entry.userName}</div>
                  <div className="text-sm text-gray-400">{entry.interviewsCompleted} interviews • {entry.averageScore}% avg score</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-400">{entry.totalPoints}</div>
                  <div className="text-xs text-gray-400">points</div>
                </div>
                <div className={`px-4 py-2 rounded-lg bg-gradient-to-r ${getTierColor(entry.tier)} text-white font-semibold text-sm`}>
                  {entry.tier}
                </div>
              </div>
            </div>
          ))}

          {leaderboard.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No rankings yet. Be the first to complete an interview!</p>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Recent Achievements */}
      {userRanking?.achievements && userRanking.achievements.length > 0 && (
        <GlassCard>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Recent Achievements
          </h3>
          <div className="space-y-3">
            {userRanking.achievements.slice(-5).reverse().map((achievement: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="font-semibold">{achievement.title}</div>
                  <div className="text-sm text-gray-400">{achievement.description}</div>
                </div>
                <div className="text-green-400 font-bold">+{achievement.pointsEarned} pts</div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
