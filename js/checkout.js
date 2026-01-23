// Checkout Page JavaScript

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
  
  if (!container) return;
  
  if (Cart.items.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8">
        <p class="text-muted-foreground mb-4">Your cart is empty</p>
        <a href="shop.html" class="text-sm underline hover:text-accent">Continue Shopping</a>
      </div>
    `;
    return;
  }
  
  container.innerHTML = Cart.items.map(item => `
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
    ? `Custom — Bust: ${item.sizeDetails.bust}", Waist: ${item.sizeDetails.waist}", Hips: ${item.sizeDetails.hips}"${item.sizeDetails.height ? ', Height: ' + item.sizeDetails.height + '"' : ''}`
    : item.size
  } / ${item.color}
</p>
      </div>
      <span class="text-sm">${formatPrice(item.price * item.quantity)}</span>
    </div>
  `).join('');
  
  const subtotal = Cart.getTotal();
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (totalEl) totalEl.textContent = formatPrice(subtotal);
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

// Update Bank Details Display
function updateBankDetails(paymentType) {
  const bankInfo = document.getElementById('bankInfo');
  if (!bankInfo) return;
  
  if (paymentType === 'bank-transfer') {
    const bank = bankAccounts.domestic;
    bankInfo.innerHTML = `
      <div class="flex justify-between items-center py-2 border-b border-border/50">
        <span class="text-muted-foreground">Bank Name</span>
        <div class="flex items-center gap-2">
          <span class="font-medium">${bank.bankName}</span>
          <button onclick="copyToClipboard('${bank.bankName}', this)" class="copy-btn text-muted-foreground hover:text-foreground">
          </button>
        </div>
      </div>
      <div class="flex justify-between items-center py-2 border-b border-border/50">
        <span class="text-muted-foreground">Account Name</span>
        <div class="flex items-center gap-2">
          <span class="font-medium">${bank.accountName}</span>
          <button onclick="copyToClipboard('${bank.accountName}', this)" class="copy-btn text-muted-foreground hover:text-foreground">
          </button>
        </div>
      </div>
      <div class="flex justify-between items-center py-2 border-b border-border/50">
        <span class="text-muted-foreground">Account Number</span>
        <div class="flex items-center gap-2">
          <span class="font-medium">${bank.accountNumber}</span>
          <button onclick="copyToClipboard('${bank.accountNumber}', this)" class="copy-btn text-muted-foreground hover:text-foreground">
          </button>
        </div>
      </div>
      <div class="flex justify-between items-center py-2">
        <span class="text-muted-foreground">Routing Number</span>
        <div class="flex items-center gap-2">
          <span class="font-medium">${bank.routingNumber}</span>
          <button onclick="copyToClipboard('${bank.routingNumber}', this)" class="copy-btn text-muted-foreground hover:text-foreground">
          </button>
        </div>
      </div>
    `;
  } else {
    const bank = bankAccounts.international;
    bankInfo.innerHTML = `
      <div class="flex justify-between items-center py-2 border-b border-border/50">
        <span class="text-muted-foreground">Bank Name</span>
        <div class="flex items-center gap-2">
          <span class="font-medium">${bank.bankName}</span>
          <button onclick="copyToClipboard('${bank.bankName}', this)" class="copy-btn text-muted-foreground hover:text-foreground">
          </button>
        </div>
      </div>
      <div class="flex justify-between items-center py-2 border-b border-border/50">
        <span class="text-muted-foreground">Account Name</span>
        <div class="flex items-center gap-2">
          <span class="font-medium">${bank.accountName}</span>
          <button onclick="copyToClipboard('${bank.accountName}', this)" class="copy-btn text-muted-foreground hover:text-foreground">
          </button>
        </div>
      </div>
      <div class="flex justify-between items-center py-2 border-b border-border/50">
        <span class="text-muted-foreground">IBAN</span>
        <div class="flex items-center gap-2">
          <span class="font-medium text-xs">${bank.iban}</span>
          <button onclick="copyToClipboard('${bank.iban.replace(/\s/g, '')}', this)" class="copy-btn text-muted-foreground hover:text-foreground">
          </button>
        </div>
      </div>
      <div class="flex justify-between items-center py-2 border-b border-border/50">
        <span class="text-muted-foreground">SWIFT/BIC</span>
        <div class="flex items-center gap-2">
          <span class="font-medium">${bank.swift}</span>
          <button onclick="copyToClipboard('${bank.swift}', this)" class="copy-btn text-muted-foreground hover:text-foreground">
          </button>
        </div>
      </div>
      <div class="flex justify-between items-center py-2">
        <span class="text-muted-foreground">Bank Address</span>
        <span class="font-medium text-xs text-right">${bank.address}</span>
      </div>
    `;
  }
}

// Copy to Clipboard
function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('copied');
    btn.innerHTML = `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
    `;
    
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
        </svg>
      `;
    }, 2000);
  });
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

    const paymentMethod = document.querySelector(
      'input[name="payment"]:checked'
    ).value;

    const orderNumber = 'LUXE-' + Date.now().toString().slice(-8);

    // =====================
    // PAYSTACK REDIRECT
    // =====================
    if (paymentMethod === 'paystack') {
      window.location.href = 'https://paystack.com/pay/YOUR_PAYSTACK_LINK';
      return;
    }

    // =====================
    // PAYU REDIRECT
    // =====================
    if (paymentMethod === 'payu') {
      window.location.href = 'https://YOUR_PAYU_LINK';
      return;
    }

    // =====================
    // BANK / WIRE → WHATSAPP
    // =====================

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const apartment = document.getElementById("apartment").value || "";
    const city = document.getElementById("city").value;
    const postalCode = document.getElementById("postalCode").value;
    const country = document.getElementById("country").value;

    const total = formatPrice(Cart.getTotal());

    let orderItemsText = "";
    Cart.items.forEach((item, idx) => {
      orderItemsText += `${idx + 1}. ${item.name} - Size: ${item.size}, Color: ${item.color}, Qty: ${item.quantity}, Price: ${formatPrice(item.price * item.quantity)}\n`;
    });

    let message = `*New Order*\n\n`;
    message += `*Order Number:* ${orderNumber}\n\n`;
    message += `*Customer Info*\n`;
    message += `Name: ${firstName} ${lastName}\n`;
    message += `Email: ${email}\n`;
    message += `Phone: ${phone}\n`;
    message += `Address: ${address} ${apartment}, ${city}, ${postalCode}, ${country}\n\n`;
    message += `*Order Items*\n${orderItemsText}\n`;
    message += `*Total:* ${total}\n`;
    message += `*Payment Method:* ${paymentMethod}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "2349074027996";

    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Generate order number
    const orderNumber = 'LUXE-' + Date.now().toString().slice(-8);
    
    // Save order to localStorage
    localStorage.setItem('luxe-last-order', JSON.stringify(formData));
    
    // Clear cart
    Cart.clear();
    
    // Show success message
    alert(`Order ${orderNumber} placed successfully!\n\nPlease complete your bank transfer using the account details provided.\n\nInclude order number ${orderNumber} as payment reference.`);
    
    // Redirect to home
    window.location.href = 'index.html';
  });
}
