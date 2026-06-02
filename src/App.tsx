import React, { useState } from "react";
import Navigation from "./components/Navigation";
import ProductCatalog from "./components/ProductCatalog";
import CartDrawer from "./components/CartDrawer";
import RegistrationModal from "./components/RegistrationModal";
import { Product, CartItem } from "./types";
import { PRODUCTS } from "./data";
import { MapPin, Calendar, Compass, ShieldCheck, HelpCircle, Hammer, Sparkles, Star, Sparkle, ArrowRight, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useFirebase } from "./context/FirebaseContext";

export default function App() {
  const { user, fbUser, loading, appointments, logout, bookAppointment } = useFirebase();

  // Navigation active state lookbook / about
  const [activeTab, setActiveTab] = useState<"lookbook" | "about" | "vision" | "mission">("lookbook");

  // Cart orchestration state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Search input state
  const [searchVal, setSearchVal] = useState("");
  
  // Registration modal status
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Local sync to keep custom user profile matching Navigation and other details
  const currentUser = user ? { name: user.name, email: user.email } : (fbUser ? { name: fbUser.displayName || fbUser.email?.split("@")[0] || "Bestie", email: fbUser.email || "" } : null);

  const handleRegisterSuccess = (regUser: { name: string; email: string; hairType: string; hairLength: string }) => {
    // Left for legacy callbacks/safeties
  };

  const handleLogout = async () => {
    await logout();
  };

  // State-driven showroom booking checked dynamically via database
  const appointmentBooked = appointments.length > 0;
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isBookingLoading, setIsBookingLoading] = useState(false);

  const handleBookShowroom = async () => {
    if (!fbUser) {
      setBookingError("Por favor, inicia sesión o regístrate para solicitar tu cita.");
      setIsRegisterOpen(true);
      return;
    }
    setBookingError(null);
    setIsBookingLoading(true);
    try {
      await bookAppointment();
    } catch (err: any) {
      setBookingError(err?.message || "No se pudo agendar la cita. Inténtalo de nuevo.");
    } finally {
      setIsBookingLoading(false);
    }
  };

  // Cart actions
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-[#FBFFFC] flex flex-col justify-between" id="applet-viewport">
      
      {/* 1. COMPREHENSIVE LUXURY HEADER AND MOBILE NAV */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        currentUser={currentUser}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onLogout={handleLogout}
      />

      {/* 2. DYNAMIC LOOK SECTORS WITH FRAMELESS ANIMATED TRANSITIONS */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full"
          >
            {activeTab === "lookbook" && (
              <ProductCatalog
                onAddToCart={handleAddToCart}
                searchVal={searchVal}
              />
            )}

            {activeTab === "about" && (
              /* THE LUXURIOUS HOUSE OF LBD BRAND EXPERIENCE */
              <div className="mx-auto max-w-7xl px-6 py-12 md:px-12" id="about-atelier-page">
                {/* Hero Header splits */}
                <div className="grid gap-12 lg:grid-cols-12 items-center">
                  <div className="lg:col-span-5 space-y-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#C29F38]">
                      EL ARTE DETRÁS DE LBD
                    </span>
                    <h1 className="font-serif text-4xl font-normal text-[#1C1A17] sm:text-5xl lg:text-5xl leading-tight">
                      Nuestra Historia & Compromiso
                    </h1>
                    <div className="h-0.5 w-16 bg-[#C29F38]"></div>
                    <p className="text-xs leading-relaxed text-[#625E57]">
                      Fundada por Danna, la marca <strong>Locks by Danna (LBD)</strong> nació de un profundo deseo de redefinir cómo las mujeres coronan su cabello en sus ocasiones más significativas. Creemos firmemente que una joya capilar no es simplemente un accesorio decorativo, sino un reflejo sagrado de tu luz personal, estilo único y sofisticación intrínseca.
                    </p>
                    <p className="text-xs leading-relaxed text-[#625E57]">
                      Cada tiara, pasador y diadema es concebido meticulosamente uniendo las técnicas más rigurosas de la alta orfebrería con materiales nobles seleccionados con dedicación absoluta: perlas silvestres cultivadas individualmente, sedas satinadas de tejedurías italianas de primer nivel y estructuras flexibles bañadas en oro de 18k pensadas para no maltratar ninguna fibra capilar.
                    </p>
                    <p className="text-xs italic text-[#8F7225]">
                      “¡Tu corona te espera, bestie! Brilla con total seguridad sabiendo que cada pieza del Atelier fue creada pensando exclusivamente en destacar lo mejor de ti.” — Danna.
                    </p>
                  </div>

                  {/* Asymmetric lookbook display using the model itself */}
                  <div className="lg:col-span-7 relative flex justify-center">
                    <div className="relative aspect-[3/2] w-full max-w-[580px] bg-[#F2EFE9] border border-[#E2DFD9] rounded-sm overflow-hidden shadow-xl">
                      <img
                        src={new URL("./assets/images/lbd_about_afro_portrait_1780281476887.png", import.meta.url).href}
                        alt="Locks by Danna Atelier"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover brightness-[0.98]"
                      />
                      
                      {/* floating mark badge */}
                      <div className="absolute top-6 left-6 bg-[#1C1A17]/90 backdrop-blur-md px-5 py-3 text-[#FBFFFC] border border-[#E2DFD9]/20 rounded-xs">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#C29F38] block font-bold">Maison Certificada</span>
                        <span className="font-serif text-sm italic font-normal">Locks by Danna — Cartagena</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Craftsmanship manifesto grid */}
                <div className="mt-20 grid gap-6 md:grid-cols-3" id="manifesto-grid">
                  <div className="bg-[#FBFFFC] p-6 border border-[#E2DFD9] rounded-sm space-y-4 shadow-xs">
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#F2EFE9] text-[#C29F38]">
                      <Compass className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-lg font-medium text-[#1C1A17]">1. Calidad Sostenible</h3>
                    <p className="text-xs leading-relaxed text-[#625E57]">
                      Metales nobles de bajo impacto, libres de níquel y plomo. Baños de oro pulidos individualmente para asegurar un brillo inmarcesible que no altera la salud capilar.
                    </p>
                  </div>

                  <div className="bg-[#FBFFFC] p-6 border border-[#E2DFD9] rounded-sm space-y-4 shadow-xs">
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#F2EFE9] text-[#C29F38]">
                      <Star className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-lg font-medium text-[#1C1A17]">2. Perlas Seleccionadas</h3>
                    <p className="text-xs leading-relaxed text-[#625E57]">
                      Trabajamos perlas barrocas y de agua dulce procedentes de cultivos éticos certificados. Cada perla se comprueba bajo lupa de joyería para corroborar su lustre de seda.
                    </p>
                  </div>

                  <div className="bg-[#FBFFFC] p-6 border border-[#E2DFD9] rounded-sm space-y-4 shadow-xs">
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#F2EFE9] text-[#C29F38]">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-lg font-medium text-[#1C1A17]">3. Atención Personalizada</h3>
                    <p className="text-xs leading-relaxed text-[#625E57]">
                      Le brindamos un trato exclusivo y personalizado para coordinar la pieza óptima de acuerdo a sus necesidades y fisionomía capilar, asegurando una experiencia perfecta.
                    </p>
                  </div>
                </div>

                {/* Showroom appointment block */}
                <div className="mt-20 rounded-sm border border-[#E2DFD9] bg-[#F2EFE9]/40 p-8 md:p-12" id="about-showroom">
                  <div className="max-w-2xl space-y-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8F7225]">
                      Maison Privée Appointments
                    </span>
                    <h2 className="font-serif text-2xl font-normal text-[#1C1A17] sm:text-3xl">
                      Ven a Vivir Nuestro Atelier en Persona
                    </h2>
                    <p className="text-xs leading-relaxed text-[#625E57]">
                      Si eres novia, madrina, o estás preparando un estilismo especial de gala y deseas una sesión física privada de ajuste y selección, te abrimos las puertas de nuestro espacio taller exclusivo en Cartagena. Recibe asesoramiento directo de Danna, calibra la ergonomía de la tiara de tus sueños y peina tu silueta con total holgura.
                    </p>
                    
                    <div className="pt-4 flex flex-col sm:flex-row gap-4 text-xs font-mono text-[#1C1A17]">
                      <span className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-[#C29F38]" />
                        <span>Centro Histórico, Cartagena, Colombia</span>
                      </span>
                      <span className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-[#C29F38]" />
                        <span>Lunes a Sábado mediante invitación</span>
                      </span>
                    </div>

                    {!appointmentBooked ? (
                      <div className="space-y-4">
                        <button
                          onClick={handleBookShowroom}
                          disabled={isBookingLoading}
                          className="mt-6 flex items-center space-x-2 rounded-sm bg-[#1C1A17] hover:bg-[#EC1B96] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#FBFFFC] transition-colors cursor-pointer disabled:opacity-65"
                        >
                          <span>{isBookingLoading ? "Sujetando cita..." : "Solicitar Invitación de Showroom"}</span>
                          <ArrowRight className="h-4 w-4 text-[#C29F38]" />
                        </button>
                        {bookingError && (
                          <div className="flex items-center space-x-2 text-red-600 bg-red-50 border border-red-200 rounded-sm p-3 text-xs max-w-md">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <span>{bookingError}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-5 bg-[#FBFFFC] border border-[#C29F38] text-xs space-y-2 text-[#1C1A17]"
                      >
                        <h4 className="font-serif text-sm font-bold text-[#8F7225]">¡Solicitud Registrada en Firestore, Bestie!</h4>
                        <p className="text-[#625E57] leading-relaxed">
                          Danna o uno de nuestros estilistas especializados se contactará a tu correo ({currentUser?.email}) para agendar tu cita oficial y enviarte las coordenadas del showroom privado en Cartagena. ¡Te esperamos!
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>

              </div>
            )}

            {activeTab === "vision" && (
              <div className="mx-auto max-w-3xl px-6 py-16 md:px-12 md:py-20" id="vision-page">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C29F38]">Locks by Danna</span>
                <h1 className="font-serif text-4xl font-normal text-[#1C1A17] sm:text-5xl leading-tight mt-4">
                  Nuestra Visión
                </h1>
                <div className="h-0.5 w-16 bg-[#C29F38] mt-6"></div>
                <p className="text-sm leading-relaxed text-[#625E57] mt-8">
                  Ser la referencia en Latinoamérica de joyería capilar de alta costura: un espacio donde cada mujer encuentre la pieza que traduce su esencia en luz, confianza y elegancia atemporal.
                </p>
                <p className="text-sm leading-relaxed text-[#625E57] mt-4">
                  Aspiramos a que Locks by Danna inspire una nueva forma de celebrarse — en bodas, graduaciones y momentos decisivos — con accesorios artesanales que honran la diversidad del cabello y la belleza auténtica de quien los lleva.
                </p>
                <p className="text-xs italic text-[#8F7225] mt-8">
                  “Que cada corona cuente una historia de empoderamiento y sofisticación.”
                </p>
              </div>
            )}

            {activeTab === "mission" && (
              <div className="mx-auto max-w-3xl px-6 py-16 md:px-12 md:py-20" id="mission-page">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C29F38]">Locks by Danna</span>
                <h1 className="font-serif text-4xl font-normal text-[#1C1A17] sm:text-5xl leading-tight mt-4">
                  Nuestra Misión
                </h1>
                <div className="h-0.5 w-16 bg-[#C29F38] mt-6"></div>
                <p className="text-sm leading-relaxed text-[#625E57] mt-8">
                  Diseñar y confeccionar a mano tiaras, diademas y pasadores de lujo con materiales nobles, cuidando cada detalle para que se adapten con comodidad y respeto a todo tipo de cabello.
                </p>
                <p className="text-sm leading-relaxed text-[#625E57] mt-4">
                  Acompañamos a nuestras clientas con asesoría personalizada — presencial en Cartagena o virtual — para que elijan la pieza ideal según su ocasión, estilo y silueta capilar, con procesos transparentes y un trato cercano digno de una maison privada.
                </p>
                <ul className="mt-8 space-y-3 text-xs text-[#625E57]">
                  <li className="flex items-start gap-2">
                    <Sparkle className="h-4 w-4 text-[#C29F38] shrink-0 mt-0.5" />
                    <span>Artesanía meticulosa y materiales seleccionados con criterio ético.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkle className="h-4 w-4 text-[#C29F38] shrink-0 mt-0.5" />
                    <span>Experiencia de compra cálida, inclusiva y pensada para la mujer moderna.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkle className="h-4 w-4 text-[#C29F38] shrink-0 mt-0.5" />
                    <span>Compromiso con la calidad, la durabilidad y el brillo que mereces en tu gran día.</span>
                  </li>
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. CART DRAWVER TRIGGER SIDE PANEL */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* 3.5 EXCLUSIVE REGISTRATION DIALOG MODAL */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegisterSuccess={handleRegisterSuccess}
      />

      {/* 4. LUXURIOUS CRAFTED FOOTER */}
      <footer className="border-t border-[#E2DFD9] bg-[#FBFFFC] py-14 mt-24" id="atelier-footer">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid gap-8 md:grid-cols-4">
            {/* Logo copy */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="bg-[#1C1A17] text-[#FBFFFC] px-3.5 py-1 font-sans font-black text-xl tracking-widest rounded-sm">
                  LBD
                </div>
                <span className="font-serif text-sm font-bold tracking-wider text-[#1C1A17]">
                  LOCKS BY DANNA
                </span>
              </div>
              <p className="text-xs leading-relaxed text-[#625E57] max-w-sm">
                Elegancia en cada detalle. Accesorios de pelo de lujo pensados para la mujer moderna, empoderada y sofisticada. Colecciones artesanales de tiaras, diademas y pasadores pulidos a mano. ¡Tu corona te espera, bestie!
              </p>
            </div>

            {/* Event lines */}
            <div>
              <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#1C1A17] mb-3">Colecciones</h4>
              <ul className="space-y-2 text-xs text-[#625E57]">
                <li><button onClick={() => { setActiveTab("lookbook"); }} className="hover:text-[#C29F38] transition-colors text-left">Colección Principal</button></li>
                <li><button onClick={() => { setActiveTab("lookbook"); }} className="hover:text-[#C29F38] transition-colors text-left">Favoritos de Danna</button></li>
                <li><button onClick={() => { setActiveTab("lookbook"); }} className="hover:text-[#C29F38] transition-colors text-left">Sets Especiales & Ahorro</button></li>
                <li><button onClick={() => { setActiveTab("about"); }} className="hover:text-[#C29F38] transition-colors text-left">Nosotros LBD</button></li>
              </ul>
            </div>

            {/* Credentials / customer support */}
            <div>
              <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#1C1A17] mb-3">Ayuda / Contacto</h4>
              <ul className="space-y-2 text-xs text-[#625E57]">
                <li><button onClick={() => setActiveTab("about")} className="hover:text-[#C29F38] transition-colors text-left">Agendar Showroom</button></li>
                <li><a href="mailto:hola@locksbydanna.com" className="hover:text-[#C29F38] transition-colors">hola@locksbydanna.com</a></li>
                <li className="font-mono text-[10px] text-[#8F7225]">WhatsApp: +57 321 3603502</li>
                <li className="font-sans text-[11px] text-[#625E57]">Cartagena, Colombia</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-[#F2EFE9] flex flex-col md:flex-row items-center justify-center text-[11px] text-[#625E57]" id="sub-footer">
            <div className="flex space-x-4 font-mono text-[9px]" id="legal-links">
              <a href="#" className="hover:text-[#C29F38]">Términos de Servicio</a>
              <span>⬢</span>
              <a href="#" className="hover:text-[#C29F38]">Privacidad</a>
              <span>⬢</span>
              <a href="#" className="hover:text-[#C29F38]">Envíos & Devoluciones</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
