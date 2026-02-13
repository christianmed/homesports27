
"use client"

import { useWishlist } from "@/context/WishlistContext";
import { useCurrency } from "@/context/CurrencyContext";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Heart, Send } from "lucide-react";
import Image from "next/image";

interface WishlistSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WishlistSheet({ open, onOpenChange }: WishlistSheetProps) {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { currency, exchangeRate, formatPrice } = useCurrency();

  const calculateTotalUSD = () => {
    return wishlist.reduce((acc, item) => acc + item.price, 0);
  };

  const handleSendToTelegram = () => {
    const totalUSD = calculateTotalUSD();
    let message = `👋 ¡Hola! Estoy interesado en los siguientes productos de Home Sports 27:\n\n`;
    
    wishlist.forEach((item, index) => {
      message += `${index + 1}. **${item.name}** - ${formatPrice(item.price)}\n`;
      message += `   (ID: ${item.id})\n`;
    });

    message += `\n💰 **Total Estimado: $${totalUSD.toFixed(2)} USD**`;
    
    if (currency === 'VES') {
       const totalVES = totalUSD * exchangeRate;
       message += ` / Bs. ${totalVES.toLocaleString('es-VE', { maximumFractionDigits: 2 })}`;
       message += `\nTasa de cambio aprox: Bs. ${exchangeRate.toFixed(2)}/USD\n`;
    }

    message += `\nQuedo atento a su respuesta para concretar. Gracias.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/hs27_info_bot?text=${encodedMessage}`, '_blank');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Heart className="fill-current text-red-500" />
            Mi Lista de Deseos ({wishlist.length})
          </SheetTitle>
          <SheetDescription>
            Tus productos favoritos guardados para cotizar.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-hidden py-4">
            {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg bg-muted/30">
                    <Heart className="h-12 w-12 mb-4 opacity-20" />
                    <p>Tu lista está vacía.</p>
                    <p className="text-sm mt-2">Agrega productos con el ❤️ para consultarlos.</p>
                    <Button variant="link" onClick={() => onOpenChange(false)} className="mt-4">
                        Ir al Catálogo
                    </Button>
                </div>
            ) : (
                <ScrollArea className="h-full pr-4">
                    <div className="space-y-4">
                        {wishlist.map((item) => (
                            <div key={item.id} className="flex gap-4 p-3 rounded-lg border bg-card/50 hover:bg-muted/50 transition-colors">
                                <div className="h-20 w-20 relative rounded-md overflow-hidden bg-muted flex-shrink-0 flex items-center justify-center">
                                     {/* Placeholder fallbacks */}
                                    <Image 
                                        src={item.image} 
                                        alt={item.name} 
                                        fill 
                                        className="object-cover" 
                                        sizes="80px"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-semibold text-sm line-clamp-2">{item.name}</h4>
                                        <p className="text-sm text-primary font-bold">
                                            {formatPrice(item.price)}
                                        </p>
                                    </div>
                                    <div className="flex justify-end">
                                         <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-50"
                                            onClick={() => removeFromWishlist(item.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Eliminar</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            )}
        </div>

        <SheetFooter className="mt-auto border-t pt-4">
            <Button 
                className="w-full gap-2 text-lg h-12" 
                disabled={wishlist.length === 0}
                onClick={handleSendToTelegram}
            >
                <Send className="h-5 w-5" />
                Cotizar en Telegram
            </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
