"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  useGetManuscriptByIdQuery 
} from '@/store/apiSlice';
import { 
  Loader2, 
  FileText, 
  Download, 
  Calendar, 
  Users, 
  Tag, 
  ChevronLeft,
  Building2,
  BookOpen,
  Mail,
  Table as TableIcon,
  Image as ImageIcon
} from 'lucide-react';

const ArticleDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data, isLoading, error } = useGetManuscriptByIdQuery(id);

  const article = data?.manuscript;

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
      <Loader2 className="animate-spin text-emerald-600" size={50} />
    </div>
  );

  if (error || !article) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7]">
      <h2 className="text-2xl font-bold text-gray-800">Article Not Found</h2>
      <button onClick={() => router.back()} className="mt-4 text-emerald-600 font-semibold">Go Back</button>
    </div>
  );

  // Helper to parse your specific keyword format
  const getKeywords = (keywords) => {
    try {
      if (keywords.length === 1 && keywords[0].startsWith('[')) {
        return JSON.parse(keywords[0]);
      }
      return keywords;
    } catch (e) {
      return keywords;
    }
  };

  const keywordsList = getKeywords(article.keywords || []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-medium transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Archives
          </button>
          <div className="flex items-center gap-3">
             <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
               {article.manuscriptType}
             </span>
             <span className="text-gray-400 text-sm font-mono">ID: {article.manuscriptId}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header Section */}
            <header>
              <h1 className="text-3xl md:text-4xl font-black text-[#5D3A1A] leading-tight mb-6">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-emerald-600" />
                  Published: {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', {
                    month: 'long', day: 'numeric', year: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-emerald-600" />
                  Vol {article.volume || 1}, Issue {article.issue || 1} ({article.issueLabel || 'General'})
                </div>
              </div>
            </header>

            {/* Abstract Section */}
            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-[#5D3A1A] mb-4 flex items-center gap-2">
                <FileText size={20} className="text-emerald-600" />
                Abstract
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                {article.abstract}
              </p>
            </section>

            {/* Authors Section */}
            <section>
              <h2 className="text-xl font-bold text-[#5D3A1A] mb-6 flex items-center gap-2">
                <Users size={20} className="text-emerald-600" />
                Authors & Affiliations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {article.authors?.map((author, index) => (
                  <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col gap-2">
                    <h4 className="font-bold text-[#5D3A1A] text-lg">{author.name}</h4>
                    <div className="flex items-start gap-2 text-sm text-gray-500">
                      <Building2 size={14} className="mt-1 flex-shrink-0" />
                      <span>{author.affiliation}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-emerald-600">
                      <Mail size={14} />
                      <span>{author.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Keywords */}
            <section>
               <h2 className="text-lg font-bold text-[#5D3A1A] mb-4 flex items-center gap-2">
                <Tag size={18} className="text-emerald-600" />
                Keywords
              </h2>
              <div className="flex flex-wrap gap-2">
                {keywordsList.map((kw, i) => (
                  <span key={i} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium">
                    {kw.replace(/"/g, '')}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-xl shadow-emerald-100 sticky top-24">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Download size={22} />
                Downloads
              </h3>
              
              <div className="space-y-4">
                {article.files?.manuscriptFile && (
                  <a href={article.files.manuscriptFile} target="_blank" className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group">
                    <div className="flex items-center gap-3">
                      <FileText size={20} />
                      <span className="font-semibold">Full Manuscript</span>
                    </div>
                    <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                  </a>
                )}

                {article.files?.figures && (
                  <a href={article.files.figures} target="_blank" className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group">
                    <div className="flex items-center gap-3">
                      <ImageIcon size={20} />
                      <span className="font-semibold">Figures / Images</span>
                    </div>
                    <Download size={18} />
                  </a>
                )}

                {article.files?.tables && (
                  <a href={article.files.tables} target="_blank" className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group">
                    <div className="flex items-center gap-3">
                      <TableIcon size={20} />
                      <span className="font-semibold">Tables Data</span>
                    </div>
                    <Download size={18} />
                  </a>
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <div className="text-sm opacity-80 mb-1 font-medium italic">Cite this article:</div>
                <p className="text-xs leading-relaxed opacity-90">
                  {article.authors[0]?.name} et al. ({new Date(article.publishedAt).getFullYear()}). "{article.title}". Journal of Applied Biology. Vol {article.volume}, Issue {article.issue}.
                </p>
              </div>
            </div>

            {/* Quick Metadata Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Discipline</span>
                <span className="font-bold text-[#5D3A1A]">{article.discipline}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Paper No.</span>
                <span className="font-bold text-[#5D3A1A]">{article.paperNumber || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Status</span>
                <span className="font-bold text-emerald-600">{article.status}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;