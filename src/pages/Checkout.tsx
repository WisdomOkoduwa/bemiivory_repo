import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, CreditCard, Building2, Landmark, Copy, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

interface BankDetailsProps {
  bankName: string;
  accountName: string;
  accountNumber: string;
  routingNumber?: string;
  swiftCode?: string;
  bankAddress: string;
  isInternational?: boolean;
}

const BankDetails = ({
  bankName,
  accountName,
  accountNumber,
  routingNumber,
  swiftCode,
  bankAddress,
  isInternational = false,
}: BankDetailsProps) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} copied to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const CopyButton = ({ text, field }: { text: string; field: string }) => (
    <button
      type="button"
      onClick={() => copyToClipboard(text, field)}
      className="p-1 hover:bg-muted rounded transition-colors"
    >
      {copiedField === field ? (
        <Check size={14} className="text-green-600" />
      ) : (
        <Copy size={14} className="text-muted-foreground" />
      )}
    </button>
  );

  return (
    <div className="bg-muted/50 border border-border p-6 mt-4 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        {isInternational ? <Landmark size={20} /> : <Building2 size={20} />}
        <span className="font-display text-sm uppercase tracking-wider">
          {isInternational ? 'International Wire Details' : 'Bank Transfer Details'}
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Bank Name</span>
          <div className="flex items-center gap-2">
            <span className="font-medium">{bankName}</span>
            <CopyButton text={bankName} field="Bank Name" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Account Name</span>
          <div className="flex items-center gap-2">
            <span className="font-medium">{accountName}</span>
            <CopyButton text={accountName} field="Account Name" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Account Number</span>
          <div className="flex items-center gap-2">
            <span className="font-medium font-mono">{accountNumber}</span>
            <CopyButton text={accountNumber} field="Account Number" />
          </div>
        </div>

        {routingNumber && (
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Routing Number</span>
            <div className="flex items-center gap-2">
              <span className="font-medium font-mono">{routingNumber}</span>
              <CopyButton text={routingNumber} field="Routing Number" />
            </div>
          </div>
        )}

        {swiftCode && (
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">SWIFT/BIC Code</span>
            <div className="flex items-center gap-2">
              <span className="font-medium font-mono">{swiftCode}</span>
              <CopyButton text={swiftCode} field="SWIFT Code" />
            </div>
          </div>
        )}

        <div className="flex justify-between items-start pt-2 border-t border-border">
          <span className="text-muted-foreground">Bank Address</span>
          <div className="flex items-start gap-2 text-right">
            <span className="font-medium max-w-[200px]">{bankAddress}</span>
            <CopyButton text={bankAddress} field="Bank Address" />
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
        Please include your order number in the payment reference. Your order will be processed once payment is confirmed (1-3 business days).
      </p>
    </div>
  );
};

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const shippingCost = totalPrice > 500 ? 0 : 25;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shippingCost + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast.success('Order placed successfully! Thank you for your purchase.');
    clearCart();
    setIsProcessing(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="heading-section mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some items to proceed to checkout.</p>
          <Link to="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container py-6">
          <Link to="/" className="font-display text-xl tracking-[0.15em] uppercase">
            Desirée
          </Link>
        </div>
      </header>

      <main className="container py-8 md:py-12">
        <Link
          to="/shop"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft size={16} />
          <span>Back to Shop</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Checkout Form */}
          <div>
            <h1 className="heading-section mb-8">Checkout</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact */}
              <div className="space-y-4">
                <h2 className="text-lg font-display">Contact Information</h2>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required className="mt-1" />
                </div>
              </div>

              {/* Shipping */}
              <div className="space-y-4">
                <h2 className="text-lg font-display">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required className="mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" required className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" required className="mt-1" />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h2 className="text-lg font-display">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 border border-border p-4 cursor-pointer hover:border-foreground transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard size={20} />
                      Credit / Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border border-border p-4 cursor-pointer hover:border-foreground transition-colors">
                    <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                    <Label htmlFor="bank_transfer" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Building2 size={20} />
                      Bank Transfer
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border border-border p-4 cursor-pointer hover:border-foreground transition-colors">
                    <RadioGroupItem value="wire" id="wire" />
                    <Label htmlFor="wire" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Landmark size={20} />
                      Wire Transfer (International)
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required className="mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required className="mt-1" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'bank_transfer' && (
                  <BankDetails
                    bankName="Desirée Fashion Bank"
                    accountName="Desirée Iyama Ltd."
                    accountNumber="1234567890"
                    routingNumber="021000021"
                    bankAddress="123 Fashion Ave, New York, NY 10001"
                  />
                )}

                {paymentMethod === 'wire' && (
                  <BankDetails
                    bankName="International Fashion Bank"
                    accountName="Desirée Iyama Ltd."
                    accountNumber="GB82 WEST 1234 5698 7654 32"
                    swiftCode="DESIUSNY"
                    bankAddress="456 Luxury Lane, London, UK EC1A 1BB"
                    isInternational
                  />
                )}
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                {isProcessing ? 'Processing...' : `Pay $${finalTotal.toFixed(2)}`}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:pl-8 lg:border-l border-border">
            <h2 className="text-lg font-display mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                  <div className="w-16 h-20 bg-muted overflow-hidden relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-foreground text-primary-foreground text-xs flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-display">{item.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.selectedSize} / {item.selectedColor}
                    </p>
                  </div>
                  <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-medium pt-3 border-t border-border">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)} USD</span>
              </div>
            </div>

            {totalPrice < 500 && (
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Free shipping on orders over $500
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
