
'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, MapPin, Truck, CreditCard } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[90dvh] flex items-center justify-center overflow-hidden bg-[#001f3f]">
      {/* Background Gradient/Overlay */}
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero.jpeg" 
          alt="Baseball Stadium Hero Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>

      {/* Background Gradient/Overlay (Legacy - Commented out)
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-10" />
      <div className="absolute inset-0 z-0 opacity-60 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#004080] via-[#001f3f] to-black" />
      */}
      
      {/* Content */}
      <div className="container relative z-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block py-1 px-3 rounded-full bg-primary/20 text-white text-sm font-medium mb-6 border border-white/20">
            ⚾ Nueva Colección 2026
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-lg">
            EQUÍPATE COMO UN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              PROFESIONAL
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            La tienda de confianza para el pelotero venezolano. Guantes, bates y accesorios de las mejores marcas importadas.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" className="h-12 px-8 text-lg w-full sm:w-auto" asChild>
              <Link href="#gallery">
                Ver Productos <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-lg w-full sm:w-auto border-white/30 bg-white/5 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm" asChild>
              <Link href="https://t.me/TuBot" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Chatbot Telegram
              </Link>
            </Button>
          </div>

          {/* Trust Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto border-t border-white/10 pt-8">
            <div className="flex items-center justify-center gap-3 text-gray-300">
              <div className="p-2 rounded-full bg-white/5">
                <MapPin className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-white text-sm">Tienda Física</p>
                <p className="text-xs text-gray-400">Caracas, Venezuela</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 text-gray-300">
              <div className="p-2 rounded-full bg-white/5">
                <Truck className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-white text-sm">Envíos Nacionales</p>
                <p className="text-xs text-gray-400">Zoom / MRW / Tealca</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 text-gray-300">
              <div className="p-2 rounded-full bg-white/5">
                <CreditCard className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-white text-sm">Pagos Fáciles</p>
                <p className="text-xs text-gray-400">Zelle / Pago Móvil / Cash</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative blurry blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl -z-10" />
    </section>
  );
}
