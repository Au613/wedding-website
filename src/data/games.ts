export type TriviaQuestion = {
  id: string;
  category: "Austin" | "Alexa" | "Us" | "Wedding";
  question: string;
  choices: string[];
  answerIndex: number;
  reveal: string;
};

export const triviaQuestions: TriviaQuestion[] = [
  {
    id: "q1",
    category: "Us",
    question: "Where did Austin and Alexa first meet?",
    choices: [
      "A crowded subway platform",
      "A Shabbat dinner that ran too long",
      "Over coffee, in a conversation that refused to end",
      "At a wedding, ironically",
    ],
    answerIndex: 2,
    reveal: "It started as coffee and became the rest of the story.",
  },
  {
    id: "q2",
    category: "Austin",
    question: "What is Austin most likely to cry at?",
    choices: ["Sports movies", "The badeken", "Airport goodbyes", "All of the above"],
    answerIndex: 3,
    reveal: "The man is a fountain. We love him for it.",
  },
  {
    id: "q3",
    category: "Alexa",
    question: "Alexa's hidden talent is:",
    choices: [
      "Remembering every order at a table of twelve",
      "Parallel parking in one elegant motion",
      "Spotting a college friend across a ballroom",
      "All of the above, obviously",
    ],
    answerIndex: 3,
    reveal: "She contains multitudes. And an excellent eye.",
  },
  {
    id: "q4",
    category: "Wedding",
    question: "What does the chuppah symbolize?",
    choices: [
      "A private club for the wedding party",
      "A home open on all sides",
      "A weather contingency",
      "The dessert table",
    ],
    answerIndex: 1,
    reveal: "Open to guests, held up by loved ones — our first home.",
  },
  {
    id: "q5",
    category: "Us",
    question: "Which trip became a core memory?",
    choices: ["A rainy weekend in the Berkshires", "Israel, with a lot of falafel", "A silent yoga retreat", "A cruise they do not discuss"],
    answerIndex: 1,
    reveal: "Falafel was involved. So was falling more in love.",
  },
  {
    id: "q6",
    category: "Wedding",
    question: "When the glass breaks, you should:",
    choices: ["Remain in solemn silence", "Shout mazel tov", "Immediately check your parking meter", "Start a slow clap"],
    answerIndex: 1,
    reveal: "Mazel tov is the whole assignment.",
  },
  {
    id: "q7",
    category: "Alexa",
    question: "If Alexa could only keep one wedding-day detail, it would be:",
    choices: ["The florals", "The people", "The playlist", "The lighting"],
    answerIndex: 1,
    reveal: "The people. Always the people.",
  },
  {
    id: "q8",
    category: "Austin",
    question: "Austin's signature move at a party is:",
    choices: ["A quiet corner", "Making sure everyone has a drink and a person to talk to", "DJing uninvited", "Leaving at 9"],
    answerIndex: 1,
    reveal: "He hosts even when he is not the host.",
  },
];

export const bingoSquares = [
  "See the kallah",
  "Groom tears up",
  "Someone says mazel tov",
  "Hear Siman Tov",
  "Spot a college friend",
  "Chair lifting",
  "Grandma dancing",
  "Sheva Brachot",
  "Someone dances on a chair",
  "Bride and groom kiss",
  "A l'chaim",
  "Catch the bouquet? maybe not",
  "Kippah adjustment",
  "Photo booth line",
  "Spot a shtick",
  "Hora circle forms",
  "Someone toasts too long",
  "Late-night fries appear",
  "A happy reunion hug",
  "Kids on the dance floor",
  "Gold florals spotted",
  "Someone asks 'what now?'",
  "Live mode banner glow",
  "First hora whoop",
];

export type BracketRound = {
  id: string;
  name: string;
  matches: Array<{
    id: string;
    a: string;
    b: string;
  }>;
};

export const bracketRounds: BracketRound[] = [
  {
    id: "quarters",
    name: "Quarterfinals",
    matches: [
      { id: "q1", a: "Austin cries first", b: "Alexa cries first" },
      { id: "q2", a: "Hora lasts 12 minutes", b: "Hora lasts 25 minutes" },
      { id: "q3", a: "Short rib wins the vote", b: "Branzino wins the vote" },
      { id: "q4", a: "Someone gets chair-lifted twice", b: "The MC tells a childhood story" },
    ],
  },
  {
    id: "semis",
    name: "Semifinals",
    matches: [
      { id: "s1", a: "Winner of Q1", b: "Winner of Q2" },
      { id: "s2", a: "Winner of Q3", b: "Winner of Q4" },
    ],
  },
  {
    id: "finals",
    name: "Final",
    matches: [{ id: "f1", a: "Winner of S1", b: "Winner of S2" }],
  },
];

export const faceOffRounds = [
  {
    id: "f1",
    prompt: "Who is more likely to remember a stranger's name?",
    a: "Austin",
    b: "Alexa",
  },
  {
    id: "f2",
    prompt: "Who packed for the honeymoon first?",
    a: "Austin",
    b: "Alexa",
  },
  {
    id: "f3",
    prompt: "Who will last longer on the dance floor?",
    a: "Austin",
    b: "Alexa",
  },
  {
    id: "f4",
    prompt: "Who planned the better surprise?",
    a: "Austin",
    b: "Alexa",
  },
];
