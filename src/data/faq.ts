export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: string;
  title: string;
  items: FaqItem[];
};

export const faq: FaqCategory[] = [
  {
    id: "basics",
    title: "Orthodox Wedding Basics",
    items: [
      {
        id: "what-to-expect",
        question: "I've never been to an Orthodox Jewish wedding. Will I be lost?",
        answer:
          "Not at all. The day has a clear rhythm, and this site is built to walk you through it. Follow the room, and when in doubt, look for someone smiling and ask. People love explaining.",
      },
      {
        id: "mechitza",
        question: "What is a mechitza? Will men and women sit separately?",
        answer:
          "A mechitza is a gentle divider used in some Jewish spaces so that prayer can feel focused. For our ceremony, seating is mixed and family-friendly. During some dancing, there may be moments of separate circles — join whichever feels comfortable, or watch and clap. Nobody will quiz you.",
      },
      {
        id: "kippah",
        question: "Do I need to bring a kippah?",
        answer:
          "If you are a man (or anyone who would like one), kippot will be available at the entrance. You are welcome to wear your own. It is a sign of respect during the ceremony, not a test. But if you don't want to wear one — you do you.",
      },
      {
        id: "participate",
        question: "Do I need to know Hebrew to participate?",
        answer:
          "No. You can listen, you can say amen, and you can shout mazel tov with the rest of us. That is more than enough.",
      },
    ],
  },
  {
    id: "dress",
    title: "Attire",
    items: [
      {
        id: "how-formal",
        question: "What should we wear?",
        answer:
          "Formal / Evening attire. But if you wear pajamas, you better be prepared to dance in pajamas! Weather permitting, the ceremony is outside, so some heels and stilettos may be hard to walk in.",
      },
    ],
  },
  {
    id: "seating",
    title: "Seating",
    items: [
      {
        id: "assigned",
        question: "Is there assigned seating?",
        answer:
          "Yes for dinner. Cocktail hour is open. Your table number will be assigned.",
      },
      {
        id: "plus-one",
        question: "Can I move seats to sit with friends?",
        answer:
          "If it feels off - find a happy place",
      },
    ],
  },
  {
    id: "food",
    title: "Food / Kashrut",
    items: [
      {
        id: "kosher",
        question: "What does kosher mean here?",
        answer:
          "The food is prepared according to Jewish dietary laws: no mixing of meat and dairy, and ingredients that meet kosher standards. You do not need to do anything special except enjoy it.",
      },
      {
        id: "allergies",
        question: "I have allergies or a dietary need.",
        answer:
          "Please tell us in advance if you have not already. Kitchen staff will have a list. Do not be shy — we would rather know.",
      },
    ],
  },
  {
    id: "ceremony",
    title: "Ceremony",
    items: [
      {
        id: "badeken",
        question: "What is the badeken?",
        answer:
          "It is the veiling of the bride, usually just before the chuppah. Intimate, old, and often emotional. A good moment to have a tissue and a little quiet.",
      },
      {
        id: "how-long",
        question: "How long is the ceremony?",
        answer:
          "About 35 minutes under the chuppah, from 1:45 to 2:20, not including the tisch, kabbalat panim, and badeken beforehand.",
      },
    ],
  },
  {
    id: "dancing",
    title: "Dancing",
    items: [
      {
        id: "hora",
        question: "What is the hora?",
        answer:
          "A joyful circle dance. You will be pulled in. Let yourself be pulled in. If someone is lifted in a chair, that is a compliment and a core workout.",
      },
      {
        id: "separate-dancing",
        question: "Is dancing mixed?",
        answer:
          "There will be mixed dancing and also some traditional circle dancing. Join what feels right. Watching is also a perfectly respectable sport.",
      },
    ],
  },
  {
    id: "parking",
    title: "Parking",
    items: [
      {
        id: "where-park",
        question: "Where do I park?",
        answer:
          "There is parking next to the venue — and more than enough.",
      },
    ],
  },
  {
    id: "travel",
    title: "Travel",
    items: [
      {
        id: "airport",
        question: "Which airport should I fly into?",
        answer:
          "BOS (Boston Logan) is closest. Manchester (MHT) and Providence (PVD) are useful alternatives. See Travel for drive times.",
      },
    ],
  },
  {
    id: "children",
    title: "Children",
    items: [
      {
        id: "kids",
        question: "Are children welcome?",
        answer:
          "If they are on your invitation, they are welcome. The ceremony is shorter than a movie. Quiet toys are saints. If they need a breather, the lawn is right there.",
      },
    ],
  },
  {
    id: "gifts",
    title: "Gifts",
    items: [
      {
        id: "registry",
        question: "Do you have a registry?",
        answer:
          "Your presence is the gift. If you would like to, our registry is linked from Home and Travel. Please do not feel obligated.",
      },
    ],
  },
  {
    id: "photos",
    title: "Phones / Photos",
    items: [
      {
        id: "chuppah-photos",
        question: "Can I take photos during the chuppah?",
        answer:
          "We would love you present more than we would love another photo of the back of someone's head. Please keep phones away during the ceremony. After the glass breaks, snap away — and later, upload them to Share Your Photos.",
      },
    ],
  },
];
