
"use client"

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, MessageCircle, Heart } from 'lucide-react';
import { CurrencySwitch } from '@/components/ui/currency-switch';
import { WishlistSheet } from '@/components/wishlist/WishlistSheet';
import { useWishlist } from '@/context/WishlistContext';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { wishlist } = useWishlist();

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Productos', href: '#gallery' },
    { name: 'Marcas', href: '#brands' },
    { name: 'Testimonios', href: '#testimonials' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="text-2xl font-black text-primary tracking-tighter uppercase">
              CASA DEL BATE
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <CurrencySwitch />
            
            <Button variant="outline" asChild>
              <Link href="#catalog-download">
                Descargar Catálogo
              </Link>
            </Button>
            <Button asChild className="gap-2">
              <Link href="https://t.me/TuBot" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Chatbot Telegram
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
             <div className="mr-2">
                <CurrencySwitch />
             </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-4 mt-8 px-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-base font-medium hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="h-px bg-border my-2" />
                  
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link href="#catalog-download">
                      Descargar Catálogo
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <WishlistSheet open={isWishlistOpen} onOpenChange={setIsWishlistOpen} />
    </>
  );
}
