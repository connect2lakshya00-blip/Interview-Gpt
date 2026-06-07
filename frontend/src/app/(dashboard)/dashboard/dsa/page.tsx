"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Code, Play, Award, Search, Filter, X, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { dsaApi, DSAProblem } from "@/lib/api/dsa";

const categories = ["All", "Array", "String", "Stack", "Queue", "Linked List", "Tree", "Graph", "Dynamic Programming", "Greedy", "Backtracking", "Binary Search", "Sorting", "Math", "Bit Manipulation", "Design", "Heap", "Trie", "Hash Table", "Two Pointers", "Sliding Window"];
const difficulties = ["All", "Easy", "Medium", "Hard"];

export default function DSAPage() {
  const [problems, setProblems] = useState<DSAProblem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProblems();
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const data = await dsaApi.getProblems({
        search: searchQuery || undefined,
        category: selectedCategory !== "All" ? selectedCategory : undefined,
        difficulty: selectedDifficulty !== "All" ? selectedDifficulty : undefined,
        limit: 100
      });
      setProblems(data.problems);
    } catch (error) {
      console.error('Failed to fetch problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProblems = problems;

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedDifficulty("All");
  };

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "All" || selectedDifficulty !== "All";

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">DSA Practice</h1>
        <p className="text-gray-400">Solve data structures and algorithms problems</p>
      </motion.div>

      {/* Search Bar */}
      <GlassCard>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search problems by name, description, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition flex items-center gap-2 justify-center"
          >
            <Filter className="w-5 h-5" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                Active
              </span>
            )}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-white/10"
          >
            <div className="grid md:grid-cols-2 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition ${
                        selectedCategory === category
                          ? "bg-blue-600 text-white"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Difficulty</label>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map(difficulty => (
                    <button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition ${
                        selectedDifficulty === difficulty
                          ? difficulty === "Easy" ? "bg-green-600 text-white" :
                            difficulty === "Medium" ? "bg-yellow-600 text-white" :
                            difficulty === "Hard" ? "bg-red-600 text-white" :
                            "bg-blue-600 text-white"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm flex items-center gap-2 transition"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              </div>
            )}
          </motion.div>
        )}
      </GlassCard>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-400">
          Showing {filteredProblems.length} problems
        </p>
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center gap-2">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery("")} className="hover:text-blue-300">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory !== "All" && (
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm flex items-center gap-2">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("All")} className="hover:text-purple-300">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedDifficulty !== "All" && (
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm flex items-center gap-2">
                {selectedDifficulty}
                <button onClick={() => setSelectedDifficulty("All")} className="hover:text-green-300">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Problems Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : filteredProblems.length > 0 ? (
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredProblems.map((problem, i) => (
            <motion.div
              key={problem.problemId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard glow>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{problem.title}</h3>
                      {problem.solved && (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{problem.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-block text-xs px-2 py-1 rounded bg-white/5 text-gray-400">
                        {problem.category}
                      </span>
                      {problem.tags && problem.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="inline-block text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                    problem.difficulty === "Easy" ? "bg-green-500/20 text-green-400" :
                    problem.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-red-500/20 text-red-400"
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {problem.points} points
                    </div>
                    {problem.acceptanceRate !== undefined && (
                      <span className="text-xs">
                        {problem.acceptanceRate.toFixed(0)}% acceptance
                      </span>
                    )}
                  </div>
                  <Link href={`/dashboard/dsa/${problem.problemId}`}>
                    <AnimatedButton icon={<Play className="w-4 h-4" />}>
                      {problem.solved ? "Solve Again" : "Solve Problem"}
                    </AnimatedButton>
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      ) : (
        <GlassCard>
          <div className="text-center py-12">
            <Code className="w-16 h-16 mx-auto mb-4 text-gray-500 opacity-50" />
            <h3 className="text-xl font-bold mb-2">No problems found</h3>
            <p className="text-gray-400 mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            >
              Clear All Filters
            </button>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
