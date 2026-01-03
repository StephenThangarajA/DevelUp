const Simplification = {
  topic: "Simplification",
  description:
    "Simplification focuses on solving numerical expressions using arithmetic rules, BODMAS, fractions, decimals, squares, cubes, and surds. It is a high-scoring topic in aptitude exams.",

  formulas: [
    {
      name: "BODMAS Rule",
      rule: "Brackets → Orders → Division → Multiplication → Addition → Subtraction",
      explanation:
        "Expressions must be solved in the correct order to get the right result.",
      example: {
        question:
          "Solve: 8 + 2 × (3 + 4)",
        solution:
          "8 + 2 × 7 = 8 + 14 = 22"
      }
    },

    {
      name: "Square of a Number",
      rule: "a² = a × a",
      explanation:
        "Square is the product of a number with itself.",
      example: {
        question:
          "Find 15²",
        solution:
          "15 × 15 = 225"
      }
    },

    {
      name: "Cube of a Number",
      rule: "a³ = a × a × a",
      explanation:
        "Cube is the product of a number multiplied three times.",
      example: {
        question:
          "Find 4³",
        solution:
          "4 × 4 × 4 = 64"
      }
    },

    {
      name: "Fraction Addition",
      rule: "a/b + c/d = (ad + bc) / bd",
      explanation:
        "Fractions are added by taking a common denominator.",
      example: {
        question:
          "Simplify: 1/2 + 1/3",
        solution:
          "(3 + 2) / 6 = 5/6"
      }
    },

    {
      name: "Fraction Multiplication",
      rule: "(a/b) × (c/d) = ac / bd",
      explanation:
        "Multiply numerators and denominators directly.",
      example: {
        question:
          "Simplify: 2/3 × 4/5",
        solution:
          "8/15"
      }
    },

    {
      name: "Decimal to Fraction",
      rule: "0.25 = 25/100 = 1/4",
      explanation:
        "Decimals can be converted into fractions by removing the decimal point.",
      example: {
        question:
          "Convert 0.6 into fraction",
        solution:
          "6/10 = 3/5"
      }
    },

    {
      name: "Percentage to Fraction",
      rule: "x% = x/100",
      explanation:
        "Percentage can be written as a fraction by dividing by 100.",
      example: {
        question:
          "Convert 20% into fraction",
        solution:
          "20/100 = 1/5"
      }
    },

    {
      name: "Surds Simplification",
      rule: "√(a × b) = √a × √b",
      explanation:
        "Surds can be simplified by splitting into perfect squares.",
      example: {
        question:
          "Simplify: √50",
        solution:
          "√(25 × 2) = 5√2"
      }
    },

    {
      name: "Indices Law (Multiplication)",
      rule: "a^m × a^n = a^(m+n)",
      explanation:
        "When multiplying same bases, add the powers.",
      example: {
        question:
          "Simplify: 2³ × 2²",
        solution:
          "2⁵ = 32"
      }
    },

    {
      name: "Indices Law (Division)",
      rule: "a^m ÷ a^n = a^(m−n)",
      explanation:
        "When dividing same bases, subtract the powers.",
      example: {
        question:
          "Simplify: 5⁴ ÷ 5²",
        solution:
          "5² = 25"
      }
    }
  ]
};

export default Simplification;
