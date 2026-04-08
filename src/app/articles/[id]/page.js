"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetManuscriptByIdQuery } from "../../../store/apiSlice";
import {
  ChevronLeft, FileText, Globe, BarChart2,
  ExternalLink, Calendar, Hash,
  User, Award, BookOpen, Quote, Download,
  Mail, Building2, Eye, Layout, Clock,
  CheckCircle2, FileCheck, Share2
} from "lucide-react";
import ArticleToolsDropdown from "../../../components/ArticleToolsDropdown";

/**
 * ArticleDetail Component
 * Professional manuscript detail view designed for academic journals.
 * Primary Theme: Green-600
 */
export default function ArticleDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("abstract");

  // Fetching manuscript data
  const { data, isLoading, error } = useGetManuscriptByIdQuery(id);
  const article = data?.manuscript;

  /**
   * Helper function to parse keywords from the API's specific format
   * Handles: ["[\"Keyword1\", \"Keyword2\"]"]
   */
  const keywords = useMemo(() => {
    if (!article?.keywords || article.keywords.length === 0) return [];
    try {
      const raw = article.keywords[0];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return Array.isArray(article.keywords) ? article.keywords : [];
    }
  }, [article?.keywords]);

  // --- LOADING STATE ---
  if (isLoading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-green-100 border-t-green-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen size={20} className="text-green-600" />
        </div>
      </div>
      <p className="mt-4 text-green-700 font-bold tracking-widest animate-pulse">LOADING MANUSCRIPT</p>
    </div>
  );

  // --- ERROR STATE ---
  if (error || !article) return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-6 bg-gray-50">
      <div className="max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Article Not Found</h2>
        <p className="text-gray-500 mb-6">The requested manuscript could not be retrieved. Please try again later.</p>
        <button onClick={() => router.push('/')} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition-all w-full">
          Return Home
        </button>
      </div>
    </div>
  );

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-slate-900">
      
      {/* --- PREMIUM GREEN HEADER --- */}
      <header className="bg-green-600 relative overflow-hidden pt-12 pb-28 px-6">
        {/* Subtle Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }}>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={() => router.back()} 
            className="group flex items-center gap-2 text-green-100 hover:text-white mb-10 transition-colors"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
            <span className="text-xs font-bold uppercase tracking-widest">Back to Library</span>
          </button>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 text-[10px] font-black px-3 py-1 rounded uppercase tracking-[0.2em]">
              {article.manuscriptType}
            </span>
            <span className="bg-yellow-400 text-yellow-950 text-[10px] font-black px-3 py-1 rounded uppercase tracking-[0.2em] flex items-center gap-1">
              <Globe size={12} /> Open Access
            </span>
            {article.isEditorChoice && (
                <span className="bg-green-400 text-green-950 text-[10px] font-black px-3 py-1 rounded uppercase tracking-[0.2em]">Editor's Choice</span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-10 leading-[1.15] max-w-5xl">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-green-50">
            {article.authors?.map((author, i) => (
              <div key={i} className="flex items-center gap-2 group cursor-default">
                <span className="text-lg font-medium border-b border-transparent group-hover:border-green-300 transition-all">
                    {author.name}<sup>{i + 1}</sup>
                </span>
                {i < article.authors.length - 1 && <span className="opacity-40">•</span>}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* --- STICKY NAV/ACTION BAR --- */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-18 py-3 flex items-center justify-between">
          <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-gray-500">
            <div className="flex items-center gap-2"><Calendar size={16} className="text-green-600"/> Published: <span className="text-[#713F12]">{formattedDate}</span></div>
            <div className="flex items-center gap-2"><Hash size={16} className="text-green-600"/> DOI: <span className="text-[#713F12]">{article.paperNumber}</span></div>
            <div className="bg-green-50 text-green-700 px-3 py-1 rounded-lg">Vol {article.volume}, Issue {article.issue}</div>
          </div>

          <div className="flex items-center gap-4">
             <a href={article.files?.manuscriptFile} target="_blank" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold transition-all shadow-lg shadow-green-100 active:scale-95">
               <Download size={18} /> PDF Full Text
             </a>
             <ArticleToolsDropdown article={article} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* --- SIDEBAR NAVIGATION --- */}
        <aside className="lg:col-span-3">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Article Sections</div>
                <nav className="flex flex-col p-2">
                    <SidebarLink icon={<FileText size={18}/>} label="Abstract" active={activeTab === "abstract"} onClick={() => setActiveTab("abstract")} />
                    <SidebarLink icon={<User size={18}/>} label="Authors & Affiliations" active={activeTab === "authors"} onClick={() => setActiveTab("authors")} />
                    <SidebarLink icon={<BarChart2 size={18}/>} label="Metrics & Impact" active={activeTab === "metrics"} onClick={() => setActiveTab("metrics")} />
                    <div className="my-2 border-t border-gray-100"></div>
                    <SidebarLink icon={<ExternalLink size={18}/>} label="View on Google Scholar" onClick={() => window.open(`https://scholar.google.com/scholar?q=${article.title}`)} />
                </nav>
            </div>

            <div className="p-6 bg-green-600 rounded-2xl text-white shadow-xl shadow-green-100 relative overflow-hidden group">
                <BookOpen className="absolute -right-4 -bottom-4 text-white/10 group-hover:scale-110 transition-transform" size={120} />
                <p className="text-[10px] font-black opacity-70 uppercase tracking-widest mb-2">Subject Area</p>
                <p className="text-lg font-bold leading-tight relative z-10">{article.discipline}</p>
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="lg:col-span-9">
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-14 min-h-[500px]">
          
            {/* CONTENT: ABSTRACT */}
            {activeTab === "abstract" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-3xl font-bold text-[#713F12] mb-8 flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-green-600 rounded-full"></div> Abstract
                    </h2>
                    <div className="prose prose-slate max-w-none">
                        <p className="text-gray-700 leading-[1.8] text-lg text-justify whitespace-pre-line">
                            {article.abstract}
                        </p>
                    </div>

                    <div className="mt-12 pt-10 border-t border-gray-100">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                            {keywords.map((kw, i) => (
                                <span key={i} className="bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-100 text-sm font-semibold hover:bg-green-600 hover:text-white transition-colors cursor-default">
                                    {kw.replace(/[\[\]"]/g, '').trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* CONTENT: AUTHORS */}
            {activeTab === "authors" && (
                <div className="animate-in slide-in-from-right-8 duration-500">
                    <h2 className="text-3xl font-bold text-[#713F12] mb-10 flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-green-600 rounded-full"></div> Author Directory
                    </h2>
                    <div className="space-y-6">
                        {article.authors?.map((author, i) => (
                            <div key={i} className="p-8 bg-gray-50 rounded-[1.5rem] border border-gray-100 group hover:border-green-300 hover:bg-white transition-all duration-300">
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex gap-5">
                                        <div className="w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center font-black text-lg shadow-lg shadow-green-100">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-[#713F12] transition-colors">{author.name}</h3>
                                            <div className="mt-4 space-y-3">
                                                <p className="flex items-start gap-3 text-gray-600 text-[15px]">
                                                    <Building2 size={18} className="text-green-600 mt-1" /> {author.affiliation}
                                                </p>
                                                <p className="flex items-center gap-3 text-gray-600 text-[15px]">
                                                    <Mail size={18} className="text-green-600" /> 
                                                    <a href={`mailto:${author.email}`} className="hover:underline hover:text-green-600">{author.email}</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {i === 0 && (
                                        <span className="h-fit bg-green-100 text-green-700 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">Corresponding Author</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* CONTENT: METRICS */}
            {activeTab === "metrics" && (
                <div className="animate-in zoom-in-95 duration-500">
                    <h2 className="text-3xl font-bold text-[#713F12] mb-10 flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-green-600 rounded-full"></div> Article Metrics
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <MetricCard icon={<Eye size={24}/>} label="Article Views" value={article.views || 0} color="green" />
                        <MetricCard icon={<Download size={24}/>} label="PDF Downloads" value={Math.floor((article.views || 0) / 2)} color="green" />
                        <MetricCard icon={<Clock size={24}/>} label="Review Time" value="18 Days" color="green" />
                    </div>
                    
                    <div className="mt-12 p-8 bg-green-500 rounded-[2rem] text-white relative overflow-hidden">
                        <Quote className="absolute top-4 right-4 text-white/20" size={100} />
                        <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                           <CheckCircle2 size={16}/> Suggested Citation
                        </h4>
                        <p className="text-lg leading-relaxed font-serif relative z-10">
                            {article.authors?.[0]?.name} et al. ({new Date(article.publishedAt).getFullYear()}). 
                            <span className="text-white"> "{article.title}"</span>. 
                            <span className="itali"> MPA Journal of Scalable Systems</span>, 
                            Vol. {article.volume}, Issue {article.issue}, DOI: {article.paperNumber}.
                        </p>
                    </div>
                </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function SidebarLink({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full text-left px-4 py-4 flex items-center gap-3 transition-all rounded-xl mb-1 ${
        active 
        ? "bg-green-600 text-white shadow-lg shadow-green-100 font-bold" 
        : "text-gray-500 hover:bg-green-50 hover:text-green-600 font-semibold"
      }`}
    >
      <span className={active ? "text-white" : "text-gray-400"}>{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  );
}

function MetricCard({ icon, label, value, color }) {
    return (
        <div className="p-8 rounded-3xl border border-gray-100 bg-gray-50 flex flex-col items-center text-center transition-all hover:bg-white hover:shadow-xl hover:shadow-green-50 group">
            <div className="mb-4 p-3 bg-white rounded-2xl text-green-600 shadow-sm group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div className="text-3xl font-black text-[#713F12]">{value}</div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-2">{label}</div>
        </div>
    );
}