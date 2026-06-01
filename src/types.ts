export interface Product {
  id: string;
  name: string;
  frenchName: string;
  description: string;
  price: number;
  image: string;
  details: string[];
  materials: string;
  category: "diadema" | "pasador" | "set";
  isFavorito?: boolean;
  isSet?: boolean;
  // Default positioning values for the interactive try-on canvas over the model
  tryOnConfig: {
    x: number; // percentage from left
    y: number; // percentage from top
    scale: number;
    rotation: number;
    width: number; // base display width on canvas in px
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface HairProfile {
  length: "corto" | "mediano" | "largo";
  color: "rubio" | "castano" | "negro" | "pelirrojo" | "canoso";
  texture: "lacio" | "ondulado" | "rizado";
  occasion: "boda" | "gala" | "casual" | "editorial";
}

export interface StyledLook {
  id: string;
  product: Product;
  modelImage: string;
  config: {
    x: number;
    y: number;
    scale: number;
    rotation: number;
  };
  createdAt: string;
  notes?: string;
}
