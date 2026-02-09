// Product Data
const products = [
  {
    id: "1",
    name: "Silk Midi Dress",
    price: 385,
    category: "dresses",
    description: "An elegant silk midi dress with a flattering silhouette. Perfect for special occasions or elevated everyday wear.",
    details: "100% Mulberry Silk. Dry clean only. Made in Italy.",
    images: [
      "images/bemi_img (1).jpg",
      "images/bemi_img (2).jpg"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Champagne", hex: "#F5E6D3" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Burgundy", hex: "#722F37" }
    ],
    featured: true,
    isNew: true
  },
  {
    id: "2",
    name: "Cashmere Wrap Cardigan",
    price: 295,
    category: "dresses",
    description: "Luxuriously soft cashmere cardigan with an elegant wrap design. A versatile piece for layering.",
    details: "100% Cashmere. Hand wash cold. Made in Scotland.",
    images: [
      "images/bemi_img (3).jpg",
      "images/bemi_img (4).jpg"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Oatmeal", hex: "#D4C4A8" },
      { name: "Charcoal", hex: "#36454F" }
    ],
    featured: false,
    isNew: false
  },
  {
    id: "3",
    name: "Wide Leg Trousers",
    price: 225,
    category: "tops",
    description: "High-waisted wide leg trousers with a relaxed, flowing silhouette. Crafted from premium wool blend.",
    details: "70% Wool, 30% Polyester. Dry clean only. Made in Portugal.",
    images: [
      "images/bemi_img (5).jpg",
      "images/bemi_img (5).jpg"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Camel", hex: "#C19A6B" }
    ],
    featured: true,
    isNew: true
  },
  {
    id: "4",
    name: "Leather Belt",
    price: 145,
    category: "tops",
    description: "Handcrafted leather belt with gold-tone buckle. Timeless elegance for any outfit.",
    details: "100% Italian Leather. Wipe clean. Made in Italy.",
    images: [
      "images/bemi_img (7).jpg",
      "images/bemi_img (8).jpg"
    ],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Cognac", hex: "#9A463D" },
      { name: "Black", hex: "#1a1a1a" }
    ],
    featured: false,
    isNew: false
  },
  {
    id: "5",
    name: "Linen Blouse",
    price: 175,
    category: ["skirts","africanheritage"], 
    description: "Relaxed linen blouse with delicate button details. Perfect for warm days.",
    details: "100% Linen. Machine wash cold. Made in France.",
    images: [
      "images/bemi_img (9).jpg",
      "images/bemi_img (10).jpg"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Sky Blue", hex: "#87CEEB" }
    ],
    featured: true,
    isNew: true
  },
  {
    id: "6",
    name: "Satin Evening Gown",
    price: 550,
    category: "trousers",
    description: "Stunning floor-length satin gown with elegant draping. For your most special moments.",
    details: "100% Silk Satin. Dry clean only. Made in Italy.",
    images: [
      "images/bemi_img (11).jpg",
      "images/bemi_img (12).jpg"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Navy", hex: "#1B3A57" },
      { name: "Emerald", hex: "#50C878" }
    ],
    featured: true,
    isNew: true
  },
  {
    id: "7",
    name: "Silk Scarf",
    price: 125,
    category: "africanheritage",
    description: "Hand-painted silk scarf with exclusive print. Add a touch of artistry to any look.",
    details: "100% Silk. Dry clean only. Made in Italy.",
    images: [
      "images/bemi_img (13).jpg",
      "images/bemi_img (14).jpg"
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Multi", hex: "linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1)" }
    ],
    featured: true,
    isNew: true
  },
  {
    id: "8",
    name: "Tailored Blazer",
    price: 425,
    category: "africanheritage",
    description: "Impeccably tailored blazer with a modern silhouette. The cornerstone of any wardrobe.",
    details: "98% Wool, 2% Elastane. Dry clean only. Made in England.",
    images: [
      "images/bemi_img (15).jpg",
      "images/bemi_img (1).jpg"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Navy", hex: "#1B3A57" }
    ],
    featured: false,
    isNew: false
  }
];

// Bank account details
const bankAccounts = {
  domestic: {
    bankName: "First Bank",
    accountName: "Bemi Ivory Fashion",
    accountNumber: "4521-8834-2109",
    routingNumber: "021000021",
    type: "Checking Account"
  },
  international: {
    bankName: "Chase Bank NA",
    accountName: "Bemi Fashion LLC",
    iban: "US12 CHAS 0210 0002 1452 1883 4210 9",
    swift: "CHASUS33",
    address: "270 Park Avenue, New York, NY 10017, USA"
  }
};

// Helper functions
function getProductById(id) {
  return products.find(p => p.id === id);
}

function getProductsByCategory(category) {
  if (category === 'all' || !category) return products;
  if (category === 'new') return products.filter(p => p.isNew);

  return products.filter(p =>
    Array.isArray(p.category)
      ? p.category.includes(category)
      : p.category === category
  );
}

function getFeaturedProducts() {
  return products.filter(p => p.featured);
}