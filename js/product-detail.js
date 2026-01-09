// Product Detail Page JavaScript

let currentProduct = null;
let selectedSize = null;
let selectedColor = null;

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  loadProduct();
});

// Mobile Menu Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

// Load Product from URL
function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  
  if (!productId) {
    window.location.href = 'shop.html';
    return;
  }
  
  currentProduct = getProductById(productId);
  
  if (!currentProduct) {
    window.location.href = 'shop.html';
    return;
  }
  
  renderProduct();
  renderRelatedProducts();
  initAddToCart();
}

// Render Product Details
function renderProduct() {
  // Update page title
  document.title = `${currentProduct.name} | Luxury Fashion`;
  
  // Update breadcrumb
  const breadcrumb = document.getElementById('breadcrumbProduct');
  if (breadcrumb) breadcrumb.textContent = currentProduct.name;
  
  // Update main image
  const mainImage = document.getElementById('mainImage');
  if (mainImage) {
    mainImage.src = currentProduct.images[0];
    mainImage.alt = currentProduct.name;
  }
  
  // Render thumbnails
  const thumbnails = document.getElementById('thumbnails');
  if (thumbnails) {
    thumbnails.innerHTML = currentProduct.images.map((img, index) => `
      <button 
        class="aspect-square overflow-hidden border-2 ${index === 0 ? 'border-foreground' : 'border-transparent'} hover:border-foreground transition-colors"
        onclick="changeMainImage('${img}', this)"
      >
        <img src="${img}" alt="${currentProduct.name}" class="w-full h-full object-cover">
      </button>
    `).join('');
  }
  
  // Update product info
  document.getElementById('productCategory').textContent = currentProduct.category.toUpperCase();
  document.getElementById('productName').textContent = currentProduct.name;
  document.getElementById('productPrice').textContent = formatPrice(currentProduct.price);
  document.getElementById('productDescription').textContent = currentProduct.description;
  document.getElementById('productDetails').textContent = currentProduct.details;
  
  // Render sizes
  renderSizes();
  
  // Render colors
  renderColors();
}

// Change Main Image
function changeMainImage(src, btn) {
  const mainImage = document.getElementById('mainImage');
  if (mainImage) mainImage.src = src;
  
  // Update thumbnail borders
  const thumbnails = document.querySelectorAll('#thumbnails button');
  thumbnails.forEach(t => t.classList.remove('border-foreground'));
  btn.classList.add('border-foreground');
}

// Render Size Options
function renderSizes() {
  const container = document.getElementById('sizeOptions');
  if (!container) return;
  
  container.innerHTML = currentProduct.sizes.map(size => `
    <button 
      class="size-btn text-sm"
      onclick="selectSize('${size}', this)"
    >
      ${size}
    </button>
  `).join('');
  
  // Select first size by default
  const firstBtn = container.querySelector('.size-btn');
  if (firstBtn) {
    firstBtn.click();
  }
}

// Select Size
function selectSize(size, btn) {
  selectedSize = size;
  
  const buttons = document.querySelectorAll('.size-btn');
  buttons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// Render Color Options
function renderColors() {
  const container = document.getElementById('colorOptions');
  const colorName = document.getElementById('selectedColorName');
  if (!container) return;
  
  container.innerHTML = currentProduct.colors.map((color, index) => `
    <button 
      class="color-swatch ${index === 0 ? 'active' : ''}"
      style="background: ${color.hex}"
      onclick="selectColor('${color.name}', '${color.hex}', this)"
      title="${color.name}"
    ></button>
  `).join('');
  
  // Select first color by default
  selectedColor = currentProduct.colors[0].name;
  if (colorName) colorName.textContent = selectedColor;
}

// Select Color
function selectColor(name, hex, btn) {
  selectedColor = name;
  
  const colorName = document.getElementById('selectedColorName');
  if (colorName) colorName.textContent = name;
  
  const buttons = document.querySelectorAll('.color-swatch');
  buttons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// Initialize Add to Cart Button
function initAddToCart() {
  const btn = document.getElementById('addToCartBtn');
  if (!btn) return;
  
  btn.addEventListener('click', () => {
    if (!selectedSize) {
      Cart.showToast('Please select a size');
      return;
    }
    
    if (!selectedColor) {
      Cart.showToast('Please select a color');
      return;
    }
    
    Cart.addItem(currentProduct, selectedSize, selectedColor);
  });
}

// Render Related Products
function renderRelatedProducts() {
  const container = document.getElementById('relatedProducts');
  if (!container) return;
  
  // Get products from same category, excluding current product
  const related = products
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4);
  
  // If not enough, fill with other products
  if (related.length < 4) {
    const others = products
      .filter(p => p.id !== currentProduct.id && !related.includes(p))
      .slice(0, 4 - related.length);
    related.push(...others);
  }
  
  container.innerHTML = related.map(product => `
    <a href="product.html?id=${product.id}" class="product-card group">
      <div class="aspect-[3/4] overflow-hidden bg-muted mb-4">
        <img 
          src="${product.images[0]}" 
          alt="${product.name}" 
          class="product-image w-full h-full object-cover"
        >
      </div>
      <div class="space-y-1">
        ${product.isNew ? '<span class="text-xs tracking-wider text-accent uppercase">New</span>' : ''}
        <h3 class="font-medium text-sm">${product.name}</h3>
        <p class="text-sm text-muted-foreground">${formatPrice(product.price)}</p>
      </div>
    </a>
  `).join('');
}
