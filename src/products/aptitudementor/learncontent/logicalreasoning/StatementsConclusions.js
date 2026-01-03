const StatementsConclusions = {
  topic: "Statements & Conclusions",
  description:
    "Statements and Conclusions questions test the ability to logically evaluate whether a given conclusion follows from the provided statement(s).",

  formulas: [
    {
      name: "Definitely True Conclusion",
      rule: "Conclusion must follow without doubt",
      explanation:
        "A conclusion is valid only if it logically follows from the statement in all cases, without any assumption.",
      example: {
        question:
          "Statement: All roses are flowers. Conclusion: All roses are flowers.",
        solution:
          "Conclusion follows"
      }
    },

    {
      name: "Assumption-Based Conclusion",
      rule: "Do not assume anything beyond the statement",
      explanation:
        "If a conclusion depends on additional information not given in the statement, it does not follow.",
      example: {
        question:
          "Statement: All students are hardworking. Conclusion: All hardworking people are students.",
        solution:
          "Conclusion does not follow"
      }
    },

    {
      name: "Possibility Conclusion",
      rule: "Possibility is valid if not contradicted",
      explanation:
        "Conclusions containing words like 'some', 'may', or 'possible' can follow if they are not against the statement.",
      example: {
        question:
          "Statement: All doctors are professionals. Conclusion: Some professionals may be doctors.",
        solution:
          "Conclusion follows"
      }
    },

    {
      name: "Extreme Conclusion",
      rule: "Avoid extreme words like all, none, always, never",
      explanation:
        "Conclusions using extreme terms usually do not follow unless explicitly supported.",
      example: {
        question:
          "Statement: Some birds can fly. Conclusion: All birds can fly.",
        solution:
          "Conclusion does not follow"
      }
    },

    {
      name: "Negative Conclusion",
      rule: "Negative conclusion must be clearly supported",
      explanation:
        "A negative conclusion follows only if the statement clearly indicates negation.",
      example: {
        question:
          "Statement: No dogs are cats. Conclusion: No cats are dogs.",
        solution:
          "Conclusion follows"
      }
    },

    {
      name: "Either–Or Conclusion",
      rule: "One must be true, but not both",
      explanation:
        "When two conclusions are mutually exclusive and one is definitely true, then either–or conclusion follows.",
      example: {
        question:
          "Statement: All apples are fruits. Conclusions: (1) Some apples are fruits (2) No apples are fruits",
        solution:
          "Either conclusion 1 or 2 follows"
      }
    },

    {
      name: "Comparison-Based Conclusion",
      rule: "Compare only what is given",
      explanation:
        "Comparative conclusions follow only if direct comparison is provided.",
      example: {
        question:
          "Statement: A is taller than B. Conclusion: B is shorter than A.",
        solution:
          "Conclusion follows"
      }
    },

    {
      name: "Rephrased Conclusion",
      rule: "Same meaning in different words",
      explanation:
        "If a conclusion restates the statement using different wording, it follows.",
      example: {
        question:
          "Statement: All humans are mortal. Conclusion: Every human will die.",
        solution:
          "Conclusion follows"
      }
    },

    {
      name: "Contradictory Conclusion",
      rule: "Opposite of the statement",
      explanation:
        "A conclusion that contradicts the statement never follows.",
      example: {
        question:
          "Statement: Some cars are fast. Conclusion: No car is fast.",
        solution:
          "Conclusion does not follow"
      }
    }
  ]
};

export default StatementsConclusions;
