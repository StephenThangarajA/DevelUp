const Syllogisms = {
  topic: "Syllogisms",
  description:
    "Syllogism questions test the ability to logically deduce conclusions from given statements using set relationships.",

  formulas: [
    {
      name: "All Statement",
      rule: "All A are B",
      explanation:
        "Every member of set A belongs to set B, but all B need not belong to A.",
      example: {
        question:
          "Statement: All cats are animals. Conclusion: All cats are animals.",
        solution:
          "Conclusion follows"
      }
    },

    {
      name: "Some Statement",
      rule: "Some A are B",
      explanation:
        "At least one member of set A belongs to set B.",
      example: {
        question:
          "Statement: Some students are athletes. Conclusion: Some students are athletes.",
        solution:
          "Conclusion follows"
      }
    },

    {
      name: "No Statement",
      rule: "No A are B",
      explanation:
        "There is no overlap between set A and set B.",
      example: {
        question:
          "Statement: No dogs are cats. Conclusion: No cats are dogs.",
        solution:
          "Conclusion follows"
      }
    },

    {
      name: "Conversion Rule",
      rule: "All A are B ≠ All B are A",
      explanation:
        "Universal affirmative statements cannot be converted fully.",
      example: {
        question:
          "Statement: All engineers are graduates. Conclusion: All graduates are engineers.",
        solution:
          "Conclusion does not follow"
      }
    },

    {
      name: "Some Conversion",
      rule: "Some A are B → Some B are A",
      explanation:
        "Particular affirmative statements are always convertible.",
      example: {
        question:
          "Statement: Some teachers are writers. Conclusion: Some writers are teachers.",
        solution:
          "Conclusion follows"
      }
    },

    {
      name: "Negative Conversion",
      rule: "No A are B → No B are A",
      explanation:
        "Universal negative statements are fully convertible.",
      example: {
        question:
          "Statement: No cars are bicycles. Conclusion: No bicycles are cars.",
        solution:
          "Conclusion follows"
      }
    },

    {
      name: "Possibility Case",
      rule: "Possibility exists unless denied",
      explanation:
        "Conclusions with 'some may be' follow if not contradicting the statement.",
      example: {
        question:
          "Statement: All doctors are professionals. Conclusion: Some professionals may be doctors.",
        solution:
          "Conclusion follows"
      }
    },

    {
      name: "Definite Conclusion",
      rule: "Must be true in all cases",
      explanation:
        "A definite conclusion follows only if it is true in every possible scenario.",
      example: {
        question:
          "Statement: All birds are animals. Conclusion: All birds are animals.",
        solution:
          "Conclusion follows"
      }
    },

    {
      name: "Contradictory Conclusion",
      rule: "Opposite conclusion never follows",
      explanation:
        "Any conclusion contradicting the statement is invalid.",
      example: {
        question:
          "Statement: Some fruits are sweet. Conclusion: No fruit is sweet.",
        solution:
          "Conclusion does not follow"
      }
    },

    {
      name: "Either–Or Conclusion",
      rule: "Only one conclusion can be true",
      explanation:
        "If two conclusions are mutually exclusive and only one is logically possible, either–or follows.",
      example: {
        question:
          "Statement: All pens are blue. Conclusions: (1) Some pens are blue (2) No pen is blue",
        solution:
          "Either conclusion 1 or 2 follows"
      }
    }
  ]
};

export default Syllogisms;