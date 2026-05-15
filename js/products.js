// Product Data
const products = [
  {
    id: "1",
    name: "Available for Pre-Order",
    price: 675000,
    category: ["tops"], 
    description: "A delicately hand-beaded crop top",
    details:
    `Mesh
    Cotton
    Hand Beaded Design 
    Dry Clean Only

    Processing Time
    14-20 business days for custom orders`,

    images: [
      "images/look1_top.png",
      "images/waterfall_1.jpeg",
      "images/waterfall_2.jpeg"
    ],
    sizes: ["XS", "S", "M", "L", "XL","XXL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" }
    ],
    featured: true,
    isNew: true
  },

  {
    id: "2",
    name: "Available for Pre-Order",
    price: 450000,
    category: ["skirts"], 
    description: "A voluminous skirt blending craftsmanship with graceful volume ",
    details:
    `Mesh
    Cotton
    Net
    Dry Clean Only

    Processing Time
    14-20 business days for custom orders`,

    images: [
      "images/look1_skirt.png",
      "images/waterfall_1.jpeg",
      "images/waterfall_2.jpeg"
    ],
    sizes: ["XS", "S", "M", "L", "XL","XXL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" }
    ],
    featured: true,
    isNew: true
  },

  {
    id: "3",
    name: "Available for Pre-Order",
    price: 1425000,
    category: ["dresses"], 
    description: "A layered gown adorned with hand-beaded detailing, reflecting fluid motion and refined craftsmanship.",
    details: 
    `Mesh
    Cotton
    Hand Beaded Design 
    Dry Clean Only

    Processing Time
    14-20 business days for custom orders`,
    images: [
      "images/look2_dress.png",
      "images/waterfall_3.jpeg",
      "images/waterfall_4.jpeg"
    ],
    sizes: ["XS", "S", "M", "L", "XL","XXL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" }
    ],
    featured: true,
    isNew: true
  },

  {
    id: "4",
    name: "Available for Pre-Order",
    price: 835000,
    category: ["dresses"], 
    description: "A cascading ruffle dress crafted from delicate mesh, creating a sense of sculptural movement and elegance.",
    details:
    `Mesh
    Dry Clean Only

    Processing Time
    14-20 business days for custom orders`,

    images: [
      "images/look3_dress.png",
      "images/waterfall_5.jpeg",
      "images/waterfall_6.jpeg"
    ],
    sizes: ["XS", "S", "M", "L", "XL","XXL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" }
    ],
    featured: true,
    isNew: true
  },

  {
    id: "5",
    name: "Available for Pre-Order",
    price: 375000,
    category: ["tops"], 
    description: "A cascading ruffle crop top",
    details:
    `Mesh
    Dry Clean Only

    Processing Time
    14-20 business days for custom orders`,
    images: [
      "images/look4_top.png",
      "images/waterfall_7.jpeg",
      "images/waterfall_8.jpeg"
    ],
    sizes: ["XS", "S", "M", "L", "XL","XXL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" }
    ],
    featured: true,
    isNew: true
  },

  {
    id: "6",
    name: "Available for Pre-Order",
    price: 675000,
    category: ["skirts"], 
    description: "A cascading ruffle skirt",
    details:
    `Mesh
    Dry Clean Only

    Processing Time
    14-20 business days for custom orders`,

    images: [
      "images/look4_skirt.png",
      "images/waterfall_7.jpeg",
      "images/waterfall_8.jpeg"
    ],
    sizes: ["XS", "S", "M", "L", "XL","XXL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" }
    ],
    featured: true,
    isNew: true
  },

  {
    id: "7",
    name: "Available for Pre-Order",
    price: 1250000,
    category: ["dresses"], 
    description: "A sculptural pleated dress highlighted with ruffle details and a statement one shoulder rope sleeve.",
    details:
    `Mesh
    Cotton
    Dry Clean Only

    Processing Time
    14-20 business days for custom orders`,

    images: [
      "images/look5_dress.png",
      "images/waterfall_9.jpeg",
      "images/waterfall_10.jpeg"
    ],
    sizes: ["XS", "S", "M", "L", "XL","XXL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" }
    ],
    featured: true,
    isNew: true
  },

  {
    id: "8",
    name: "Available for Pre-Order",
    price: 1850000,
    category: ["dresses"], 
    description: "A chantilly lace dress carefully adorned with hand-beaded embellishments.",
    details:
    `Chantilly Lace
      Hand Beaded Design 
      Dry Clean Only

      Processing Time
      14-20 business days for custom orders` ,

    images: [
      "images/look6_dress.png",
      "images/waterfall_11.jpeg",
      "images/waterfall_12.jpeg"
    ],
    sizes: ["XS", "S", "M", "L", "XL","XXL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" }
    ],
    featured: true,
    isNew: true
  },

  {
    id: "9",
    name: "Available for Pre-Order",
    price: 1560000,
    category: ["dresses"], 
    description: "A statement mesh dress enhanced with soft ruffles, creating a graceful balance between structure and fluidity.",
    details:
    `Mesh
    Hand Beaded Design 
    Dry Clean Only

    Processing Time
    14-20 business days for custom orders`,
    
    images: [
      "images/look7_dress.png",
      "images/waterfall_13.jpeg",
      "images/waterfall_14.jpeg"
    ],
    sizes: ["XS", "S", "M", "L", "XL","XXL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" }
    ],
    featured: true,
    isNew: true
  },

  {
    id: "10",
    name: "Available for Pre-Order",
    price: 300000,
    category: ["tops"], 
    description: "A statement crop top",
    details:
    `Mesh
    Dry Clean Only

    Processing Time
    14-20 business days for custom orders`,

    images: [
      "images/look8_top.png",
      "images/waterfall_15.jpeg",
      "images/waterfall_16.jpeg"
    ],
    sizes: ["XS", "S", "M", "L", "XL","XXL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" }
    ],
    featured: true,
    isNew: true
  },

  {
    id: "11",
    name: "Available for Pre-Order",
    price: 780000,
    category: ["skirts"], 
    description: "A statement skirt enhanced with soft ruffles",
    details:
    `Mesh
    Dry Clean Only

    Processing Time
    14-20 business days for custom orders`,
    
    images: [
      "images/look8_skirt.png",
      "images/waterfall_15.jpeg",
      "images/waterfall_16.jpeg"
    ],
    sizes: ["XS", "S", "M", "L", "XL","XXL"],
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