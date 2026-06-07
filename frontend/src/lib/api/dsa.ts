import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface DSAProblem {
  _id: string;
  problemId: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  detailedDescription?: string;
  points: number;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  starterCode: string;
  testCases: Array<{
    input: any;
    expected: any;
  }>;
  hints?: string[];
  tags?: string[];
  companies?: string[];
  constraints?: string[];
  solved?: boolean;
  solvedCount?: number;
  attemptCount?: number;
  acceptanceRate?: number;
}

export interface TestResult {
  passed: boolean;
  input?: string;
  expected?: string;
  actual?: string;
  error?: string;
  executionTime?: number;
  hidden?: boolean;
}

export interface SubmissionResult {
  status: string;
  testsPassed: number;
  totalTests: number;
  pointsEarned: number;
  results: TestResult[];
  message: string;
}

export interface UserStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  recentSubmissions: any[];
  categoryStats: Array<{
    _id: string;
    count: number;
  }>;
}

export const dsaApi = {
  // Get all problems with filters
  getProblems: async (params?: {
    search?: string;
    category?: string;
    difficulty?: string;
    tags?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get<{
      problems: DSAProblem[];
      pagination: {
        current: number;
        total: number;
        count: number;
      };
    }>('/dsa/problems', { params });
    return response.data;
  },

  // Get single problem
  getProblem: async (problemId: string) => {
    const response = await api.get<{
      problem: DSAProblem;
      userSubmissions: any[];
      solved: boolean;
    }>(`/dsa/problems/${problemId}`);
    return response.data;
  },

  // Submit solution
  submitSolution: async (problemId: string, code: string) => {
    const response = await api.post<SubmissionResult>(
      `/dsa/problems/${problemId}/submit`,
      { code }
    );
    return response.data;
  },

  // Get user stats
  getUserStats: async () => {
    const response = await api.get<UserStats>('/dsa/stats');
    return response.data;
  },
};
