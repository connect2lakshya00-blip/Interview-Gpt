const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['hr', 'technical', 'dsa', 'coding', 'voice'],
    required: true
  },
  category: {
    type: String,
    default: 'general'
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  questions: [{
    question: String,
    userAnswer: String,
    expectedAnswer: String,
    feedback: String,
    score: Number,
    timeSpent: Number
  }],
  overallScore: {
    type: Number,
    min: 0,
    max: 100
  },
  feedback: {
    confidenceScore: Number,
    communicationScore: Number,
    technicalAccuracy: Number,
    grammarScore: Number,
    strengths: [String],
    improvements: [String],
    aiSummary: String
  },
  duration: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'abandoned'],
    default: 'in-progress'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
});

module.exports = mongoose.model('Interview', interviewSchema);
