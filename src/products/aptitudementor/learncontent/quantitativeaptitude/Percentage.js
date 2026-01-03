const PERCENTAGE_TOPIC = {
  topic: "Percentage",
  description:
    "Percentage represents a value out of 100. It is widely used in aptitude problems involving comparison, increase-decrease, profit-loss, and data interpretation.",

  formulas: [
    {
      name: "Percentage Definition",
      rule: "Percentage = (Value / Total) × 100",
      explanation:
        "Used to express a number as a part of 100.",
      example: {
        question:
          "What percentage of 50 is 10?",
        solution:
          "(10 / 50) × 100 = 20%"
      }
    },

    {
      name: "Finding Value from Percentage",
      rule: "Value = (Percentage × Total) / 100",
      explanation:
        "Used when percentage and total value are known.",
      example: {
        question:
          "Find 25% of 200.",
        solution:
          "(25 × 200) / 100 = 50"
      }
    },

    {
      name: "Percentage Increase",
      rule: "Increase % = ((New − Old) / Old) × 100",
      explanation:
        "Used to calculate percentage increase in value.",
      example: {
        question:
          "Salary increases from 10,000 to 12,000. Find increase %.",
        solution:
          "((12000 − 10000) / 10000) × 100 = 20%"
      }
    },

    {
      name: "Percentage Decrease",
      rule: "Decrease % = ((Old − New) / Old) × 100",
      explanation:
        "Used to calculate percentage decrease in value.",
      example: {
        question:
          "Price decreases from 500 to 400. Find decrease %.",
        solution:
          "((500 − 400) / 500) × 100 = 20%"
      }
    },

    {
      name: "Successive Percentage Change",
      rule: "Net % Change = a + b + (ab / 100)",
      explanation:
        "Used when two successive percentage changes occur.",
      example: {
        question:
          "Price increases by 10% and then by 20%. Find net increase.",
        solution:
          "10 + 20 + (10×20)/100 = 32%"
      }
    },

    {
      name: "Reverse Percentage",
      rule: "Original Value = (Current Value × 100) / (100 ± %)",
      explanation:
        "Used to find original value after increase or decrease.",
      example: {
        question:
          "After 20% increase, price becomes 1200. Find original price.",
        solution:
          "(1200 × 100) / 120 = 1000"
      }
    },

    {
      name: "Percentage Comparison",
      rule: "Difference % = (Difference / Base Value) × 100",
      explanation:
        "Used to compare two quantities in percentage terms.",
      example: {
        question:
          "A is 40 and B is 50. By what percent is A less than B?",
        solution:
          "((50 − 40) / 50) × 100 = 20%"
      }
    },

    {
      name: "Population Growth",
      rule: "Future Population = Present × (1 + r/100)^n",
      explanation:
        "Used to calculate population growth over time.",
      example: {
        question:
          "Population is 10,000 with 10% growth for 2 years. Find future population.",
        solution:
          "10000 × (1.1)^2 = 12100"
      }
    },

    {
      name: "Depreciation",
      rule: "Value = Initial × (1 − r/100)^n",
      explanation:
        "Used to calculate value after depreciation.",
      example: {
        question:
          "Value of a machine is 50,000 with 10% depreciation for 2 years.",
        solution:
          "50000 × (0.9)^2 = 40500"
      }
    },

    {
      name: "Error Percentage",
      rule: "Error % = (Error / True Value) × 100",
      explanation:
        "Used to calculate percentage error.",
      example: {
        question:
          "Measured value is 98 and true value is 100. Find error %.",
        solution:
          "(2 / 100) × 100 = 2%"
      }
    }
  ]
};

export default PERCENTAGE_TOPIC;