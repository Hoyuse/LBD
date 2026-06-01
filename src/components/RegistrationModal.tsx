import React, { useState } from "react";
import { X, User, Mail, Lock, Sparkles, AlertCircle, Sparkle, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useFirebase } from "../context/FirebaseContext";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (user: { name: string; email: string; hairType: string; hairLength: string }) => void;
}

export default function RegistrationModal({
  isOpen,
  onClose,
  onRegisterSuccess
}: RegistrationModalProps) {
  const { signUp, signIn, signInGoogle } = useFirebase();

  const [isLoginMode, setIsLoginMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hairType, setHairType] = useState("rizado");
  const [hairLength, setHairLength] = useState("largo");
  const [marketingConsent, setMarketingConsent] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);

  const handleTranslateError = (err: any) => {
    const code = err?.code || "";
    const msg = err?.message || "";
    if (code === "auth/email-already-in-use") {
      return "Este correo electrónico ya está registrado. Intenta iniciar sesión.";
    }
    if (code === "auth/invalid-email") {
      return "El correo electrónico ingresado no es válido.";
    }
    if (code === "auth/weak-password") {
      return "La contraseña es muy débil. Debe tener al menos 6 caracteres.";
    }
    if (code === "auth/wrong-password" || code === "auth/invalid-credential") {
      return "Credenciales incorrectas. Verifica tu contraseña e intenta nuevamente.";
    }
    if (code === "auth/user-not-found") {
      return "No encontramos ninguna cuenta con este correo.";
    }
    if (code === "auth/popup-closed-by-user") {
      return "El inicio de sesión de Google fue cerrado antes de finalizar.";
    }
    if (msg.includes("auth/operation-not-allowed")) {
      return "Este método de inicio de sesión no está habilitado actualmente en el proyecto.";
    }
    return msg || "Ocurrió un error inesperado al procesar la solicitud.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!isLoginMode && !name.trim()) {
      setErrorMsg("Por favor, ingrese su nombre.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Por favor, ingrese un correo electrónico válido.");
      return;
    }
    if (password.length < 5) {
      setErrorMsg("La contraseña debe tener al menos 5 caracteres.");
      return;
    }

    setIsLoading(true);
    try {
      if (isLoginMode) {
        // Sign In Flow
        await signIn(email.trim(), password);
        onRegisterSuccess({
          name: email.trim().split("@")[0],
          email: email.trim(),
          hairType: "rizado",
          hairLength: "largo"
        });
        setIsDone(true);
        setTimeout(() => {
          setIsDone(false);
          onClose();
          // Reset
          setEmail("");
          setPassword("");
        }, 1500);
      } else {
        // Sign Up Flow
        await signUp(email.trim(), password, name.trim(), hairType, hairLength);
        onRegisterSuccess({
          name: name.trim(),
          email: email.trim(),
          hairType,
          hairLength
        });
        setIsDone(true);
        setTimeout(() => {
          setIsDone(false);
          onClose();
          // Reset
          setName("");
          setEmail("");
          setPassword("");
        }, 1500);
      }
    } catch (error: any) {
      setErrorMsg(handleTranslateError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setIsLoading(true);
    try {
      await signInGoogle();
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
        onClose();
      }, 1500);
    } catch (error: any) {
      setErrorMsg(handleTranslateError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 sm:p-6" id="registration-overlay">
          {/* Backdrop screen filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          ></motion.div>

          {/* Registration form container modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative bg-[#FBFFFC] border border-[#E2DFD9] rounded-xl shadow-2xl max-w-lg w-full overflow-hidden z-10 flex flex-col justify-between"
            id="register-card"
          >
            {/* Header branding */}
            <div className="bg-gradient-to-r from-[#EC1B96] to-[#C29F38] p-5 text-white flex justify-between items-center">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFF4F5] block font-black">
                  ATELIER LOCKS BY DANNA
                </span>
                <h3 className="font-serif text-lg font-bold">
                  {isLoginMode ? "Iniciar Sesión, Bestie" : "Crear Cuenta Bestie"}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Switch Mode Tab */}
            <div className="flex border-b border-[#E2DFD9]/60 bg-[#F2EFE9]/10 text-xs font-mono">
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(false);
                  setErrorMsg(null);
                }}
                className={`flex-1 py-3 text-center border-b-2 font-bold tracking-wider transition-colors cursor-pointer ${
                  !isLoginMode 
                    ? "border-[#EC1B96] text-[#EC1B96] bg-white" 
                    : "border-transparent text-[#625E57] hover:text-[#1C1A17]"
                }`}
              >
                REGISTRARME
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(true);
                  setErrorMsg(null);
                }}
                className={`flex-1 py-3 text-center border-b-2 font-bold tracking-wider transition-colors cursor-pointer ${
                  isLoginMode 
                    ? "border-[#EC1B96] text-[#EC1B96] bg-white" 
                    : "border-transparent text-[#625E57] hover:text-[#1C1A17]"
                }`}
              >
                INICIAR SESIÓN
              </button>
            </div>

            {isDone ? (
              /* Success Anim screen */
              <div className="p-8 text-center space-y-4 my-6" id="register-success-view">
                <div className="mx-auto h-12 w-12 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-500 animate-bounce">
                  <Check className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#1C1A17]">
                    ¡{isLoginMode ? "Bienvenida de vuelta" : "Registro Exitoso"}, Bestie!
                  </h4>
                  <p className="text-xs text-[#8F7225] font-semibold mt-1">Locks by Danna — Cuenta Conectada</p>
                </div>
                <p className="text-xs text-[#625E57] max-w-sm mx-auto leading-relaxed">
                  Bienvenida a nuestra exclusiva comunidad del Atelier. Unimos tu corona con tu cabello de forma majestuosa. Redirigiendo...
                </p>
              </div>
            ) : (
              /* Core Form */
              <div className="max-h-[80vh] overflow-y-auto">
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
                  {errorMsg && (
                    <div className="flex items-start space-x-2 bg-red-50 border border-red-200 text-red-600 rounded-sm p-3 text-xs">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{errorMsg}</span>
                    </div>
                  )}

                  {/* Intro info */}
                  <p className="text-xs text-[#625E57] leading-relaxed">
                    {isLoginMode 
                      ? "Ingresa tus credenciales para sincronizar tus favoritos en la nube, consultar tus puntos Looks y revisar tus reservas activas."
                      : "Crea tu perfil capilar hoy. Al registrarte podrás guardar tus tiaras favoritas en la nube, ganar Puntos de Fidelidad y agendar citas en Cartagena."
                    }
                  </p>

                  {/* Form fields */}
                  <div className="space-y-3 font-sans text-xs">
                    {/* Name Input - Only for Sign Up */}
                    {!isLoginMode && (
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#1C1A17] block mb-1">
                          Nombre Completo
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#625E57]" />
                          <input
                            type="text"
                            required
                            placeholder="Ej: Clara Smith"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-sm border border-[#E2DFD9] bg-white pl-9 pr-4 py-2 text-xs text-[#1C1A17] focus:border-[#EC1B96] focus:outline-hidden"
                          />
                        </div>
                      </div>
                    )}

                    {/* Email Input */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#1C1A17] block mb-1">
                        Correo Electrónico
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#625E57]" />
                        <input
                          type="email"
                          required
                          placeholder="clara@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-sm border border-[#E2DFD9] bg-white pl-9 pr-4 py-2 text-xs text-[#1C1A17] focus:border-[#EC1B96] focus:outline-hidden"
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#1C1A17] block mb-1">
                        Contraseña
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#625E57]" />
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full rounded-sm border border-[#E2DFD9] bg-white pl-9 pr-4 py-2 text-xs text-[#1C1A17] focus:border-[#EC1B96] focus:outline-hidden"
                        />
                      </div>
                    </div>

                    {/* Hair settings - Only for Sign Up */}
                    {!isLoginMode && (
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#1C1A17] block mb-1">
                            Estructura de Cabello
                          </label>
                          <select
                            value={hairType}
                            onChange={(e) => setHairType(e.target.value)}
                            className="w-full rounded-sm border border-[#E2DFD9] bg-white px-3 py-2 text-xs text-[#1C1A17] focus:border-[#EC1B96] focus:outline-hidden"
                          >
                            <option value="lacio">Lacio / Liso</option>
                            <option value="ondulado">Ondulado</option>
                            <option value="rizado">Rizado / Rulos</option>
                            <option value="afro">Afro / Natural Coils</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#1C1A17] block mb-1">
                            Largo de Cabello
                          </label>
                          <select
                            value={hairLength}
                            onChange={(e) => setHairLength(e.target.value)}
                            className="w-full rounded-sm border border-[#E2DFD9] bg-white px-3 py-2 text-xs text-[#1C1A17] focus:border-[#EC1B96] focus:outline-hidden"
                          >
                            <option value="corto">Corto (Bob / Pixie)</option>
                            <option value="medio">Medio (Sien/Hombros)</option>
                            <option value="largo">Largo (Bajo Hombros)</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Consents checkbox - Only for Sign Up */}
                    {!isLoginMode && (
                      <div className="flex items-start space-x-2 pt-2">
                        <input
                          type="checkbox"
                          id="marketingConsent"
                          checked={marketingConsent}
                          onChange={(e) => setMarketingConsent(e.target.checked)}
                          className="mt-0.5 rounded-sm border-[#E2DFD9] text-[#EC1B96] focus:ring-[#EC1B96] h-3.5 w-3.5 cursor-pointer focus:outline-hidden"
                        />
                        <label id="msg-label" htmlFor="marketingConsent" className="text-[10px] text-[#625E57] cursor-pointer selection:bg-transparent">
                          Acepto recibir alertas de lanzamientos de colecciones e invitaciones VIP a muestras en Cartagena.
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Submission Control Buttons */}
                  <div className="pt-4 border-t border-[#F2EFE9] flex items-center justify-between">
                    {/* Google OAuth Quick login */}
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                      className="rounded-sm border border-[#C29F38] text-[#8F7225] hover:bg-[#F2EFE9]/40 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-wider cursor-pointer flex items-center space-x-1.5 transition-colors"
                    >
                      <span>Entrar con Google</span>
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={onClose}
                        className="rounded-sm border border-[#E2DFD9] text-[#625E57] hover:bg-[#F2EFE9] px-4 py-2 text-xs font-semibold cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-sm bg-[#1C1A17] hover:bg-[#EC1B96] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-60 flex items-center space-x-1.5 cursor-pointer"
                      >
                        {isLoading ? (
                          <span>Procesando...</span>
                        ) : (
                          <>
                            <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
                            <span>{isLoginMode ? "Ingresar" : "Registrarme"}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Bottom branding footer */}
            <div className="bg-[#F2EFE9] p-3 text-center text-[10px] text-[#625E57] border-t border-[#E2DFD9]">
              Locks by Danna • Uniendo tu corona con tu luz natural ✨
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
