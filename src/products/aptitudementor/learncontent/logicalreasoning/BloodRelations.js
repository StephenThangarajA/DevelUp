const BloodRelations = {
  topic: "Blood Relations",
  description:
    "Blood relation problems test the ability to understand family relationships using given statements and deduce the correct relationship logically.",

  formulas: [
    {
      name: "Parent Relationship",
      rule: "Father / Mother → Parent",
      explanation:
        "If a person is stated as the father or mother of another, they are the direct parent.",
      example: {
        question:
          "A is the father of B. How is A related to B?",
        solution:
          "A is the father (parent) of B"
      }
    },

    {
      name: "Sibling Relationship",
      rule: "Same Parents → Brother / Sister",
      explanation:
        "If two people share the same parents, they are siblings.",
      example: {
        question:
          "A and B are children of C. How is A related to B?",
        solution:
          "A is the brother or sister of B"
      }
    },

    {
      name: "Grandparent Relationship",
      rule: "Parent of Parent → Grandfather / Grandmother",
      explanation:
        "The parent of a person’s parent is called the grandparent.",
      example: {
        question:
          "A is the father of B and B is the mother of C. How is A related to C?",
        solution:
          "A is the grandfather of C"
      }
    },

    {
      name: "Uncle Relationship",
      rule: "Brother of Parent → Uncle",
      explanation:
        "If a person is the brother of one’s father or mother, he is the uncle.",
      example: {
        question:
          "A is the brother of B. B is the mother of C. How is A related to C?",
        solution:
          "A is the uncle of C"
      }
    },

    {
      name: "Aunt Relationship",
      rule: "Sister of Parent → Aunt",
      explanation:
        "If a person is the sister of one’s father or mother, she is the aunt.",
      example: {
        question:
          "A is the sister of B. B is the father of C. How is A related to C?",
        solution:
          "A is the aunt of C"
      }
    },

    {
      name: "Cousin Relationship",
      rule: "Children of Siblings → Cousins",
      explanation:
        "Children of a person’s uncle or aunt are called cousins.",
      example: {
        question:
          "A is the brother of B. B is the father of C. How is A related to C?",
        solution:
          "A is the uncle of C, so A’s children are cousins of C"
      }
    },

    {
      name: "Son Relationship",
      rule: "Male Child → Son",
      explanation:
        "If a person is male and is a child of someone, he is the son.",
      example: {
        question:
          "A is the son of B. How is A related to B?",
        solution:
          "A is the son of B"
      }
    },

    {
      name: "Daughter Relationship",
      rule: "Female Child → Daughter",
      explanation:
        "If a person is female and is a child of someone, she is the daughter.",
      example: {
        question:
          "A is the daughter of B. How is A related to B?",
        solution:
          "A is the daughter of B"
      }
    },

    {
      name: "Brother-in-Law Relationship",
      rule: "Husband’s Brother or Sister’s Husband → Brother-in-law",
      explanation:
        "A brother-in-law is either the brother of one’s spouse or the husband of one’s sister.",
      example: {
        question:
          "A is the husband of B’s sister. How is A related to B?",
        solution:
          "A is the brother-in-law of B"
      }
    },

    {
      name: "Sister-in-Law Relationship",
      rule: "Wife’s Sister or Brother’s Wife → Sister-in-law",
      explanation:
        "A sister-in-law is either the sister of one’s spouse or the wife of one’s brother.",
      example: {
        question:
          "A is the wife of B’s brother. How is A related to B?",
        solution:
          "A is the sister-in-law of B"
      }
    }
  ]
};

export default BloodRelations;
