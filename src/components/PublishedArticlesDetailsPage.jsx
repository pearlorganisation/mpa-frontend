"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {  useGetManuscriptByIdQuery } from '@/store/apiSlice';
import { 
   FileText, Download, Calendar, Users, 
  ChevronLeft, BookOpen, Printer, Link as LinkIcon, Check,
  Facebook, Linkedin, MessageCircle, X, Share2,
  Building2, Mail, Tag, ShieldCheck, Info, Clock, AlertCircle,
  Loader2
} from 'lucide-react';

// Custom X Logo
const XLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);

const ArticleDetails = () => {
  const { id } = useParams();
  const router = useRouter();
   const { data, isLoading, error } = useGetManuscriptByIdQuery(id);
 
  
  const [copied, setCopied] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const article = data?.manuscript;

  // --- Logic Helpers ---
  const handlePrint = () => window.print();
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Parsing your specific keyword format: ["[\"AI\", \"ML\"]"]
  const getKeywordsList = () => {
    if (!article?.keywords || article.keywords.length === 0) return [];
    try {
      if (article.keywords[0].startsWith('[')) {
        return JSON.parse(article.keywords[0]);
      }
      return article.keywords;
    } catch (e) { return article.keywords; }
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
      <Loader2 className="animate-spin text-emerald-600" size={50} />
    </div>
  );

  if (error || !article) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7]">
      <h2 className="text-2xl font-bold text-gray-800">Manuscript Not Found</h2>
      <button onClick={() => router.back()} className="mt-4 text-emerald-600 font-semibold underline">Return to Dashboard</button>
    </div>
  );

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + " " + window.location.href)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20 print:bg-white relative">
      
      {/* --- SHARE MODAL --- */}
      {isShareOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsShareOpen(false)} />
          <div className="relative bg-white w-full max-w-[360px] rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-5 border-b border-gray-50 flex items-center gap-4">
              <button onClick={() => setIsShareOpen(false)} className="text-gray-400 hover:text-gray-600"><ChevronLeft size={24} /></button>
              <h3 className="text-lg font-bold text-[#1E293B]">Share Article</h3>
            </div>
            <div className="p-8 grid grid-cols-4 gap-4">
              <a href={shareLinks.whatsapp} target="_blank" className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white group-hover:scale-110 transition-transform"><MessageCircle size={24} fill="currentColor" /></div>
                <span className="text-[10px] font-bold text-gray-400">WhatsApp</span>
              </a>
              <a href={shareLinks.facebook} target="_blank" className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center text-white group-hover:scale-110 transition-transform"><Facebook size={24} fill="currentColor" /></div>
                <span className="text-[10px] font-bold text-gray-400">Facebook</span>
              </a>
              <a href={shareLinks.x} target="_blank" className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white group-hover:scale-110 transition-transform"><XLogo /></div>
                <span className="text-[10px] font-bold text-gray-400">X (Twitter)</span>
              </a>
              <a href={shareLinks.linkedin} target="_blank" className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-full bg-[#0A66C2] flex items-center justify-center text-white group-hover:scale-110 transition-transform"><Linkedin size={22} fill="currentColor" /></div>
                <span className="text-[10px] font-bold text-gray-400">LinkedIn</span>
              </a>
            </div>
            <div className="p-6 pt-0">
              <button onClick={handleCopyLink} className="w-full py-4 rounded-2xl border bg-gray-50 border-gray-100 flex items-center justify-center gap-3 font-bold text-gray-700">
                {copied ? <Check size={20} className="text-emerald-500" /> : <LinkIcon size={20} className="text-gray-400" />}
                {copied ? 'Link Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 print:hidden">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-bold">
            <ChevronLeft size={20} /> Dashboard
          </button>
          <div className="flex items-center gap-4">
             <span className={`px-4 py-1 rounded-full text-[11px] font-black uppercase border ${article.status === 'Published' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-amber-50 border-amber-100 text-amber-600'}`}>
                {article.status}
             </span>
             <span className="text-gray-300 text-xs font-mono">{article.manuscriptId}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT: MAIN DATA */}
          <div className="lg:col-span-2 space-y-10 print:col-span-3">
            <header>
              <h1 className="text-3xl md:text-4xl font-black text-[#5D3A1A] leading-[1.15] mb-6">{article.title}</h1>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-gray-400"><Calendar size={16}/> <b>Submitted:</b> {new Date(article.createdAt).toLocaleDateString()}</div>
                <div className="flex items-center gap-2 text-gray-400"><Tag size={16}/> <b>Type:</b> <span className="uppercase">{article.manuscriptType}</span></div>
              </div>
            </header>

            {/* Abstract Section */}
            <section className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
               <h2 className="text-xl font-bold text-[#2D1B0B] mb-4">Abstract</h2>
               <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">{article.abstract}</p>
            </section>

            {/* Keywords */}
            <section>
              <div className="flex flex-wrap gap-2">
                {getKeywordsList().map((kw, i) => (
                  <span key={i} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold border border-gray-200">
                    #{kw.replace(/[\[\]"]/g, '')}
                  </span>
                ))}
              </div>
            </section>

            {/* Authors Section */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-[#2D1B0B] flex items-center gap-2"><Users size={22} className="text-emerald-500" /> Authors & Affiliations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {article.authors?.map((auth, i) => (
                  <div key={i} className="bg-white border border-gray-100 p-6 rounded-2xl flex flex-col gap-2 shadow-sm">
                    <h4 className="font-bold text-[#2D1B0B] text-lg">{auth.name}</h4>
                    <div className="flex items-start gap-2 text-sm text-gray-500 leading-tight">
                      <Building2 size={14} className="mt-1 flex-shrink-0" /> {auth.affiliation}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                      <Mail size={14} /> {auth.email}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Review/Revision Feedback (Only shows if content exists) */}
            {(article.revisionFeedback || article.rejectionFeedback) && (
              <section className="bg-amber-50 border border-amber-100 p-8 rounded-[32px]">
                <h2 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2"><AlertCircle size={22}/> Editorial Feedback</h2>
                <div className="text-amber-900 leading-relaxed italic bg-white/50 p-6 rounded-2xl border border-amber-100">
                  {article.revisionFeedback || article.rejectionFeedback}
                </div>
              </section>
            )}

            {/* Detailed Timeline Table */}
            <section className="bg-white border border-gray-100 rounded-3xl overflow-hidden">
                <div className="p-6 bg-gray-50 border-b border-gray-100 font-bold text-[#2D1B0B]">Submission Milestones</div>
                <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-8">
                    <div>
                        <div className="text-[10px] uppercase font-black text-gray-400 mb-1 tracking-widest">Submission Date</div>
                        <div className="font-bold text-gray-700">{new Date(article.createdAt).toLocaleDateString('en-GB')}</div>
                    </div>
                    <div>
                        <div className="text-[10px] uppercase font-black text-gray-400 mb-1 tracking-widest">Decision Status</div>
                        <div className="font-bold text-emerald-600">{article.status}</div>
                    </div>
                    <div>
                        <div className="text-[10px] uppercase font-black text-gray-400 mb-1 tracking-widest">Is Revised</div>
                        <div className="font-bold text-gray-700">{article.isRevised ? "Yes" : "No"}</div>
                    </div>
                </div>
            </section>
          </div>

          {/* RIGHT: SIDEBAR / FILES / ACTIONS */}
          <div className="space-y-6 print:hidden">
            
            {/* Share & Actions */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
              <button onClick={() => setIsShareOpen(true)} className="w-full py-4 bg-emerald-50 text-emerald-700 rounded-2xl font-black border border-emerald-100 hover:bg-emerald-100 transition-all flex items-center justify-center gap-2">
                <Share2 size={18}/> SHARE MANUSCRIPT
              </button>
              <button onClick={handlePrint} className="w-full py-4 bg-[#5D3A1A] text-white rounded-2xl font-black hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-gray-200">
                <Printer size={18}/> Print 
              </button>
            </div>

            {/* Technical Metadata */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 space-y-4">
              <h3 className="font-black text-xs text-gray-400 uppercase tracking-widest flex items-center gap-2"><Info size={14}/> Paper Metadata</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm"> <span className="text-gray-400">ID</span> <span className="font-bold text-gray-700 font-mono">{article.manuscriptId}</span> </div>
                <div className="flex justify-between text-sm"> <span className="text-gray-400">Discipline</span> <span className="font-bold text-gray-700">{article.discipline}</span> </div>
                <div className="flex justify-between text-sm"> <span className="text-gray-400">Volume</span> <span className="font-bold text-gray-700">{article.volume || "TBA"}</span> </div>
                <div className="flex justify-between text-sm"> <span className="text-gray-400">Issue</span> <span className="font-bold text-gray-700">{article.issue || "TBA"}</span> </div>
                <div className="flex justify-between text-sm"> <span className="text-gray-400">Revision Status</span> <span className="font-bold text-gray-700">{article.isRevised ? 'Revised' : 'Original'}</span> </div>
              </div>
            </div>

            {/* Full File List */}
            <div className="bg-emerald-600 rounded-[32px] p-8 text-white shadow-xl shadow-emerald-100">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><ShieldCheck size={22} /> Submitted Files</h3>
              <div className="space-y-3">
                {Object.entries(article.files).map(([key, url]) => {
                  if (!url) return null;
                  return (
                    <a key={key} href={url} target="_blank" className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group">
                      <div className="flex items-center gap-3">
                        <FileText size={18} />
                        <span className="font-bold text-xs capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      </div>
                      <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
                    </a>
                  )
                })}
              </div>
              {/* <div className="mt-8 pt-8 border-t border-white/20 text-[10px] opacity-70 leading-relaxed uppercase tracking-tighter">
                  This manuscript is protected by the Pearl Organisation Publication guidelines. Accessing unauthorized files is prohibited.
              </div> */}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;