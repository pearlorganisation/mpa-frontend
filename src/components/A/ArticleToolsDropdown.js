"use client";
import React, { useState, useRef, useEffect } from "react";
import { Share2, Download, Quote, Printer, Copy, ChevronLeft, FileText } from "lucide-react";
import toast from "react-hot-toast";

export default function ArticleToolsDropdown({ article }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setIsSharing(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const shareTo = (platform) => {
    const url = window.location.href;
    const title = article.title;
    const links = {
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    window.open(links[platform], "_blank");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#0f766e] hover:bg-[#115e59] text-white border border-[#14b8a6] px-5 py-2.5 rounded shadow flex items-center gap-2 font-bold transition-all text-sm"
      >
        Article Tools ▼
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-50 overflow-hidden">
          {!isSharing ? (
            <>
              <ToolItem icon={<Quote size={16} />} label="Download Citation" />
              <ToolItem icon={<FileText size={16} />} label="View HTML Full Text" />
              <ToolItem icon={<Download size={16} />} label="Download PDF" onClick={() => window.open(article.files?.manuscriptFile)} />
              <div className="h-px bg-gray-100 my-2"></div>
              <ToolItem icon={<Share2 size={16} />} label="Share" onClick={() => setIsSharing(true)} />
              <ToolItem icon={<Printer size={16} />} label="Print Article" onClick={() => window.print()} />
            </>
          ) : (
            <div className="px-4 py-3">
              <button onClick={() => setIsSharing(false)} className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-4 hover:text-gray-600 uppercase">
                <ChevronLeft size={14} /> Back
              </button>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {["whatsapp", "facebook", "twitter", "linkedin"].map((p) => (
                  <button key={p} onClick={() => shareTo(p)} className="p-3 bg-gray-50 rounded hover:bg-green-50 transition-colors flex justify-center text-[#059669]">
                    <Share2 size={20} />
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Link Copied!");
                }}
                className="w-full flex items-center justify-center gap-2 py-2 bg-gray-100 rounded text-xs font-bold text-gray-700"
              >
                <Copy size={14} /> Copy Link
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ToolItem({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="w-full text-left px-5 py-3 flex items-center gap-3 hover:bg-[#FFFBEB] hover:text-[#10B981] text-sm font-medium transition-colors">
      <span className="text-gray-400">{icon}</span> {label}
    </button>
  );
}