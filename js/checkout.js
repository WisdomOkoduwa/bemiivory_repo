// Modern Checkout Page with Paystack Integration

// PAYSTACK CONFIGURATION
const PAYSTACK_PUBLIC_KEY = 'pk_test_xxxxxxxxxxxxxxxxxxxxxx'; // Replace with your actual Paystack public key

// Sync currency from global state
(function () {
  const currency = window.currentCurrency || 'USD';
  const rate = window.currentCurrencyRate || 1;
  
  if (!window.currentCurrency) window.currentCurrency = currency;
  if (!window.currentCurrencyRate) window.currentCurrencyRate = rate;
})();

document.addEventListener('DOMContentLoaded', () => {
  renderOrderSummary();
  initPaymentCards();
  initCheckoutForm();
});

// Format price helper
function formatPrice(amount, currency = null) {
  const currentCurrency = currency || window.currentCurrency || 'USD';
  
  if (typeof amount === 'string') amount = parseFloat(amount.replace(/[^0-9.-]+/g, ""));
  
  if (isNaN(amount)) {
    console.error('Invalid amount passed to formatPrice:', amount);
    return '$0.00';
  }

  let symbol = '$';
  if (currentCurrency === 'NGN') symbol = '₦';
  if (currentCurrency === 'GBP') symbol = '£';
  if (currentCurrency === 'EUR') symbol = '€';

  return `${symbol}${amount.toFixed(2)}`;
}

