import React, { useState } from "react";
import { Sparkles, Copy, Check, ShieldCheck } from "lucide-react";

export function RamiSabanLogo() {
  const [copied, setCopied] = useState(false);

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000" flood-opacity="0.15" />
    </filter>
    <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDF8F2" />
      <stop offset="50%" stop-color="#F5ECE1" />
      <stop offset="100%" stop-color="#ECDDC5" />
    </linearGradient>
    <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FF7F4D" />
      <stop offset="100%" stop-color="#E14D16" />
    </linearGradient>
    <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1B4D22" />
      <stop offset="100%" stop-color="#2D7036" />
    </linearGradient>
  </defs>

  <!-- Clean, light wood grain background -->
  <rect width="500" height="500" fill="url(#woodGradient)" rx="24" />
  
  <!-- Subtle organic wood grain lines -->
  <path d="M 0,80 Q 150,70 300,90 T 500,80" fill="none" stroke="#D3C0A4" stroke-width="1.5" opacity="0.35" />
  <path d="M 0,220 Q 200,240 350,210 T 500,230" fill="none" stroke="#D3C0A4" stroke-width="1.2" opacity="0.35" />
  <path d="M 0,380 Q 100,360 280,390 T 500,370" fill="none" stroke="#D3C0A4" stroke-width="1.8" opacity="0.3" />
  <path d="M 0,440 Q 250,450 500,430" fill="none" stroke="#D3C0A4" stroke-width="1.0" opacity="0.2" />

  <!-- Outer Forest Green Border Ring -->
  <circle cx="250" cy="230" r="165" fill="none" stroke="#1B4D22" stroke-width="6" opacity="0.9" />

  <!-- Inner White Spacing Ring -->
  <circle cx="250" cy="230" r="159" fill="none" stroke="#FFFFFF" stroke-width="4" />

  <!-- Main Circular Emblem background (Deep Warm Orange) -->
  <circle cx="250" cy="230" r="155" fill="url(#orangeGradient)" filter="url(#shadow)" />

  <!-- Accent Circle: Forest Green Inner Dashed Ring -->
  <circle cx="250" cy="230" r="142" fill="none" stroke="#1B4D22" stroke-dasharray="8 6" stroke-width="2.5" opacity="0.8" />

  <!-- Chef riding on a sleek electric scooter with a delivery bag -->
  <g transform="translate(130, 105)">
    <!-- Electric Scooter Wheels & Frame -->
    <path d="M 40,160 L 170,160 Q 185,160 190,145" fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" />
    <path d="M 40,160 L 170,160 Q 185,160 190,145" fill="none" stroke="#1B4D22" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    
    <!-- Front Wheel -->
    <circle cx="195" cy="165" r="18" fill="#1B4D22" stroke="#FFFFFF" stroke-width="4" />
    <circle cx="195" cy="165" r="6" fill="#FFFFFF" />

    <!-- Back Wheel -->
    <circle cx="35" cy="165" r="18" fill="#1B4D22" stroke="#FFFFFF" stroke-width="4" />
    <circle cx="35" cy="165" r="6" fill="#FFFFFF" />

    <!-- Scooter Handlebar Column -->
    <line x1="180" y1="150" x2="155" y2="60" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" />
    <line x1="180" y1="150" x2="155" y2="60" stroke="#1B4D22" stroke-width="3.5" stroke-linecap="round" />
    <line x1="145" y1="60" x2="165" y2="55" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" />

    <!-- Chef Riding Figure Legs -->
    <path d="M 85,120 L 95,155 L 125,155" fill="none" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 85,120 L 95,155 L 125,155" fill="none" stroke="#1B4D22" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />

    <!-- Chef Double-Breasted Uniform -->
    <path d="M 65,80 L 105,80 L 110,125 L 75,125 Z" fill="#FFFFFF" />
    <circle cx="95" cy="90" r="3" fill="#1B4D22" />
    <circle cx="95" cy="100" r="3" fill="#1B4D22" />
    <circle cx="95" cy="110" r="3" fill="#1B4D22" />
    <circle cx="85" cy="90" r="3" fill="#1B4D22" opacity="0.4" />
    <circle cx="85" cy="100" r="3" fill="#1B4D22" opacity="0.4" />
    <circle cx="85" cy="110" r="3" fill="#1B4D22" opacity="0.4" />
    
    <!-- Forest Green Scarf -->
    <path d="M 80,78 Q 90,88 100,78 L 95,73 Z" fill="#1B4D22" />

    <!-- Smiling Chef Face -->
    <circle cx="90" cy="55" r="16" fill="#FFFFFF" />
    <path d="M 94,52 Q 97,55 94,58" fill="none" stroke="#1B4D22" stroke-width="2.5" stroke-linecap="round" />
    
    <!-- Stylized Chef Mustache -->
    <path d="M 92,62 Q 96,60 102,62 Q 106,60 102,66 Q 96,64 92,62 Z" fill="#1B4D22" />

    <!-- Classic Tall Chef Hat -->
    <path d="M 74,44 Q 68,26 84,24 Q 90,12 100,24 Q 112,24 106,44 Z" fill="#FFFFFF" stroke="#1B4D22" stroke-width="2.5" />
    <rect x="79" y="38" width="22" height="7" fill="#FFFFFF" />
    <line x1="79" y1="44" x2="101" y2="44" stroke="#1B4D22" stroke-width="1.8" />

    <!-- Arm Grasping Handlebar -->
    <path d="M 100,90 L 148,64" fill="none" stroke="#FFFFFF" stroke-width="9" stroke-linecap="round" />
    <path d="M 100,90 L 148,64" fill="none" stroke="#1B4D22" stroke-width="4" stroke-linecap="round" />

    <!-- Insulated Food Delivery Bag with Spoon & Fork Logo -->
    <rect x="33" y="80" width="35" height="42" rx="6" fill="#1B4D22" stroke="#FFFFFF" stroke-width="3" />
    <path d="M 28,73 Q 23,65 26,58" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.9" />
    <path d="M 36,71 Q 31,63 34,56" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.9" />
    <path d="M 45,93 L 45,109" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" />
    <circle cx="45" cy="94" r="3.5" fill="#FFFFFF" />
    <path d="M 55,93 L 55,109" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
    <path d="M 52,94 Q 55,97 58,94" fill="none" stroke="#FFFFFF" stroke-width="2" />
  </g>

  <!-- Elegant Solid Green Text Ribbon Banner -->
  <path d="M 120,368 Q 250,392 380,368 L 370,406 Q 250,430 130,406 Z" fill="#1B4D22" filter="url(#shadow)" />
  <path d="M 120,368 Q 250,392 380,368" fill="none" stroke="#FFFFFF" stroke-width="2.5" />
  <path d="M 130,406 Q 250,430 380,406" fill="none" stroke="#FFFFFF" stroke-width="1.5" />

  <!-- Contemporary Rounded Hebrew Typography -->
  <text x="250" y="396" 
        font-family="'Inter', system-ui, -apple-system, sans-serif" 
        font-size="24" 
        font-weight="900" 
        fill="#FFFFFF" 
        text-anchor="middle" 
        letter-spacing="1">ראמי סבן</text>

  <!-- High Contrast Slogan text below emblem -->
  <text x="250" y="442" 
        font-family="'Inter', system-ui, -apple-system, sans-serif" 
        font-size="12.5" 
        font-weight="800" 
        fill="#1B4D22" 
        text-anchor="middle" 
        letter-spacing="1.5"
        opacity="0.95">RAMI SABAN &bull; FAST &amp; FRESH</text>
</svg>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(svgContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSvgFile = () => {
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rami_saban_logo.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="logo-preview-card" className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 text-right font-sans relative overflow-hidden shadow-2xl flex flex-col items-center">
      
      {/* Absolute design ribbons for high visual standard */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF6B35]/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#1B4D22]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header and Badge status */}
      <div className="w-full flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
        <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          שירות מזון • מיתוג חדש
        </span>
        <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-1.5 direction-rtl">
          <span>סמל מותג ראמי סבן</span>
          <span className="text-emerald-500">🍟</span>
        </h3>
      </div>

      {/* Actual Live SVG rendering inside the light wood backdrop */}
      <div className="w-full max-w-[280px] aspect-square rounded-2xl overflow-hidden shadow-lg border border-zinc-700/50 hover:scale-[1.02] transition-all duration-300">
        <div dangerouslySetInnerHTML={{ __html: svgContent }} className="w-full h-full" />
      </div>

      {/* Logo meta specifications in Hebrew */}
      <div className="w-full mt-4 bg-black/40 border border-zinc-800/80 rounded-xl p-3 text-right text-[11px] text-zinc-400 space-y-1.5 select-text">
        <div className="flex justify-between direction-rtl">
          <span className="text-zinc-500">שם העסק:</span>
          <span className="font-bold text-white">ראמי סבן - שירות מזון מהיר וטרי</span>
        </div>
        <div className="flex justify-between direction-rtl">
          <span className="text-zinc-500">קונספט:</span>
          <span className="text-zinc-300">שף רכוב על קטנוע שליחויות חשמלי</span>
        </div>
        <div className="flex justify-between direction-rtl">
          <span className="text-zinc-500">צבעים:</span>
          <span className="text-[#FF7F4D] font-bold">כתום עמוק 🟠 • <span className="text-emerald-400">ירוק יער 🟢 • לבן</span></span>
        </div>
        <div className="flex justify-between direction-rtl">
          <span className="text-zinc-500">רקע:</span>
          <span className="text-amber-100/70">טקסטורת עץ בהיר דקורטיבי</span>
        </div>
      </div>

      {/* Controls: Copy and Download */}
      <div className="w-full mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={copyToClipboard}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold border border-zinc-700 active:scale-95 transition-all cursor-pointer"
          title="העתק קוד מקור של ה-SVG"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">הועתק!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-zinc-300" />
              <span>העתק SVG</span>
            </>
          )}
        </button>

        <button
          onClick={downloadSvgFile}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white text-xs font-bold shadow-md active:scale-95 transition-all cursor-pointer"
          title="הורד קובץ וקטורי מלא"
        >
          <span>הורד לוגו 📥</span>
        </button>
      </div>

      <div className="w-full mt-3 text-center">
        <span className="text-[10px] text-zinc-500 font-mono flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          לוגו וקטורי מקצועי (SVG) מוכן לשימוש דפוס ומובייל
        </span>
      </div>

    </div>
  );
}
