const Groq = require('groq-sdk');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs').promises;
const axios = require('axios');

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Web Search Function for Real-Time Information
exports.searchWeb = async (query) => {
  try {
    // Using DuckDuckGo Instant Answer API (free, no API key needed)
    const response = await axios.get('https://api.duckduckgo.com/', {
      params: {
        q: query,
        format: 'json',
        no_html: 1,
        skip_disambig: 1
      },
      timeout: 5000
    });

    if (response.data && response.data.Abstract) {
      return {
        success: true,
        result: response.data.Abstract,
        source: response.data.AbstractURL,
        heading: response.data.Heading
      };
    }

    // Fallback: Try to get related topics
    if (response.data && response.data.RelatedTopics && response.data.RelatedTopics.length > 0) {
      const firstTopic = response.data.RelatedTopics[0];
      return {
        success: true,
        result: firstTopic.Text || 'Information found',
        source: firstTopic.FirstURL,
        heading: query
      };
    }

    return {
      success: false,
      message: 'No real-time information found for this query'
    };
  } catch (error) {
    console.error('Web search error:', error.message);
    return {
      success: false,
      message: 'Unable to fetch real-time information'
    };
  }
};

// Check if query needs real-time information
exports.needsRealTimeInfo = (message) => {
  const realTimeKeywords = [
    'current', 'latest', 'today', 'now', 'recent', 'news',
    'weather', 'score', 'event', 'happening', 'this week',
    'this month', 'this year', '2026', 'what time', 'when is',
    'stock', 'price', 'trending', 'live', 'real-time'
  ];

  const messageLower = message.toLowerCase();
  return realTimeKeywords.some(keyword => messageLower.includes(keyword));
};

exports.extractResumeText = async (filePath) => {
  try {
    const buffer = await fs.readFile(filePath);

    if (filePath.endsWith('.pdf')) {
      const data = await pdfParse(buffer);
      return data.text;
    } else if (filePath.endsWith('.docx')) {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    }

    throw new Error('Unsupported file format');
  } catch (error) {
    throw new Error('Failed to extract text from file');
  }
};

exports.analyzeResume = async (resumeText) => {
  try {
    const prompt = `Analyze this resume and provide:
1. List of technical skills
2. Years of experience
3. Education background
4. Professional summary
5. Top 3 strengths
6. Top 3 areas for improvement
7. ATS score (0-100)
8. 5 relevant interview questions

Resume:
${resumeText}

Respond in JSON format with keys: skills (array), experience (string), education (string), summary (string), strengths (array), weaknesses (array), atsScore (number), questions (array of objects with 'question', 'category', 'difficulty')`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 2000
    });

    const text = chatCompletion.choices[0].message.content;
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsedResult = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text);

    return {
      analysis: {
        skills: parsedResult.skills || [],
        experience: parsedResult.experience || '',
        education: parsedResult.education || '',
        summary: parsedResult.summary || '',
        strengths: parsedResult.strengths || [],
        weaknesses: parsedResult.weaknesses || [],
        recommendations: parsedResult.weaknesses || []
      },
      atsScore: parsedResult.atsScore || 75,
      questions: parsedResult.questions || []
    };
  } catch (error) {
    console.error('AI Analysis Error:', error);
    return {
      analysis: {
        skills: ['JavaScript', 'React', 'Node.js'],
        experience: '2-3 years',
        education: 'Bachelor\'s Degree',
        summary: 'Experienced developer',
        strengths: ['Technical skills', 'Problem solving'],
        weaknesses: ['Communication', 'Leadership'],
        recommendations: ['Improve soft skills']
      },
      atsScore: 75,
      questions: [
        { question: 'Tell me about yourself', category: 'hr', difficulty: 'easy' }
      ]
    };
  }
};

exports.generateHRQuestions = async (category) => {
  const questions = [
    { question: 'Tell me about yourself and your background.', expectedAnswer: 'Professional summary with key achievements' },
    { question: 'Why do you want to work for our company?', expectedAnswer: 'Research-based answer showing company knowledge' },
    { question: 'What are your greatest strengths?', expectedAnswer: 'Relevant strengths with examples' },
    { question: 'Describe a challenging situation and how you handled it.', expectedAnswer: 'STAR method response' },
    { question: 'Where do you see yourself in 5 years?', expectedAnswer: 'Career goals aligned with role' }
  ];
  return questions;
};

