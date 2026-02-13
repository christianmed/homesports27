'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { FileDown, Loader2, CheckCircle2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  phone: z.string().min(10, {
    message: "Ingresa un número de WhatsApp válido.",
  }),
  category: z.string().min(1, {
    message: "Selecciona una categoría.",
  }),
});

interface CatalogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: string; // If provided, pre-selects and hides dropdown (or shows as read-only)
}

export function CatalogModal({ open, onOpenChange, category }: CatalogModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      category: category === 'Todos' ? "" : category || "",
    },
  });

  // Update form default value if category prop changes
  useEffect(() => {
    if (category && category !== 'Todos') {
        form.setValue('category', category);
    } else {
        form.setValue('category', "");
    }
  }, [category, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Mock API Call / Webhook
    console.log("Lead Captured:", values);
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSuccess(true);
  }

  const handleDownload = () => {
     // In a real app, this would use logic to pick the correct PDF based on form.getValues('category')
     // For now, we mock it.
     const selectedCat = form.getValues('category');
     console.log(`Downloading catalog for: ${selectedCat}`);
     
     // Redirect to WhatsApp with pre-filled message as a fallback/lead-magnet flow
     // or actually download a file if we had one. 
     // User request: "se descargue el catalogo" -> implied immediate download.
     // But we don't have files. I'll mock a download alert or open a generic PDF.
     
     // Let's open a WhatsApp intent for now as it guarantees value (the business gets the contact)
     // and the user gets "something".
     // "Hola, acabo de descargar el catálogo de [Categoria], mi nombre es [Nombre]"
     const msg = `Hola, quiero recibir el catálogo de *${selectedCat}*. Mi nombre es ${form.getValues('name')}.`;
     window.open(`https://wa.me/584120000000?text=${encodeURIComponent(msg)}`, '_blank');

     onOpenChange(false);
     setTimeout(() => setIsSuccess(false), 500);
     form.reset();
  }

  const isCategoryFixed = category && category !== 'Todos';

  return (
    <Dialog open={open} onOpenChange={(val) => {
        onOpenChange(val);
        if (!val) {
            setTimeout(() => setIsSuccess(false), 300);
            form.reset();
        }
    }}>
      <DialogContent className="sm:max-w-[425px] bg-white text-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {isSuccess ? "¡Solicitud Recibida!" : "Descargar Catálogo"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isSuccess 
              ? "Te enviaremos el catálogo digital a tu WhatsApp enseguida." 
              : `Completa tus datos para obtener el catálogo${isCategoryFixed ? ' de ' + category : ''}.`}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center py-6 space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <Button onClick={handleDownload} className="w-full bg-green-600 hover:bg-green-700">
                  <FileDown className="mr-2 h-4 w-4" />
                  Abrir WhatsApp para Recibir
              </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre y Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Juan Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. 04141234567" {...field} type="tel" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {!isCategoryFixed && (
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoría de Interés</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una opción" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Guantes">Guantes</SelectItem>
                            <SelectItem value="Bates">Bates</SelectItem>
                            <SelectItem value="Accesorios">Accesorios</SelectItem>
                            <SelectItem value="Calzado">Calzado</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              )}

              <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Obtener Catálogo
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
