"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetManuscriptByIdQuery } from "../../../store/apiSlice";
import {
  ChevronLeft, FileText, Globe, BarChart2,
  ExternalLink, Calendar, Hash,
  User, Award, BookOpen, Quote, Download,
  Mail, Building2, Eye, Layout, Clock,
  CheckCircle2, FileCheck, Share2, Maximize2
} from "lucide-react";
import ArticleToolsDropdown from "../../../components/ArticleToolsDropdown";

export default function ArticleDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("abstract");

  // Fetching manuscript data
  const { data, isLoading, error } = useGetManuscriptByIdQuery(id);
  const article = data?.manuscript;

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

  if (isLoading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-16 h-16 border-4 border-green-100 border-t-green-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-green-700 font-bold tracking-widest animate-pulse">LOADING MANUSCRIPT</p>
    </div>
  );

  if (error || !article) return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-6 bg-gray-50">
      <div className="max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Article Not Found</h2>
        <button onClick={() => router.push('/')} className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold mt-4">Return Home</button>
      </div>
    </div>
  );

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-slate-900">
      
      {/* --- HEADER --- */}
      <header className="bg-green-600 relative overflow-hidden pt-12 pb-28 px-6">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <button onClick={() => router.back()} className="group flex items-center gap-2 text-green-100 hover:text-white mb-10 transition-colors">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
            <span className="text-xs font-bold uppercase tracking-widest">Back to Library</span>
          </button>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 text-[10px] font-black px-3 py-1 rounded uppercase tracking-[0.2em]">{article.manuscriptType}</span>
            <span className="bg-yellow-400 text-yellow-950 text-[10px] font-black px-3 py-1 rounded uppercase tracking-[0.2em] flex items-center gap-1"><Globe size={12} /> Open Access</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-10 leading-[1.15] max-w-5xl">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-green-50">
            {article.authors?.map((author, i) => (
              <span key={i} className="text-lg font-medium">{author.name}<sup>{i + 1}</sup></span>
            ))}
          </div>
        </div>
      </header>

      {/* --- STICKY ACTION BAR --- */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-18 py-3 flex items-center justify-between">
          <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-gray-500">
            <div className="flex items-center gap-2"><Calendar size={16} className="text-green-600"/> Published: <span className="text-[#713F12]">{formattedDate}</span></div>
            <div className="flex items-center gap-2"><Hash size={16} className="text-green-600"/> DOI: <span className="text-[#713F12]">{article.paperNumber}</span></div>
          </div>
          <div className="flex items-center gap-4">
             <a href={article.files?.manuscriptFile} target="_blank" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold transition-all shadow-lg active:scale-95">
               <Download size={18} /> PDF Full Text
             </a>
             <ArticleToolsDropdown article={article} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* --- SIDEBAR --- */}
        <aside className="lg:col-span-3">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Navigation</div>
                <nav className="flex flex-col p-2">
                    <SidebarLink icon={<FileText size={18}/>} label="Abstract" active={activeTab === "abstract"} onClick={() => setActiveTab("abstract")} />
                    <SidebarLink icon={<Layout size={18}/>} label="Figures & Data" active={activeTab === "figures"} onClick={() => setActiveTab("figures")} />
                    <SidebarLink icon={<User size={18}/>} label="Authors" active={activeTab === "authors"} onClick={() => setActiveTab("authors")} />
                    <SidebarLink icon={<BarChart2 size={18}/>} label="Metrics" active={activeTab === "metrics"} onClick={() => setActiveTab("metrics")} />
                </nav>
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="lg:col-span-9">
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-14 min-h-[500px]">
          
            {/* TAB: ABSTRACT */}
            {activeTab === "abstract" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-3xl font-bold text-[#713F12] mb-8 flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-green-600 rounded-full"></div> Abstract
                    </h2>
                    <p className="text-gray-700 leading-[1.8] text-lg text-justify whitespace-pre-line">{article.abstract}</p>
                    <div className="mt-12 flex flex-wrap gap-2">
                        {keywords.map((kw, i) => (
                            <span key={i} className="bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-100 text-sm font-semibold">
                                {kw.replace(/[\[\]"]/g, '').trim()}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB: FIGURES (THE NEW GALLERY) */}
            {activeTab === "figures" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-3xl font-bold text-[#713F12] mb-8 flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-green-600 rounded-full"></div> Figures & Illustrations
                    </h2>
                    
                    {article.files?.figures?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {article.files.figures.map((fig, idx) => (
                                <div key={idx} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                                    <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden flex items-center justify-center p-6 cursor-zoom-in" onClick={() => window.open(fig, '_blank')}>
                                        <img 
                                          src={fig} 
                                          alt={`Figure ${idx + 1}`} 
                                          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                                        />
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="bg-white/90 backdrop-blur p-2 rounded-full shadow-lg text-green-600">
                                                <Maximize2 size={20}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 flex justify-between items-center bg-white border-t border-gray-50">
                                        <div>
                                            <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em]">Figure {idx + 1}</span>
                                            <p className="text-sm font-bold text-slate-800">Manuscript Illustration</p>
                                        </div>
                                        <a href={fig} download className="p-3 bg-green-50 text-green-600 rounded-2xl hover:bg-green-600 hover:text-white transition-all">
                                            <Download size={20}/>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                            <Layout size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500 font-medium">No figures were uploaded for this manuscript.</p>
                        </div>
                    )}
                </div>
            )}

            {/* TAB: AUTHORS */}
            {activeTab === "authors" && (
                <div className="animate-in slide-in-from-right-8 duration-500">
                    <h2 className="text-3xl font-bold text-[#713F12] mb-10 flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-green-600 rounded-full"></div> Author Directory
                    </h2>
                    <div className="space-y-4">
                        {article.authors?.map((author, i) => (
                            <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:border-green-300 transition-all">
                                <h3 className="text-xl font-bold text-[#713F12]">{author.name}</h3>
                                <p className="text-gray-600 text-sm mt-2 flex items-center gap-2"><Building2 size={16} className="text-green-600"/> {author.affiliation}</p>
                                <p className="text-gray-600 text-sm mt-1 flex items-center gap-2"><Mail size={16} className="text-green-600"/> {author.email}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB: METRICS */}
            {activeTab === "metrics" && (
                <div className="animate-in zoom-in-95 duration-500">
                    <h2 className="text-3xl font-bold text-[#713F12] mb-10 flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-green-600 rounded-full"></div> Article Metrics
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <MetricCard icon={<Eye size={24}/>} label="Views" value={article.views || 0} />
                        <MetricCard icon={<Download size={24}/>} label="Downloads" value={Math.floor((article.views || 0) * 0.4)} />
                        <MetricCard icon={<Clock size={24}/>} label="Avg Review" value="18 Days" />
                    </div>
                </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

// --- HELPERS ---
function SidebarLink({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`w-full text-left px-4 py-4 flex items-center gap-3 transition-all rounded-xl mb-1 ${active ? "bg-green-600 text-white shadow-lg shadow-green-100 font-bold" : "text-gray-500 hover:bg-green-50 hover:text-green-600 font-semibold"}`}>
      <span>{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  );
}

function MetricCard({ icon, label, value }) {
    return (
        <div className="p-8 rounded-3xl border border-gray-100 bg-gray-50 flex flex-col items-center text-center transition-all hover:bg-white hover:shadow-xl group">
            <div className="mb-4 p-3 bg-white rounded-2xl text-green-600 shadow-sm group-hover:scale-110 transition-transform">{icon}</div>
            <div className="text-3xl font-black text-[#713F12]">{value}</div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-2">{label}</div>
        </div>
    );
}