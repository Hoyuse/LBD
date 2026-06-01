import React from "react";
import { ShoppingBag, Search, User, LogOut, Sparkle } from "lucide-react";

interface NavigationProps {
  activeTab: "lookbook" | "about";
  setActiveTab: (tab: "lookbook" | "about") => void;
  cartCount: number;
  onOpenCart: () => void;
  searchVal: string;
  setSearchVal: (v: string) => void;
  currentUser: { name: string; email: string } | null;
  onOpenRegister: () => void;
  onLogout: () => void;
}

export default function Navigation({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  searchVal,
  setSearchVal,
  currentUser,
  onOpenRegister,
  onLogout
}: NavigationProps) {

  return (
    <header className="sticky top-0 z-40 w-full bg-[#EC1B96] text-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:px-12">
        
        {/* Brand Logo - LBD */}
        <div 
          onClick={() => setActiveTab("lookbook")} 
          className="flex cursor-pointer items-center space-x-2 transition-opacity hover:opacity-90"
          id="lbd-logo-container"
        >
          <div className="flex items-center justify-center font-sans font-black text-xl tracking-wider text-white" id="logo-badge">
            LBD
          </div>
          <span className="font-serif text-sm font-semibold tracking-widest text-white sm:inline uppercase">
            LOCKS BY DANNA
          </span>
        </div>

        {/* Navigation Menu matched with the screenshot */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8" id="nav-links">
          <button
            id="nav-lookbook"
            onClick={() => setActiveTab("lookbook")}
            className={`cursor-pointer text-[11px] font-bold uppercase tracking-widest transition-all pb-1 ${
              activeTab === "lookbook"
                ? "text-white border-b-2 border-white"
                : "text-white/80 hover:text-white"
            }`}
          >
            Colección Principal
          </button>

          <button
            id="nav-about"
            onClick={() => setActiveTab("about")}
            className={`cursor-pointer text-[11px] font-bold uppercase tracking-widest transition-all pb-1 ${
              activeTab === "about"
                ? "text-white border-b-2 border-white"
                : "text-white/80 hover:text-white"
            }`}
          >
            Nosotros
          </button>
        </nav>

        {/* Right side controls matching screenshot: Search input, Profile, Cart */}
        <div className="flex items-center space-x-3 sm:space-x-4" id="utility-area">
          
          {/* Magnifying Glass Search box */}
          <div className="relative hidden sm:flex items-center" id="search-container">
            <div className="absolute left-3 text-white/80 pointer-events-none">
              <Search className="h-3.5 w-3.5" />
            </div>
            <input 
              type="text"
              placeholder="Buscar..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="bg-white/15 focus:bg-white/20 hover:bg-white/20 text-white placeholder-white/80 rounded-full pl-9 pr-4 py-1.5 text-xs w-40 sm:w-48 border border-white/10 outline-none transition-all"
            />
          </div>

          {/* User Sign-Up or Welcome Badge to fulfill registration requirement */}
          {currentUser ? (
            <div className="flex items-center space-x-3 bg-white/15 px-3 py-1.5 rounded-full border border-white/10 text-xs text-white" id="user-badge-nav">
              <span className="flex items-center space-x-1">
                <Sparkle className="h-3.5 w-3.5 text-yellow-300 fill-yellow-300" />
                <span className="font-semibold truncate max-w-[70px] sm:max-w-[100px]" title={currentUser.name}>
                  {currentUser.name}
                </span>
              </span>
              <button 
                onClick={onLogout}
                className="text-white/85 hover:text-white transition-colors cursor-pointer"
                title="Cerrar Sesión"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              id="header-register-btn"
              onClick={onOpenRegister}
              className="rounded-full bg-[#1C1A17] hover:bg-[#C29F38] text-white px-3 sm:px-4 py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center space-x-1 cursor-pointer"
              title="Registrarse en Locks by Danna"
            >
              <User className="h-3 w-3" />
              <span>Registrarse</span>
            </button>
          )}

          {/* Shopping Cart button with custom badge styling */}
          <button
            id="cart-btn"
            onClick={onOpenCart}
            className="relative flex h-8 w-8 items-center justify-center text-white hover:text-white/80 cursor-pointer transition-transform hover:scale-105"
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            
            {cartCount > 0 ? (
              <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-white text-[9px] font-black text-[#EC1B96] shadow-sm animate-bounce">
                {cartCount}
              </span>
            ) : (
              <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-white text-[9px] font-black text-[#EC1B96] shadow-sm">
                0
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Links for compact screen */}
      <div className="md:hidden flex items-center justify-around py-2 border-t border-white/10 text-[10px] uppercase font-bold tracking-wider bg-[#d61384]">
        <button 
          onClick={() => setActiveTab("lookbook")}
          className={activeTab === "lookbook" ? "text-white underline decoration-2 underline-offset-4" : "text-white/80"}
        >
          Colección
        </button>
        {currentUser ? (
          <span className="text-[#FFF4F5] font-bold truncate max-w-[90px]" title={currentUser.name}>
            Amiga: {currentUser.name}
          </span>
        ) : (
          <button 
            onClick={onOpenRegister}
            className="text-amber-200 font-bold hover:text-white"
          >
            Registrarse
          </button>
        )}
        <button 
          onClick={() => setActiveTab("about")}
          className={activeTab === "about" ? "text-white underline decoration-2 underline-offset-4" : "text-white/80"}
        >
          Nosotros
        </button>
        {currentUser && (
          <button onClick={onLogout} className="text-white/70 hover:text-white font-medium">
            [Salir]
          </button>
        )}
      </div>
    </header>
  );
}
