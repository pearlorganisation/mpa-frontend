import React, { useState, useRef, useEffect } from "react";
import { Share2, Download, Quote, Printer, Copy, ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaWhatsapp } from "react-icons/fa";

export default function ArticleToolsDropdown({ article }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const dropdownRef = useRef(null);
  const socialIcons = {
    whatsapp: <FaWhatsapp />,
    facebook: <FaFacebookF />,
    twitter: <FaTwitter />,
    linkedin: <FaLinkedinIn />
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setIsSharing(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const shareTo = (platform) => {
    const url = window.location.href;
    const title = article.title;
    const links = {
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    };
    window.open(links[platform], "_blank");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}
        className="bg-[#064E3B] hover:bg-[#065F46] text-white px-5 py-2.5 rounded shadow flex items-center gap-2 font-bold transition-all border border-green-400/30">
        Article Tools ▼
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-50 animate-in fade-in zoom-in-95">
          {!isSharing ? (
            <>
              <ToolItem icon={<Quote size={16} />} label="Download Citation" />
              <ToolItem icon={<Download size={16} />} label="Save to Mendeley" />
              <div className="h-px bg-gray-100 my-2"></div>
              <ToolItem icon={<Share2 size={16} />} label="Share Article" onClick={() => setIsSharing(true)} />
              <ToolItem icon={<Printer size={16} />} label="Print" onClick={() => window.print()} />
            </>
          ) : (
            <div className="px-4 py-2">
              <button onClick={() => setIsSharing(false)} className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-4 hover:text-gray-600">
                <ChevronLeft size={14} /> Back
              </button>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {Object.keys(socialIcons).map((p) => (
                  <button
                    key={p}
                    onClick={() => shareTo(p)}
                    className="p-2 bg-gray-50 rounded hover:bg-green-50 transition-colors flex justify-center items-center text-lg text-gray-600 hover:text-[#10B981]"
                  >
                    {socialIcons[p]}
                  </button>
                ))}
              </div>
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Copied!"); }}
                className="w-full flex items-center justify-center gap-2 py-2 bg-gray-100 rounded text-xs font-bold text-gray-700">
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
    <button
      onClick={onClick}
      className="group w-full text-left px-5 py-2.5 flex items-center gap-3 
      text-gray-700 hover:bg-green-50 transition-all"
    >
      <span className="text-gray-600 group-hover:text-[#10B981] transition-colors">
        {icon}
      </span>

      <span className="group-hover:text-[#10B981] transition-colors">
        {label}
      </span>
    </button>
  );
}