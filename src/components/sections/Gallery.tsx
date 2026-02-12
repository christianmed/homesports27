import { products } from '@/lib/data';
import { GalleryClient } from '@/components/sections/GalleryClient';

export function Gallery() {
  return (
    <section id="gallery" className="py-32 bg-muted/30">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 tracking-tight">Productos Destacados</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explora nuestra selección de equipos de béisbol de alta gama destacados.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Pasión y calidad en cada detalle.
          </p>
        </div>

        <GalleryClient products={products} />
      </div>
    </section>
  );
}
