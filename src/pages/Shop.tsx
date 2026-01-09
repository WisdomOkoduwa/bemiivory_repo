import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';
import { products, categories } from '@/data/products';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Header />
      
      <main className="py-12 md:py-16">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="heading-display mb-4">
              {selectedCategory === 'All' ? 'Shop All' : selectedCategory}
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover our collection of contemporary occasionwear, designed for life's most beautiful moments.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 border-b border-border pb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`text-sm tracking-wider uppercase transition-all duration-300 pb-1 border-b-2 ${
                  selectedCategory === category
                    ? 'text-foreground border-foreground'
                    : 'text-muted-foreground border-transparent hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Shop;
