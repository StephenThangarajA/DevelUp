const Average = {
  topic: "Average",
  description:
    "Average represents the central value of a set of numbers and is widely used in aptitude problems involving numbers, ages, marks, speed, and income.",

  formulas: [
    {
      name: "Basic Average Formula",
      rule: "Average = Sum of observations / Number of observations",
      explanation:
        "Used to find the mean value of a given set of numbers.",
      example: {
        question:
          "Find the average of 2, 4, 6, 8",
        solution:
          "Average = (2 + 4 + 6 + 8) / 4 = 5"
      }
    },

    {
      name: "Sum Using Average",
      rule: "Sum = Average × Number of observations",
      explanation:
        "If average and count are known, total sum can be calculated.",
      example: {
        question:
          "The average of 5 numbers is 10. Find their sum.",
        solution:
          "Sum = 10 × 5 = 50"
      }
    },

    {
      name: "Average of First n Natural Numbers",
      rule: "Average = (n + 1) / 2",
      explanation:
        "Used when numbers are consecutive natural numbers starting from 1.",
      example: {
        question:
          "Find the average of first 10 natural numbers.",
        solution:
          "Average = (10 + 1) / 2 = 5.5"
      }
    },

    {
      name: "Average After Adding a Number",
      rule: "New Average = (Old Sum + New Value) / (Old Count + 1)",
      explanation:
        "Used when a new value is added to the data set.",
      example: {
        question:
          "Average of 4 numbers is 20. A number 30 is added. Find new average.",
        solution:
          "New Average = (80 + 30) / 5 = 22"
      }
    },

    {
      name: "Average After Removing a Number",
      rule: "New Average = (Old Sum − Removed Value) / (Old Count − 1)",
      explanation:
        "Used when a value is removed from the data set.",
      example: {
        question:
          "Average of 5 numbers is 18. One number 10 is removed. Find new average.",
        solution:
          "New Average = (90 − 10) / 4 = 20"
      }
    },

    {
      name: "Average of Combined Groups",
      rule: "Combined Average = Total Sum / Total Count",
      explanation:
        "Used to find average when two or more groups are combined.",
      example: {
        question:
          "Average of 10 students is 40 and of 5 students is 50. Find combined average.",
        solution:
          "Combined Average = (400 + 250) / 15 = 43.33"
      }
    },

    {
      name: "Replacement Concept",
      rule: "Change in Sum = New Value − Old Value",
      explanation:
        "Used when one value in a group is replaced by another.",
      example: {
        question:
          "Average of 6 numbers is 12. One number 10 is replaced by 16. Find new average.",
        solution:
          "New Average = (72 + 6) / 6 = 13"
      }
    },

    {
      name: "Average Speed (Equal Distance)",
      rule: "Average Speed = (2ab) / (a + b)",
      explanation:
        "Used when a body travels equal distances at two different speeds.",
      example: {
        question:
          "A person travels equal distances at 40 km/h and 60 km/h. Find average speed.",
        solution:
          "Average Speed = (2 × 40 × 60) / (40 + 60) = 48 km/h"
      }
    },

    {
      name: "Age-Based Average",
      rule: "Total Age = Average Age × Number of People",
      explanation:
        "Used in problems involving ages of people.",
      example: {
        question:
          "Average age of 4 people is 25. Find total age.",
        solution:
          "Total Age = 25 × 4 = 100"
      }
    }
  ]
};

export default Average;
