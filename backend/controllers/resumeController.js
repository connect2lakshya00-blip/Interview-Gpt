const Resume = require('../models/Resume');
const User = require('../models/User');
const { analyzeResume, extractResumeText } = require('../services/aiService');

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    const extractedText = await extractResumeText(req.file.path);
    const analysis = await analyzeResume(extractedText);

    const resume = await Resume.create({
      userId: req.user.id,
      fileName: req.file.originalname,
      fileUrl: req.file.path,
      extractedText,
      analysis: analysis.analysis,
      atsScore: analysis.atsScore,
      aiGeneratedQuestions: analysis.questions
    });

    await User.findByIdAndUpdate(req.user.id, {
      resumeUrl: req.file.path,
      skills: analysis.analysis.skills
    });

    res.status(201).json({
      success: true,
      resume
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    res.status(200).json({
      success: true,
      resume
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
