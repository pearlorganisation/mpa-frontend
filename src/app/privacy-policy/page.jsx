"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Clock, Lock, Mail } from "lucide-react";

const PrivacyPolicyComingSoon = () => {
  return (
    <div className="min-h-screen bg-[#FCF9F1] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background Decorative Elements - Soft Green Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#10b981]/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#4a2c1a]/5 rounded-full blur-3xl" />

      <div className="max-w-2xl w-full text-center z-10 space-y-8 animate-in fade-in zoom-in duration-700">
        
        {/* Animated Icon Section */}
        <div className="relative inline-block">
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-[#4a2c1a]/5 border border-[#4a2c1a]/10">
            <ShieldCheck className="w-16 h-16 text-[#10b981]" strokeWidth={1.5} />
          </div>
          <div className="absolute -top-2 -right-2 bg-[#4a2c1a] text-white p-2 rounded-full border-4 border-[#FCF9F1]">
            <Clock className="w-4 h-4 animate-pulse" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#4a2c1a] tracking-tight">
            Privacy Policy <br />
            <span className="text-[#10b981]">Coming Soon</span>
          </h1>
          <p className="text-[#4a2c1a]/70 text-lg leading-relaxed font-medium">
            We are currently refining our legal documentation to ensure your data 
            and research integrity are protected under the latest global standards.
          </p>
        </div>

        {/* Feature Highlights (Clean & Minimal) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-4">
          <div className="bg-white/50 border border-[#4a2c1a]/5 p-4 rounded-2xl flex items-center gap-3">
            <div className="bg-[#10b981]/10 p-2 rounded-lg text-[#10b981]">
              <Lock size={20} />
            </div>
            <span className="text-[#4a2c1a] font-semibold text-sm">Data Security</span>
          </div>
          <div className="bg-white/50 border border-[#4a2c1a]/5 p-4 rounded-2xl flex items-center gap-3">
            <div className="bg-[#10b981]/10 p-2 rounded-lg text-[#10b981]">
              <ShieldCheck size={20} />
            </div>
            <span className="text-[#4a2c1a] font-semibold text-sm">GDPR Compliance</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link
            href="/"
            className="flex items-center gap-2 px-8 py-3 bg-[#4a2c1a] text-white font-bold rounded-xl hover:bg-[#362013] transition-all shadow-lg active:scale-95 w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          
          <Link
            href="/contact"
            className="flex items-center gap-2 px-8 py-3 bg-white text-[#4a2c1a] border-2 border-[#4a2c1a]/10 font-bold rounded-xl hover:bg-gray-50 transition-all w-full sm:w-auto justify-center"
          >
            <Mail size={18} />
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyComingSoon;