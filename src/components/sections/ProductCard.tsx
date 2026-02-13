'use client';

import { Product } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/context/CurrencyContext';
import { MouseEvent } from 'react';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  const handleWishlistClick = (e: MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Card 
      onClick={onClick}
      className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-border/50 hover:border-primary/50 hover:-translate-y-1 cursor-pointer bg-card/50 backdrop-blur-sm relative h-full flex flex-col"
    >
      <div className="relative aspect-square bg-muted overflow-hidden">
          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/50 hover:bg-white rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleWishlistClick}
          >
            <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
          </Button>

          <div className="w-full h-full relative group-hover:scale-110 transition-transform duration-500">
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          <Badge className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white border-0">
            {product.category}
          </Badge>
      </div>
      
      <CardFooter className="p-3 md:p-4 flex flex-col items-start gap-1 flex-grow">
        <h3 className="font-bold text-base md:text-lg line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
        <p className="font-medium text-muted-foreground text-sm md:text-base">
          {formatPrice(product.price)}
        </p>
      </CardFooter>
    </Card>
  );
}
