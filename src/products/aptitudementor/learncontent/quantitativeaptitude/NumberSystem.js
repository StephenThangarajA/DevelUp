const NumberSystem = {
  topic: "Number System",
  description:
    "The Number System forms the foundation of quantitative aptitude. It includes concepts related to digits, divisibility, remainders, units digit, and properties of numbers.",

  formulas: [
    {
      name: "Natural Numbers",
      rule: "N = {1, 2, 3, ...}",
      explanation:
        "Counting numbers starting from 1 are called natural numbers.",
      example: {
        question:
          "Is 15 a natural number?",
        solution:
          "Yes, because it is a positive counting number."
      }
    },

    {
      name: "Whole Numbers",
      rule: "W = {0, 1, 2, 3, ...}",
      explanation:
        "Whole numbers include zero along with natural numbers.",
      example: {
        question:
          "Is 0 a whole number?",
        solution:
          "Yes"
      }
    },

    {
      name: "Integers",
      rule: "Z = {..., -2, -1, 0, 1, 2, ...}",
      explanation:
        "Integers include positive numbers, negative numbers, and zero.",
      example: {
        question:
          "Is -7 an integer?",
        solution:
          "Yes"
      }
    },

    {
      name: "Even and Odd Numbers",
      rule: "Even → divisible by 2; Odd → not divisible by 2",
      explanation:
        "Numbers divisible by 2 are even; others are odd.",
      example: {
        question:
          "Is 18 even or odd?",
        solution:
          "Even"
      }
    },

    {
      name: "Prime Numbers",
      rule: "Exactly two factors: 1 and itself",
      explanation:
        "Prime numbers are divisible only by 1 and the number itself.",
      example: {
        question:
          "Is 13 a prime number?",
        solution:
          "Yes"
      }
    },

    {
      name: "Composite Numbers",
      rule: "More than two factors",
      explanation:
        "Composite numbers have more than two divisors.",
      example: {
        question:
          "Is 12 a composite number?",
        solution:
          "Yes"
      }
    },

    {
      name: "Divisibility Rule of 2",
      rule: "Last digit even → divisible by 2",
      explanation:
        "Checks divisibility by 2.",
      example: {
        question:
          "Is 246 divisible by 2?",
        solution:
          "Yes"
      }
    },

    {
      name: "Divisibility Rule of 3",
      rule: "Sum of digits divisible by 3",
      explanation:
        "Used to check divisibility by 3.",
      example: {
        question:
          "Is 123 divisible by 3?",
        solution:
          "1 + 2 + 3 = 6 → divisible by 3"
      }
    },

    {
      name: "Divisibility Rule of 5",
      rule: "Last digit 0 or 5",
      explanation:
        "Used to check divisibility by 5.",
      example: {
        question:
          "Is 845 divisible by 5?",
        solution:
          "Yes"
      }
    },

    {
      name: "Divisibility Rule of 9",
      rule: "Sum of digits divisible by 9",
      explanation:
        "Used to check divisibility by 9.",
      example: {
        question:
          "Is 729 divisible by 9?",
        solution:
          "7 + 2 + 9 = 18 → divisible by 9"
      }
    },

    {
      name: "Unit Digit Pattern",
      rule: "Repeats every 4 in powers",
      explanation:
        "Used to find the last digit of large powers.",
      example: {
        question:
          "Find unit digit of 7^23.",
        solution:
          "Cycle: 7,9,3,1 → Unit digit = 3"
      }
    },

    {
      name: "Remainder Theorem",
      rule: "Remainder of (a^n mod m)",
      explanation:
        "Used to find remainders of large powers.",
      example: {
        question:
          "Find remainder when 3^5 is divided by 7.",
        solution:
          "3^5 = 243 → 243 mod 7 = 5"
      }
    },

    {
      name: "Factorial",
      rule: "n! = n × (n−1) × ... × 1",
      explanation:
        "Product of all positive integers up to n.",
      example: {
        question:
          "Find 5!",
        solution:
          "5! = 120"
      }
    },

    {
      name: "Trailing Zeros in Factorial",
      rule: "Number of zeros = ⌊n/5⌋ + ⌊n/25⌋ + ...",
      explanation:
        "Used to count trailing zeros in factorial numbers.",
      example: {
        question:
          "Find trailing zeros in 25!",
        solution:
          "⌊25/5⌋ + ⌊25/25⌋ = 5 + 1 = 6"
      }
    }
  ]
};

export default NumberSystem;
