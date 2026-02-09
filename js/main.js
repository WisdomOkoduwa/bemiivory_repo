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
  // Use fallback values if window variables aren't set
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
  
  // Check if amount is valid
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

// ===================================
// PRODUCT DETAIL PAGE LOGIC
// ===================================
if (document.getElementById('mainImage')) {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (productId && typeof products !== 'undefined') {
    const product = getProductById(productId);
    
    if (product) {
      // Use fallback values
      const currencyRate = window.currentCurrencyRate || 1;
      const currency = window.currentCurrency || 'USD';
      
      // Update breadcrumb
      document.getElementById('breadcrumbProduct').textContent = product.name;
      
      // Update product info
      document.getElementById('mainImage').src = product.images[0];
      document.getElementById('mainImage').alt = product.name;
      document.getElementById('productCategory').textContent = product.category.replace('-', ' ').toUpperCase();
      document.getElementById('productName').textContent = product.name;
      document.getElementById('productPrice').textContent = formatPrice(product.price * currencyRate, currency);
      document.getElementById('productDescription').textContent = product.description;
      document.getElementById('productDetails').textContent = product.details;
      
      // Store base price for currency conversion
      document.getElementById('productPrice').setAttribute('data-base-price', product.price);
      
      // Add thumbnails
      const thumbnailsContainer = document.getElementById('thumbnails');
      thumbnailsContainer.innerHTML = '';
      product.images.forEach((img, index) => {
        const thumb = document.createElement('button');
        thumb.className = 'aspect-square overflow-hidden bg-secondary border-2 border-transparent hover:border-accent transition-colors';
        thumb.innerHTML = `<img src="${img}" alt="${product.name} ${index + 1}" class="w-full h-full object-cover">`;
        thumb.onclick = () => {
          document.getElementById('mainImage').src = img;
        };
        thumbnailsContainer.appendChild(thumb);
      });
      
      // Add size options
      const sizeContainer = document.getElementById('sizeOptions');
      sizeContainer.innerHTML = '';
      product.sizes.forEach(size => {
        const btn = document.createElement('button');
        btn.className = 'px-4 py-2 border border-border hover:border-accent hover:bg-accent hover:text-cream transition-colors';
        btn.textContent = size;
        btn.dataset.size = size;
        btn.onclick = function() {
          document.querySelectorAll('#sizeOptions button').forEach(b => {
            b.classList.remove('bg-accent', 'text-cream', 'border-accent');
          });
          this.classList.add('bg-accent', 'text-cream', 'border-accent');
        };
        sizeContainer.appendChild(btn);
      });
      
      // Add color options
      const colorContainer = document.getElementById('colorOptions');
      const colorNameSpan = document.getElementById('selectedColorName');
      colorContainer.innerHTML = '';
      product.colors.forEach((color, index) => {
        const btn = document.createElement('button');
        btn.className = 'w-10 h-10 rounded-full border-2 border-border hover:border-accent transition-colors';
        btn.style.backgroundColor = color.hex;
        btn.dataset.color = color.name;
        btn.title = color.name;
        btn.onclick = function() {
          document.querySelectorAll('#colorOptions button').forEach(b => {
            b.classList.remove('border-accent');
            b.classList.add('border-border');
          });
          this.classList.remove('border-border');
          this.classList.add('border-accent');
          colorNameSpan.textContent = color.name;
        };
        if (index === 0) {
          btn.classList.remove('border-border');
          btn.classList.add('border-accent');
          colorNameSpan.textContent = color.name;
        }
        colorContainer.appendChild(btn);
      });
      
      // Load related products
      const relatedContainer = document.getElementById('relatedProducts');
      if (relatedContainer) {
        relatedContainer.innerHTML = '';
        const relatedProducts = products
          .filter(p => p.category === product.category && p.id !== product.id)
          .slice(0, 4);
        
        relatedProducts.forEach(relatedProduct => {
          const card = document.createElement('a');
          card.href = `product.html?id=${relatedProduct.id}`;
          card.className = 'group block';
          card.innerHTML = `
            <div class="aspect-[3/4] overflow-hidden bg-secondary mb-3">
              <img src="${relatedProduct.images[0]}" alt="${relatedProduct.name}" 
                   class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            </div>
            <h3 class="text-sm mb-1">${relatedProduct.name}</h3>
            <p class="text-sm text-muted-foreground" data-base-price="${relatedProduct.price}">
              ${formatPrice(relatedProduct.price * currencyRate, currency)}
            </p>
          `;
          relatedContainer.appendChild(card);
        });
      }
      
      // Add to Cart functionality
      const addToCartBtn = document.getElementById('addToCartBtn');
      if (addToCartBtn) {
        addToCartBtn.onclick = function() {
          const selectedSize = document.querySelector('#sizeOptions button.bg-accent');
          const selectedColor = document.querySelector('#colorOptions button.border-accent');
          
          if (!selectedSize) {
            alert('Please select a size');
            return;
          }
          
          const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            size: selectedSize.dataset.size,
            color: selectedColor ? selectedColor.dataset.color : product.colors[0].name,
            quantity: 1
          };
          
          if (typeof Cart !== 'undefined' && Cart.addItem) {
            Cart.addItem(cartItem);
          }
          
          if (typeof Cart !== 'undefined' && Cart.showToast) {
            Cart.showToast('Added to cart!');
          }
        };
      }
      
    } else {
      const container = document.querySelector('.container');
      if (container) {
        container.innerHTML = `
          <div class="text-center py-16">
            <h2 class="font-display text-2xl mb-4">Product Not Found</h2>
            <a href="shop.html" class="text-accent underline">Return to Shop</a>
          </div>
        `;
      }
    }
  }
}

// ===================================
// SIZE GUIDE MODAL
// ===================================
const openSizeGuideBtn = document.getElementById('openSizeGuide');
const sizeGuideModal = document.getElementById('sizeGuideModal');
const closeSizeGuideBtn = document.getElementById('closeSizeGuide');
const confirmSizeBtn = document.getElementById('confirmSize');

if (openSizeGuideBtn && sizeGuideModal) {
  openSizeGuideBtn.addEventListener('click', () => {
    sizeGuideModal.classList.remove('hidden');
  });
}

if (closeSizeGuideBtn && sizeGuideModal) {
  closeSizeGuideBtn.addEventListener('click', () => {
    sizeGuideModal.classList.add('hidden');
  });
}

if (confirmSizeBtn) {
  confirmSizeBtn.addEventListener('click', () => {
    const bust = document.getElementById('inputBust').value;
    const waist = document.getElementById('inputWaist').value;
    const hips = document.getElementById('inputHips').value;
    const height = document.getElementById('inputHeight').value;
    const notes = document.getElementById('inputNotes').value;
    
    if (bust && waist && hips) {
      const measurements = { bust, waist, hips, height, notes };
      localStorage.setItem('customMeasurements', JSON.stringify(measurements));
      
      if (typeof Cart !== 'undefined' && Cart.showToast) {
        Cart.showToast('Measurements saved!');
      } else {
        alert('Measurements saved!');
      }
      
      sizeGuideModal.classList.add('hidden');
    } else {
      alert('Please fill in bust, waist, and hips measurements');
    }
  });
}