const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  extractedText: {
    type: String,
    required: true
  },
  analysis: {
    skills: [String],
    experience: String,
    education: String,
    summary: String,
    strengths: [String],
    weaknesses: [String],
    recommendations: [String]
  },
  atsScore: {
    type: Number,
    min: 0,
    max: 100
  },
  aiGeneratedQuestions: [{
    question: String,
    category: String,
    difficulty: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resume', resumeSchema);
