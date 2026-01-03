const Puzzles = {
  topic: "Puzzles",
  description:
    "Puzzle questions test logical thinking and analytical ability by arranging people or objects based on given conditions.",

  formulas: [
    {
      name: "Linear Arrangement",
      rule: "Arrange entities in a straight line based on positional clues",
      explanation:
        "People or objects are arranged in a single row using clues like left, right, between, or adjacent.",
      example: {
        question:
          "A is to the left of B, and C is to the right of B. Who is in the middle?",
        solution:
          "B is in the middle"
      }
    },

    {
      name: "Circular Arrangement",
      rule: "Arrange entities in a circle (facing center or outside)",
      explanation:
        "All positions are relative in a circle; left and right depend on whether entities face the center or outside.",
      example: {
        question:
          "Five people sit in a circle facing the center. Who is to the left of A?",
        solution:
          "The person immediately clockwise to A"
      }
    },

    {
      name: "Floor / Building Puzzle",
      rule: "Top floor is highest number, bottom floor is lowest",
      explanation:
        "People live on different floors and clues are used to determine exact floor positions.",
      example: {
        question:
          "A lives above B but below C. Who lives on the top floor?",
        solution:
          "C"
      }
    },

    {
      name: "Day / Time Scheduling",
      rule: "Match persons to days or time slots",
      explanation:
        "Entities are assigned to different days, dates, or times using conditional clues.",
      example: {
        question:
          "A’s meeting is after B’s but before C’s. Who meets last?",
        solution:
          "C"
      }
    },

    {
      name: "Blood Relation Puzzle",
      rule: "Use family relationship rules to arrange members",
      explanation:
        "Multiple blood relation clues are combined to form a logical family structure.",
      example: {
        question:
          "A is the father of B, and C is the sister of B. Who is C?",
        solution:
          "C is the daughter of A"
      }
    },

    {
      name: "Comparison Puzzle",
      rule: "Rank entities using comparative clues",
      explanation:
        "Used when clues include tallest, shortest, oldest, youngest, etc.",
      example: {
        question:
          "A is taller than B but shorter than C. Who is the tallest?",
        solution:
          "C"
      }
    },

    {
      name: "Box / Slot Puzzle",
      rule: "One entity per slot unless stated otherwise",
      explanation:
        "Objects are placed in boxes or slots based on conditions like not together or adjacent.",
      example: {
        question:
          "Red box is not next to Blue box. Which box can be in the middle?",
        solution:
          "Any box except Red or Blue"
      }
    },

    {
      name: "Truth–Lie Puzzle",
      rule: "Assume one statement true and others false",
      explanation:
        "Used when some people always tell the truth and others always lie.",
      example: {
        question:
          "A says B is lying. B says A is lying. Who is telling the truth?",
        solution:
          "Cannot be determined with given data"
      }
    },

    {
      name: "Input–Output Puzzle",
      rule: "Observe step-by-step pattern changes",
      explanation:
        "Numbers or words change in each step following a fixed pattern.",
      example: {
        question:
          "Step 1: 4 3 2 1 → Step 2: 1 4 3 2. What is the pattern?",
        solution:
          "Last element moves to the front"
      }
    },

    {
      name: "Multiple Variable Puzzle",
      rule: "Create a table to track multiple attributes",
      explanation:
        "Used when people are matched with more than one attribute like color, city, profession, etc.",
      example: {
        question:
          "A likes red, B likes blue, C likes green. Who likes green?",
        solution:
          "C"
      }
    }
  ]
};

export default Puzzles;
