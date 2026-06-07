const Interview = require('../models/Interview');
const User = require('../models/User');
const {
  generateHRQuestions,
  generateTechnicalQuestions,
  generateDSAQuestions,
  analyzeFeedback
} = require('../services/aiService');
const { updateRankingAfterInterview } = require('./rankingController');

exports.generateInterview = async (req, res) => {
  try {
    const { type, category, difficulty } = req.body;

    let questions = [];

    switch (type) {
      case 'hr':
        questions = await generateHRQuestions(category);
        break;
      case 'technical':
        questions = await generateTechnicalQuestions(category, difficulty);
        break;
      case 'dsa':
        questions = await generateDSAQuestions(category, difficulty);
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid interview type'
        });
    }

    const interview = await Interview.create({
      userId: req.user.id,
      type,
      category,
      difficulty,
      questions: questions.map(q => ({ question: q.question, expectedAnswer: q.expectedAnswer }))
    });

    res.status(201).json({
      success: true,
      interview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.submitAnswer = async (req, res) => {
  try {
    const { interviewId, questionIndex, answer, timeSpent } = req.body;

    const interview = await Interview.findOne({
      _id: interviewId,
      userId: req.user.id
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    const question = interview.questions[questionIndex];
    const feedback = await analyzeFeedback(question.question, answer, question.expectedAnswer);

    interview.questions[questionIndex].userAnswer = answer;
    interview.questions[questionIndex].feedback = feedback.feedback;
    interview.questions[questionIndex].score = feedback.score;
    interview.questions[questionIndex].timeSpent = timeSpent;

    await interview.save();

    res.status(200).json({
      success: true,
      feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.completeInterview = async (req, res) => {
  try {
    const { interviewId } = req.body;

    const interview = await Interview.findOne({
      _id: interviewId,
      userId: req.user.id
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    const answeredQuestions = interview.questions.filter(q => q.userAnswer);
    const totalScore = answeredQuestions.reduce((sum, q) => sum + (q.score || 0), 0);
    const overallScore = answeredQuestions.length > 0 ? totalScore / answeredQuestions.length : 0;

    const confidenceScore = Math.floor(Math.random() * 20) + 70;
    const communicationScore = Math.floor(Math.random() * 20) + 70;
    const technicalAccuracy = overallScore;
    const grammarScore = Math.floor(Math.random() * 20) + 75;

    interview.overallScore = overallScore;
    interview.feedback = {
      confidenceScore,
      communicationScore,
      technicalAccuracy,
      grammarScore,
      strengths: ['Good technical knowledge', 'Clear communication'],
      improvements: ['Practice more complex scenarios', 'Improve response time'],
      aiSummary: 'Overall good performance with room for improvement in advanced topics.'
    };
    interview.status = 'completed';
    interview.completedAt = Date.now();

    await interview.save();

    await User.findByIdAndUpdate(req.user.id, {
      $inc: { interviewsCompleted: 1 }
    });

    // Update ranking and get achievements
    const rankingUpdate = await updateRankingAfterInterview(interview, req.user.id);

    res.status(200).json({
      success: true,
      interview,
      ranking: rankingUpdate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ userId: req.user.id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: interviews.length,
      interviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    res.status(200).json({
      success: true,
      interview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
