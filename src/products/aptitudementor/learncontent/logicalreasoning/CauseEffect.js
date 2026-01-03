const CauseEffect = {
  topic: "Cause and Effect",
  description:
    "Cause and Effect questions test the ability to identify the reason (cause) behind an event (effect) and determine whether one statement leads to another logically.",

  formulas: [
    {
      name: "Direct Cause and Effect",
      rule: "Cause → Effect",
      explanation:
        "When one event directly produces another event, it is a direct cause-and-effect relationship.",
      example: {
        question:
          "It rained heavily last night.",
        solution:
          "Roads were flooded."
      }
    },

    {
      name: "Immediate Cause",
      rule: "Immediate Cause → Effect",
      explanation:
        "The cause occurs immediately before the effect without any intermediate event.",
      example: {
        question:
          "The driver applied sudden brakes.",
        solution:
          "The car stopped abruptly."
      }
    },

    {
      name: "Principal Cause",
      rule: "Primary Cause → Effect",
      explanation:
        "The main reason behind an effect, even if other minor factors exist.",
      example: {
        question:
          "There was a sudden rise in petrol prices.",
        solution:
          "Transportation costs increased."
      }
    },

    {
      name: "Multiple Causes",
      rule: "Cause 1 + Cause 2 → Effect",
      explanation:
        "Sometimes an effect occurs due to more than one contributing cause.",
      example: {
        question:
          "Excessive rainfall and poor drainage system.",
        solution:
          "Urban flooding."
      }
    },

    {
      name: "Chain Reaction",
      rule: "Cause → Intermediate Event → Effect",
      explanation:
        "A sequence where one cause leads to an event which then becomes the cause for another effect.",
      example: {
        question:
          "Factory shutdown.",
        solution:
          "Unemployment increased, leading to economic slowdown."
      }
    },

    {
      name: "Cause without Effect",
      rule: "Cause ≠ Effect",
      explanation:
        "A statement may present a reason, but it does not necessarily result in the given effect.",
      example: {
        question:
          "He studied hard.",
        solution:
          "He topped the exam (not necessarily true)."
      }
    },

    {
      name: "Effect without Cause",
      rule: "Effect with No Given Cause",
      explanation:
        "An effect is stated, but no valid cause is provided in the question.",
      example: {
        question:
          "Traffic congestion increased.",
        solution:
          "Cause not mentioned."
      }
    },

    {
      name: "Independent Statements",
      rule: "No Cause-Effect Relation",
      explanation:
        "Both statements are related to the same topic but do not form a cause-and-effect relationship.",
      example: {
        question:
          "He is a good athlete.",
        solution:
          "He wakes up early every day."
      }
    }
  ]
};

export default CauseEffect;
