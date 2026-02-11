
'use client';

import { Product } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { MessageCircle, Check, Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { MouseEvent } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const telegramUrl = `https://t.me/TuBot?start=consultar_${product.id}`;
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isLiked = isInWishlist(product.id);

  const handleWishlistToggle = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <Dialog>
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-border/50 hover:border-primary/50 hover:-translate-y-1 cursor-pointer bg-card/50 backdrop-blur-sm relative h-full flex flex-col">
        <div className="relative aspect-square bg-muted overflow-hidden">
           {/* Wishlist Button */}
           <Button
             variant="ghost"
             size="icon"
             className="absolute top-1 right-1 z-10 bg-white/50 backdrop-blur-sm hover:bg-white/80 rounded-full h-8 w-8"
             onClick={handleWishlistToggle}
             title={isLiked ? "Eliminar de favoritos" : "Agregar a favoritos"}
           >
             <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
           </Button>

           {/* Placeholder for image - using gradient for now if image fails or generic */}
           <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-muted-foreground group-hover:scale-105 transition-transform duration-500">
             <span className="text-3xl md:text-5xl">⚾</span>
           </div>
           {/* <Image 
            src={product.image} 
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          /> */}
        </div>
        <CardHeader className="p-3 pb-0 flex-grow">
          <div className="flex flex-col gap-1 items-start">
            <Badge variant="secondary" className="text-[10px] px-1.5 h-5">{product.category}</Badge>
            <span className="font-bold text-primary text-sm md:text-base">{product.price}</span>
          </div>
          <CardTitle className="text-sm md:text-lg line-clamp-2 mt-1 leading-tight">{product.name}</CardTitle>
          <CardDescription className="line-clamp-2 text-xs mt-1 hidden md:block">{product.description}</CardDescription>
        </CardHeader>
        <CardFooter className="p-3 pt-3 mt-auto">
          <DialogTrigger asChild>
            <Button className="w-full text-xs h-8 md:h-10 md:text-sm">Ver Detalles</Button>
          </DialogTrigger>
        </CardFooter>
      </Card>

      <DialogContent className="w-[90vw] max-w-[500px] max-h-[80vh] overflow-y-auto p-4 rounded-xl gap-0">
        <DialogHeader className="mb-2 space-y-1">
          <DialogTitle className="text-lg md:text-2xl line-clamp-1 text-left">{product.name}</DialogTitle>
          <DialogDescription className="text-left text-xs md:text-sm">
            SKU: {product.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-3 md:gap-6 md:grid-cols-2 mt-2">
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden mx-auto w-full max-w-[200px] md:max-w-none">
             {/* Product Image Placeholder */}
             <span className="text-6xl md:text-8xl">⚾</span>
          </div>
          
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="text-2xl md:text-3xl font-bold text-primary">{product.price}</div>
            
            <p className="text-sm text-muted-foreground leading-relaxed hidden md:block">
              {product.description}
            </p>
            {/* Mobile Description (Shortened) */}
            <p className="text-sm text-muted-foreground leading-relaxed md:hidden line-clamp-3">
              {product.description}
            </p>

            <div className="mt-2">
              <h4 className="font-medium mb-2 text-sm md:text-base">Características:</h4>
              <ul className="grid gap-1.5">
                {product.features?.slice(0, 4).map((feature, i) => (
                  <li key={i} className="flex items-center text-xs md:text-sm text-muted-foreground">
                    <Check className="mr-2 h-3 w-3 md:h-4 md:w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-3 sm:justify-between sm:flex-row mt-4">
            <div className="text-[10px] md:text-xs text-muted-foreground flex items-center">
              * Precios sujetos a tasa del día.
            </div>
            <Button className="w-full sm:w-auto text-sm h-10" asChild>
              <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                Consultar en Telegram
              </a>
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
