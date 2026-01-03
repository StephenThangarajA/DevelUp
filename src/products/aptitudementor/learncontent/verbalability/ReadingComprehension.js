const ReadingComprehension = {
  topic: "Reading Comprehension",
  description:
    "Reading Comprehension tests your ability to read a passage, understand it, and answer questions based on the content. It evaluates vocabulary, inference, reasoning, and comprehension skills.",

  rules: [
    {
      name: "Skim and Scan",
      rule: "Quickly read the passage to get the overall idea, then scan for keywords.",
      explanation:
        "Skimming helps you understand the main idea; scanning helps find specific information quickly.",
      example: {
        passage: "Climate change is causing severe weather events around the world. Governments are taking measures to reduce carbon emissions, and scientists are researching sustainable energy solutions.",
        question: "What is being done to combat climate change?",
        solution: "Governments are reducing carbon emissions, and scientists are researching sustainable energy solutions."
      }
    },

    {
      name: "Identify the Main Idea",
      rule: "Determine the central theme or purpose of the passage.",
      explanation:
        "The main idea is usually found in the first or last sentence, or repeated throughout.",
      example: {
        passage: "Reading improves vocabulary, enhances knowledge, and strengthens analytical skills. People who read regularly tend to perform better academically.",
        question: "What is the main idea?",
        solution: "Reading has multiple benefits including vocabulary improvement, knowledge enhancement, and skill development."
      }
    },

    {
      name: "Understand Vocabulary in Context",
      rule: "Infer the meaning of unfamiliar words using the context of the passage.",
      explanation:
        "Context clues such as synonyms, antonyms, or explanations within the passage can help understand difficult words.",
      example: {
        passage: "The arid region had very little rainfall, making agriculture difficult.",
        question: "What does 'arid' mean?",
        solution: "Dry; lacking moisture"
      }
    },

    {
      name: "Make Inferences",
      rule: "Draw logical conclusions based on the information given in the passage.",
      explanation:
        "Inference questions require understanding implied meanings, not just explicit statements.",
      example: {
        passage: "The factory closed early, and employees were seen leaving in large numbers.",
        question: "What can be inferred?",
        solution: "The factory closure caused employees to leave early."
      }
    },

    {
      name: "Identify Supporting Details",
      rule: "Look for facts, examples, or statements that support the main idea.",
      explanation:
        "Questions often ask for specific evidence from the passage.",
      example: {
        passage: "Exercise improves physical health. A study shows that people who walk 30 minutes a day have better cardiovascular health.",
        question: "Give one supporting detail for exercise improving health.",
        solution: "Walking 30 minutes a day improves cardiovascular health."
      }
    },

    {
      name: "Distinguish Fact from Opinion",
      rule: "Facts are verifiable; opinions reflect personal beliefs.",
      explanation:
        "Some questions may ask which statements are fact and which are opinion.",
      example: {
        passage: "The Earth revolves around the Sun. I think summer is the best season.",
        question: "Identify the fact and the opinion.",
        solution: "Fact: The Earth revolves around the Sun. Opinion: I think summer is the best season."
      }
    },

    {
      name: "Answering ‘Why’ and ‘How’ Questions",
      rule: "Look for cause-effect relationships and explanations within the passage.",
      explanation:
        "Such questions test your comprehension of reasoning and relationships between events.",
      example: {
        passage: "Plants need sunlight to perform photosynthesis, which produces energy for growth.",
        question: "Why do plants need sunlight?",
        solution: "To perform photosynthesis and produce energy for growth."
      }
    }
  ]
};

export default ReadingComprehension;
