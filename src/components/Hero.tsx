import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HeroProps {
  heroImage: string;
}

const Hero = ({ heroImage }: HeroProps) => {
  return (
    <section className="relative h-[85vh] md:h-[90vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Featured Collection"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
      </div>
      
      <div className="relative h-full flex flex-col items-center justify-end pb-16 md:pb-24 text-center text-primary-foreground">
        <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-3 animate-fade-in">
          Limited Pieces
        </p>
        <h2 className="heading-display mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Occasionwear<br />Reimagined
        </h2>
        <Link to="/shop">
          <Button variant="hero" size="lg" className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Shop Collection
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
