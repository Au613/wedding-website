export type MapPin = {
  id: string;
  number: number;
  name: string;
  description: string;
  x: number;
  y: number;
};

export const venue = {
  name: "The Pasea Hotel & Spa",
  address: "21080 Pacific Coast Highway, Huntington Beach, CA 92648",
  directionsUrl: "https://maps.google.com/?q=The+Pasea+Hotel+%26+Spa",
  parking:
    "Valet is at the main porte-cochère. Self-park is in the hotel garage — follow Pasea Wedding signs. Do not use the adjacent residential lot.",
  shuttle:
    "A complimentary shuttle will loop from the room-block lobby to the ceremony lawn beginning at 5:00 PM. Last return is 12:30 AM.",
  rideshare: "Use the Pacific Coast Highway hotel entrance. Pin: Pasea Hotel main lobby.",
  airports: [
    { code: "SNA", name: "John Wayne", note: "Closest — about 20 minutes." },
    { code: "LAX", name: "Los Angeles International", note: "Better international options — plan 60–90 minutes." },
    { code: "LGB", name: "Long Beach", note: "A calm alternative when flights align." },
  ],
  hotel: {
    name: "The Pasea Hotel & Spa",
    roomBlockName: "Austin & Alexa Wedding",
    code: "AUSTINALEXA26",
    deadline: "May 22, 2026",
    bookingUrl: "https://www.paseahotel.com",
    perks: ["Breakfast for two", "Resort amenities", "Wedding-day shuttle"],
    blurb:
      "A coastal room block with easy access to the ceremony lawn, parking, and a place to hide from your relatives for ten minutes.",
  },
  pins: [
    { id: "entrance", number: 1, name: "Entrance", description: "Main arrival and welcome desk.", x: 18, y: 62 },
    { id: "parking", number: 2, name: "Parking", description: "Valet and garage access.", x: 12, y: 78 },
    { id: "cocktail", number: 3, name: "Cocktail Hour", description: "Terrace and lawn with passed bites.", x: 38, y: 48 },
    { id: "chuppah", number: 4, name: "Chuppah", description: "Garden ceremony canopy.", x: 58, y: 32 },
    { id: "reception", number: 5, name: "Reception", description: "Grand ballroom dinner and toasts.", x: 72, y: 50 },
    { id: "dance", number: 6, name: "Dance Floor", description: "Hora, chairs, and late-night joy.", x: 78, y: 62 },
    { id: "restrooms", number: 7, name: "Restrooms", description: "Ballroom foyer, both sides.", x: 86, y: 40 },
    { id: "coat", number: 8, name: "Coat Check", description: "Just inside the ballroom entrance.", x: 64, y: 72 },
    { id: "photo", number: 9, name: "Photo Booth", description: "Props, the monkey, and no excuses.", x: 46, y: 70 },
  ] satisfies MapPin[],
};
