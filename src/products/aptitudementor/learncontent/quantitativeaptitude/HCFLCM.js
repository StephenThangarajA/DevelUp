const LcmHcf = {
  topic: "HCF & LCM",
  description:
    "HCF (Highest Common Factor) and LCM (Least Common Multiple) are fundamental concepts used to solve problems involving divisibility, fractions, time cycles, and number relationships.",

  formulas: [
    {
      name: "HCF Definition",
      rule: "HCF = Greatest number that divides all given numbers",
      explanation:
        "HCF is the largest number that divides two or more numbers without leaving a remainder.",
      example: {
        question:
          "Find HCF of 12 and 18.",
        solution:
          "Factors of 12: 1,2,3,4,6,12; Factors of 18: 1,2,3,6,9,18 → HCF = 6"
      }
    },

    {
      name: "LCM Definition",
      rule: "LCM = Smallest number divisible by all given numbers",
      explanation:
        "LCM is the least number that is a multiple of each given number.",
      example: {
        question:
          "Find LCM of 4 and 6.",
        solution:
          "Multiples of 4: 4,8,12; Multiples of 6: 6,12 → LCM = 12"
      }
    },

    {
      name: "Product Formula",
      rule: "HCF × LCM = Product of two numbers",
      explanation:
        "This formula is used when HCF or LCM is missing for two numbers.",
      example: {
        question:
          "HCF of two numbers is 6 and their LCM is 180. Find the numbers.",
        solution:
          "Let numbers be 6x and 6y → 6 × 180 = (6x)(6y)"
      }
    },

    {
      name: "HCF of Fractions",
      rule: "HCF = HCF of numerators / LCM of denominators",
      explanation:
        "Used when HCF of fractional numbers is required.",
      example: {
        question:
          "Find HCF of 2/3 and 4/9.",
        solution:
          "HCF = HCF(2,4) / LCM(3,9) = 2 / 9"
      }
    },

    {
      name: "LCM of Fractions",
      rule: "LCM = LCM of numerators / HCF of denominators",
      explanation:
        "Used to calculate LCM of fractions.",
      example: {
        question:
          "Find LCM of 3/4 and 5/6.",
        solution:
          "LCM = LCM(3,5) / HCF(4,6) = 15 / 2"
      }
    },

    {
      name: "HCF by Division Method",
      rule: "Repeated division until remainder is 0",
      explanation:
        "Euclid’s division algorithm is used to find HCF efficiently.",
      example: {
        question:
          "Find HCF of 48 and 18.",
        solution:
          "48 ÷ 18 → remainder 12; 18 ÷ 12 → remainder 6; 12 ÷ 6 → remainder 0 → HCF = 6"
      }
    },

    {
      name: "LCM by Prime Factorization",
      rule: "LCM = Product of highest powers of all primes",
      explanation:
        "Find prime factors and take highest power of each prime.",
      example: {
        question:
          "Find LCM of 12 and 20.",
        solution:
          "12 = 2² × 3; 20 = 2² × 5 → LCM = 2² × 3 × 5 = 60"
      }
    },

    {
      name: "HCF by Prime Factorization",
      rule: "HCF = Product of lowest powers of common primes",
      explanation:
        "Only common prime factors are considered.",
      example: {
        question:
          "Find HCF of 36 and 48.",
        solution:
          "36 = 2² × 3²; 48 = 2⁴ × 3 → HCF = 2² × 3 = 12"
      }
    },

    {
      name: "Co-prime Numbers",
      rule: "HCF = 1",
      explanation:
        "Two numbers are co-prime if they have no common factor other than 1.",
      example: {
        question:
          "Are 8 and 15 co-prime?",
        solution:
          "Yes, HCF = 1"
      }
    },

    {
      name: "Application in Time Problems",
      rule: "LCM used to find common time cycle",
      explanation:
        "LCM is used in problems involving repeating events.",
      example: {
        question:
          "Two bells ring every 6 and 8 minutes. When will they ring together?",
        solution:
          "LCM(6,8) = 24 minutes"
      }
    }
  ]
};

export default LcmHcf;
