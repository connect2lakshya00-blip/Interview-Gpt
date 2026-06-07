const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getUserRanking,
  getLeaderboard,
  getTierRequirements
} = require('../controllers/rankingController');

router.get('/user', protect, getUserRanking);
router.get('/leaderboard', protect, getLeaderboard);
router.get('/tiers', protect, getTierRequirements);

module.exports = router;
