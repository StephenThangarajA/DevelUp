const SentenceCorrection = {
  topic: "Sentence Correction",
  description:
    "Sentence Correction tests your knowledge of English grammar, sentence structure, and proper usage. You must identify and correct errors in sentences or select the grammatically correct version.",

  rules: [
    {
      name: "Subject–Verb Agreement",
      rule: "The verb must agree with the subject in number and person.",
      explanation:
        "Singular subjects take singular verbs, plural subjects take plural verbs.",
      example: {
        question:
          "The team of players (is/are) winning the match.",
        solution:
          "Correct: 'is' → 'The team of players is winning the match.'"
      }
    },

    {
      name: "Tense Consistency",
      rule: "Maintain the same tense unless a change is logically required.",
      explanation:
        "Unnecessary tense changes lead to grammatical errors.",
      example: {
        question:
          "She was walking to the park and (buys/bought) some flowers.",
        solution:
          "Correct: 'bought' → 'She was walking to the park and bought some flowers.'"
      }
    },

    {
      name: "Pronoun Usage",
      rule: "Pronouns must agree with their antecedents in number and gender.",
      explanation:
        "Mismatch between pronoun and noun causes error.",
      example: {
        question:
          "Everyone must submit (their/his or her) assignment.",
        solution:
          "Correct: 'his or her' → 'Everyone must submit his or her assignment.'"
      }
    },

    {
      name: "Redundancy and Wordiness",
      rule: "Avoid unnecessary repetition of words or ideas.",
      explanation:
        "Redundant phrases make the sentence grammatically incorrect or awkward.",
      example: {
        question:
          "He returned back to his hometown.",
        solution:
          "Correct: 'returned' → 'He returned to his hometown.'"
      }
    },

    {
      name: "Parallelism",
      rule: "Items in a list or series joined by conjunctions must follow the same grammatical form.",
      explanation:
        "Lack of parallel structure causes grammatical inconsistency.",
      example: {
        question:
          "He likes reading, writing, and to play chess.",
        solution:
          "Correct: 'playing' → 'He likes reading, writing, and playing chess.'"
      }
    },

    {
      name: "Prepositions",
      rule: "Use correct prepositions with verbs, adjectives, and nouns.",
      explanation:
        "Incorrect prepositions are a common source of errors.",
      example: {
        question:
          "She is good (in/at) mathematics.",
        solution:
          "Correct: 'at' → 'She is good at mathematics.'"
      }
    },

    {
      name: "Articles",
      rule: "Use 'a', 'an', or 'the' appropriately before nouns.",
      explanation:
        "Wrong article usage leads to grammatical errors.",
      example: {
        question:
          "He is (a/an/the) honest man.",
        solution:
          "Correct: 'an' → 'He is an honest man.'"
      }
    },

    {
      name: "Modifiers",
      rule: "Place adjectives and adverbs correctly to avoid ambiguity.",
      explanation:
        "Misplaced modifiers can change the intended meaning.",
      example: {
        question:
          "She almost drove her kids to school every day.",
        solution:
          "Correct placement: 'She drove her kids to school almost every day.'"
      }
    },

    {
      name: "Idiomatic Expressions",
      rule: "Use idioms and phrases correctly in context.",
      explanation:
        "Incorrect idiomatic usage is a frequent error in sentence correction.",
      example: {
        question:
          "He let the cat out of (the bag/the house).",
        solution:
          "Correct: 'the bag' → 'He let the cat out of the bag.'"
      }
    }
  ]
};

export default SentenceCorrection;
