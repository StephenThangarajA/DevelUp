const FillInTheBlanks = {
  topic: "Fill in the Blanks",
  description:
    "Fill in the blanks tests your understanding of grammar, vocabulary, and sentence structure. The aim is to select the most appropriate word or phrase to complete the sentence correctly.",

  rules: [
    {
      name: "Articles (a, an, the)",
      rule: "Choose the correct article based on the noun's countability and starting sound.",
      explanation:
        "Use 'a' before consonant sounds, 'an' before vowel sounds, and 'the' for specific nouns.",
      example: {
        question:
          "She adopted ___ cat from the shelter.",
        solution:
          "a → 'She adopted a cat from the shelter.'"
      }
    },

    {
      name: "Prepositions",
      rule: "Select the correct preposition that fits the context.",
      explanation:
        "Prepositions connect nouns/pronouns to other words in a sentence.",
      example: {
        question:
          "He is good ___ mathematics.",
        solution:
          "at → 'He is good at mathematics.'"
      }
    },

    {
      name: "Conjunctions",
      rule: "Use the appropriate conjunction to link clauses.",
      explanation:
        "Conjunctions join words, phrases, or sentences.",
      example: {
        question:
          "I will go for a walk ___ it stops raining.",
        solution:
          "if → 'I will go for a walk if it stops raining.'"
      }
    },

    {
      name: "Verb Form",
      rule: "Choose the correct verb tense to match the sentence context.",
      explanation:
        "Verbs must agree in tense and subject.",
      example: {
        question:
          "She ___ to the store yesterday.",
        solution:
          "went → 'She went to the store yesterday.'"
      }
    },

    {
      name: "Subject–Verb Agreement",
      rule: "The verb must match the subject in number and person.",
      explanation:
        "Singular subjects take singular verbs, plural subjects take plural verbs.",
      example: {
        question:
          "The team ___ winning the match.",
        solution:
          "is → 'The team is winning the match.'"
      }
    },

    {
      name: "Adjectives and Adverbs",
      rule: "Use the correct form to modify nouns or verbs.",
      explanation:
        "Adjectives modify nouns; adverbs modify verbs, adjectives, or adverbs.",
      example: {
        question:
          "She sings very ___.",
        solution:
          "beautifully → 'She sings very beautifully.'"
      }
    },

    {
      name: "Idioms and Phrases",
      rule: "Use a known idiom or phrase that fits contextually.",
      explanation:
        "Idioms are fixed expressions; the meaning may not be literal.",
      example: {
        question:
          "He is feeling under the ___.",
        solution:
          "weather → 'He is feeling under the weather.'"
      }
    },

    {
      name: "Vocabulary Fit",
      rule: "Choose the word that best completes the meaning of the sentence.",
      explanation:
        "Ensure the word fits grammatically and contextually.",
      example: {
        question:
          "Her performance was ___ impressive.",
        solution:
          "truly → 'Her performance was truly impressive.'"
      }
    },

    {
      name: "Negatives and Double Negatives",
      rule: "Avoid double negatives; use appropriate negative forms.",
      explanation:
        "Two negatives can make a positive, which may be incorrect in context.",
      example: {
        question:
          "He is not ___ honest.",
        solution:
          "entirely → 'He is not entirely honest.'"
      }
    }
  ]
};

export default FillInTheBlanks;
