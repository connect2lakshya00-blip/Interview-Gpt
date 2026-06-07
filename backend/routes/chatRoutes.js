const express = require('express');
const {
  createConversation,
  sendMessage,
  getConversation,
  getAllConversations,
  deleteConversation,
  generateSuggestions,
  uploadPDF
} = require('../controllers/chatController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/conversation', protect, createConversation);
router.post('/message', protect, sendMessage);
router.post('/upload-pdf', protect, upload.single('file'), uploadPDF);
router.get('/conversation/:conversationId', protect, getConversation);
router.get('/conversations', protect, getAllConversations);
router.delete('/conversation/:conversationId', protect, deleteConversation);
router.get('/suggestions/:conversationId', protect, generateSuggestions);

module.exports = router;
