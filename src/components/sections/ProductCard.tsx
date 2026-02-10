
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { MessageCircle, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const telegramUrl = `https://t.me/TuBot?start=consultar_${product.id}`;

  return (
    <Dialog>
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-border/50 hover:border-primary/50 hover:-translate-y-2 cursor-pointer bg-card/50 backdrop-blur-sm">
        <div className="relative aspect-square bg-muted overflow-hidden">
           {/* Placeholder for image - using gradient for now if image fails or generic */}
           <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-muted-foreground group-hover:scale-105 transition-transform duration-500">
             <span className="text-4xl">⚾</span>
           </div>
           {/* <Image 
            src={product.image} 
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          /> */}
        </div>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <Badge variant="secondary" className="mb-2">{product.category}</Badge>
            <span className="font-bold text-primary">{product.price}</span>
          </div>
          <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="line-clamp-2 text-sm mt-1">{product.description}</CardDescription>
        </CardHeader>
        <CardFooter className="p-4 pt-0">
          <DialogTrigger asChild>
            <Button className="w-full">Ver Detalles</Button>
          </DialogTrigger>
        </CardFooter>
      </Card>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
          <DialogDescription>
            SKU: {product.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4 md:grid-cols-2">
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
             <span className="text-6xl">⚾</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-2xl font-bold text-primary">{product.price}</div>
            <p className="text-muted-foreground">
              {product.description}
            </p>
            <div>
              <h4 className="font-medium mb-2">Características:</h4>
              <ul className="grid gap-1">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between gap-4">
            <div className="text-xs text-muted-foreground flex items-center">
              * Precios sujetos a tasa del día.
            </div>
            <Button className="w-full sm:w-auto bg-[#0088cc] hover:bg-[#0077b5]" asChild>
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
