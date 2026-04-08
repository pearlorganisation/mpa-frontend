"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  
  BookOpen, 
  FileText, 
  Image as ImageIcon, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import { useGetPublishedArticlesQuery } from '@/store/apiSlice';

// 1. Move ArticleCard OUTSIDE the main component
const ArticleCard = ({ article }) => {
  // Use state for views to prevent Hydration Mismatch error
  const [views, setViews] = useState(0);

  useEffect(() => {
    setViews(Math.floor(Math.random() * 5000) + 1200);
  }, []);

  const authorNames = article.authors?.map(a => a.name).join(", ") || "Unknown Author";
  
  const formattedDate = article.publishedAt 
    ? new Date(article.publishedAt).toISOString().split('T')[0] 
    : "Recently Published";

  return (
    <div className="group min-w-[320px] md:min-w-[380px] bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-100/40 transition-all duration-500 flex flex-col h-full">
      <div className="relative h-48 bg-[#FDFBF7] flex items-center justify-center border-b border-gray-100">
        <ImageIcon size={56} className="text-gray-200 group-hover:scale-110 group-hover:text-emerald-100 transition-all duration-500" />
        <div className="absolute top-5 right-5">
          <span className="bg-white/95 backdrop-blur-md border border-emerald-100 px-4 py-1.5 rounded-xl text-emerald-600 text-[10px] font-black uppercase tracking-widest shadow-sm">
            {article.discipline}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[#C2783E] text-[11px] font-bold uppercase tracking-widest">
            {article.manuscriptType === "review" ? "Literature Review" : "Research Publication"}
          </span>
          <span className="text-[#C2783E] text-[11px] font-bold">
            {formattedDate}
          </span>
        </div>

        <Link href={`/published-article/${article._id}`}>
          <h3 className="font-bold text-[#5D3A1A] text-xl leading-snug group-hover:text-emerald-600 transition-colors line-clamp-2 mb-3 cursor-pointer h-14">
            {article.title}
          </h3>
        </Link>

        <p className="text-gray-400 text-xs font-semibold mb-6 line-clamp-1 italic">
          {authorNames}
        </p>

        <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between">
          <span className="text-[#C2783E] text-[11px] font-black italic">
            Journal of App. Bio. 
            <span className="ml-2 font-medium not-italic text-gray-300">
               {views > 0 ? `(${views} views)` : ''}
            </span>
          </span>
          
          <Link 
              href={`/published-article/${article._id}`}
              className="flex items-center gap-1.5 text-emerald-600 text-xs font-black uppercase tracking-tighter hover:gap-2.5 transition-all"
          >
            Read Full <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

// 2. Move ArticleSlider OUTSIDE the main component
const ArticleSlider = ({ title, icon: Icon, articles, subtitle }) => (
  <div className="mb-24 px-2">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-200">
          <Icon size={28} />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-[#5D3A1A] tracking-tighter">{title}</h2>
          <p className="text-gray-400 text-sm md:text-base font-medium max-w-xl mt-1">{subtitle}</p>
        </div>
      </div>
    </div>

    {articles.length > 0 ? (
      <div className="flex gap-8 overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory">
        {articles.map(article => (
          <div key={article._id} className="snap-start">
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    ) : (
      <div className="bg-white border-2 border-dashed border-gray-100 rounded-[40px] p-20 text-center">
        <p className="text-gray-300 text-lg font-bold italic">
          Currently, no {title.toLowerCase()} are available in this volume.
        </p>
      </div>
    )}
  </div>
);

const PublishedArticles = () => {
  const { data, isLoading, error } = useGetPublishedArticlesQuery();

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[600px] bg-[#FDFBF7]/50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-emerald-600" size={48} />
        <p className="text-[#5D3A1A] font-medium animate-pulse">Loading Scholarly Archives...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="text-center py-24 text-red-500 bg-red-50 rounded-3xl mx-6 my-10 border border-red-100">
      <p className="text-xl font-bold">Unable to load the archives.</p>
    </div>
  );

  const allArticles = data?.articles || [];
  
  // Use lowercase filter to be safe
  const reviewArticles = allArticles.filter(art => art.manuscriptType?.toLowerCase() === "review");
  const responseArticles = allArticles.filter(art => art.manuscriptType?.toLowerCase() === "research");

  return (
    <div className="min-h-screen bg-[#FDFBF7]/50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <ArticleSlider 
          title="Literature Reviews" 
          subtitle="Comprehensive synthesis and critical analysis of contemporary biological trends."
          icon={BookOpen} 
          articles={reviewArticles} 
        />

        <ArticleSlider 
          title="Research Publications" 
          subtitle="Original experimental findings and innovative scientific discoveries."
          icon={FileText} 
          articles={responseArticles} 
        />
      </div>
    </div>
  );
};

export default PublishedArticles;