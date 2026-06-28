let blogs = [
  {
    category: "DSA",
    createdAt: new Date("2026-06-09T14:30:00"),
    title: "How I Solved LeetCode 139 - Word Break",
    preview: "Today I worked on LeetCode 139 Word Break....",
    content:
      "Today I worked on LeetCode 139 Word Break. Initially I thought of using recursion, but it resulted in many repeated computations. Then I learned how dynamic programming can optimize the solution by storing previously computed results. After implementing memoization, the time complexity improved significantly and I finally understood why DP is so powerful.",
    likes: 0,
  },
  {
    category: "Web development",
    createdAt: new Date("2026-06-08T09:20:00"),
    title: "My Journey Learning Web Development",
    preview: "When I started web development....",
    content:
      "When I started web development, HTML and CSS looked simple, but building complete applications felt overwhelming. Over time I learned JavaScript, Node.js, Express, and EJS. Creating projects helped me understand concepts much faster than watching tutorials alone. Consistency turned out to be more important than motivation.",
    likes: 0,
  },
  {
    category: "DSA",
    createdAt: new Date("2026-06-06T18:45:00"),
    title: "Top 5 DSA Mistakes Beginners Make",
    preview: "Many beginners jump directly into solving hard problems....",
    content:
      "Many beginners jump directly into solving hard problems without mastering arrays, strings, and linked lists. Another common mistake is memorizing solutions instead of understanding patterns. Regular revision, practicing edge cases, and analyzing time complexity are essential for becoming strong in data structures and algorithms.",
    likes: 0,
  },
  {
    category: "Interview",
    createdAt: new Date("2026-06-01T10:15:00"),
    title: "Preparing for Software Engineering Interviews",
    preview: "Interview preparation requires a combination of DSA....",
    content:
      "Interview preparation requires a combination of DSA, system design, and communication skills. Solving coding problems daily helps build problem-solving intuition. Mock interviews can reveal weaknesses that are difficult to notice while practicing alone. Consistency over several months usually produces the best results.",
    likes: 0,
  },
];

module.exports = { blogs };
