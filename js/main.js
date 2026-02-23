// Initialize currency settings FIRST, before DOMContentLoaded
window.currentCurrency = 'USD';  // DEFAULT TO USD
window.currencyRates = {
  USD: 1,      // Base currency
  NGN: 1380,   // 1 USD = 1380 NGN
  GBP: 0.73,   // 1 USD = 0.73 GBP
  EUR: 0.84    // 1 USD = 0.84 EUR
};
window.currentCurrencyRate = window.currencyRates['USD']; // This should be 1

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFeaturedProducts();
  initNewsletter();

  // Currency selector
  const currencySelect = document.getElementById('currencySelect');
  const currencyFlag = document.getElementById('currencyFlag');

  if (currencySelect) {
    currencySelect.addEventListener('change', (e) => {
      const selected = currencySelect.selectedOptions[0];
      const currency = selected.value;
      window.currentCurrency = currency;
      window.currentCurrencyRate = window.currencyRates[currency] || 1;

      if (currencyFlag) {
        currencyFlag.src = selected.getAttribute('data-flag');
        currencyFlag.alt = currency;
      }

      // Update product prices
      document.querySelectorAll('[data-base-price]').forEach(el => {
        const basePrice = parseFloat(el.getAttribute('data-base-price'));
        el.textContent = formatPrice(basePrice * window.currentCurrencyRate, window.currentCurrency);
      });

      // Update cart UI
      if (window.Cart) {
        window.Cart.updateUI();
      }
    });
  }
});

// ✅ REQUIRED FIX: fallback init if DOM already loaded
if (document.readyState !== 'loading') {
  initMobileMenu();
}

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
  const currencyRate = window.currentCurrencyRate || 1;
  const currency = window.currentCurrency || 'USD';
  
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
        <p class="text-sm text-muted-foreground" data-base-price="${product.price}">
          ${formatPrice(product.price * currencyRate, currency)}
        </p>
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

    console.log('Newsletter signup:', email);

    if (typeof Cart !== 'undefined' && Cart.showToast) {
      Cart.showToast('Thank you for subscribing!');
    }
    form.reset();
  });
}

// Format price helper
function formatPrice(amount, currency = 'USD') {
  if (typeof amount === 'string') amount = parseFloat(amount.replace(/[^0-9.-]+/g, ""));
  
  if (isNaN(amount)) {
    console.error('Invalid amount passed to formatPrice:', amount);
    return '$0.00';
  }

  let symbol = '$';
  if (currency === 'NGN') symbol = '₦';
  if (currency === 'GBP') symbol = '£';
  if (currency === 'EUR') symbol = '€';

  return `${symbol}${amount.toFixed(2)}`;
}