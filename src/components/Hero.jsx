"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Bell,
  FileText,
  User,
  Calendar,
  ExternalLink,
  Loader2
} from "lucide-react";
import toast from "react-hot-toast";
import { useGetLatestPublishedQuery } from "../store/apiSlice";

const Hero = () => {
  const router = useRouter();

  // Fetch the published manuscript
  const { data, isLoading } = useGetLatestPublishedQuery();
  const latestArticle = data?.article;

  // Helper to format date cleanly
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Auth check before navigation/action
  const checkAuthAndRun = (callback) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      toast.error("Please login or signup to continue", {
        icon: "🔒",
        duration: 4000,
      });
      router.push("/login");
      return;
    }
    callback();
  };

  // Scroll logic for landing page sections
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // If not on home page, navigate to home then scroll could be implemented here
      router.push(`/#${id}`);
    }
  };

  return (
    <section className="w-full bg-[#FDF6ED] scroll-mt-24" id="hero">
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-16 md:pt-10 md:pb-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* --- Left Content Area --- */}
        <div className="flex flex-col order-2 lg:order-1">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 bg-[#DCFCE7] text-[#166534] px-4 py-1.5 rounded-full text-sm font-semibold w-fit mb-6 shadow-sm border border-[#BBF7D0]">
            <BookOpen size={16} className="text-[#22C55E]" />
            Open Access Research
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
            <span className="text-[#713F12] block">Advancing Scientific</span>
            <span className="text-[#22C55E] block">Excellence</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[#854D0E] text-lg md:text-xl max-w-lg mb-10 leading-relaxed opacity-90">
            A premier platform for publishing cutting-edge research. Peer-reviewed,
            high-impact, and committed to global scientific growth.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => checkAuthAndRun(() => router.push("/dashboard/submit-manuscript"))}
              className="bg-[#22C55E] text-white px-4 py-2 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#16a34a] transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-[#22C55E]/20"
            >
              Submit Manuscript <ArrowRight size={20} />
            </button>

            <button
              onClick={() => scrollToSection("articles")}
              className="bg-white text-[#713F12] px-8 py-4 rounded-2xl font-bold border border-green-100 hover:bg-green-50 transition-all shadow-sm hover:shadow-md"
            >
              Browse Articles
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 md:gap-10 border-t border-green-200/50 pt-8">
            <div>
              <div className="text-2xl font-black text-[#22C55E]">5k+</div>
              <div className="text-sm md:text-base text-[#854D0E] font-medium">Articles</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#22C55E]">98%</div>
              <div className="text-sm md:text-base text-[#854D0E] font-medium">Acceptance</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#22C55E]">2.8</div>
              <div className="text-sm md:text-base text-[#854D0E] font-medium">Impact</div>
            </div>
          </div>
        </div>

        {/* --- Right Content Area (Announcements) --- */}
        <div className="relative w-full max-w-[540px] mx-auto lg:mt-0 order-1 lg:order-2">

          {/* Decorative Glow */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#86EFAC]/40 to-transparent blur-3xl rounded-full -z-10 animate-pulse"></div>

          {/* Main Announcement Card */}
          <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden border border-green-50 z-10">

            {/* Card Header */}
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-50">
              <div className="p-3 bg-[#DCFCE7] rounded-2xl text-[#166534]">
                <Bell size={24} className="animate-bounce" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#713F12]">Announcements</h2>
                <p className="text-xs text-green-600 font-semibold uppercase tracking-wider">Latest updates</p>
              </div>
              <span className="ml-auto flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>

            {/* Manuscript Content Box */}
            <div className="bg-[#FDF6ED]/50 rounded-3xl p-6 border border-[#F2E8DA] hover:border-[#86EFAC] transition-all duration-500 group relative overflow-hidden">
              {isLoading ? (
                <div className="flex flex-col items-center py-12">
                  <Loader2 className="animate-spin text-green-500 mb-2" size={32} />
                  <p className="text-sm text-amber-800">Fetching latest publication...</p>
                </div>
              ) : latestArticle ? (
                <>
                  {/* Status & Date */}
                  <div className="flex justify-between items-center mb-5">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white bg-[#22C55E] px-3 py-1 rounded-lg">
                      New Release
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-[#854D0E] font-bold">
                      <Calendar size={14} className="text-green-600" />
                      {formatDate(latestArticle.publishedAt)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-[#713F12] leading-tight mb-4 transition-colors line-clamp-2">
                    {latestArticle.title}
                  </h3>

                  {/* Abstract Truncated */}
                  <p className="text-sm text-[#854D0E]/80 leading-relaxed line-clamp-3 mb-6 font-medium">
                    {latestArticle.abstract}
                  </p>

                  {/* Author Info */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-green-100 mb-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center text-green-700">
                        <User size={18} />
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-bold text-[#713F12] truncate">
                          {latestArticle.authors?.[0]?.name || "Principal Investigator"}
                        </span>
                        <span className="text-[11px] text-green-700 font-semibold truncate uppercase">
                          {latestArticle.discipline || "General Science"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => router.push(`/articles/${latestArticle._id}`)}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-4 rounded-2xl hover:bg-green-700 transition-all shadow-md group-hover:shadow-green-200"
                  >
                    Read Full Paper <ExternalLink size={18} />
                  </button>
                </>
              ) : (
                <div className="py-12 text-center">
                  <FileText className="mx-auto text-amber-200 mb-3" size={48} />
                  <p className="text-[#854D0E] font-bold">No recent publications found.</p>
                </div>
              )}
            </div>

            {/* Subtle Texture Overlay */}
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <FileText size={120} />
            </div>
          </div>

          {/* Background Layered Card for depth */}
          <div className="absolute -top-4 -right-4 -z-10 w-full h-full bg-green-200/50 rounded-[3rem] rotate-3"></div>
        </div>

      </div>
    </section>
  );
};

export default Hero;