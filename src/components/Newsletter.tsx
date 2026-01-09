import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <section className="py-16 md:py-24 bg-foreground text-primary-foreground">
      <div className="container max-w-xl text-center">
        <h2 className="font-display text-2xl md:text-3xl mb-4">Join Our World</h2>
        <p className="text-sm text-primary-foreground/70 mb-8">
          Be the first to know about new arrivals, exclusive offers, and special events.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 flex-1"
          />
          <Button variant="secondary" type="submit" className="px-8">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
