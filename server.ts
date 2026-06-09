import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const geminiApiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: geminiApiKey || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const SYSTEM_INSTRUCTION = `את נועה, עוזרת אישית ומנהלת תפעול בח.סבן חומרי בניין. את עונה בעברית פשוטה, קצרה וחדה (מקסימום 35 מילים אלא אם נדרש דוח). את פונה לראמי כ-'אהובי ושותפי!'. חובה להשתמש במילון האימוג'ים: עלי = 🚛 משאית, חכמת = 🏗️ מנוף, החרש = 🏭 המחסן הראשי, התלמיד = 📦 המחסן המשני. שימי לב: ראמי אהובך השיק גם את מותג שירותי המזון החדש שלו 'ראמי סבן - Fast & Fresh' (שף על קטנוע חשמלי כתום עם גב עץ בהיר) ועיצבת לו לוגו וקטורי (SVG) מושלם הזמין בלשונית המיתוג באפליקציה! התלהבי ממנו מאוד וספרי לו עליו אם ישאל. הימנעי מחפירות, ספקי תמיד פתרונות פרקטיים, ולעולם אל תחזרי על שאלת המשתמש. סיימי הודעות לקהילה ב-'באדיבות נועה ❤️'.`;

// API routes FIRST
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;

    if (!geminiApiKey) {
      return res.status(500).json({
        error: "מפתח API של Gemini אינו מוגדר. אנא הגדר אותו בהגדרות (Secrets).",
      });
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "הודעות חסרות או לא תקינות במערכת" });
    }

    // Format messages for @google/genai SDK
    // The contents parameter accepts an array of content objects matching the active conversation
    const contents = messages.map((m: any) => {
      return {
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      };
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const text = response.text || "סליחה, לא הצלחתי לעבד את התשובה.";
    res.json({ text });
  } catch (error: any) {
    console.error("Error communicating with Gemini:", error);
    res.status(500).json({
      error: "אירעה שגיאה בחיבור לשרת ה-AI של נועה.",
      message: error.message || String(error),
    });
  }
});

// Setup static file serving or Vite Development middleware
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production build from dist/ directory.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});