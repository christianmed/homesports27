
'use client';

import { useState } from 'react';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FileDown, Loader2, CheckCircle2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  phone: z.string().min(10, {
    message: "Ingresa un número de WhatsApp válido.",
  }),
  email: z.string().email({
    message: "Ingresa un correo electrónico válido.",
  }).optional().or(z.literal('')),
});

export function CatalogDownload() {
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Mock API Call / Webhook to n8n
    console.log("Sending to n8n webhook:", values);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSuccess(true);
  }

  const handleDownload = () => {
     // Trigger file download
     window.open('/catalog-2025.pdf', '_blank');
     setOpen(false);
  }

  return (
    <section id="catalog-download" className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="container relative z-10 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            ¿Quieres ver nuestro <span className="text-blue-300">Tech Pack 2026?</span>
          </h2>
          <p className="text-xl text-blue-100/90 leading-relaxed">
            Descarga nuestro catálogo completo con especificaciones técnicas, precios en divisas y guía de tallas.
          </p>
          
          <Dialog open={open} onOpenChange={(val) => {
             setOpen(val);
             if (!val) {
                 setTimeout(() => setIsSuccess(false), 300); // Reset after close
                 form.reset();
             }
          }}>
            <DialogTrigger asChild>
              <Button size="lg" className="h-14 px-8 text-lg bg-white text-primary hover:bg-white/90 shadow-xl mt-4">
                <FileDown className="mr-2 h-6 w-6" />
                Descargar Catálogo PDF
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white text-foreground">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">
                  {isSuccess ? "¡Todo listo!" : "Descarga Inmediata"}
                </DialogTitle>
                <DialogDescription className="text-center">
                  {isSuccess 
                    ? "Tus datos han sido recibidos. Puedes descargar el catálogo ahora." 
                    : "Completa tus datos para recibir el enlace de descarga."}
                </DialogDescription>
              </DialogHeader>

              {isSuccess ? (
                <div className="flex flex-col items-center py-6 space-y-4 animate-in fade-in zoom-in duration-300">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <Button onClick={handleDownload} className="w-full bg-green-600 hover:bg-green-700">
                        <FileDown className="mr-2 h-4 w-4" />
                        Descargar Ahora (PDF 5MB)
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
                          <FormLabel>Nombre Completo</FormLabel>
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
                    <Button type="submit" className="w-full h-11" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Obtener Catálogo
                    </Button>
                  </form>
                </Form>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
