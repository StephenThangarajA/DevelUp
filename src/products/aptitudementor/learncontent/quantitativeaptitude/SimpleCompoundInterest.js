const SimpleCompoundInterest = {
  topic: "Simple Interest & Compound Interest",
  description:
    "Simple Interest and Compound Interest are used to calculate interest on money borrowed or invested over time. These concepts are frequently asked in aptitude and banking exams.",

  formulas: [
    {
      name: "Simple Interest (SI)",
      rule: "SI = (P × R × T) / 100",
      explanation:
        "Used to calculate interest when interest is applied only on principal.",
      example: {
        question:
          "Find SI on ₹1000 at 10% per annum for 2 years.",
        solution:
          "(1000 × 10 × 2) / 100 = ₹200"
      }
    },

    {
      name: "Amount in Simple Interest",
      rule: "Amount = P + SI",
      explanation:
        "Total money after adding simple interest to principal.",
      example: {
        question:
          "Find amount after 2 years if SI is ₹200 and principal is ₹1000.",
        solution:
          "Amount = 1000 + 200 = ₹1200"
      }
    },

    {
      name: "Compound Interest (CI)",
      rule: "CI = Amount − Principal",
      explanation:
        "Compound interest is calculated on principal plus previous interest.",
      example: {
        question:
          "If amount is ₹1210 on ₹1000, find CI.",
        solution:
          "CI = 1210 − 1000 = ₹210"
      }
    },

    {
      name: "Amount in Compound Interest",
      rule: "Amount = P(1 + R/100)^T",
      explanation:
        "Used when interest is compounded annually.",
      example: {
        question:
          "Find amount on ₹2000 at 10% for 2 years.",
        solution:
          "2000 × (1.1)^2 = ₹2420"
      }
    },

    {
      name: "Difference Between CI and SI (2 Years)",
      rule: "Difference = P × (R/100)^2",
      explanation:
        "Used to find difference between CI and SI for 2 years.",
      example: {
        question:
          "Find difference between CI and SI on ₹1000 at 10% for 2 years.",
        solution:
          "1000 × (0.1)^2 = ₹10"
      }
    },

    {
      name: "Compound Interest Half-Yearly",
      rule: "Amount = P(1 + R/200)^(2T)",
      explanation:
        "Used when interest is compounded half-yearly.",
      example: {
        question:
          "Find amount on ₹1000 at 10% for 1 year compounded half-yearly.",
        solution:
          "1000 × (1.05)^2 = ₹1102.5"
      }
    },

    {
      name: "Compound Interest Quarterly",
      rule: "Amount = P(1 + R/400)^(4T)",
      explanation:
        "Used when interest is compounded quarterly.",
      example: {
        question:
          "Find amount on ₹8000 at 8% for 1 year compounded quarterly.",
        solution:
          "8000 × (1.02)^4"
      }
    },

    {
      name: "Rate Calculation in SI",
      rule: "R = (SI × 100) / (P × T)",
      explanation:
        "Used to calculate rate when SI, principal, and time are given.",
      example: {
        question:
          "SI is ₹300 on ₹1500 for 2 years. Find rate.",
        solution:
          "(300 × 100) / (1500 × 2) = 10%"
      }
    },

    {
      name: "Time Calculation in SI",
      rule: "T = (SI × 100) / (P × R)",
      explanation:
        "Used to calculate time when SI, principal, and rate are given.",
      example: {
        question:
          "SI is ₹400 on ₹2000 at 10%. Find time.",
        solution:
          "(400 × 100) / (2000 × 10) = 2 years"
      }
    },

    {
      name: "Principal Calculation in SI",
      rule: "P = (SI × 100) / (R × T)",
      explanation:
        "Used to calculate principal when SI, rate, and time are given.",
      example: {
        question:
          "SI is ₹500 at 5% for 2 years. Find principal.",
        solution:
          "(500 × 100) / (5 × 2) = ₹5000"
      }
    }
  ]
};

export default SimpleCompoundInterest;
