const mongoose = require('mongoose');

const knowledgeSchema = new mongoose.Schema({
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
  content: {
    type: String,
    required: true
  },
  vectorIds: [{
    type: String
  }],
  metadata: {
    pageCount: Number,
    wordCount: Number,
    fileSize: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Knowledge', knowledgeSchema);
