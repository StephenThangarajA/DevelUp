const Probability = {
  topic: "Probability",
  description:
    "Probability measures the likelihood of an event occurring. It is widely used in aptitude exams to analyze random events and outcomes.",

  formulas: [
    {
      name: "Basic Probability Formula",
      rule: "Probability = Favorable outcomes / Total outcomes",
      explanation:
        "Used when all outcomes are equally likely.",
      example: {
        question:
          "What is the probability of getting a head when a coin is tossed?",
        solution:
          "1 / 2"
      }
    },

    {
      name: "Probability of an Event Not Occurring",
      rule: "P(Not A) = 1 − P(A)",
      explanation:
        "Used to calculate probability of complementary events.",
      example: {
        question:
          "If probability of rain is 0.3, find probability that it will not rain.",
        solution:
          "1 − 0.3 = 0.7"
      }
    },

    {
      name: "Addition Law of Probability",
      rule: "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)",
      explanation:
        "Used when two events can occur together.",
      example: {
        question:
          "Probability of A is 0.4 and B is 0.5 and both is 0.1. Find P(A or B).",
        solution:
          "0.4 + 0.5 − 0.1 = 0.8"
      }
    },

    {
      name: "Addition Law (Mutually Exclusive Events)",
      rule: "P(A ∪ B) = P(A) + P(B)",
      explanation:
        "Used when two events cannot occur together.",
      example: {
        question:
          "A card drawn is either a king or a queen. Find probability.",
        solution:
          "(4 + 4) / 52 = 8 / 52 = 2 / 13"
      }
    },

    {
      name: "Multiplication Law of Probability",
      rule: "P(A ∩ B) = P(A) × P(B)",
      explanation:
        "Used when events are independent.",
      example: {
        question:
          "Find probability of getting head twice in two coin tosses.",
        solution:
          "1/2 × 1/2 = 1/4"
      }
    },

    {
      name: "Conditional Probability",
      rule: "P(A | B) = P(A ∩ B) / P(B)",
      explanation:
        "Used when probability of A depends on B.",
      example: {
        question:
          "Find probability of drawing an ace given that a card drawn is red.",
        solution:
          "2 / 26 = 1 / 13"
      }
    },

    {
      name: "Probability of At Least One Event",
      rule: "P(At least one) = 1 − P(None)",
      explanation:
        "Used when probability of one or more events is needed.",
      example: {
        question:
          "Find probability of at least one head in two coin tosses.",
        solution:
          "1 − (1/2 × 1/2) = 3/4"
      }
    },

    {
      name: "Independent Events",
      rule: "P(A ∩ B) = P(A) × P(B)",
      explanation:
        "Events whose occurrence does not affect each other.",
      example: {
        question:
          "Drawing a card and tossing a coin.",
        solution:
          "Independent events"
      }
    },

    {
      name: "Dependent Events",
      rule: "P(A ∩ B) = P(A) × P(B | A)",
      explanation:
        "Events where the outcome of one affects the other.",
      example: {
        question:
          "Two cards drawn successively without replacement.",
        solution:
          "Dependent events"
      }
    },

    {
      name: "Probability Using Permutations",
      rule: "Probability = Favorable arrangements / Total arrangements",
      explanation:
        "Used when order of outcomes matters.",
      example: {
        question:
          "What is the probability that digits 1, 2, 3 form a number divisible by 3?",
        solution:
          "All permutations are divisible by 3 → Probability = 1"
      }
    }
  ]
};

export default Probability;
