import React, { useState, useRef, useEffect } from "react";
import { RamiSabanLogo } from "./components/RamiSabanLogo";
import { WhatsAppShareButton } from "./components/WhatsAppShareButton";
import {
  Send,
  Trash2,
  Sparkles,
  Search,
  BookOpen,
  ClipboardList,
  RefreshCw,
  Package,
  Cpu,
  User,
  MessageSquare,
  Truck,
  Layers,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  Flame,
  Clock,
  ExternalLink,
  ArrowRight,
  Share2,
  Check,
  Edit2,
  FileText,
  Copy,
  Plus,
  Eye,
  Settings,
  ShieldCheck,
  X,
  PhoneCall,
  Video,
  MoreVertical,
  CheckCheck,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "noa";
  text: string;
  time: string;
  isHtml?: boolean; // Support HTML style output directly
}

const parseWhatsAppTextToHtml = (text: string) => {
  if (!text) return "";
  let formatted = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  
  // Replace *text* with bold
  formatted = formatted.replace(/\*(.*?)\*/g, '<strong class="text-emerald-300 font-extrabold">$1</strong>');
  // Replace _text_ with italic
  formatted = formatted.replace(/_(.*?)_/g, '<em class="italic text-teal-200">$1</em>');
  // Replace ~text~ with strike
  formatted = formatted.replace(/~(.*?)~/g, '<span class="line-through text-zinc-500">$1</span>');
  // Replace `text` with inline code
  formatted = formatted.replace(/`(.*?)`/g, '<code class="bg-black/50 text-emerald-300 px-1 rounded font-mono text-[11px] border border-emerald-500/20">$1</code>');
  
  return formatted.replace(/\n/g, "<br/>");
};

