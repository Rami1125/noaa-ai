import React from "react";
import { MessageSquare } from "lucide-react";

interface WhatsAppShareButtonProps {
  messageText: string;
  id?: string;
}

export function WhatsAppShareButton({ messageText, id }: WhatsAppShareButtonProps) {
  const handleShare = () => {
    // Strip HTML markup if any
    const plainText = messageText.replace(/<[^>]*>/g, "");
    const encoded = encodeURIComponent(plainText);
    const url = `https://wa.me/?text=${encoded}`;
    window.open(url, "_blank");
  };

  return (
    <button
      id={id || "whatsapp-share-btn"}
      onClick={handleShare}
      className="flex items-center justify-center gap-2 py-2 px-3.5 rounded-lg bg-[#25d366]/20 border border-[#25d366]/40 hover:bg-[#25d366] text-[#25d366] hover:text-black font-bold text-xs transition-all duration-300 shadow-md shadow-emerald-950/10 active:scale-95 cursor-pointer"
      title="שתף ישירות לקישור WhatsApp אמיתי"
    >
      <MessageSquare className="w-3.5 h-3.5" />
      <span>שתף ב-WhatsApp 📱</span>
    </button>
  );
}
