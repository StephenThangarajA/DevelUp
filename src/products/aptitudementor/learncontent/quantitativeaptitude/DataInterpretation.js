const DataInterpretation = {
  topic: "Data Interpretation",
  description:
    "Data Interpretation involves analyzing data presented in tables, charts, and graphs to answer questions using basic arithmetic and logical reasoning.",

  formulas: [
    {
      name: "Percentage Calculation",
      rule: "Percentage = (Part / Whole) × 100",
      explanation:
        "Used to calculate the percentage share of a value in total data.",
      example: {
        question:
          "If total sales are 500 and product A sales are 125, find the percentage share.",
        solution:
          "(125 / 500) × 100 = 25%"
      }
    },

    {
      name: "Average Calculation",
      rule: "Average = Sum of values / Number of values",
      explanation:
        "Used to find the mean value of data points.",
      example: {
        question:
          "Find average of 10, 20, 30, 40",
        solution:
          "(10 + 20 + 30 + 40) / 4 = 25"
      }
    },

    {
      name: "Ratio Comparison",
      rule: "Ratio = Value1 : Value2",
      explanation:
        "Used to compare two quantities in DI questions.",
      example: {
        question:
          "If Company A profit is 200 and Company B profit is 300, find the ratio.",
        solution:
          "200 : 300 = 2 : 3"
      }
    },

    {
      name: "Difference Calculation",
      rule: "Difference = Larger Value − Smaller Value",
      explanation:
        "Used to find increase or decrease between two data values.",
      example: {
        question:
          "Find difference between 450 and 320.",
        solution:
          "450 − 320 = 130"
      }
    },

    {
      name: "Growth / Decline Percentage",
      rule: "((New − Old) / Old) × 100",
      explanation:
        "Used to calculate percentage increase or decrease.",
      example: {
        question:
          "Profit increases from 200 to 260. Find growth percentage.",
        solution:
          "((260 − 200) / 200) × 100 = 30%"
      }
    },

    {
      name: "Pie Chart Angle Calculation",
      rule: "Angle = (Value / Total) × 360°",
      explanation:
        "Used to calculate angle of a segment in a pie chart.",
      example: {
        question:
          "If a sector represents 90 out of 360 units, find its angle.",
        solution:
          "(90 / 360) × 360 = 90°"
      }
    },

    {
      name: "Line Graph Trend Analysis",
      rule: "Observe rise and fall over time",
      explanation:
        "Used to identify trends, highest or lowest values in line graphs.",
      example: {
        question:
          "Sales increased from January to March. What is the trend?",
        solution:
          "Upward trend"
      }
    },

    {
      name: "Tabular Data Analysis",
      rule: "Row-wise and column-wise comparison",
      explanation:
        "Used to extract and compare values from tables.",
      example: {
        question:
          "Which year has the highest sales from the given table?",
        solution:
          "The year with the maximum value"
      }
    },

    {
      name: "Cumulative Data",
      rule: "Add values sequentially",
      explanation:
        "Used when cumulative totals are required.",
      example: {
        question:
          "Find total sales for 5 years if yearly sales are given.",
        solution:
          "Sum of all yearly values"
      }
    },

    {
      name: "Time-Based Comparison",
      rule: "Compare same category across different periods",
      explanation:
        "Used in questions involving year-wise or month-wise data.",
      example: {
        question:
          "Compare profit of 2022 and 2024.",
        solution:
          "Subtract or ratio comparison"
      }
    }
  ]
};

export default DataInterpretation;
