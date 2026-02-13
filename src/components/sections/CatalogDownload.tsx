'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { CatalogModal } from '@/components/sections/CatalogModal';

export function CatalogDownload() {
  const [open, setOpen] = useState(false);

  return (
    <section id="catalog-download" className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="container relative z-10 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            ¿Quieres ver nuestro <span className="text-blue-300">Tech Pack 2026?</span>
          </h2>
          <p className="text-xl text-blue-100/90 leading-relaxed">
            Descarga nuestro catálogo completo con especificaciones técnicas, precios en divisas y guía de tallas.
          </p>
          
          <Button 
            size="lg" 
            className="h-14 px-8 text-lg bg-white text-primary hover:bg-white/90 shadow-xl mt-4"
            onClick={() => setOpen(true)}
          >
            <FileDown className="mr-2 h-6 w-6" />
            Descargar Catálogo PDF
          </Button>

          <CatalogModal 
            open={open} 
            onOpenChange={setOpen} 
            category="Todos"
          />
        </div>
      </div>
    </section>
  );
}
