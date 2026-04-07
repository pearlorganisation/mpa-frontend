"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetPublishedArticlesQuery } from "../../store/apiSlice";
import { ChevronLeft, ChevronRight, Image as ImageIcon, Loader2, Edit } from "lucide-react";
import ArticleCard from "@/components/articles/ArticleCard";

export default function ArticlesPage() {
  const router = useRouter();
  const [editorIdx, setEditorIdx] = useState(0);

  const { data, isLoading } = useGetPublishedArticlesQuery({
    page: 1,
    limit: 50,
  });

  const articles = data?.articles || [];

  console.log("ARTICLES:", articles);

  // Filter Logic
  const editorChoices = articles.filter(a => a.isEditorChoice).slice(0, 3);
  const currentIssue = [...articles].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).slice(0, 6);
  const mostViewed = [...articles].sort((a, b) => b.views - a.views).slice(0, 6);

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-green-600" size={40} /></div>;

  return (
    <section className="max-w-7xl mx-auto py-10 px-6 bg-white min-h-screen font-sans">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#713F12] mb-4">Journal & Articles</h1>
        <p className="text-[#B45309] text-lg font-medium">Browse latest issues, editor selections, and most viewed articles.</p>
      </div>

      {/* 1. EDITOR'S CHOICE (Slider) */}
      {editorChoices.length > 0 && (
        <div className="mb-16">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-[#713F12] border-b-2 border-[#10B981] pb-2 inline-block">Editor's Choice</h2>
          </div>
          <div className="relative bg-[#FFFBEB] rounded-2xl border border-[#FEF3C7] shadow-sm p-8 flex items-center min-h-[300px]">
            <button onClick={() => setEditorIdx(prev => (prev === 0 ? editorChoices.length - 1 : prev - 1))} className="absolute left-4 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-50 text-[#713F12]">
              <ChevronLeft size={24} />
            </button>
            <div className="flex flex-col md:flex-row items-center gap-8 px-12 w-full cursor-pointer group" onClick={() => router.push(`/articles/${editorChoices[editorIdx]._id}`)}>
              <div className="flex-1 space-y-4">
                <span className="text-[#10B981] text-sm font-bold tracking-wider uppercase">Highlight</span>
                <h3 className="text-3xl font-bold text-[#713F12] group-hover:text-[#10B981] transition-colors">{editorChoices[editorIdx]?.title}</h3>
                <p className="text-[#B45309] text-lg font-medium">{editorChoices[editorIdx]?.authors?.map(a => a.name).join(", ")}</p>
              </div>
              <div className="w-full md:w-1/3 aspect-video bg-white rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 group-hover:shadow-lg transition-all">
                <ImageIcon size={48} className="opacity-50" />
              </div>
            </div>
            <button onClick={() => setEditorIdx(prev => (prev === editorChoices.length - 1 ? 0 : prev + 1))} className="absolute right-4 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-50 text-[#713F12]">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}

      {/* 2. CURRENT ISSUE */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-[#713F12] border-b-2 border-[#10B981] pb-2 inline-block mb-8">Current Issue</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentIssue.map(article => <ArticleCard key={article._id} article={article} />)}
        </div>
      </div>

      {/* 3. MOST VIEWED */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-[#713F12] border-b-2 border-[#10B981] pb-2 inline-block mb-6">Most Viewed / Downloaded</h2>
        <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide">
          {mostViewed.map(article => (
            <div key={article._id} className="min-w-[300px] w-[300px] flex-shrink-0">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}