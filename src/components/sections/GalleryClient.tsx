'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/data';
import { ProductCard } from '@/components/sections/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CatalogModal } from '@/components/sections/CatalogModal';
import { FileDown, Check, Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/context/CurrencyContext';

interface GalleryClientProps {
  products: Product[];
}

export function GalleryClient({ products }: GalleryClientProps) {
  const categories = ['Todos', 'Guantes', 'Bates', 'Accesorios', 'Calzado'];
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const toggleWishlist = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a skeleton loader
  }



  return (
    <>
      <Tabs defaultValue="Todos" className="w-full mb-12" onValueChange={setActiveCategory}>
        <div className="flex justify-center mb-8">
          <TabsList className="bg-background border flex flex-wrap justify-center h-auto gap-2 p-1">
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat} className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-grow md:flex-grow-0">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value={activeCategory} className="mt-0">
          <motion.div 
             key={activeCategory}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4 }}
             className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
          >
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </motion.div>
           {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No hay productos en esta categoría por ahora.</p>
              </div>
            )}
        </TabsContent>
      </Tabs>
      
      <div className="text-center mt-12">
         {/* Context-Aware Download Button */}
         <Button 
            className="h-14 px-8 text-lg shadow-xl bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => setCatalogOpen(true)}
         >
           <FileDown className="mr-2 h-6 w-6" />
           {activeCategory === 'Todos' ? 'Descargar Catálogos' : `Descargar Catálogo de ${activeCategory}`}
         </Button>
      </div>

      <CatalogModal 
        open={catalogOpen} 
        onOpenChange={setCatalogOpen} 
        category={activeCategory}
      />

      {/* Global Product Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="w-[90vw] max-w-[500px] max-h-[80vh] overflow-y-auto p-4 rounded-xl gap-0">
          {selectedProduct && (
            <>
              <DialogHeader className="mb-2 space-y-1">
                <DialogTitle className="text-lg md:text-2xl line-clamp-1 text-left">{selectedProduct.name}</DialogTitle>
                <DialogDescription className="text-left text-xs md:text-sm">
                  SKU: {selectedProduct.id}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-3 md:gap-6 md:grid-cols-2 mt-2">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden mx-auto w-full max-w-[200px] md:max-w-none">
                   {/* Product Image Placeholder */}
                   <Image 
                     src={selectedProduct.image} 
                     alt={selectedProduct.name} 
                     fill 
                     className="object-cover"
                     sizes="(max-width: 768px) 100vw, 300px"
                   />
                   
                    <Button
                     variant="ghost"
                     size="icon"
                     className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full z-10"
                     onClick={(e) => toggleWishlist(e, selectedProduct)}
                   >
                    <Heart className={`h-5 w-5 ${isInWishlist(selectedProduct.id) ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
                  </Button>
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">{selectedProduct.category}</Badge>
                    <span className="text-xl font-bold text-primary">
                      {formatPrice(selectedProduct.price)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedProduct.description || "Descripción detallada del producto no disponible."}
                  </p>
                  
                  {selectedProduct.features && (
                    <ul className="text-xs space-y-1 text-gray-500">
                      {selectedProduct.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-green-500" /> {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="mt-auto pt-4 flex flex-col gap-2">
                    <Button className="w-full" asChild>
                      <a 
                        href={`https://wa.me/584120000000?text=Hola,%20me%20interesa%20el%20producto:%20${selectedProduct.name}%20(ID:%20${selectedProduct.id})`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Consultar Disponibilidad
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => setSelectedProduct(null)}>
                      Cerrar
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
