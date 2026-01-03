const DirectionSense = {
  topic: "Direction Sense",
  description:
    "Direction Sense questions test the ability to track movement, identify final direction, and calculate distance based on given directions and turns.",

  formulas: [
    {
      name: "Basic Directions",
      rule: "North, South, East, West",
      explanation:
        "North is opposite to South and East is opposite to West. All movements are based on these four directions.",
      example: {
        question:
          "Which direction is opposite to East?",
        solution:
          "West"
      }
    },

    {
      name: "Right Turn Rule",
      rule: "Facing North → Right = East",
      explanation:
        "A right turn from the current direction changes the facing direction clockwise.",
      example: {
        question:
          "A person facing North turns right. Which direction is he facing now?",
        solution:
          "East"
      }
    },

    {
      name: "Left Turn Rule",
      rule: "Facing North → Left = West",
      explanation:
        "A left turn from the current direction changes the facing direction anticlockwise.",
      example: {
        question:
          "A person facing North turns left. Which direction is he facing now?",
        solution:
          "West"
      }
    },

    {
      name: "Opposite Direction",
      rule: "Turn 180° → Opposite Direction",
      explanation:
        "A 180-degree turn always results in facing the opposite direction.",
      example: {
        question:
          "A person facing East turns 180°. Which direction is he facing?",
        solution:
          "West"
      }
    },

    {
      name: "Three Right Turns",
      rule: "3 Right Turns = 1 Left Turn",
      explanation:
        "Three right turns equal a 270-degree rotation, which is the same as one left turn.",
      example: {
        question:
          "A person faces North and turns right three times. Which direction is he facing?",
        solution:
          "West"
      }
    },

    {
      name: "Distance Calculation (Straight Line)",
      rule: "Distance = |Forward − Backward|",
      explanation:
        "When moving forward and backward in the same direction, subtract distances to find net displacement.",
      example: {
        question:
          "A person walks 10 m North and then 4 m South. How far is he from the starting point?",
        solution:
          "6 meters"
      }
    },

    {
      name: "Right Angle Movement",
      rule: "Use Pythagoras Theorem",
      explanation:
        "When movement is at right angles, apply √(a² + b²) to find the shortest distance.",
      example: {
        question:
          "A person walks 3 m East and 4 m North. How far is he from the starting point?",
        solution:
          "5 meters"
      }
    },

    {
      name: "Final Direction Identification",
      rule: "Track every turn step by step",
      explanation:
        "Keep track of facing direction after each movement to find the final direction.",
      example: {
        question:
          "A person walks 5 m South, turns left, and walks 3 m. Which direction is he facing?",
        solution:
          "East"
      }
    },

    {
      name: "Clockwise Turn",
      rule: "Clockwise: N → E → S → W",
      explanation:
        "Clockwise turns move in the order North, East, South, West.",
      example: {
        question:
          "From North, one clockwise turn leads to which direction?",
        solution:
          "East"
      }
    },

    {
      name: "Anti-Clockwise Turn",
      rule: "Anti-clockwise: N → W → S → E",
      explanation:
        "Anti-clockwise turns move in the order North, West, South, East.",
      example: {
        question:
          "From North, one anti-clockwise turn leads to which direction?",
        solution:
          "West"
      }
    }
  ]
};

export default DirectionSense;
