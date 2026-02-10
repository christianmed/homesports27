
export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: 'glove-wilson-a2000',
    name: 'Wilson A2000 11.5" Infield Glove',
    category: 'Guantes',
    price: '$299.99',
    image: '/images/products/glove-1.jpg', // Placeholder path
    description: 'El guante preferido por los profesionales. Cuero Pro Stock™ para una durabilidad inigualable y una sensación perfecta.',
    features: ['11.5 pulgadas', 'Patrón I-Web', 'Cuero Pro Stock™', 'Doble ribeteado']
  },
  {
    id: 'bat-marucci-catx',
    name: 'Marucci CATX Connect BBCOR',
    category: 'Bates',
    price: '$349.99',
    image: '/images/products/bat-1.jpg',
    description: 'Diseñado para el bateador de poder. La tecnología anti-vibración más avanzada del mercado.',
    features: ['Aleación AZR', 'Construcción híbrida', 'Sistema anti-vibración', 'Certificado BBCOR']
  },
  {
    id: 'helmet-rawlings-mach',
    name: 'Rawlings Mach Pro Helmet',
    category: 'Accesorios',
    price: '$69.99',
    image: '/images/products/helmet-1.jpg',
    description: 'Protección de nivel MLB. Diseño aerodinámico y acolchado interior de alto rendimiento.',
    features: ['Acabado mate', 'Compatible con protector facial', 'Ventilación optimizada']
  },
  {
    id: 'cleats-nike-vapor',
    name: 'Nike Vapor Ultrafly 4 Keystone',
    category: 'Calzado',
    price: '$55.00',
    image: '/images/products/cleats-1.jpg',
    description: 'Velocidad explosiva en las bases. Suela de goma duradera y parte superior transpirable.',
    features: ['Suela de goma moldeada', 'Malla transpirable', 'Soporte de tobillo']
  },
   {
    id: 'glove-rawlings-hod',
    name: 'Rawlings Heart of the Hide 12.75"',
    category: 'Guantes',
    price: '$279.99',
    image: '/images/products/glove-2.jpg',
    description: 'Calidad legendaria. El guante oficial de las Grandes Ligas, diseñado para jardineros.',
    features: ['12.75 pulgadas', 'Patrón H-Web', 'Cuero Heart of the Hide®', 'Acolchado de pulgar']
  },
   {
    id: 'bat-victus-pencil',
    name: 'Victus Tatis23 Metal',
    category: 'Bates',
    price: '$249.99',
    image: '/images/products/bat-2.jpg',
    description: 'Edición especial Fernando Tatis Jr. Balanceado para velocidad y contacto.',
    features: ['Aluminio de grado aeroespacial', 'Punto dulce extendido', 'Grip micro-perforado']
  }
];
