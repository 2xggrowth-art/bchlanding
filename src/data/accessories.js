// Accessories catalog for BCH Store
// Compatible accessories for bicycles across all categories

export const accessories = [
  // === SAFETY ACCESSORIES ===
  {
    id: "acc-helmet-001",
    name: "ISI Certified Safety Helmet - Adult",
    category: "safety",
    price: 799,
    mrp: 1299,
    image: "https://images.unsplash.com/photo-1557844352-761f2565b576?w=400&h=400&fit=crop",
    compatibleWith: ["all"],
    badge: "Safety Essential",
    shortDescription: "ISI certified protective helmet with adjustable straps and ventilation"
  },
  {
    id: "acc-helmet-002",
    name: "Kids Safety Helmet with Graphics",
    category: "safety",
    price: 599,
    mrp: 999,
    image: "https://images.unsplash.com/photo-1565616420516-4f28f358aa5f?w=400&h=400&fit=crop",
    compatibleWith: ["kids"],
    badge: "Bestseller",
    shortDescription: "Colorful ISI certified helmet with fun graphics for kids aged 3-12"
  },
  {
    id: "acc-lights-001",
    name: "LED Front + Rear Light Combo",
    category: "safety",
    price: 449,
    mrp: 799,
    image: "https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=400&h=400&fit=crop",
    compatibleWith: ["all"],
    badge: null,
    shortDescription: "USB rechargeable LED lights with 5 modes for enhanced visibility"
  },
  {
    id: "acc-bell-001",
    name: "Classic Bike Bell - Loud Ring",
    category: "safety",
    price: 149,
    mrp: 249,
    image: "https://images.unsplash.com/photo-1591258739299-5b65d5cbb235?w=400&h=400&fit=crop",
    compatibleWith: ["all"],
    badge: null,
    shortDescription: "Durable metal bell with clear, loud ring for safe riding"
  },
  {
    id: "acc-reflectors-001",
    name: "Reflective Spoke Clips (Set of 12)",
    category: "safety",
    price: 199,
    mrp: 349,
    image: "https://images.unsplash.com/photo-1565525715600-8591115a2daa?w=400&h=400&fit=crop",
    compatibleWith: ["all"],
    badge: null,
    shortDescription: "High-visibility reflective clips for enhanced night safety"
  },

  // === SECURITY ACCESSORIES ===
  {
    id: "acc-lock-001",
    name: "Heavy Duty U-Lock with Cable",
    category: "security",
    price: 899,
    mrp: 1499,
    image: "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?w=400&h=400&fit=crop",
    compatibleWith: ["all"],
    badge: "Top Pick",
    shortDescription: "Hardened steel U-lock with 4-foot flex cable for maximum security"
  },
  {
    id: "acc-lock-002",
    name: "Chain Lock with 5-Digit Code",
    category: "security",
    price: 599,
    mrp: 899,
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop",
    compatibleWith: ["all"],
    badge: null,
    shortDescription: "5mm hardened steel chain lock with resettable combination"
  },
  {
    id: "acc-lock-003",
    name: "Compact Cable Lock - Kids",
    category: "security",
    price: 299,
    mrp: 499,
    image: "https://images.unsplash.com/photo-1565616429906-7e67e37f0bf5?w=400&h=400&fit=crop",
    compatibleWith: ["kids"],
    badge: null,
    shortDescription: "Lightweight cable lock perfect for kids bikes and low-risk areas"
  },

  // === STORAGE & CARRIERS ===
  {
    id: "acc-bottle-holder-001",
    name: "Aluminum Water Bottle Cage",
    category: "storage",
    price: 249,
    mrp: 399,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop",
    compatibleWith: ["geared", "mountain", "city", "electric"],
    badge: null,
    shortDescription: "Lightweight aluminum cage holds bottles securely on rough terrain"
  },
  {
    id: "acc-basket-001",
    name: "Front Wire Basket with Mount",
    category: "storage",
    price: 599,
    mrp: 999,
    image: "https://images.unsplash.com/photo-1520967748131-a7e5c9e7d2f8?w=400&h=400&fit=crop",
    compatibleWith: ["city", "kids"],
    badge: null,
    shortDescription: "Rust-proof wire basket for groceries and bags, easy installation"
  },
  {
    id: "acc-pannier-001",
    name: "Waterproof Rear Pannier Bag (25L)",
    category: "storage",
    price: 1299,
    mrp: 1999,
    image: "https://images.unsplash.com/photo-1586016212711-29d2044d0b7c?w=400&h=400&fit=crop",
    compatibleWith: ["geared", "mountain", "city", "electric"],
    badge: "Premium",
    shortDescription: "25L waterproof pannier with reflective strips and laptop compartment"
  },
  {
    id: "acc-phone-mount-001",
    name: "360° Phone Mount with Charging",
    category: "storage",
    price: 699,
    mrp: 1199,
    image: "https://images.unsplash.com/photo-1556655678-8b4b6da3c4c7?w=400&h=400&fit=crop",
    compatibleWith: ["all"],
    badge: "New Arrival",
    shortDescription: "Universal phone mount with 360° rotation and USB charging port"
  },

  // === MAINTENANCE & REPAIR ===
  {
    id: "acc-repair-kit-001",
    name: "Complete Repair Tool Kit (16-in-1)",
    category: "maintenance",
    price: 799,
    mrp: 1299,
    image: "https://images.unsplash.com/photo-1603893584880-60009cd2dbf6?w=400&h=400&fit=crop",
    compatibleWith: ["all"],
    badge: "Essential",
    shortDescription: "Compact multi-tool with hex keys, screwdrivers, tire levers, and chain tool"
  },
  {
    id: "acc-pump-001",
    name: "Portable Mini Floor Pump with Gauge",
    category: "maintenance",
    price: 499,
    mrp: 799,
    image: "https://images.unsplash.com/photo-1576025185848-fda03a6c0e70?w=400&h=400&fit=crop",
    compatibleWith: ["all"],
    badge: null,
    shortDescription: "Compact pump with pressure gauge, Presta and Schrader valve compatible"
  },
  {
    id: "acc-tubes-001",
    name: "Inner Tube Set (Pack of 2)",
    category: "maintenance",
    price: 349,
    mrp: 599,
    image: "https://images.unsplash.com/photo-1565616429906-7e67e37f0bf5?w=400&h=400&fit=crop",
    compatibleWith: ["all"],
    badge: null,
    shortDescription: "Premium quality tubes with Presta valve, specify size at checkout"
  },
  {
    id: "acc-lube-001",
    name: "Chain Lubricant & Cleaner Combo",
    category: "maintenance",
    price: 399,
    mrp: 649,
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=400&fit=crop",
    compatibleWith: ["all"],
    badge: null,
    shortDescription: "Eco-friendly chain lube and degreaser for smooth, quiet rides"
  },

  // === COMFORT & PERFORMANCE ===
  {
    id: "acc-gloves-001",
    name: "Padded Cycling Gloves - Half Finger",
    category: "comfort",
    price: 449,
    mrp: 799,
    image: "https://images.unsplash.com/photo-1592664474725-08b6709b0aba?w=400&h=400&fit=crop",
    compatibleWith: ["geared", "mountain", "city", "electric"],
    badge: null,
    shortDescription: "Breathable padded gloves with anti-slip palm for better grip"
  },
  {
    id: "acc-saddle-001",
    name: "Gel Comfort Saddle - Universal",
    category: "comfort",
    price: 899,
    mrp: 1499,
    image: "https://images.unsplash.com/photo-1579546928686-286ea9fbf5e9?w=400&h=400&fit=crop",
    compatibleWith: ["all"],
    badge: "Comfort Plus",
    shortDescription: "Ergonomic gel-padded saddle reduces pressure for long rides"
  },
  {
    id: "acc-grips-001",
    name: "Ergonomic Handlebar Grips (Pair)",
    category: "comfort",
    price: 349,
    mrp: 599,
    image: "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=400&h=400&fit=crop",
    compatibleWith: ["all"],
    badge: null,
    shortDescription: "Soft rubber grips with anti-slip texture for better control"
  },
  {
    id: "acc-mudguards-001",
    name: "Full Coverage Mudguard Set",
    category: "comfort",
    price: 599,
    mrp: 999,
    image: "https://images.unsplash.com/photo-1541544181051-e46607bc22a4?w=400&h=400&fit=crop",
    compatibleWith: ["city", "geared", "electric"],
    badge: null,
    shortDescription: "Adjustable mudguards protect from splashes in all weather"
  },

  // === KIDS SPECIFIC ===
  {
    id: "acc-training-wheels-001",
    name: "Adjustable Training Wheels (12T-16T)",
    category: "kids",
    price: 499,
    mrp: 799,
    image: "https://images.unsplash.com/photo-1565616429906-7e67e37f0bf5?w=400&h=400&fit=crop",
    compatibleWith: ["kids"],
    badge: null,
    shortDescription: "Heavy-duty training wheels with height adjustment for learning"
  },
  {
    id: "acc-streamers-001",
    name: "Handlebar Streamers & Horn Combo",
    category: "kids",
    price: 249,
    mrp: 399,
    image: "https://images.unsplash.com/photo-1591285286226-44648de3754e?w=400&h=400&fit=crop",
    compatibleWith: ["kids"],
    badge: null,
    shortDescription: "Colorful handlebar streamers with fun squeeze horn"
  },
  {
    id: "acc-kickstand-001",
    name: "Universal Kickstand - Adjustable",
    category: "general",
    price: 299,
    mrp: 499,
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&h=400&fit=crop",
    compatibleWith: ["all"],
    badge: null,
    shortDescription: "Durable aluminum kickstand fits 20T-28T wheels, adjustable height"
  },
  {
    id: "acc-cover-001",
    name: "Waterproof Bike Cover - Universal",
    category: "general",
    price: 599,
    mrp: 999,
    image: "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?w=400&h=400&fit=crop",
    compatibleWith: ["all"],
    badge: null,
    shortDescription: "UV-resistant waterproof cover protects from rain, dust, and sun"
  }
];

