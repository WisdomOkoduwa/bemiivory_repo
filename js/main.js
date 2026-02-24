// Initialize currency settings FIRST, before DOMContentLoaded
window.currentCurrency = 'USD';  // DEFAULT TO USD
window.currencyRates = {
  USD: 1,      // Base currency
  NGN: 1380,   // 1 USD = 1380 NGN
  GBP: 0.73,   // 1 USD = 0.73 GBP
  EUR: 0.84    // 1 USD = 0.84 EUR
};
window.currentCurrencyRate = window.currencyRates['USD']; // This should be 1

// ✅ FIXED: single bulletproof init — works regardless of when Cloudflare loads the script
function initAll() {
  initMobileMenu();
  initFeaturedProducts();
  initNewsletter();
  initSizeGuideModal();

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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

// Mobile Menu Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!menuBtn || !mobileMenu) {
    // Retry once after a short delay (handles Cloudflare async edge cases)
    setTimeout(initMobileMenu, 100);
    return;
  }

  menuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('block');
    } else {
      mobileMenu.classList.remove('block');
      mobileMenu.classList.add('hidden');
    }
  });
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

function initSizeGuideModal() {
  const openBtn = document.getElementById('openSizeGuide');
  const closeBtn = document.getElementById('closeSizeGuide');
  const modal = document.getElementById('sizeGuideModal');
  const confirmBtn = document.getElementById('confirmSize');

  if (!openBtn || !closeBtn || !modal) return;

  openBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  // Save Measurements
 confirmBtn.addEventListener('click', () => {
  const measurements = {
    bust: document.getElementById('inputBust').value.trim(),
    waist: document.getElementById('inputWaist').value.trim(),
    hips: document.getElementById('inputHips').value.trim(),
    height: document.getElementById('inputHeight').value.trim(),
    notes: document.getElementById('inputNotes').value.trim(),
  };

  if (!measurements.bust || !measurements.waist || !measurements.hips) {
    alert('Please enter at least your Bust, Waist, and Hips measurements.');
    return;
  }

  // Save to localStorage
  localStorage.setItem('bemi_measurements', JSON.stringify(measurements));

  // ✅ Tell the product page that size is now 'Custom'
  if (typeof window.selectedSize !== 'undefined') {
    window.selectedSize = 'Custom';
  }

  // ✅ Visually deselect all size buttons and mark Custom as active
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  Cart.showToast('Measurements saved — click Add to Bag to continue.');
  modal.classList.add('hidden');
});
}