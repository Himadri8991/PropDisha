import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import heroK from "@/assets/hero-kolkata.jpg";
import heroM from "@/assets/hero-mumbai.jpg";

export type Intent = "Buy" | "Invest" | "Commercial" | "Luxury";

export type Property = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  developer: "Srijan" | "PS Group" | "Godrej Properties" | "Shapoorji Pallonji";
  city: "Kolkata" | "Mumbai";
  location: string;
  priceLabel: string;
  priceMin: number; // in lakhs
  bhk: number[];
  sizeRange: string;
  possession: string;
  configuration: string;
  status: "Under Construction" | "Ready to Move" | "New Launch";
  intent: Intent[];
  cover: string;
  gallery: string[];
  story: string[];
  highlights: { amenities: string[]; connectivity: string[]; lifestyle: string[] };
  nearby: { metro: string; school: string; hospital: string };
  investment: { roi: string; demand: "High" | "Rising" | "Stable"; growth: string; appreciation: string };
  rera: string;
  tag?: string;
};

export const properties: Property[] = [
  {
    id: "1",
    slug: "srijan-spacia",
    name: "Srijan Spacia",
    tagline: "Crafted for Convenience. Designed for Lifestyle.",
    developer: "Srijan",
    city: "Kolkata",
    location: "Jessore Road, Madhyamgram",
    priceLabel: "₹76.69 L onwards",
    priceMin: 76.69,
    bhk: [3, 4],
    sizeRange: "1079 – 1411 sq.ft.",
    possession: "Dec 2030",
    configuration: "G+12 · 6 Towers",
    status: "Under Construction",
    intent: ["Buy", "Invest"],
    cover: p1,
    gallery: [p1, heroK, p3, p2, heroM, p4],
    story: [
      "Wake up to wide skies above the city.",
      "Walk through 64% open landscape, three sides open to light.",
      "Live where retail, lifestyle and home become one rhythm.",
    ],
    highlights: {
      amenities: ["18,000 sq.ft Clubhouse", "Infinity Pool", "Outdoor Cinema", "Yoga Pavilion", "Sky Lounge", "Children's Atelier"],
      connectivity: ["15 min from Airport", "1.8 km to upcoming Metro", "2 km to Madhyamgram Station", "Direct to VIP Road"],
      lifestyle: ["29,000+ sq.ft In-house Retail", "IGBC Platinum Pre-Certified", "3.6 Acre Township", "449 Curated Homes"],
    },
    nearby: { metro: "Madhyamgram Metro (1.8 km)", school: "Delhi Public School (3 km)", hospital: "Disha Eye Hospital (2 km)" },
    investment: { roi: "14–18%", demand: "High", growth: "Rising", appreciation: "+12% in last 12 months" },
    rera: "WBRERA/P/NOR/2025/003059",
    tag: "Featured",
  },
  {
    id: "2",
    slug: "primus-ganges",
    name: "Primus Ganges",
    tagline: "Live by the river. Move naturally. Stay free.",
    developer: "Srijan",
    city: "Kolkata",
    location: "Batanagar, Srijan Ganga City",
    priceLabel: "₹30 L onwards",
    priceMin: 30,
    bhk: [1, 2],
    sizeRange: "499 – 1311 sq.ft.",
    possession: "Jun 2030",
    configuration: "Senior Living · 1 Tower · 202 Homes",
    status: "Under Construction",
    intent: ["Buy", "Luxury"],
    cover: p2,
    gallery: [p2, heroK, p4, p1, p3, heroM],
    story: [
      "Age should never slow you down. It should set you free.",
      "55-acre riverside township. Ganges in every breath.",
      "Concierge, chef-curated meals, 24×7 medical care.",
    ],
    highlights: {
      amenities: ["24×7 Medical Support", "Concierge", "Chef-Curated Meals", "Wellness Spa", "Health Station", "Reading Lounge"],
      connectivity: ["Direct Ganges Frontage", "20 min to Esplanade", "Riverside Promenade", "Private Jetty Access"],
      lifestyle: ["Blue Zone Inspired", "Senior-Friendly Design", "Anti-skid Flooring", "55-acre Riverside Township"],
    },
    nearby: { metro: "Maheshtala (4 km)", school: "—", hospital: "ESI Hospital (2 km)" },
    investment: { roi: "10–14%", demand: "Rising", growth: "Rising", appreciation: "Niche senior-living premium" },
    rera: "WBRERA/P/SOU/2025/002901",
    tag: "New Launch",
  },
  {
    id: "3",
    slug: "aman-riverfront",
    name: "Aman Riverfront",
    tagline: "Live where the city slows down.",
    developer: "PS Group",
    city: "Kolkata",
    location: "New Town, Action Area II",
    priceLabel: "₹1.8 Cr onwards",
    priceMin: 180,
    bhk: [3, 4],
    sizeRange: "1850 – 2640 sq.ft.",
    possession: "Mar 2028",
    configuration: "G+24 · 4 Towers · 312 Homes",
    status: "Under Construction",
    intent: ["Buy", "Luxury", "Invest"],
    cover: p3,
    gallery: [p3, heroM, p1, p4, p2, heroK],
    story: [
      "Wake up to river views.",
      "Walk through gardens, not corridors.",
      "Live in a residence designed by Aman-trained architects.",
    ],
    highlights: {
      amenities: ["Sky Infinity Pool", "Private Cabanas", "Wine Cellar", "Cigar Lounge", "Spa & Hammam", "Pet Concierge"],
      connectivity: ["3 min to Eco Park", "Metro Phase II adjacent", "12 min to Airport", "Direct to Rajarhat"],
      lifestyle: ["Aman-trained Architects", "Concierge Lifestyle", "Floor-to-ceiling Glass", "Private Lift Lobbies"],
    },
    nearby: { metro: "City Centre II (1 km)", school: "Delhi Public School Newtown", hospital: "Tata Medical Center (4 km)" },
    investment: { roi: "16–22%", demand: "High", growth: "Rising", appreciation: "+18% in last 18 months" },
    rera: "WBRERA/P/NOR/2024/001872",
    tag: "Premium",
  },
  {
    id: "4",
    slug: "godrej-skyline-worli",
    name: "Godrej Skyline",
    tagline: "Above the sea. Beyond the skyline.",
    developer: "Godrej Properties",
    city: "Mumbai",
    location: "Worli, Sea Link",
    priceLabel: "₹4.5 Cr onwards",
    priceMin: 450,
    bhk: [3, 4, 5],
    sizeRange: "1480 – 3420 sq.ft.",
    possession: "Dec 2027",
    configuration: "G+58 · 2 Towers · 188 Homes",
    status: "New Launch",
    intent: ["Luxury", "Invest"],
    cover: p4,
    gallery: [p4, heroM, p3, p1, heroK, p2],
    story: [
      "Watch the Sea Link curve into your living room.",
      "Sunsets framed in floor-to-ceiling glass.",
      "A residence reserved for the few who already have everything.",
    ],
    highlights: {
      amenities: ["58th Floor Sky Pool", "Private Helipad Access", "Michelin-style Kitchen", "Cigar & Whisky Lounge", "Spa Sanctuary", "Valet"],
      connectivity: ["Bandra-Worli Sea Link", "8 min to BKC", "3 min to Worli Station", "Coastal Road Direct"],
      lifestyle: ["Sea-facing Residences", "Private Lift Lobbies", "Smart Home by KNX", "24×7 Concierge"],
    },
    nearby: { metro: "Acharya Atre Chowk (1 km)", school: "Podar International (2 km)", hospital: "Lilavati Hospital (4 km)" },
    investment: { roi: "12–16%", demand: "High", growth: "Rising", appreciation: "+9% YoY in Worli" },
    rera: "P51900012345",
    tag: "Luxury",
  },
  {
    id: "5",
    slug: "shapoorji-northern-lights",
    name: "Shapoorji Northern Lights",
    tagline: "Where business grows quietly.",
    developer: "Shapoorji Pallonji",
    city: "Kolkata",
    location: "Salt Lake Sector V",
    priceLabel: "₹95 L onwards",
    priceMin: 95,
    bhk: [0],
    sizeRange: "650 – 4200 sq.ft. (Office)",
    possession: "Sep 2026",
    configuration: "G+18 · Grade-A Office",
    status: "Under Construction",
    intent: ["Commercial", "Invest"],
    cover: heroK,
    gallery: [heroK, p1, p3, heroM, p4, p2],
    story: [
      "Where IPOs are written.",
      "Where quiet ambition compounds daily.",
      "A workplace built to outlast the cycle.",
    ],
    highlights: {
      amenities: ["LEED Platinum", "Smart Building", "EV Charging Bay", "Roof Garden", "F&B Plaza", "Fibre-Ready"],
      connectivity: ["Sector V Metro", "10 min to EM Bypass", "Webel Crossing", "Bidhannagar Station"],
      lifestyle: ["Grade-A Specs", "9 ft Floor Plates", "98% Power Backup", "Dual Sky-Lobbies"],
    },
    nearby: { metro: "Sector V (300 m)", school: "—", hospital: "AMRI Salt Lake (2 km)" },
    investment: { roi: "11–15%", demand: "High", growth: "Rising", appreciation: "Rental yield 7.8%" },
    rera: "WBRERA/P/NOR/2024/002145",
    tag: "Commercial",
  },
  {
    id: "6",
    slug: "ps-the-cascades",
    name: "PS The Cascades",
    tagline: "Make money while you sleep.",
    developer: "PS Group",
    city: "Mumbai",
    location: "Powai Lakeside",
    priceLabel: "₹2.1 Cr onwards",
    priceMin: 210,
    bhk: [2, 3],
    sizeRange: "920 – 1640 sq.ft.",
    possession: "Mar 2027",
    configuration: "G+32 · 3 Towers",
    status: "New Launch",
    intent: ["Invest", "Buy"],
    cover: heroM,
    gallery: [heroM, p3, p4, heroK, p1, p2],
    story: [
      "A lake on one side. A skyline on the other.",
      "Walk to work. Run by the water.",
      "An address that pays you back.",
    ],
    highlights: {
      amenities: ["Lakefront Promenade", "Rooftop Yoga Deck", "Co-working Lounge", "Pet Park", "Lap Pool", "Chef Garden"],
      connectivity: ["5 min to Hiranandani", "Metro Line 6", "JVLR Direct", "10 min to BKC"],
      lifestyle: ["Lake-facing Towers", "WELL Pre-Certified", "Smart Lock Homes", "EV Ready Parking"],
    },
    nearby: { metro: "Powai Metro (1.2 km)", school: "Bombay Scottish (2 km)", hospital: "Hiranandani Hospital (1 km)" },
    investment: { roi: "15–20%", demand: "High", growth: "Rising", appreciation: "+14% YoY in Powai" },
    rera: "P51800023456",
    tag: "Premium",
  },
];

export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);
