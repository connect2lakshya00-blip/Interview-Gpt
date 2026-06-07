const Knowledge = require('../models/Knowledge');
const { extractResumeText } = require('../services/aiService');
const { storeInVectorDB, queryVectorDB } = require('../services/vectorService');

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    const content = await extractResumeText(req.file.path);
    const vectorIds = await storeInVectorDB(content, req.user.id);

    const knowledge = await Knowledge.create({
      userId: req.user.id,
      fileName: req.file.originalname,
      fileUrl: req.file.path,
      content,
      vectorIds,
      metadata: {
        fileSize: req.file.size,
        wordCount: content.split(' ').length
      }
    });

    res.status(201).json({
      success: true,
      knowledge
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.queryKnowledge = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a query'
      });
    }

    const result = await queryVectorDB(query, req.user.id);

    res.status(200).json({
      success: true,
      result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const documents = await Knowledge.find({ userId: req.user.id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: documents.length,
      documents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const document = await Knowledge.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
