const content = {
  topic: "Permutations & Combinations",
  description:
    "Permutations and Combinations deal with counting techniques. Permutations focus on arrangements where order matters, while combinations focus on selections where order does not matter.",

  formulas: [
    {
      name: "Factorial",
      rule: "n! = n × (n − 1) × (n − 2) × ... × 1",
      explanation:
        "Factorial represents the product of all positive integers up to n.",
      example: {
        question:
          "Find 5!",
        solution:
          "5! = 120"
      }
    },

    {
      name: "Permutation Formula",
      rule: "nPr = n! / (n − r)!",
      explanation:
        "Used when order of arrangement matters.",
      example: {
        question:
          "In how many ways can 3 students be arranged from 5 students?",
        solution:
          "5P3 = 5! / 2! = 60"
      }
    },

    {
      name: "Combination Formula",
      rule: "nCr = n! / [r! (n − r)!]",
      explanation:
        "Used when order of selection does not matter.",
      example: {
        question:
          "In how many ways can 3 students be selected from 5 students?",
        solution:
          "5C3 = 10"
      }
    },

    {
      name: "Relationship Between nPr and nCr",
      rule: "nPr = nCr × r!",
      explanation:
        "Shows the connection between permutation and combination.",
      example: {
        question:
          "Find 6P2 using combinations.",
        solution:
          "6C2 × 2! = 15 × 2 = 30"
      }
    },

    {
      name: "Circular Permutation",
      rule: "(n − 1)!",
      explanation:
        "Used when arrangements are made in a circle.",
      example: {
        question:
          "In how many ways can 5 people sit around a round table?",
        solution:
          "(5 − 1)! = 24"
      }
    },

    {
      name: "Permutation with Repetition",
      rule: "n^r",
      explanation:
        "Used when repetition of elements is allowed.",
      example: {
        question:
          "How many 3-digit numbers can be formed using digits 1 to 5 (repetition allowed)?",
        solution:
          "5^3 = 125"
      }
    },

    {
      name: "Combination with Repetition",
      rule: "(n + r − 1)Cr",
      explanation:
        "Used when repetition is allowed in combinations.",
      example: {
        question:
          "In how many ways can 3 chocolates be selected from 5 types?",
        solution:
          "(5 + 3 − 1)C3 = 7C3 = 35"
      }
    },

    {
      name: "Arrangements of Repeated Letters",
      rule: "n! / (p! q! r!)",
      explanation:
        "Used when some objects are identical.",
      example: {
        question:
          "How many distinct arrangements of the word 'LEVEL' are possible?",
        solution:
          "5! / (2! 2!) = 30"
      }
    },

    {
      name: "Number of Subsets",
      rule: "2^n",
      explanation:
        "Used to find total subsets of a set with n elements.",
      example: {
        question:
          "How many subsets does a set with 4 elements have?",
        solution:
          "2^4 = 16"
      }
    },

    {
      name: "Selection at Least One",
      rule: "Total − None",
      explanation:
        "Used when at least one selection condition is given.",
      example: {
        question:
          "From 5 boys and 3 girls, how many teams can be formed with at least one girl?",
        solution:
          "Total teams − teams with no girls"
      }
    }
  ]
};

export default content;
