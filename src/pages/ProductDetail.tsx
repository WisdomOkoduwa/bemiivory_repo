import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [currentImage, setCurrentImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-section mb-4">Product not found</h1>
          <Link to="/shop" className="text-muted-foreground hover:text-foreground link-underline">
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  const images = [product.image, product.hoverImage].filter(Boolean) as string[];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }
    addToCart(product, selectedSize, selectedColor);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Header />

      <main className="py-8 md:py-12">
        <div className="container">
          {/* Breadcrumb */}
          <Link
            to="/shop"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ChevronLeft size={16} />
            <span>Back to Shop</span>
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={images[currentImage]}
                  alt={product.name}
                  className="w-full h-full object-cover animate-fade-in"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-4">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`w-20 h-24 overflow-hidden border-2 transition-all ${
                        currentImage === idx ? 'border-foreground' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="lg:py-8">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                {product.category}
              </p>
              <h1 className="font-display text-3xl md:text-4xl mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xl">${product.price.toFixed(2)} USD</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {product.description && (
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {product.description}
                </p>
              )}

              {/* Color Selection */}
              <div className="mb-6">
                <p className="text-sm tracking-wider uppercase mb-3">
                  Color: <span className="text-muted-foreground">{selectedColor || 'Select'}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-sm border transition-all ${
                        selectedColor === color
                          ? 'border-foreground bg-foreground text-primary-foreground'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <p className="text-sm tracking-wider uppercase mb-3">
                  Size: <span className="text-muted-foreground">{selectedSize || 'Select'}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-10 text-sm border transition-all ${
                        selectedSize === size
                          ? 'border-foreground bg-foreground text-primary-foreground'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      {size.replace('UK ', '')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <Button onClick={handleAddToCart} size="lg" className="w-full mb-4">
                Add to Bag
              </Button>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-border space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Worldwide Delivery</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Returns</span>
                  <span>14-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default ProductDetail;
