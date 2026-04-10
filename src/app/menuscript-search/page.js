"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight, FileText, BookOpen, Clock, Loader2 } from "lucide-react";
import { useGetPublishedArticlesQuery } from "@/store/apiSlice";
// Import your hook from wherever your apiSlice file is located


export default function SearchPublishedPage() {
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState("all"); // 'all', 'original', 'review'

  // 1. Fetch data using your RTK Query hook
  const { data, isLoading, isError, error } = useGetPublishedArticlesQuery();

  const articles = data?.articles || [];

  // 2. Filter logic: Search + Manuscript Type
  const filteredResults = useMemo(() => {
    return articles.filter((item) => {
      // Search matches title or authors (if available)
      const matchesSearch = item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.abstract?.toLowerCase().includes(query.toLowerCase());

      // Filter matches manuscript type
      // Note: Adjust "original" and "review" strings based on your actual database values
      const matchesType =
        filterType === "all" ||
        (filterType === "original" && item.manuscriptType?.toLowerCase().includes("research")) ||
        (filterType === "review" && item.manuscriptType?.toLowerCase().includes("review"));

      return matchesSearch && matchesType;
    });
  }, [articles, query, filterType]);

  // Loading State
  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="animate-spin text-emerald-600 mb-4" size={40} />
      <p className="text-gray-500 font-medium">Fetching Archives...</p>
    </div>
  );

  // Error State
  if (isError) return (
    <div className="text-center py-20 text-red-500">
      <p className="text-xl font-bold">Error loading articles</p>
      <p className="text-sm">{error?.data?.message || "Something went wrong"}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7]/50 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* --- SEARCH & HEADER --- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-[#5D3A1A] mb-6 tracking-tight">Published Archives</h1>

          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title, keywords, or abstract..."
              className="w-full pl-14 pr-6 py-5 bg-gray-200  rounded-3xl border-[#5D3A1A] shadow-xl shadow-emerald-900/5 border-none focus:ring-2 focus:ring-emerald-500 outline-none text-lg transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* --- FILTER TABS --- */}
          <div className="flex justify-center gap-3">
            {[
              { id: "all", label: "All Papers", icon: null },
              // { id: "original", label: "Original Research", icon: FileText },
              // { id: "review", label: "Review Articles", icon: BookOpen },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${filterType === tab.id
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                    : "bg-white text-gray-400 border border-gray-100 hover:bg-emerald-50"
                  }`}
              >
                {tab.icon && <tab.icon size={14} />}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* --- RESULTS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredResults.length > 0 ? (
            filteredResults.map((article) => (
              <div
                key={article._id}
                className="group bg-white p-8 rounded-[32px] border border-gray-100 hover:border-emerald-500 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg">
                    {article.manuscriptType || "Publication"}
                  </span>
                  <div className="flex items-center text-gray-400 text-[11px] font-bold uppercase tracking-tighter">
                    <Clock size={12} className="mr-1" />
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </div>
                </div>

                <Link href={`/published-article/${article._id}`}>
                  <h3 className="text-xl font-bold text-[#5D3A1A] mb-4 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </Link>

                <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {article.abstract || "Click to read the full abstract and conclusions of this peer-reviewed study."}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="text-[10px] text-[#C2783E] font-bold uppercase tracking-widest">
                    {article.authors?.[0]?.name || "Unknown Author"}
                  </div>
                  <Link
                    href={`/published-article/${article._id}`}
                    className="flex items-center gap-2 text-emerald-600 text-xs font-black uppercase tracking-tighter hover:gap-4 transition-all"
                  >
                    View Paper <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <h3 className="text-xl font-medium text-gray-400 italic">No matching articles found in the archives.</h3>
              <button onClick={() => { setQuery(""); setFilterType("all"); }} className="mt-4 text-emerald-600 font-bold underline">Reset all filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}