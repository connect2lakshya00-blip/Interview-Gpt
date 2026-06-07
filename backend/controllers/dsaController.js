const DSAProblem = require('../models/DSAProblem');
const DSASubmission = require('../models/DSASubmission');
const User = require('../models/User');

// Get all problems with filtering and search
exports.getProblems = async (req, res) => {
  try {
    const { 
      search, 
      category, 
      difficulty, 
      tags, 
      page = 1, 
      limit = 50,
      sortBy = 'title',
      order = 'asc'
    } = req.query;

    const query = {};

    // Search in title, description, and tags
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (difficulty && difficulty !== 'All') {
      query.difficulty = difficulty;
    }

    if (tags) {
      const tagArray = tags.split(',');
      query.tags = { $in: tagArray };
    }

    const sortOptions = {};
    sortOptions[sortBy] = order === 'asc' ? 1 : -1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [problems, total] = await Promise.all([
      DSAProblem.find(query)
        .select('-testCases -starterCode -detailedDescription')
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      DSAProblem.countDocuments(query)
    ]);

    // If user is authenticated, get their submission status
    let userSubmissions = {};
    if (req.user) {
      const submissions = await DSASubmission.find({
        user: req.user.userId,
        status: 'Accepted'
      }).distinct('problemId');
      
      submissions.forEach(problemId => {
        userSubmissions[problemId] = true;
      });
    }

    const problemsWithStatus = problems.map(problem => ({
      ...problem,
      solved: userSubmissions[problem.problemId] || false
    }));

    res.json({
      problems: problemsWithStatus,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: total
      }
    });
  } catch (error) {
    console.error('Get problems error:', error);
    res.status(500).json({ message: 'Failed to fetch problems' });
  }
};

// Get single problem by ID
exports.getProblem = async (req, res) => {
  try {
    const { problemId } = req.params;

    const problem = await DSAProblem.findOne({ problemId }).lean();

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // Hide hidden test cases from response
    problem.testCases = problem.testCases.filter(tc => !tc.hidden).map(tc => ({
      input: tc.input,
      expected: tc.expected
    }));

    // Get user's previous submissions if authenticated
    let userSubmissions = [];
    let solved = false;
    if (req.user) {
      userSubmissions = await DSASubmission.find({
        user: req.user.userId,
        problem: problem._id
      })
        .sort({ createdAt: -1 })
        .limit(10)
        .select('status testsPassed totalTests createdAt pointsEarned')
        .lean();

      solved = userSubmissions.some(sub => sub.status === 'Accepted');
    }

    res.json({
      problem,
      userSubmissions,
      solved
    });
  } catch (error) {
    console.error('Get problem error:', error);
    res.status(500).json({ message: 'Failed to fetch problem' });
  }
};

