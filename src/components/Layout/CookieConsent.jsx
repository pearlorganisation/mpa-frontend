"use client";

import { useEffect, useState } from "react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  // Logic: Check if user has already accepted cookies
  useEffect(() => {
    const consent = localStorage.getItem("mpa_cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  // Logic: Function to handle 'Accept' click
  const acceptCookies = () => {
    localStorage.setItem("mpa_cookie_consent", "accepted");
    setShowBanner(false);
  };

  // Logic: Placeholder for cookie settings
  const cookieSettings = () => {
    alert("Cookie settings feature coming soon.");
  };

  if (!showBanner) return null;

  return (
    // Fixed container at the bottom with a professional dark background
    <div className="fixed bottom-0 left-0 w-full bg-[#0f172a] text-white z-50 border-t border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Text Section: Clean typography */}
        <p className="text-gray-300 text-sm leading-relaxed max-w-4xl">
          Welcome to <span className="font-semibold text-white">MPA Research</span>. 
          We use cookies and similar technologies to improve your experience and analyze our traffic. 
          By clicking <span className="text-white italic">"Accept"</span>, you agree to our use of 
          such technologies. Check our{" "}
          <a
            href="/privacy-policy"
            className="underline text-blue-400 hover:text-blue-300 transition-colors"
          >
            Privacy Policy
          </a>.
        </p>

        {/* Action Buttons Section: Compact and professional sizing */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={cookieSettings}
            className="h-9 px-4 text-xs font-medium border border-gray-600 rounded-md hover:bg-gray-800 transition-all whitespace-nowrap"
          >
            Cookie Settings
          </button>

          <button
            onClick={acceptCookies}
            className="h-9 px-6 text-xs font-bold bg-white text-black rounded-md hover:bg-gray-200 active:scale-95 transition-all whitespace-nowrap"
          >
            Accept
          </button>
        </div>

      </div>
    </div>
  );
};

export default CookieConsent;