import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, totalPrice, updateQuantity, removeFromCart } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="font-display text-xl tracking-wider uppercase flex items-center gap-2">
            <ShoppingBag size={20} strokeWidth={1.5} />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <ShoppingBag size={48} strokeWidth={1} className="text-muted-foreground mb-4" />
            <h3 className="font-display text-lg mb-2">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Discover our collection of beautiful pieces
            </p>
            <Link to="/shop" onClick={() => setIsCartOpen(false)}>
              <Button variant="default">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-6 space-y-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                  <div className="w-24 h-32 bg-muted overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-display text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.selectedSize} / {item.selectedColor}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Remove item"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                          className="p-2 hover:bg-muted transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                          className="p-2 hover:bg-muted transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)} USD</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Shipping & taxes calculated at checkout
              </p>
              <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                <Button className="w-full" size="lg">
                  Checkout
                </Button>
              </Link>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
