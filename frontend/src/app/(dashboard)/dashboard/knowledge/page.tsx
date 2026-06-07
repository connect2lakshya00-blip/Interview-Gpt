"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { BookOpen, Upload, Search, AlertCircle, CheckCircle } from "lucide-react";

export default function KnowledgePage() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
    setError("");
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      setError("Please select files first");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData();
      // Backend expects 'document' field name (single file)
      formData.append("document", files[0]);

      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("Please login first");
        setUploading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/knowledge/upload", {
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
      alert("✓ Documents uploaded successfully!");
      setFiles(null);
      
      // Reset file input
      const fileInput = document.getElementById("knowledge-upload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a search query");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/knowledge/query", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: searchQuery })
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();
      alert(`Found ${data.results?.length || 0} results!`);
    } catch (err) {
      setError("Search failed. Please try again.");
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">Knowledge Base</h1>
        <p className="text-gray-400">Upload and manage your interview preparation materials</p>
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
          <span>Documents uploaded successfully!</span>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard glow>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Upload Documents</h3>
            <p className="text-gray-400 text-sm mb-4">
              Upload PDFs, notes, or study materials
            </p>
            
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              className="hidden"
              id="knowledge-upload"
            />
            
            <label htmlFor="knowledge-upload" className="inline-block cursor-pointer">
              <div className="px-4 py-2 text-sm rounded-xl font-semibold transition-all duration-300 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/50 flex items-center justify-center gap-2">
                Choose Files
              </div>
            </label>

            {files && files.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-gray-400 mb-2">
                  {files.length} file(s) selected
                </p>
                <AnimatedButton 
                  size="sm" 
                  onClick={handleUpload}
                  loading={uploading}
                >
                  {uploading ? "Uploading..." : "Upload"}
                </AnimatedButton>
              </div>
            )}
          </div>
        </GlassCard>

        <GlassCard glow>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Search Knowledge</h3>
            <p className="text-gray-400 text-sm mb-4">
              AI-powered search through your materials
            </p>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter search query..."
              className="w-full mb-3 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-blue-500"
            />
            <AnimatedButton size="sm" variant="outline" onClick={handleSearch}>
              Search
            </AnimatedButton>
          </div>
        </GlassCard>

        <GlassCard glow>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Study Materials</h3>
            <p className="text-gray-400 text-sm mb-4">
              Access your uploaded study resources
            </p>
            <AnimatedButton size="sm" variant="outline">View All</AnimatedButton>
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <h3 className="text-xl font-bold mb-4">Recent Uploads</h3>
        <div className="space-y-3">
          {["Data Structures Notes.pdf", "System Design Guide.pdf", "Behavioral Questions.docx"].map((file, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span>{file}</span>
              </div>
              <span className="text-sm text-gray-400">2 days ago</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