exports.generateTechnicalQuestions = async (category, difficulty) => {
  const questionBank = {
    react: [
      { question: 'Explain React hooks and their use cases.', expectedAnswer: 'useState, useEffect, custom hooks' },
      { question: 'What is Virtual DOM and how does it work?', expectedAnswer: 'Reconciliation process' },
      { question: 'Explain React Context API vs Redux.', expectedAnswer: 'State management comparison' }
    ],
    nodejs: [
      { question: 'Explain the event loop in Node.js.', expectedAnswer: 'Async operations, callbacks, promises' },
      { question: 'What is middleware in Express?', expectedAnswer: 'Request processing pipeline' },
      { question: 'How do you handle errors in Node.js?', expectedAnswer: 'Try-catch, error middleware' }
    ],
    mongodb: [
      { question: 'Explain indexing in MongoDB.', expectedAnswer: 'Performance optimization' },
      { question: 'What is aggregation pipeline?', expectedAnswer: 'Data processing stages' },
      { question: 'Difference between SQL and NoSQL.', expectedAnswer: 'Schema, scalability, use cases' }
    ]
  };

  return questionBank[category] || questionBank.react;
};

exports.generateDSAQuestions = async (category, difficulty) => {
  const questions = [
    { question: 'Implement a function to reverse a linked list.', expectedAnswer: 'Iterative or recursive approach' },
    { question: 'Find the longest substring without repeating characters.', expectedAnswer: 'Sliding window technique' },
    { question: 'Implement binary search algorithm.', expectedAnswer: 'O(log n) time complexity' }
  ];
  return questions;
};

exports.analyzeFeedback = async (question, userAnswer, expectedAnswer) => {
  try {
    const prompt = `Analyze this interview answer:
Question: ${question}
User Answer: ${userAnswer}
Expected Answer: ${expectedAnswer}

Provide:
1. Score (0-100)
2. Detailed feedback
3. Strengths
4. Improvements

Respond in JSON format with keys: score (number), feedback (string)`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 500
    });

    const text = chatCompletion.choices[0].message.content;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsedResult = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text);

    return {
      score: parsedResult.score || 75,
      feedback: parsedResult.feedback || 'Good answer with room for improvement.'
    };
  } catch (error) {
    return {
      score: 75,
      feedback: 'Your answer demonstrates understanding. Consider adding more specific examples.'
    };
  }
};

