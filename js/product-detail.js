// Product Detail Page JavaScript

let currentProduct = null;
let selectedSize = null;
let selectedColor = null;
let selectedSizeDetails = {}; // Measurements from Size Guide

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  loadProduct();
  initSizeGuide();
});

// ---------- MOBILE MENU ----------
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

// ---------- LOAD PRODUCT ----------
function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (!productId) return window.location.href = 'shop.html';

  currentProduct = getProductById(productId);
  if (!currentProduct) return window.location.href = 'shop.html';

  renderProduct();
  renderRelatedProducts();
  initAddToCart();
}

// ---------- RENDER PRODUCT ----------
function renderProduct() {
  document.title = `${currentProduct.name} | Luxury Fashion`;

  document.getElementById('breadcrumbProduct').textContent = currentProduct.name;
  document.getElementById('productCategory').textContent = currentProduct.category.toUpperCase();
  document.getElementById('productName').textContent = currentProduct.name;
  document.getElementById('productPrice').textContent = formatPrice(currentProduct.price);
  document.getElementById('productDescription').textContent = currentProduct.description;
  document.getElementById('productDetails').textContent = currentProduct.details;

  // Main image
  const mainImage = document.getElementById('mainImage');
  mainImage.src = currentProduct.images[0];
  mainImage.alt = currentProduct.name;

  // Thumbnails
  document.getElementById('thumbnails').innerHTML =
    currentProduct.images.map((img, i) => `
      <button class="aspect-square border-2 ${i === 0 ? 'border-foreground' : 'border-transparent'} hover:border-foreground"
        onclick="changeMainImage('${img}', this)">
        <img src="${img}" class="w-full h-full object-cover">
      </button>
    `).join('');

  renderSizes();
  renderColors();
}

// ---------- IMAGE SWITCH ----------
function changeMainImage(src, btn) {
  document.getElementById('mainImage').src = src;
  document.querySelectorAll('#thumbnails button').forEach(b => b.classList.remove('border-foreground'));
  btn.classList.add('border-foreground');
}

// ---------- SIZES ----------
function renderSizes() {
  const container = document.getElementById('sizeOptions');
  selectedSize = null;
  updateAddToCartState();

  container.innerHTML = currentProduct.sizes.map(size => `
    <button class="size-btn transition-all duration-200"
      onclick="selectSize('${size}', this)">
      ${size}
    </button>
  `).join('');
}

function selectSize(size, btn) {
  selectedSize = size;

  document.querySelectorAll('.size-btn').forEach(b => {
    b.classList.remove('active', 'scale-105');
  });

  btn.classList.add('active', 'scale-105');
  updateAddToCartState();
}

// ---------- COLORS ----------
function renderColors() {
  const container = document.getElementById('colorOptions');
  container.innerHTML = currentProduct.colors.map((c, i) => `
    <button class="color-swatch ${i === 0 ? 'active' : ''}"
      style="background:${c.hex}"
      onclick="selectColor('${c.name}', this)">
    </button>
  `).join('');

  selectedColor = currentProduct.colors[0].name;
  document.getElementById('selectedColorName').textContent = selectedColor;
}

function selectColor(name, btn) {
  selectedColor = name;
  document.getElementById('selectedColorName').textContent = name;
  document.querySelectorAll('.color-swatch').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ---------- ADD TO CART ----------
function initAddToCart() {
  const btn = document.getElementById('addToCartBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const hasSizeButton = selectedSize !== null;
    const hasMeasurements = selectedSizeDetails && Object.values(selectedSizeDetails).some(v => v.trim() !== "");

    if (!hasSizeButton && !hasMeasurements) {
      Cart.showToast('Please select a size or enter your measurements in the Size Guide');
      return;
    }

    const sizeToAdd = hasSizeButton ? selectedSize : 'Custom';

    Cart.addItem(currentProduct, sizeToAdd, selectedColor, selectedSizeDetails);

    Cart.showToast('Added to cart!');
  });

  updateAddToCartState();
}

function updateAddToCartState() {
  const btn = document.getElementById('addToCartBtn');
  if (!btn) return;

  // Enable button if either size or measurements exist
  const hasSize = selectedSize !== null || (selectedSizeDetails && Object.values(selectedSizeDetails).some(v => v.trim() !== ""));
  btn.disabled = !hasSize;
  btn.classList.toggle('opacity-50', !hasSize);
  btn.classList.toggle('cursor-not-allowed', !hasSize);
}

// ---------- SIZE GUIDE MODAL ----------
function initSizeGuide() {
  const openBtn = document.getElementById('openSizeGuide');
  const modal = document.getElementById('sizeGuideModal');
  const closeBtn = document.getElementById('closeSizeGuide');

  if (!openBtn || !modal || !closeBtn) return;

  openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });

  // Save measurements
  document.getElementById('confirmSize').addEventListener('click', () => {
    selectedSizeDetails = {
      bust: document.getElementById('inputBust').value,
      waist: document.getElementById('inputWaist').value,
      hips: document.getElementById('inputHips').value,
      height: document.getElementById('inputHeight').value,
      notes: document.getElementById('inputNotes').value
    };
    modal.classList.add('hidden');

    // Show summary near Add to Bag
    let sizeSummary = document.getElementById('sizeSummary');
    if (!sizeSummary) {
      sizeSummary = document.createElement('p');
      sizeSummary.id = 'sizeSummary';
      sizeSummary.className = 'mt-2 text-sm text-muted-foreground';
      document.getElementById('addToCartBtn').parentNode.insertBefore(sizeSummary, document.getElementById('addToCartBtn'));
    }
    sizeSummary.textContent = `Selected Size: Bust ${selectedSizeDetails.bust}", Waist ${selectedSizeDetails.waist}", Hips ${selectedSizeDetails.hips}"`;

    updateAddToCartState();
  });
}

// ---------- RELATED PRODUCTS ----------
function renderRelatedProducts() {
  const container = document.getElementById('relatedProducts');
  if (!container) return;

  const related = products
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4);

  if (related.length < 4) {
    const others = products.filter(p => p.id !== currentProduct.id && !related.includes(p)).slice(0, 4 - related.length);
    related.push(...others);
  }

  container.innerHTML = related.map(p => `
    <a href="product.html?id=${p.id}" class="product-card group">
      <div class="aspect-[3/4] overflow-hidden bg-muted mb-4">
        <img src="${p.images[0]}" alt="${p.name}" class="w-full h-full object-cover">
      </div>
      <div class="space-y-1">
        ${p.isNew ? '<span class="text-xs tracking-wider text-accent uppercase">New</span>' : ''}
        <h3 class="font-medium text-sm">${p.name}</h3>
        <p class="text-sm text-muted-foreground">${formatPrice(p.price)}</p>
      </div>
    </a>
  `).join('');
}
