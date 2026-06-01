import React, { useState } from "react";
import { Product } from "../types";
import { PRODUCTS, formatCOP } from "../data";
import { HelpCircle, Eye, ShoppingBag, Sparkles, X, ChevronRight, Check, Heart, Trophy, Crown, Sparkle, Mail, ArrowRight, Instagram, MessageCircle, HeartHandshake } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProductCatalogProps {
  onAddToCart: (product: Product) => void;
  searchVal: string;
}

export default function ProductCatalog({
  onAddToCart,
  searchVal
}: ProductCatalogProps) {
  // Collection filters: principal, favoritos, sets
  const [selectedCollection, setSelectedCollection] = useState<"principal" | "favoritos" | "sets">("principal");
  // Secondary subcatalog category filters (only shown in principal collection)
  const [selectedCategory, setSelectedCategory] = useState<"todas" | "diadema" | "pasador">("todas");
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedItemNotification, setAddedItemNotification] = useState<string | null>(null);

  // VIP Subscription state
  const [vipEmail, setVipEmail] = useState("");
  const [vipSubscribed, setVipSubscribed] = useState(false);

  const VIDEO_GALLERY = [
    {
      id: "video-1",
      title: "Atelier en Movimiento",
      description: "Descubre el proceso creativo detrás de nuestras piezas premium.",
      src: new URL("../assets/videos/video1.mp4", import.meta.url).href
    },
    {
      id: "video-2",
      title: "Textura y Brillo",
      description: "Observa los detalles de cada joya capilar en acción.",
      src: new URL("../assets/videos/video2.mp4", import.meta.url).href
    }
  ];

  // Filter products by collection, category, and search keyword
  const filteredProducts = PRODUCTS.filter(p => {
    // Search keyword filters
    if (searchVal.trim() !== "") {
      const query = searchVal.toLowerCase();
      const nameMatch = p.name.toLowerCase().includes(query);
      const frenchMatch = p.frenchName?.toLowerCase().includes(query) || false;
      const descMatch = p.description.toLowerCase().includes(query);
      const matMatch = p.materials.toLowerCase().includes(query);
      const catMatch = p.category.toLowerCase().includes(query);
      
      if (!nameMatch && !frenchMatch && !descMatch && !matMatch && !catMatch) {
        return false;
      }
    }

    if (selectedCollection === "favoritos") {
      return p.isFavorito;
    }
    if (selectedCollection === "sets") {
      return p.isSet;
    }
    
    // "principal" collection
    if (p.isSet) return false; // exclusive sets belong under "sets" collection only
    if (selectedCategory === "todas") return true;
    return p.category === selectedCategory;
  });

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    setAddedItemNotification(product.id);
    setTimeout(() => {
      setAddedItemNotification(null);
    }, 2000);
  };

  const handleVipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vipEmail.trim()) return;
    setVipSubscribed(true);
    setVipEmail("");
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-12" id="catalog-section">
      
      {/* 1. EDITORIAL HERO BANNER / PORTADA - LOCKS BY DANNA */}
      <div 
        className="relative mb-6 rounded-2xl overflow-hidden border border-[#E2DFD9] shadow-xl h-[460px] md:h-[520px] flex flex-col justify-between bg-[#1C1A17]" 
        id="brand-hero-section"
      >
        {/* Background Image: High-fashion Afro woman illustration with bespoke gentle animation */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <motion.img 
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ 
              scale: [1.05, 1.01, 1.05],
              opacity: 1 
            }}
            transition={{
              scale: {
                duration: 25,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              },
              opacity: { duration: 1.2, ease: "easeOut" }
            }}
            src={new URL("../assets/images/lbd_hero_afro_banner_1780280798186.png", import.meta.url).href} 
            alt="Maison Locks by Danna Collection Cover"
            className="w-full h-full object-cover brightness-[0.88] contrast-[1.02]"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient wash combining pink and gold to match the landing aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/80 via-black/20 to-transparent"></div>
        </div>

        {/* Top Spacer to keep layout balanced */}
        <div className="h-12 z-10"></div>

        {/* Centered Slogan and brand name matching the screenshot exactly */}
        <div className="z-10 text-center max-w-3xl mx-auto px-4 flex flex-col items-center justify-center space-y-4">
          <span className="bg-[#EC1B96]/95 backdrop-blur-md text-[#FBFFFC] px-3.5 py-1 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest rounded-full border border-white/20 animate-pulse shadow-sm">
            ¡Nueva Línea Exclusiva
          </span>
          <h1 className="font-serif text-[#FBFFFC] text-4.5xl sm:text-6xl md:text-7xl font-light tracking-widest drop-shadow-lg leading-none">
            LOCKS BY DANNA
          </h1>
          <p className="font-sans text-yellow-100 text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.25em] uppercase drop-shadow-sm flex items-center gap-1.5">
            <span>¡TU CORONA TE ESPERA, BESTIE!</span>
          </p>

          <div className="pt-3 flex flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-md">
            <button
              onClick={() => {
                const el = document.getElementById("collection-tabs-row");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-1/2 sm:w-auto rounded-sm bg-[#EC1B96] hover:bg-[#C29F38] text-white px-6 sm:px-8 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg transform hover:scale-105 cursor-pointer"
            >
              COMPRAR AHORA
            </button>
            
            <button
              onClick={() => {
                setSelectedCollection("favoritos");
                const el = document.getElementById("collection-tabs-row");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-1/2 sm:w-auto rounded-sm border border-white bg-white/10 hover:bg-white/20 text-white px-6 sm:px-8 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer backdrop-blur-xs"
            >
              VER FAVORITOS
            </button>
          </div>
        </div>

        {/* Bottom Spacer to balance buttons */}
        <div className="h-10 z-10"></div>
      </div>

      {/* THREE ICON PROMO RIBBON (exactly matching the screenshot bottom strip) */}
      <div 
        className="mb-14 rounded-xl border border-atelier-sand bg-white py-4.5 px-6 md:px-12 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-center text-center" 
        id="promise-ribbon"
      >
        <div className="flex items-center justify-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-[#2A1A1D]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFF4F5] text-[#EC1B96]">
            <Crown className="h-3.5 w-3.5 fill-[#EC1B96]" />
          </span>
          <span>ENVÍOS A TODO EL PAÍS</span>
        </div>
        <div className="flex items-center justify-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-[#2A1A1D] md:border-x md:border-atelier-sand/60">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFF4F5] text-[#EC1B96]">
            <Sparkles className="h-3.5 w-3.5 fill-[#EC1B96]" />
          </span>
          <span>CALIDAD PREMIUM</span>
        </div>
        <div className="flex items-center justify-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-[#2A1A1D]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFF4F5] text-[#EC1B96]">
            <Sparkle className="h-3.5 w-3.5 fill-[#EC1B96]" />
          </span>
          <span>DISEÑOS EXCLUSIVOS</span>
        </div>
      </div>

      {/* 2. COLLECTION SELECTOR BUTTONS */}
      <div className="mb-12" id="collection-tabs-row">
        <div className="flex flex-col items-center justify-between border-b border-[#E2DFD9] pb-6 gap-6 md:flex-row">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8F7225]">Secciones Exclusivas</span>
            <h2 className="font-serif text-2xl font-normal text-[#1C1A17] mt-1 capitalize" id="current-collection-title">
              {selectedCollection === "principal" ? "Nuestra Selección Estelar" : selectedCollection === "favoritos" ? "Favoritos Seleccionados de Danna" : "Sets de Edición Exclusiva"}
            </h2>
          </div>

          {/* Three Lovable App Page Links */}
          <div className="flex flex-wrap items-center gap-1.5" id="lovable-filters">
            <button
              onClick={() => {
                setSelectedCollection("principal");
                setSelectedCategory("todas");
              }}
              className={`rounded-sm px-4.5 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedCollection === "principal"
                  ? "bg-[#1C1A17] text-[#FBFFFC] shadow-xs"
                  : "bg-[#F2EFE9]/60 text-[#625E57] hover:bg-[#E2DFD9] border border-[#E2DFD9]/40"
              }`}
            >
              Colección Principal
            </button>
            <button
              onClick={() => {
                setSelectedCollection("favoritos");
              }}
              className={`rounded-sm px-4.5 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedCollection === "favoritos"
                  ? "bg-[#1C1A17] text-[#FBFFFC] shadow-xs"
                  : "bg-[#F2EFE9]/60 text-[#625E57] hover:bg-[#E2DFD9] border border-[#E2DFD9]/40"
              }`}
            >
              Favoritos de Danna
            </button>
            <button
              onClick={() => {
                setSelectedCollection("sets");
              }}
              className={`rounded-sm px-4.5 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedCollection === "sets"
                  ? "bg-[#1C1A17] text-[#FBFFFC] shadow-xs"
                  : "bg-[#F2EFE9]/60 text-[#625E57] hover:bg-[#E2DFD9] border border-[#E2DFD9]/40"
              }`}
            >
              Sets Exclusivos
            </button>
          </div>
        </div>

        {/* SECONDARY CATEGORY FILTER FOR PRINCIPAL COLLECTION */}
        {selectedCollection === "principal" && (
          <div className="mt-6 flex flex-wrap gap-2 justify-start items-center" id="secondary-subfilters">
            <span className="text-[10px] font-mono uppercase text-[#625E57] mr-1">Filtrar por:</span>
            <button
              onClick={() => setSelectedCategory("todas")}
              className={`px-3 py-1 text-xs transition-colors border-b ${
                selectedCategory === "todas" ? "border-[#EC1B96] text-[#EC1B96]" : "border-transparent text-[#625E57] hover:text-[#1C1A17]"
              }`}
            >
              Ver Todo
            </button>
            <button
              onClick={() => setSelectedCategory("diadema")}
              className={`px-3 py-1 text-xs transition-colors border-b ${
                selectedCategory === "diadema" ? "border-[#EC1B96] text-[#EC1B96]" : "border-transparent text-[#625E57] hover:text-[#1C1A17]"
              }`}
            >
              Diademas
            </button>
            <button
              onClick={() => setSelectedCategory("pasador")}
              className={`px-3 py-1 text-xs transition-colors border-b ${
                selectedCategory === "pasador" ? "border-[#EC1B96] text-[#EC1B96]" : "border-transparent text-[#625E57] hover:text-[#1C1A17]"
              }`}
            >
              Pasadores & Horquillas
            </button>
          </div>
        )}
      </div>

      {/* 3. PRODUCT BENTO GRID WITH PREMIUM FEEDBACK */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4" id="products-grid">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className={`group flex flex-col justify-between overflow-hidden bg-[#FBFFFC] border rounded-sm transition-all duration-500 hover:border-[#EC1B96]/50 hover:shadow-lg ${
                product.isSet ? "border-[#EC1B96]/40 bg-[#FFFDF9]" : "border-[#E2DFD9]"
              }`}
              id={`product-card-${product.id}`}
            >
              {/* Product Visual Container */}
              <div 
                onClick={() => setSelectedProduct(product)}
                className="relative aspect-square w-full overflow-hidden bg-[#F2EFE9] cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={product.id !== "lbd-tiara" && !product.isSet ? { mixBlendMode: "multiply" } : undefined}
                />
                
                {/* Visual Accent Hover Overlays */}
                <div className="absolute inset-0 bg-[#1C1A17]/10 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                  <div className="translate-y-4 rounded-sm bg-[#FBFFFC] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#1C1A17] shadow-xs transition-transform duration-500 group-hover:translate-y-0 border border-[#E2DFD9]">
                    {product.isSet ? "Explorar Set Exclusivo" : "Detalle de Pieza"}
                  </div>
                </div>

                {/* Floating Tags */}
                <div className="absolute top-4 left-4 flex flex-col gap-1">
                  <span className="rounded-sm bg-[#FBFFFC]/95 px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-wider text-[#1C1A17] backdrop-blur-xs border border-[#E2DFD9]">
                    {product.frenchName}
                  </span>
                  {product.isFavorito && (
                    <span className="rounded-sm bg-[#EC1B96] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#FBFFFC] shadow-xs inline-flex items-center space-x-1 w-max">
                      <Heart className="h-2 w-2 fill-white text-white shrink-0" />
                      <span>Bestie Fav</span>
                    </span>
                  )}
                  {product.isSet && (
                    <span className="rounded-sm bg-[#1C1A17] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#FBFFFC] shadow-xs inline-flex items-center space-x-1 w-max">
                      <Crown className="h-2 w-2 text-[#EC1B96] fill-[#EC1B96] shrink-0" />
                      <span>Set Ahorro</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Product Copy Details */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 
                      onClick={() => setSelectedProduct(product)}
                      className="cursor-pointer font-serif text-base font-semibold text-[#1C1A17] hover:text-[#EC1B96] transition-colors leading-snug"
                    >
                      {product.name}
                    </h3>
                    <span className="font-mono text-[10px] font-bold text-[#1C1A17] shrink-0 bg-[#F2EFE9]/40 px-1.5 py-0.5 border border-[#E2DFD9]/40 rounded-xs">
                      {formatCOP(product.price)}
                    </span>
                  </div>
                  
                  <p className="mt-2 text-[11px] leading-relaxed text-[#625E57] line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Quick Action Buttons */}
                <div className="mt-5 border-t border-[#F2EFE9] pt-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full flex items-center justify-center space-x-2 rounded-sm bg-[#1C1A17] px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#FBFFFC] transition-colors hover:bg-[#EC1B96]"
                  >
                    {addedItemNotification === product.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-300 animate-bounce" />
                        <span>¡Añadido!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-3.5 w-3.5 text-[#EC1B96]" />
                        <span>Comprar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 4. LOOKBOOK LBD SECTION - PHOTO GALLERY SHOWING ONLY PRODUCT SHOTS (NO PEOPLE) */}
      <div className="mt-28 border-t border-[#E2DFD9] pt-20" id="lookbook-lbd-section">
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C29F38]">Pureza y Diseño En Cada Ángulo</span>
          <h2 className="font-serif text-3xl font-normal text-[#1C1A17] mt-1.5">Lookbook LBD</h2>
          <p className="text-xs text-[#625E57] max-w-sm mx-auto mt-2">
            Disfruta de nuestros diseños expuestos solos. Capturando el lustre sagrado del oro y las perlas de agua dulce cultivadas a mano.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Elegancia en cada detalle */}
          <div className="group bg-[#FBFFFC] border border-[#E2DFD9] rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md">
            <div className="relative aspect-[3/4] bg-[#F2EFE9] overflow-hidden">
              <img src={new URL("../assets/images/lbd_product_pearl_slide_1780280828278.png", import.meta.url).href} alt="Amas de perles" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute top-3 left-3">
                <span className="rounded-sm bg-[#1C1A17] text-[#FBFFFC] text-[8px] font-extrabold uppercase px-1.5 py-0.5">Top Look 01</span>
              </div>
            </div>
            <div className="p-4 space-y-1">
              <h3 className="font-serif text-base font-semibold text-[#1C1A17]">Elegancia en cada detalle</h3>
              <p className="text-[11px] text-[#625E57] leading-relaxed">
                El ramillete de perlas de agua dulce Amas de Perles moldeado artesanalmente para recogidos impecables.
              </p>
            </div>
          </div>

          {/* Card 2: Tu corona natural */}
          <div className="group bg-[#FBFFFC] border border-[#E2DFD9] rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md">
            <div className="relative aspect-[3/4] bg-[#F2EFE9] overflow-hidden">
              <img src={new URL("../assets/images/lbd_product_pearl_tiara_1780280813932.png", import.meta.url).href} alt="Duo de perles" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute top-3 left-3">
                <span className="rounded-sm bg-[#C29F38] text-white text-[8px] font-extrabold uppercase px-1.5 py-0.5">La Favorita</span>
              </div>
            </div>
            <div className="p-4 space-y-1">
              <h3 className="font-serif text-base font-semibold text-[#1C1A17]">Tu corona natural</h3>
              <p className="text-[11px] text-[#625E57] leading-relaxed">
                Diadema de doble arco de oro de 18k bañada con perlas seleccionadas a mano. Un aura de reina para ti.
              </p>
            </div>
          </div>

          {/* Card 3: Flores silvestres */}
          <div className="group bg-[#FBFFFC] border border-[#E2DFD9] rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md">
            <div className="relative aspect-[3/4] bg-[#F2EFE9] overflow-hidden">
              <img src={new URL("../assets/images/lbd_product_blossom_knot_1780280846869.png", import.meta.url).href} alt="Nœud Fleuri" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute top-3 left-3">
                <span className="rounded-sm bg-[#1C1A17] text-[#FBFFFC] text-[8px] font-extrabold uppercase px-1.5 py-0.5">Bucólico</span>
              </div>
            </div>
            <div className="p-4 space-y-1">
              <h3 className="font-serif text-base font-semibold text-[#1C1A17]">Flores silvestres</h3>
              <p className="text-[11px] text-[#625E57] leading-relaxed">
                Jacquard nudo floral con tonos pasteles de la campiña. La diadema Blossom Knot evoca la dulzura de la primavera.
              </p>
            </div>
          </div>

          {/* Card 4: Brilla en cada ocasión */}
          <div className="group bg-[#FBFFFC] border border-[#E2DFD9] rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md">
            <div className="relative aspect-[3/4] bg-[#F2EFE9] overflow-hidden">
              <img src={new URL("../assets/images/lbd_product_geometric_slide_1780280862288.png", import.meta.url).href} alt="Forme Géométrique" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute top-3 left-3">
                <span className="rounded-sm bg-[#1C1A17] text-[#FBFFFC] text-[8px] font-extrabold uppercase px-1.5 py-0.5">Constructivista</span>
              </div>
            </div>
            <div className="p-4 space-y-1">
              <h3 className="font-serif text-base font-semibold text-[#1C1A17]">Brilla en cada ocasión</h3>
              <p className="text-[11px] text-[#625E57] leading-relaxed">
                Pasador de corte cubista bañado en oro con doble textura. Geometría vanguardista para reflejar luz.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-28 rounded-3xl border border-[#E2DFD9] bg-[#FFFDF9] p-8 shadow-sm" id="video-gallery-section">
        <div className="text-center mb-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C29F38]">Sesión de Videos</span>
          <h2 className="font-serif text-3xl font-normal text-[#1C1A17] mt-3">Videos del Atelier</h2>
          <p className="mx-auto max-w-2xl text-xs leading-relaxed text-[#625E57] mt-4">
            Disfruta de una muestra visual de nuestras piezas en movimiento.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {VIDEO_GALLERY.map((video) => (
            <div key={video.id} className="rounded-2xl overflow-hidden border border-[#E2DFD9] bg-white shadow-sm">
              <video controls playsInline className="h-52 w-full bg-[#000] object-cover">
                <source src={video.src} type="video/mp4" />
                Tu navegador no soporta este formato de video.
              </video>
              <div className="p-4">
                <h3 className="font-serif text-base font-semibold text-[#1C1A17]">{video.title}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-[#625E57]">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. VIP LIST SIGNUP WITH INTERACTIVE DISCOUNT GENERATOR */}
      <div className="mt-28 rounded-2xl border border-[#E2DFD9] bg-gradient-to-br from-[#FBFFFC] to-[#F2EFE9]/40 p-8 md:p-14 relative overflow-hidden" id="vip-signup-box">
        <div className="absolute -bottom-10 -right-10 h-40 w-40 opacity-10 pointer-events-none rounded-full bg-[#C29F38] blur-xl"></div>
        <div className="absolute top-8 right-8 text-[#C29F38] opacity-35 pointer-events-none">
          <Crown className="h-14 w-14 stroke-1 animate-pulse" />
        </div>

        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center space-x-1.5 text-[#C29F38]">
            <Sparkle className="h-5 w-5 fill-[#C29F38]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#8F7225]">Comunidad Locks VIP</span>
            <Sparkle className="h-5 w-5 fill-[#C29F38]" />
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#1C1A17]">Únete a nuestra VIP List</h2>
          
          <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#625E57]">
            Recibe un <strong className="text-[#C29F38]">10% de descuento inmediato</strong> en tu primera compra del Atelier y sé la primera en enterarte de nuevos drops exclusivos. Elegancia en cada detalle. Accesorios de lujo pensados para la mujer moderna, audaz y sofisticada.
          </p>

          <AnimatePresence mode="wait">
            {!vipSubscribed ? (
              <motion.form 
                key="vip-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleVipSubmit} 
                className="mt-6 flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto"
              >
                <div className="relative flex-grow">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#625E57]" />
                  <input 
                    type="email" 
                    required 
                    placeholder="Tu correo de contacto..."
                    value={vipEmail}
                    onChange={(e) => setVipEmail(e.target.value)}
                    className="w-full rounded-sm border border-[#E2DFD9] bg-white pl-10 pr-4 py-3 text-xs text-[#1C1A17] focus:border-[#C29F38] focus:outline-hidden shadow-xs"
                  />
                </div>
                <button 
                  type="submit"
                  className="rounded-sm bg-[#1C1A17] hover:bg-[#C29F38] text-[#FBFFFC] px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all hover:shadow-md"
                >
                  Confirmar Suscripción
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="vip-success animate-zoom"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-sm p-6 text-center max-w-md mx-auto space-y-3"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600 mb-1">
                  <Check className="h-5 w-5" />
                </div>
                <h4 className="font-serif text-base text-green-900 font-semibold">¡Bienvenida al Atelier, Bestie!</h4>
                <p className="text-xs text-green-700 leading-relaxed">
                  Ya eres parte de nuestra VIP List oficial. Copia y aplica tu cupón de regalo en tu carrito para disfrutar del descuento:
                </p>
                <div className="font-mono bg-[#1C1A17] inline-block font-bold text-[#FBFFFC] text-sm px-4 py-2 rounded-sm border border-[#C29F38]/40 tracking-widest my-2 select-all hover:bg-[#C29F38] transition-colors cursor-pointer" title="Haga clic para seleccionar">
                  LBDPERLE
                </div>
                <p className="text-[10px] text-green-600 italic">
                  *Válido para todas las piezas capilares de nuestra selección.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Icon lists */}
          <div className="pt-6 flex justify-center items-center space-x-6 text-[#625E57]" id="vip-social-row">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center space-x-2 text-xs hover:text-[#EC1B96] transition-colors"
              title="Síguenos en Instagram"
            >
              <Instagram className="h-4 w-4" />
              <span className="font-mono text-[10px] font-bold">@locksbydanna</span>
            </a>
            <span className="text-[#E2DFD9]">⬢</span>
            <div className="flex items-center space-x-1.5 text-xs">
              <MessageCircle className="h-4 w-4 text-[#EC1B96]" />
              <span className="font-sans text-[11px]">Soporte Bestie por WhatsApp</span>
            </div>
            <span className="text-[#E2DFD9]">⬢</span>
            <div className="flex items-center space-x-1.5 text-xs">
              <HeartHandshake className="h-4 w-4 text-[#EC1B96]" />
              <span className="font-sans text-[11px]">Garantía de Lustre Vitalicio</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. LOOKBOOK CARDS DESCRIPTIVE DRAWER */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-hidden" id="details-overlay">
            {/* Dark wash backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            ></motion.div>

            <div className="absolute inset-y-0 right-0 flex max-w-full pl-10 md:pl-16">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 150 }}
                className="w-screen max-w-2xl bg-[#FBFFFC] shadow-2xl flex flex-col h-full overflow-y-auto"
                id="details-card-drawer"
              >
                {/* Detail Panel Header */}
                <div className="flex items-center justify-between border-b border-[#E2DFD9] px-6 py-5 md:px-8">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#EC1B96] font-bold">
                      LOCKS BY DANNA
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E2DFD9]"></span>
                    <span className="font-serif text-xs italic text-[#EC1B96]">
                      Taller Artesanal De Tiaras
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="rounded-full p-2 text-[#625E57] hover:bg-[#F2EFE9] hover:text-[#1C1A17] transition-all"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Detail Panel Content */}
                <div className="flex-grow p-6 md:p-8">
                  <div className="grid gap-8 lg:grid-cols-12">
                    {/* Visual representation */}
                    <div className="lg:col-span-6">
                      <div className="overflow-hidden bg-[#F2EFE9] border border-[#E2DFD9] rounded-sm relative aspect-square">
                        <img
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          style={selectedProduct.id !== "lbd-tiara" && !selectedProduct.isSet ? { mixBlendMode: "multiply" } : undefined}
                        />
                      </div>
                      
                      {/* Premium styling prompt teaser */}
                      <div className="mt-4 rounded-sm bg-[#F2EFE9]/40 border border-[#E2DFD9]/60 p-4 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#8F7225] block">
                          Modelo Certificado
                        </span>
                        <p className="mt-1 text-[11px] text-[#625E57] leading-relaxed">
                          Nuestra estructura con terminaciones finas asegura la comodidad absoluta para que luzcas tu corona con total seguridad.
                        </p>
                      </div>
                    </div>

                    {/* Spec copy and links */}
                    <div className="lg:col-span-6 flex flex-col justify-between">
                      <div>
                        {/* Identifiers */}
                        <span className="font-mono text-xs text-[#8F7225] font-semibold">
                          {selectedProduct.frenchName}
                        </span>
                        <h2 className="font-serif text-2xl font-bold text-[#1C1A17] mt-1 leading-tight">
                          {selectedProduct.name}
                        </h2>
                        
                        <div className="mt-3 flex items-center space-x-3">
                          <span className="font-mono text-base font-extrabold text-[#1C1A17]">
                            {formatCOP(selectedProduct.price)}
                          </span>
                          <span className="rounded-sm bg-[#F4E8C1] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#8F7225]">
                            Envío Gratis A Colombia y Todo El Mundo
                          </span>
                        </div>

                        {/* Description */}
                        <p className="mt-5 text-xs text-[#625E57] leading-relaxed h-auto max-h-[140px] overflow-y-auto">
                          {selectedProduct.description}
                        </p>

                        {/* Premium materials sector */}
                        <div className="mt-6 border-t border-[#F2EFE9] pt-4">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#1C1A17]">
                            Materiales Nobles Incorporados
                          </h4>
                          <p className="mt-2 text-xs italic text-[#8F7225]">
                            {selectedProduct.materials}
                          </p>
                        </div>
                      </div>

                      {/* Tryon and Add-to-bag */}
                      <div className="mt-8 border-t border-[#E2DFD9]/60 pt-6">
                        <button
                          onClick={() => {
                            onAddToCart(selectedProduct);
                            setSelectedProduct(null);
                          }}
                          className="w-full flex items-center justify-center space-x-2 rounded-sm bg-[#1C1A17] py-3 text-xs font-bold uppercase tracking-wider text-[#FBFFFC] transition-colors hover:bg-[#EC1B96]"
                        >
                          <ShoppingBag className="h-4 w-4 text-[#EC1B96]" />
                          <span>Añadir a mi Bolsa Locks</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bullet Spec Accordions */}
                  <div className="mt-10 border-t border-[#E2DFD9] pt-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1A17] mb-4">
                      Especificaciones de Diseño Sostenible
                    </h4>
                    <ul className="space-y-3">
                      {selectedProduct.details.map((detail, index) => (
                        <li key={index} className="flex items-start text-xs text-[#625E57]">
                          <ChevronRight className="h-4 w-4 text-[#EC1B96] shrink-0 mt-0.5 mr-1" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
