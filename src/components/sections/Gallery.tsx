
'use client';

import { useState } from 'react';
import { products } from '@/lib/data';
import { ProductCard } from '@/components/sections/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function Gallery() {
  const categories = ['Todos', 'Guantes', 'Bates', 'Accesorios', 'Calzado'];
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="gallery" className="py-32 bg-muted/30">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 tracking-tight">Nuestro Catálogo</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explora nuestra selección de equipos de béisbol de alta gama. Pasión y calidad en cada detalle.
          </p>
        </div>

        <Tabs defaultValue="Todos" className="w-full mb-12" onValueChange={setActiveCategory}>
          <div className="flex justify-start md:justify-center mb-8 overflow-x-auto pb-4 scrollbar-hide">
            <TabsList className="bg-background border flex w-max mx-auto md:w-auto md:mx-0">
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat} className="px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
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
               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
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
           <Button variant="outline" size="lg" asChild>
             <a href="https://t.me/TuBot" target="_blank">
               Ver catálogo completo en Telegram
             </a>
           </Button>
        </div>
      </div>
    </section>
  );
}