// Service centers for warranty section
export const serviceCenters = [
  {
    id: "sc-bangalore-1",
    city: "Bangalore",
    area: "HSR Layout",
    address: "Shop 42, 24th Main Road, Sector 2, HSR Layout",
    phone: "9876543210",
    timings: "10 AM - 8 PM (Mon-Sat)"
  },
  {
    id: "sc-bangalore-2",
    city: "Bangalore",
    area: "Indiranagar",
    address: "123, 100 Feet Road, Indiranagar",
    phone: "9876543211",
    timings: "9 AM - 7 PM (Mon-Sun)"
  },
  {
    id: "sc-bangalore-3",
    city: "Bangalore",
    area: "Koramangala",
    address: "456, 5th Block, Koramangala",
    phone: "9876543212",
    timings: "10 AM - 8 PM (Tue-Sun)"
  },
  {
    id: "sc-mumbai-1",
    city: "Mumbai",
    area: "Andheri West",
    address: "Plot 78, Veera Desai Road, Andheri West",
    phone: "9876543213",
    timings: "10 AM - 7 PM (Mon-Sat)"
  },
  {
    id: "sc-mumbai-2",
    city: "Mumbai",
    area: "Bandra",
    address: "12, Hill Road, Bandra West",
    phone: "9876543214",
    timings: "9:30 AM - 8 PM (Mon-Sat)"
  },
  {
    id: "sc-delhi-1",
    city: "Delhi",
    area: "Connaught Place",
    address: "Block E, Inner Circle, Connaught Place",
    phone: "9876543215",
    timings: "10 AM - 8 PM (Mon-Sat)"
  },
  {
    id: "sc-delhi-2",
    city: "Delhi",
    area: "Lajpat Nagar",
    address: "Central Market, Lajpat Nagar IV",
    phone: "9876543216",
    timings: "10 AM - 7 PM (Tue-Sun)"
  },
  {
    id: "sc-pune-1",
    city: "Pune",
    area: "Koregaon Park",
    address: "Lane 7, North Main Road, Koregaon Park",
    phone: "9876543217",
    timings: "9 AM - 7 PM (Mon-Sat)"
  },
  {
    id: "sc-chennai-1",
    city: "Chennai",
    area: "T Nagar",
    address: "89, Usman Road, T Nagar",
    phone: "9876543218",
    timings: "10 AM - 8 PM (Mon-Sat)"
  },
  {
    id: "sc-hyderabad-1",
    city: "Hyderabad",
    area: "Banjara Hills",
    address: "Road No 12, Banjara Hills",
    phone: "9876543219",
    timings: "10 AM - 7:30 PM (Mon-Sun)"
  }
];
