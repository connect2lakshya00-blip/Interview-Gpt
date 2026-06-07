const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const dsaController = require('../controllers/dsaController');

// Public routes (can browse problems without auth)
router.get('/problems', dsaController.getProblems);
router.get('/problems/:problemId', dsaController.getProblem);

// Protected routes (require authentication)
router.post('/problems/:problemId/submit', protect, dsaController.submitSolution);
router.get('/stats', protect, dsaController.getUserStats);

module.exports = router;
