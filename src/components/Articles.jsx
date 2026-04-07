"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useGetPublishedArticlesQuery } from "../store/apiSlice";
import {
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Loader2,
  ArrowRight
} from "lucide-react";
import ArticleCard from "./ArticleCard";

export default function Articles() {
  const router = useRouter();
  const [editorIdx, setEditorIdx] = useState(0);

  // Refs for the horizontal scroll containers (Pagination/Slider logic)
  const currentIssueRef = useRef(null);
  const mostViewedRef = useRef(null);

  // REAL API CALL using RTK Query
  const { data, isLoading } = useGetPublishedArticlesQuery();

  // Data processing (Keeping your original logic)
  const articles = data?.articles || [];
  const editorChoices = articles.filter((a) => a.isEditorChoice).slice(0, 5); // Increased slice for better slider feel
  const currentIssue = [...articles].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  const mostViewed = [...articles].sort((a, b) => b.views - a.views);

  // Function to handle horizontal scrolling for the sliders
  const scroll = (ref, direction) => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;

      ref.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (isLoading) return (
    <div className="py-20 flex flex-col justify-center items-center">
      <Loader2 className="animate-spin text-[#10B981] mb-2" size={48} />
      <p className="text-[#713F12] font-medium">Loading Articles...</p>
    </div>
  );

  return (
    <section id="articles" className="scroll-mt-24 max-w-7xl mx-auto py-12 px-6 bg-white font-sans">

      {/* HEADER SECTION */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#713F12] mb-4 tracking-tight">
          Journal & Articles
        </h1>
        <div className="w-24 h-1 bg-[#10B981] mx-auto mb-4 rounded-full"></div>
        <p className="text-[#B45309] text-lg max-w-2xl mx-auto">
          Explore our latest research, editor-selected highlights, and the most discussed manuscripts in the field.
        </p>
      </div>

      {/* SECTION 1: EDITOR'S CHOICE (Hero Slider) */}
      {editorChoices.length > 0 && (
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="font-bold text-[#713F12] border-b-2 border-[#10B981] pb-1 uppercase tracking-widest text-xl">
              Editor's Choice
            </h2>
          </div>

          <div className="relative group overflow-hidden bg-[#FFFBEB] rounded-3xl border border-[#FEF3C7] shadow-md transition-all hover:shadow-xl p-6 md:p-10 min-h-[350px] flex items-center">
            {/* Left Button */}
            {editorChoices.length > 1 && (
              <button
                onClick={() => setEditorIdx(prev => (prev === 0 ? editorChoices.length - 1 : prev - 1))}
                className="mt-4 absolute left-1 z-10 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-[#10B981] hover:text-white transition-all text-[#713F12]"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            {/* Content Container */}
            <div
              className="flex flex-col md:flex-row items-center gap-10 w-full cursor-pointer"
              onClick={() => router.push(`/articles/${editorChoices[editorIdx]._id}`)}
            >
              <div className="flex-1 space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <span className="inline-block text-[#10B981] text-xs font-bold tracking-widest uppercase bg-white px-3 py-1.5 rounded-full border border-[#10B981]/20 shadow-sm">
                  Featured Manuscript
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-[#713F12] leading-[1.2]">
                  {editorChoices[editorIdx]?.title}
                </h3>
                <p className="text-[#B45309] text-xl italic font-medium">
                  — {editorChoices[editorIdx]?.authors?.map(a => a.name).join(", ")}
                </p>
                <button className="flex items-center gap-2 text-[#10B981] font-bold group/btn">
                  Read Full Article <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Placeholder Image Box */}
              <div className="w-full md:w-[42%] h-[260px] md:h-[320px] rounded-2xl overflow-hidden relative">

                {editorChoices[editorIdx]?.files?.manuscriptImage ? (
                  <img
                    src={editorChoices[editorIdx].files.manuscriptImage}
                    alt="manuscript"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                    <ImageIcon size={70} strokeWidth={1} />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </div>

            {/* Right Button */}
            {editorChoices.length > 1 && (
              <button
                onClick={() => setEditorIdx(prev => (prev === editorChoices.length - 1 ? 0 : prev + 1))}
                className="mt-4 absolute right-4 z-10 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-[#10B981] hover:text-white transition-all text-[#713F12]"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Dots Pagination for Editor's Choice */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {editorChoices.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${i === editorIdx ? "w-8 bg-[#10B981]" : "w-2 bg-[#B45309]/20"}`} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: CURRENT ISSUE (With Slider/Pagination) */}
      <div className="mb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#713F12] border-b-4 border-[#10B981] pb-2">
            Current Issue
          </h2>
          {/* Slider Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll(currentIssueRef, 'left')}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-[#10B981] transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll(currentIssueRef, 'right')}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-[#10B981] transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={currentIssueRef}
          className="flex overflow-x-auto gap-8 pb-6 scroll-smooth scrollbar-hide no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {currentIssue.map((article) => (
            <div key={article._id} className="min-w-[320px] md:min-w-[380px] flex-shrink-0 transition-transform duration-300 hover:-translate-y-2">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: MOST VIEWED / DOWNLOADED (With Slider/Pagination) */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#713F12] border-b-4 border-[#10B981] pb-2">
            Most Viewed & Popular
          </h2>
          {/* Slider Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll(mostViewedRef, 'left')}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-[#10B981] transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll(mostViewedRef, 'right')}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-[#10B981] transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={mostViewedRef}
          className="flex overflow-x-auto gap-8 pb-6 scroll-smooth scrollbar-hide no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {mostViewed.map((article) => (
            <div key={article._id} className="min-w-[320px] md:min-w-[380px] flex-shrink-0 transition-transform duration-300 hover:-translate-y-2">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </div>

      {/* Custom styles for hiding scrollbar but keeping scroll functionality */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}