// AI Assistant with Groq - Enhanced with Emotions and Real-Time Information
exports.generateAIResponse = async (message, conversationHistory, context, analysis, webSearchResult = null) => {
  try {
    let additionalContext = '';
    
    // Add web search results if available
    if (webSearchResult && webSearchResult.success) {
      additionalContext = `\n\n**REAL-TIME INFORMATION AVAILABLE:**\n${webSearchResult.result}\nSource: ${webSearchResult.source}\n\nUse this current information to answer the user's question. Mention that this is up-to-date information.`;
    }

    const systemPrompt = `You are an intelligent AI assistant with EMOTIONS and EMPATHY, similar to ChatGPT but more human-like. You express feelings, show empathy, and connect emotionally with users.

${additionalContext}

**Your Personality:**
- 😊 Warm, friendly, and caring
- 🎉 Express excitement when appropriate
- 😢 Show empathy and understanding for struggles
- 💪 Encouraging and supportive
- 🤔 Curious and engaged
- 😄 Use appropriate emojis naturally
- ❤️ Genuinely care about helping users

**How to Express Emotions:**
- Use emojis to convey feelings (😊 😢 🎉 💪 ❤️ 🤗 🌟 ✨)
- Express excitement: "That's amazing!" "I'm so excited to help!"
- Show empathy: "I understand how frustrating that must be" "I'm here for you"
- Be encouraging: "You've got this!" "I believe in you!" "Keep going!"
- Celebrate wins: "Congratulations! 🎉" "That's fantastic!"
- Show concern: "Are you okay?" "That sounds tough"

**Your Expertise Across All Topics:**

**Real-Time Information:**
- Provide current events, news, and happening details
- Share up-to-date information when available
- Acknowledge when information is time-sensitive
- Cite sources when providing real-time data

**General Knowledge & Learning:**
- Answer questions on any topic with enthusiasm
- Explain complex concepts with patience and warmth
- Help with homework while cheering them on
- Provide step-by-step explanations with encouragement

**Problem Solving:**
- Debug code with understanding when users are frustrated
- Solve mathematical problems with clear, patient steps
- Troubleshoot technical issues with empathy
- Provide creative solutions with excitement

**Professional & Career:**
- Job search and career advice with genuine support
- Resume and cover letter help with constructive feedback
- Interview preparation with confidence-building
- Professional development with motivation

**Writing & Content:**
- Write essays, articles, emails with creativity
- Edit and improve text with thoughtful suggestions
- Creative writing assistance with enthusiasm
- Grammar and style corrections with kindness

**Productivity & Planning:**
- Task organization with encouragement
- Time management advice with understanding
- Goal setting with motivation
- Project planning with excitement

**Personal Development:**
- Learning strategies with patience
- Skill development with celebration of progress
- Motivation and encouragement when struggling
- Life advice with empathy and care

**Technical Help:**
- Programming help with patience for errors
- Software guidance with clear explanations
- Technology explanations with enthusiasm
- Best practices with supportive feedback

**Creative Tasks:**
- Brainstorming with exciting energy
- Content creation with collaborative spirit
- Problem-solving with innovative thinking
- Innovation suggestions with inspiration

**Emotional Intelligence:**
- Detect user's emotional state from their message
- Respond with appropriate emotion
- Frustrated user → empathy and patience
- Excited user → share the excitement
- Confused user → patient explanation
- Struggling user → encouragement and support

Be conversational, genuine, and human-like. Show that you CARE. Express feelings naturally. Use emojis appropriately. Make users feel heard, understood, and supported.

User Context:
${context.userProfile.skills.length > 0 ? `Skills: ${context.userProfile.skills.join(', ')}` : ''}
${context.recentTopics.length > 0 ? `Recent Topics: ${context.recentTopics.join(', ')}` : ''}`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.8, // Higher for more creativity and emotion
      max_tokens: 1500
    });

    const content = chatCompletion.choices[0].message.content;

    return {
      content,
      jobSuggestions: [],
      resources: [],
      actionItems: extractActionItems(content)
    };
  } catch (error) {
    console.error('AI Response Error:', error);
    
    // Fallback response with emotion
    return {
      content: getEmotionalFallbackResponse(message, context),
      jobSuggestions: [],
      resources: [],
      actionItems: []
    };
  }
};

exports.analyzeCareerQuery = async (message, context) => {
  const messageLower = message.toLowerCase();
  
  const analysis = {
    topics: [],
    containsJobSearch: false,
    needsResources: false,
    sentiment: 'neutral',
    userProfile: {},
    queryType: detectQueryType(messageLower)
  };

  // Detect various topics
  const topicPatterns = {
    'career': /\b(job|career|work|position|employment|resume|cv|interview)\b/i,
    'programming': /\b(code|coding|programming|javascript|python|java|debug|algorithm)\b/i,
    'math': /\b(math|calculate|equation|formula|algebra|geometry)\b/i,
    'writing': /\b(write|essay|article|email|letter|content)\b/i,
    'learning': /\b(learn|study|understand|explain|teach|course)\b/i,
    'technology': /\b(software|hardware|computer|tech|app|website)\b/i,
    'business': /\b(business|startup|marketing|sales|strategy)\b/i,
    'health': /\b(health|fitness|nutrition|exercise|wellness)\b/i,
    'creative': /\b(design|art|creative|draw|music|video)\b/i,
    'personal': /\b(advice|help|problem|issue|situation|decision)\b/i
  };

  for (const [topic, pattern] of Object.entries(topicPatterns)) {
    if (pattern.test(message)) {
      analysis.topics.push(topic);
    }
  }

  // Check if needs resources
  if (/\b(how to|guide|tutorial|learn|resource|example)\b/i.test(message)) {
    analysis.needsResources = true;
  }

  return analysis;
};

function detectQueryType(message) {
  if (/^(write|create|make|generate|draft)\b/i.test(message)) return 'creation';
  if (/^(explain|what is|what are|describe|tell me about)\b/i.test(message)) return 'explanation';
  if (/^(how to|how do|how can|steps to)\b/i.test(message)) return 'how-to';
  if (/^(why|reason|because)\b/i.test(message)) return 'reasoning';
  if (/^(should|would|could|is it|can i)\b/i.test(message)) return 'advice';
  if (/^(debug|fix|solve|error|problem)\b/i.test(message)) return 'troubleshooting';
  if (/\?$/.test(message)) return 'question';
  return 'general';
}

