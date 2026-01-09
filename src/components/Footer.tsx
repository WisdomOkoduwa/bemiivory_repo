import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-12 md:py-16 border-t border-border">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-xl tracking-[0.15em] uppercase mb-4">Desirée</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Contemporary occasionwear designed for life's most beautiful moments.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-4 font-medium">Shop</h4>
            <ul className="space-y-3">
              {['Bridal', 'Minis', 'Midis', 'Maxis', 'New Arrivals'].map((item) => (
                <li key={item}>
                  <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-4 font-medium">Client Services</h4>
            <ul className="space-y-3">
              {['Contact Us', 'Shipping', 'Returns', 'Size Guide', 'FAQs'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-4 font-medium">About</h4>
            <ul className="space-y-3">
              {['Our Story', 'Sustainability', 'Press', 'Careers'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 Desirée. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
