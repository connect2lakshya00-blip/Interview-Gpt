const mongoose = require('mongoose');

const rankingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  interviewsCompleted: {
    type: Number,
    default: 0
  },
  averageScore: {
    type: Number,
    default: 0
  },
  rank: {
    type: Number,
    default: 0
  },
  tier: {
    type: String,
    enum: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster'],
    default: 'Bronze'
  },
  breakdown: {
    hrInterviews: { type: Number, default: 0 },
    technicalInterviews: { type: Number, default: 0 },
    dsaProblems: { type: Number, default: 0 },
    voiceInterviews: { type: Number, default: 0 }
  },
  badges: [{
    name: String,
    icon: String,
    earnedAt: Date
  }],
  achievements: [{
    title: String,
    description: String,
    pointsEarned: Number,
    date: Date
  }],
  streakDays: {
    type: Number,
    default: 0
  },
  lastActiveDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Calculate tier based on points
rankingSchema.methods.calculateTier = function() {
  const points = this.totalPoints;
  if (points >= 10000) return 'Grandmaster';
  if (points >= 5000) return 'Master';
  if (points >= 2500) return 'Diamond';
  if (points >= 1000) return 'Platinum';
  if (points >= 500) return 'Gold';
  if (points >= 200) return 'Silver';
  return 'Bronze';
};

// Award badge
rankingSchema.methods.awardBadge = function(name, icon) {
  const exists = this.badges.some(b => b.name === name);
  if (!exists) {
    this.badges.push({ name, icon, earnedAt: Date.now() });
  }
};

// Check and award achievements
rankingSchema.methods.checkAchievements = function() {
  const newAchievements = [];

  // First Interview
  if (this.interviewsCompleted === 1 && !this.achievements.some(a => a.title === 'First Steps')) {
    newAchievements.push({
      title: 'First Steps',
      description: 'Completed your first interview',
      pointsEarned: 50,
      date: Date.now()
    });
    this.totalPoints += 50;
  }

  // 10 Interviews Milestone
  if (this.interviewsCompleted === 10 && !this.achievements.some(a => a.title === 'Interview Warrior')) {
    newAchievements.push({
      title: 'Interview Warrior',
      description: 'Completed 10 interviews',
      pointsEarned: 200,
      date: Date.now()
    });
    this.totalPoints += 200;
    this.awardBadge('Warrior', '⚔️');
  }

  // 50 Interviews Milestone
  if (this.interviewsCompleted === 50 && !this.achievements.some(a => a.title === 'Interview Master')) {
    newAchievements.push({
      title: 'Interview Master',
      description: 'Completed 50 interviews',
      pointsEarned: 500,
      date: Date.now()
    });
    this.totalPoints += 500;
    this.awardBadge('Master', '👑');
  }

  // High Scorer
  if (this.averageScore >= 90 && !this.achievements.some(a => a.title === 'Perfectionist')) {
    newAchievements.push({
      title: 'Perfectionist',
      description: 'Achieved 90%+ average score',
      pointsEarned: 300,
      date: Date.now()
    });
    this.totalPoints += 300;
    this.awardBadge('Perfect', '💯');
  }

  // Week Streak
  if (this.streakDays >= 7 && !this.achievements.some(a => a.title === 'Consistent Performer')) {
    newAchievements.push({
      title: 'Consistent Performer',
      description: '7-day practice streak',
      pointsEarned: 150,
      date: Date.now()
    });
    this.totalPoints += 150;
    this.awardBadge('Streak', '🔥');
  }

  this.achievements.push(...newAchievements);
  return newAchievements;
};

module.exports = mongoose.model('Ranking', rankingSchema);
