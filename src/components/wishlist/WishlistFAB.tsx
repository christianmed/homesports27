
"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { Badge } from '@/components/ui/badge';
import { WishlistSheet } from './WishlistSheet';
import { motion, AnimatePresence } from 'framer-motion';

export function WishlistFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const { wishlist } = useWishlist();
  const [isVisible, setIsVisible] = useState(false);

  // Show button only when there are items or after scrolling a bit
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100 || wishlist.length > 0);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially

    return () => window.removeEventListener('scroll', handleScroll);
  }, [wishlist.length]);

  return (
    <>
      <AnimatePresence>
        {(isVisible || wishlist.length > 0) && (
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="fixed bottom-6 right-6 z-50 pointer-events-auto"
            >
                <Button 
                size="icon" 
                className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-white/20 relative"
                onClick={() => setIsOpen(true)}
                title="Ver Lista de Deseos"
                >
                <Heart className={`h-6 w-6 ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                {wishlist.length > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center p-0 text-xs rounded-full border-2 border-background animate-in zoom-in">
                    {wishlist.length}
                    </Badge>
                )}
                </Button>
            </motion.div>
        )}
      </AnimatePresence>

      <WishlistSheet open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