// Render Order Summary
function renderOrderSummary() {
  const container = document.getElementById('orderItems');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');

  if (!container || !subtotalEl || !totalEl) return;

  if (!Cart || Cart.items.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8">
        <svg class="w-16 h-16 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
        <p class="text-muted-foreground mb-4">Your cart is empty</p>
        <a href="shop.html" class="text-sm text-accent underline hover:no-underline">Continue Shopping</a>
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
      <div class="flex gap-4 pb-4 border-b border-border last:border-0">
        <div class="relative flex-shrink-0">
          <img src="${item.image}" alt="${item.name}" class="w-20 h-24 object-cover rounded-lg">
          <span class="absolute -top-2 -right-2 bg-accent text-cream text-xs w-6 h-6 rounded-full flex items-center justify-center font-medium">
            ${item.quantity}
          </span>
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="text-sm font-medium mb-1 truncate">${item.name}</h3>
          <p class="text-xs text-muted-foreground mb-2">
            ${item.size === 'Custom' && item.sizeDetails
              ? `Custom fit`
              : item.size
            } • ${item.color}
          </p>
          <p class="text-sm font-medium text-accent">
            ${formatPrice(itemTotal, currency)}
          </p>
        </div>
      </div>
    `;
  }).join('');

  const subtotal = Cart.getTotal() * currencyRate;

  subtotalEl.textContent = formatPrice(subtotal, currency);
  totalEl.textContent = formatPrice(subtotal, currency);
}

// Initialize Payment Card Selection
function initPaymentCards() {
  const cards = document.querySelectorAll('.payment-card');
  const radios = document.querySelectorAll('input[name="payment"]');

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      // Remove selected class from all cards
      cards.forEach(c => c.classList.remove('selected'));
      // Add selected class to clicked card
      card.classList.add('selected');
      // Check the corresponding radio
      radios[index].checked = true;
    });
  });
}

// Initialize Checkout Form
function initCheckoutForm() {
  const form = document.getElementById('checkoutForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate cart
    if (!Cart || Cart.items.length === 0) {
      showNotification('Your cart is empty!', 'error');
      return;
    }

    // Get form data
    const formData = {
      firstName: document.getElementById('firstName').value.trim(),
      lastName: document.getElementById('lastName').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      address: document.getElementById('address').value.trim(),
      apartment: document.getElementById('apartment').value.trim(),
      city: document.getElementById('city').value.trim(),
      postalCode: document.getElementById('postalCode').value.trim(),
      country: document.getElementById('country').value
    };

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.phone || !formData.address || !formData.city || 
        !formData.postalCode || !formData.country) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }

    // Get payment method
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    // Calculate total
    const currencyRate = window.currentCurrencyRate || 1;
    const currency = window.currentCurrency || 'USD';
    const subtotal = Cart.getTotal();
    const totalInBaseCurrency = subtotal; // Base currency is USD
    const totalInSelectedCurrency = subtotal * currencyRate;

    // Process payment based on method
    if (paymentMethod === 'paystack') {
      initiatePaystackPayment(formData, totalInBaseCurrency, totalInSelectedCurrency, currency);
    }
  });
}

// Initiate Paystack Payment
function initiatePaystackPayment(customerData, amountUSD, amountConverted, currency) {
  // Paystack only accepts NGN, GHS, ZAR, USD
  // Convert to kobo (for NGN) or cents (for USD)
  let paystackAmount;
  let paystackCurrency;

  if (currency === 'NGN') {
    paystackAmount = Math.round(amountConverted * 100); // Convert to kobo
    paystackCurrency = 'NGN';
  } else if (currency === 'USD') {
    paystackAmount = Math.round(amountUSD * 100); // Convert to cents
    paystackCurrency = 'USD';
  } else {
    // Default to USD for other currencies
    paystackAmount = Math.round(amountUSD * 100);
    paystackCurrency = 'USD';
  }

  // Generate order reference
  const orderReference = 'BEMI-' + Date.now().toString().slice(-10);

  // Initialize Paystack
  const handler = PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: customerData.email,
    amount: paystackAmount,
    currency: paystackCurrency,
    ref: orderReference,
    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: `${customerData.firstName} ${customerData.lastName}`
        },
        {
          display_name: "Phone Number",
          variable_name: "phone_number",
          value: customerData.phone
        },
        {
          display_name: "Shipping Address",
          variable_name: "shipping_address",
          value: `${customerData.address}, ${customerData.city}, ${customerData.postalCode}, ${customerData.country}`
        },
        {
          display_name: "Order Items",
          variable_name: "order_items",
          value: Cart.items.length + " items"
        }
      ]
    },
    callback: function(response) {
      // Payment successful
      handlePaymentSuccess(response, customerData, orderReference);
    },
    onClose: function() {
      showNotification('Payment cancelled. You can retry when ready.', 'info');
    }
  });

  handler.openIframe();
}

// Handle Successful Payment
function handlePaymentSuccess(response, customerData, orderReference) {
  console.log('Payment successful:', response);

  // Prepare order details for WhatsApp
  const currencyRate = window.currentCurrencyRate || 1;
  const currency = window.currentCurrency || 'USD';

  let orderItemsText = "";
  Cart.items.forEach((item, idx) => {
    const itemTotal = item.price * item.quantity * currencyRate;
    orderItemsText += `${idx + 1}. ${item.name}\n   ${item.size} / ${item.color} × ${item.quantity}\n   ${formatPrice(itemTotal, currency)}\n\n`;
  });

  const total = formatPrice(Cart.getTotal() * currencyRate, currency);

  const message = `🎉 *NEW ORDER - PAYMENT CONFIRMED*

📦 *Order #:* ${orderReference}
💳 *Payment Ref:* ${response.reference}
✅ *Status:* PAID

👤 *Customer Details*
Name: ${customerData.firstName} ${customerData.lastName}
Email: ${customerData.email}
Phone: ${customerData.phone}

📍 *Shipping Address*
${customerData.address}${customerData.apartment ? '\n' + customerData.apartment : ''}
${customerData.city}, ${customerData.postalCode}
${customerData.country}

🛍️ *Order Items*
${orderItemsText}
💰 *Total Paid:* ${total}

---
Please process this order for shipment.`;

  // Send to WhatsApp
  const encodedMessage = encodeURIComponent(message);
  const whatsappNumber = "2349074027996";

  // Save order to localStorage
  const orderData = {
    orderNumber: orderReference,
    paymentReference: response.reference,
    customer: customerData,
    items: Cart.items,
    total: Cart.getTotal(),
    currency: currency,
    status: 'paid',
    timestamp: new Date().toISOString()
  };
  
  localStorage.setItem('bemi-last-order', JSON.stringify(orderData));

  // Clear cart
  Cart.clear();

  // Show success message
  showSuccessModal(orderReference);

  // Open WhatsApp in new tab (for admin notification)
  setTimeout(() => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  }, 1000);

  // Redirect to success page after delay
  setTimeout(() => {
    window.location.href = `index.html?order=${orderReference}`;
  }, 3000);
}

// Show Success Modal
function showSuccessModal(orderNumber) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-[100] animate-fade-in';
  modal.innerHTML = `
    <div class="bg-background rounded-2xl p-8 max-w-md mx-4 text-center animate-slide-in">
      <div class="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h2 class="font-display text-2xl mb-2">Payment Successful!</h2>
      <p class="text-muted-foreground mb-4">Thank you for your order</p>
      <p class="text-sm mb-6">
        Order #<span class="font-mono font-medium">${orderNumber}</span>
      </p>
      <p class="text-xs text-muted-foreground">
        You'll receive a confirmation email shortly.<br>
        Redirecting to homepage...
      </p>
    </div>
  `;
  document.body.appendChild(modal);
}

// Show Notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  const bgColor = type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-500' : 'bg-accent';
  
  notification.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-10px)';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
`;
document.head.appendChild(style);