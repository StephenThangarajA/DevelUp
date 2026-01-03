const ErrorDetection = {
  topic: "Error Detection",
  description:
    "Error Detection tests a candidate’s understanding of English grammar rules. A sentence is given in parts, and the incorrect part must be identified based on grammar, usage, or sentence structure.",

  rules: [
    {
      name: "Subject–Verb Agreement",
      rule: "A singular subject takes a singular verb; a plural subject takes a plural verb.",
      explanation:
        "The verb must agree with the subject in number.",
      example: {
        question:
          "Each of the players have arrived.",
        solution:
          "Incorrect part: 'have' → Correct: 'has'"
      }
    },

    {
      name: "Incorrect Tense Usage",
      rule: "Maintain the same tense unless a change is logically required.",
      explanation:
        "Unnecessary tense changes lead to grammatical errors.",
      example: {
        question:
          "She was going to the market and buys vegetables.",
        solution:
          "Incorrect part: 'buys' → Correct: 'bought'"
      }
    },

    {
      name: "Pronoun Agreement",
      rule: "Pronouns must agree with their antecedents in number and gender.",
      explanation:
        "Mismatch between pronoun and noun causes error.",
      example: {
        question:
          "Everyone forgot their book.",
        solution:
          "Incorrect part: 'their' → Correct: 'his or her'"
      }
    },

    {
      name: "Use of Articles (a, an, the)",
      rule: "Articles must be used correctly before nouns.",
      explanation:
        "Wrong article usage leads to grammatical errors.",
      example: {
        question:
          "He is an honest man.",
        solution:
          "No error (Correct usage of 'an' before vowel sound)"
      }
    },

    {
      name: "Preposition Error",
      rule: "Correct prepositions must be used with specific words.",
      explanation:
        "Many verbs, adjectives, and nouns require fixed prepositions.",
      example: {
        question:
          "She is good in mathematics.",
        solution:
          "Incorrect part: 'in' → Correct: 'at'"
      }
    },

    {
      name: "Comparison Error",
      rule: "Comparison should be between similar things.",
      explanation:
        "Unlike items should not be compared.",
      example: {
        question:
          "Her voice is sweeter than her sister.",
        solution:
          "Incorrect part: 'her sister' → Correct: 'her sister’s voice'"
      }
    },

    {
      name: "Redundant Words",
      rule: "Avoid unnecessary repetition of meaning.",
      explanation:
        "Using words with the same meaning together creates errors.",
      example: {
        question:
          "He returned back to his hometown.",
        solution:
          "Incorrect part: 'returned back' → Correct: 'returned'"
      }
    },

    {
      name: "Adjective vs Adverb",
      rule: "Adjectives modify nouns; adverbs modify verbs, adjectives, or adverbs.",
      explanation:
        "Wrong modifier usage leads to error.",
      example: {
        question:
          "She sings very beautiful.",
        solution:
          "Incorrect part: 'beautiful' → Correct: 'beautifully'"
      }
    },

    {
      name: "Parallelism Error",
      rule: "Sentence elements joined by conjunctions must follow the same grammatical form.",
      explanation:
        "Lack of parallel structure causes grammatical inconsistency.",
      example: {
        question:
          "He likes reading, writing, and to play chess.",
        solution:
          "Incorrect part: 'to play' → Correct: 'playing'"
      }
    }
  ]
};

export default ErrorDetection;
