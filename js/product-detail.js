document.addEventListener('DOMContentLoaded', () => {

  const sizeOptionsDiv = document.getElementById('sizeOptions');
  const colorOptionsDiv = document.getElementById('colorOptions');
  const mainImage = document.getElementById('mainImage');
  const thumbnailsDiv = document.getElementById('thumbnails');
  const productNameEl = document.getElementById('productName');
  const productPriceEl = document.getElementById('productPrice');
  const productDescriptionEl = document.getElementById('productDescription');
  const productDetailsEl = document.getElementById('productDetails');
  const selectedColorNameEl = document.getElementById('selectedColorName');
  const quantityInput = document.getElementById('quantityInput') || { value: 1 };

  // Optional custom size inputs
  const customBustInput = document.getElementById('customBust');
  const customWaistInput = document.getElementById('customWaist');
  const customHipsInput = document.getElementById('customHips');
  const customHeightInput = document.getElementById('customHeight');

  let currentProduct = null;
  let selectedSize = null;
  let selectedColor = null;

  // --- Get product ID from URL ---
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  if (!productId) return window.location.href = 'shop.html';

  currentProduct = getProductById(productId);
  if (!currentProduct) return window.location.href = 'shop.html';

  // --- Helper: update product price based on currency ---
  function updateProductPrice() {
    const currency = window.currentCurrency || 'USD';
    const rate = window.currentCurrencyRate || 1;
    productPriceEl.textContent = formatPrice(currentProduct.price * rate, currency);
  }

  // --- Render product info ---
  productNameEl.textContent = currentProduct.name;
  updateProductPrice();
  productDescriptionEl.textContent = currentProduct.description;
  productDetailsEl.textContent = currentProduct.details;

  // --- Render images ---
  if (currentProduct.images.length > 0) {
    mainImage.src = currentProduct.images[0];
    thumbnailsDiv.innerHTML = '';
    currentProduct.images.forEach(img => {
      const thumb = document.createElement('img');
      thumb.src = img;
      thumb.className = 'w-full h-20 object-cover cursor-pointer border border-border';
      thumb.addEventListener('click', () => mainImage.src = img);
      thumbnailsDiv.appendChild(thumb);
    });
  }

  // --- Render sizes ---
  sizeOptionsDiv.innerHTML = '';
  currentProduct.sizes.forEach(size => {
    const btn = document.createElement('button');
    btn.textContent = size;
    btn.className = 'px-3 py-1 border border-border rounded text-sm hover:bg-accent hover:text-white';
    btn.addEventListener('click', () => {
      selectedSize = size;
      sizeOptionsDiv.querySelectorAll('button').forEach(b =>
        b.classList.remove('bg-accent', 'text-white')
      );
      btn.classList.add('bg-accent', 'text-white');
    });
    sizeOptionsDiv.appendChild(btn);
  });

  // --- Render colors ---
  colorOptionsDiv.innerHTML = '';
  currentProduct.colors.forEach(color => {
    const btn = document.createElement('button');
    btn.title = color.name;
    btn.style.background = color.hex;
    btn.className = 'w-8 h-8 rounded-full border border-border';
    btn.addEventListener('click', () => {
      selectedColor = color.name;
      selectedColorNameEl.textContent = color.name;
      colorOptionsDiv.querySelectorAll('button').forEach(b =>
        b.classList.remove('ring-2', 'ring-accent')
      );
      btn.classList.add('ring-2', 'ring-accent');
    });
    colorOptionsDiv.appendChild(btn);
  });

  // --- Helper to get selected size details ---
  function getSizeDetails() {
    if (selectedSize === 'Custom') {
      return {
        bust: customBustInput?.value || 0,
        waist: customWaistInput?.value || 0,
        hips: customHipsInput?.value || 0,
        height: customHeightInput?.value || 0
      };
    }
    return {};
  }

  // --- Add to Cart ---
  const addBtn = document.getElementById('addToCartBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      if (!selectedSize) selectedSize = currentProduct.sizes[0];
      if (!selectedColor) selectedColor = currentProduct.colors[0].name;

      const sizeDetails = getSizeDetails();
      const quantity = parseInt(quantityInput.value) || 1;

      Cart.addItem(currentProduct, selectedSize, selectedColor, sizeDetails, quantity);
    });
  }

  // --- Update price dynamically on currency change ---
  if (currencySelect) {
    currencySelect.addEventListener('change', () => {
      if (!currentProduct) return;
      updateProductPrice();
      Cart.updateUI();
    });
  }

});
