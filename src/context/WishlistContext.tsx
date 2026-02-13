
"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

// Define a flexible Product type that works with current static data and future Sanity data
export interface Product {
  id: string; 
  name: string;
  price: number;
  image: string; 
  category: string;
  description?: string;
  features?: string[];
}

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('hsp_wishlist');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migration: Ensure price is number
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sanitized = parsed.map((item: any) => ({
          ...item,
          price: typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : item.price
        }));
        setWishlist(sanitized);
      } catch (e) {
        console.error("Failed to parse wishlist", e);
      }
    }
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('hsp_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    setWishlist(prev => {
      if (prev.some(p => p.id === product.id)) return prev;
      toast.success("Producto agregado a la lista de deseos ❤️");
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(p => p.id !== productId));
    toast.info("Producto eliminado");
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
