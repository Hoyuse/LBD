import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Temporary debug code to find input_file_*.png files
try {
  const fileReport: string[] = [];
  fileReport.push("=== Workspace directory scan ===");
  fileReport.push(`cwd: ${process.cwd()}`);
  
  const scanDir = (dirPath: string, depth = 0) => {
    if (depth > 3) return;
    try {
      const files = fs.readdirSync(dirPath);
      fileReport.push(`\nDir: ${dirPath}`);
      for (const file of files) {
        const fullPath = path.join(dirPath, file);
        try {
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            fileReport.push(`  [DIR] ${file}`);
            if (file !== "node_modules" && file !== ".git" && file !== ".vite" && file !== "dist") {
              scanDir(fullPath, depth + 1);
            }
          } else {
            fileReport.push(`  [FILE] ${file} (${stat.size} bytes)`);
          }
        } catch (e) {
          fileReport.push(`  [ERROR-STAT] ${file}`);
        }
      }
    } catch (err: any) {
      fileReport.push(`  [ERROR-READ] ${dirPath}: ${err.message}`);
    }
  };

  scanDir(process.cwd());
  scanDir(path.join(process.cwd(), ".."));
  scanDir("/");

  fs.writeFileSync(path.join(process.cwd(), "src", "debug.txt"), fileReport.join("\n"));
} catch (e: any) {
  console.error("Debug write failed:", e);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for styling recommendations from our virtual master stylist
  app.post("/api/styling-advice", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      
      const { hairLength, hairColor, hairTexture, occasion, selectedProduct, userMessage } = req.body;

      // Graceful missing key interceptor - provides high fidelity dynamic preset advice
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
        const occasionName = (occasion || "boda").toLowerCase();
        const lengthName = (hairLength || "largo").toLowerCase();
        const textureName = (hairTexture || "ondulado").toLowerCase();
        const colorName = (hairColor || "castaño").toLowerCase();
        const clipName = selectedProduct || "nustro catálogo de joyas capilares";

        let responseText = `### ❈ Asesoría de Imagen de Alta Costura — Maison LBD (Simulado)

*Querida clienta, bienvenida al Atelier de consultoría virtual de Locks by Danna.*

Para habilitar las conversaciones personalizadas en tiempo real mediante **Inteligencia Artificial Gemini (versión 3.5-Flash)**, recuerde configurar su clave **GEMINI_API_KEY** en el panel de **Settings > Secrets** (Configuración > Secretos) en la barra lateral de AI Studio. 

Mientras tanto, disfrute de nuestra **Garantía del Atelier**: nuestra consultora de alta costura le brinda esta recomendación exclusiva y detallada en base a su peinado estructural seleccionado:

---

#### ⚜️ Análisis de su Perfil de Cabello
Detectamos que posee un cabello de largo **${lengthName}**, textura **${textureName}** y de tonalidad **${colorName}**. Para una ocasión de alta etiqueta de tipo **${occasionName.toUpperCase()}**, esta estructura capilar es un lienzo maravilloso para esculpir luz y elegancia.

#### 💇 Peinado de Atelier Sugerido
Para su estructura de cabello **${textureName}**, nuestro equipo de estilistas de la Maison le sugiere el peinado **"Micro-recogido Romántico de Época"**:
1. prepare las fibras con un baño nutritivo ligero para realzar el brillo natural de su melena **${colorName}**.
2. Realice ondas abiertas y fluidas, estructuradas de forma que caigan de lado en un semirrecogido asimétrico.
3. El volumen natural de su largo **${lengthName}** creará una cascada de luz increíble para lucir en su evento de **${occasionName}**.

#### 👑 Integración de Joyas LBD recomendada:
`;

        if (clipName.toLowerCase().includes("tiara") || clipName.toLowerCase().includes("duo")) {
          responseText += `*   **The Pearl Tiara (Duo de Perles)**: Recomendamos colocarla centrada como una tiara imperial elevada, permitiendo que el doble arco de oro pulido realce sus ondas de textura ${textureName} y las perlas de agua dulce floten majestuosamente sobre la coronilla. Combina a la perfección con la etiqueta exigida para una **${occasionName}**.`;
        } else if (clipName.toLowerCase().includes("slide") || clipName.toLowerCase().includes("amas")) {
          responseText += `*   **The Cluster Pearl Slide (Amas de Perles)**: Sugerimos deslizar este delicado ramillete asimétrico de perlas en el plano lateral donde se recoge el cabello fluyendo hacia atrás. Aportará una volumetría clásica y un brillo nacarado orgánico espectacular.`;
        } else if (clipName.toLowerCase().includes("knot") || clipName.toLowerCase().includes("nœud")) {
          responseText += `*   **The Blossom Knot (Nœud Fleuri)**: Ideal para dar un toque bucólico y chic de frescura. Coloque la diadema acolchada justo detrás del cerquillo o patilla para elevar sus ondas con el jacquard floral artesanal.`;
        } else if (clipName.toLowerCase().includes("geometric") || clipName.toLowerCase().includes("forme")) {
          responseText += `*   **The Geometric Slide (Forme Géométrique)**: Su diseño cubista en líneas vanguardistas de oro contrastará de forma celestial con su melena, creando un foco contemporáneo y refinado ideal para un estilo moderno.`;
        } else {
          responseText += `*   **The Pearl Tiara (Duo de Perles)** para enmarcar su rostro con finura imperial de doble arco dorado con perlas.
*   **The Cluster Pearl Slide (Amas de Perles)** colocado de lado en la sien o sobre el peinado recogido bajo para un perfil sumamente estilizado.`;
        }

        responseText += `

---

*✨ **Siguiente Paso:** Le invitamos a ir a la sección del **Probador Virtual** para probar interactivamente cómo luce **${clipName}** sobre Clara y ajustar el tamaño y rotación a su agrado.*`;

        return res.json({ text: responseText });
      }

      // Initialize Google GenAI client lazily
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      let prompt = `El usuario tiene las siguientes características de cabello y evento:
- Largo: ${hairLength || "No especificado"}
- Color: ${hairColor || "No especificado"}
- Textura: ${hairTexture || "No especificado"}
- Ocasión del evento: ${occasion || "No especificada"}`;

      if (selectedProduct) {
        prompt += `\n- Han seleccionado un producto de interés particular en nuestro atelier: ${selectedProduct}`;
      }

      if (userMessage) {
        prompt += `\n- Consulta adicional del usuario: "${userMessage}"`;
      }

      prompt += `\n\nPor favor, proporciona recomendaciones de estilismo verdaderamente sofisticadas, al nivel de un atelier de alta costura en París o Milán. 
Sugiere de 1 a 2 peinados exquisitos que luzcan fabulosos con sus características específicas y explica detalladamente cómo incorporar e integrar las siguientes joyas capilares de LBD que correspondan mejor:
1. "The Pearl Tiara" (Duo de Perles) - Diadema dorada de doble arco con perlas cultivadas cultivadas sutiles.
2. "The Cluster Pearl Slide" (Amas de Perles) - Pasador de cabello plateado decorado con ramillete de perlas asimétricas.
3. "The Blossom Knot" (Nœud Fleuri) - Diadema de tela estructurada con nudo y estampado de flores silvestres.
4. "The Geometric Slide" (Forme Géométrique) - Traba/pasador bañado en oro, de diseño constructivista y líneas arquitectónicas abstractas.

Preséntalo de forma ordenada con títulos elegantes. Recomienda peinados concretos como recogidos texturizados, ondas al agua de época, melena pulida hacia atrás, o semirrecogidos románticos. Sé apasionado y detallista, destacando los materiales de los accesorios. Termina con un tono cálido e inspirador, invitándolos a jugar y explorar en el simulador de probador virtual. Responde en español usando Markdown limpio y sofisticado.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "Eres 'LBD Hair Stylist', una estilista y consultora de imagen experta de la Maison LBD, una de las firmas de joyería capilar más exclusivas del mundo. Hablas español exquisito, poético, profesional y empático. Dedícate a guiar a las clientas para que se sientan como reinas en su evento especial, sugiriendo estilos concretos.",
          temperature: 0.75,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Error al generar consejos de estilo con IA" });
    }
  });

  // Vite middleware for asset pipeline based on environment
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
