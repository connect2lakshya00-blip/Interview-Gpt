const express = require('express');
const {
  generateInterview,
  submitAnswer,
  completeInterview,
  getInterviews,
  getInterviewById
} = require('../controllers/interviewController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/generate', protect, generateInterview);
router.post('/submit-answer', protect, submitAnswer);
router.post('/complete', protect, completeInterview);
router.get('/', protect, getInterviews);
router.get('/:id', protect, getInterviewById);

module.exports = router;
