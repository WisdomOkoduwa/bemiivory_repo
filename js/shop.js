// Shop Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFilters();
  initSort();
  renderProducts();
  handleCategoryFromURL();
});

let currentCategory = 'all';
let currentSort = 'featured';

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

// Initialize Filter Buttons
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update category and render
      currentCategory = btn.dataset.category;
      updatePageTitle();
      renderProducts();
    });
  });
}

// Initialize Sort Select
function initSort() {
  const sortSelect = document.getElementById('sortSelect');
  
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      renderProducts();
    });
  }
}

// Handle category from URL params
function handleCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  
  if (category) {
    currentCategory = category;
    
    // Update active filter button
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === category);
    });
    
    updatePageTitle();
    renderProducts();
  }
}

// Update Page Title
function updatePageTitle() {
  const titleEl = document.getElementById('pageTitle');
  if (!titleEl) return;
  
  const titles = {
    all: 'Shop All',
    new: 'New Arrivals',
    bestsellers: 'Bestsellers',
    dresses: 'Dresses',
    tops: 'Tops',
    bottoms: 'Bottoms',
    accessories: 'Accessories'
  };
  
  titleEl.textContent = titles[currentCategory] || 'Shop All';
}

// Sort Products
function sortProducts(productsToSort) {
  const sorted = [...productsToSort];
  
  switch (currentSort) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'newest':
      return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case 'featured':
    default:
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
}

// Render Products
function renderProducts() {
  const container = document.getElementById('productsGrid');
  if (!container) return;
  
  let filteredProducts = getProductsByCategory(currentCategory);
  filteredProducts = sortProducts(filteredProducts);
  
  if (filteredProducts.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12">
        <p class="text-muted-foreground">No products found in this category.</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = filteredProducts.map(product => `
    <a href="product.html?id=${product.id}" class="product-card group">
      <div class="aspect-[3/4] overflow-hidden bg-secondary mb-4">
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
