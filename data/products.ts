import { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "p1",
    slug: "pvc-wpc-ply",
    name: "PVC / WPC Ply",
    category: "Advanced Boards",
    description:
      "The definitive next-generation substitute for Plywood and MDF. 100% eco-friendly and industrial-grade.",
    applications: [
      "Kitchen Cabinets",
      "Wardrobes",
      "Office Workstations",
      "Construction Shuttering",
    ],
    features: ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"],
    certifications: ["c1", "c2"],
    images: [
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=800",
    ],
    specifications: {
      densityRange: "0.35 to 0.85 g/cc",
      shoreHardness: "50 to 80 Shore D",
      thickness: "5mm to 35mm",
      standardSize: "8x4 feet",
      leadContent: "0% (Certified Lead-Free)",
    },
    isHero: true,
  },
  {
    id: "p2",
    slug: "wpc-doors",
    name: "WPC Solid Doors",
    category: "Doors & Frames",
    description:
      "Plain and CNC-designed doors that are maintenance-free, moisture-resistant, and elegant.",
    applications: [
      "Residential Main Doors",
      "Internal Doors",
      "Commercial Office Doors",
    ],
    features: ["f1", "f2", "f3", "f4"],
    certifications: ["c1"],
    images: [
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=1000",
    ],
    specifications: {
      construction: "Solid Extruded Composite",
      thickness: "24mm to 40mm",
      designTypes: "Plain / CNC-Designed",
      finish: "Paintable & Laminatable",
      durability: "Maintenance-Free Lifetime",
    },
  },
  {
    id: "p3",
    slug: "pvc-marble-sheets",
    name: "PVC Marble Sheets",
    category: "Decorative",
    description:
      "Luxurious wall cladding solution that is lightweight, hygienic, and moisture-proof.",
    applications: [
      "Hotel Lobbies",
      "Bathroom Walls",
      "Retail Showrooms",
      "Hospital Interiors",
    ],
    features: ["f2", "f4", "f7"],
    certifications: ["c1"],
    images: [
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=1000",
    ],
    specifications: {
      thickness: "3.0 mm",
      finish: "High Gloss UV Coated",
      weight: "Lightweight Composite",
      application: "Decorative Wall Cladding",
    },
  },
  {
    id: "p4",
    slug: "prelaminate-ply",
    name: "Prelaminate Ply",
    category: "Advanced Boards",
    description:
      "Ready-to-use factory laminated boards available in multiple shades and textures.",
    applications: [
      "Modular Furniture",
      "Kitchen Cabinets",
      "Office Partitions",
    ],
    features: ["f2", "f4", "f7"],
    certifications: ["c1"],
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1000",
    ],
    specifications: {
      surface: "Scratch Resistant Laminate",
      core: "High Density WPC",
      edges: "PVC Edge Banding Compatible",
      thickness: "12mm, 18mm",
    },
  },
  {
    id: "p5",
    slug: "wpc-door-frames",
    name: "WPC Door Frames",
    category: "Doors & Frames",
    description:
      "Structural replacement for wooden door frames. Termite and moisture proof with high screw holding.",
    applications: [
      "Residential Projects",
      "Commercial Developments",
      "Hospitals",
    ],
    features: ["f1", "f2", "f6"],
    certifications: ["c1"],
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1000",
    ],
    specifications: {
      structure: "Solid Extruded Hollow/Solid Profiles",
      standardSizes: "3x2, 4x2, 5x2.5 inches",
      screwHolding: "High (>1800N)",
      weathering: "UV Resistant",
    },
  },
];
