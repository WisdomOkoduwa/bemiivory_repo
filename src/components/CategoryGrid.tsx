import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Bridal',
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=600&q=80',
    href: '/shop?category=Bridal',
  },
  {
    name: 'Minis',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80',
    href: '/shop?category=Minis',
  },
  {
    name: 'Midis',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
    href: '/shop?category=Midis',
  },
  {
    name: 'Maxis',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
    href: '/shop?category=Maxis',
  },
];

const CategoryGrid = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <h2 className="heading-section text-center mb-12 md:mb-16">Shop by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.href}
              className="group relative aspect-[3/4] overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-end justify-center pb-8">
                <h3 className="text-primary-foreground text-lg md:text-xl tracking-[0.15em] uppercase font-display">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
