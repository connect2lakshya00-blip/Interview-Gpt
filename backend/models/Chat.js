const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  conversationId: {
    type: String,
    required: true,
    index: true
  },
  messages: [{
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    audioUrl: {
      type: String
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    metadata: {
      jobSuggestions: [String],
      resources: [String],
      actionItems: [String]
    }
  }],
  context: {
    userProfile: {
      skills: [String],
      experience: String,
      education: String,
      targetRole: String,
      location: String
    },
    recentTopics: [String],
    jobSearchStatus: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

chatSchema.index({ userId: 1, conversationId: 1 });
chatSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Chat', chatSchema);
