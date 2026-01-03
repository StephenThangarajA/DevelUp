const ProfitLoss = {
  topic: "Profit & Loss",
  description:
    "Profit and Loss problems measure financial gain or loss in buying and selling goods. These concepts are essential for aptitude exams and real-life commerce scenarios.",

  formulas: [
    {
      name: "Cost Price (CP)",
      rule: "Cost Price = Price at which an article is bought",
      explanation:
        "CP is the amount paid to purchase an item.",
      example: {
        question:
          "If an item is bought for ₹500, find CP.",
        solution:
          "CP = ₹500"
      }
    },

    {
      name: "Selling Price (SP)",
      rule: "Selling Price = Price at which an article is sold",
      explanation:
        "SP is the amount received after selling an item.",
      example: {
        question:
          "If an item is sold for ₹650, find SP.",
        solution:
          "SP = ₹650"
      }
    },

    {
      name: "Profit",
      rule: "Profit = SP − CP",
      explanation:
        "Occurs when selling price is greater than cost price.",
      example: {
        question:
          "An item is bought for ₹400 and sold for ₹500. Find profit.",
        solution:
          "Profit = 500 − 400 = ₹100"
      }
    },

    {
      name: "Loss",
      rule: "Loss = CP − SP",
      explanation:
        "Occurs when cost price is greater than selling price.",
      example: {
        question:
          "An item is bought for ₹600 and sold for ₹480. Find loss.",
        solution:
          "Loss = 600 − 480 = ₹120"
      }
    },

    {
      name: "Profit Percentage",
      rule: "Profit % = (Profit / CP) × 100",
      explanation:
        "Used to calculate profit as a percentage of cost price.",
      example: {
        question:
          "Find profit % if CP = ₹800 and SP = ₹1000.",
        solution:
          "Profit = 200 → (200/800) × 100 = 25%"
      }
    },

    {
      name: "Loss Percentage",
      rule: "Loss % = (Loss / CP) × 100",
      explanation:
        "Used to calculate loss as a percentage of cost price.",
      example: {
        question:
          "Find loss % if CP = ₹500 and SP = ₹450.",
        solution:
          "Loss = 50 → (50/500) × 100 = 10%"
      }
    },

    {
      name: "Selling Price Using Profit %",
      rule: "SP = CP × (1 + Profit% / 100)",
      explanation:
        "Used to calculate SP when profit percentage is known.",
      example: {
        question:
          "CP is ₹1000 and profit is 20%. Find SP.",
        solution:
          "SP = 1000 × 1.2 = ₹1200"
      }
    },

    {
      name: "Selling Price Using Loss %",
      rule: "SP = CP × (1 − Loss% / 100)",
      explanation:
        "Used to calculate SP when loss percentage is known.",
      example: {
        question:
          "CP is ₹800 and loss is 25%. Find SP.",
        solution:
          "SP = 800 × 0.75 = ₹600"
      }
    },

    {
      name: "Cost Price Using Profit %",
      rule: "CP = (SP × 100) / (100 + Profit%)",
      explanation:
        "Used when SP and profit % are known.",
      example: {
        question:
          "SP is ₹600 with 20% profit. Find CP.",
        solution:
          "CP = (600 × 100) / 120 = ₹500"
      }
    },

    {
      name: "Cost Price Using Loss %",
      rule: "CP = (SP × 100) / (100 − Loss%)",
      explanation:
        "Used when SP and loss % are known.",
      example: {
        question:
          "SP is ₹450 with 10% loss. Find CP.",
        solution:
          "CP = (450 × 100) / 90 = ₹500"
      }
    },

    {
      name: "Marked Price (MP)",
      rule: "MP = Listed price of the item",
      explanation:
        "Price marked on the product before discount.",
      example: {
        question:
          "If an item is marked at ₹1000, find MP.",
        solution:
          "MP = ₹1000"
      }
    },

    {
      name: "Discount",
      rule: "Discount = MP − SP",
      explanation:
        "Reduction given on marked price.",
      example: {
        question:
          "If MP = ₹1500 and SP = ₹1200, find discount.",
        solution:
          "Discount = ₹300"
      }
    },

    {
      name: "Discount Percentage",
      rule: "Discount % = (Discount / MP) × 100",
      explanation:
        "Used to calculate discount percentage.",
      example: {
        question:
          "Find discount % if MP = ₹1000 and SP = ₹850.",
        solution:
          "(150 / 1000) × 100 = 15%"
      }
    }
  ]
};

export default ProfitLoss;
