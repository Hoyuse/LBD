import React, { useEffect, useMemo, useState } from "react";
import { QrCode } from "lucide-react";

const BIENVENIDA_VIDEO = new URL("../assets/videos/bienvenida.mp4", import.meta.url).href;

export default function WelcomeSection() {
  const [welcomeUrl, setWelcomeUrl] = useState("");

  useEffect(() => {
    const url = `${window.location.origin}${window.location.pathname}${window.location.search}#bienvenida`;
    setWelcomeUrl(url);

    if (window.location.hash === "#bienvenida") {
      requestAnimationFrame(() => {
        document.getElementById("bienvenida")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  const qrImageUrl = useMemo(() => {
    if (!welcomeUrl) return "";
    return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(welcomeUrl)}`;
  }, [welcomeUrl]);

  return (
    <section
      id="bienvenida"
      className="mb-14 rounded-2xl border border-[#E2DFD9] bg-[#FFFDF9] p-6 md:p-10 shadow-sm scroll-mt-24"
      aria-label="Video de bienvenida"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 items-center">
        <div className="lg:col-span-7 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C29F38]">
            Bienvenida
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1A17]">
            Video de Bienvenida — Locks by Danna
          </h2>
          <p className="text-xs leading-relaxed text-[#625E57] max-w-lg">
            Te damos la bienvenida a nuestro atelier digital. Conoce a Danna y descubre cómo cada pieza está pensada para coronar tus momentos más especiales.
          </p>
          <div className="rounded-xl overflow-hidden border border-[#E2DFD9] bg-[#1C1A17] shadow-md">
            <video
              controls
              playsInline
              preload="metadata"
              className="w-full max-h-[320px] object-contain bg-black"
              src={BIENVENIDA_VIDEO}
            >
              Tu navegador no puede reproducir este video. Visita la página con un navegador actualizado.
            </video>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
          <div className="flex items-center gap-2 text-[#8F7225]">
            <QrCode className="h-5 w-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Código QR</span>
          </div>
          <p className="text-xs leading-relaxed text-[#625E57] max-w-xs">
            Escanea con tu celular para abrir esta página directamente en el video de bienvenida. Ideal para volantes, tarjetas o redes impresas.
          </p>
          <div className="rounded-xl border-2 border-[#E2DFD9] bg-white p-4 shadow-sm min-h-[212px] flex items-center justify-center">
            {qrImageUrl ? (
              <img
                src={qrImageUrl}
                width={180}
                height={180}
                alt="Código QR: abre el video de bienvenida de Locks by Danna"
                className="block"
              />
            ) : (
              <span className="text-[10px] text-[#625E57]">Generando QR…</span>
            )}
          </div>
          {welcomeUrl && (
            <p className="text-[9px] font-mono text-[#8F7225] break-all max-w-[220px] leading-relaxed">
              {welcomeUrl}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
