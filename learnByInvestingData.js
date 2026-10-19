
export const lessons = [
  {
    id: 1,
    title: "Understanding Diversification",
    category: "Portfolio Basics",
    icon: "🌱",
    duration: "3 min",
    difficulty: "Beginner",
    description:
      "Learn why spreading investments across different assets can help manage risk.",
    explanation:
      "Diversification means spreading investments across different companies, industries, or asset types instead of relying on just one. If one investment performs poorly, others may help balance the overall result. Diversification does not guarantee profit or eliminate risk.",
    example:
      "Imagine investing all your simulated money in one company. If its price falls, your portfolio may fall sharply. Spreading the same amount across several companies reduces dependence on any single company.",
    takeaway:
      "Avoid putting all your eggs in one basket.",
    keyTerms: ["Diversification", "Portfolio", "Risk"],
  },
  {
    id: 2,
    title: "What Is Volatility?",
    category: "Risk & Returns",
    icon: "📈",
    duration: "4 min",
    difficulty: "Beginner",
    description:
      "Understand how much and how quickly an asset's price can change.",
    explanation:
      "Volatility describes how much an asset's price fluctuates over time. High volatility means prices tend to move more sharply. Low volatility means prices tend to move less dramatically. Volatility can involve both gains and losses.",
    example:
      "In a simulation, Stock A moves between ₹98 and ₹102, while Stock B moves between ₹80 and ₹120. Stock B shows larger price movements over this example period.",
    takeaway:
      "A higher possible return can come with greater uncertainty.",
    keyTerms: ["Volatility", "Price Movement", "Risk"],
  },
  {
    id: 3,
    title: "Understanding Brokerage & Fees",
    category: "Investment Costs",
    icon: "💸",
    duration: "3 min",
    difficulty: "Beginner",
    description:
      "Discover how transaction costs can affect your simulated investment returns.",
    explanation:
      "Brokerage and other transaction costs may be charged when buying or selling investments. These costs reduce the amount you keep from a gain and can increase the overall loss. Actual fees depend on the platform and transaction.",
    example:
      "Suppose a simulated trade earns ₹200 before fees and has ₹25 in total costs. The net gain is ₹175.",
    takeaway:
      "Always consider costs when evaluating investment performance.",
    keyTerms: ["Brokerage", "Transaction Costs", "Net Return"],
  },
  {
    id: 4,
    title: "Asset Allocation Basics",
    category: "Portfolio Basics",
    icon: "🧩",
    duration: "4 min",
    difficulty: "Beginner",
    description:
      "Learn how a portfolio can be divided among different types of assets.",
    explanation:
      "Asset allocation is how investments are distributed across asset classes, such as stocks, bonds, or cash. The appropriate mix depends on a person's goals, time horizon, and ability to tolerate risk.",
    example:
      "A simulated portfolio might contain 60% stocks, 30% bonds, and 10% cash. This is only an example allocation, not a recommendation.",
    takeaway:
      "A portfolio's overall mix matters, not just its individual holdings.",
    keyTerms: ["Asset Allocation", "Asset Class", "Portfolio"],
  },
];

export const quizQuestions = [
  {
    id: 1,
    lessonId: 1,
    question:
      "What is the main purpose of diversification?",
    options: [
      "To guarantee a profit",
      "To spread exposure across investments",
      "To invest only in one company",
      "To remove every form of risk",
    ],
    correctAnswer: 1,
    explanation:
      "Diversification spreads exposure across investments. It can help manage concentration risk, but it cannot guarantee profits or eliminate all risk.",
    points: 10,
  },
  {
    id: 2,
    lessonId: 2,
    question:
      "What does high volatility generally mean?",
    options: [
      "The asset's price never changes",
      "The asset always earns a profit",
      "The asset's price has larger fluctuations",
      "The asset has no investment risk",
    ],
    correctAnswer: 2,
    explanation:
      "High volatility means prices tend to fluctuate more. Those movements can be upward or downward.",
    points: 10,
  },
  {
    id: 3,
    lessonId: 3,
    question:
      "A simulated trade earns ₹200 before fees. Total fees are ₹25. What is the net gain?",
    options: ["₹225", "₹200", "₹175", "₹25"],
    correctAnswer: 2,
    explanation:
      "Net gain = gross gain − fees = ₹200 − ₹25 = ₹175.",
    points: 10,
  },
  {
    id: 4,
    lessonId: 1,
    question:
      "A portfolio invests almost all its money in one company. What is the main concern?",
    options: [
      "It has too many different assets",
      "It has high concentration risk",
      "It has no exposure to that company",
      "Its returns are guaranteed",
    ],
    correctAnswer: 1,
    explanation:
      "Relying heavily on one company means its performance can have a large effect on the whole portfolio.",
    points: 10,
  },
  {
    id: 5,
    lessonId: 4,
    question:
      "What does asset allocation describe?",
    options: [
      "The distribution of investments among asset classes",
      "The daily closing price of one stock",
      "A guarantee against losses",
      "The number of quizzes completed",
    ],
    correctAnswer: 0,
    explanation:
      "Asset allocation describes how investments are divided among categories such as stocks, bonds, and cash.",
    points: 10,
  },
  {
    id: 6,
    lessonId: 3,
    question:
      "Why should investors consider transaction fees?",
    options: [
      "Fees always increase profits",
      "Fees do not affect returns",
      "Fees can reduce net returns",
      "Fees remove volatility",
    ],
    correctAnswer: 2,
    explanation:
      "Transaction fees are costs. They reduce the net gain or add to the total cost of a trade.",
    points: 10,
  },
];

export const learningTips = [
  {
    id: 1,
    title: "Check concentration",
    description:
      "Look at how much of a portfolio depends on its largest holding.",
    icon: "🎯",
  },
  {
    id: 2,
    title: "Compare risk and return",
    description:
      "Do not evaluate a simulated investment's return without considering its volatility.",
    icon: "⚖️",
  },
  {
    id: 3,
    title: "Remember transaction costs",
    description:
      "Compare gross gains with net gains after applicable fees.",
    icon: "🧮",
  },
  {
    id: 4,
    title: "Learn before acting",
    description:
      "Use simulated trades to practise concepts without risking real money.",
    icon: "🎓",
  },
];

export const getLessonById = (lessonId) =>
  lessons.find((lesson) => lesson.id === lessonId);

export const getQuestionsForLesson = (lessonId) =>
  quizQuestions.filter(
    (question) => question.lessonId === lessonId
  );
