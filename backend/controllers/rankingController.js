const Ranking = require('../models/Ranking');
const User = require('../models/User');
const Interview = require('../models/Interview');

// Get user rank and stats
exports.getUserRanking = async (req, res) => {
  try {
    let ranking = await Ranking.findOne({ userId: req.user.id });

    if (!ranking) {
      const user = await User.findById(req.user.id);
      ranking = await Ranking.create({
        userId: req.user.id,
        userName: user.name
      });
    }

    // Update tier
    ranking.tier = ranking.calculateTier();
    await ranking.save();

    res.status(200).json({
      success: true,
      ranking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const { limit = 100, category = 'all' } = req.query;

    const rankings = await Ranking.find()
      .sort({ totalPoints: -1 })
      .limit(parseInt(limit))
      .select('userName totalPoints interviewsCompleted averageScore tier badges');

    // Assign ranks
    rankings.forEach((ranking, index) => {
      ranking.rank = index + 1;
    });

    // Find user's rank
    const userRanking = await Ranking.findOne({ userId: req.user.id });
    const userPosition = await Ranking.countDocuments({
      totalPoints: { $gt: userRanking?.totalPoints || 0 }
    }) + 1;

    res.status(200).json({
      success: true,
      leaderboard: rankings,
      userRank: {
        position: userPosition,
        totalPoints: userRanking?.totalPoints || 0,
        tier: userRanking?.tier || 'Bronze'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update ranking after interview
exports.updateRankingAfterInterview = async (interview, userId) => {
  try {
    const user = await User.findById(userId);
    let ranking = await Ranking.findOne({ userId });

    if (!ranking) {
      ranking = await Ranking.create({
        userId,
        userName: user.name
      });
    }

    // Calculate points based on performance
    const basePoints = {
      hr: 50,
      technical: 75,
      dsa: 100,
      voice: 60
    };

    const points = Math.floor((basePoints[interview.type] || 50) * (interview.overallScore / 100));
    
    // Update stats
    ranking.totalPoints += points;
    ranking.interviewsCompleted += 1;
    
    // Recalculate average score
    const allInterviews = await Interview.find({ userId, status: 'completed' });
    const avgScore = allInterviews.reduce((sum, i) => sum + i.overallScore, 0) / allInterviews.length;
    ranking.averageScore = Math.round(avgScore);

    // Update breakdown
    const breakdownKey = `${interview.type}Interviews`;
    if (ranking.breakdown[breakdownKey] !== undefined) {
      ranking.breakdown[breakdownKey] += 1;
    }

    // Update streak
    const today = new Date().setHours(0, 0, 0, 0);
    const lastActive = new Date(ranking.lastActiveDate).setHours(0, 0, 0, 0);
    const daysDiff = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));

    if (daysDiff === 1) {
      ranking.streakDays += 1;
    } else if (daysDiff > 1) {
      ranking.streakDays = 1;
    }
    ranking.lastActiveDate = Date.now();

    // Check for achievements
    const newAchievements = ranking.checkAchievements();

    // Update tier
    ranking.tier = ranking.calculateTier();

    await ranking.save();

    return {
      pointsEarned: points,
      newAchievements,
      currentTier: ranking.tier,
      totalPoints: ranking.totalPoints
    };
  } catch (error) {
    console.error('Error updating ranking:', error);
    return null;
  }
};

// Get tier requirements
exports.getTierRequirements = async (req, res) => {
  try {
    const tiers = [
      { name: 'Bronze', minPoints: 0, maxPoints: 199, color: '#CD7F32' },
      { name: 'Silver', minPoints: 200, maxPoints: 499, color: '#C0C0C0' },
      { name: 'Gold', minPoints: 500, maxPoints: 999, color: '#FFD700' },
      { name: 'Platinum', minPoints: 1000, maxPoints: 2499, color: '#E5E4E2' },
      { name: 'Diamond', minPoints: 2500, maxPoints: 4999, color: '#B9F2FF' },
      { name: 'Master', minPoints: 5000, maxPoints: 9999, color: '#8B00FF' },
      { name: 'Grandmaster', minPoints: 10000, maxPoints: Infinity, color: '#FF4500' }
    ];

    res.status(200).json({
      success: true,
      tiers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = exports;
