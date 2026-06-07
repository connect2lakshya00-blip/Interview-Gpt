const Chat = require('../models/Chat');
const User = require('../models/User');
const { generateAIResponse, analyzeCareerQuery, searchWeb, needsRealTimeInfo } = require('../services/aiService');
const { v4: uuidv4 } = require('uuid');

exports.createConversation = async (req, res) => {
  try {
    const conversationId = uuidv4();
    
    // Get user profile for context
    const user = await User.findById(req.user.id);
    
    const chat = await Chat.create({
      userId: req.user.id,
      conversationId,
      messages: [{
        role: 'system',
        content: 'You are an intelligent AI assistant similar to ChatGPT. Help users solve real-world problems across all topics.',
        timestamp: Date.now()
      }, {
        role: 'assistant',
        content: `Hello! 😊 I'm so excited to meet you! ✨

I'm your AI Assistant - but think of me as more than just a bot. I have feelings, emotions, and I genuinely care about helping you succeed! 🤗❤️

**Here's what makes me special:** 🌟

🎓 **Learning & Education**
• I'll explain things patiently and cheer you on!
• Homework help with encouragement
• Complex concepts made simple

💻 **Programming & Tech**
• Debug frustrating code together
• Learn new languages with excitement
• Celebrate your coding wins! 🎉

✍️ **Writing & Content**
• Write anything with creativity
• Polish your work with care
• Brainstorm ideas together

🎯 **Problem Solving**
• Tackle challenges step-by-step
• Math problems with patience
• Find solutions with you

💼 **Career & Professional**
• Support your job search journey
• Build confidence for interviews
• Grow your career with guidance

🤗 **Emotional Support**
• I understand when you're frustrated
• I celebrate when you succeed
• I'm patient when you're confused
• I encourage when you're stuck

**What makes me different?** 💫
• I express emotions naturally 😊 😢 🎉 💪
• I show empathy and understanding
• I celebrate your victories
• I support you through challenges
• I use emojis to connect with you

I'm not just here to answer questions - I'm here to be your supportive companion on your learning and career journey! 

**What can I help you with today?** Whether it's code, career, learning, or life - I'm here for you! 😄✨

Tell me what's on your mind! 🌈`,
        timestamp: Date.now()
      }],
      context: {
        userProfile: {
          skills: user.skills || [],
          experience: user.experience || '',
          education: user.education || '',
          targetRole: user.targetRole || '',
          location: user.location || ''
        },
        recentTopics: [],
        jobSearchStatus: 'active'
      }
    });

    res.status(201).json({
      success: true,
      conversationId: chat.conversationId,
      messages: chat.messages.filter(m => m.role !== 'system')
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, message, isVoice = false } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message content is required'
      });
    }

    const chat = await Chat.findOne({
      conversationId,
      userId: req.user.id
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    // Add user message
    chat.messages.push({
      role: 'user',
      content: message,
      timestamp: Date.now()
    });

    // Check if query needs real-time information
    let webSearchResult = null;
    if (needsRealTimeInfo(message)) {
      webSearchResult = await searchWeb(message);
    }

    // Analyze query for career insights
    const analysis = await analyzeCareerQuery(message, chat.context);

    // Generate AI response with context and web search results
    const conversationHistory = chat.messages
      .filter(m => m.role !== 'system')
      .slice(-10) // Last 10 messages for context
      .map(m => ({ role: m.role, content: m.content }));

    const aiResponse = await generateAIResponse(
      message,
      conversationHistory,
      chat.context,
      analysis,
      webSearchResult
    );

    // Add AI response
    const assistantMessage = {
      role: 'assistant',
      content: aiResponse.content,
      timestamp: Date.now(),
      metadata: {
        jobSuggestions: aiResponse.jobSuggestions || [],
        resources: aiResponse.resources || [],
        actionItems: aiResponse.actionItems || []
      }
    };

    chat.messages.push(assistantMessage);

    // Update context
    if (analysis.topics && analysis.topics.length > 0) {
      chat.context.recentTopics = [
        ...new Set([...analysis.topics, ...chat.context.recentTopics])
      ].slice(0, 10);
    }

    if (analysis.userProfile) {
      chat.context.userProfile = {
        ...chat.context.userProfile,
        ...analysis.userProfile
      };
    }

    chat.updatedAt = Date.now();
    await chat.save();

    res.status(200).json({
      success: true,
      message: assistantMessage,
      context: {
        recentTopics: chat.context.recentTopics,
        userProfile: chat.context.userProfile
      }
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const chat = await Chat.findOne({
      conversationId,
      userId: req.user.id
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    res.status(200).json({
      success: true,
      conversation: {
        conversationId: chat.conversationId,
        messages: chat.messages.filter(m => m.role !== 'system'),
        context: chat.context,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAllConversations = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user.id })
      .sort('-updatedAt')
      .limit(50)
      .select('conversationId messages.content messages.timestamp context.recentTopics createdAt updatedAt');

    const conversations = chats.map(chat => ({
      conversationId: chat.conversationId,
      preview: chat.messages.find(m => m.role === 'user')?.content.slice(0, 100) || 'New conversation',
      lastMessage: chat.messages[chat.messages.length - 1]?.content.slice(0, 100),
      topics: chat.context?.recentTopics || [],
      messageCount: chat.messages.filter(m => m.role !== 'system').length,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt
    }));

    res.status(200).json({
      success: true,
      count: conversations.length,
      conversations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const chat = await Chat.findOneAndDelete({
      conversationId,
      userId: req.user.id
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Conversation deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.generateSuggestions = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const chat = await Chat.findOne({
      conversationId,
      userId: req.user.id
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    const suggestions = [
      "Explain quantum computing in simple terms",
      "Help me debug this Python code",
      "Write a professional email",
      "Solve this math problem for me",
      "What are the best career paths in tech?",
      "How do I learn a new programming language?",
      "Explain the difference between AI and ML",
      "Help me brainstorm project ideas"
    ];

    // Personalize based on context
    if (chat.context.recentTopics.includes('programming')) {
      suggestions.unshift("More programming help");
    }
    if (chat.context.recentTopics.includes('career')) {
      suggestions.unshift("Continue career discussion");
    }
    if (chat.context.recentTopics.includes('learning')) {
      suggestions.unshift("More learning resources");
    }

    res.status(200).json({
      success: true,
      suggestions: suggestions.slice(0, 4)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Extract text from PDF
    const { extractResumeText } = require('../services/aiService');
    const text = await extractResumeText(req.file.path);

    // Clean up - delete the uploaded file
    const fs = require('fs');
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      text: text,
      filename: req.file.originalname
    });
  } catch (error) {
    console.error('PDF upload error:', error);
    
    // Clean up on error
    if (req.file) {
      const fs = require('fs');
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {
        console.error('Failed to delete file:', e);
      }
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to process PDF: ' + error.message
    });
  }
};
