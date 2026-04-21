"use client";
import React, { useState, useEffect } from "react";
import { X, Megaphone, CheckCircle2, Sparkles, Calendar, Zap } from "lucide-react";

export const AnnouncementBanner = () => {
  return (
    <div className="w-full bg-[#166534] text-white py-2.5 overflow-hidden border-b border-green-700/30 shadow-md relative z-40">
      {/* Marquee Container */}
      <div className="flex whitespace-nowrap animate-marquee items-center group">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 mx-6">
            {/* Submissions Section */}
            <div className="flex items-center gap-2.5">
              <Sparkles size={16} className="text-yellow-400 animate-pulse" />
              <p className="text-sm md:text-[15px] font-medium tracking-tight">
                Submissions are <span className="font-extrabold text-yellow-400 uppercase tracking-wider">Open</span>
              </p>
            </div>

            {/* Separator Dot */}
            <span className="h-1.5 w-1.5 bg-green-400/50 rounded-full"></span>

            {/* APC Section */}
            <div className="flex items-center gap-2.5">
              <Zap size={16} className="text-yellow-400" />
              <p className="text-sm md:text-[15px] font-medium tracking-tight">
                APCs are <span className="font-extrabold text-yellow-400">FULLY WAIVED</span> for all manuscripts submitted until <span className="text-white font-semibold">31 December 2026</span>
              </p>
            </div>

            {/* Vertical Divider */}
            <span className="h-4 w-[1px] bg-green-500/40 mx-2"></span>
          </div>
        ))}
      </div>

      {/* Marquee Animation Styles */}
      <style jsx>{`
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused; /* User can pause on hover to read easily */
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

/**
 * 2. ProfessionalPopup Component
 * Ek modern modal jo website load hone par dikhega, 
 * properly themed with MPA Research colors.
 */
export const ProfessionalPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup to avoid annoying them
    const hasSeen = sessionStorage.getItem("announcementSeen");
    if (!hasSeen) {
      const timer = setTimeout(() => setIsOpen(true), 1200); 
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    sessionStorage.setItem("announcementSeen", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-[6px] transition-all duration-500">
      <div 
        className="relative bg-white rounded-[2.5rem] max-w-lg w-full overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] border border-green-100/50 animate-in fade-in zoom-in slide-in-from-bottom-8 duration-500 ease-out"
      >
        {/* Top Gradient Header */}
        <div className="bg-gradient-to-br from-[#166534] via-[#1a8344] to-[#22C55E] p-10 text-center relative overflow-hidden">
          {/* Subtle background circles for modern look */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>
          
          <button 
            onClick={closePopup}
            className="absolute top-5 right-5 text-white/70 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-all duration-200 z-10"
            aria-label="Close"
          >
            <X size={22} />
          </button>

          <div className="bg-white/15 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 backdrop-blur-xl border border-white/20 shadow-inner">
            <Megaphone size={38} className="text-white drop-shadow-sm" />
          </div>
          
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Special Announcement
          </h2>
          <p className="text-green-50 text-sm mt-2 font-medium opacity-90 uppercase tracking-[0.1em]">
            Academic Excellence 2024-2026
          </p>
        </div>

        {/* Content Body with Cream Background */}
        <div className="p-10 text-center bg-[#FEFAF5]">
          <h3 className="text-[#166534] text-xl font-bold mb-6 leading-tight">
            Accelerate Your Research Output with <br/>MPA Research
          </h3>

          <div className="space-y-4 mb-10 text-left">
            {/* Feature 1 */}
            <div className="group flex items-start gap-4 bg-white p-5 rounded-2xl border border-green-100 shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-300">
              <div className="bg-green-50 p-2 rounded-lg group-hover:bg-green-100 transition-colors">
                <CheckCircle2 className="text-green-600 shrink-0" size={22} />
              </div>
              <p className="text-[#374151] text-sm md:text-base">
                <span className="font-bold text-[#166534]">Zero Publication Fees:</span> APCs are <span className="text-green-700 font-bold">fully waived</span> for all peer-reviewed submissions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group flex items-start gap-4 bg-white p-5 rounded-2xl border border-green-100 shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-300">
              <div className="bg-orange-50 p-2 rounded-lg group-hover:bg-orange-100 transition-colors">
                <Calendar className="text-orange-600 shrink-0" size={22} />
              </div>
              <p className="text-[#374151] text-sm md:text-base">
                <span className="font-bold text-[#713F12]">Validity Period:</span> Offer valid for all manuscripts submitted by <span className="underline decoration-[#22C55E] decoration-2 underline-offset-4 font-bold text-[#166534]">31 December 2026</span>.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={closePopup}
            className="w-full bg-[#166534] hover:bg-[#114f29] text-white font-bold py-4.5 rounded-2xl transition-all shadow-[0_10px_20px_-5px_rgba(22,101,52,0.4)] active:scale-[0.97] flex items-center justify-center gap-2 text-lg"
          >
            Got it, Thank you!
          </button>
          
          <p className="mt-5 text-xs text-gray-400 font-medium italic">
            *Terms and conditions apply to all submissions
          </p>
        </div>
      </div>
    </div>
  );
};