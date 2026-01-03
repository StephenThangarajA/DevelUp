const SeatingArrangement = {
  topic: "Seating Arrangement",
  description:
    "Seating Arrangement questions test the ability to arrange people based on given positional and directional clues in linear or circular formats.",

  formulas: [
    {
      name: "Linear Arrangement (Single Row)",
      rule: "Arrange people in a straight line",
      explanation:
        "People are seated in a single row with clues like left, right, between, or adjacent.",
      example: {
        question:
          "A sits to the left of B and C sits to the right of B. Who is in the middle?",
        solution:
          "B is in the middle"
      }
    },

    {
      name: "Linear Arrangement (Facing Same Direction)",
      rule: "Left and right are based on facing direction",
      explanation:
        "If all people face the same direction, left and right are taken normally.",
      example: {
        question:
          "All face North. A is to the left of B. Which side is A?",
        solution:
          "West side of B"
      }
    },

    {
      name: "Linear Arrangement (Facing Opposite Direction)",
      rule: "Left and right reverse when facing opposite",
      explanation:
        "When someone faces South, their left and right directions get reversed.",
      example: {
        question:
          "A faces South and sits to the left of B. Where is A?",
        solution:
          "East of B"
      }
    },

    {
      name: "Circular Arrangement (Facing Center)",
      rule: "Facing Center → Left is clockwise, Right is anticlockwise",
      explanation:
        "In a circular arrangement facing the center, left and right are reversed compared to linear seating.",
      example: {
        question:
          "A is sitting in a circle facing the center. Who is to the left of A?",
        solution:
          "The person sitting clockwise to A"
      }
    },

    {
      name: "Circular Arrangement (Facing Outside)",
      rule: "Facing Outside → Left is anticlockwise, Right is clockwise",
      explanation:
        "When people face outside the circle, the left-right directions reverse.",
      example: {
        question:
          "A is sitting in a circle facing outside. Who is to the right of A?",
        solution:
          "The person sitting clockwise to A"
      }
    },

    {
      name: "Even Number of Persons (Circle)",
      rule: "Opposite positions = n / 2",
      explanation:
        "In a circular arrangement with even people, the opposite seat is n/2 positions away.",
      example: {
        question:
          "8 people sit in a circle. How many seats apart are opposite persons?",
        solution:
          "4 seats apart"
      }
    },

    {
      name: "Odd Number of Persons (Circle)",
      rule: "No exact opposite seat",
      explanation:
        "In a circular arrangement with an odd number of people, no one sits exactly opposite.",
      example: {
        question:
          "7 people sit in a circle. Does anyone sit exactly opposite?",
        solution:
          "No"
      }
    },

    {
      name: "Between Concept",
      rule: "A sits between B and C → B A C or C A B",
      explanation:
        "When A sits between B and C, A must be adjacent to both.",
      example: {
        question:
          "A sits between B and C. Who are adjacent to A?",
        solution:
          "B and C"
      }
    },

    {
      name: "Adjacent Concept",
      rule: "Next to = Immediate neighbor",
      explanation:
        "Adjacent means directly beside, with no one in between.",
      example: {
        question:
          "A sits next to B. How many people are between them?",
        solution:
          "Zero"
      }
    },

    {
      name: "End Positions (Row)",
      rule: "Ends have only one neighbor",
      explanation:
        "In a straight line, the first and last positions are end positions.",
      example: {
        question:
          "Who has only one neighbor in a row?",
        solution:
          "People sitting at the ends"
      }
    }
  ]
};

export default SeatingArrangement;
