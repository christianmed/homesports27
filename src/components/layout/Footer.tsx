
'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if(email && name) {
        // Mock sub
        setIsSubscribed(true);
        setTimeout(() => {
            setEmail('');
            setName('');
            setIsSubscribed(false);
        }, 3000);
    }
  };

  return (
    <footer className="w-full bg-[#001122] text-slate-300 border-t border-white/10 pt-16 pb-8">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-white tracking-tighter uppercase">HOME SPORTS 27</h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Equipando a las futuras estrellas del béisbol venezolano con las mejores marcas del mundo.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="hover:text-white transition-colors"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></Link>
            </div>
          </div>

          {/* Col 2: Shop */}
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wide">TIENDA</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#gallery" className="hover:text-white transition-colors">Guantes</Link></li>
              <li><Link href="#gallery" className="hover:text-white transition-colors">Bates</Link></li>
              <li><Link href="#gallery" className="hover:text-white transition-colors">Cascos</Link></li>
              <li><Link href="#gallery" className="hover:text-white transition-colors">Liquidación</Link></li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wide">SOPORTE</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/envios" className="hover:text-white transition-colors">Envíos a Venezuela</Link></li>
              <li><Link href="/pagos" className="hover:text-white transition-colors">Métodos de Pago</Link></li>
              <li><Link href="/garantia" className="hover:text-white transition-colors">Garantía y Cambios</Link></li>
              <li><Link href="https://wa.me/584141234567" target="_blank" className="hover:text-white transition-colors">Atención al Cliente</Link></li>
            </ul>
          </div>

          {/* Col 4: VIP Club */}
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              CLUB VIP ⚾
            </h4>
            <p className="text-sm text-slate-400">
              Únete y recibe <strong>5% OFF</strong> en tu primera compra + ofertas exclusivas.
            </p>
            
            {isSubscribed ? (
                <div className="bg-green-900/30 border border-green-800 text-green-400 p-3 rounded text-sm text-center">
                    ¡Gracias por unirte al equipo!
                </div>
            ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                    <Input 
                        placeholder="Tu Nombre" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-9"
                        required
                    />
                    <Input 
                        placeholder="Tu Correo" 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-9"
                        required
                    />
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-9">
                        Suscribirme
                    </Button>
                </form>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Home Sports 27. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white">Privacidad</Link>
            <Link href="#" className="hover:text-white">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
