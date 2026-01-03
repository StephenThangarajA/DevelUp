const SpeedDistance = {
  topic: "Speed, Distance & Time",
  description:
    "Speed, Distance, and Time problems involve calculating how fast an object moves, how far it travels, and the time taken. This topic is widely used in aptitude and competitive exams.",

  formulas: [
    {
      name: "Basic Speed Formula",
      rule: "Speed = Distance / Time",
      explanation:
        "Used to calculate speed when distance and time are known.",
      example: {
        question:
          "A car travels 120 km in 2 hours. Find its speed.",
        solution:
          "Speed = 120 / 2 = 60 km/hr"
      }
    },

    {
      name: "Distance Formula",
      rule: "Distance = Speed × Time",
      explanation:
        "Used to calculate distance when speed and time are given.",
      example: {
        question:
          "A train runs at 50 km/hr for 3 hours. Find the distance covered.",
        solution:
          "Distance = 50 × 3 = 150 km"
      }
    },

    {
      name: "Time Formula",
      rule: "Time = Distance / Speed",
      explanation:
        "Used to calculate time when distance and speed are given.",
      example: {
        question:
          "A cyclist covers 90 km at 30 km/hr. Find the time taken.",
        solution:
          "Time = 90 / 30 = 3 hours"
      }
    },

    {
      name: "Unit Conversion",
      rule: "1 km/hr = 5/18 m/s",
      explanation:
        "Used to convert speed from km/hr to m/s.",
      example: {
        question:
          "Convert 72 km/hr to m/s.",
        solution:
          "72 × 5/18 = 20 m/s"
      }
    },

    {
      name: "Unit Conversion",
      rule: "1 m/s = 18/5 km/hr",
      explanation:
        "Used to convert speed from m/s to km/hr.",
      example: {
        question:
          "Convert 10 m/s to km/hr.",
        solution:
          "10 × 18/5 = 36 km/hr"
      }
    },

    {
      name: "Average Speed (Equal Distance)",
      rule: "Average Speed = (2ab) / (a + b)",
      explanation:
        "Used when equal distances are covered at speeds a and b.",
      example: {
        question:
          "A person travels equal distances at 40 km/hr and 60 km/hr. Find average speed.",
        solution:
          "(2 × 40 × 60) / (40 + 60) = 48 km/hr"
      }
    },

    {
      name: "Average Speed (General)",
      rule: "Average Speed = Total Distance / Total Time",
      explanation:
        "Used when distances or speeds are unequal.",
      example: {
        question:
          "A car travels 60 km at 30 km/hr and 40 km at 20 km/hr. Find average speed.",
        solution:
          "Total distance = 100 km, Total time = 2 + 2 = 4 hrs → 25 km/hr"
      }
    },

    {
      name: "Relative Speed (Same Direction)",
      rule: "Relative Speed = |a − b|",
      explanation:
        "Used when two objects move in the same direction.",
      example: {
        question:
          "Two cars move at 60 km/hr and 40 km/hr in the same direction. Find relative speed.",
        solution:
          "60 − 40 = 20 km/hr"
      }
    },

    {
      name: "Relative Speed (Opposite Direction)",
      rule: "Relative Speed = a + b",
      explanation:
        "Used when two objects move in opposite directions.",
      example: {
        question:
          "Two trains move at 50 km/hr and 70 km/hr in opposite directions. Find relative speed.",
        solution:
          "50 + 70 = 120 km/hr"
      }
    },

    {
      name: "Time to Cross a Person",
      rule: "Time = Length / Speed",
      explanation:
        "Used when a moving object crosses a stationary object.",
      example: {
        question:
          "A train 100 m long crosses a pole at 20 m/s. Find time taken.",
        solution:
          "100 / 20 = 5 seconds"
      }
    },

    {
      name: "Time to Cross a Train",
      rule: "Time = (Length₁ + Length₂) / Relative Speed",
      explanation:
        "Used when one moving object crosses another moving object.",
      example: {
        question:
          "Two trains of lengths 100 m and 150 m cross each other at relative speed 50 m/s. Find time.",
        solution:
          "(100 + 150) / 50 = 5 seconds"
      }
    }
  ]
};

export default SpeedDistance;
