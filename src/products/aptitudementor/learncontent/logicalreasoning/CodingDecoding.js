const CodingDecoding = {
  topic: "Coding & Decoding",
  description:
    "Coding and Decoding questions test the ability to identify patterns used to encode words, letters, or numbers and decode them logically.",

  formulas: [
    {
      name: "Letter Shifting (Forward)",
      rule: "Each letter is shifted forward by a fixed number",
      explanation:
        "Letters are replaced by letters that appear a fixed number of positions ahead in the English alphabet.",
      example: {
        question:
          "If CAT is coded as DBU, how is DOG coded?",
        solution:
          "DOG → EPH"
      }
    },

    {
      name: "Letter Shifting (Backward)",
      rule: "Each letter is shifted backward by a fixed number",
      explanation:
        "Letters are replaced by letters that appear a fixed number of positions before in the English alphabet.",
      example: {
        question:
          "If DOG is coded as CNF, how is CAT coded?",
        solution:
          "CAT → BZS"
      }
    },

    {
      name: "Reverse Alphabet Coding",
      rule: "Letter → (27 − Alphabet Position)",
      explanation:
        "Each letter is replaced by its opposite letter in the alphabet (A↔Z, B↔Y, etc.).",
      example: {
        question:
          "If CAT is written as XZG, how is DOG written?",
        solution:
          "DOG → WLT"
      }
    },

    {
      name: "Word Reversal",
      rule: "Reverse the entire word",
      explanation:
        "The word is coded by reversing the order of its letters.",
      example: {
        question:
          "If SCHOOL is coded as LOOHCS, how is BOOK coded?",
        solution:
          "BOOK → KOOB"
      }
    },

    {
      name: "Odd-Even Letter Position",
      rule: "Odd letters forward, even letters backward",
      explanation:
        "Letters in odd positions are shifted forward while letters in even positions are shifted backward.",
      example: {
        question:
          "If BAT is coded as CZS, how is CAT coded?",
        solution:
          "CAT → DZS"
      }
    },

    {
      name: "Number Coding (Letter Values)",
      rule: "A=1, B=2, ..., Z=26",
      explanation:
        "Each letter is replaced by its alphabetical position number.",
      example: {
        question:
          "If CAT is coded as 3-1-20, how is DOG coded?",
        solution:
          "DOG → 4-15-7"
      }
    },

    {
      name: "Sum of Letter Values",
      rule: "Sum of alphabetical positions",
      explanation:
        "The code is formed by adding the alphabetical values of all letters in the word.",
      example: {
        question:
          "If CAT is coded as 24, how is DOG coded?",
        solution:
          "DOG → 26"
      }
    },

    {
      name: "Symbol Substitution",
      rule: "Each letter is replaced by a fixed symbol",
      explanation:
        "Letters are substituted with symbols using a predefined pattern.",
      example: {
        question:
          "If A=@, B=#, C=$, how is CAB coded?",
        solution:
          "CAB → $@#"
      }
    },

    {
      name: "Mixed Coding",
      rule: "Combination of two or more coding rules",
      explanation:
        "The coding pattern involves multiple steps like reversing and shifting letters.",
      example: {
        question:
          "If CAT is reversed and each letter shifted forward by one, find the code.",
        solution:
          "CAT → TAC → UBD"
      }
    },

    {
      name: "Sentence Coding",
      rule: "Each word follows the same coding rule",
      explanation:
        "A common rule is applied to every word in a sentence.",
      example: {
        question:
          "If GOOD DAY is coded as HPPE EBZ, how is BAD coded?",
        solution:
          "BAD → CBE"
      }
    }
  ]
};

export default CodingDecoding;
