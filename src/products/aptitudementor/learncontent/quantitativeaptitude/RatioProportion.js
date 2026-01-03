const RatioProportion = {
  topic: "Ratio & Proportion",
  description:
    "Ratio and Proportion are used to compare quantities and establish relationships between them. These concepts are fundamental in aptitude exams and real-life comparisons.",

  formulas: [
    {
      name: "Ratio Definition",
      rule: "Ratio = a : b = a / b",
      explanation:
        "A ratio compares two quantities of the same kind.",
      example: {
        question:
          "Find the ratio of 20 and 30.",
        solution:
          "20 : 30 = 2 : 3"
      }
    },

    {
      name: "Proportion Definition",
      rule: "a : b = c : d ⇒ a/b = c/d",
      explanation:
        "Two ratios are said to be in proportion if they are equal.",
      example: {
        question:
          "Check whether 2 : 3 and 4 : 6 are in proportion.",
        solution:
          "2/3 = 4/6 → Yes"
      }
    },

    {
      name: "Fourth Proportional",
      rule: "If a : b = c : x ⇒ x = (b × c) / a",
      explanation:
        "Used to find the fourth proportional.",
      example: {
        question:
          "Find the fourth proportional to 2, 4, 6.",
        solution:
          "x = (4 × 6) / 2 = 12"
      }
    },

    {
      name: "Third Proportional",
      rule: "If a : b = b : x ⇒ x = b² / a",
      explanation:
        "Used to find the third proportional.",
      example: {
        question:
          "Find the third proportional to 3 and 6.",
        solution:
          "x = 6² / 3 = 12"
      }
    },

    {
      name: "Mean Proportional",
      rule: "Mean proportional = √(ab)",
      explanation:
        "The mean proportional between two numbers.",
      example: {
        question:
          "Find mean proportional between 4 and 16.",
        solution:
          "√(4 × 16) = 8"
      }
    },

    {
      name: "Duplicate Ratio",
      rule: "Duplicate ratio of a : b = a² : b²",
      explanation:
        "Ratio formed by squaring both terms.",
      example: {
        question:
          "Find duplicate ratio of 2 : 3.",
        solution:
          "4 : 9"
      }
    },

    {
      name: "Triplicate Ratio",
      rule: "Triplicate ratio of a : b = a³ : b³",
      explanation:
        "Ratio formed by cubing both terms.",
      example: {
        question:
          "Find triplicate ratio of 2 : 3.",
        solution:
          "8 : 27"
      }
    },

    {
      name: "Inverse Ratio",
      rule: "If a : b then inverse = b : a",
      explanation:
        "Used when one quantity increases as the other decreases.",
      example: {
        question:
          "If speed increases, what happens to time?",
        solution:
          "Inverse ratio"
      }
    },

    {
      name: "Compound Ratio",
      rule: "(a : b) × (c : d) = ac : bd",
      explanation:
        "Ratio obtained by multiplying two ratios.",
      example: {
        question:
          "Find compound ratio of 2 : 3 and 4 : 5.",
        solution:
          "8 : 15"
      }
    },

    {
      name: "Division of Quantity in Ratio",
      rule: "Share = (Individual Ratio / Sum of Ratios) × Total",
      explanation:
        "Used to divide a quantity into parts based on ratio.",
      example: {
        question:
          "Divide ₹600 in the ratio 2 : 3.",
        solution:
          "₹240 and ₹360"
      }
    },

    {
      name: "Continued Proportion",
      rule: "a : b = b : c",
      explanation:
        "Three numbers are in continued proportion.",
      example: {
        question:
          "Find c if 4, 8, c are in continued proportion.",
        solution:
          "c = 16"
      }
    }
  ]
};

export default RatioProportion;
