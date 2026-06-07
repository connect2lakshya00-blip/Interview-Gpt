"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Play, CheckCircle, XCircle, ArrowLeft, Award, Lightbulb, TrendingUp, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { dsaApi, DSAProblem, SubmissionResult } from "@/lib/api/dsa";

export default function DSAProblemPage({ params }: { params: { problemId: string } }) {
  const router = useRouter();
  const [problem, setProblem] = useState<DSAProblem | null>(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);

  useEffect(() => {
    fetchProblem();
  }, [params.problemId]);

  const fetchProblem = async () => {
    try {
      setLoading(true);
      const data = await dsaApi.getProblem(params.problemId);
      setProblem(data.problem);
      setCode(data.problem.starterCode);
    } catch (error) {
      console.error('Failed to fetch problem:', error);
    } finally {
      setLoading(false);
    }
  };

  const runCode = async () => {
    if (!problem) return;

    setIsRunning(true);
    setOutput("");
    setTestResults([]);
    setSubmissionResult(null);

    try {
      const result = await dsaApi.submitSolution(params.problemId, code);
      setSubmissionResult(result);
      setTestResults(result.results);
      setOutput(result.message);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to run code';
      setOutput(`Error: ${errorMessage}`);
      if (error.response?.data?.results) {
        setTestResults(error.response.data.results);
      }
    } finally {
      setIsRunning(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Problem not found</h2>
        <AnimatedButton onClick={() => router.push('/dashboard/dsa')}>
          Back to Problems
        </AnimatedButton>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{problem.title}</h1>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              problem.difficulty === "Easy" ? "bg-green-500/20 text-green-400" :
              problem.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
              "bg-red-500/20 text-red-400"
            }`}>
              {problem.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400">
              {problem.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-400">
              <Award className="w-4 h-4" />
              {problem.points} points
            </span>
            {problem.acceptanceRate !== undefined && (
              <span className="flex items-center gap-1 text-sm text-gray-400">
                <TrendingUp className="w-4 h-4" />
                {problem.acceptanceRate.toFixed(0)}% acceptance
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Problem Description */}
        <div className="space-y-6">
          <GlassCard>
            <h3 className="font-bold text-lg mb-3">Problem Description</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              {problem.detailedDescription || problem.description}
            </p>

            {problem.constraints && problem.constraints.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-sm mb-2">Constraints:</h4>
                <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                  {problem.constraints.map((constraint, i) => (
                    <li key={i}>{constraint}</li>
                  ))}
                </ul>
              </div>
            )}
          </GlassCard>

          <GlassCard>
            <h3 className="font-bold text-lg mb-3">Examples</h3>
            <div className="space-y-4">
              {problem.examples.map((ex, i) => (
                <div key={i} className="p-3 bg-white/5 rounded-lg">
                  <div className="text-sm mb-2">
                    <span className="text-gray-400">Input:</span>
                    <span className="ml-2 text-blue-400 font-mono">{ex.input}</span>
                  </div>
                  <div className="text-sm mb-2">
                    <span className="text-gray-400">Output:</span>
                    <span className="ml-2 text-green-400 font-mono">{ex.output}</span>
                  </div>
                  {ex.explanation && (
                    <div className="text-sm text-gray-400">
                      <span className="font-semibold">Explanation:</span> {ex.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Hints */}
          {problem.hints && problem.hints.length > 0 && (
            <GlassCard>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  Hints
                </h3>
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  {showHints ? "Hide" : "Show"} Hints
                </button>
              </div>
              {showHints && (
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                  {problem.hints.map((hint, i) => (
                    <li key={i}>{hint}</li>
                  ))}
                </ol>
              )}
            </GlassCard>
          )}

          {/* Tags & Companies */}
          {(problem.tags || problem.companies) && (
            <GlassCard>
              {problem.tags && problem.tags.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-sm font-semibold mb-2">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {problem.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {problem.companies && problem.companies.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-2">Companies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {problem.companies.map(company => (
                      <span key={company} className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded text-xs">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </GlassCard>
          )}

          {/* Test Results */}
          {testResults.length > 0 && (
            <GlassCard>
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                Test Results
                {submissionResult && (
                  <span className={`text-sm ${
                    submissionResult.status === 'Accepted' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    ({submissionResult.testsPassed}/{submissionResult.totalTests} passed)
                  </span>
                )}
              </h3>
              <div className="space-y-2">
                {testResults.map((result, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border ${
                      result.passed
                        ? "bg-green-500/10 border-green-500/30"
                        : "bg-red-500/10 border-red-500/30"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {result.passed ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                      <span className="font-semibold">
                        Test Case {i + 1}
                        {result.hidden && <span className="ml-2 text-xs text-gray-400">(Hidden)</span>}
                      </span>
                      {result.executionTime && (
                        <span className="ml-auto text-xs text-gray-400">
                          {result.executionTime}ms
                        </span>
                      )}
                    </div>
                    {!result.passed && !result.hidden && (
                      <div className="text-sm space-y-1 ml-6">
                        {result.input && result.input !== 'Hidden Test Case' && (
                          <div>
                            <span className="text-gray-400">Input:</span>
                            <span className="ml-2 text-blue-400 font-mono">{result.input}</span>
                          </div>
                        )}
                        {result.expected && result.expected !== 'Hidden' && (
                          <div>
                            <span className="text-gray-400">Expected:</span>
                            <span className="ml-2 text-green-400 font-mono">{result.expected}</span>
                          </div>
                        )}
                        {result.actual && result.actual !== 'Hidden' && (
                          <div>
                            <span className="text-gray-400">Got:</span>
                            <span className="ml-2 text-red-400 font-mono">{result.actual}</span>
                          </div>
                        )}
                        {result.error && (
                          <div className="text-red-400">
                            Error: {result.error}
                          </div>
                        )}
                      </div>
                    )}
                    {result.hidden && !result.passed && (
                      <div className="text-sm ml-6 text-gray-400">
                        This is a hidden test case. Your solution failed for some edge cases.
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {submissionResult && submissionResult.pointsEarned > 0 && (
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                  <Award className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-green-400 font-semibold">
                    You earned {submissionResult.pointsEarned} points!
                  </p>
                </div>
              )}
            </GlassCard>
          )}
        </div>

        {/* Code Editor */}
        <div className="space-y-6">
          <GlassCard>
            <h3 className="font-bold text-lg mb-3">Your Solution</h3>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-96 px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 font-mono text-sm resize-none"
              spellCheck={false}
              placeholder="Write your solution here..."
            />
            <div className="mt-4 flex gap-3">
              <AnimatedButton
                icon={<Play className="w-4 h-4" />}
                onClick={runCode}
                loading={isRunning}
                disabled={isRunning || !code.trim()}
                className="flex-1"
              >
                {isRunning ? "Running..." : "Submit Solution"}
              </AnimatedButton>
            </div>
          </GlassCard>

          {output && (
            <GlassCard>
              <h3 className="font-bold text-lg mb-3">Output</h3>
              <div className={`p-4 rounded-lg font-mono text-sm whitespace-pre-wrap ${
                output.includes("🎉") || output.includes("✅") ? "bg-green-500/10 text-green-400" :
                output.includes("❌") || output.includes("Error") ? "bg-red-500/10 text-red-400" :
                "bg-white/5"
              }`}>
                {output}
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
