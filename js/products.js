// Product Data
const products = [
  {
    id: "1",
    name: "Available for Pre-Order",
    price: 100,
    category: ["skirts","tops"], 
    description: "A delicately hand-beaded top with a voluminous skirt blending craftsmanship with graceful volume.",
    images: [
      "images/waterfall_1.jpeg",
      "images/waterfall_2.jpeg"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" }
    ],
    featured: true,
    isNew: true
  },
  {
    id: "2",
    name: "Available for Pre-Order",
    price: 200,
    category: ["dresses"], 
    description: "A layered gown adorned with hand-beaded detailing, reflecting fluid motion and refined craftsmanship.",
    images: [
      "images/waterfall_3.jpeg",
      "images/waterfall_4.jpeg"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" }
    ],
    featured: true,
    isNew: true
  },
  {
    id: "3",
    name: "Available for Pre-Order",
    price: 300,
    category: ["dresses"], 
    description: "A cascading ruffle dress crafted from delicate mesh, creating a sense of sculptural movement and elegance.",
    images: [
      "images/waterfall_5.jpeg",
      "images/waterfall_6.jpeg"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" }
    ],
    featured: true,
    isNew: true
  },
  {
    id: "4",
    name: "Available for Pre-Order",
    price: 400,
    category: ["tops","skirts"], 
    description: "A cascading ruffle set crafted from delicate mesh, creating a sense of sculptural movement and elegance.",
    images: [
      "images/waterfall_7.jpeg",
      "images/waterfall_8.jpeg"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" }
    ],
    featured: true,
    isNew: true
  },
  {
    id: "5",
    name: "Available for Pre-Order",
    price: 500,
    category: ["dresses"], 
    description: "A sculptural pleated dress highlighted with ruffle details and a statement one shoulder rope sleeve.",
    images: [
      "images/waterfall_9.jpeg",
      "images/waterfall_10.jpeg"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" }
    ],
    featured: true,
    isNew: true
  },
  {
    id: "6",
    name: "Available for Pre-Order",
    price: 600,
    category: ["dresses"], 
    description: "A chantily lace dress carefully adorned with hand-beaded embellishments.",
    images: [
      "images/waterfall_11.jpeg",
      "images/waterfall_12.jpeg"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" }
    ],
    featured: true,
    isNew: true
  },
  {
    id: "7",
    name: "Available for Pre-Order",
    price: 700,
    category: ["dresses"], 
    description: "A statement mesh dress enhanced with soft ruffles, creating a graceful balance between structure and fluidity.",
    images: [
      "images/waterfall_13.jpeg",
      "images/waterfall_14.jpeg"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" }
    ],
    featured: true,
    isNew: true
  },
  {
    id: "8",
    name: "Available for Pre-Order",
    price: 800,
    category: ["tops","skirts"], 
    description: "A statement mesh combining cultural heritage with modern elegance, enhanced with soft ruffles, creating a graceful balance between structure and fluidity.",
    images: [
      "images/waterfall_15.jpeg",
      "images/waterfall_16.jpeg"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" }
    ],
    featured: true,
    isNew: true
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