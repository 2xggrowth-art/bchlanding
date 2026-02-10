/**
 * BCH (Bharath Cycle Hub) Product Catalog
 * 50 bicycles across 5 categories with realistic Indian pricing
 */

export const categories = [
  {
    name: "Kids Cycles",
    slug: "kids",
    description: "Safe, colourful cycles for children aged 3\u201312 with training wheels and sturdy frames",
  },
  {
    name: "Geared Cycles",
    slug: "geared",
    description: "Multi-speed bicycles with 21\u201327 gears for versatile riding on any terrain",
  },
  {
    name: "Mountain Bikes",
    slug: "mountain",
    description: "Rugged trail-ready MTBs with suspension, disc brakes, and aggressive tread",
  },
  {
    name: "City / Commuter",
    slug: "city",
    description: "Comfortable everyday bicycles for urban commutes, errands, and leisure rides",
  },
  {
    name: "Electric Bikes",
    slug: "electric",
    description: "Pedal-assist and throttle e-bikes with powerful motors and long-range batteries",
    subCategories: [
      { name: "Emotorad", slug: "emotorad" },
    ],
  },
];

export const products = [
  // ─────────────────────────────────────────────
  // KIDS CYCLES (10) — ages 3-12, ₹3,000–₹12,000
  // ─────────────────────────────────────────────
  {
    id: "kids-001",
    name: "Sparrow 12T Kids Cycle",
    category: "kids",
    price: 3299,
    mrp: 4499,
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '12"',
      frameType: "Steel",
      gearCount: "Single Speed",
      brakeType: "Coaster Brake",
      weight: "7.5 kg",
      ageRange: "3\u20135 years",
    },
    badge: "Value Pick",
    shortDescription: "Sturdy 12-inch starter cycle with training wheels and chain guard for toddlers.",
    warranty: {
      frame: "2 years",
      parts: "6 months",
      coverage: [
        "Manufacturing defects",
        "Frame cracks under normal use",
        "Paint peeling (first 6 months)"
      ],
      exclusions: [
        "Normal wear and tear",
        "Accidental damage",
        "Improper assembly or modifications"
      ],
      freeServices: [
        "First tune-up (within 30 days)",
        "Brake adjustment (first 3 months)",
        "Chain lubrication (first service)"
      ]
    },
    accessories: ["acc-helmet-002", "acc-bell-001", "acc-lock-003", "acc-training-wheels-001", "acc-streamers-001"]
  },
  {
    id: "kids-002",
    name: "Cub 14T Junior Bike",
    category: "kids",
    price: 3999,
    mrp: 5299,
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '14"',
      frameType: "Steel",
      gearCount: "Single Speed",
      brakeType: "Caliper",
      weight: "8.2 kg",
      ageRange: "3\u20135 years",
    },
    badge: null,
    shortDescription: "Colourful 14-inch cycle with padded seat and easy-grip handles for young riders.",
    warranty: {
      frame: "2 years",
      parts: "6 months",
      coverage: ["Manufacturing defects", "Frame cracks under normal use", "Paint peeling (first 6 months)"],
      exclusions: ["Normal wear and tear", "Accidental damage", "Improper assembly or modifications"],
      freeServices: ["First tune-up (within 30 days)", "Brake adjustment (first 3 months)", "Chain lubrication (first service)"]
    },
    accessories: ["acc-helmet-002", "acc-bell-001", "acc-lock-003", "acc-basket-001"]
  },
  {
    id: "kids-003",
    name: "Panda 16T Kids Bicycle",
    category: "kids",
    price: 4499,
    mrp: 5999,
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '16"',
      frameType: "Steel",
      gearCount: "Single Speed",
      brakeType: "Caliper",
      weight: "9 kg",
      ageRange: "4\u20137 years",
    },
    badge: "Bestseller",
    shortDescription: "Best-selling 16-inch kids cycle with basket, bell, and removable training wheels.",
  },
  {
    id: "kids-004",
    name: "Rocket 16T Boys Bike",
    category: "kids",
    price: 4999,
    mrp: 6499,
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '16"',
      frameType: "Steel",
      gearCount: "Single Speed",
      brakeType: "V-Brake",
      weight: "9.5 kg",
      ageRange: "5\u20138 years",
    },
    badge: null,
    shortDescription: "Sporty 16-inch bike with racing graphics, mudguards, and side stand.",
  },
  {
    id: "kids-005",
    name: "Butterfly 16T Girls Bike",
    category: "kids",
    price: 4799,
    mrp: 6299,
    image: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '16"',
      frameType: "Steel",
      gearCount: "Single Speed",
      brakeType: "Caliper",
      weight: "9 kg",
      ageRange: "4\u20137 years",
    },
    badge: "New Arrival",
    shortDescription: "Elegant 16-inch girls cycle in lavender with flower basket and streamers.",
  },
  {
    id: "kids-006",
    name: "Storm 20T Junior MTB",
    category: "kids",
    price: 5999,
    mrp: 7999,
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '20"',
      frameType: "Steel",
      gearCount: "Single Speed",
      brakeType: "V-Brake",
      weight: "11 kg",
      ageRange: "7\u201310 years",
    },
    badge: null,
    shortDescription: "Adventure-style 20-inch cycle with knobby tyres and front mudguard.",
  },
  {
    id: "kids-007",
    name: "Turbo 20T Geared Kids",
    category: "kids",
    price: 7499,
    mrp: 9499,
    image: "https://images.unsplash.com/photo-1559348349-86f1f65817fe?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '20"',
      frameType: "Steel",
      gearCount: "6 Speed",
      brakeType: "V-Brake",
      weight: "12 kg",
      ageRange: "8\u201311 years",
    },
    badge: "Top Pick",
    shortDescription: "6-speed geared kids cycle with Shimano derailleur for young enthusiasts.",
  },
  {
    id: "kids-008",
    name: "Flash 20T BMX Style",
    category: "kids",
    price: 6499,
    mrp: 8499,
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '20"',
      frameType: "Hi-Ten Steel",
      gearCount: "Single Speed",
      brakeType: "V-Brake",
      weight: "10.5 kg",
      ageRange: "7\u201312 years",
    },
    badge: null,
    shortDescription: "BMX-inspired 20-inch bike with pegs, padded crossbar, and freestyle grips.",
  },
  {
    id: "kids-009",
    name: "Comet 20T Premium",
    category: "kids",
    price: 8999,
    mrp: 10999,
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '20"',
      frameType: "Alloy",
      gearCount: "6 Speed",
      brakeType: "Disc (Front)",
      weight: "11.5 kg",
      ageRange: "8\u201312 years",
    },
    badge: null,
    shortDescription: "Premium alloy-frame 20-inch geared cycle with front disc brake and suspension fork.",
  },
  {
    id: "kids-010",
    name: "Champion 20T Pro",
    category: "kids",
    price: 11499,
    mrp: 13999,
    image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '20"',
      frameType: "Alloy",
      gearCount: "7 Speed",
      brakeType: "Dual Disc",
      weight: "12 kg",
      ageRange: "9\u201312 years",
    },
    badge: "Top Pick",
    shortDescription: "Top-of-the-line kids MTB with dual disc brakes, alloy frame, and Shimano gears.",
  },

  // ─────────────────────────────────────────────
  // GEARED CYCLES (10) — 21-27 gears, ₹8,000–₹25,000
  // ─────────────────────────────────────────────
  {
    id: "geared-001",
    name: "Blaze 26T 21-Speed",
    category: "geared",
    price: 8499,
    mrp: 11999,
    image: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '26"',
      frameType: "Steel",
      gearCount: "21 Speed",
      brakeType: "V-Brake",
      weight: "15 kg",
    },
    badge: "Value Pick",
    shortDescription: "Affordable 21-speed cycle with Shimano derailleur, ideal for beginners.",
    sizeGuide: {
      hasGuide: true,
      sizes: [
        { size: "S", frame: '15"', riderHeight: '5\'0" - 5\'4"', inseam: '27" - 30"' },
        { size: "M", frame: '17"', riderHeight: '5\'5" - 5\'9"', inseam: '29" - 32"' },
        { size: "L", frame: '19"', riderHeight: '5\'10" - 6\'2"', inseam: '31" - 34"' }
      ],
      fitTips: [
        "Stand over frame with 1-2 inches clearance",
        "Slight knee bend when pedal is at lowest point",
        "Comfortable reach to handlebars without overstretching"
      ]
    },
    warranty: {
      frame: "3 years",
      parts: "1 year",
      coverage: ["Manufacturing defects", "Frame cracks under normal use", "Welding defects", "Paint peeling (first year)"],
      exclusions: ["Normal wear and tear", "Accidental damage", "Modifications or improper maintenance"],
      freeServices: ["First 3 tune-ups (within 6 months)", "Brake & gear adjustment (first year)", "Frame inspection (6 months)"]
    },
    accessories: ["acc-helmet-001", "acc-lock-002", "acc-lights-001", "acc-bottle-holder-001", "acc-pump-001"]
  },
  {
    id: "geared-002",
    name: "Venom 26T 21-Speed",
    category: "geared",
    price: 9499,
    mrp: 12999,
    image: "https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '26"',
      frameType: "Steel",
      gearCount: "21 Speed",
      brakeType: "Front Disc + Rear V-Brake",
      weight: "15.5 kg",
    },
    badge: "Bestseller",
    shortDescription: "Popular 21-speed with front disc brake, suspension fork, and sporty graphics.",
    sizeGuide: {
      hasGuide: true,
      sizes: [
        { size: "S", frame: '15"', riderHeight: '5\'0" - 5\'4"', inseam: '27" - 30"' },
        { size: "M", frame: '17"', riderHeight: '5\'5" - 5\'9"', inseam: '29" - 32"' },
        { size: "L", frame: '19"', riderHeight: '5\'10" - 6\'2"', inseam: '31" - 34"' }
      ],
      fitTips: [
        "Stand over frame with 1-2 inches clearance",
        "Slight knee bend when pedal is at lowest point",
        "Comfortable reach to handlebars without overstretching"
      ]
    },
    warranty: {
      frame: "3 years",
      parts: "1 year",
      coverage: ["Manufacturing defects", "Frame cracks under normal use", "Welding defects", "Paint peeling (first year)"],
      exclusions: ["Normal wear and tear", "Accidental damage", "Modifications or improper maintenance"],
      freeServices: ["First 3 tune-ups (within 6 months)", "Brake & gear adjustment (first year)", "Suspension check (6 months)"]
    },
    accessories: ["acc-helmet-001", "acc-lock-002", "acc-lights-001", "acc-bottle-holder-001", "acc-repair-kit-001", "acc-gloves-001"]
  },
  {
    id: "geared-003",
    name: "Drift 27.5T 21-Speed",
    category: "geared",
    price: 10999,
    mrp: 14499,
    image: "https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '27.5"',
      frameType: "Steel",
      gearCount: "21 Speed",
      brakeType: "Dual Disc",
      weight: "15 kg",
    },
    badge: null,
    shortDescription: "27.5-inch dual disc brake cycle with 21 gears and lockout suspension.",
  },
  {
    id: "geared-004",
    name: "Torque 26T 24-Speed",
    category: "geared",
    price: 12499,
    mrp: 15999,
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '26"',
      frameType: "Alloy",
      gearCount: "24 Speed",
      brakeType: "Dual Disc",
      weight: "14 kg",
    },
    badge: null,
    shortDescription: "Lightweight alloy frame 24-speed with quick-release wheels and Shimano shifters.",
  },
  {
    id: "geared-005",
    name: "Raptor 27.5T 21-Speed",
    category: "geared",
    price: 11499,
    mrp: 14999,
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '27.5"',
      frameType: "Steel",
      gearCount: "21 Speed",
      brakeType: "Dual Disc",
      weight: "15.8 kg",
    },
    badge: "New Arrival",
    shortDescription: "New 27.5-inch frame with aggressive look, dual disc brakes, and wide tyres.",
  },
  {
    id: "geared-006",
    name: "Nitro 29T 21-Speed",
    category: "geared",
    price: 13999,
    mrp: 17499,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '29"',
      frameType: "Alloy",
      gearCount: "21 Speed",
      brakeType: "Dual Disc",
      weight: "14.5 kg",
    },
    badge: null,
    shortDescription: "Large 29-inch wheels for taller riders with smooth rolling and great stability.",
  },
  {
    id: "geared-007",
    name: "Phantom 27.5T 24-Speed",
    category: "geared",
    price: 15499,
    mrp: 18999,
    image: "https://images.unsplash.com/photo-1583467875263-d50dec37a88c?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '27.5"',
      frameType: "Alloy",
      gearCount: "24 Speed",
      brakeType: "Dual Disc",
      weight: "13.8 kg",
    },
    badge: "Top Pick",
    shortDescription: "Premium 24-speed alloy bike with Shimano Altus gears and hydraulic-feel brakes.",
  },
  {
    id: "geared-008",
    name: "Velocity 700C 21-Speed",
    category: "geared",
    price: 14499,
    mrp: 18499,
    image: "https://images.unsplash.com/photo-1606117331085-5760e3b58520?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: "700C",
      frameType: "Alloy",
      gearCount: "21 Speed",
      brakeType: "Dual Disc",
      weight: "13 kg",
    },
    badge: null,
    shortDescription: "Road-style 700C geared cycle for fast commutes with drop-bar option.",
  },
  {
    id: "geared-009",
    name: "Thunder 27.5T 27-Speed",
    category: "geared",
    price: 19999,
    mrp: 23999,
    image: "https://images.unsplash.com/photo-1505158498176-0150297fbd7d?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '27.5"',
      frameType: "Alloy 6061",
      gearCount: "27 Speed",
      brakeType: "Hydraulic Disc",
      weight: "13.2 kg",
    },
    badge: null,
    shortDescription: "27-speed performance cycle with hydraulic disc brakes and Shimano Acera groupset.",
  },
  {
    id: "geared-010",
    name: "Apex 29T 27-Speed Pro",
    category: "geared",
    price: 24499,
    mrp: 28999,
    image: "https://images.unsplash.com/photo-1634117622592-114e3024ff27?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '29"',
      frameType: "Alloy 6061",
      gearCount: "27 Speed",
      brakeType: "Hydraulic Disc",
      weight: "12.8 kg",
    },
    badge: "Top Pick",
    shortDescription: "Top-tier 29er with 27-speed Shimano Alivio, hydraulic brakes, and air fork.",
  },

  // ─────────────────────────────────────────────
  // MOUNTAIN BIKES (10) — MTB/trail, ₹12,000–₹45,000
  // ─────────────────────────────────────────────
  {
    id: "mtb-001",
    name: "Trailblazer 26T Hardtail",
    category: "mountain",
    price: 12499,
    mrp: 15999,
    image: "https://images.unsplash.com/photo-1605559911160-a3d95d213904?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '26"',
      frameType: "Steel",
      gearCount: "21 Speed",
      brakeType: "Dual Disc",
      weight: "16 kg",
      suspension: "Front (80mm)",
    },
    badge: "Value Pick",
    shortDescription: "Entry-level hardtail MTB with 80mm fork, 21 gears, and rugged tyres.",
    sizeGuide: {
      hasGuide: true,
      sizes: [
        { size: "S", frame: '15"', riderHeight: '5\'0" - 5\'4"', inseam: '27" - 30"' },
        { size: "M", frame: '17"', riderHeight: '5\'5" - 5\'9"', inseam: '29" - 32"' },
        { size: "L", frame: '19"', riderHeight: '5\'10" - 6\'2"', inseam: '31" - 34"' },
        { size: "XL", frame: '21"', riderHeight: '6\'1" - 6\'4"', inseam: '33" - 36"' }
      ],
      fitTips: [
        "Stand over frame with 2-3 inches clearance for trail safety",
        "Slight knee bend when pedal is at lowest point",
        "Aggressive riding position with lower handlebar reach"
      ]
    },
    warranty: {
      frame: "5 years",
      parts: "1 year",
      coverage: ["Manufacturing defects", "Frame cracks under normal use", "Welding defects", "Suspension seals (first year)"],
      exclusions: ["Normal wear and tear", "Crash damage", "Modifications or racing use"],
      freeServices: ["First 3 tune-ups (within 6 months)", "Suspension service (first year)", "Brake bleed (if needed within 6 months)"]
    },
    accessories: ["acc-helmet-001", "acc-lock-001", "acc-repair-kit-001", "acc-bottle-holder-001", "acc-gloves-001", "acc-pump-001"]
  },
  {
    id: "mtb-002",
    name: "Ridge 27.5T Hardtail",
    category: "mountain",
    price: 15499,
    mrp: 19499,
    image: "https://images.unsplash.com/photo-1614851099511-773084f6911d?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '27.5"',
      frameType: "Alloy",
      gearCount: "21 Speed",
      brakeType: "Dual Disc",
      weight: "14.5 kg",
      suspension: "Front (100mm)",
    },
    badge: "Bestseller",
    shortDescription: "Best-selling alloy hardtail with 100mm travel fork and wide 2.1-inch tyres.",
    sizeGuide: {
      hasGuide: true,
      sizes: [
        { size: "S", frame: '15"', riderHeight: '5\'0" - 5\'4"', inseam: '27" - 30"' },
        { size: "M", frame: '17"', riderHeight: '5\'5" - 5\'9"', inseam: '29" - 32"' },
        { size: "L", frame: '19"', riderHeight: '5\'10" - 6\'2"', inseam: '31" - 34"' },
        { size: "XL", frame: '21"', riderHeight: '6\'1" - 6\'4"', inseam: '33" - 36"' }
      ],
      fitTips: [
        "Stand over frame with 2-3 inches clearance for trail safety",
        "Slight knee bend when pedal is at lowest point",
        "Aggressive riding position with lower handlebar reach"
      ]
    },
    warranty: {
      frame: "5 years",
      parts: "1 year",
      coverage: ["Manufacturing defects", "Frame cracks under normal use", "Welding defects", "Suspension seals (first year)"],
      exclusions: ["Normal wear and tear", "Crash damage", "Modifications or racing use"],
      freeServices: ["First 3 tune-ups (within 6 months)", "Suspension service (first year)", "Brake bleed (if needed within 6 months)"]
    },
    accessories: ["acc-helmet-001", "acc-lock-001", "acc-repair-kit-001", "acc-bottle-holder-001", "acc-gloves-001", "acc-mudguards-001"]
  },
  {
    id: "mtb-003",
    name: "Boulder 27.5T Trail",
    category: "mountain",
    price: 18999,
    mrp: 22999,
    image: "https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '27.5"',
      frameType: "Alloy 6061",
      gearCount: "24 Speed",
      brakeType: "Hydraulic Disc",
      weight: "14 kg",
      suspension: "Front (100mm) Lockout",
    },
    badge: null,
    shortDescription: "Trail-ready 24-speed MTB with lockout fork and hydraulic disc brakes.",
  },
  {
    id: "mtb-004",
    name: "Crag 29T XC Hardtail",
    category: "mountain",
    price: 22499,
    mrp: 26999,
    image: "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '29"',
      frameType: "Alloy 6061",
      gearCount: "27 Speed",
      brakeType: "Hydraulic Disc",
      weight: "13.5 kg",
      suspension: "Front (100mm) Air",
    },
    badge: null,
    shortDescription: "Cross-country 29er hardtail with air fork, Shimano Acera, and tubeless-ready rims.",
  },
  {
    id: "mtb-005",
    name: "Summit 27.5T Plus",
    category: "mountain",
    price: 24999,
    mrp: 29999,
    image: "https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '27.5+"',
      frameType: "Alloy 6061",
      gearCount: "27 Speed",
      brakeType: "Hydraulic Disc",
      weight: "14.2 kg",
      suspension: "Front (120mm)",
    },
    badge: "New Arrival",
    shortDescription: "Plus-size 2.8-inch tyres for extra grip on loose trails with 120mm suspension.",
  },
  {
    id: "mtb-006",
    name: "Granite 27.5T Dual Suspension",
    category: "mountain",
    price: 27999,
    mrp: 33999,
    image: "https://images.unsplash.com/photo-1517231925375-bf2cb42917a5?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '27.5"',
      frameType: "Alloy",
      gearCount: "21 Speed",
      brakeType: "Dual Disc",
      weight: "17 kg",
      suspension: "Full (Front 100mm + Rear)",
    },
    badge: null,
    shortDescription: "Full-suspension MTB for rough terrain with plush rear shock and 21-speed gearing.",
  },
  {
    id: "mtb-007",
    name: "Everest 29T Trail Pro",
    category: "mountain",
    price: 32499,
    mrp: 38499,
    image: "https://images.unsplash.com/photo-1558470598-a5dda9640f68?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '29"',
      frameType: "Alloy 6061 Hydroformed",
      gearCount: "27 Speed",
      brakeType: "Hydraulic Disc",
      weight: "13 kg",
      suspension: "Front (120mm) Air Fork",
    },
    badge: "Top Pick",
    shortDescription: "Premium 29er trail bike with hydroformed alloy frame, air fork, and Shimano Alivio.",
  },
  {
    id: "mtb-008",
    name: "Avalanche 27.5T Enduro",
    category: "mountain",
    price: 35999,
    mrp: 41999,
    image: "https://images.unsplash.com/photo-1523740856324-f2ce89135981?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '27.5"',
      frameType: "Alloy 6061",
      gearCount: "1x10 Speed",
      brakeType: "Hydraulic Disc (4-piston)",
      weight: "14 kg",
      suspension: "Full (Front 140mm + Rear 130mm)",
    },
    badge: null,
    shortDescription: "Enduro-style full-suspension with 1x10 drivetrain and 4-piston brakes for aggressive riding.",
  },
  {
    id: "mtb-009",
    name: "Pinnacle 29T Carbon Hardtail",
    category: "mountain",
    price: 39999,
    mrp: 46999,
    image: "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '29"',
      frameType: "Carbon Fibre",
      gearCount: "1x11 Speed",
      brakeType: "Hydraulic Disc",
      weight: "11.5 kg",
      suspension: "Front (100mm) Air Fork",
    },
    badge: null,
    shortDescription: "Lightweight carbon hardtail for XC racing with 1x11 Shimano Deore and dropper post.",
  },
  {
    id: "mtb-010",
    name: "K2 29T Full Suspension Pro",
    category: "mountain",
    price: 44999,
    mrp: 52999,
    image: "https://images.unsplash.com/photo-1482029255085-35a4a48b7084?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '29"',
      frameType: "Alloy 6061 Hydroformed",
      gearCount: "1x12 Speed",
      brakeType: "Hydraulic Disc (4-piston)",
      weight: "13.5 kg",
      suspension: "Full (Front 140mm + Rear 130mm)",
    },
    badge: "Top Pick",
    shortDescription: "Flagship full-suspension 29er with 1x12 Shimano SLX and top-tier components.",
  },

  // ─────────────────────────────────────────────
  // CITY / COMMUTER (10) — urban/comfort, ₹5,000–₹18,000
  // ─────────────────────────────────────────────
  {
    id: "city-001",
    name: "Classic 26T Roadster",
    category: "city",
    price: 5499,
    mrp: 6999,
    image: "https://images.unsplash.com/photo-1475666675596-cca2035b3d79?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '26"',
      frameType: "Steel",
      gearCount: "Single Speed",
      brakeType: "Rod Brake",
      weight: "18 kg",
    },
    badge: "Value Pick",
    shortDescription: "Traditional Indian roadster with double-bar frame, carrier rack, and dynamo light.",
    warranty: {
      frame: "3 years",
      parts: "1 year",
      coverage: ["Manufacturing defects", "Frame cracks under normal use", "Welding defects"],
      exclusions: ["Normal wear and tear", "Rust from improper storage", "Modifications"],
      freeServices: ["First tune-up (within 30 days)", "Brake adjustment (first 6 months)", "Carrier rack tightening (first 3 months)"]
    },
    accessories: ["acc-basket-001", "acc-lock-002", "acc-bell-001", "acc-lights-001", "acc-kickstand-001"]
  },
  {
    id: "city-002",
    name: "Breeze 26T Ladies",
    category: "city",
    price: 5999,
    mrp: 7499,
    image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '26"',
      frameType: "Steel (Step-Through)",
      gearCount: "Single Speed",
      brakeType: "Caliper",
      weight: "16 kg",
    },
    badge: "Bestseller",
    shortDescription: "Step-through ladies cycle with basket, dress guard, and comfortable spring saddle.",
    warranty: {
      frame: "3 years",
      parts: "1 year",
      coverage: ["Manufacturing defects", "Frame cracks under normal use", "Welding defects"],
      exclusions: ["Normal wear and tear", "Rust from improper storage", "Modifications"],
      freeServices: ["First tune-up (within 30 days)", "Brake adjustment (first 6 months)", "Dress guard alignment (first 3 months)"]
    },
    accessories: ["acc-basket-001", "acc-lock-002", "acc-bell-001", "acc-lights-001", "acc-saddle-001"]
  },
  {
    id: "city-003",
    name: "Metro 700C City Hybrid",
    category: "city",
    price: 8499,
    mrp: 10999,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: "700C",
      frameType: "Steel",
      gearCount: "7 Speed",
      brakeType: "V-Brake",
      weight: "14 kg",
    },
    badge: null,
    shortDescription: "Urban hybrid with 700C wheels, 7-speed Shimano, and upright riding position.",
  },
  {
    id: "city-004",
    name: "Glide 26T Comfort",
    category: "city",
    price: 7299,
    mrp: 9499,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '26"',
      frameType: "Steel",
      gearCount: "Single Speed",
      brakeType: "V-Brake",
      weight: "15 kg",
    },
    badge: null,
    shortDescription: "Cushioned saddle, front suspension, and wide tyres for a smooth city ride.",
  },
  {
    id: "city-005",
    name: "Urban 700C Commuter",
    category: "city",
    price: 9999,
    mrp: 12999,
    image: "https://images.unsplash.com/photo-1501147830916-ce44a6359892?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: "700C",
      frameType: "Alloy",
      gearCount: "7 Speed",
      brakeType: "Disc (Front) + V-Brake",
      weight: "12.5 kg",
    },
    badge: "New Arrival",
    shortDescription: "Lightweight alloy commuter with fenders, carrier, and integrated LED light.",
  },
  {
    id: "city-006",
    name: "Cruise 26T Retro",
    category: "city",
    price: 8999,
    mrp: 11499,
    image: "https://images.unsplash.com/photo-1623018035782-b269248df916?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '26"',
      frameType: "Steel (Retro Curve)",
      gearCount: "Single Speed",
      brakeType: "Coaster + Front Caliper",
      weight: "15 kg",
    },
    badge: null,
    shortDescription: "Vintage-styled beach cruiser with wide whitewall tyres and leather grips.",
  },
  {
    id: "city-007",
    name: "Swift 700C Flat Bar Road",
    category: "city",
    price: 11999,
    mrp: 14999,
    image: "https://images.unsplash.com/photo-1529422643029-d4585747aaf2?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: "700C",
      frameType: "Alloy",
      gearCount: "14 Speed",
      brakeType: "Dual Disc",
      weight: "12 kg",
    },
    badge: "Top Pick",
    shortDescription: "Fast flat-bar road bike with 14-speed gearing and dual disc brakes for city speed.",
  },
  {
    id: "city-008",
    name: "Fold-X 20T Folding Bike",
    category: "city",
    price: 12999,
    mrp: 15999,
    image: "https://images.unsplash.com/photo-1538991383142-36c4edeaffde?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: '20"',
      frameType: "Alloy (Folding)",
      gearCount: "7 Speed",
      brakeType: "V-Brake",
      weight: "12 kg",
    },
    badge: "New Arrival",
    shortDescription: "Compact folding bicycle for metro commuters \u2014 folds in 15 seconds, fits under your desk.",
  },
  {
    id: "city-009",
    name: "Zen 700C Touring",
    category: "city",
    price: 14999,
    mrp: 17999,
    image: "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: "700C",
      frameType: "Chromoly Steel",
      gearCount: "21 Speed",
      brakeType: "Dual Disc",
      weight: "13.5 kg",
    },
    badge: null,
    shortDescription: "Long-distance touring cycle with chromoly frame, pannier mounts, and triple chainring.",
  },
  {
    id: "city-010",
    name: "Aero 700C Premium Hybrid",
    category: "city",
    price: 17499,
    mrp: 20999,
    image: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=400&h=300&fit=crop&q=80",
    specs: {
      wheelSize: "700C",
      frameType: "Alloy 6061",
      gearCount: "21 Speed",
      brakeType: "Hydraulic Disc",
      weight: "11.5 kg",
    },
    badge: "Top Pick",
    shortDescription: "Premium hybrid with hydraulic brakes, internal cable routing, and Shimano Tourney TX.",
  },

  // ─────────────────────────────────────────────
  // EMOTORAD ELECTRIC BIKES (13) — ₹19,999–₹56,999
  // ─────────────────────────────────────────────
  {
    id: "emotorad-001",
    name: "EMotorad Dope",
    category: "electric",
    subCategory: "emotorad",
    price: 20499,
    mrp: 29999,
    image: "https://cdn.bikedekho.com/processedimages/emotorad/dope/source/dope6924372432777.jpg",
    specs: {
      wheelSize: '20"',
      frameType: "Kid-sized Frame",
      gearCount: "Single Speed",
      brakeType: "Disc (Auto Cut-off)",
      weight: "15 kg",
      motor: "250W Hub Motor",
      battery: "5.2 Ah",
      range: "22 km",
      topSpeed: "17 km/hr",
      ageRange: "8–12 years",
    },
    badge: "Value Pick",
    shortDescription: "India's first 20T kids e-cycle with safe 17 km/h speed limit, 3 PAS levels, and 80mm suspension.",
    warranty: {
      frame: "5 years",
      parts: "1 year",
      battery: "2 years",
      motor: "1 year",
      coverage: ["Manufacturing defects", "Frame cracks under normal use", "Battery capacity degradation beyond 20%", "Motor malfunction"],
      exclusions: ["Normal wear and tear", "Water damage", "Overcharging or improper charging", "Modifications"],
      freeServices: ["First 3 services (within 1 year)", "Battery health check (every 6 months for 2 years)", "Motor inspection (first year)"]
    },
    accessories: ["acc-helmet-001", "acc-lock-001", "acc-lights-001"]
  },
  {
    id: "emotorad-002",
    name: "EMotorad X1",
    category: "electric",
    subCategory: "emotorad",
    price: 25499,
    mrp: 39999,
    image: "https://cdn.bikedekho.com/processedimages/emotorad/emotorad-x1/source/emotorad-x1695f4dbbba3eb.jpg",
    specs: {
      wheelSize: '27.5"',
      frameType: "High Tensile Steel",
      gearCount: "Single Speed",
      brakeType: "Disc (Auto Cut-off)",
      weight: "20 kg",
      motor: "250W BLDC Rear Hub Motor",
      battery: "7.65 Ah",
      range: "35 km",
      topSpeed: "25 km/hr",
    },
    badge: "Value Pick",
    shortDescription: "Affordable mountain e-cycle with high-tensile steel frame, 27.5\" tires, and 35 km PAS range.",
    sizeGuide: {
      hasGuide: true,
      sizes: [
        { size: "M", frame: '17"', riderHeight: '5\'3" - 5\'9"', inseam: '28" - 31"' },
        { size: "L", frame: '19"', riderHeight: '5\'8" - 6\'2"', inseam: '30" - 34"' }
      ],
      fitTips: [
        "Stand over frame with 1-2 inches clearance",
        "Consider additional weight of motor and battery",
        "Mountain geometry for upright comfortable riding"
      ]
    },
    warranty: {
      frame: "5 years",
      parts: "1 year",
      battery: "2 years",
      motor: "1 year",
      coverage: ["Manufacturing defects", "Frame cracks under normal use", "Battery capacity degradation beyond 20%", "Motor malfunction"],
      exclusions: ["Normal wear and tear", "Water damage", "Overcharging or improper charging", "Modifications"],
      freeServices: ["First 3 services (within 1 year)", "Battery health check (every 6 months for 2 years)", "Motor inspection (first year)"]
    },
    accessories: ["acc-helmet-001", "acc-lock-001", "acc-lights-001", "acc-phone-mount-001", "acc-mudguards-001"]
  },
  {
    id: "emotorad-003",
    name: "EMotorad X2",
    category: "electric",
    subCategory: "emotorad",
    price: 28499,
    mrp: 44999,
    image: "https://cdn.bikedekho.com/processedimages/emotorad/x2/source/x2695f4e43b3b0d.jpg",
    specs: {
      wheelSize: '27.5"',
      frameType: "Step-Through Frame",
      gearCount: "Single Speed",
      brakeType: "Mechanical Disc (Auto Cut-off)",
      weight: "20 kg",
      motor: "250W BLDC Rear Hub Motor",
      battery: "7.65 Ah",
      range: "35 km (PAS)",
      topSpeed: "25 km/hr",
    },
    badge: null,
    shortDescription: "Unisex step-through e-cycle with splashproof P9 LCD display, 5 PAS levels, and removable battery.",
    sizeGuide: {
      hasGuide: true,
      sizes: [
        { size: "M", frame: '17"', riderHeight: '5\'3" - 5\'9"', inseam: '28" - 31"' },
        { size: "L", frame: '19"', riderHeight: '5\'8" - 6\'2"', inseam: '30" - 34"' }
      ],
      fitTips: [
        "Stand over frame with 1-2 inches clearance",
        "Consider additional weight of motor and battery",
        "Mountain geometry for upright comfortable riding"
      ]
    },
    warranty: {
      frame: "5 years",
      parts: "1 year",
      battery: "2 years",
      motor: "1 year",
      coverage: ["Manufacturing defects", "Frame cracks under normal use", "Battery capacity degradation beyond 20%", "Motor malfunction"],
      exclusions: ["Normal wear and tear", "Water damage", "Overcharging or improper charging", "Modifications"],
      freeServices: ["First 3 services (within 1 year)", "Battery health check (every 6 months for 2 years)", "Motor inspection (first year)"]
    },
    accessories: ["acc-helmet-001", "acc-lock-001", "acc-lights-001", "acc-phone-mount-001", "acc-mudguards-001"]
  },
  {
    id: "emotorad-004",
    name: "EMotorad X3",
    category: "electric",
    subCategory: "emotorad",
    price: 32999,
    mrp: 49999,
    image: "https://cdn.bikedekho.com/processedimages/emotorad/x3/source/x3695f4f6ff37b5.jpg",
    specs: {
      wheelSize: '700C',
      frameType: "High Tensile Steel",
      gearCount: "Single Speed",
      brakeType: "Disc (Auto Cut-off)",
      weight: "19 kg",
      motor: "250W BLDC Hub Motor",
      battery: "7.0 Ah",
      range: "40 km (PAS)",
      topSpeed: "25 km/hr",
    },
    badge: null,
    shortDescription: "Sleek city e-cycle with integrated battery, colour display, and 40 km range.",
    sizeGuide: {
      hasGuide: true,
      sizes: [
        { size: "M", frame: '18"', riderHeight: '5\'4" - 5\'10"', inseam: '28" - 32"' },
        { size: "L", frame: '20"', riderHeight: '5\'9" - 6\'2"', inseam: '31" - 34"' }
      ],
      fitTips: [
        "Stand over frame with 1-2 inches clearance",
        "Integrated battery keeps centre of gravity low",
        "Hybrid geometry for versatile road and trail riding"
      ]
    },
    warranty: {
      frame: "5 years",
      parts: "1 year",
      battery: "2 years",
      motor: "1 year",
      coverage: ["Manufacturing defects", "Frame cracks under normal use", "Battery capacity degradation beyond 20%", "Motor malfunction"],
      exclusions: ["Normal wear and tear", "Water damage", "Overcharging or improper charging", "Modifications"],
      freeServices: ["First 3 services (within 1 year)", "Battery health check (every 6 months for 2 years)", "Motor inspection (first year)"]
    },
    accessories: ["acc-helmet-001", "acc-lock-001", "acc-lights-001", "acc-phone-mount-001"]
  },
  {
    id: "emotorad-005",
    name: "EMotorad Legend O7",
    category: "electric",
    subCategory: "emotorad",
    price: 29999,
    mrp: 44999,
    image: "https://cdn.bikedekho.com/processedimages/emotorad/legend-07/source/legend-07695f4980f39ad.jpg",
    specs: {
      wheelSize: '27.5"',
      frameType: "High Tensile Steel",
      gearCount: "Single Speed",
      brakeType: "Disc (Auto Cut-off)",
      weight: "20 kg",
      motor: "250W BLDC Hub Motor",
      battery: "36V 7.65Ah Li-ion (0.28 kWh)",
      range: "35 km",
    },
    badge: null,
    shortDescription: "City commuter e-cycle with removable battery, 5 PAS levels, 120 kg load capacity, and ergonomic design.",
    sizeGuide: {
      hasGuide: true,
      sizes: [
        { size: "M", frame: '17"', riderHeight: '5\'3" - 5\'9"', inseam: '28" - 31"' },
        { size: "L", frame: '19"', riderHeight: '5\'8" - 6\'2"', inseam: '30" - 34"' }
      ],
      fitTips: [
        "Stand over frame with 1-2 inches clearance",
        "City geometry for comfortable upright riding",
        "Consider adding a rear rack for daily commuting"
      ]
    },
    warranty: {
      frame: "5 years",
      parts: "1 year",
      battery: "2 years",
      motor: "1 year",
      coverage: ["Manufacturing defects", "Frame cracks under normal use", "Battery capacity degradation beyond 20%", "Motor malfunction"],
      exclusions: ["Normal wear and tear", "Water damage", "Overcharging or improper charging", "Modifications"],
      freeServices: ["First 3 services (within 1 year)", "Battery health check (every 6 months for 2 years)", "Motor inspection (first year)"]
    },
    accessories: ["acc-helmet-001", "acc-lock-001", "acc-lights-001", "acc-phone-mount-001", "acc-pannier-001"]
  },
  {
    id: "emotorad-006",
    name: "EMotorad ST-X",
    category: "electric",
    subCategory: "emotorad",
    price: 29999,
    mrp: 44999,
    image: "https://cdn.bikedekho.com/processedimages/emotorad/st-x/source/st-x695f4b31e409d.jpg",
    specs: {
      wheelSize: '28"',
      frameType: "High Tensile Steel (Step-Through)",
      gearCount: "Single Speed",
      brakeType: "Disc (Auto Cut-off)",
      weight: "20 kg",
      motor: "250W Rear Hub Motor",
      battery: "36V 7.65Ah Li-ion",
      range: "30–35 km",
    },
    badge: null,
    shortDescription: "Step-through unisex city e-cycle with Cluster C2 display, 5 PAS levels, and removable battery.",
    sizeGuide: {
      hasGuide: true,
      sizes: [
        { size: "M", frame: '16"', riderHeight: '5\'0" - 5\'7"', inseam: '26" - 30"' },
        { size: "L", frame: '18"', riderHeight: '5\'6" - 6\'0"', inseam: '29" - 33"' }
      ],
      fitTips: [
        "Step-through frame allows easy mounting and dismounting",
        "Low centre of gravity for stable city riding",
        "Upright position for comfortable commuting"
      ]
    },
    warranty: {
      frame: "5 years",
      parts: "1 year",
      battery: "2 years",
      motor: "1 year",
      coverage: ["Manufacturing defects", "Frame cracks under normal use", "Battery capacity degradation beyond 20%", "Motor malfunction"],
      exclusions: ["Normal wear and tear", "Water damage", "Overcharging or improper charging", "Modifications"],
      freeServices: ["First 3 services (within 1 year)", "Battery health check (every 6 months for 2 years)", "Motor inspection (first year)"]
    },
    accessories: ["acc-helmet-001", "acc-lock-001", "acc-lights-001", "acc-phone-mount-001", "acc-pannier-001", "acc-mudguards-001"]
  },
  {
    id: "emotorad-007",
    name: "EMotorad T-Rex Air",
    category: "electric",
    subCategory: "emotorad",
    price: 34999,
    mrp: 54999,
    image: "https://cdn.bikedekho.com/processedimages/emotorad/t-rex/source/t-rex695f4bde1bd15.jpg",
    specs: {
      wheelSize: '27.5" / 29"',
      frameType: "Aluminium Alloy 6061",
      gearCount: "7 Speed Shimano Tourney",
      brakeType: "Mechanical Disc (Auto Cut-off)",
      weight: "22.38 kg",
      motor: "250W BLDC Hub Motor",
      battery: "36V 10.2Ah Li-ion (0.37 kWh)",
      range: "50 km",
    },
    badge: null,
    shortDescription: "Adventure-ready mountain e-cycle in 27.5\" and 29\" with 50 km range, Shimano Tourney gears, and front suspension.",
    sizeGuide: {
      hasGuide: true,
      sizes: [
        { size: "M (27.5\")", frame: '17"', riderHeight: '5\'3" - 5\'9"', inseam: '28" - 31"' },
        { size: "L (29\")", frame: '19"', riderHeight: '5\'8" - 6\'2"', inseam: '30" - 34"' }
      ],
      fitTips: [
        "27.5\" variant for nimble handling on trails",
        "29\" variant for better rollover on rough terrain",
        "Consider your primary riding terrain when choosing wheel size"
      ]
    },
    warranty: {
      frame: "5 years",
      parts: "1 year",
      battery: "2 years",
      motor: "1 year",
      coverage: ["Manufacturing defects", "Frame cracks under normal use", "Battery capacity degradation beyond 20%", "Motor malfunction"],
      exclusions: ["Normal wear and tear", "Water damage", "Overcharging or improper charging", "Modifications"],
      freeServices: ["First 3 services (within 1 year)", "Battery health check (every 6 months for 2 years)", "Motor inspection (first year)"]
    },
    accessories: ["acc-helmet-001", "acc-lock-001", "acc-lights-001", "acc-phone-mount-001", "acc-mudguards-001"]
  },
  {
    id: "emotorad-008",
    name: "EMotorad Neo",
    category: "electric",
    subCategory: "emotorad",
    price: 25999,
    mrp: 39999,
    image: "https://cdn.bikedekho.com/processedimages/emotorad/neo/source/neo695f4a15a98bb.jpg",
    specs: {
      wheelSize: '27.5"',
      frameType: "High Tensile Steel",
      gearCount: "Single Speed",
      brakeType: "Dual Disc (Auto Cut-off)",
      weight: "20 kg",
      motor: "250W BLDC Hub Motor",
      battery: "36V 7.65Ah Li-ion",
      range: "30–35 km",
    },
    badge: "Value Pick",
    shortDescription: "Best electric cycle under ₹26K for daily commute with removable battery, dual disc brakes, and 5 PAS levels.",
    sizeGuide: {
      hasGuide: true,
      sizes: [
        { size: "M", frame: '17"', riderHeight: '5\'3" - 5\'9"', inseam: '28" - 31"' },
        { size: "L", frame: '19"', riderHeight: '5\'8" - 6\'2"', inseam: '30" - 34"' }
      ],
      fitTips: [
        "Stand over frame with 1-2 inches clearance",
        "Comfortable commuter geometry for daily use",
        "Removable battery for easy indoor charging"
      ]
    },
    warranty: {
      frame: "5 years",
      parts: "1 year",
      battery: "2 years",
      motor: "1 year",
      coverage: ["Manufacturing defects", "Frame cracks under normal use", "Battery capacity degradation beyond 20%", "Motor malfunction"],
      exclusions: ["Normal wear and tear", "Water damage", "Overcharging or improper charging", "Modifications"],
      freeServices: ["First 3 services (within 1 year)", "Battery health check (every 6 months for 2 years)", "Motor inspection (first year)"]
    },
    accessories: ["acc-helmet-001", "acc-lock-001", "acc-lights-001", "acc-phone-mount-001", "acc-pannier-001"]
  },
  {
    id: "emotorad-009",
    name: "EMotorad T-Rex+ V3",
    category: "electric",
    subCategory: "emotorad",
    price: 42999,
    mrp: 69999,
    image: "https://cdn.bikedekho.com/processedimages/emotorad/t-rex-plus-v3/source/t-rex-plus-v3695f4ce382baa.jpg",
    specs: {
      wheelSize: '26" / 27.5" / 29"',
      frameType: "Aluminium Alloy 6061",
      gearCount: "7 Speed",
      brakeType: "Disc (Auto Cut-off)",
      weight: "20 kg",
      motor: "250W BLDC Hub Motor",
      battery: "36V 12.75Ah Li-ion (0.47 kWh)",
      range: "30–35 km",
    },
    badge: null,
    shortDescription: "Versatile mountain e-cycle with 3 wheel size options, large 12.75Ah battery, and tubeless tyres.",
    sizeGuide: {
      hasGuide: true,
      sizes: [
        { size: "S (26\")", frame: '16"', riderHeight: '5\'0" - 5\'6"', inseam: '26" - 29"' },
        { size: "M (27.5\")", frame: '17"', riderHeight: '5\'5" - 5\'10"', inseam: '28" - 32"' },
        { size: "L (29\")", frame: '19"', riderHeight: '5\'9" - 6\'2"', inseam: '31" - 34"' }
      ],
      fitTips: [
        "26\" for shorter riders or nimble handling",
        "27.5\" is the most versatile all-rounder",
        "29\" for taller riders or better rollover on rough terrain"
      ]
    },
    warranty: {
      frame: "5 years",
      parts: "1 year",
      battery: "2 years",
      motor: "1 year",
      coverage: ["Manufacturing defects", "Frame cracks under normal use", "Battery capacity degradation beyond 20%", "Motor malfunction"],
      exclusions: ["Normal wear and tear", "Water damage", "Overcharging or improper charging", "Modifications"],
      freeServices: ["First 3 services (within 1 year)", "Battery health check (every 6 months for 2 years)", "Motor inspection (first year)"]
    },
    accessories: ["acc-helmet-001", "acc-lock-001", "acc-lights-001", "acc-phone-mount-001", "acc-mudguards-001"]
  },
  {
    id: "emotorad-010",
    name: "EMotorad Doodle V3",
    category: "electric",
    subCategory: "emotorad",
    price: 52999,
    mrp: 79999,
    image: "https://cdn.bikedekho.com/processedimages/emotorad/doodle/source/doodle695f481ab1d07.jpg",
    specs: {
      wheelSize: '20" x 4.0" Fat',
      frameType: "Aluminium 6061 (Foldable)",
      gearCount: "7 Speed Shimano",
      brakeType: "Dual Disc (Auto Cut-off)",
      weight: "22 kg",
      motor: "250W BLDC Hub Motor",
      battery: "36V 12.75Ah Li-ion",
      range: "45–60 km",
    },
    badge: "Bestseller",
    shortDescription: "Foldable fat-tyre e-cycle with 60 km range, Cluster C6 display, and compact storage design.",
    sizeGuide: {
      hasGuide: true,
      sizes: [
        { size: "One Size", frame: '17"', riderHeight: '5\'2" - 6\'0"', inseam: '27" - 33"' }
      ],
      fitTips: [
        "Adjustable seat post accommodates a wide range of heights",
        "Foldable frame for easy storage in car boot or under desk",
        "Fat tyres provide stability on all surfaces"
      ]
    },
    warranty: {
      frame: "5 years",
      parts: "1 year",
      battery: "2 years",
      motor: "1 year",
      coverage: ["Manufacturing defects", "Frame cracks under normal use", "Battery capacity degradation beyond 20%", "Motor malfunction", "Folding mechanism defects"],
      exclusions: ["Normal wear and tear", "Water damage", "Overcharging or improper charging", "Modifications"],
      freeServices: ["First 3 services (within 1 year)", "Battery health check (every 6 months for 2 years)", "Motor inspection (first year)", "Folding mechanism check"]
    },
    accessories: ["acc-helmet-001", "acc-lock-001", "acc-lights-001", "acc-phone-mount-001", "acc-pannier-001"]
  },
  {
    id: "emotorad-011",
    name: "EMotorad T-Rex Pro",
    category: "electric",
    subCategory: "emotorad",
    price: 48499,
    mrp: 79999,
    image: "https://cdn.bikedekho.com/processedimages/elecson/t-rex-pro/source/t-rex-pro695f4c5bada43.jpg",
    specs: {
      wheelSize: '27.5" / 29"',
      frameType: "Aluminium Alloy 6061",
      gearCount: "7 Speed Shimano Altus",
      brakeType: "Disc (Auto Cut-off)",
      weight: "20 kg",
      motor: "250W BLDC Hub Motor",
      battery: "36V 13Ah Li-ion (0.47 kWh)",
      range: "30–35 km",
    },
    badge: "New Arrival",
    shortDescription: "India's first e-cycle with integrated indicators, headlights, colour LCD display, and 7 Shimano Altus gears.",
    sizeGuide: {
      hasGuide: true,
      sizes: [
        { size: "M (27.5\")", frame: '17"', riderHeight: '5\'3" - 5\'9"', inseam: '28" - 31"' },
        { size: "L (29\")", frame: '19"', riderHeight: '5\'8" - 6\'2"', inseam: '30" - 34"' }
      ],
      fitTips: [
        "27.5\" for agile urban and trail riding",
        "29\" for taller riders and better off-road rollover",
        "Pro-level features suit experienced and tech-savvy riders"
      ]
    },
    warranty: {
      frame: "5 years",
      parts: "1 year",
      battery: "2 years",
      motor: "1 year",
      coverage: ["Manufacturing defects", "Frame cracks under normal use", "Battery capacity degradation beyond 20%", "Motor malfunction", "Electronic control unit defects"],
      exclusions: ["Normal wear and tear", "Water damage", "Overcharging or improper charging", "Modifications"],
      freeServices: ["First 3 services (within 1 year)", "Battery health check (every 6 months for 2 years)", "Motor inspection (first year)", "Firmware updates"]
    },
    accessories: ["acc-helmet-001", "acc-lock-001", "acc-lights-001", "acc-phone-mount-001", "acc-mudguards-001"]
  },
  {
    id: "emotorad-012",
    name: "EMotorad Ranger",
    category: "electric",
    subCategory: "emotorad",
    price: 56999,
    mrp: 89999,
    image: "https://cdn.bikedekho.com/processedimages/emotorad/ranger-e-cycle/source/ranger-e-cycle695f4ab9056cd.jpg",
    specs: {
      wheelSize: '20" x 4.0" Fat',
      frameType: "High Tensile Steel",
      gearCount: "7 Speed Shimano",
      brakeType: "Disc (Auto Cut-off)",
      weight: "35 kg",
      motor: "250W BLDC Hub Motor",
      battery: "48V 12.75Ah Li-ion",
      range: "60–75 km",
      suspension: "Double Crown (120mm travel)",
    },
    badge: "Bestseller",
    shortDescription: "Moto-style fat-tyre e-cycle with double crown suspension, front & rear indicators, Cluster C6+ display, and 75 km range.",
    sizeGuide: {
      hasGuide: true,
      sizes: [
        { size: "One Size", frame: '17"', riderHeight: '5\'4" - 6\'0"', inseam: '28" - 33"' }
      ],
      fitTips: [
        "Moto-style seating position for comfortable long rides",
        "Double-crown suspension absorbs rough terrain impact",
        "Fat tyres provide excellent grip on all surfaces"
      ]
    },
    warranty: {
      frame: "5 years",
      parts: "1 year",
      battery: "2 years",
      motor: "1 year",
      coverage: ["Manufacturing defects", "Frame cracks under normal use", "Battery capacity degradation beyond 20%", "Motor malfunction", "Suspension defects"],
      exclusions: ["Normal wear and tear", "Water damage", "Overcharging or improper charging", "Modifications"],
      freeServices: ["First 3 services (within 1 year)", "Battery health check (every 6 months for 2 years)", "Motor inspection (first year)", "Suspension service (first year)"]
    },
    accessories: ["acc-helmet-001", "acc-lock-001", "acc-lights-001", "acc-phone-mount-001"]
  },
  {
    id: "emotorad-013",
    name: "EMotorad EMX",
    category: "electric",
    subCategory: "emotorad",
    price: 54999,
    mrp: 79999,
    image: "https://cdn.bikedekho.com/processedimages/emotorad/emx/source/emx695f48e73fcf8.jpg",
    specs: {
      wheelSize: '27.5"',
      frameType: "Aluminium Alloy 6061",
      gearCount: "21 Speed Shimano Tourney",
      brakeType: "160mm Disc (Ceramic Pads)",
      weight: "21 kg",
      motor: "250W BLDC Motor",
      battery: "36V 13Ah Li-ion (0.47 kWh)",
      range: "80 km",
      suspension: "Dual (Front Fork + Rear Monoshock)",
    },
    badge: "Top Pick",
    shortDescription: "India's first dual-suspension MTB e-cycle with 80 km range, 21-speed Shimano, ceramic disc brakes, and LED console.",
    sizeGuide: {
      hasGuide: true,
      sizes: [
        { size: "M", frame: '17"', riderHeight: '5\'4" - 5\'10"', inseam: '28" - 32"' },
        { size: "L", frame: '19"', riderHeight: '5\'9" - 6\'2"', inseam: '31" - 34"' }
      ],
      fitTips: [
        "Dual suspension provides maximum trail comfort",
        "Lockout function for efficient pedalling on roads",
        "Premium MTB for serious off-road and trail riding"
      ]
    },
    warranty: {
      frame: "5 years",
      parts: "1 year",
      battery: "2 years",
      motor: "1 year",
      coverage: ["Manufacturing defects", "Frame cracks under normal use", "Battery capacity degradation beyond 20%", "Motor malfunction", "Suspension defects"],
      exclusions: ["Normal wear and tear", "Water damage", "Overcharging or improper charging", "Modifications"],
      freeServices: ["First 3 services (within 1 year)", "Battery health check (every 6 months for 2 years)", "Motor inspection (first year)", "Suspension service (first year)"]
    },
    accessories: ["acc-helmet-001", "acc-lock-001", "acc-lights-001", "acc-phone-mount-001", "acc-mudguards-001"]
  },
];
