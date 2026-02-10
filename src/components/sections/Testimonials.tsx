
'use client';

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Carlos R.",
    role: "Padre de familia",
    content: "Excelente atención. Compré un guante para mi hijo y me asesoraron en todo momento. El envío a Valencia fue rapidísimo.",
    rating: 5
  },
  {
    name: "Liga Menor Baruta",
    role: "Organización Deportiva",
    content: "Proveedores confiables para nuestra liga. Los bates Marucci 100% originales. Seguiremos comprando aquí.",
    rating: 5
  },
  {
    name: "Miguel A.",
    role: "Pelotero Amateur",
    content: "Buscaba unos spikes específicos y me los consiguieron bajo pedido. Muy profesionales.",
    rating: 4
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-background text-foreground">
      <div className="container px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 text-primary">Lo que dicen nuestros clientes</h2>
        
        <div className="max-w-4xl mx-auto">
            <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full"
            >
            <CarouselContent>
                {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-4">
                    <div className="p-1">
                    <Card className="border-none shadow-md bg-muted/20">
                        <CardContent className="flex flex-col items-center p-6 space-y-4">
                            <div className="flex gap-1 text-yellow-500">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="fill-current w-4 h-4" />
                                ))}
                            </div>
                        <p className="text-sm text-muted-foreground italic">"{testimonial.content}"</p>
                        <div className="text-center">
                            <h4 className="font-bold text-primary">{testimonial.name}</h4>
                            <span className="text-xs text-muted-foreground">{testimonial.role}</span>
                        </div>
                        </CardContent>
                    </Card>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>
        </div>
      </div>
    </section>
  );
}
