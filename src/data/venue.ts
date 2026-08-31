export type MapPin = {
  id: string;
  number: number;
  name: string;
  description: string;
  x: number;
  y: number;
};

export const venue = {
  name: "Felton Farm / Smith Barn",
  address: "38 Felton St, Peabody, MA 01960",
  directionsUrl: "https://maps.google.com/?q=38+Felton+St,+Peabody,+MA+01960",
  parking:
    "Follow Felton St to the farm entrance and the parking sign toward the gravel lot. Please do not park on neighboring residential driveways.",
  rideshare: "Drop off at 38 Felton St, Peabody. Pin: Felton Farm / Smith Barn.",
  airports: [
    { code: "BOS", name: "Boston Logan", note: "Closest major airport — about 25–40 minutes, traffic depending." },
    { code: "MHT", name: "Manchester-Boston", note: "A calmer alternative — about 50 minutes." },
    { code: "PVD", name: "Rhode Island T.F. Green", note: "Useful for some routes — plan about 90 minutes." },
  ],
  hotels: [
    {
      name: "Marriott Peabody",
      address: "8A Centennial Dr, Peabody, MA 01960",
      mapsUrl: "https://maps.google.com/?q=8A+Centennial+Dr,+Peabody,+MA+01960",
    },
    {
      name: "Best Western Plus North Shore",
      address: "50 Dayton Street, Danvers, MA 01923",
      mapsUrl: "https://maps.google.com/?q=50+Dayton+Street,+Danvers,+MA+01923",
    },
  ],
  pins: [
    { id: "parking", number: 0, name: "Parking", description: "Arrive on Felton St and follow the parking sign to the gravel lot.", x: 78, y: 86 },
    { id: "barn", number: 1, name: "Cocktail Hour, Badeken & Meal", description: "Smith Barn — drinks, the badeken, dinner, and dancing.", x: 48, y: 46 },
    { id: "tisch", number: 2, name: "Tisch", description: "Outdoor table under the lights, just off the barn.", x: 22, y: 70 },
    { id: "chuppah", number: 3, name: "Ceremony / Chuppah", description: "Garden ceremony with benches facing the chuppah.", x: 74, y: 22 },
  ] satisfies MapPin[],
  mapImage: "/photos/venue-map.jpg",
};
