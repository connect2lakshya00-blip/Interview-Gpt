const mongoose = require('mongoose');

const dsaSubmissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DSAProblem',
    required: true,
    index: true
  },
  problemId: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'javascript'
  },
  status: {
    type: String,
    enum: ['Accepted', 'Wrong Answer', 'Runtime Error', 'Time Limit Exceeded', 'Compilation Error'],
    required: true
  },
  testsPassed: Number,
  totalTests: Number,
  executionTime: Number,
  memoryUsed: Number,
  pointsEarned: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Compound index for finding user's submissions for a specific problem
dsaSubmissionSchema.index({ user: 1, problem: 1 });

module.exports = mongoose.model('DSASubmission', dsaSubmissionSchema);