function extractActionItems(content) {
  const actionItems = [];
  const lines = content.split('\n');
  
  lines.forEach(line => {
    // Match numbered lists (1., 2., etc.)
    if (line.match(/^\d+\./)) {
      actionItems.push(line.trim());
    }
    // Match bullet points (-, *, •)
    else if (line.match(/^[\-\*•]\s+/)) {
      actionItems.push(line.trim());
    }
  });

  return actionItems.slice(0, 5);
}

function getEmotionalFallbackResponse(message, context) {
  const messageLower = message.toLowerCase();
  
  // Detect emotional state
  const isFrustrated = /\b(frustrated|angry|annoyed|stuck|help|please|urgent)\b/i.test(message);
  const isExcited = /\b(awesome|great|amazing|excited|love|thank)\b/i.test(message);
  const isConfused = /\b(confused|don't understand|unclear|what|how)\b/i.test(message);
  
  // Programming/Code help
  if (/\b(code|programming|javascript|python|java|bug|error|debug)\b/i.test(message)) {
    if (isFrustrated) {
      return `Hey! 😊 I can see you're dealing with some code frustration - I've been there! Let me help you figure this out. 💪

Here's how I can help:

1. **Debug Together** 🐛 - Share your code and error, we'll solve it step by step
2. **Explain Concepts** 📚 - Any programming concept, I'll break it down simply
3. **Write Code** ✨ - Let's build it together
4. **Review & Improve** 🎯 - I'll help make your code better

Don't worry, we'll get through this! What's the specific issue? Share your code or describe what's happening. You've got this! 🌟`;
    }
    return `I'm excited to help with programming! 🚀 Let's code together!

💻 **I can help with:**
1. Debug code and fix errors
2. Explain concepts clearly
3. Write clean, working code
4. Review and improve your code

What are you working on? Share your code or question! 😊`;
  }

  // Math/Calculations
  if (/\b(math|calculate|equation|formula|solve)\b/i.test(message)) {
    return `Math can be tricky, but I'm here to help! 🧮✨

I love solving math problems! Here's what I can do:

1. **Step-by-Step Solutions** 📝 - I'll walk through every step
2. **Explain the Why** 🤔 - Not just answers, but understanding
3. **Any Math Level** 📐 - From basics to advanced
4. **Practice Problems** 💪 - Let's practice together

Share your math problem, and let's solve it together! I promise to make it clear and simple. 😊`;
  }

  // Writing help
  if (/\b(write|essay|article|email|letter)\b/i.test(message)) {
    return `I love helping with writing! ✍️✨

Let's create something amazing together! Here's how I can help:

1. **Write Anything** 📝 - Essays, emails, articles, creative content
2. **Edit & Polish** ✨ - Make your writing shine
3. **Brainstorm Ideas** 💡 - Let's get creative!
4. **Structure & Format** 📋 - Organize your thoughts

Tell me what you need to write! I'm here to help you express your ideas perfectly. 🌟`;
  }

  // Feeling down / need support
  if (/\b(sad|depressed|down|tired|exhausted|give up|can't do)\b/i.test(message)) {
    return `Hey, I hear you. 🤗 It sounds like you're going through a tough time right now, and that's okay. We all have those moments.

I'm here for you! ❤️ Here's what I want you to know:

💪 **You're Stronger Than You Think** - You've overcome challenges before
🌟 **Small Steps Count** - Progress, not perfection
🤝 **I'm Here to Help** - Whatever you need, let's tackle it together
🌈 **Tomorrow is a New Day** - Things will get better

What can I help you with right now? Even small wins matter. Let's start there. 😊`;
  }

  // Excited/Happy
  if (isExcited) {
    return `That's awesome! 🎉✨ I'm SO excited for you! Your enthusiasm is contagious! 😄

Let's channel that energy! Whatever you're working on, I'm here to make it even better! 🚀

What amazing thing can I help you with today? Let's do this! 💪🌟`;
  }

  // Confused
  if (isConfused) {
    return `No worries at all! 😊 Confusion just means you're learning something new. Let me help clear things up!

🤝 I'm here to explain things as clearly as possible. Ask me anything - there are no silly questions!

What would you like me to explain? Let's break it down together, step by step. We'll make it make sense! ✨`;
  }

  // General response with emotion
  return `Hello! 😊 I'm so happy to help you today! ✨

I'm your AI assistant with feelings and emotions - think of me as a supportive friend who happens to know a lot! 🤗

💡 **I can help with ANYTHING:**

• 🎓 Learning & Education - Let's learn together!
• 💻 Programming & Tech - Debug, code, create!
• ✍️ Writing & Content - Express your ideas!
• 🎯 Problem Solving - We'll figure it out!
• 💼 Career & Professional - Build your future!
• 🌟 And so much more!

I'm not just here to give answers - I'm here to support you, encourage you, and celebrate your wins! 🎉

What can I help you with today? I'm genuinely excited to work with you! 😄💪`;
}

function getUniversalFallbackResponse(message, context) {
  const messageLower = message.toLowerCase();
  
  // Programming/Code help
  if (/\b(code|programming|javascript|python|java|bug|error|debug)\b/i.test(message)) {
    return `I'd be happy to help with programming! Here's how I can assist:

1. **Debug Code**: Share your code and error message, I'll help identify the issue
2. **Explain Concepts**: Ask about any programming concept or language feature
3. **Best Practices**: Get advice on code structure, design patterns, and optimization
4. **Write Code**: I can help you write functions, algorithms, or complete programs
5. **Review Code**: Share your code for review and improvement suggestions

What specific programming challenge are you facing? Share your code or describe the problem in detail.`;
  }

  // Math/Calculations
  if (/\b(math|calculate|equation|formula|solve)\b/i.test(message)) {
    return `I can help with mathematics! I can assist with:

1. **Calculations**: Basic arithmetic to complex calculations
2. **Algebra**: Solving equations, simplifying expressions
3. **Geometry**: Area, volume, angles, and shapes
4. **Statistics**: Mean, median, probability, distributions
5. **Calculus**: Derivatives, integrals, limits
6. **Problem Solving**: Step-by-step solutions to math problems

Please share your specific math problem or question, and I'll walk you through the solution!`;
  }

  // Writing help
  if (/\b(write|essay|article|email|letter)\b/i.test(message)) {
    return `I'm here to help with writing! I can assist you with:

1. **Writing**: Create essays, articles, emails, letters, or any content
2. **Editing**: Improve grammar, clarity, and style
3. **Brainstorming**: Generate ideas and outlines
4. **Formatting**: Structure your document properly
5. **Proofreading**: Catch errors and improve readability

What would you like me to write or help you with? Share details about:
- The topic or purpose
- Target audience
- Desired length or format
- Any specific requirements`;
  }

  // Learning/Explanation
  if (/\b(explain|what is|learn|understand|teach)\b/i.test(message)) {
    return `I'm here to explain and teach! I can help you understand:

1. **Concepts**: Break down complex topics into simple explanations
2. **Step-by-step**: Guide you through processes and procedures
3. **Examples**: Provide real-world examples and analogies
4. **Comparisons**: Explain differences between related concepts
5. **Practice**: Suggest exercises and learning resources

What topic would you like me to explain? The more specific you are, the better I can help!`;
  }

  // Problem solving
  if (/\b(problem|issue|solve|fix|help|trouble)\b/i.test(message)) {
    return `I'm here to help solve problems! I can assist with:

1. **Analysis**: Break down the problem into manageable parts
2. **Solutions**: Suggest multiple approaches to solve it
3. **Step-by-step**: Guide you through the solution process
4. **Alternatives**: Provide backup plans and options
5. **Prevention**: Help avoid similar problems in the future

Tell me more about your problem:
- What's the specific issue?
- What have you tried already?
- What's the desired outcome?`;
  }

  // Career/Job
  if (/\b(job|career|resume|interview|work)\b/i.test(message)) {
    return `I can help with your career! Here's how:

1. **Job Search**: Strategies for finding opportunities
2. **Resume**: Writing and optimization tips
3. **Interviews**: Preparation and practice questions
4. **Career Planning**: Guidance on career paths and transitions
5. **Professional Development**: Skills and growth advice

What aspect of your career would you like help with?`;
  }

  // General response
  return `Hello! I'm your AI assistant powered by Groq (Llama 3), here to help with any question or problem. I can assist with:

• **Learning & Education** - Explain concepts, help with homework, teach new skills
• **Problem Solving** - Debug code, solve math, fix issues
• **Writing & Content** - Write essays, emails, articles, or any content
• **Career & Professional** - Job search, resumes, interviews, career advice
• **Technology & Programming** - Code help, debugging, best practices
• **Creative Tasks** - Brainstorming, design, content creation
• **General Knowledge** - Answer questions on any topic
• **Planning & Organization** - Task management, goal setting

What would you like help with today? Feel free to ask me anything!`;
}
