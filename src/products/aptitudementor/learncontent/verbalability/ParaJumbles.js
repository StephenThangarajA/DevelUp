const ParaJumbles = {
  topic: "Para Jumbles",
  description:
    "Para Jumbles test your ability to rearrange sentences to form a coherent and meaningful paragraph. This evaluates logical sequencing, comprehension, and understanding of connectors.",

  rules: [
    {
      name: "Identify the Opening Sentence",
      rule:
        "Look for sentences that introduce the topic or do not refer to other sentences using pronouns like 'he', 'she', 'they'.",
      explanation:
        "The opening sentence usually sets the context for the paragraph.",
      example: {
        question:
          "Sentences: A) He then gave a speech. B) The school celebrated its annual day. C) The principal welcomed the guests.",
        solution:
          "Opening sentence: B → 'The school celebrated its annual day.'"
      }
    },

    {
      name: "Identify the Closing Sentence",
      rule:
        "Look for sentences that provide a conclusion or summarize the idea.",
      explanation:
        "Closing sentences often contain concluding words like 'thus', 'finally', 'in conclusion'.",
      example: {
        question:
          "Sentences: A) Finally, the team won the trophy. B) The match was intense. C) Both teams played well.",
        solution:
          "Closing sentence: A → 'Finally, the team won the trophy.'"
      }
    },

    {
      name: "Look for Connectors",
      rule:
        "Words like 'however', 'therefore', 'but', 'then', 'and' indicate the flow between sentences.",
      explanation:
        "Connectors help establish relationships like cause-effect, contrast, sequence.",
      example: {
        question:
          "Sentences: A) It rained heavily. B) Therefore, the match was postponed. C) The players were ready.",
        solution:
          "Sequence: C → A → B"
      }
    },

    {
      name: "Pronoun References",
      rule:
        "Identify pronouns ('he', 'she', 'they', 'it') and match them with their antecedents.",
      explanation:
        "This ensures logical flow between sentences referring to the same subject.",
      example: {
        question:
          "Sentences: A) The CEO announced a new policy. B) He said it will benefit employees. C) The employees welcomed the decision.",
        solution:
          "Sequence: A → B → C"
      }
    },

    {
      name: "Chronological or Logical Order",
      rule:
        "Arrange sentences based on time sequence, cause-effect, or logical progression.",
      explanation:
        "Some paragraphs are better understood when events are placed in order.",
      example: {
        question:
          "Sentences: A) She packed her bags. B) She left for the airport. C) She checked in at the counter.",
        solution:
          "Sequence: A → C → B"
      }
    },

    {
      name: "Check for Repetition",
      rule:
        "Avoid placing sentences that repeat information consecutively.",
      explanation:
        "Redundant sentences should not interrupt the logical flow.",
      example: {
        question:
          "Sentences: A) The sun rose. B) It was morning. C) The sun rose.",
        solution:
          "Sequence: A → B"
      }
    }
  ]
};

export default ParaJumbles;
