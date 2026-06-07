const Interview = require('../models/Interview');
const User = require('../models/User');

exports.getDashboardStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const interviews = await Interview.find({ userId: req.user.id, status: 'completed' });

    const totalInterviews = interviews.length;
    const avgScore = interviews.length > 0
      ? interviews.reduce((sum, i) => sum + i.overallScore, 0) / interviews.length
      : 0;

    const interviewsByType = {
      hr: interviews.filter(i => i.type === 'hr').length,
      technical: interviews.filter(i => i.type === 'technical').length,
      dsa: interviews.filter(i => i.type === 'dsa').length,
      coding: interviews.filter(i => i.type === 'coding').length,
      voice: interviews.filter(i => i.type === 'voice').length
    };

    const recentInterviews = interviews.slice(0, 5);

    const performanceData = interviews.slice(-7).map(i => ({
      date: i.completedAt,
      score: i.overallScore
    }));

    const skillWeaknesses = [];
    const technicalInterviews = interviews.filter(i => i.type === 'technical');
    if (technicalInterviews.length > 0) {
      const lowScoreCategories = {};
      technicalInterviews.forEach(i => {
        if (i.overallScore < 60) {
          lowScoreCategories[i.category] = (lowScoreCategories[i.category] || 0) + 1;
        }
      });
      Object.entries(lowScoreCategories).forEach(([skill, count]) => {
        skillWeaknesses.push({ skill, count });
      });
    }

    res.status(200).json({
      success: true,
      stats: {
        totalInterviews,
        avgScore: Math.round(avgScore),
        dailyStreak: user.dailyStreak,
        interviewsByType,
        recentInterviews,
        performanceData,
        skillWeaknesses
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getPerformanceChart = async (req, res) => {
  try {
    const { period = '7d' } = req.query;

    let days = 7;
    if (period === '30d') days = 30;
    if (period === '90d') days = 90;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const interviews = await Interview.find({
      userId: req.user.id,
      status: 'completed',
      completedAt: { $gte: startDate }
    }).sort('completedAt');

    const chartData = interviews.map(i => ({
      date: i.completedAt,
      score: i.overallScore,
      type: i.type
    }));

    res.status(200).json({
      success: true,
      chartData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
