const Analogies = {
  topic: "Analogies",
  description: "Analogy questions test the ability to identify relationships between words, letters, or numbers and apply the same relationship to another pair.",

  formulas: [
    {
      name: "Synonym Analogy",
      rule: "A : B :: C : D (B is synonym of A)",
      explanation: "If two words have similar meanings, the same type of similarity should exist in the second pair.",
      example: {
        question: "Happy : Joyful :: Angry : ?",
        solution: "Angry : Furious"
      }
    },

    {
      name: "Antonym Analogy",
      rule: "A : B :: C : D (B is opposite of A)",
      explanation: "The relationship between the first pair is based on opposites.",
      example: {
        question: "Hot : Cold :: Day : ?",
        solution: "Day : Night"
      }
    },

    {
      name: "Cause and Effect",
      rule: "Cause : Effect :: Cause : Effect",
      explanation: "The first word causes the second word.",
      example: {
        question: "Fire : Smoke :: Rain : ?",
        solution: "Rain : Flood"
      }
    },

    {
      name: "Part to Whole",
      rule: "Part : Whole :: Part : Whole",
      explanation: "The first word is a part of the second word.",
      example: {
        question: "Wheel : Car :: Page : ?",
        solution: "Page : Book"
      }
    },

    {
      name: "Degree / Intensity",
      rule: "Less : More :: Less : More",
      explanation: "Shows increase or decrease in intensity or quantity.",
      example: {
        question: "Warm : Hot :: Cool : ?",
        solution: "Cool : Cold"
      }
    },

    {
      name: "Function / Purpose",
      rule: "Object : Use :: Object : Use",
      explanation: "The first word is used for a specific purpose.",
      example: {
        question: "Pen : Write :: Knife : ?",
        solution: "Knife : Cut"
      }
    },

    {
      name: "Worker and Tool",
      rule: "Person : Tool :: Person : Tool",
      explanation: "A person uses a specific tool for work.",
      example: {
        question: "Carpenter : Hammer :: Painter : ?",
        solution: "Painter : Brush"
      }
    },

    {
      name: "Symbol and Meaning",
      rule: "Symbol : Meaning :: Symbol : Meaning",
      explanation: "The first word represents the second.",
      example: {
        question: "White Flag : Peace :: Red Light : ?",
        solution: "Red Light : Danger"
      }
    },

    {
      name: "Letter-Based Analogy",
      rule: "Letter Pattern (Position / Shift)",
      explanation: "Letters are related using alphabetical position or shifting.",
      example: {
        question: "A : C :: B : ?",
        solution: "B : D"
      }
    },

    {
      name: "Number-Based Analogy",
      rule: "Number Operation (×, +, -)",
      explanation: "Numbers follow a mathematical pattern.",
      example: {
        question: "2 : 4 :: 5 : ?",
        solution: "5 : 10"
      }
    }
  ]
};

export default Analogies;
