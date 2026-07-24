// Real business facts for Capital City Grooming & Supply.
// Placeholders that need client verification are marked with FLAG comments.

export const business = {
  name: "Capital City Grooming & Supply",
  city: "Olympia",
  state: "Washington",
  stateAbbr: "WA",
  phoneDisplay: "(360) 754-4767",
  phoneHref: "tel:+13607544767",
  address: {
    line1: "1720 4th Ave E",
    cityStateZip: "Olympia, WA 98506",
  },
  // Deep link opens the address in the user's default maps app; no API key needed.
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Capital+City+Grooming+%26+Supply+1720+4th+Ave+E+Olympia+WA+98506",
  rating: {
    // Real Google numbers - do not round up.
    stars: "4.3",
    count: 116,
  },
  // FLAG: replace with the client's real booking method (booking system / phone / email).
  bookingHref: "tel:+13607544767",
  hours: [
    { day: "Tuesday", time: "7:30-17:00" },
    { day: "Wednesday", time: "7:30-17:00" },
    { day: "Thursday", time: "7:30-17:00" },
    { day: "Friday", time: "7:30-17:00" },
    { day: "Saturday", time: "9:00-17:00" },
    { day: "Sunday", time: "Closed" },
    { day: "Monday", time: "Closed" },
  ],
} as const;

// FLAG: placeholder service menu - names, prices and descriptions must be replaced
// with the real menu before the client sees the final version.
export const services = [
  {
    name: "Full Groom",
    price: "from $65",
    description: "Bath, haircut, nails, ears and a finish tailored to the breed.",
  },
  {
    name: "Bath & Brush",
    price: "from $40",
    description: "Deep clean, blow-out, and brush-through with no cut.",
  },
  {
    name: "Nail Trim",
    price: "from $15",
    description: "Quick, low-stress trim and file. Walk-ins welcome.",
  },
  {
    name: "De-shed Treatment",
    price: "from $55",
    description: "Undercoat reduction to cut shedding at the source.",
  },
] as const;
