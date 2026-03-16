"use client";
import { ArrowRight, BookOpen, Bell, FileText, User, Calendar, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

const Hero = () => {
  // Authentication check function
  const checkAuthAndRun = (callback) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    if (!token) {
      toast.error(
        "Please login or signup to view article and submit the manuscript",
        {
          icon: "🔒",
          duration: 4000,
        }
      );
      return;
    }

    callback(); // user logged in → action run
  };

  // Smooth scroll to specific sections
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Dummy data representing your recently published manuscript
  // Later, you can replace this with state variables fetched from your API (e.g., setRecentManuscript(data))
  const recentManuscript = {
    manuscriptId: "MPA-2026-1002",
    title: "Advancements in Artificial Intelligence and Machine Learning for Big Data", // Expanded from "Manuscript 1" for better UI
    abstract: "This research explores the integration of AI and machine learning techniques in processing large-scale big data, providing an innovative framework for future technologies.",
    authors:[
      {
        name: "Arjun Singh Mehra",
        affiliation: "Department of CS, Uttaranchal University"
      }
    ],
    status: "Accepted",
    createdAt: "Mar 16, 2026"
  };

  return (
    <section className="w-full bg-[#FDF6ED] scroll-mt-24" id="hero">
      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* --- Left Content Area --- */}
        <div className="flex flex-col">

          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 bg-[#DCFCE7] text-[#166534] px-3 py-1 rounded-full text-sm font-medium w-fit mb-6 shadow-sm border border-[#BBF7D0]">
            <BookOpen size={14} className="text-[#22C55E]" />
            Open Access Research
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-6">
            <span className="text-[#713F12] block">
              Advancing Scientific
            </span>
            <span className="text-[#22C55E] block">
              Excellence
            </span>
          </h1>

          {/* Subtitle / Description */}
          <p className="text-[#854D0E] text-lg max-w-lg mb-8 leading-relaxed">
            A premier platform for publishing cutting-edge research across
            multiple disciplines. Peer-reviewed, open access, and committed to
            scientific excellence worldwide.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => checkAuthAndRun(() => scrollToSection("submit"))}
              className="bg-[#22C55E] text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-[#16a34a] transition shadow-md hover:shadow-lg"
            >
              Submit Manuscript <ArrowRight size={18} />
            </button>

            <button
              onClick={() => checkAuthAndRun(() => scrollToSection("articles"))}
              className="bg-white text-[#713F12] px-8 py-3 rounded-xl font-semibold border border-green-100 hover:bg-green-50 transition shadow-sm hover:shadow"
            >
              Browse Articles
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-10 border-t border-green-100 pt-8">
            <div>
              <div className="text-3xl font-bold text-[#22C55E]">5000+</div>
              <div className="text-sm text-[#854D0E] mt-1 font-medium">
                Published Articles
              </div>
            </div>

            <div>
              <div className="text-3xl font-bold text-[#22C55E]">98%</div>
              <div className="text-sm text-[#854D0E] mt-1 font-medium">
                Quality Rate
              </div>
            </div>

            <div>
              <div className="text-3xl font-bold text-[#22C55E]">2.5</div>
              <div className="text-sm text-[#854D0E] mt-1 font-medium">
                Impact Factor
              </div>
            </div>
          </div>
        </div>


        {/* --- Right Content Area (Announcements) --- */}
        <div className="relative w-full max-w-[500px] mx-auto lg:-mt-6">

          {/* Background Decorative Blur (Keeps the original beautiful glowing effect) */}
          <div className="absolute -inset-6 bg-[#86EFAC]/30 blur-3xl rounded-3xl -z-10 -rotate-6"></div>

          {/* Main Announcement Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col border border-green-50 z-10">
            
            {/* Header: Announcement Title with Bell Icon */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-green-50">
              <div className="p-2.5 bg-[#DCFCE7] rounded-xl text-[#166534] shadow-sm">
                <Bell size={22} className="fill-green-100" />
              </div>
              <h2 className="text-2xl font-bold text-[#713F12]">Announcements</h2>
              
              {/* Blinking Live Indicator */}
              <span className="ml-auto flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#22C55E]"></span>
              </span>
            </div>

            {/* Manuscript Details Card */}
            <div className="bg-[#FDF6ED] rounded-2xl p-5 border border-[#F2E8DA] hover:border-[#86EFAC] transition-colors duration-300 group">
              
              {/* Top Row: Badge and Date */}
              <div className="flex justify-between items-start mb-4">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#166534] bg-[#DCFCE7] px-2.5 py-1 rounded-md">
                  <FileText size={12} />
                  Recently Published
                </span>
                <div className="flex items-center gap-1 text-xs text-[#854D0E] font-medium bg-white px-2 py-1 rounded-md border border-[#F2E8DA]">
                  <Calendar size={12} />
                  {recentManuscript.createdAt}
                </div>
              </div>

              {/* Manuscript Title */}
              <h3 className="text-[17px] font-bold text-[#713F12] leading-snug mb-3 group-hover:text-[#166534] transition-colors">
                {recentManuscript.title}
              </h3>

              {/* Manuscript Abstract (Truncated for neatness) */}
              <p className="text-sm text-[#854D0E] leading-relaxed line-clamp-2 mb-5">
                {recentManuscript.abstract}
              </p>

              {/* Author & Affiliation Details */}
              <div className="bg-white rounded-xl p-3 border border-green-50 mb-5">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 bg-[#FDF6ED] rounded-md text-[#d97706] mt-0.5">
                    <User size={14} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#713F12]">
                      {recentManuscript.authors[0].name}
                    </span>
                    <span className="text-xs text-[#854D0E] line-clamp-1">
                      {recentManuscript.authors[0].affiliation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button: View Paper */}
              <button 
                onClick={() => checkAuthAndRun(() => console.log(`Opening ${recentManuscript.manuscriptId}`))}
                className="w-full flex items-center justify-center gap-2 bg-white text-[#166534] font-semibold py-2.5 rounded-xl border border-green-200 hover:bg-[#DCFCE7] hover:border-[#86EFAC] transition-all duration-300 shadow-sm text-sm"
              >
                Read Full Paper <ExternalLink size={16} />
              </button>

            </div>

            {/* Subtle Gradient Overlay for extra shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none"></div>
          </div>

          {/* Back Layer Decorative Card (Rotated background to match previous style) */}
          <div className="absolute -top-3 -right-3 -z-10 w-full h-full bg-[#86EFAC] rounded-3xl rotate-3 opacity-60 shadow-lg"></div>
        </div>

      </div>
    </section>
  );
};

export default Hero;