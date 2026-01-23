// Cart Management
const Cart = {
  items: [],

  init() {
    // Load cart from localStorage
    const saved = localStorage.getItem('luxe-cart');
    if (saved) {
      this.items = JSON.parse(saved);
    }
    this.updateUI();
    this.setupEventListeners();
  },

  save() {
    localStorage.setItem('luxe-cart', JSON.stringify(this.items));
  },

  addItem(product, size, color, sizeDetails = {}, quantity = 1) {
    // Use a unique key for custom sizes to avoid merging different custom measurements
    const key = size === 'Custom' ? JSON.stringify(sizeDetails) : size;

    const existingIndex = this.items.findIndex(
      item => item.id === product.id && item.color === color && 
              (item.size === key || JSON.stringify(item.sizeDetails) === key)
    );

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: size,
        color,
        sizeDetails,
        quantity
      });
    }

    this.save();
    this.updateUI();
    this.showToast(`${product.name} added to bag`);
    this.openCart();
  },

  removeItem(index) {
    this.items.splice(index, 1);
    this.save();
    this.updateUI();
  },

  updateQuantity(index, quantity) {
    if (quantity <= 0) {
      this.removeItem(index);
    } else {
      this.items[index].quantity = quantity;
      this.save();
      this.updateUI();
    }
  },

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getTotalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  clear() {
    this.items = [];
    this.save();
    this.updateUI();
  },

  updateUI() {
    const countEl = document.getElementById('cartCount');
    if (countEl) {
      const total = this.getTotalItems();
      countEl.textContent = total;
      countEl.classList.toggle('hidden', total === 0);
    }

    this.renderCartDrawer();
  },

  renderCartDrawer() {
    const itemsContainer = document.getElementById('cartItems');
    const footerEl = document.getElementById('cartFooter');
    const totalEl = document.getElementById('cartTotal');

    if (!itemsContainer) return;

    if (this.items.length === 0) {
      itemsContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-center">
          <svg class="w-16 h-16 text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <p class="text-muted-foreground mb-4">Your bag is empty</p>
          <a href="shop.html" class="text-sm underline hover:text-accent">Continue Shopping</a>
        </div>
      `;
      if (footerEl) footerEl.classList.add('hidden');
    } else {
      itemsContainer.innerHTML = this.items.map((item, index) => {
        // Display custom size if provided
        let sizeInfo = '';
        if (item.size === 'Custom' && item.sizeDetails && Object.keys(item.sizeDetails).length) {
          sizeInfo = ` — Bust: ${item.sizeDetails.bust}", Waist: ${item.sizeDetails.waist}", Hips: ${item.sizeDetails.hips}"`;
          if (item.sizeDetails.height) sizeInfo += `, Height: ${item.sizeDetails.height}"`;
        }

        return `
          <div class="flex gap-4 pb-4 border-b border-border">
            <img src="${item.image}" alt="${item.name}" class="w-20 h-24 object-cover">
            <div class="flex-1">
              <div class="flex justify-between">
                <h3 class="font-medium text-sm">${item.name}</h3>
                <button onclick="Cart.removeItem(${index})" class="text-muted-foreground hover:text-foreground">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <p class="text-xs text-muted-foreground mt-1">
                ${item.size} / ${item.color}${sizeInfo}
              </p>
              <div class="flex justify-between items-center mt-2">
                <div class="flex items-center border border-border">
                  <button onclick="Cart.updateQuantity(${index}, ${item.quantity - 1})" class="px-2 py-1 hover:bg-secondary">-</button>
                  <span class="px-3 py-1 text-sm">${item.quantity}</span>
                  <button onclick="Cart.updateQuantity(${index}, ${item.quantity + 1})" class="px-2 py-1 hover:bg-secondary">+</button>
                </div>
                <span class="font-medium">${formatPrice(item.price * item.quantity)}</span>
              </div>
            </div>
          </div>
        `;
      }).join('');

      if (footerEl) footerEl.classList.remove('hidden');
      if (totalEl) totalEl.textContent = formatPrice(this.getTotal());
    }
  },

  setupEventListeners() {
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
      cartBtn.addEventListener('click', () => this.openCart());
    }

    const closeBtn = document.getElementById('closeCart');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeCart());
    }

    const overlay = document.getElementById('cartOverlay');
    if (overlay) {
      overlay.addEventListener('click', () => this.closeCart());
    }
  },

  openCart() {
    const drawer = document.getElementById('cartDrawer');
    const panel = document.getElementById('cartPanel');
    if (drawer && panel) {
      drawer.classList.remove('hidden');
      setTimeout(() => {
        panel.style.transform = 'translateX(0)';
      }, 10);
    }
  },

  closeCart() {
    const drawer = document.getElementById('cartDrawer');
    const panel = document.getElementById('cartPanel');
    if (drawer && panel) {
      panel.style.transform = 'translateX(100%)';
      setTimeout(() => {
        drawer.classList.add('hidden');
      }, 300);
    }
  },

  showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};

// Helper to format price
function formatPrice(amount) {
  if (typeof amount === 'string') amount = parseFloat(amount.replace(/[^0-9.-]+/g, ""));
  return `$${amount.toFixed(2)}`;
}

// Initialize cart when DOM is ready
document.addEventListener('DOMContentLoaded', () => Cart.init());
