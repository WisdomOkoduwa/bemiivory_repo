import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/product/${product.id}`}
      className="block cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-[3/4] mb-4">
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-background/90 px-6 py-2 text-xs tracking-wider uppercase">
            Quick View
          </span>
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-xs tracking-wider uppercase text-muted-foreground">
          {product.category}
        </p>
        <h3 className="font-display text-lg">{product.name}</h3>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm">${product.price.toFixed(2)} USD</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
