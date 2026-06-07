"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { User, Bell, Lock, Palette, Loader2, CheckCircle } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    reminders: true,
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      // Get user data from token (decode JWT) or fetch from API
      const userEmail = localStorage.getItem("userEmail") || "user@example.com";
      const userName = localStorage.getItem("userName") || "User";
      
      setUserData({
        name: userName,
        email: userEmail,
      });
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    } finally {
      setUserLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      // Save to localStorage (in production, this would be an API call)
      localStorage.setItem("userName", userData.name);
      localStorage.setItem("userEmail", userData.email);

      setSuccess("Profile updated successfully! ✨");
      
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = () => {
    alert("Password change functionality:\n\nIn production, this would:\n1. Open a modal with password change form\n2. Validate old password\n3. Update to new password\n4. Send confirmation email");
  };

  const handle2FA = () => {
    alert("Two-Factor Authentication:\n\nIn production, this would:\n1. Generate QR code for authenticator app\n2. Verify setup with code\n3. Provide backup codes\n4. Enable 2FA protection");
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </motion.div>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/10 border border-green-500/50 rounded-xl p-4 text-green-400 flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          {success}
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400"
        >
          {error}
        </motion.div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard>
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-bold">Profile Settings</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <AnimatedButton 
              onClick={handleSaveProfile}
              disabled={loading}
              icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
            >
              {loading ? "Saving..." : "Save Changes"}
            </AnimatedButton>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-purple-500" />
            <h3 className="text-xl font-bold">Notifications</h3>
          </div>
          <div className="space-y-4">
            {[
              { key: "email", label: "Email Notifications" },
              { key: "push", label: "Push Notifications" },
              { key: "reminders", label: "Interview Reminders" }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <span>{item.label}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications[item.key as keyof typeof notifications]}
                    onChange={(e) => 
                      setNotifications({ 
                        ...notifications, 
                        [item.key]: e.target.checked 
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6 text-green-500" />
            <h3 className="text-xl font-bold">Security</h3>
          </div>
          <div className="space-y-4">
            <AnimatedButton 
              variant="outline" 
              className="w-full"
              onClick={handlePasswordChange}
            >
              Change Password
            </AnimatedButton>
            <AnimatedButton 
              variant="outline" 
              className="w-full"
              onClick={handle2FA}
            >
              Two-Factor Authentication
            </AnimatedButton>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-pink-500" />
            <h3 className="text-xl font-bold">Appearance</h3>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <button className="flex-1 p-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg">
                Dark
              </button>
              <button className="flex-1 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-not-allowed opacity-50">
                Light (Coming Soon)
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center">Theme preference is automatically applied</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
