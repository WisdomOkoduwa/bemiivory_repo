# LUXE - Static E-commerce Website

A complete e-commerce website built with plain HTML, Tailwind CSS (via CDN), and vanilla JavaScript. No build tools required!

## Quick Start

1. Open `index.html` in your browser
2. Or use any simple local server:
   - VS Code: Install "Live Server" extension, right-click `index.html` → "Open with Live Server"
   - Python: `python -m http.server 8000` then visit `http://localhost:8000`
   - Node.js: `npx serve` then visit the provided URL

## File Structure

```
static-site/
├── index.html          # Homepage
├── shop.html           # Shop/catalog page
├── product.html        # Product detail page
├── checkout.html       # Checkout page
├── css/
│   └── styles.css      # Custom styles
├── js/
│   ├── products.js     # Product data & bank accounts
│   ├── cart.js         # Cart management
│   ├── main.js         # Homepage scripts
│   ├── shop.js         # Shop page scripts
│   ├── product-detail.js # Product page scripts
│   └── checkout.js     # Checkout page scripts
└── README.md           # This file
```

## Features

- ✅ Responsive design (mobile-first)
- ✅ Product catalog with filtering & sorting
- ✅ Product detail pages with size/color selection
- ✅ Shopping cart with localStorage persistence
- ✅ Checkout with bank transfer payment options
- ✅ No build tools or npm required
- ✅ Uses Tailwind CSS via CDN

## Customization

### Adding/Editing Products
Edit `js/products.js` - the `products` array contains all product data.

### Changing Bank Details
Edit `js/products.js` - the `bankAccounts` object contains domestic and international bank details.

### Styling
- Main theme colors are in the Tailwind config in each HTML file's `<head>`
- Custom CSS classes are in `css/styles.css`

### Images
Replace image URLs in `js/products.js` with your own image URLs.

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## Notes

- Cart data persists in browser localStorage
- No backend - this is a frontend-only template
- For production, consider:
  - Hosting images on your own server/CDN
  - Adding a real payment processor
  - Connecting to a backend for order processing
