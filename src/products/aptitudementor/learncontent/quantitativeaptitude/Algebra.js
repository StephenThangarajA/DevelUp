const Algebra = {
  topic: "Algebra",
  description:
    "Algebra involves the use of variables, constants, and formulas to solve equations and understand mathematical relationships.",

  formulas: [
    {
      name: "Linear Equation (One Variable)",
      rule: "ax + b = 0 → x = −b / a",
      explanation:
        "A linear equation has one variable with power one. Solving it gives the value of the variable.",
      example: {
        question:
          "Solve: 2x + 6 = 0",
        solution:
          "x = −3"
      }
    },

    {
      name: "Linear Equation (Two Variables)",
      rule: "ax + by + c = 0",
      explanation:
        "Represents a straight line involving two variables. Solutions satisfy the equation.",
      example: {
        question:
          "Find x when y = 2 in x + 2y + 4 = 0",
        solution:
          "x = −8"
      }
    },

    {
      name: "Quadratic Equation",
      rule: "ax² + bx + c = 0 → x = [−b ± √(b² − 4ac)] / 2a",
      explanation:
        "A quadratic equation has variable raised to power 2 and can have two real or complex roots.",
      example: {
        question:
          "Solve: x² − 5x + 6 = 0",
        solution:
          "x = 2, 3"
      }
    },

    {
      name: "Identity: (a + b)²",
      rule: "(a + b)² = a² + 2ab + b²",
      explanation:
        "Used to expand the square of a binomial.",
      example: {
        question:
          "Expand: (x + 3)²",
        solution:
          "x² + 6x + 9"
      }
    },

    {
      name: "Identity: (a − b)²",
      rule: "(a − b)² = a² − 2ab + b²",
      explanation:
        "Used to expand the square of a binomial with subtraction.",
      example: {
        question:
          "Expand: (x − 4)²",
        solution:
          "x² − 8x + 16"
      }
    },

    {
      name: "Identity: a² − b²",
      rule: "a² − b² = (a − b)(a + b)",
      explanation:
        "Used to factorize expressions with difference of squares.",
      example: {
        question:
          "Factorize: x² − 9",
        solution:
          "(x − 3)(x + 3)"
      }
    },

    {
      name: "Simple Factorization",
      rule: "ax + ay = a(x + y)",
      explanation:
        "Common terms are taken outside as a factor.",
      example: {
        question:
          "Factorize: 3x + 6",
        solution:
          "3(x + 2)"
      }
    },

    {
      name: "Value of Expression",
      rule: "Substitute variable values",
      explanation:
        "Replace variables with given values to evaluate expressions.",
      example: {
        question:
          "Find value of 2x² + 3x when x = 2",
        solution:
          "14"
      }
    },

    {
      name: "Simultaneous Equations",
      rule: "Solve two equations together",
      explanation:
        "Two equations with two variables are solved simultaneously to find common solutions.",
      example: {
        question:
          "Solve: x + y = 5 and x − y = 1",
        solution:
          "x = 3, y = 2"
      }
    }
  ]
};

export default Algebra;