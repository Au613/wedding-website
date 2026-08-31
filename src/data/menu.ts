export type MenuCourse = {
  id: string;
  title: string;
  items: string[];
};

export type VoteDish = {
  id: string;
  name: string;
  description: string;
};

export const menuCourses: MenuCourse[] = [
  {
    id: "cocktail",
    title: "Cocktail Hour",
    items: [
      "Tuna crudo cones",
      "Mushroom bourekas",
      "Citrus-cured salmon on latke",
      "Passed spicy tuna bites",
    ],
  },
  {
    id: "appetizer",
    title: "Appetizer",
    items: ["Roasted beet & citrus salad", "Chicken soup with herbed matzah ball"],
  },
  {
    id: "entree",
    title: "Entrées",
    items: ["Short rib", "Branzino", "Butternut squash ravioli"],
  },
  {
    id: "dessert",
    title: "Dessert",
    items: ["Chocolate soufflé", "Seasonal fruit tart", "Mini sufganiyot"],
  },
  {
    id: "late",
    title: "Late Night",
    items: ["Challah french toast", "French fries", "Midnight cookies"],
  },
];

export const voteDishes: VoteDish[] = [
  { id: "short-rib", name: "Short Rib", description: "Slow and serious." },
  { id: "ravioli", name: "Butternut Squash Ravioli", description: "The vegetarian showpiece." },
  { id: "challah-toast", name: "Challah French Toast", description: "A late-night legend." },
  { id: "branzino", name: "Branzino", description: "Bright, coastal, elegant." },
  { id: "souffle", name: "Chocolate Soufflé", description: "Worth the wait." },
];

export const seedVotes: Record<string, number> = {
  "short-rib": 42,
  ravioli: 28,
  "challah-toast": 36,
  branzino: 31,
  souffle: 39,
};
