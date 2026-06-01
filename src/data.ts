import { Product } from "./types";

export const formatCOP = (value: number) => {
  const formatted = new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
  return `$${formatted} COP`;
};

export const assetUrl = (relativePath: string) => new URL(relativePath, import.meta.url).href;

export const PRODUCTS: Product[] = [
  {
    id: "lbd-tiara",
    name: "The Pearl Tiara",
    frenchName: "Duo de Perles",
    description: "Nuestra creación estelar hecha de una diadema minimalista de doble arco de oro pulido de alta gama, salpicada con delicadas perlas de agua dulce cultivadas a mano. Una pieza celestial que se funde suavemente con el cabello.",
    price: 740000,
    image: assetUrl("./assets/images/lbd_product_pearl_tiara_1780280813932.png"), // Stand-alone Pearl Tiara
    category: "diadema",
    isFavorito: true,
    materials: "Oro de 18 quilates, perlas cultivadas seleccionadas, estructura flexible ultra-ligera.",
    details: [
      "Doble diadema rígida de ajuste ergonómico",
      "5 perlas naturales insertadas individualmente mediante perforación fina",
      "Terminaciones enceradas anti-deslizantes para máxima comodidad",
      "Firma grabada con láser en el interior del arco izquierdo",
      "Peso pluma: solo 18 gramos para evitar fatiga en eventos de larga duración"
    ],
    tryOnConfig: {
      x: 50,
      y: 35,
      scale: 1.0,
      rotation: 0,
      width: 250
    }
  },
  {
    id: "lbd-cluster",
    name: "The Cluster Pearl Slide",
    frenchName: "Amas de Perles",
    description: "Un sofisticado e intrincado ramillete de perlas de diversos diámetros, engarzadas a mano con hilo de plata fina sobre un pasador plateado de alta retención. Ofrece un brillo orgánico y volumétrico que aporta frescura y clasicismo.",
    price: 380000,
    image: assetUrl("./assets/images/lbd_product_pearl_slide_1780280828278.png"), // Stand-alone Pearl Slide
    category: "pasador",
    isFavorito: true,
    materials: "Biga metálica de rodio brillante, perlas de agua dulce de tamaños mixtos (2mm a 8mm), engaste con hilos de plata esterlina.",
    details: [
      "Mecanismo de horquilla ultra-seguro (french clip de precisión)",
      "Más de 25 perlas naturales engarzadas meticulosamente",
      "La disposición asimétrica asimila formas botánicas líquidas",
      "Estructura trasera plana para quedar firmemente asentado sobre el cuero cabelludo",
      "Especialmente deslumbrante en recogidos franceses, coletas bajas o semirrecogidos laterales"
    ],
    tryOnConfig: {
      x: 61,
      y: 43,
      scale: 0.72,
      rotation: -18,
      width: 160
    }
  },
  {
    id: "lbd-blossom",
    name: "The Blossom Knot",
    frenchName: "N�ud Fleuri",
    description: "Diadema acolchada estructurada por un nudo artesanal, confeccionada con jacquard de seda estampada con motivos capullos y flores silvestres en delicadas tonalidades pastel. De belleza bucólica, campestre y romántica.",
    price: 300000,
    image: assetUrl("./assets/images/lbd_product_blossom_knot_1780280846869.png"), // Stand-alone Blossom Knot
    category: "diadema",
    isFavorito: false,
    materials: "Seda de alta hilatura con estampado floral, diadema interior de resina moldeada de memoria térmica, forro interior aterciopelado anti-deslizante.",
    details: [
      "Diadema acolchada semi-ancha (grosor de 3.5 cm en su punto máximo)",
      "Costuras invisibles cosidas a mano por modistas locales",
      "Estampado exclusivo donde cada pieza cuenta con cortes únicos de patrón",
      "Nudo central abombado estructurado para dar altura de corona de manera casual",
      "Interior cubierto con microgamuza suave que se adhiere suavemente sin maltratar las fibras"
    ],
    tryOnConfig: {
      x: 49,
      y: 28,
      scale: 0.95,
      rotation: 4,
      width: 260
    }
  },
  {
    id: "lbd-geometric",
    name: "The Geometric Slide",
    frenchName: "Forme Géométrique",
    description: "Un impresionante pasador de cabello inspirado en la arquitectura cubista y el constructivismo estético. Compuesto por barras de metal entrelazadas y con acabados contrastantes que capturan el espectro luminoso con un aire futurista y vanguardista.",
    price: 540000,
    image: assetUrl("./assets/images/lbd_product_geometric_slide_1780280862288.png"), // Stand-alone Geometric Slide
    category: "pasador",
    isFavorito: false,
    materials: "Níquel-latón de joyería pesada, baño de oro de 18 quilates con acabados duales cepillados y pulidos a espejo.",
    details: [
      "Estructura abstracta geométrica tridimensional hecha por fundición",
      "Broche de clips de resorte que soporta mechones de volumen medio-alto",
      "Diseño asimétrico con contrastes de texturas satinadas mate y reflejos brillantes",
      "Pieza de vanguardia ideal para lucir en cabellos lacios y peinados de riguroso porte moderno"
    ],
    tryOnConfig: {
      x: 60,
      y: 46,
      scale: 0.75,
      rotation: -32,
      width: 170
    }
  },
  {
    id: "lbd-celeste-comb",
    name: "The Crystal Vine Comb",
    frenchName: "Peigne Céleste",
    description: "Una peineta nupcial de ensueño, engarzada con cristales de roca facetados austríacos y pequeñas hojas doradas de metal cincelado a mano. Diseñada para lucir sobre recogidos asimétricos o moños bajos de elegancia atemporal.",
    price: 480000,
    image: assetUrl("./assets/images/crystal_vine_comb_1780281711421.png"),
    category: "pasador",
    isFavorito: true,
    materials: "Cristal de roca facetado, aleación de cobre antialérgico, baño de oro de 14 quilates, alambre de joyería.",
    details: [
      "Peineta flexible que se amolda perfectamente a las curvas de tu peinado",
      "Detalles de hojas cinceladas de textura satinada orgánica",
      "24 cristales de roca ensamblados a mano mediante torsión fina",
      "Ideal para novias o peinados de gala de noche refinados",
      "Soporte antideslizante de púas pulidas redondeadas que cuidan el cabello"
    ],
    tryOnConfig: {
      x: 62,
      y: 45,
      scale: 0.7,
      rotation: -25,
      width: 155
    }
  },
  {
    id: "lbd-velvet-crown",
    name: "The Velvet Midnight Crown",
    frenchName: "Couronne de Velours",
    description: "Diadema acolchada de porte señorial e imperial. Forrada íntegramente en terciopelo italiano negro profundo de textura sedosa. Una pieza ideal para dar un marco de sofisticación absoluta a cualquier melena, ya sea lisa o rizada.",
    price: 272000,
    image: assetUrl("./assets/images/velvet_padded_crown_1780281725705.png"),
    category: "diadema",
    isFavorito: false,
    materials: "Terciopelo de algodón italiano genuino, armazón interno de polímero moldeable antifatiga, acolchado de espuma viscoelástica.",
    details: [
      "Espesor acolchado ergonómico de 2.2 cm de alto",
      "Textura suave que no reseca el folículo piloso ni causa fricción destructiva",
      "Estructura antideslizante recubierta de otomán sedoso en el reverso",
      "Look audaz que realza el volumen natural de rulos y cabello afro de forma sublime"
    ],
    tryOnConfig: {
      x: 49,
      y: 28,
      scale: 0.96,
      rotation: 0,
      width: 255
    }
  },
  {
    id: "lbd-silk-bow",
    name: "The Organza Silk Bow",
    frenchName: "N�ud d'Organza",
    description: "Un romántico y vaporoso lazo xl elaborado con organza de seda traslúcida en tono marfil, complementado con una caída elegante y un remate central de perlas de río selectas. Ofrece un movimiento fluido lleno de encanto y fineza.",
    price: 220000,
    image: assetUrl("./assets/images/organza_silk_bow_1780281740933.png"),
    category: "pasador",
    isFavorito: false,
    materials: "100% Organza de seda natural, perlas barrocas cultivadas de río, clip de acero niquelado.",
    details: [
      "Medida del lazo: 18 cm de envergadura con cintas de caída libre",
      "Pico de pato metálico premium que asegura su sujeción en cualquier textura de cabello",
      "Cada lazo es hilado, cortado y confeccionado individualmente en nuestro Atelier",
      "Aporta una dosis inigualable de romanticismo parisino a medias colas o trenzas deshechas"
    ],
    tryOnConfig: {
      x: 58,
      y: 50,
      scale: 0.85,
      rotation: -10,
      width: 180
    }
  },
  {
    id: "lbd-pearl-pins",
    name: "The Trinity Pearl Pins",
    frenchName: "Trio d'�0toiles",
    description: "Juego exclusivo de tres horquillas de joyería fina, cada una coronada por una perla de forma irregular natural. Son pequeñas piezas de arte que pueden colocarse juntas imitando una constelación o esparcidas por un recogido.",
    price: 192000,
    image: assetUrl("./assets/images/trinity_pearl_pins_1780281752433.png"),
    category: "pasador",
    isFavorito: true,
    materials: "Perlas de agua dulce barrocas asimétricas, alfileres de latón chapado en oro de 18 quilates de excelente elasticidad.",
    details: [
      "Set incluye 3 horquillas individuales en empaque protector de lino",
      "Diámetro de las perlas: de 9mm a 11mm con lustre perlado intenso",
      "Vástago estriado de excelente agarre que evita deslizamientos accidentales",
      "Detalle ideal para añadir sutiles destellos icónicos a peinados estructurados o bobs minimalistas"
    ],
    tryOnConfig: {
      x: 60,
      y: 45,
      scale: 0.6,
      rotation: -15,
      width: 120
    }
  },
  {
    id: "lbd-aphrodite-gold",
    name: "Aphrodite Laurel Pins Suite",
    frenchName: "�0pingles d'Aphrodite",
    description: "Tres delicadas horquillas inspiradas en las coronas de laurel de la Grecia clásica. Cada pin exhibe un detallado ramaje de hojas de oro cinceladas con finos nervios orgánicos que captan el brillo de los focos de manera majestuosa.",
    price: 340000,
    image: assetUrl("./assets/images/aphrodite_laurel_pins_1780281768298.png"),
    category: "pasador",
    isFavorito: false,
    materials: "Hojas de latón forrado de oro de 18 quilates, horquillas de alta resistencia.",
    details: [
      "Contiene 3 pines con ramas de laurel inclinadas",
      "Perfecto para entrelazar con trenzas de corona de estilo bohemio-luxe",
      "Capa de laca antideslustre de joyería protectora que garantiza la eternidad del oro",
      "Diseño versátil apto para acompañar velos de novia clásicos"
    ],
    tryOnConfig: {
      x: 59,
      y: 44,
      scale: 0.65,
      rotation: -20,
      width: 140
    }
  },
  {
    id: "lbd-empress-emerald",
    name: "The Empress Emerald Headband",
    frenchName: "Serre-tête Impératrice",
    description: "Una suntuosa diadema de terciopelo esmeralda engalanada con cristales cúbicos verdes tallados que destellan luz esmeralda y oro. Un tributo a la realeza que confiere una presencia sin precedentes.",
    price: 440000,
    image: assetUrl("./assets/images/empress_emerald_headband_1780281781519.png"),
    category: "diadema",
    isFavorito: false,
    materials: "Terciopelo de alta costura esmeralda, cristales facetados corte esmeralda y brillante, base acolchada ultra blanda.",
    details: [
      "Engastes de cristales de cristal engarrados a mano uno por uno",
      "Color verde bosque ultra saturado con reflejos de terciopelo",
      "Interior cubierto de twill negro transpirable antideslizante",
      "Viene con estuche de lona rígido de la Maison de Locks by Danna"
    ],
    tryOnConfig: {
      x: 49,
      y: 28,
      scale: 0.95,
      rotation: 0,
      width: 250
    }
  },
  {
    id: "set-danna-bestie",
    name: "Set Danna Bestie (Dúo de Perlas & Amas)",
    frenchName: "Le Set Bestie",
    description: "La combinación de gala definitiva de Locks by Danna. Este set exclusivo junta nuestra icónica tiara de doble arco 'Duo de Perles' con el ramillete de perlas de alta retención 'Amas de Perles' con un descuento especial del 20% coordinado por Danna.",
    price: 880000,
    image: assetUrl("./assets/images/lbd_product_pearl_tiara_1780280813932.png"), // Stand-alone Tiara Icon
    category: "set",
    isFavorito: true,
    isSet: true,
    materials: "Combinación de Oro de 18 quilates, rodio brillante, plata esterlina y perlas cultivadas seleccionadas.",
    details: [
      "Incluye la corona Pearl Tiara (Duo de Perles)",
      "Incluye el pasador Cluster Pearl Slide (Amas de Perles)",
      "Viene empacado en un estuche de gamuza rosa exclusivo bordado en hilo de oro",
      "Certificado de autenticidad firmado y numerado",
      "Kit de microfibra de limpieza de joyas incluido"
    ],
    tryOnConfig: {
      x: 50,
      y: 35,
      scale: 1.0,
      rotation: 0,
      width: 250
    }
  },
  {
    id: "set-royal-bride",
    name: "Set Royal Bride (Pearl Tiara & Peigne)",
    frenchName: "Le Set Royal",
    description: "El ajuar nupcial por excelencia seleccionado por Danna. Reúne la Pearl Tiara celestial con el romántico Peigne Céleste nupcial. Diseñados para complementarse mutuamente en un peinado de doble fase (ceremonia y fiesta). Incluye descuento especial.",
    price: 1060000,
    image: assetUrl("./assets/images/royal_bride_set_1780281797965.png"),
    category: "set",
    isFavorito: true,
    isSet: true,
    materials: "Oro de 18 y 14 quilates, cristales austríacos facetados, perlas finas seleccionadas.",
    details: [
      "Incluye la tiara de doble arco The Pearl Tiara",
      "Incluye el peine nupcial de cristales The Crystal Vine Comb",
      "Perfecto para retiro de velo tras la ceremonia religiosa/civil",
      "Presentado en caja de lujo de madera laqueada blanca con llave",
      "Soporte prioritario VIP para ajuste presencial en nuestro showroom de Cartagena"
    ],
    tryOnConfig: {
      x: 50,
      y: 35,
      scale: 1.0,
      rotation: 0,
      width: 250
    }
  },
  {
    id: "set-bloom-shine",
    name: "Set Bloom & Shine (N�ud & Géométrique)",
    frenchName: "L'Ensemble Fleuri",
    description: "Un fascinante set casual chic para marcar tendencia diaria. Fusiona el estilo romántico bucólico de la diadema jacquard acolchada 'N�ud Fleuri' con el vanguardismo minimalista del pasador constructivista 'Forme Géométrique'.",
    price: 660000,
    image: assetUrl("./assets/images/lbd_product_blossom_knot_1780280846869.png"),
    category: "set",
    isFavorito: false,
    isSet: true,
    materials: "Seda de jacquard italiano estampada, latón de alta retención bañado en oro de 18k con acabados duales satinados.",
    details: [
      "Incluye la diadema de nudo Blossom Knot (N�ud Fleuri)",
      "Incluye el pasador de oro Geometric Slide (Forme Géométrique)",
      "Empaque de regalo ecológico con aroma de lavanda de la Toscana",
      "Folleto de peinados de inspiración editorial creados por Danna"
    ],
    tryOnConfig: {
      x: 49,
      y: 28,
      scale: 0.95,
      rotation: 4,
      width: 260
    }
  }
];

export const PRESET_MODELS = [
  {
    id: "atelier-model",
    name: "Clara (Sleek Straight)",
    image: assetUrl("./assets/images/lbd_pearl_tiara_1780280311846.png"),
    hairType: "Lacio"
  },
  {
    id: "model-wavy",
    name: "Camile (Soft Waves)",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    hairType: "Ondulado"
  },
  {
    id: "model-curly",
    name: "Amina (Natural Curls)",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    hairType: "Rizado"
  }
];
