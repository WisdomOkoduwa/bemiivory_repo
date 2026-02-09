// Checkout Page JavaScript

// Sync currency from cart/localStorage
(function () {
  const currency = localStorage.getItem('currency');
  const rate = localStorage.getItem('currencyRate');

  if (currency) window.currentCurrency = currency;
  if (rate) window.currentCurrencyRate = parseFloat(rate);
})();

document.addEventListener('DOMContentLoaded', () => {
  renderOrderSummary();
  initPaymentMethods();
  initCheckoutForm();
});

// Render Order Summary
function renderOrderSummary() {
  const container = document.getElementById('orderItems');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');

  if (!container || !subtotalEl || !totalEl) return;

  if (!Cart || Cart.items.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8">
        <p class="text-muted-foreground mb-4">Your cart is empty</p>
        <a href="shop.html" class="text-sm underline hover:text-accent">Continue Shopping</a>
      </div>
    `;
    subtotalEl.textContent = formatPrice(0);
    totalEl.textContent = formatPrice(0);
    return;
  }

  const currencyRate = window.currentCurrencyRate || 1;
  const currency = window.currentCurrency || 'USD';

  container.innerHTML = Cart.items.map(item => {
    const itemTotal = item.price * item.quantity * currencyRate;

    return `
      <div class="flex gap-4">
        <div class="relative">
          <img src="${item.image}" alt="${item.name}" class="w-16 h-20 object-cover">
          <span class="absolute -top-2 -right-2 bg-foreground text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center">
            ${item.quantity}
          </span>
        </div>
        <div class="flex-1">
          <h3 class="text-sm font-medium">${item.name}</h3>
          <p class="text-xs text-muted-foreground">
            ${item.size === 'Custom' && item.sizeDetails
              ? `Custom — Bust: ${item.sizeDetails.bust}", Waist: ${item.sizeDetails.waist}", Hips: ${item.sizeDetails.hips}"`
              : item.size
            } / ${item.color}
          </p>
        </div>
        <span class="text-sm">
          ${formatPrice(itemTotal, currency)}
        </span>
      </div>
    `;
  }).join('');

  const subtotal = Cart.getTotal() * currencyRate;

  subtotalEl.textContent = formatPrice(subtotal, currency);
  totalEl.textContent = formatPrice(subtotal, currency);
}

// Initialize Payment Method Selection
function initPaymentMethods() {
  const paymentOptions = document.querySelectorAll('input[name="payment"]');
  const bankDetails = document.getElementById('bankDetails');

  paymentOptions.forEach(option => {
    option.addEventListener('change', () => {
      if (option.value === 'bank-transfer' || option.value === 'wire-transfer') {
        bankDetails.style.display = 'block';
        updateBankDetails(option.value === 'bank-transfer' ? 'bank-transfer' : 'international');
      } else {
        bankDetails.style.display = 'none';
      }
    });
  });

  updateBankDetails('bank-transfer');
}

// Initialize Checkout Form
function initCheckoutForm() {
  const form = document.getElementById('checkoutForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (Cart.items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const currencyRate = window.currentCurrencyRate || 1;
    const currency = window.currentCurrency || 'USD';

    const total = formatPrice(Cart.getTotal() * currencyRate, currency);

    let orderItemsText = "";
    Cart.items.forEach((item, idx) => {
      orderItemsText += `${idx + 1}. ${item.name} - ${item.size}/${item.color} x${item.quantity} → ${formatPrice(item.price * item.quantity * currencyRate, currency)}\n`;
    });

    const message =
`*New Order*
Total: ${total}

${orderItemsText}
Payment Method: ${paymentMethod}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/2349074027996?text=${encodedMessage}`, "_blank");

    Cart.clear();
    window.location.href = 'index.html';
  });
}
