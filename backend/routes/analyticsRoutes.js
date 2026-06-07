const express = require('express');
const {
  getDashboardStats,
  getPerformanceChart
} = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', protect, getDashboardStats);
router.get('/performance', protect, getPerformanceChart);

module.exports = router;
