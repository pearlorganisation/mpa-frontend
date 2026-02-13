"use client";
import React, { useState } from "react";
import { Search, FileText, Share2, Download } from "lucide-react";

const Articles = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Biology",
    "Chemistry",
    "Physics",
    "Engineering",
    "Medicine",
    "Environmental",
  ];

  const allArticles = [
    {
      id: 1,
      category: "Physics",
      date: "2026-02-01",
      title: "Advanced Quantum Computing Algorithms",
      authors: "Dr. Sarah Johnson, Prof. Michael Chen",
      description:
        "A comprehensive study on quantum computing algorithms and their applications in solving complex optimization problems.",
      citations: 234,
      doi: "10.1234/mpa.2026.001",
    },
    {
      id: 2,
      category: "Chemistry",
      date: "2026-01-28",
      title: "Sustainable Biodegradable Polymers",
      authors: "Dr. Emma Wilson, Dr. James Brown",
      description:
        "Development of novel biodegradable polymers derived from renewable resources for sustainable packaging solutions.",
      citations: 186,
      doi: "10.1234/mpa.2026.002",
    },
    {
      id: 3,
      category: "Biology",
      date: "2026-01-15",
      title: "CRISPR Gene Editing in Agriculture",
      authors: "Dr. Robert Miller, Dr. Alice Zhang",
      description:
        "Exploring the potential of CRISPR technology to improve crop resilience and nutritional value in changing climates.",
      citations: 412,
      doi: "10.1234/mpa.2026.003",
    },
  ];

  // Filtering Logic
  const filteredArticles = allArticles.filter((article) => {
    const matchesCategory =
      activeCategory === "All" || article.category === activeCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.authors.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="max-w-7xl mx-auto py-16 px-6 bg-white min-h-screen" id="articles">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-[#713F12] mb-4">
          Published Articles
        </h1>
        <p className="text-[#B45309] text-lg">
          Browse our collection of peer-reviewed research articles across
          multiple disciplines.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-7xl mx-auto mb-8">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="text-[#D97706]" size={20} />
        </div>
        <input
          type="text"
          placeholder="Search articles, authors, keywords..."
          className="w-full py-4 pl-12 pr-4 bg-white border border-[#6EE7B7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] text-[#713F12] placeholder-[#D97706]/60"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 border ${
              activeCategory === cat
                ? "bg-[#10B981] text-white border-[#10B981] shadow-lg shadow-green-100"
                : "bg-[#FFFBEB] text-[#713F12] border-[#FEF3C7] hover:bg-[#FEF3C7]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles List */}
      <div className="space-y-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div
              key={article.id}
              className="group relative bg-[#FFFBEB] p-8 rounded-2xl border-2 border-transparent hover:border-[#22C55E] transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                {/* Content Left */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-[#10B981] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-[#D97706] text-sm font-medium">
                      {article.date}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#713F12] mb-2 group-hover:text-[#166534] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-[#92400E] font-semibold mb-3">
                    {article.authors}
                  </p>

                  <p className="text-[#B45309] leading-relaxed mb-6">
                    {article.description}
                  </p>

                  <div className="flex items-center gap-6 text-sm">
                    <span className="text-[#713F12] font-bold">
                      {article.citations}{" "}
                      <span className="font-medium text-[#B45309]">
                        citations
                      </span>
                    </span>
                    <span className="text-[#B45309]">
                      DOI:{" "}
                      <span className="font-mono text-[#713F12]">
                        {article.doi}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Actions Right */}
                <div className="flex md:flex-col gap-3 min-w-[120px]">
                  <button className="flex items-center justify-center gap-2 bg-[#10B981] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#059669] transition-all">
                    <Download size={18} /> PDF
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-white text-[#713F12] border border-[#FEF3C7] px-4 py-2 rounded-lg font-bold hover:bg-[#FEF3C7] transition-all">
                    <Share2 size={18} /> Share
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-[#B45309]">
            No articles found matching your criteria.
          </div>
        )}
      </div>
    </section>
  );
};

export default Articles;
