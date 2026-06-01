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
    description: "Nuestra creaciÃ³n estelar hecha de una diadema minimalista de doble arco de oro pulido de alta gama, salpicada con delicadas perlas de agua dulce cultivadas a mano. Una pieza celestial que se funde suavemente con el cabello.",
    price: 740000,
    image: assetUrl("./assets/images/lbd_product_pearl_tiara_1780280813932.png"), // Stand-alone Pearl Tiara
    category: "diadema",
    isFavorito: true,
    materials: "Oro de 18 quilates, perlas cultivadas seleccionadas, estructura flexible ultra-ligera.",
    details: [
      "Doble diadema rÃ­gida de ajuste ergonÃ³mico",
      "5 perlas naturales insertadas individualmente mediante perforaciÃ³n fina",
      "Terminaciones enceradas anti-deslizantes para mÃ¡xima comodidad",
      "Firma grabada con lÃ¡ser en el interior del arco izquierdo",
      "Peso pluma: solo 18 gramos para evitar fatiga en eventos de larga duraciÃ³n"
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
    description: "Un sofisticado e intrincado ramillete de perlas de diversos diÃ¡metros, engarzadas a mano con hilo de plata fina sobre un pasador plateado de alta retenciÃ³n. Ofrece un brillo orgÃ¡nico y volumÃ©trico que aporta frescura y clasicismo.",
    price: 380000,
    image: assetUrl("./assets/images/lbd_product_pearl_slide_1780280828278.png"), // Stand-alone Pearl Slide
    category: "pasador",
    isFavorito: true,
    materials: "Biga metÃ¡lica de rodio brillante, perlas de agua dulce de tamaÃ±os mixtos (2mm a 8mm), engaste con hilos de plata esterlina.",
    details: [
      "Mecanismo de horquilla ultra-seguro (french clip de precisiÃ³n)",
      "MÃ¡s de 25 perlas naturales engarzadas meticulosamente",
      "La disposiciÃ³n asimÃ©trica asimila formas botÃ¡nicas lÃ­quidas",
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
    frenchName: "NÅ“ud Fleuri",
    description: "Diadema acolchada estructurada por un nudo artesanal, confeccionada con jacquard de seda estampada con motivos capullos y flores silvestres en delicadas tonalidades pastel. De belleza bucÃ³lica, campestre y romÃ¡ntica.",
    price: 300000,
    image: assetUrl("./assets/images/lbd_product_blossom_knot_1780280846869.png"), // Stand-alone Blossom Knot
    category: "diadema",
    isFavorito: false,
    materials: "Seda de alta hilatura con estampado floral, diadema interior de resina moldeada de memoria tÃ©rmica, forro interior aterciopelado anti-deslizante.",
    details: [
      "Diadema acolchada semi-ancha (grosor de 3.5 cm en su punto mÃ¡ximo)",
      "Costuras invisibles cosidas a mano por modistas locales",
      "Estampado exclusivo donde cada pieza cuenta con cortes Ãºnicos de patrÃ³n",
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
    frenchName: "Forme GÃ©omÃ©trique",
    description: "Un impresionante pasador de cabello inspirado en la arquitectura cubista y el constructivismo estÃ©tico. Compuesto por barras de metal entrelazadas y con acabados contrastantes que capturan el espectro luminoso con un aire futurista y vanguardista.",
    price: 540000,
    image: assetUrl("./assets/images/lbd_product_geometric_slide_1780280862288.png"), // Stand-alone Geometric Slide
    category: "pasador",
    isFavorito: false,
    materials: "NÃ­quel-latÃ³n de joyerÃ­a pesada, baÃ±o de oro de 18 quilates con acabados duales cepillados y pulidos a espejo.",
    details: [
      "Estructura abstracta geomÃ©trica tridimensional hecha por fundiciÃ³n",
      "Broche de clips de resorte que soporta mechones de volumen medio-alto",
      "DiseÃ±o asimÃ©trico con contrastes de texturas satinadas mate y reflejos brillantes",
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
    frenchName: "Peigne CÃ©leste",
    description: "Una peineta nupcial de ensueÃ±o, engarzada con cristales de roca facetados austrÃ­acos y pequeÃ±as hojas doradas de metal cincelado a mano. DiseÃ±ada para lucir sobre recogidos asimÃ©tricos o moÃ±os bajos de elegancia atemporal.",
    price: 480000,
    image: assetUrl("./assets/images/crystal_vine_comb_1780281711421.png"),
    category: "pasador",
    isFavorito: true,
    materials: "Cristal de roca facetado, aleaciÃ³n de cobre antialÃ©rgico, baÃ±o de oro de 14 quilates, alambre de joyerÃ­a.",
    details: [
      "Peineta flexible que se amolda perfectamente a las curvas de tu peinado",
      "Detalles de hojas cinceladas de textura satinada orgÃ¡nica",
      "24 cristales de roca ensamblados a mano mediante torsiÃ³n fina",
      "Ideal para novias o peinados de gala de noche refinados",
      "Soporte antideslizante de pÃºas pulidas redondeadas que cuidan el cabello"
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
    description: "Diadema acolchada de porte seÃ±orial e imperial. Forrada Ã­ntegramente en terciopelo italiano negro profundo de textura sedosa. Una pieza ideal para dar un marco de sofisticaciÃ³n absoluta a cualquier melena, ya sea lisa o rizada.",
    price: 272000,
    image: assetUrl("./assets/images/velvet_padded_crown_1780281725705.png"),
    category: "diadema",
    isFavorito: false,
    materials: "Terciopelo de algodÃ³n italiano genuino, armazÃ³n interno de polÃ­mero moldeable antifatiga, acolchado de espuma viscoelÃ¡stica.",
    details: [
      "Espesor acolchado ergonÃ³mico de 2.2 cm de alto",
      "Textura suave que no reseca el folÃ­culo piloso ni causa fricciÃ³n destructiva",
      "Estructura antideslizante recubierta de otomÃ¡n sedoso en el reverso",
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
    frenchName: "NÅ“ud d'Organza",
    description: "Un romÃ¡ntico y vaporoso lazo xl elaborado con organza de seda traslÃºcida en tono marfil, complementado con una caÃ­da elegante y un remate central de perlas de rÃ­o selectas. Ofrece un movimiento fluido lleno de encanto y fineza.",
    price: 220000,
    image: assetUrl("./assets/images/organza_silk_bow_1780281740933.png"),
    category: "pasador",
    isFavorito: false,
    materials: "100% Organza de seda natural, perlas barrocas cultivadas de rÃ­o, clip de acero niquelado.",
    details: [
      "Medida del lazo: 18 cm de envergadura con cintas de caÃ­da libre",
      "Pico de pato metÃ¡lico premium que asegura su sujeciÃ³n en cualquier textura de cabello",
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
    frenchName: "Trio d'Ã‰toiles",
    description: "Juego exclusivo de tres horquillas de joyerÃ­a fina, cada una coronada por una perla de forma irregular natural. Son pequeÃ±as piezas de arte que pueden colocarse juntas imitando una constelaciÃ³n o esparcidas por un recogido.",
    price: 192000,
    image: assetUrl("./assets/images/trinity_pearl_pins_1780281752433.png"),
    category: "pasador",
    isFavorito: true,
    materials: "Perlas de agua dulce barrocas asimÃ©tricas, alfileres de latÃ³n chapado en oro de 18 quilates de excelente elasticidad.",
    details: [
      "Set incluye 3 horquillas individuales en empaque protector de lino",
      "DiÃ¡metro de las perlas: de 9mm a 11mm con lustre perlado intenso",
      "VÃ¡stago estriado de excelente agarre que evita deslizamientos accidentales",
      "Detalle ideal para aÃ±adir sutiles destellos icÃ³nicos a peinados estructurados o bobs minimalistas"
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
    frenchName: "Ã‰pingles d'Aphrodite",
    description: "Tres delicadas horquillas inspiradas en las coronas de laurel de la Grecia clÃ¡sica. Cada pin exhibe un detallado ramaje de hojas de oro cinceladas con finos nervios orgÃ¡nicos que captan el brillo de los focos de manera majestuosa.",
    price: 340000,
    image: assetUrl("./assets/images/aphrodite_laurel_pins_1780281768298.png"),
    category: "pasador",
    isFavorito: false,
    materials: "Hojas de latÃ³n forrado de oro de 18 quilates, horquillas de alta resistencia.",
    details: [
      "Contiene 3 pines con ramas de laurel inclinadas",
      "Perfecto para entrelazar con trenzas de corona de estilo bohemio-luxe",
      "Capa de laca antideslustre de joyerÃ­a protectora que garantiza la eternidad del oro",
      "DiseÃ±o versÃ¡til apto para acompaÃ±ar velos de novia clÃ¡sicos"
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
    frenchName: "Serre-tÃªte ImpÃ©ratrice",
    description: "Una suntuosa diadema de terciopelo esmeralda engalanada con cristales cÃºbicos verdes tallados que destellan luz esmeralda y oro. Un tributo a la realeza que confiere una presencia sin precedentes.",
    price: 440000,
    image: assetUrl("./assets/images/empress_emerald_headband_1780281781519.png"),
    category: "diadema",
    isFavorito: false,
    materials: "Terciopelo de alta costura esmeralda, cristales facetados corte esmeralda y brillante, base acolchada ultra blanda.",
    details: [
      "Engastes de cristales de cristal engarrados a mano uno por uno",
      "Color verde bosque ultra saturado con reflejos de terciopelo",
      "Interior cubierto de twill negro transpirable antideslizante",
      "Viene con estuche de lona rÃ­gido de la Maison de Locks by Danna"
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
    name: "Set Danna Bestie (DÃºo de Perlas & Amas)",
    frenchName: "Le Set Bestie",
    description: "La combinaciÃ³n de gala definitiva de Locks by Danna. Este set exclusivo junta nuestra icÃ³nica tiara de doble arco 'Duo de Perles' con el ramillete de perlas de alta retenciÃ³n 'Amas de Perles' con un descuento especial del 20% coordinado por Danna.",
    price: 880000,
    image: assetUrl("./assets/images/lbd_product_pearl_tiara_1780280813932.png"), // Stand-alone Tiara Icon
    category: "set",
    isFavorito: true,
    isSet: true,
    materials: "CombinaciÃ³n de Oro de 18 quilates, rodio brillante, plata esterlina y perlas cultivadas seleccionadas.",
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
    description: "El ajuar nupcial por excelencia seleccionado por Danna. ReÃºne la Pearl Tiara celestial con el romÃ¡ntico Peigne CÃ©leste nupcial. DiseÃ±ados para complementarse mutuamente en un peinado de doble fase (ceremonia y fiesta). Incluye descuento especial.",
    price: 1060000,
    image: assetUrl("./assets/images/royal_bride_set_1780281797965.png"),
    category: "set",
    isFavorito: true,
    isSet: true,
    materials: "Oro de 18 y 14 quilates, cristales austrÃ­acos facetados, perlas finas seleccionadas.",
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
    name: "Set Bloom & Shine (NÅ“ud & GÃ©omÃ©trique)",
    frenchName: "L'Ensemble Fleuri",
    description: "Un fascinante set casual chic para marcar tendencia diaria. Fusiona el estilo romÃ¡ntico bucÃ³lico de la diadema jacquard acolchada 'NÅ“ud Fleuri' con el vanguardismo minimalista del pasador constructivista 'Forme GÃ©omÃ©trique'.",
    price: 660000,
    image: assetUrl("./assets/images/lbd_product_blossom_knot_1780280846869.png"),
    category: "set",
    isFavorito: false,
    isSet: true,
    materials: "Seda de jacquard italiano estampada, latÃ³n de alta retenciÃ³n baÃ±ado en oro de 18k con acabados duales satinados.",
    details: [
      "Incluye la diadema de nudo Blossom Knot (NÅ“ud Fleuri)",
      "Incluye el pasador de oro Geometric Slide (Forme GÃ©omÃ©trique)",
      "Empaque de regalo ecolÃ³gico con aroma de lavanda de la Toscana",
      "Folleto de peinados de inspiraciÃ³n editorial creados por Danna"
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
