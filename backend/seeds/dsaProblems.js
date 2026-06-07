const mongoose = require('mongoose');
const DSAProblem = require('../models/DSAProblem');
require('dotenv').config();

const problems = [
  {
    problemId: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    points: 50,
    description: "Find two numbers that add up to a target",
    detailedDescription: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists"
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]"
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]"
      }
    ],
    starterCode: `function twoSum(nums, target) {
  // Write your solution here
  
}`,
    testCases: [
      { input: [[2,7,11,15], 9], expected: [0,1] },
      { input: [[3,2,4], 6], expected: [1,2] },
      { input: [[3,3], 6], expected: [0,1] },
      { input: [[-1,-2,-3,-4,-5], -8], expected: [2,4], hidden: true }
    ],
    hints: ["Use a hash map to store numbers you've seen", "For each number, check if target - number exists in the map"],
    tags: ["Hash Table", "Two Pointers"],
    companies: ["Google", "Amazon", "Facebook"]
  },
  {
    problemId: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    points: 50,
    description: "Check if brackets are balanced",
    detailedDescription: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order.",
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    examples: [
      { input: 's = "()"', output: "true", explanation: "The string is valid" },
      { input: 's = "()[]{}"', output: "true", explanation: "All brackets are properly closed" },
      { input: 's = "(]"', output: "false", explanation: "Wrong bracket type closes" }
    ],
    starterCode: `function isValid(s) {
  // Write your solution here
  
}`,
    testCases: [
      { input: ["()"], expected: true },
      { input: ["()[]{}"], expected: true },
      { input: ["(]"], expected: false },
      { input: ["{[]}"], expected: true },
      { input: ["([)]"], expected: false, hidden: true }
    ],
    hints: ["Use a stack to track opening brackets", "When you see a closing bracket, check if it matches the last opening bracket"],
    tags: ["Stack", "String"],
    companies: ["Microsoft", "Amazon", "Bloomberg"]
  },
  {
    problemId: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked List",
    points: 50,
    description: "Reverse a singly linked list",
    detailedDescription: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]", explanation: "Reverse the list" }
    ],
    starterCode: `function reverseList(head) {
  // Write your solution here
  // head is a linked list node: { val, next }
  
}`,
    testCases: [
      { input: [{ val: 1, next: { val: 2, next: { val: 3, next: null } } }], expected: { val: 3, next: { val: 2, next: { val: 1, next: null } } } },
      { input: [null], expected: null },
      { input: [{ val: 1, next: null }], expected: { val: 1, next: null } }
    ],
    hints: ["Keep track of previous, current, and next nodes", "Iteratively reverse the pointers"],
    tags: ["Linked List", "Recursion"],
    companies: ["Amazon", "Microsoft", "Apple"]
  },
  {
    problemId: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    category: "Binary Search",
    points: 50,
    description: "Find element in sorted array",
    detailedDescription: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All integers in nums are unique.",
      "nums is sorted in ascending order."
    ],
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "9 exists in nums and its index is 4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1", explanation: "2 does not exist in nums so return -1" }
    ],
    starterCode: `function search(nums, target) {
  // Write your solution here
  
}`,
    testCases: [
      { input: [[-1,0,3,5,9,12], 9], expected: 4 },
      { input: [[-1,0,3,5,9,12], 2], expected: -1 },
      { input: [[5], 5], expected: 0 },
      { input: [[1,2,3,4,5,6,7], 4], expected: 3, hidden: true }
    ],
    hints: ["Use two pointers: left and right", "Compare middle element with target", "Adjust search space based on comparison"],
    tags: ["Binary Search", "Array"],
    companies: ["Google", "Facebook", "Amazon"]
  },
  {
    problemId: "palindrome-number",
    title: "Palindrome Number",
    difficulty: "Easy",
    category: "Math",
    points: 50,
    description: "Check if number is palindrome",
    detailedDescription: "Given an integer x, return true if x is palindrome integer. An integer is a palindrome when it reads the same backward as forward.",
    constraints: [
      "-2^31 <= x <= 2^31 - 1"
    ],
    examples: [
      { input: "x = 121", output: "true", explanation: "121 reads as 121 from left to right and from right to left." },
      { input: "x = -121", output: "false", explanation: "From left to right, it reads -121. From right to left, it becomes 121-." },
      { input: "x = 10", output: "false", explanation: "Reads 01 from right to left." }
    ],
    starterCode: `function isPalindrome(x) {
  // Write your solution here
  
}`,
    testCases: [
      { input: [121], expected: true },
      { input: [-121], expected: false },
      { input: [10], expected: false },
      { input: [0], expected: true },
      { input: [12321], expected: true, hidden: true }
    ],
    hints: ["Convert to string and compare with reversed string", "Or reverse the number mathematically"],
    tags: ["Math", "String"],
    companies: ["Amazon", "Apple", "Adobe"]
  },
  {
    problemId: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Array",
    points: 100,
    description: "Merge overlapping intervals",
    detailedDescription: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    constraints: [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= starti <= endi <= 10^4"
    ],
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "Intervals [1,3] and [2,6] overlaps, merge them into [1,6]." }
    ],
    starterCode: `function merge(intervals) {
  // Write your solution here
  
}`,
    testCases: [
      { input: [[[1,3],[2,6],[8,10],[15,18]]], expected: [[1,6],[8,10],[15,18]] },
      { input: [[[1,4],[4,5]]], expected: [[1,5]] },
      { input: [[[1,4],[0,4]]], expected: [[0,4]] }
    ],
    hints: ["Sort intervals by start time", "Iterate and merge if current overlaps with previous"],
    tags: ["Array", "Sorting"],
    companies: ["Facebook", "Google", "Microsoft"]
  },
  {
    problemId: "longest-substring",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "String",
    points: 100,
    description: "Find longest substring without repeating characters",
    detailedDescription: "Given a string s, find the length of the longest substring without repeating characters.",
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: "1", explanation: 'The answer is "b", with the length of 1.' }
    ],
    starterCode: `function lengthOfLongestSubstring(s) {
  // Write your solution here
  
}`,
    testCases: [
      { input: ["abcabcbb"], expected: 3 },
      { input: ["bbbbb"], expected: 1 },
      { input: ["pwwkew"], expected: 3 },
      { input: [""], expected: 0, hidden: true }
    ],
    hints: ["Use sliding window technique", "Use a set or map to track characters in current window"],
    tags: ["Sliding Window", "Hash Table", "String"],
    companies: ["Amazon", "Bloomberg", "Adobe"]
  },
  {
    problemId: "binary-tree-traversal",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    category: "Tree",
    points: 100,
    description: "Traverse binary tree in level order",
    detailedDescription: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
    constraints: [
      "The number of nodes in the tree is in the range [0, 2000].",
      "-1000 <= Node.val <= 1000"
    ],
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]", explanation: "Level order traversal" }
    ],
    starterCode: `function levelOrder(root) {
  // Write your solution here
  // root is a tree node: { val, left, right }
  
}`,
    testCases: [
      { input: [{ val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } }], expected: [[3],[9,20],[15,7]] },
      { input: [null], expected: [] }
    ],
    hints: ["Use BFS (Breadth First Search)", "Use a queue to track nodes at each level"],
    tags: ["Tree", "BFS", "Queue"],
    companies: ["Facebook", "Amazon", "Microsoft"]
  },
  {
    problemId: "course-schedule",
    title: "Course Schedule",
    difficulty: "Medium",
    category: "Graph",
    points: 100,
    description: "Determine if you can finish all courses",
    detailedDescription: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses. Otherwise, return false.",
    constraints: [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= 5000"
    ],
    examples: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true", explanation: "Take course 0 first, then course 1" },
      { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false", explanation: "Circular dependency" }
    ],
    starterCode: `function canFinish(numCourses, prerequisites) {
  // Write your solution here
  
}`,
    testCases: [
      { input: [2, [[1,0]]], expected: true },
      { input: [2, [[1,0],[0,1]]], expected: false },
      { input: [4, [[1,0],[2,1],[3,2]]], expected: true, hidden: true }
    ],
    hints: ["This is a cycle detection problem in a directed graph", "Use topological sort or DFS with visited states"],
    tags: ["Graph", "DFS", "Topological Sort"],
    companies: ["Google", "Amazon", "Facebook"]
  },
  {
    problemId: "lru-cache",
    title: "LRU Cache",
    difficulty: "Hard",
    category: "Design",
    points: 200,
    description: "Implement Least Recently Used cache",
    detailedDescription: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get(key) and put(key, value) methods.",
    constraints: [
      "1 <= capacity <= 3000",
      "0 <= key <= 10^4",
      "0 <= value <= 10^5",
      "At most 2 * 10^5 calls will be made to get and put."
    ],
    examples: [
      { input: 'LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2)', output: "[null,null,null,1,null,-1]", explanation: "Cache evicts key 2 when adding key 3" }
    ],
    starterCode: `class LRUCache {
  constructor(capacity) {
    // Initialize your data structure here
  }
  
  get(key) {
    // Get the value of the key if exists
  }
  
  put(key, value) {
    // Set or insert the value
  }
}`,
    testCases: [
      { input: [[2, ["put","put","get","put","get","put","get","get","get"], [[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]]], expected: [null,null,null,1,null,-1,null,-1,3,4] }
    ],
    hints: ["Use a hash map for O(1) access", "Use a doubly linked list to track order"],
    tags: ["Hash Table", "Linked List", "Design"],
    companies: ["Amazon", "Google", "Microsoft"]
  },
  {
    problemId: "word-ladder",
    title: "Word Ladder",
    difficulty: "Hard",
    category: "Graph",
    points: 200,
    description: "Find shortest transformation sequence",
    detailedDescription: "Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.",
    constraints: [
      "1 <= beginWord.length <= 10",
      "endWord.length == beginWord.length",
      "1 <= wordList.length <= 5000"
    ],
    examples: [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: "5", explanation: 'One shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog"' }
    ],
    starterCode: `function ladderLength(beginWord, endWord, wordList) {
  // Write your solution here
  
}`,
    testCases: [
      { input: ["hit", "cog", ["hot","dot","dog","lot","log","cog"]], expected: 5 },
      { input: ["hit", "cog", ["hot","dot","dog","lot","log"]], expected: 0 }
    ],
    hints: ["Use BFS to find shortest path", "Generate all possible transformations for each word"],
    tags: ["Graph", "BFS", "String"],
    companies: ["Facebook", "Amazon", "Google"]
  },
  {
    problemId: "median-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Array",
    points: 200,
    description: "Find median of two sorted arrays",
    detailedDescription: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000"
    ],
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.0", explanation: "merged array = [1,2,3] and median is 2" },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.5", explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5" }
    ],
    starterCode: `function findMedianSortedArrays(nums1, nums2) {
  // Write your solution here
  
}`,
    testCases: [
      { input: [[1,3], [2]], expected: 2.0 },
      { input: [[1,2], [3,4]], expected: 2.5 },
      { input: [[0,0], [0,0]], expected: 0.0, hidden: true }
    ],
    hints: ["Use binary search on the smaller array", "Partition both arrays to find median"],
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    companies: ["Google", "Microsoft", "Amazon"]
  },
  {
    problemId: "fizz-buzz",
    title: "Fizz Buzz",
    difficulty: "Easy",
    category: "Math",
    points: 50,
    description: "Classic FizzBuzz problem",
    detailedDescription: "Given an integer n, return a string array where: answer[i] == 'FizzBuzz' if i is divisible by 3 and 5, answer[i] == 'Fizz' if i is divisible by 3, answer[i] == 'Buzz' if i is divisible by 5, answer[i] == i (as a string) otherwise.",
    constraints: ["1 <= n <= 10^4"],
    examples: [
      { input: "n = 3", output: '["1","2","Fizz"]', explanation: "3 is divisible by 3" },
      { input: "n = 5", output: '["1","2","Fizz","4","Buzz"]', explanation: "5 is divisible by 5" }
    ],
    starterCode: `function fizzBuzz(n) {
  // Write your solution here
  
}`,
    testCases: [
      { input: [3], expected: ["1","2","Fizz"] },
      { input: [5], expected: ["1","2","Fizz","4","Buzz"] },
      { input: [15], expected: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"], hidden: true }
    ],
    hints: ["Check divisibility by 15 first", "Then check 3 and 5 separately"],
    tags: ["Math", "String"],
    companies: ["Amazon", "Microsoft", "Apple"]
  },
  {
    problemId: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    points: 50,
    description: "Count ways to climb stairs",
    detailedDescription: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    constraints: ["1 <= n <= 45"],
    examples: [
      { input: "n = 2", output: "2", explanation: "1. 1 step + 1 step, 2. 2 steps" },
      { input: "n = 3", output: "3", explanation: "1. 1+1+1, 2. 1+2, 3. 2+1" }
    ],
    starterCode: `function climbStairs(n) {
  // Write your solution here
  
}`,
    testCases: [
      { input: [2], expected: 2 },
      { input: [3], expected: 3 },
      { input: [5], expected: 8, hidden: true }
    ],
    hints: ["This is a Fibonacci sequence problem", "dp[i] = dp[i-1] + dp[i-2]"],
    tags: ["Dynamic Programming", "Math"],
    companies: ["Amazon", "Google", "Adobe"]
  },
  {
    problemId: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Dynamic Programming",
    points: 100,
    description: "Find contiguous subarray with largest sum",
    detailedDescription: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "[4,-1,2,1] has the largest sum = 6" }
    ],
    starterCode: `function maxSubArray(nums) {
  // Write your solution here
  
}`,
    testCases: [
      { input: [[-2,1,-3,4,-1,2,1,-5,4]], expected: 6 },
      { input: [[1]], expected: 1 },
      { input: [[5,4,-1,7,8]], expected: 23, hidden: true }
    ],
    hints: ["Use Kadane's algorithm", "Keep track of current sum and maximum sum"],
    tags: ["Dynamic Programming", "Array"],
    companies: ["Amazon", "Microsoft", "LinkedIn"]
  },
  {
    problemId: "best-time-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Array",
    points: 50,
    description: "Maximize profit from stock prices",
    detailedDescription: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve.",
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5" }
    ],
    starterCode: `function maxProfit(prices) {
  // Write your solution here
  
}`,
    testCases: [
      { input: [[7,1,5,3,6,4]], expected: 5 },
      { input: [[7,6,4,3,1]], expected: 0 },
      { input: [[2,4,1]], expected: 2, hidden: true }
    ],
    hints: ["Track minimum price seen so far", "Calculate profit if selling at current price"],
    tags: ["Array", "Dynamic Programming"],
    companies: ["Amazon", "Facebook", "Microsoft"]
  }
];

async function seedProblems() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.error('❌ MongoDB URI not found in environment variables');
      console.log('Please set MONGO_URI or MONGODB_URI in your .env file');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing problems
    await DSAProblem.deleteMany({});
    console.log('🗑️  Cleared existing problems');

    // Insert new problems
    await DSAProblem.insertMany(problems);
    console.log(`✅ Seeded ${problems.length} DSA problems`);

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    console.log('\n🎉 DSA problems seeded successfully!');
    console.log('You can now access them at: http://localhost:3000/dashboard/dsa');
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
}

seedProblems();
