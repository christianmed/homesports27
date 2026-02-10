
"use client"

import { useCurrency } from "@/context/CurrencyContext";
import { motion } from "framer-motion";

export function CurrencySwitch() {
  const { currency, toggleCurrency, isLoading } = useCurrency();

  if (isLoading) return null;

  return (
    <div 
      className="flex items-center bg-muted/50 rounded-full p-1 w-[140px] relative cursor-pointer"
      onClick={toggleCurrency}
      role="button"
      tabIndex={0}
      title="Cambiar Moneda"
    >
      {/* Active Background Pill */}
      <motion.div
        className="absolute top-1 bottom-1 bg-background rounded-full shadow-sm z-0"
        initial={false}
        animate={{
          x: currency === 'USD' ? 0 : 66, // Slide distance
          width: 66, // Width of half container approx
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />

      {/* USD Option */}
      <div className={`relative z-10 flex-1 text-center text-xs font-bold transition-colors ${currency === 'USD' ? 'text-primary' : 'text-muted-foreground'}`}>
        $ USD
      </div>

      {/* VES Option */}
      <div className={`relative z-10 flex-1 text-center text-xs font-bold transition-colors ${currency === 'VES' ? 'text-primary' : 'text-muted-foreground'}`}>
        Bs. VES
      </div>
    </div>
  );
}
