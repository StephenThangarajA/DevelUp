const GeometryMensuration = {
  topic: "Geometry & Mensuration",
  description:
    "Geometry and Mensuration deal with shapes, sizes, areas, volumes, and angles. These topics are essential in quantitative aptitude for solving real-world and exam-based problems.",

  formulas: [
    {
      name: "Perimeter of Rectangle",
      rule: "Perimeter = 2(l + b)",
      explanation:
        "Used to find the total boundary length of a rectangle.",
      example: {
        question:
          "Find the perimeter of a rectangle with length 10 and breadth 5.",
        solution:
          "Perimeter = 2(10 + 5) = 30"
      }
    },

    {
      name: "Area of Rectangle",
      rule: "Area = l × b",
      explanation:
        "Used to find the space covered by a rectangle.",
      example: {
        question:
          "Find the area of a rectangle with length 8 and breadth 4.",
        solution:
          "Area = 8 × 4 = 32"
      }
    },

    {
      name: "Area of Square",
      rule: "Area = side²",
      explanation:
        "Used to find the area enclosed by a square.",
      example: {
        question:
          "Find the area of a square with side 6.",
        solution:
          "Area = 6² = 36"
      }
    },

    {
      name: "Perimeter of Square",
      rule: "Perimeter = 4 × side",
      explanation:
        "Used to calculate the total length of all sides of a square.",
      example: {
        question:
          "Find the perimeter of a square with side 7.",
        solution:
          "Perimeter = 4 × 7 = 28"
      }
    },

    {
      name: "Area of Triangle",
      rule: "Area = (1/2) × base × height",
      explanation:
        "Used to find the area of a triangle.",
      example: {
        question:
          "Find area of a triangle with base 10 and height 6.",
        solution:
          "Area = (1/2) × 10 × 6 = 30"
      }
    },

    {
      name: "Heron's Formula",
      rule: "Area = √[s(s − a)(s − b)(s − c)]",
      explanation:
        "Used when all three sides of a triangle are given.",
      example: {
        question:
          "Find area of triangle with sides 3, 4, 5.",
        solution:
          "Area = √[6(6−3)(6−4)(6−5)] = 6"
      }
    },

    {
      name: "Area of Circle",
      rule: "Area = πr²",
      explanation:
        "Used to calculate the area inside a circle.",
      example: {
        question:
          "Find area of a circle with radius 7.",
        solution:
          "Area = π × 7² = 49π"
      }
    },

    {
      name: "Circumference of Circle",
      rule: "Circumference = 2πr",
      explanation:
        "Used to calculate the boundary length of a circle.",
      example: {
        question:
          "Find circumference of a circle with radius 14.",
        solution:
          "Circumference = 2π × 14 = 28π"
      }
    },

    {
      name: "Volume of Cube",
      rule: "Volume = side³",
      explanation:
        "Used to calculate the space occupied by a cube.",
      example: {
        question:
          "Find volume of a cube with side 5.",
        solution:
          "Volume = 5³ = 125"
      }
    },

    {
      name: "Surface Area of Cube",
      rule: "Surface Area = 6 × side²",
      explanation:
        "Used to calculate total surface area of a cube.",
      example: {
        question:
          "Find surface area of cube with side 4.",
        solution:
          "Surface Area = 6 × 4² = 96"
      }
    },

    {
      name: "Volume of Cuboid",
      rule: "Volume = l × b × h",
      explanation:
        "Used to calculate the volume of a cuboid.",
      example: {
        question:
          "Find volume of cuboid with dimensions 5, 4, and 3.",
        solution:
          "Volume = 5 × 4 × 3 = 60"
      }
    },

    {
      name: "Curved Surface Area of Cylinder",
      rule: "CSA = 2πrh",
      explanation:
        "Used to calculate curved surface area of a cylinder.",
      example: {
        question:
          "Find CSA of a cylinder with radius 7 and height 10.",
        solution:
          "CSA = 2π × 7 × 10 = 140π"
      }
    },

    {
      name: "Volume of Cylinder",
      rule: "Volume = πr²h",
      explanation:
        "Used to calculate the volume of a cylinder.",
      example: {
        question:
          "Find volume of a cylinder with radius 3 and height 14.",
        solution:
          "Volume = π × 3² × 14 = 126π"
      }
    },

    {
      name: "Volume of Sphere",
      rule: "(4/3)πr³",
      explanation:
        "Used to calculate volume of a sphere.",
      example: {
        question:
          "Find volume of a sphere with radius 7.",
        solution:
          "(4/3)π × 7³"
      }
    },

    {
      name: "Surface Area of Sphere",
      rule: "4πr²",
      explanation:
        "Used to calculate surface area of a sphere.",
      example: {
        question:
          "Find surface area of sphere with radius 14.",
        solution:
          "4π × 14² = 784π"
      }
    }
  ]
};

export default GeometryMensuration;
