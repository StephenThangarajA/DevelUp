const TimeWork = {
  topic: "Time & Work",
  description:
    "Time and Work problems deal with calculating the time taken by individuals or groups to complete a task based on their efficiency. These questions are common in aptitude and competitive exams.",

  formulas: [
    {
      name: "Basic Work Formula",
      rule: "Work = Rate × Time",
      explanation:
        "Work done is directly proportional to the rate of work and the time taken.",
      example: {
        question:
          "If a person completes a work in 10 days, what is his 1 day’s work?",
        solution:
          "1/10 of the work"
      }
    },

    {
      name: "Time Calculation",
      rule: "Time = Work / Rate",
      explanation:
        "Used to calculate the time taken when work and rate are known.",
      example: {
        question:
          "If a worker’s rate is 1/5 work per day, find time taken.",
        solution:
          "Time = 5 days"
      }
    },

    {
      name: "Combined Work (Two Persons)",
      rule: "1/T = 1/A + 1/B",
      explanation:
        "Used when two persons work together to complete a task.",
      example: {
        question:
          "A can do a work in 10 days and B in 20 days. Find time together.",
        solution:
          "1/T = 1/10 + 1/20 = 3/20 → T = 20/3 days"
      }
    },

    {
      name: "Combined Work (Three Persons)",
      rule: "1/T = 1/A + 1/B + 1/C",
      explanation:
        "Used when three persons work together to complete a task.",
      example: {
        question:
          "A, B, C can do a work in 6, 8, and 12 days. Find time together.",
        solution:
          "1/T = 1/6 + 1/8 + 1/12 = 3/8 → T = 8/3 days"
      }
    },

    {
      name: "Work Efficiency Ratio",
      rule: "Efficiency ∝ 1 / Time",
      explanation:
        "A person who takes less time is more efficient.",
      example: {
        question:
          "A takes 10 days and B takes 20 days. Find efficiency ratio.",
        solution:
          "Efficiency A : B = 2 : 1"
      }
    },

    {
      name: "Men-Days Concept",
      rule: "Men × Days = Constant",
      explanation:
        "Used when work depends on number of workers and days.",
      example: {
        question:
          "10 men can do a work in 12 days. How many days will 15 men take?",
        solution:
          "(10 × 12) / 15 = 8 days"
      }
    },

    {
      name: "Work with Different Efficiencies",
      rule: "Total Work = LCM of individual times",
      explanation:
        "LCM method simplifies solving time and work problems.",
      example: {
        question:
          "A takes 4 days and B takes 6 days. Find time together using LCM.",
        solution:
          "Total work = 12 units → Rate = 5 units/day → Time = 12/5 days"
      }
    },

    {
      name: "Alternate Days Work",
      rule: "Use individual daily work values alternately",
      explanation:
        "Used when two or more persons work on alternate days.",
      example: {
        question:
          "A and B work alternately. A takes 10 days, B takes 20 days. Find total time.",
        solution:
          "A = 1/10, B = 1/20 → 2 days work = 3/20 → Solve accordingly"
      }
    },

    {
      name: "Work with Wages",
      rule: "Wages ∝ Work Done",
      explanation:
        "Used to divide wages based on work contribution.",
      example: {
        question:
          "A and B earn ₹3000. A works 10 days, B works 5 days. Find A’s share.",
        solution:
          "A : B = 2 : 1 → A’s share = ₹2000"
      }
    }
  ]
};

export default TimeWork;