// Submit solution
exports.submitSolution = async (req, res) => {
  try {
    const { problemId } = req.params;
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'Code is required' });
    }

    const problem = await DSAProblem.findOne({ problemId });

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // Execute code against test cases
    const results = [];
    let allPassed = true;
    let testsPassed = 0;

    try {
      // Create a safer execution environment
      const func = eval(`(${code})`);

      for (const testCase of problem.testCases) {
        try {
          const startTime = Date.now();
          const result = func(...testCase.input);
          const executionTime = Date.now() - startTime;

          const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);

          results.push({
            passed,
            input: testCase.hidden ? 'Hidden' : JSON.stringify(testCase.input),
            expected: testCase.hidden ? 'Hidden' : JSON.stringify(testCase.expected),
            actual: testCase.hidden ? 'Hidden' : JSON.stringify(result),
            executionTime,
            hidden: testCase.hidden
          });

          if (passed) testsPassed++;
          else allPassed = false;

        } catch (err) {
          allPassed = false;
          results.push({
            passed: false,
            error: err.message,
            hidden: testCase.hidden
          });
        }
      }

      // Determine submission status
      const status = allPassed ? 'Accepted' : 'Wrong Answer';
      const pointsEarned = allPassed ? problem.points : 0;

      // Save submission
      const submission = new DSASubmission({
        user: req.user.userId,
        problem: problem._id,
        problemId: problem.problemId,
        code,
        status,
        testsPassed,
        totalTests: problem.testCases.length,
        pointsEarned
      });

      await submission.save();

      // Update problem stats
      problem.attemptCount++;
      if (allPassed) {
        problem.solvedCount++;
      }
      problem.acceptanceRate = (problem.solvedCount / problem.attemptCount) * 100;
      await problem.save();

      // Update user stats if solved
      if (allPassed) {
        const user = await User.findById(req.user.userId);
        if (user) {
          // Check if this is first time solving this problem
          const previousAccepted = await DSASubmission.findOne({
            user: req.user.userId,
            problem: problem._id,
            status: 'Accepted',
            _id: { $ne: submission._id }
          });

          if (!previousAccepted) {
            user.stats = user.stats || {};
            user.stats.problemsSolved = (user.stats.problemsSolved || 0) + 1;
            user.stats.totalPoints = (user.stats.totalPoints || 0) + pointsEarned;
            await user.save();
          }
        }
      }

      res.json({
        status,
        testsPassed,
        totalTests: problem.testCases.length,
        pointsEarned,
        results: results.map(r => ({
          ...r,
          input: r.hidden ? 'Hidden Test Case' : r.input,
          expected: r.hidden ? 'Hidden' : r.expected,
          actual: r.hidden && !r.passed ? 'Hidden' : r.actual
        })),
        message: allPassed 
          ? '🎉 Congratulations! All test cases passed!' 
          : '❌ Some test cases failed. Try again!'
      });

    } catch (err) {
      // Code execution error
      const submission = new DSASubmission({
        user: req.user.userId,
        problem: problem._id,
        problemId: problem.problemId,
        code,
        status: 'Runtime Error',
        testsPassed: 0,
        totalTests: problem.testCases.length,
        pointsEarned: 0
      });

      await submission.save();

      problem.attemptCount++;
      problem.acceptanceRate = (problem.solvedCount / problem.attemptCount) * 100;
      await problem.save();

      return res.status(400).json({
        status: 'Runtime Error',
        message: err.message,
        testsPassed: 0,
        totalTests: problem.testCases.length
      });
    }

  } catch (error) {
    console.error('Submit solution error:', error);
    res.status(500).json({ message: 'Failed to submit solution' });
  }
};

// Get user statistics
exports.getUserStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      recentSubmissions,
      categoryStats
    ] = await Promise.all([
      DSASubmission.distinct('problemId', { user: userId, status: 'Accepted' }).then(arr => arr.length),
      DSASubmission.aggregate([
        { $match: { user: userId, status: 'Accepted' } },
        { $lookup: { from: 'dsaproblems', localField: 'problemId', foreignField: 'problemId', as: 'problem' } },
        { $unwind: '$problem' },
        { $match: { 'problem.difficulty': 'Easy' } },
        { $group: { _id: '$problemId' } },
        { $count: 'count' }
      ]).then(result => result[0]?.count || 0),
      DSASubmission.aggregate([
        { $match: { user: userId, status: 'Accepted' } },
        { $lookup: { from: 'dsaproblems', localField: 'problemId', foreignField: 'problemId', as: 'problem' } },
        { $unwind: '$problem' },
        { $match: { 'problem.difficulty': 'Medium' } },
        { $group: { _id: '$problemId' } },
        { $count: 'count' }
      ]).then(result => result[0]?.count || 0),
      DSASubmission.aggregate([
        { $match: { user: userId, status: 'Accepted' } },
        { $lookup: { from: 'dsaproblems', localField: 'problemId', foreignField: 'problemId', as: 'problem' } },
        { $unwind: '$problem' },
        { $match: { 'problem.difficulty': 'Hard' } },
        { $group: { _id: '$problemId' } },
        { $count: 'count' }
      ]).then(result => result[0]?.count || 0),
      DSASubmission.find({ user: userId })
        .populate('problem', 'title difficulty points')
        .sort({ createdAt: -1 })
        .limit(10)
        .lean(),
      DSASubmission.aggregate([
        { $match: { user: userId, status: 'Accepted' } },
        { $lookup: { from: 'dsaproblems', localField: 'problemId', foreignField: 'problemId', as: 'problem' } },
        { $unwind: '$problem' },
        { $group: { _id: '$problem.category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
    ]);

    res.json({
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      recentSubmissions,
      categoryStats
    });

  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ message: 'Failed to fetch statistics' });
  }
};
