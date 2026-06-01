import React, { useState } from "react";
import { CartItem } from "../types";
import { X, ShoppingBag, Plus, Minus, Trash, Ticket, Check, FileText, AlertCircle, ArrowRight, MessageCircle, Copy } from "lucide-react";
import { PRODUCTS, formatCOP } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  // Coupon state
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0); // percentage
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === "LBDPERLE" || code === "ATELIER15" || code === "BESTIE10" || code === "BESTIE") {
      setAppliedDiscount(code === "BESTIE10" || code === "BESTIE" ? 10 : 15);
      setPromoMessage(`Código '${code}' aplicado: ¡${code === "BESTIE10" || code === "BESTIE" ? 10 : 15}% de descuento exclusivo!`);
    } else if (code === "NOVIA") {
      setAppliedDiscount(20);
      setPromoMessage("Código 'NOVIA' aplicado: 20% de descuento de nupcias.");
    } else {
      setPromoMessage("Código promocional inválido para Locks by Danna.");
      setTimeout(() => setPromoMessage(null), 2500);
    }
  };

  // Pricing math
  const itemsSubtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountAmount = itemsSubtotal * (appliedDiscount / 100);
  const totalAmount = itemsSubtotal - discountAmount;

  // Checkout virtual step
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [invoice, setInvoice] = useState<{ orderId: string; clientNum: string; date: string } | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const getWhatsAppUrl = (orderId: string) => {
    const phone = "573213603502";
    let message = `¡Hola Danna! ✨ Acabo de realizar mi pedido en Locks by Danna.\n\n`;
    message += `*ID de Pedido:* ${orderId}\n`;
    message += `*Fecha:* ${new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}\n\n`;
    message += `*Productos elegidos:*\n`;
    cartItems.forEach(item => {
      message += `- ${item.product.name} (x${item.quantity}) - ${formatCOP(item.product.price * item.quantity)}\n`;
    });
    if (appliedDiscount > 0) {
      message += `\n*Descuento Aplicado:* ${appliedDiscount}%`;
    }
    message += `\n*Total Estimado:* ${formatCOP(totalAmount)}\n\n`;
    message += `Entiendo que el pago se realiza exclusivamente por transferencia bancaria. ¿Me confirmas los datos para enviarte el comprobante? 💖`;
    
    return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
  };

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setInvoice({
        orderId: "LBD-" + Math.floor(100000 + Math.random() * 900000),
        clientNum: "CLI-" + Math.floor(1000 + Math.random() * 9000),
        date: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
      });
      setIsCheckingOut(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-parent">
          {/* Backdrop screen lock mask */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
          ></motion.div>

          <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="w-screen max-w-md bg-[#FBFFFC] shadow-2xl flex flex-col h-full overflow-hidden"
              id="shopping-bag-drawer"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-[#E2DFD9] px-6 py-5">
                <div className="flex items-center space-x-2.5">
                  <ShoppingBag className="h-4.5 w-4.5 text-[#EC1B96]" />
                  <h2 className="font-serif text-lg font-semibold text-[#1C1A17]">Mi Bolsa Locks</h2>
                  <span className="rounded-full bg-[#F2EFE9] px-2 py-0.5 text-xs font-mono font-medium text-[#1C1A17]">
                    {cartItems.length}
                  </span>
                </div>
                
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-[#625E57] hover:bg-[#F2EFE9] hover:text-[#1C1A17] transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Drawer Contents */}
              {invoice ? (
                /* INVOICE VIEW ON COMPLETION */
                <div className="flex-grow p-6 flex flex-col justify-between overflow-y-auto" id="checkout-invoice-view">
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 border border-amber-200 text-[#C29F38] mb-2 animate-pulse">
                        <Check className="h-5 w-5" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#1C1A17]">¡Pedido Reservado con Éxito!</h3>
                      <p className="text-[10px] text-[#8F7225] font-semibold uppercase tracking-wider mt-0.5">Atelier Locks by Danna</p>
                    </div>

                    {/* ONLY BANK TRANSFER NOTICE */}
                    <div className="bg-[#FFF8F3] border-l-4 border-[#EC1B96] p-4 text-xs space-y-1.5 rounded-r-xs">
                      <div className="flex items-center space-x-1.5 font-bold text-[#EC1B96]">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span className="uppercase tracking-wider text-[10px]">MÉTODO DE PAGO REQUERIDO</span>
                      </div>
                      <p className="text-[#625E57] leading-relaxed text-[11px]">
                        Para confirmar tu pedido en el Atelier, <strong className="text-[#1C1A17]">únicamente aceptamos pagos mediante Transferencia Bancaria Directa</strong> (Bancolombia o Nequi). Tu corona comenzará a prepararse tan pronto recibamos el comprobante.
                      </p>
                    </div>

                    {/* Bank Details Card with Copy feature */}
                    <div className="border border-[#E2DFD9] rounded-sm p-4 bg-[#F2EFE9]/40 space-y-3 relative font-sans text-xs">
                      <span className="font-mono text-[9px] text-[#625E57] block uppercase tracking-wider font-bold">Cuentas Oficiales para Transferir:</span>
                      
                      <div className="space-y-2">
                        {/* Bancolombia Option */}
                        <div className="bg-white border border-[#E2DFD9] p-2.5 rounded-xs flex justify-between items-center">
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-bold text-amber-600 uppercase block">Ahorros Bancolombia</span>
                            <span className="font-mono text-xs tracking-wide font-black text-[#1C1A17]">121-723671-82</span>
                            <span className="text-[9px] text-[#625E57] block">Titular: Diana Orozco</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy("121-723671-82", "Bancolombia")}
                            className="bg-[#F2EFE9] hover:bg-[#E2DFD9] text-[#1C1A17] hover:text-[#EC1B96] px-2.5 py-1.5 rounded-xs transition-colors text-[10px] uppercase font-bold tracking-wider flex items-center space-x-1 cursor-pointer"
                          >
                            {copiedText === "Bancolombia" ? (
                              <span className="text-green-600 font-bold text-[9px]">¡Copiado!</span>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span className="text-[9px]">Copiar</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Nequi Option */}
                        <div className="bg-white border border-[#E2DFD9] p-2.5 rounded-xs flex justify-between items-center">
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-bold text-indigo-600 uppercase block">Celular / Nequi</span>
                            <span className="font-mono text-xs tracking-wide font-black text-[#1C1A17]">321 3603502</span>
                            <span className="text-[9px] text-[#625E57] block">Titular: Diana Orozco</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy("3213603502", "Nequi")}
                            className="bg-[#F2EFE9] hover:bg-[#E2DFD9] text-[#1C1A17] hover:text-[#EC1B96] px-2.5 py-1.5 rounded-xs transition-colors text-[10px] uppercase font-bold tracking-wider flex items-center space-x-1 cursor-pointer"
                          >
                            {copiedText === "Nequi" ? (
                              <span className="text-green-600 font-bold text-[9px]">¡Copiado!</span>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span className="text-[9px]">Copiar</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Display total amount */}
                      <div className="border-t border-[#E2DFD9] pt-2.5 flex justify-between items-baseline">
                        <span className="font-serif font-semibold text-[#1C1A17]">Total a transferir:</span>
                        <span className="font-mono text-base font-black text-[#EC1B96]">{formatCOP(totalAmount)}</span>
                      </div>
                    </div>

                    {/* Mini details of order */}
                    <div className="border border-[#E2DFD9]/60 rounded-sm p-3 bg-white space-y-1.5 font-sans text-xs">
                      <div className="flex justify-between font-mono text-[9px] text-[#625E57] uppercase border-b border-[#F2EFE9] pb-1">
                        <span>Orden: {invoice.orderId}</span>
                        <span>Fecha: {invoice.date}</span>
                      </div>
                      <div className="max-h-[90px] overflow-y-auto space-y-1 pr-1">
                        {cartItems.map(item => (
                          <div key={item.product.id} className="flex justify-between text-[11px] text-[#625E57]">
                            <span className="truncate max-w-[200px]">{item.product.name} <strong className="font-mono text-[10px] text-[#8F7225]">(x{item.quantity})</strong></span>
                            <span className="font-mono text-[#1C1A17]">{formatCOP(item.product.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-[10px] text-[#625E57] leading-relaxed text-center font-sans">
                      Al hacer clic abajo, se abrirá un chat con Diana Orozco completando el detalle de tu reserva para que puedas enviarle tu comprobante bancario. ✨
                    </p>
                  </div>

                  <div className="space-y-2 mt-4">
                    {/* WHATSAPP ACTION REDIRECTION (CRITICAL USER REQUIREMENT) */}
                    <a
                      href={getWhatsAppUrl(invoice.orderId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center space-x-2 rounded-sm bg-[#25D366] hover:bg-[#20ba56] py-3 text-xs font-bold uppercase tracking-wider text-white transition-all cursor-pointer shadow-md hover:shadow-lg text-center font-sans"
                    >
                      <MessageCircle className="h-4 w-4 text-white stroke-2" />
                      <span>Terminar Compra por WhatsApp</span>
                    </a>

                    <button
                      onClick={() => {
                        onClearCart();
                        setInvoice(null);
                        onClose();
                      }}
                      className="w-full rounded-sm border border-[#E2DFD9] bg-[#FBFFFC] hover:bg-[#F2EFE9] text-[#625E57] hover:text-[#1C1A17] py-2 text-xs font-semibold tracking-wider transition-colors inline-block text-center cursor-pointer"
                    >
                      Volar Bolsa y Cerrar
                    </button>
                  </div>
                </div>
              ) : cartItems.length === 0 ? (
                /* EMPTY BAG VIEW */
                <div className="flex-grow flex flex-col items-center justify-center p-6 space-y-4" id="empty-cart-view">
                  <ShoppingBag className="h-12 w-12 text-[#E2DFD9] stroke-1" />
                  <div className="text-center space-y-1">
                    <h3 className="font-serif text-lg text-[#1C1A17]">Tu Bolsa está Vacía</h3>
                    <p className="text-xs text-[#625E57] leading-relaxed max-w-[240px]">
                      Añade joyas desde nuestra colección exclusiva o pruébalas en el salón virtual.
                    </p>
                  </div>
                </div>
              ) : (
                /* SHOPPING CART LIST AND MATH CALCULATIONS */
                <div className="flex-grow flex flex-col justify-between h-full overflow-hidden" id="active-cart-list">
                  {/* Draggable items list scroll region */}
                  <div className="flex-grow overflow-y-auto px-6 py-4 space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center space-x-3.5 border-b border-[#F2EFE9] pb-4"
                        id={`cart-item-${item.product.id}`}
                      >
                        {/* visual representation thumbnail */}
                        <div className="h-16 w-16 bg-[#F2EFE9] border border-[#E2DFD9] rounded-xs overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover"
                            style={item.product.id !== "lbd-tiara" ? { mixBlendMode: "multiply" } : undefined}
                          />
                        </div>

                        {/* Title descriptions and actions */}
                        <div className="flex-grow min-w-0 flex flex-col justify-between h-16 py-0.5">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="font-serif text-sm font-medium text-[#1C1A17] truncate max-w-[170px]" title={item.product.name}>
                                {item.product.name}
                              </h4>
                              <span className="font-mono text-xs text-[#1C1A17] font-semibold shrink-0 ml-1.5">
                               {formatCOP(item.product.price * item.quantity)}
                              </span>
                            </div>
                            <p className="text-[10px] text-[#8F7225] font-serif italic truncate">{item.product.frenchName}</p>
                          </div>

                          {/* Controls row */}
                          <div className="flex justify-between items-center">
                            {/* Quantity buttons */}
                            <div className="flex items-center space-x-1.5 border border-[#E2DFD9] rounded-xs bg-[#FBFFFC] px-1.5 py-0.5">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, -1)}
                                className="text-[#625E57] hover:text-[#EC1B96] disabled:opacity-30"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="font-mono text-xs font-semibold px-2 text-[#1C1A17] min-w-[14px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, 1)}
                                className="text-[#625E57] hover:text-[#EC1B96]"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            {/* Remove button */}
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-[#625E57] hover:text-[#ef4444] flex items-center space-x-1 text-[10px] font-bold uppercase tracking-wider"
                            >
                              <Trash className="h-3 w-3" />
                              <span className="hidden sm:inline">Eliminar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* BOTTOM RECALCULATOR & SUBMIT SECTION */}
                  <div className="border-t border-[#E2DFD9] bg-[#F2EFE9]/40 p-6 space-y-4">
                    
                    {/* Voucher application field */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-[#1C1A17] block">Cupón del Atelier (LBDPERLE / NOVIA)</label>
                      <div className="flex space-x-2">
                        <div className="relative flex-grow">
                          <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#625E57]" />
                          <input
                            type="text"
                            placeholder="Ej: LBDPERLE"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="w-full rounded-sm border border-[#E2DFD9] bg-[#FBFFFC] pl-9 pr-3.5 py-1.5 text-xs text-[#1C1A17] uppercase focus:border-[#C29F38] focus:outline-hidden"
                            id="voucher-input"
                          />
                        </div>
                        <button
                          onClick={handleApplyPromo}
                          className="rounded-sm bg-[#1C1A17] px-4 text-[10px] font-bold uppercase tracking-wider text-[#FBFFFC] transition-colors hover:bg-[#C29F38]"
                          id="apply-coupon-btn"
                        >
                          Aplicar
                        </button>
                      </div>
                      
                      {promoMessage && (
                        <p className={`text-[10px] font-medium leading-normal ${
                          appliedDiscount > 0 ? "text-green-600" : "text-[#dd4444]"
                        }`}>
                          {promoMessage}
                        </p>
                      )}
                    </div>

                    {/* Check mathematical tables */}
                    <div className="space-y-2 border-t border-[#E2DFD9]/60 pt-4 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#625E57]">Subtotal Parcial</span>
                        <span className="font-mono text-[#1C1A17]">{formatCOP(itemsSubtotal)}</span>
                      </div>
                      
                      {appliedDiscount > 0 && (
                        <div className="flex justify-between text-green-700 font-medium">
                          <span>Descuento de Campaña (-{appliedDiscount}%)</span>
                          <span className="font-mono">-{formatCOP(discountAmount)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-xs text-[#625E57]">
                        <span>Gastos de Entrega / Envío</span>
                        <span className="uppercase font-semibold tracking-wider text-green-700 text-[10px] bg-green-50 px-1.5 py-0.5 rounded-xs border border-green-100">Gratuito</span>
                      </div>

                      <div className="flex justify-between items-baseline pt-2 border-t border-[#E2DFD9]">
                        <span className="font-serif font-semibold text-[#1C1A17] text-sm">Total Estimado</span>
                        <span className="font-mono text-[#EC1B96] font-bold text-lg">
                          {formatCOP(totalAmount)}
                        </span>
                      </div>
                    </div>

                    {/* Action button */}
                    <button
                      onClick={handleSimulateCheckout}
                      disabled={isCheckingOut}
                      className="w-full flex items-center justify-center space-x-2 rounded-sm bg-[#1C1A17] py-3.5 text-xs font-bold uppercase tracking-wider text-[#FBFFFC] transition-colors hover:bg-[#EC1B96] disabled:opacity-60"
                      id="simulated-checkout-btn"
                    >
                      {isCheckingOut ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-[#EC1B96]" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Certificando encriptación...</span>
                        </>
                      ) : (
                        <span>Tramitar Compra Certificada</span>
                      )}
                    </button>
                  </div>

                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
