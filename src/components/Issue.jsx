"use client";
import React, { useState, useEffect } from "react";
import {
    BookOpen,
    Archive,
    ChevronRight,
    ChevronLeft,
    
    Calendar,
    Eye,
    FileText,
    Loader2,
} from "lucide-react";
import Link from "next/link";
import { useGetPublishedArticlesQuery, useGetPublishedYearsQuery } from "@/store/apiSlice";

export const Issue = () => {
    // States for Navigation and Pagination
    const [activeTab, setActiveTab] = useState("current");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [page, setPage] = useState(1);
    const limit = 6;
    const currentYear = new Date().getFullYear();

    // Fetching data with pagination and limit
    const { data, isLoading, isFetching } = useGetPublishedArticlesQuery({
        year: activeTab === "current" ? currentYear : selectedYear,
        page,
        limit,
    });
    const { data: yearsData } = useGetPublishedYearsQuery();

    const availableYears = yearsData?.years || [];

    const articles = data?.articles || [];
    const totalPages = data?.totalPages || 1;




    if (isLoading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white">
                <Loader2 className="animate-spin text-green-600 mb-4" size={48} />
                <p className="text-gray-500 font-medium animate-pulse">
                    Loading Journal Repository...
                </p>
            </div>
        );
    }

    return (
        <div id="issue" className="bg-white min-h-screen pb-20 scroll-mt-24">
            {/* --- HEADER SECTION --- */}
            <div className="bg-white border-b border-gray-100 py-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-2xl mb-4 text-green-600">
                        <BookOpen size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-[#713F12] tracking-tight mb-4">
                        Journal <span className="text-green-600">Archive</span> & Issues
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Explore the latest research breakthroughs and historical archives from our global community of scholars.
                    </p>
                </div>
            </div>

            {/* --- TABS NAVIGATION --- */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full sm:w-auto">
                        <button
                            onClick={() => { setActiveTab("current"); setPage(1); }}
                            className={`flex-1 sm:flex-none px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === "current"
                                ? "bg-white text-green-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Current Issues
                        </button>
                        <button
                            onClick={() => { setActiveTab("archive"); setPage(1); }}
                            className={`flex-1 sm:flex-none px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === "archive"
                                ? "bg-white text-green-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Archive
                        </button>
                    </div>

                    {/* Current Selection Indicator */}
                    <div className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-400">
                        <span>Viewing:</span>
                        <span className="text-gray-900 font-bold bg-gray-100 px-3 py-1 rounded-full capitalize">
                            {activeTab === "current" ? `Volume ${currentYear}` : `Year ${selectedYear}`}
                        </span>
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="max-w-7xl mx-auto px-6 mt-12">
                <div className={activeTab === "archive" ? "grid lg:grid-cols-12 gap-10" : "block"}>

                    {/* ARCHIVE SIDEBAR (Only visible in Archive Tab) */}
                    {activeTab === "archive" && (
                        <aside className="lg:col-span-3 space-y-6">
                            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 sticky top-28">
                                <h3 className="text-xs uppercase tracking-widest font-black text-gray-400 mb-6 flex items-center gap-2">
                                    <Calendar size={14} /> Select Year
                                </h3>
                                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                                    {availableYears.map((year) => (
                                        <button
                                            key={year}
                                            onClick={() => { setSelectedYear(year); setPage(1); }}
                                            className={`group relative w-full text-left px-5 py-3.5 rounded-2xl font-bold transition-all ${selectedYear === year
                                                ? "bg-green-600 text-white shadow-lg shadow-green-200 scale-[1.02]"
                                                : "bg-white text-gray-600 border border-gray-200 hover:border-green-300 hover:text-green-600"
                                                }`}
                                        >
                                            {year}
                                            {selectedYear === year && (
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                    <ChevronRight size={18} />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    )}

                    {/* GRID CONTENT */}
                    <div className={activeTab === "archive" ? "lg:col-span-9" : "w-full"}>
                        {isFetching ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-50 pointer-events-none">
                                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                            </div>
                        ) : articles.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {articles.map((article) => (
                                        <ArticleCard key={article._id} article={article} />
                                    ))}
                                </div>

                                {/* PAGINATION */}
                                {totalPages > 1 && (
                                    <div className="mt-16 flex items-center justify-center gap-4">
                                        <button
                                            disabled={page === 1}
                                            onClick={() => setPage(p => p - 1)}
                                            className="p-3 rounded-full border border-gray-200 disabled:opacity-30 hover:bg-green-50 hover:text-green-600 transition-colors"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <div className="flex gap-2">
                                            {[...Array(totalPages)].map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setPage(i + 1)}
                                                    className={`w-12 h-12 rounded-full font-bold transition-all ${page === i + 1
                                                        ? "bg-green-600 text-white shadow-md shadow-green-100"
                                                        : "text-gray-500 hover:bg-gray-100"
                                                        }`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            disabled={page === totalPages}
                                            onClick={() => setPage(p => p + 1)}
                                            className="p-3 rounded-full border border-gray-200 disabled:opacity-30 hover:bg-green-50 hover:text-green-600 transition-colors"
                                        >
                                            <ChevronRight size={24} />
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="py-24 text-center border-2 border-dashed border-gray-100 rounded-[40px]">
                                <Archive size={64} className="mx-auto text-gray-200 mb-4" />
                                <h3 className="text-xl font-bold text-gray-400">No articles found for this period</h3>
                                <p className="text-gray-400 mt-2">Try selecting a different year or tab.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* --- ARTICLE CARD COMPONENT --- */
const ArticleCard = ({ article }) => {
    const publishedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });

    return (
        <Link
            href={`/articles/${article._id}`}
            className="group bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-green-100 transition-all duration-500 flex flex-col h-full overflow-hidden"
        >
            {/* Card Image Wrapper */}
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                <img
                    src={
                        article?.files?.manuscriptImage ||
                        "https://placehold.co/600x400?text=No+Image"
                    }
                    alt="manuscript"
                    className="w-full h-full object-cover"
                />
                {/* Floating Green Badge (Discipline) */}
                <div className="absolute top-4 right-4 max-w-[70%]">
                    <span className="bg-green-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg block truncate">
                        {article.discipline || "General Research"}
                    </span>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Meta Info */}
                <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-black text-orange-600 uppercase tracking-widest bg-orange-50 px-2 py-1 rounded-md">
                        {article.manuscriptType}
                    </span>
                    <div className="flex items-center gap-1.5 text-gray-400">
                        <Calendar size={12} />
                        <span className="text-[11px] font-bold">{publishedDate}</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-extrabold text-gray-900 leading-snug group-hover:text-green-600 transition-colors line-clamp-2 mb-3">
                    {article.title}
                </h3>

                {/* Author */}
                <p className="text-sm text-gray-500 font-medium line-clamp-1 mb-6">
                    {article.authors?.map(a => a.name).join(", ") || "Anonymous Scholar"}
                </p>

                {/* Bottom Bar */}
                <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-gray-400">
                            <Eye size={14} className="group-hover:text-green-500 transition-colors" />
                            <span className="text-xs font-bold">{article.views || 0}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400">
                            <FileText size={14} />
                            <span className="text-[10px] font-bold">Vol {article.volume}.{article.issue}</span>
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-green-600 group-hover:text-white transition-all">
                        <ChevronRight size={18} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

/* --- LOADING SKELETON --- */
const SkeletonCard = () => (
    <div className="bg-gray-50 rounded-[32px] overflow-hidden border border-gray-100 animate-pulse">
        <div className="aspect-[16/10] bg-gray-200" />
        <div className="p-6 space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-6 bg-gray-200 rounded w-full" />
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="pt-4 border-t border-gray-100 h-10 w-full" />
        </div>
    </div>
);

export default Issue;