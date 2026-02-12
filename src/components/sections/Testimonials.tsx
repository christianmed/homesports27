'use client';

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel"
import { Star, Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Carlos R.",
    role: "Padre de familia",
    content: "Excelente atención. Compré un guante para mi hijo y me asesoraron en todo momento. El envío a Valencia fue rapidísimo.",
    rating: 5,
    initials: "CR"
  },
  {
    id: 2,
    name: "Liga Menor Baruta",
    role: "Organización Deportiva",
    content: "Proveedores confiables. Los bates Marucci 100% originales. Seguiremos comprando aquí por la seguridad.",
    rating: 5,
    initials: "LM"
  },
  {
    id: 3,
    name: "Miguel A.",
    role: "Pelotero Amateur",
    content: "Buscaba unos spikes específicos y me los consiguieron bajo pedido. Muy profesionales y atentos por WhatsApp.",
    rating: 4,
    initials: "MA"
  },
  {
    id: 4,
    name: "Academia Future Stars",
    role: "Cliente Corporativo",
    content: "Equipamos a toda la academia con Home Sports 27. La calidad de la utilería es de Grandes Ligas. Recomendados.",
    rating: 5,
    initials: "AF"
  },
  {
    id: 5,
    name: "Roberto P.",
    role: "Entrenador",
    content: "La mejor variedad de guantes Wilson en Caracas. Precios competitivos y gran stock.",
    rating: 5,
    initials: "RP"
  }
];

export function Testimonials() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
/*...*/

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section id="testimonials" className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Historias Reales</h2>
          <p className="text-muted-foreground text-lg">Clientes que confiaron su juego en nosotros</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Gradients para efecto de desvanecimiento lateral */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 z-10 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 z-10 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 py-8">
              {testimonials.map((t, index) => {
                const isActive = index === current

                return (
                  <CarouselItem key={index} className="pl-4 basis-[85%] md:basis-1/2 lg:basis-1/3">
                    <div className={cn(
                      "transition-all duration-300 ease-out transform h-full p-2",
                      isActive ? "scale-105 opacity-100 z-10" : "scale-90 opacity-50 grayscale-[0.5]"
                    )}>
                      <Card className={cn(
                        "border-none h-full relative overflow-hidden transition-shadow duration-300",
                        isActive ? "shadow-lg ring-1 ring-blue-100 bg-white" : "shadow-sm bg-slate-50/50"
                      )}>
                        <Quote className="absolute top-6 right-6 h-12 w-12 text-blue-50/50 -rotate-12" />
                        
                        <CardContent className="flex flex-col gap-6 p-6 md:p-8 h-auto min-h-[280px] md:h-[320px] justify-between">
                          <div className="space-y-4">
                            <div className="flex gap-1 justify-center">
                              {Array.from({ length: t.rating }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-500" />
                              ))}
                            </div>
                            <p className="text-slate-600 font-medium leading-relaxed line-clamp-4">
                              &quot;{t.content}&quot;
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-4 pt-4 border-t border-slate-100/50">
                            <Avatar className="h-10 w-10 border border-slate-100">
                              <AvatarImage src={`https://ui-avatars.com/api/?name=${t.initials}&background=003366&color=fff`} alt={t.name} />
                              <AvatarFallback className="bg-primary/10 text-primary font-bold">{t.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-bold text-sm text-slate-900">{t.name}</p>
                              <p className="text-xs text-primary font-medium uppercase tracking-wide">{t.role}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            
            {/* Controls moved to bottom */}
            <div className="flex items-center justify-center gap-4 mt-8">
               <CarouselPrevious className="static transform-none translate-x-0 translate-y-0" />
               <div className="flex gap-2">
                {testimonials.map((_, index) => (
                   <button
                     key={index}
                     onClick={() => api?.scrollTo(index)}
                     className={cn(
                       "h-2 rounded-full transition-all duration-300",
                       current === index ? "w-8 bg-primary" : "w-2 bg-slate-300 hover:bg-slate-400"
                     )}
                   />
                ))}
               </div>
               <CarouselNext className="static transform-none translate-x-0 translate-y-0" />
            </div>
          </Carousel>
          

        </div>
      </div>
    </section>
  )
}
