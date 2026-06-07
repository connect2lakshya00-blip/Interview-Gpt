"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setFile(selectedFile);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("Please login first");
        setUploading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/resume/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setSuccess(true);
      alert("✓ Resume uploaded successfully! Analysis in progress...");
      setFile(null);
      
      // Reset file input
      const fileInput = document.getElementById("resume-upload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">Resume Analysis</h1>
        <p className="text-gray-400">Get AI-powered feedback on your resume</p>
      </motion.div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm">
          <CheckCircle className="w-5 h-5" />
          <span>Resume uploaded successfully!</span>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard glow>
          <div className="text-center p-8">
            <div className="w-20 h-20 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
              <Upload className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Upload Resume</h3>
            <p className="text-gray-400 mb-6">
              Upload your resume for AI analysis and feedback
            </p>
            
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              id="resume-upload"
            />
            
            <label htmlFor="resume-upload" className="inline-block cursor-pointer">
              <div className="px-6 py-3 text-base rounded-xl font-semibold transition-all duration-300 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/50 flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" />
                Choose File
              </div>
            </label>
            
            {file && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-3">Selected: {file.name}</p>
                <AnimatedButton 
                  onClick={handleUpload}
                  loading={uploading}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload Resume"}
                </AnimatedButton>
              </div>
            )}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-bold mb-4">Analysis Results</h3>
          <div className="space-y-4">
            {[
              { label: "Format Score", score: 85, color: "from-green-500 to-emerald-500" },
              { label: "Content Quality", score: 78, color: "from-blue-500 to-cyan-500" },
              { label: "Keywords Match", score: 92, color: "from-purple-500 to-pink-500" }
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">{item.label}</span>
                  <span className="text-sm font-bold">{item.score}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${item.color}`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Upload a resume to see detailed analysis
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
