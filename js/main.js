// Main JavaScript for Index Page

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFeaturedProducts();
  initNewsletter();
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

// Render Featured Products
function initFeaturedProducts() {
  const container = document.getElementById('featuredProducts');
  if (!container) return;
  
  const featured = getFeaturedProducts();
  container.innerHTML = featured.map(product => createProductCard(product)).join('');
}

// Create Product Card HTML
function createProductCard(product) {
  return `
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
  `;
}

// Newsletter Form
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    
    // Here you would typically send to your backend
    console.log('Newsletter signup:', email);
    
    Cart.showToast('Thank you for subscribing!');
    form.reset();
  });
}
