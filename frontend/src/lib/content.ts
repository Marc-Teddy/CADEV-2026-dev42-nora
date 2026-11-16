/* ============================================================
   NORA — Contenu éditorial du site (images, listes de villes).
   Ce ne sont PAS des données utilisateurs : celles-ci vivent
   exclusivement en base et passent par l'API.
   ============================================================ */

export const IMAGES = {
  heroSavanna: "/images/hero-savanna.jpg",
  hackathon: "/images/event-hackathon.jpg",
  conference: "/images/event-conference.jpg",
  buildAfrica: "/images/build-africa.jpg",
  devKid: "/images/dev-kid.jpg",
  devFocus: "/images/dev-focus.jpg",
  devHands: "/images/dev-hands.jpg",
  techNetwork: "/images/tech-network.jpg",
  africaFlags: "/images/africa-flags.png",
} as const;

/* Communautés par ville — photos réelles (les membres réels
   arrivent avec les comptes de la plateforme). */
export const cityCards = [
  { city: "Cotonou", country: "Bénin", flag: "🇧🇯", image: "/images/city-cotonou.jpg" },
  { city: "Abidjan", country: "Côte d'Ivoire", flag: "🇨🇮", image: "/images/city-abidjan.jpg" },
  { city: "Dakar", country: "Sénégal", flag: "🇸🇳", image: "/images/city-dakar.jpg" },
  { city: "Accra", country: "Ghana", flag: "🇬🇭", image: "/images/city-accra.jpg" },
];

export const citiesMarquee = [
  "Abidjan", "Lagos", "Dakar", "Nairobi", "Cotonou", "Accra", "Kigali", "Casablanca", "Douala", "Kinshasa",
  "Bamako", "Ouagadougou", "Lomé", "Le Caire", "Kampala", "Johannesburg", "Porto-Novo", "Khartoum", "Antananarivo", "Addis-Abeba",
];