export default function App() {
  // Current operating mode requested by the user: "chat" | "whatsapp" | "report" | "branding"
  const [workMode, setWorkMode] = useState<"chat" | "whatsapp" | "report" | "branding">("chat");

  // Chat message persistence
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("noa_chat_messages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse stored chat logs, resetting.", e);
      }
    }
    return [
      {
        id: "1",
        sender: "noa",
        text: "אהובי ושותפי! המשאית 🚛 כבר בדרך לחרש 🏭. סגרתי את פקודת השינוע מול הנהג עלי. הכל בשליטה, אל תדאג. צריכים משהו מיוחד לתלמיד 📦 היום?",
        time: "08:15",
      },
      {
        id: "2",
        sender: "user",
        text: "מה הלו\"ז להיום באתרי העבודה?",
        time: "08:16",
      },
      {
        id: "3",
        sender: "noa",
        text: `אחי ושותפי! הנה לוח הזמנים וההיערכות הלוגיסטית להיום:
        <div class="my-3 overflow-x-auto border border-emerald-500/30 rounded-lg bg-emerald-950/20 p-2 text-right">
          <table class="w-full text-xs">
            <thead>
              <tr class="border-b border-emerald-500/20 text-emerald-400 font-bold">
                <th class="p-1 pb-2">משימה / פעילות</th>
                <th class="p-1 pb-2 text-center">זמן משוער</th>
                <th class="p-1 pb-2 text-left">סטטוס</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-white/5">
                <td class="p-1.5 font-bold">משאית עלי 🚛 פריקת קסטל</td>
                <td class="p-1.5 text-center font-mono">11:30</td>
                <td class="p-1.5 text-left text-emerald-400 font-bold">✅ בתנועה</td>
              </tr>
              <tr class="border-b border-white/5">
                <td class="p-1.5 font-bold">מנוף חכמת 🏗️ מיקום בחרש</td>
                <td class="p-1.5 text-center font-mono">מיידי</td>
                <td class="p-1.5 text-left text-emerald-400 font-bold">✅ בוצע</td>
              </tr>
              <tr>
                <td class="p-1.5 font-bold">שילוח מותג מזון 'Fast & Fresh'</td>
                <td class="p-1.5 text-center font-mono">13:00</td>
                <td class="p-1.5 text-left text-amber-400 font-bold">⏳ בהכנה</td>
              </tr>
            </tbody>
          </table>
        </div>
        המנוף מתואם וערוך לעבודה בשטח. להוציא את הנחיות השינוע לקבוצת הנהגים?`,
        time: "08:17",
        isHtml: true,
      },
    ];
  });

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Simulated WhatsApp interactive state
  const [whatsappText, setWhatsappText] = useState(
    "שלום לכולם, באדיבות נועה ❤️\nמשאית 🚛 יוצאת כעת מהחרש 🏭 עם 500 שקים של צמנט לכיוון אתר קסטל. מנוף 🏗️ לספק תומך בשטח ב-11:00. נא להיערך לפריקה מיידית."
  );
  const [whatsappRecipient, setWhatsappRecipient] = useState("קבוצת הנהגים - ח. סבן");
  const [isWhatsappSent, setIsWhatsappSent] = useState(false);

  // High fidelity audio voice note simulation state
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [voicePlaybackPercent, setVoicePlaybackPercent] = useState(0);
  const voiceTimerRef = useRef<any>(null);

  // Playback timer effect for audio memo simulation
  useEffect(() => {
    if (isVoicePlaying) {
      voiceTimerRef.current = setInterval(() => {
        setVoicePlaybackPercent((prev) => {
          if (prev >= 100) {
            setIsVoicePlaying(false);
            clearInterval(voiceTimerRef.current);
            return 0;
          }
          return prev + 4;
        });
      }, 150);
    } else {
      if (voiceTimerRef.current) {
        clearInterval(voiceTimerRef.current);
      }
    }
    return () => {
      if (voiceTimerRef.current) {
        clearInterval(voiceTimerRef.current);
      }
    };
  }, [isVoicePlaying]);

  // Simulated Morning Report state for editing before preview
  const [reportDate, setReportDate] = useState("2026-06-09");
  const [reportStatus, setReportStatus] = useState("approved"); // approved, draft, pending
  const [reportNotes, setReportNotes] = useState("משאיות עלי 🚛 בתיאום שוטף. מנופי חכמת 🏗️ הוזמנו לקו האתר הראשי.");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("noa_chat_messages", JSON.stringify(messages));
  }, [messages]);

  // Handle auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const playClickSound = () => {
    try {
      const audio = new Audio("/click.mp3");
      audio.play().catch((err) => {
        console.warn("Autoplay or decoding prevented immediately playing click sound:", err);
      });
    } catch (error) {
      console.error("Failed to play sound:", error);
    }
  };

  // Trigger sound when Noa generates a response
  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg && lastMsg.sender === "noa") {
        playClickSound();
      }
    }
  }, [messages]);

  // Dictionary definitions
  const dictionaryItems = [
    { key: "עלי", emoji: "🚛", val: "משאית", desc: "סנכרון נהגים ואספקת ציוד וחומרי בניין כבדים" },
    { key: "חכמת", emoji: "🏗️", val: "מנוף", desc: "שינוע והרמת ברזל או משטחים לגובה רב באתרים" },
    { key: "החרש", emoji: "🏭", val: "המחסן הראשי", desc: "מרכז מטענים, מלט, טיח, כלי עבודה כבדים וציוד" },
    { key: "התלמיד", emoji: "📦", val: "המחסן המשני", desc: "גימור מהיר, כלי עבודה קלים, רשתות וברזל שטח" },
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const currentTimeString = new Date().toLocaleTimeString("he-IL", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Add user message to UI
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      time: currentTimeString,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputVal("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      if (!response.ok) {
        throw new Error("שגיאה בתגובת ה-API.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Check if response contains table or data representation and wrap it in simulated beautiful HTML
      let responseText = data.text || "סליחה אהובי, יש לי קושי זמני לעבד את התגובה.";
      let isOutputHtml = false;

      // Automatically construct structured HTML tables for the user if Noa replies with table syntax
      if (responseText.includes("|") && responseText.includes("---")) {
        isOutputHtml = true;
        responseText = convertMarkdownTableToHTML(responseText);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "noa",
          text: responseText,
          time: new Date().toLocaleTimeString("he-IL", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isHtml: isOutputHtml,
        },
      ]);

      // If Noa mentioned WhatsApp, automatically switch/load to WhatsApp drafting mode!
      if (responseText.includes("משאית") || responseText.includes("הזמנ") || responseText.includes("באדיבות נועה")) {
        // Strip tags if HTML to put in plain text WhatsApp
        const plainText = responseText.replace(/<[^>]*>/g, "");
        setWhatsappText(plainText);
      }

    } catch (error: any) {
      console.error("Chat communication failed:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "noa",
          text: `אוי אלוהים, אחי ושותפי... נראה שיש לי תקלה לרגע ברגל הרשת! בדוק בבקשה אם מפתח ה-Gemini מוגדר נכון. (${
            error.message || "שגיאת חיבור"
          })`,
          time: new Date().toLocaleTimeString("he-IL", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const convertMarkdownTableToHTML = (mdText: string): string => {
    const lines = mdText.split("\n");
    let htmlOutput = "";
    let inTable = false;
    let tableHeaders: string[] = [];
    let tableRows: string[][] = [];

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
        inTable = true;
        const cells = trimmed
          .split("|")
          .map((c) => c.trim())
          .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        
        if (cells.every((c) => c.includes("---"))) {
          return; // Skip table header dividers
        }

        if (tableHeaders.length === 0) {
          tableHeaders = cells;
        } else {
          tableRows.push(cells);
        }
      } else {
        if (inTable) {
          // Render collected table and close it
          htmlOutput += renderHTMLTableString(tableHeaders, tableRows);
          tableHeaders = [];
          tableRows = [];
          inTable = false;
        }
        htmlOutput += `<p class="mb-1.5">${trimmed}</p>`;
      }
    });

    if (inTable && tableHeaders.length > 0) {
      htmlOutput += renderHTMLTableString(tableHeaders, tableRows);
    }

    return htmlOutput;
  };

  const renderHTMLTableString = (headers: string[], rows: string[][]): string => {
    let result = `
    <div class="my-3 overflow-x-auto border border-emerald-500/30 rounded-lg bg-emerald-950/25 p-2 text-right">
      <table class="w-full text-xs text-right">
        <thead>
          <tr class="border-b border-emerald-500/30 text-emerald-400 font-bold font-display">
            ${headers.map((h) => `<th class="p-1.5 pb-2">${h}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (row) => `
            <tr class="border-b border-white/5 hover:bg-white/5 transition-colors">
              ${row
                .map(
                  (cell) => `
                <td class="p-1.5 font-bold text-zinc-100">${cell}</td>
              `
                )
                .join("")}
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>`;
    return result;
  };

  const clearChat = () => {
    if (window.confirm("ראמי, למחוק את היסטוריית השיחה שלך עם נועה?")) {
      setMessages([]);
      localStorage.removeItem("noa_chat_messages");
    }
  };

  // Helper parser for markdown-like text bolding in standard chat bubbles
  const renderMessageContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return <div key={index} className="h-1.5" />;

      // Highlight bullet points
      if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
        const clearText = trimmedLine.substring(2);
        return (
          <div key={index} className="flex items-start gap-1.5 my-1 text-xs">
            <span className="text-[#d4af37]">✦</span>
            <span className="text-zinc-200">{replaceBoldText(clearText)}</span>
          </div>
        );
      }

      return (
        <p key={index} className="text-xs sm:text-sm leading-relaxed mb-1">
          {replaceBoldText(trimmedLine)}
        </p>
      );
    });
  };

  const replaceBoldText = (raw: string) => {
    const parts = raw.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index} className="text-[#d4af37] font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // Load a message from Noa directly into WhatsApp Editor
  const loadMessageToWhatsApp = (text: string) => {
    // strip HTML tags if any
    const plain = text.replace(/<[^>]*>/g, "");
    setWhatsappText(plain);
    setWorkMode("whatsapp");
    setIsWhatsappSent(false);
  };

  // Pre-seed some WhatsApp text suggestions
  const updateWhatsappTextTemplate = (type: "supply" | "delay" | "coordination") => {
    setIsWhatsappSent(false);
    if (type === "supply") {
      setWhatsappText("עלי! 🚛 משאית של ח.סבן יוצאת כעת מהחרש 🏭 לדרך. אספקה מתוכננת בתוך חצי שעה אצלכם בשטח. באדיבות נועה ❤️");
    } else if (type === "delay") {
      setWhatsappText("אהובי ושותפי! יש עיכוב קטן בגלל חכמת 🏗️ המנוף הראשי. צפי פריקה מעודכן בשעה 12:30. באדיבות נועה ❤️");
    } else {
      setWhatsappText("עליכם לעדכן מיידית את חמ\"ל החרש 🏭 על הגעתכם לשטח. שחכמת 🏗️ ימתין לכם בשער המחסן המשני. באדיבות נועה ❤️");
    }
  };

  return (
    <div id="app-root" className="min-h-screen font-sans flex flex-col bg-[#050505] text-[#e5e5e5] direction-rtl select-none">
      
      {/* Dynamic Glowing Accents representing Emerald and Gold */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[400px] bg-gradient-to-b from-emerald-950/40 to-transparent blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-gradient-to-t from-emerald-900/10 to-transparent blur-[100px] pointer-events-none z-0" />

      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col relative z-10 px-0 sm:px-4 py-0 sm:py-3">
        
        {/* PREMIUM TOP HEADER BAR */}
        <header className="w-full bg-[#050505]/90 backdrop-blur-xl border-b border-[#d4af37]/25 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between sm:rounded-t-2xl gap-4 shadow-2xl relative">
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            {/* Interactive Portrait of Noa */}
            <div className="relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150"
                alt="נועה סבן"
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.35)]"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 left-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#050505] shadow-[0_0_8px_#10b981] gold-pulse"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[#d4af37] font-display font-extrabold text-lg sm:text-xl tracking-wide">
                  ח. סבן לוגיסטיקה וחומרי בניין
                </h1>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  עוזרת אישית
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5 text-xs text-emerald-400">
                <span>מנהלת תפעול:</span>
                <span className="font-bold text-slate-100">נועה עוזרת לראמי</span>
              </div>
            </div>
          </div>

          {/* ACTIVE WORK MODE SELECTOR ("שאל תמיד את המשתמש באיזה מצב תצוגה הוא מעוניין לעבוד") */}
          <div className="bg-zinc-950/90 border border-zinc-800 p-1 rounded-xl flex items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setWorkMode("chat")}
              className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                workMode === "chat"
                  ? "bg-gradient-to-r from-emerald-950 to-emerald-800 text-[#d4af37] border border-emerald-500/30 shadow-md"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>צ'אט חופשי</span>
            </button>

            <button
              onClick={() => setWorkMode("whatsapp")}
              className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                workMode === "whatsapp"
                  ? "bg-gradient-to-r from-emerald-950 to-emerald-800 text-[#d4af37] border border-emerald-500/30 shadow-md"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>עריכת WhatsApp</span>
            </button>

            <button
              onClick={() => setWorkMode("report")}
              className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                workMode === "report"
                  ? "bg-gradient-to-r from-emerald-950 to-emerald-800 text-[#d4af37] border border-emerald-500/30 shadow-md"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>צפייה בדוח בוקר</span>
            </button>

            <button
              onClick={() => setWorkMode("branding")}
              className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                workMode === "branding"
                  ? "bg-gradient-to-r from-orange-950 to-orange-850 text-[#ff7f4d] border border-orange-500/30 shadow-md"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ff7f4d]" />
              <span>מיתוג מזון 🍔</span>
            </button>
          </div>

          {/* Rami Saban Profile Frame */}
          <div className="flex items-center gap-3 bg-zinc-900/65 px-4 py-2 rounded-xl border border-zinc-800 w-full sm:w-auto justify-between sm:justify-start">
            <div className="text-right">
              <span className="block text-[10px] uppercase tracking-wider text-emerald-400 font-bold">
                מנהל כללי
              </span>
              <span className="text-white text-sm font-bold flex items-center gap-1 font-display">
                <span className="text-[#d4af37]">ראמי סבן</span>
                <span className="text-xs">👑</span>
              </span>
            </div>
            
            <div className="relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150"
                alt="ראמי סבן"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.2)]"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -top-1.5 -right-1.5 bg-[#d4af37] text-black text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                👑
              </span>
            </div>
          </div>
        </header>

        {/* INTEGRATED DUAL-PANE WORKSPACE: CHAT & APPROVAL CANVAS */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 bg-zinc-950/45 border-x border-b border-zinc-900 sm:rounded-b-2xl shadow-2xl overflow-hidden min-h-[580px]">
          
          {/* RIGHT PANEL: CHAT CONSOLE WITH ACTIVE INPUT (7 Columns) */}
          <section className="col-span-1 lg:col-span-7 flex flex-col border-l border-zinc-900 bg-black/50">
            
            {/* Top Info Bar inside Chat */}
            <div className="px-4 py-3 bg-zinc-950/90 border-b border-zinc-900 flex justify-between items-center text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>מצב נוכחי: </span>
                <span className="text-emerald-400 font-bold">
                  {workMode === "chat" ? "צ'אט חופשי מול נועה" : ""}
                  {workMode === "whatsapp" ? "עריכת הודעה ותצוגה מקדימה ל-WhatsApp" : ""}
                  {workMode === "report" ? "ייצור ואישור דוח בוקר תפעולי" : ""}
                  {workMode === "branding" ? "עיצוב ומיתוג שירותי המזון - ראמי סבן" : ""}
                </span>
              </div>
              <button
                onClick={clearChat}
                className="text-zinc-500 hover:text-red-400 transition-colors flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900/60 hover:bg-zinc-950 border border-zinc-800 text-[10px]"
              >
                <Trash2 className="w-3 h-3 text-red-500" />
                <span>אתחל הכל</span>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 max-h-[500px] min-h-[400px]">
              
              {/* If empty chat show guide */}
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
                  <div className="w-12 h-12 bg-emerald-950/35 border border-[#d4af37]/30 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <p className="text-[#d4af37] font-bold text-sm">אין הודעות פעילות עם נועה</p>
                  <p className="text-zinc-500 text-xs max-w-sm">
                    שלחו לה הודעה כמו: "מה מלאי הברזל וצמנט בתלמיד 📦?" או בקשו ממנה דוגמה של דוח או הודעה מתוכננת לאישור.
                  </p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isUser = msg.sender === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3 items-start max-w-[90%] ${
                        isUser ? "mr-auto flex-row-reverse" : "ml-auto"
                      }`}
                    >
                      {/* Interactive Profile Photo */}
                      <div className="shrink-0 mt-1">
                        {isUser ? (
                          <div className="relative">
                            <img
                              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100"
                              alt="ראמי סבן"
                              className="w-10 h-10 rounded-full object-cover border-2 border-[#d4af37]/60 shadow-[0_0_8px_rgba(212,175,55,0.15)]"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute -top-1 -right-1 bg-[#d4af37] text-black text-[7px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center shadow">
                              👑
                            </span>
                          </div>
                        ) : (
                          <div className="relative">
                            <img
                              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100"
                              alt="נועה"
                              className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500/60 shadow-[0_0_8px_rgba(16,185,129,0.15)]"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-[#050505] shadow-[0_0_4px_#10b981] gold-pulse"></span>
                          </div>
                        )}
                      </div>

                      {/* Content block */}
                      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
                        {/* Sender Label & Name */}
                        <span
                          className={`text-[10px] font-bold tracking-wider mb-1 uppercase flex items-center gap-1.5 ${
                            isUser ? "text-[#d4af37]" : "text-[#10b981]"
                          }`}
                        >
                          {isUser ? (
                            <>
                              <span>ראמי סבן</span>
                              <span className="text-[9px] opacity-70">(מנהל)</span>
                            </>
                          ) : (
                            <>
                              <span>נועה עוזרת אישית</span>
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            </>
                          )}
                        </span>

                        {/* Bubble Box with Sophisticated Dark/Gold accent */}
                        <div
                          className={`p-3.5 sm:p-4 rounded-2xl relative shadow-md transition-all ${
                            isUser
                              ? "bg-gradient-to-br from-[#064e3b] to-[#043e2e] text-white border border-emerald-700/40 rounded-tr-none text-right"
                              : "bg-[#111111] text-zinc-100 border border-[#10b981]/25 rounded-tl-none text-right"
                          }`}
                        >
                          {/* Render HTML formatted output directly if flagged */}
                          {msg.isHtml ? (
                            <div
                              className="space-y-1 text-xs sm:text-sm text-right leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: msg.text }}
                            />
                          ) : (
                            <div className="space-y-1 text-right">
                              {renderMessageContent(msg.text)}
                            </div>
                          )}

                          {/* Action controls directly inside Noa's messages to preview/approve as requested */}
                          {!isUser && (
                            <div className="mt-3.5 pt-2.5 border-t border-white/5 flex flex-wrap gap-2 justify-end">
                              <button
                                onClick={() => loadMessageToWhatsApp(msg.text)}
                                className="px-2.5 py-1 rounded bg-[#075e54]/30 hover:bg-[#075e54]/75 text-emerald-400 hover:text-white transition-colors text-[10px] font-bold flex items-center gap-1 border border-[#075e54]/40 cursor-pointer"
                              >
                                <span>📱 הדמיית WhatsApp</span>
                              </button>
                              <WhatsAppShareButton messageText={msg.text} />
                              <button
                                onClick={() => {
                                  // Auto parse metrics from message if possible or set custom values, then switch to report mode
                                  setReportNotes(msg.text.replace(/<[^>]*>/g, ""));
                                  setWorkMode("report");
                                }}
                                className="px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/30 text-[#d4af37] transition-colors text-[10px] font-bold flex items-center gap-1 border border-amber-500/20"
                              >
                                <span>📊 טען כדוח בוקר</span>
                              </button>
                            </div>
                          )}

                          {/* Timestamp */}
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-[8px] text-zinc-500 font-mono">
                              {msg.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3 items-start max-w-[80%] ml-auto">
                  <div className="shrink-0 mt-1">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100"
                      alt="נועה"
                      className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500/60"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-bold text-emerald-400 mb-1">נועה עוזרת לראמי...</span>
                    <div className="bg-[#111] text-zinc-400 px-4 py-3 rounded-2xl rounded-tl-none border border-emerald-500/20 shadow-md">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce"></span>
                        <span className="text-xs text-slate-400 mr-2">מעבדת נתוני לוגיסטיקה...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Pills */}
            <div className="px-4 py-2 bg-zinc-950/80 border-t border-zinc-900 overflow-x-auto whitespace-nowrap flex gap-2">
              <span className="text-[10px] font-bold text-[#d4af37] shrink-0 self-center border-l border-zinc-800 pl-2">
                שאל מהר:
              </span>
              <button
                onClick={() => handleSendMessage("נועה, הציגי את תוכנית סידורי העבודה ומשאיות להיום")}
                className="px-3 py-1 bg-zinc-900 rounded-full text-xs text-zinc-300 hover:text-white hover:bg-[#064e3b]/40 border border-zinc-800 transition-colors pointer"
              >
                📊 סידור העבודה להיום
              </button>
              <button
                onClick={() => handleSendMessage("האם המשאית 🚛 כבר יצאה לחרש?")}
                className="px-3 py-1 bg-zinc-900 rounded-full text-xs text-zinc-300 hover:text-white hover:bg-[#064e3b]/40 border border-zinc-800 transition-colors pointer"
              >
                🚛 בדוק סטטוס משאית
              </button>
              <button
                onClick={() => handleSendMessage("תוציאי הנחיה של תיאום שטח דחוף לנהגים")}
                className="px-3 py-1 bg-zinc-900 rounded-full text-xs text-zinc-300 hover:text-white hover:bg-[#064e3b]/40 border border-zinc-800 transition-colors pointer"
              >
                📦 תיאום נהגים בשטח
              </button>
            </div>

            {/* Form input bottom bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputVal);
              }}
              className="p-4 bg-zinc-950 border-t border-zinc-900 flex items-center gap-3"
            >
              <div className="flex-1 bg-zinc-900/90 border border-emerald-500/25 focus-within:border-[#d4af37]/60 rounded-xl px-4 py-2.5 flex items-center transition-all">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="כתוב הודעה לראמי / נועה... (היא תענה לפי מילון האימוג'ים ופניית אהובי)"
                  className="flex-1 bg-transparent border-none text-white focus:outline-none focus:ring-0 text-sm placeholder-zinc-500 text-right"
                  dir="rtl"
                />
                <span className="text-zinc-500 text-sm px-1 font-mono" title="ערוץ קול מאושר">🎙️</span>
              </div>
              
              <button
                type="submit"
                disabled={!inputVal.trim() || isTyping}
                className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#10b981] to-[#059669] hover:from-[#d4af37] text-white flex items-center justify-center shadow-lg hover:shadow-emerald-500/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <span className="text-lg">🚀</span>
              </button>
            </form>
          </section>

          {/* LEFT PANEL: INTERACTIVE NOA APPROVAL CANVAS & MOCK SIMULATOR (5 columns) */}
          <aside className="col-span-1 lg:col-span-5 flex flex-col bg-zinc-950/95 border-r border-zinc-900 relative">
            
            {/* Header of Preview Canvas */}
            <div className="p-4 bg-zinc-950 border-b border-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-[#d4af37] rounded-full gold-pulse" />
                <h2 className="text-xs font-bold uppercase text-[#d4af37]">קנבס תצוגה מקדימה ואישורים</h2>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                פעולה מקדימה מוגנת
              </span>
            </div>

            {/* THE CONTENT VARIES ACCORDING TO THE MODE */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              
              {/* DISPLAY MODE 1: WHATSAPP STREAM SIMULATOR (הדמיית WhatsApp) */}
              {workMode === "whatsapp" && (() => {
                // Dynamic simulated team history for each chosen target
                const getSimulatedHistory = (recipient: string) => {
                  if (recipient.includes("הנהגים")) {
                    return [
                      { sender: "עלי סבן 🚛", text: "בוקר טוב נועה, פקח עושה בעיות בכניסה לחרש... צריכים עזרה עם תעודת משלוח", time: "08:12", isNoa: false },
                      { sender: "נועה סבן ❤️", text: "עלי היקר, אל תדאג. דיברתי עם שומר שער ב', תתקדם אליו ישירות. ראמי אהובי מעדכן את הפקודות כרגע.", time: "08:14", isNoa: true },
                    ];
                  } else if (recipient.includes("ספקים")) {
                    return [
                      { sender: "גבריאל (החרש) 🏭", text: "שלום נועה, האם שחררתם את התשלום המאושר עבור הברזל?", time: "08:05", isNoa: false },
                      { sender: "נועה סבן ❤️", text: "גבריאל יקר, תזרים המזומנים מאושר! ראמי הבוס חתם על זה הרגע דיגיטלית.", time: "08:08", isNoa: true },
                    ];
                  } else if (recipient.includes("מנהלי עבודה")) {
                    return [
                      { sender: "אבו חאלד 🏗️", text: "נועה, המנוף ממוקם באתר קסטל אבל הנהג חמדאן עוד לא יצר קשר", time: "08:01", isNoa: false },
                      { sender: "נועה סבן ❤️", text: "קיבלתי אבו חאלד יקר. יוצרת קשר עם הנהג כעת, תתחילו להתפרס בשטח, הכל מסונכרן.", time: "08:04", isNoa: true },
                    ];
                  } else {
                    return [
                      { sender: "ראמי סבן 👑", text: "נועה, ההפצה של חומרי הבניין מוכנה?", time: "07:55", isNoa: false },
                      { sender: "נועה סבן ❤️", text: "בטח אהובי היקר! רק תציץ בטיוטה הזו ותן לי אישור לשחרר.", time: "07:56", isNoa: true },
                    ];
                  }
                };

                const simulatedHistory = getSimulatedHistory(whatsappRecipient);

                // Live Audio Chime synthesizer for native user experience
                const playBeep = () => {
                  try {
                    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = "sine";
                    osc.frequency.setValueAtTime(880, ctx.currentTime);
                    gain.gain.setValueAtTime(0.06, ctx.currentTime);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.12);
                  } catch (e) {
                    console.log("Audio feedback synthesis skipped until active interaction.");
                  }
                };

                return (
                  <div className="space-y-4">
                    
                    {/* Mode switcher info */}
                    <div className="bg-gradient-to-r from-[#064e3b]/35 to-zinc-900 border border-emerald-500/20 p-4 rounded-2xl shadow-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#25d366] animate-ping" />
                            חמ"ל WhatsApp עצמאי - הדמיה ותיאום פעולות
                          </h3>
                          <p className="text-[11.5px] text-zinc-300 leading-relaxed font-sans text-right" dir="rtl">
                            כאן נועה מנפיקה את ההודעה הרשמית של הנהלת <strong>"ח. סבן חומרי בניין"</strong>. 
                            היא לעולם לא מפיצה הודעות ללא אישור והסכמה ממך הבוס, <strong>ראמי סבן 👑</strong>.
                          </p>
                        </div>
                        <span className="text-[9px] bg-[#25d366]/20 border border-[#25d366]/40 text-[#25d366] px-2 py-0.5 rounded font-black whitespace-nowrap self-start">
                          SIM LIVE
                        </span>
                      </div>
                    </div>

                    {/* INTERACTIVE TAP SELECTION CHATS */}
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block text-right">
                        בחר חלון צ'אט פעיל להדמיה:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                        {[
                          { id: "הנהגים", name: "קבוצת הנהגים", recipient: "קבוצת הנהגים - ח. סבן", icon: "🚛" },
                          { id: "ספקים", name: "ספקים ראשיים", recipient: "ספקים ראשיים (ברזל וצמנט)", icon: "🏭" },
                          { id: "מנהלי", name: "מנהלי עבודה", recipient: "מנהלי עבודה באתרי בנייה", icon: "🏗️" },
                          { id: "ראמי", name: "ראמי סבן (אישי)", recipient: "ראמי סבן - אישי 👑", icon: "👑" },
                        ].map((grp) => {
                          const isActive = whatsappRecipient === grp.recipient || (grp.id === "ראמי" && whatsappRecipient.includes("אישי"));
                          return (
                            <button
                              key={grp.id}
                              onClick={() => {
                                setWhatsappRecipient(grp.recipient);
                                setIsWhatsappSent(false);
                                // Pre-fill context-friendly default messages
                                if (grp.id === "הנהגים") {
                                  setWhatsappText("שלום לכולם, באדיבות נועה ❤️\nמשאית 🚛 יוצאת כעת מהחרש 🏭 עם *500 שקים של צמנט* לכיוון אתרת קסטל. מנוף 🏗️ לספק תומך בשטח ב-11:00. נא להיערך לפריקה מיידית.");
                                } else if (grp.id === "ספקים") {
                                  setWhatsappText("בוקר טוב גבריאל, באדיבות נועה 🏭\nנא לאשר משיכה של *14 טון ברזל בניין* נוספים עבור אתר החרש. התשלום בוצע זה עתה על ידי ראמי סבן ומאושר במערכת.");
                                } else if (grp.id === "מנהלי") {
                                  setWhatsappText("עדכון סנכרון שטח, נועה מוסרת: נא להיערך להגעת משאיות המלט קרטל תוך כעשרים דקות. המנוף ממוקם תחת _ראפי מנהל שטח_.");
                                } else {
                                  setWhatsappText("ראמי אהובי, הכל תחת בקרה הדוקה. דוחות המלאי והמשלוחים סונכרנו. שיהיה לנו יום מבורך ורווחי! ❤️👑");
                                }
                              }}
                              className={`p-2 rounded-xl text-center transition-all flex flex-col items-center justify-center border text-[11px] font-bold cursor-pointer ${
                                isActive 
                                  ? "bg-emerald-600/20 border-emerald-500 text-white shadow" 
                                  : "bg-[#111111] border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
                              }`}
                            >
                              <span className="text-sm mb-0.5">{grp.icon}</span>
                              <span className="truncate w-full">{grp.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Quick template triggers */}
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      <span className="text-[10px] text-zinc-500 self-center">נוסחים מהירים:</span>
                      <button
                        onClick={() => updateWhatsappTextTemplate("supply")}
                        className="px-2 py-1 text-[10px] bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-slate-200 cursor-pointer transition-colors"
                      >
                        🚛 דיווח אספקה
                      </button>
                      <button
                        onClick={() => updateWhatsappTextTemplate("delay")}
                        className="px-2 py-1 text-[10px] bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-slate-200 cursor-pointer transition-colors"
                      >
                        ⚠️ הודעת עיכוב מנוף
                      </button>
                      <button
                        onClick={() => updateWhatsappTextTemplate("coordination")}
                        className="px-2 py-1 text-[10px] bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-slate-200 cursor-pointer transition-colors"
                      >
                        📋 הנחיית תיאום שטח
                      </button>
                    </div>

                    {/* High Fidelity WhatsApp Simulator Phone Container */}
                    <div className="mx-auto max-w-[320px] rounded-[36px] bg-zinc-950 border-4 border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col min-h-[440px] border-emerald-950/20">
                      <div className="absolute top-0 inset-x-0 h-4 bg-zinc-950 flex justify-between items-center px-6 text-[8px] text-zinc-400 font-mono z-30">
                        <span>{new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })}</span>
                        {/* Speaker notch */}
                        <span className="w-12 h-3 bg-zinc-950 rounded-b-lg absolute top-0 left-1/2 transform -translate-x-1/2 z-40"></span>
                        <span className="flex items-center gap-1">🔋 98% • 📶</span>
                      </div>

                      {/* WhatsApp Top bar */}
                      <div className="bg-[#075e54] pt-5 pb-2.5 px-3 flex items-center justify-between text-white z-20 shadow-md">
                        <div className="flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 cursor-pointer hover:text-emerald-300 transition-colors" onClick={() => setWorkMode("chat")} />
                          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-emerald-500 overflow-hidden shrink-0 relative">
                            <img
                              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100"
                              alt="נועה"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <span className="w-2 h-2 rounded-full bg-emerald-450 absolute bottom-0 right-0 border border-emerald-800" />
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-bold leading-tight flex items-center gap-1 justify-end">
                              נועה ח. סבן
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-450 animate-pulse" />
                            </div>
                            <span className="text-[8px] text-emerald-250 block">מחוברת כעת</span>
                          </div>
                        </div>
                        <div className="flex gap-2.5 text-white/90">
                          <Video className="w-3.5 h-3.5 hover:text-emerald-200 cursor-pointer" />
                          <PhoneCall className="w-3.5 h-3.5 hover:text-emerald-200 cursor-pointer" />
                          <MoreVertical className="w-3.5 h-3.5 hover:text-emerald-200 cursor-pointer" />
                        </div>
                      </div>

                      {/* Simulated Wallpaper background pattern */}
                      <div className="flex-1 bg-[#0b141a]/95 p-3 flex flex-col justify-end relative h-[300px] overflow-y-auto space-y-3">
                        
                        {/* Custom background pattern for WhatsApp feel */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1.5px,transparent_1.5px)] bg-[length:14px_14px] z-0" />

                        {/* Recipient Group Label Header bubble */}
                        <div className="self-center bg-[#182229] border border-zinc-800/80 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-md mb-2 text-center z-10">
                          הפצה אל: {whatsappRecipient}
                        </div>

                        {/* MOCK HISTORICAL CHAT FOR LIVE CONTEXT */}
                        <div className="space-y-2 z-10 w-full">
                          {simulatedHistory.map((m, index) => (
                            <div 
                              key={index} 
                              className={`p-2 rounded-xl text-right text-[11px] leading-relaxed max-w-[85%] relative shadow-md ${
                                m.isNoa 
                                  ? "bg-[#202c33] text-[#e9edef] ml-auto rounded-tl-none border-l-2 border-emerald-500/40" 
                                  : "bg-[#005c4b]/50 text-white mr-auto rounded-tr-none border-r-2 border-[#10b981]/40"
                              }`}
                            >
                              <div className={`text-[9px] font-black text-right mb-0.5 ${m.isNoa ? "text-[#30d6b0]" : "text-amber-400"}`}>
                                {m.sender}
                              </div>
                              <div className="font-sans whitespace-pre-wrap">{m.text}</div>
                              <div className="text-[7.5px] text-zinc-400 text-left pt-0.5 font-mono">{m.time}</div>
                            </div>
                          ))}
                        </div>

                        {/* ACTIVE INTEGRATED VOICE MEMO IN WHATSAPP FROM NOA */}
                        <div className="bg-[#202c33] text-white p-2 border border-zinc-800/60 rounded-xl max-w-[85%] ml-auto rounded-tl-none text-right relative shadow-md z-10 mt-1 flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => {
                              setIsVoicePlaying(!isVoicePlaying);
                              if(!isVoicePlaying) {
                                setVoicePlaybackPercent(0);
                              }
                            }}
                            className="w-7 h-7 rounded-full bg-[#10b981] flex items-center justify-center shrink-0 cursor-pointer hover:bg-emerald-500 transition-all active:scale-90"
                          >
                            <span className="text-white text-[9px] font-bold">
                              {isVoicePlaying ? "⏸" : "▶"}
                            </span>
                          </button>
                          
                          <div className="flex-1">
                            <div className="text-[8px] text-[#30d6b0] font-black text-right">הסבר קולי מנועה עוזרת 🎙&nbsp;</div>
                            <div className="flex items-center gap-1 mt-0.5 justify-end h-4">
                              <div className="flex-1 bg-zinc-750 h-1 rounded-full overflow-hidden mr-1 relative">
                                <div 
                                  className="bg-[#30d6b0] h-full transition-all" 
                                  style={{ width: `${voicePlaybackPercent}%` }}
                                />
                              </div>
                              {[...Array(5)].map((_, i) => (
                                <span 
                                  key={i} 
                                  className={`w-0.5 rounded bg-[#30d6b0] transition-all ${
                                    isVoicePlaying 
                                      ? "animate-pulse" 
                                      : "opacity-40"
                                  }`}
                                  style={{ 
                                    height: isVoicePlaying ? `${Math.floor(Math.random() * 10) + 4}px` : "5px",
                                    animationDelay: `${i * 0.1}s`
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                          
                          <div className="text-[7px] text-zinc-400 self-end font-mono">
                            {isVoicePlaying ? `0:${String(Math.floor((voicePlaybackPercent / 100) * 14)).padStart(2, '0')}` : "0:14"}
                          </div>
                        </div>

                        {/* WhatsApp styled Message bubble */}
                        <div className="bg-[#005c4b] text-white p-3 rounded-xl max-w-[90%] md:max-w-[85%] mr-auto rounded-tr-none text-right relative shadow-[0_2px_4px_rgba(0,0,0,0.15)] text-xs leading-relaxed space-y-1 z-10 border-r-4 border-emerald-500">
                          {/* Name mark */}
                          <div className="text-[#30d6b0] text-[9px] font-bold text-right mb-0.5">
                            נועה סבן (רובוט תפעול)
                          </div>
                          
                          {/* Styled contents */}
                          <div 
                            className="whitespace-pre-wrap font-sans text-right"
                            dangerouslySetInnerHTML={{ __html: parseWhatsAppTextToHtml(whatsappText) }}
                          />

                          {/* Bottom Status Info */}
                          <div className="flex items-center justify-end gap-1 text-[8px] text-white/50 text-left pt-1 font-mono">
                            <span>08:18</span>
                            <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
                          </div>
                        </div>
                      </div>

                      {/* WhatsApp Bottom entry bar mock */}
                      <div className="bg-[#1f2c34] p-2 flex items-center gap-1.5 border-t border-zinc-800 text-[11px] z-10 shrink-0">
                        <span className="text-emerald-500 hover:text-emerald-400 cursor-pointer">📎</span>
                        <div className="flex-1 bg-[#2a3942] rounded-full px-3 py-1 text-zinc-400 text-[10px] text-right truncate">
                          נוסח מיושר ונשלח לקבוצה
                        </div>
                        <span className="text-emerald-500 hover:text-emerald-400 cursor-pointer">🎤</span>
                      </div>
                    </div>

                    {/* FORMATTING TOOLBAR & INTUITIVE HELPER BUTTONS */}
                    <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-zinc-500 font-mono">
                          הוסף הדגשה או אימוג'ים בלחיצה:
                        </span>
                        <span className="text-[10px] text-emerald-400 font-bold font-mono">
                          סרגל הכלים של נועה
                        </span>
                      </div>
                      
                      <div className="bg-zinc-950 p-2 rounded-xl border border-zinc-900 flex flex-wrap gap-2 items-center justify-between">
                        {/* Text stylers */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setWhatsappText(prev => prev + " *תיעוד של משאית*")}
                            className="px-2 py-0.5 bg-zinc-900 hover:bg-zinc-800 hover:text-emerald-400 text-[10px] text-white rounded font-mono font-bold transition-all cursor-pointer"
                            title="מודגש (Bold)"
                          >
                            *B* מודגש
                          </button>
                          <button
                            type="button"
                            onClick={() => setWhatsappText(prev => prev + " _בתיאום אישי_")}
                            className="px-2 py-0.5 bg-zinc-900 hover:bg-zinc-800 hover:text-teal-400 text-[10px] text-white rounded font-mono italic transition-all cursor-pointer"
                            title="נטוי (Italic)"
                          >
                            _I_ נטוי
                          </button>
                          <button
                            type="button"
                            onClick={() => setWhatsappText(prev => prev + " ~נמוך~")}
                            className="px-2 py-0.5 bg-zinc-900 hover:bg-zinc-800 text-[10px] text-white rounded font-mono line-through transition-all cursor-pointer"
                            title="קו חוצה"
                          >
                            ~S~ מבוטל
                          </button>
                          <button
                            type="button"
                            onClick={() => setWhatsappText(prev => prev + " `14 טון`")}
                            className="px-2 py-0.5 bg-zinc-900 hover:bg-zinc-800 text-[10px] text-white rounded font-mono transition-all cursor-pointer"
                            title="קוד מוטבע"
                          >
                            ` קוד
                          </button>
                        </div>
                        
                        {/* Instant operations Emojis */}
                        <div className="flex gap-1.5">
                          {["🚛", "🏗️", "📦", "🏭", "👑", "❤️", "✅", "⚠️", "⏱️"].map(emoji => (
                            <button
                              key={emoji}
                              type="button"
                              onClick={() => setWhatsappText(prev => prev + " " + emoji)}
                              className="text-base p-0.5 hover:bg-zinc-800 rounded transition-all cursor-pointer"
                              title={`הקלד ${emoji}`}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Interactive editor inputs for Rami below preview */}
                    <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800 space-y-3">
                      <label className="block text-xs font-bold text-[#d4af37]">ערוך והתאם את נוסח ההודעה:</label>
                      <textarea
                        value={whatsappText}
                        onChange={(e) => setWhatsappText(e.target.value)}
                        rows={4}
                        className="w-full text-xs bg-zinc-950 text-white border border-zinc-800 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500 text-right font-sans"
                        dir="rtl"
                      />

                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">בחר קבוצת יעד להפצה:</label>
                        <select
                          value={whatsappRecipient}
                          onChange={(e) => {
                            setWhatsappRecipient(e.target.value);
                            setIsWhatsappSent(false);
                          }}
                          className="w-full text-xs bg-zinc-950 text-white border border-zinc-800 rounded-lg p-2 focus:outline-none text-right"
                        >
                          <option value="קבוצת הנהגים - ח. סבן">🚛 קבוצת הנהגים - ח. סבן</option>
                          <option value="ספקים ראשיים (ברזל וצמנט)">🏭 ספקים ראשיים (ברזל וצמנט)</option>
                          <option value="מנהלי עבודה באתרי בנייה">🏗️ מנהלי עבודה באתרי בנייה</option>
                          <option value="ראמי סבן - אישי 👑">👑 ראמי סבן - אישי</option>
                        </select>
                      </div>

                      <div className="pt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsWhatsappSent(true);
                            playBeep();
                            // Post to chat
                            setMessages((prev) => [
                              ...prev,
                              {
                                id: Date.now().toString(),
                                sender: "user",
                                text: `אני מאשר ומפיץ את ההודעה ל-${whatsappRecipient}!`,
                                time: new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }),
                              },
                              {
                                id: (Date.now() + 1).toString(),
                                sender: "noa",
                                text: `עלי! 🚛 ההפצה אל **${whatsappRecipient}** בוצעה בהצלחה מלאה. אין עליך אחי ושותפי! 👑`,
                                time: new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }),
                              },
                            ]);
                          }}
                          className="flex-1 py-2 rounded-lg bg-[#25d366] text-black font-extrabold text-xs hover:bg-[#20ba5a] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Check className="w-4 h-4 text-black" />
                          <span>אשר ושגר ל-WhatsApp ✅</span>
                        </button>
                        <WhatsAppShareButton messageText={whatsappText} />
                      </div>

                      {isWhatsappSent && (
                        <div className="bg-emerald-950/20 text-emerald-400 border border-emerald-500/30 p-2.5 rounded-lg text-center text-[11px] font-bold">
                          ✓ הודעת ה-WhatsApp הופצה באופן סופי ואושרה על ידי ראמי סבן!
                        </div>
                      )}
                    </div>

                  </div>
                );
              })()}

              {/* DISPLAY MODE 2: MORNING EXECUTIVE REPORT (דוח בוקר תפעולי) */}
              {workMode === "report" && (
                <div className="space-y-4">
                  
                  {/* Mode switcher info */}
                  <div className="bg-[#1b190f]/40 border border-[#d4af37]/30 p-3 rounded-xl">
                    <h3 className="text-xs font-bold text-[#d4af37] mb-1 flex items-center gap-1.5">
                      <ClipboardList className="w-4 h-4" />
                      פקודת דוח בוקר - ח. סבן חומרי בניין
                    </h3>
                    <p className="text-[11px] text-zinc-300 leading-relaxed">
                      כאן ניתן לייצר ולבחון את דוח הבוקר של חמ"ל ח. סבן לוגיסטיקה. נועה מאגדת את נתוני מלאי המחסנים ודורשת אישור ראמי.
                    </p>
                  </div>

                  {/* Preview of styled HTML Report Card */}
                  <div className="bg-[#111111] p-5 rounded-2xl border border-zinc-800 shadow-2xl text-right text-xs relative overflow-hidden space-y-4">
                    {/* Golden structural stamp */}
                    <div className="absolute top-0 left-0 bg-[#d4af37] text-black text-[9px] font-black px-3 py-1 rounded-br-2xl uppercase tracking-wider">
                      דוח מנהלים מאושר
                    </div>

                    <div className="border-b border-zinc-800 pb-3 flex justify-between items-end">
                      <div className="text-left font-mono text-[9px] text-zinc-500">
                        סימוכין: SB-{reportDate.replace(/-/g, "")}
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-[#d4af37]">דוח בוקר תפעולי כללי</h4>
                        <span className="text-[10px] text-zinc-400">תאריך הוצאה: {reportDate}</span>
                      </div>
                    </div>

                    {/* Logistical progress overview (No stock/inventory calculations) */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-900 text-center">
                        <span className="text-[9px] text-zinc-500 block">סניפים פעילים</span>
                        <span className="text-xs font-bold text-emerald-400">החרש 🏭 &amp; התלמיד 📦</span>
                        <span className="block text-[8px] text-emerald-500/80 font-bold mt-1">✓ סנכרון תפעולי תקין</span>
                      </div>
                      <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-900 text-center">
                        <span className="text-[9px] text-zinc-500 block">תיאום שטח</span>
                        <span className="text-xs font-bold text-emerald-400">משאיות עלי 🚛</span>
                        <span className="block text-[8px] text-emerald-500/80 font-bold mt-1">✓ נהגים בדרכים בטוחות</span>
                      </div>
                    </div>

                    {/* Status selection indicator */}
                    <div className="flex justify-between items-center bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
                      <span className="text-zinc-400 text-[10px]">סטטוס אישור הבוס ראמי:</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        reportStatus === "approved" 
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30" 
                          : "bg-red-950 text-red-400 border border-red-500/30"
                      }`}>
                        {reportStatus === "approved" ? "✓ מאושר סופית" : "⚠️ טיוטה / בהמתנה"}
                      </span>
                    </div>

                    {/* Report Text / Free notes */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-zinc-500 block">הערות לוגיסטיקה (נועה):</span>
                      <p className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-zinc-300 italic text-[11px] leading-relaxed">
                        {reportNotes}
                      </p>
                    </div>

                    {/* Official signature requirement */}
                    <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-[10px] text-zinc-500">
                      <span>חתימה דיגיטלית: <strong className="text-emerald-400">באדיבות נועה ❤️</strong></span>
                      <span className="font-mono">ח.סבן חומרי בניין בע"מ</span>
                    </div>
                  </div>

                  {/* Interactive editor inputs for Rami below report */}
                  <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800 space-y-3">
                    <h4 className="text-xs font-bold text-[#d4af37]">עדכן נתוני דוח הבוקר:</h4>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <label className="block text-[10px] text-zinc-400 mb-1">תאריך הוצאת הדוח:</label>
                        <input
                          type="date"
                          value={reportDate}
                          onChange={(e) => setReportDate(e.target.value)}
                          className="w-full text-xs bg-zinc-950 text-white border border-zinc-800 rounded p-1.5 text-center"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-1">הערות דוח לוגיסטי:</label>
                      <textarea
                        value={reportNotes}
                        onChange={(e) => setReportNotes(e.target.value)}
                        rows={2}
                        className="w-full text-xs bg-zinc-950 text-white border border-zinc-800 rounded p-2 text-right text-zinc-200"
                        dir="rtl"
                      />
                    </div>

                    <div className="flex gap-2.5 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setReportStatus("approved");
                          setMessages((prev) => [
                            ...prev,
                            {
                              id: Date.now().toString(),
                              sender: "user",
                              text: `אני מאשר ומפרסם דוח בוקר תפעולי לתאריך ${reportDate}!`,
                              time: new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }),
                            },
                            {
                              id: (Date.now() + 1).toString(),
                              sender: "noa",
                              text: `אחי ושותפי! דוח הבוקר הלוגיסטי לתאריך ${reportDate} אושר ונשמר בהצלחה. סידור העבודה עודכן מערכתית למשאיות ומנופים! נאחל יום מוצלח ומלא עסקאות! באדיבות נועה ❤️`,
                              time: new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }),
                            },
                          ]);
                        }}
                        className="flex-1 py-2 bg-[#d4af37] text-black font-extrabold text-xs rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>אשר והפץ דוח בוקר ✅</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* DISPLAY MODE 3: DEFAULT CHAT INFO & LIVE WAREHOUSE STATE */}
              {workMode === "chat" && (
                <div className="space-y-4">
                  
                  {/* Live Dictionary of Noa's Protocol */}
                  <div className="bg-[#111] p-3 rounded-xl border border-zinc-900 space-y-2.5">
                    <h3 className="text-xs font-bold text-[#d4af37] border-b border-zinc-800 pb-2">
                       מילון האימוג'ים המאושר של נועה
                    </h3>
                    <div className="space-y-2">
                      {dictionaryItems.map((item, id) => (
                        <div key={id} className="flex justify-between items-center text-xs text-zinc-300">
                          <span className="font-semibold text-slate-100 flex items-center gap-2">
                            <span className="text-base">{item.emoji}</span>
                            <span>{item.key} = {item.val}</span>
                          </span>
                          <span className="text-[10px] text-zinc-500">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active shipments */}
                  <div className="bg-[#111] p-3 rounded-xl border border-zinc-900 space-y-2.5">
                    <h3 className="text-xs font-bold text-emerald-400 border-b border-zinc-800 pb-2 flex items-center justify-between">
                      <span>משאיות הובלה פעילות 🚛</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 gold-pulse"></span>
                    </h3>
                    
                    <div className="space-y-2 text-xs">
                      <div className="p-2 bg-zinc-950 rounded border border-zinc-900-30 hover:border-emerald-600/30 transition-all">
                        <div className="flex justify-between font-bold text-[#d4af37]">
                          <span>משאית פריקה 14-304-20</span>
                          <span>בדרך 🚛</span>
                        </div>
                        <p className="text-[10px] text-zinc-400 mt-1">
                          מטען: אספקת ציוד וחומרי בניין לחרש 🏭. הגעה צפויה עוד 15 דקות.
                        </p>
                      </div>

                      <div className="p-2 bg-zinc-950 rounded border border-zinc-900 focus:outline-none">
                        <div className="flex justify-between font-bold text-slate-300">
                          <span>מנוף חכמת 🏗️ 99-102-30</span>
                          <span>מתואם למחר</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 mt-1">
                          תיאום מפעיל מנוף פריקה מהתלמיד 📦 לקו השטח.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Crew & Driver Contacts Table */}
                  <div className="bg-[#111] p-3 rounded-xl border border-zinc-900 space-y-2.5">
                    <h3 className="text-xs font-bold text-[#d4af37] border-b border-zinc-800 pb-2">
                      אנשי צוות ונהגים פעילים 👷‍♂️
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center p-2 bg-zinc-950 rounded border border-zinc-900">
                        <div>
                          <span className="font-bold text-zinc-200 block">אבו עלי</span>
                          <span className="text-[9px] text-zinc-400">נהג משאית 🚛 (עלי 1)</span>
                        </div>
                        <span className="text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded text-[10px] font-bold">זמין בנייד</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-zinc-950 rounded border border-zinc-900">
                        <div>
                          <span className="font-bold text-zinc-200 block">חכמת אל-מנוף</span>
                          <span className="text-[9px] text-zinc-400">מפעיל מנוף 🏗️ (חכמת)</span>
                        </div>
                        <span className="text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded text-[10px] font-bold">באתר החרש</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {workMode === "branding" && (
                <div id="branding-container" className="p-1">
                  <RamiSabanLogo />
                </div>
              )}

            </div>

            {/* Canvas Bottom footer */}
            <div className="p-4 bg-zinc-950 border-t border-zinc-900 space-y-2.5">
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  סטטוס אבטחת מנהלים:
                </span>
                <span className="font-bold text-emerald-400">מחובר ישירות (SSL)</span>
              </div>
              <p className="text-[10px] text-zinc-500 text-center leading-relaxed">
                ממשק מאושר ומנוהל על ידי ראמי סבן 👑. כל תקשורת ואישור דוח עוברים הצפנת ערוץ מאובטח.
              </p>
            </div>
          </aside>

        </div>

        {/* Global corporate footer */}
        <footer className="mt-4 px-4 py-3 bg-[#050505] border border-zinc-900 rounded-xl flex flex-col md:flex-row justify-between items-center gap-2.5 text-xs text-zinc-500">
          <div className="flex items-center gap-1">
            <span>מערכת ניהול תפעול ח. סבן חומרי בניין בע"מ. כל הזכויות שמורות &copy; 2026</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#d4af37] font-bold">באדיבות נועה ❤️</span>
            <span className="text-zinc-700">|</span>
            <span className="text-emerald-500/80">תמיכת RTL מוחלטת ומעוצבת</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
