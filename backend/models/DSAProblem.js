const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  input: mongoose.Schema.Types.Mixed,
  expected: mongoose.Schema.Types.Mixed,
  hidden: { type: Boolean, default: false }
});

const exampleSchema = new mongoose.Schema({
  input: String,
  output: String,
  explanation: String
});

const dsaProblemSchema = new mongoose.Schema({
  problemId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Array', 'String', 'Stack', 'Queue', 'Linked List', 'Tree', 'Graph', 'Dynamic Programming', 'Greedy', 'Backtracking', 'Binary Search', 'Sorting', 'Math', 'Bit Manipulation', 'Design', 'Heap', 'Trie', 'Hash Table', 'Two Pointers', 'Sliding Window']
  },
  description: {
    type: String,
    required: true
  },
  detailedDescription: String,
  constraints: [String],
  points: {
    type: Number,
    required: true
  },
  examples: [exampleSchema],
  starterCode: {
    type: String,
    required: true
  },
  testCases: [testCaseSchema],
  hints: [String],
  tags: [String],
  companies: [String],
  solvedCount: {
    type: Number,
    default: 0
  },
  attemptCount: {
    type: Number,
    default: 0
  },
  acceptanceRate: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for searching
dsaProblemSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('DSAProblem', dsaProblemSchema);
