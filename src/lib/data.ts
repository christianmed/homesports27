
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  features: string[];
}

export const products: Product[] = [
  // GUANTES
  {
    id: 'glove-wilson-a2000',
    name: 'Wilson A2000 11.5" Infield Glove',
    category: 'Guantes',
    price: 299.99,

    image: '/images/products/glove-1.jpg',
    description: 'El guante preferido por los profesionales. Cuero Pro Stock™ para una durabilidad inigualable y una sensación perfecta.',
    features: ['11.5 pulgadas', 'Patrón I-Web', 'Cuero Pro Stock™', 'Doble ribeteado']
  },
  {
    id: 'glove-rawlings-hod',
    name: 'Rawlings Heart of the Hide 12.75"',
    category: 'Guantes',
    price: 279.99,
    image: '/images/products/glove-2.jpg',
    description: 'Calidad legendaria. El guante oficial de las Grandes Ligas, diseñado para jardineros.',
    features: ['12.75 pulgadas', 'Patrón H-Web', 'Cuero Heart of the Hide®', 'Acolchado de pulgar']
  },
  {
    id: 'glove-mizuno-pro',
    name: 'Mizuno Pro Select 11.75"',
    category: 'Guantes',
    price: 349.99,
    image: '/images/products/glove-3.jpg',
    description: 'Artesanía japonesa de élite. Cuero US Steerhide premium para un control excepcional y ajuste personalizado.',
    features: ['11.75 pulgadas', 'Deep Pocket', 'Cuero US Steerhide', 'Hecho a mano']
  },
  {
    id: 'glove-marucci-cypress',
    name: 'Marucci Cypress Series 12"',
    category: 'Guantes',
    price: 259.99,
    image: '/images/products/glove-4.jpg',
    description: 'Durabilidad robusta y confort superior. Ideal para pitchers y infielders que buscan estructura.',
    features: ['12 pulgadas', 'Web cerrada', 'Cuero Premium Steerhide', 'Forro suave']
  },

  // BATES
  {
    id: 'bat-marucci-catx',
    name: 'Marucci CATX Connect BBCOR',
    category: 'Bates',
    price: 349.99,
    image: '/images/products/bat-1.jpg',
    description: 'Diseñado para el bateador de poder. La tecnología anti-vibración más avanzada del mercado.',
    features: ['Aleación AZR', 'Construcción híbrida', 'Sistema anti-vibración', 'Certificado BBCOR']
  },
  {
    id: 'bat-victus-pencil',
    name: 'Victus Tatis23 Metal',
    category: 'Bates',
    price: 249.99,
    image: '/images/products/bat-2.jpg',
    description: 'Edición especial Fernando Tatis Jr. Balanceado para velocidad y contacto.',
    features: ['Aluminio de grado aeroespacial', 'Punto dulce extendido', 'Grip micro-perforado']
  },
  {
    id: 'bat-demarini-voodoo',
    name: 'DeMarini Voodoo One Gold',
    category: 'Bates',
    price: 399.99,
    image: '/images/products/bat-3.jpg',
    description: 'Potencia ligera y velocidad de swing inigualable. El favorito en el béisbol universitario.',
    features: ['Aleación X14', 'End cap sísmico', 'Swing ultra ligero', 'Certificado BBCOR']
  },
  {
    id: 'bat-louisville-meta',
    name: 'Louisville Slugger Meta',
    category: 'Bates',
    price: 449.99,
    image: '/images/products/bat-4.jpg',
    description: 'Tecnología compuesta EKO para un punto dulce masivo y un sonido inconfundible al contacto.',
    features: ['Compuesto de 3 piezas', 'Conexión VCX2', 'Balanceado', 'Barril optimizado']
  },

  // ACCESORIOS
  {
    id: 'helmet-rawlings-mach',
    name: 'Rawlings Mach Pro Helmet',
    category: 'Accesorios',
    price: 69.99,
    image: '/images/products/helmet-1.jpg',
    description: 'Protección de nivel MLB. Diseño aerodinámico y acolchado interior de alto rendimiento.',
    features: ['Acabado mate', 'Compatible con protector facial', 'Ventilación optimizada']
  },
  {
    id: 'acc-franklin-batting',
    name: 'Franklin CFX Pro Gloves',
    category: 'Accesorios',
    price: 39.99,
    image: '/images/products/accessory-gloves.jpg',
    description: 'El guantín oficial de la MLB. Agarre superior y durabilidad comprobada en el diamante.',
    features: ['Palma de cuero ovino', 'Dorso flexible', 'Ajuste perfecto', 'Tecnología Tri-Curve']
  },
  {
    id: 'acc-evoshield-elbow',
    name: 'EvoShield Elbow Guard',
    category: 'Accesorios',
    price: 49.99,
    image: '/images/products/accessory-elbow.jpg',
    description: 'Tecnología Gel-to-Shell. Se amolda a tu cuerpo para una protección personalizada y perfil bajo.',
    features: ['Tecnología Gel-to-Shell', 'Dispersión de impacto', 'Ajuste ergonómico']
  },
  {
    id: 'acc-oakley-sunglasses',
    name: 'Oakley Radar EV Path',
    category: 'Accesorios',
    price: 205.00,
    image: '/images/products/accessory-glasses.jpg',
    description: 'Visión clara en el campo. Tecnología Prizm Field diseñada para resaltar el contraste de la pelota.',
    features: ['Lentes Prizm Field', 'Montura O Matter', 'Agarre Unobtainium', 'Visión periférica']
  },

  // CALZADO
  {
    id: 'cleats-nike-vapor',
    name: 'Nike Vapor Ultrafly 4',
    category: 'Calzado',
    price: 55.00,
    image: '/images/products/cleats-1.jpg',
    description: 'Velocidad explosiva en las bases. Suela de goma duradera y parte superior transpirable.',
    features: ['Suela de goma moldeada', 'Malla transpirable', 'Soporte de tobillo']
  },
  {
    id: 'cleats-newbalance-lindor',
    name: 'New Balance Lindor 2',
    category: 'Calzado',
    price: 119.99,
    image: '/images/products/cleats-2.jpg',
    description: 'Diseñados con Francisco Lindor. Comodidad premium y tracción superior para jugadores de élite.',
    features: ['Espuma FuelCell', 'Correa ajustable', 'Tacos de metal', 'Estilo lifestyle']
  },
  {
    id: 'cleats-adidas-adizero',
    name: 'adidas Adizero Afterburner 9',
    category: 'Calzado',
    price: 120.00,
    image: '/images/products/cleats-3.jpg',
    description: 'Los spikes más ligeros del béisbol. Diseñados para corredores que buscan velocidad pura.',
    features: ['Sprintskin', 'Suela Lightstrike', 'Tacos de velocidad', 'Ajuste tipo calcetín']
  },
  {
    id: 'cleats-underarmour-harper',
    name: 'Under Armour Harper 8',
    category: 'Calzado',
    price: 115.00,
    image: '/images/products/cleats-4.jpg',
    description: 'Estabilidad híbrida. Metal en la parte delantera para tracción, TPU en el talón para comodidad.',
    features: ['Amortiguación HOVR', 'Malla transpirable', 'Suela híbrida', 'Soporte de talón']
  }
];
