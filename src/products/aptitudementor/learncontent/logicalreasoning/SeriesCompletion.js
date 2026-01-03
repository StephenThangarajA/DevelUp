const SeriesCompletion = {
  topic: "Series Completion",
  description:
    "Series Completion questions test the ability to identify patterns in numbers, letters, or figures and predict the next term logically.",

  formulas: [
    {
      name: "Arithmetic Series",
      rule: "Add or subtract a constant value",
      explanation:
        "Each term is obtained by adding or subtracting the same number from the previous term.",
      example: {
        question:
          "2, 4, 6, 8, ?",
        solution:
          "10"
      }
    },

    {
      name: "Geometric Series",
      rule: "Multiply or divide by a constant value",
      explanation:
        "Each term is obtained by multiplying or dividing by the same number.",
      example: {
        question:
          "3, 6, 12, 24, ?",
        solution:
          "48"
      }
    },

    {
      name: "Square Series",
      rule: "n² pattern",
      explanation:
        "The terms follow square numbers.",
      example: {
        question:
          "1, 4, 9, 16, ?",
        solution:
          "25"
      }
    },

    {
      name: "Cube Series",
      rule: "n³ pattern",
      explanation:
        "The terms follow cube numbers.",
      example: {
        question:
          "1, 8, 27, 64, ?",
        solution:
          "125"
      }
    },

    {
      name: "Prime Number Series",
      rule: "Prime numbers in order",
      explanation:
        "The series consists of prime numbers arranged in sequence.",
      example: {
        question:
          "2, 3, 5, 7, ?",
        solution:
          "11"
      }
    },

    {
      name: "Alternate Series",
      rule: "Two different patterns alternately",
      explanation:
        "Odd and even positions follow different rules.",
      example: {
        question:
          "2, 5, 4, 7, 6, ?",
        solution:
          "9"
      }
    },

    {
      name: "Difference Series",
      rule: "Difference between terms follows a pattern",
      explanation:
        "The difference between consecutive terms forms a pattern.",
      example: {
        question:
          "1, 4, 9, 16, ?",
        solution:
          "25 (Differences: 3, 5, 7)"
      }
    },

    {
      name: "Mixed Operation Series",
      rule: "Combination of +, −, ×, ÷",
      explanation:
        "The series uses more than one mathematical operation.",
      example: {
        question:
          "5, 11, 23, 47, ?",
        solution:
          "95"
      }
    },

    {
      name: "Alphabet Series",
      rule: "Letter positions increase or decrease",
      explanation:
        "Letters are arranged based on their alphabetical positions.",
      example: {
        question:
          "A, C, E, G, ?",
        solution:
          "I"
      }
    },

    {
      name: "Alphanumeric Series",
      rule: "Combination of letters and numbers",
      explanation:
        "Letters and numbers follow separate patterns in the same series.",
      example: {
        question:
          "A1, B2, C3, D4, ?",
        solution:
          "E5"
      }
    }
  ]
};

export default SeriesCompletion;
