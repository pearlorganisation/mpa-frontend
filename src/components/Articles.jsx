"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  FileText,
  Quote,
  Printer,
  ShieldAlert,
  BarChart2,
  BookOpen,
  Image as ImageIcon,
  Edit,
  ExternalLink,
  Globe,
  Copy,
} from "lucide-react";

// --- MOCK DATA ---
const mockArticles =[
  {
    id: 1,
    discipline: "Biotechnology",
    date: "2026-01-25",
    title: "Biotechnological advances in RNA interference for mosquito control: Delivery platforms, gene targets, and field prospects (2015–2025)",
    authors: "Himani, Arjun, Arun",
    affiliations: "Department of Zoology, University of Science, India",
    abstract: "Mosquito-borne diseases continue to be a significant public health threat. This systematic review highlights the recent advances in RNA interference (RNAi) as a novel control method for mosquito populations. By targeting specific genes crucial for development, reproduction, and pathogen transmission, RNAi provides an alternative strategy. We discuss current challenges, delivery methods, effectiveness, and future prospects. The literature reveals that numerous research and field trials are underway...",
    citations: 120,
    views: 4500,
    doi: "10.7324/JABB.2026.270826",
    size: "1.2 MB",
    isEditorChoice: true,
  },
  {
    id: 2,
    discipline: "Plant Genetics",
    date: "2026-02-10",
    title: "Cloning the root-specific Asy promoter and genes encoding chitinase 42 kDa into plant expression vectors",
    authors: "Arjun, Himani",
    affiliations: "Institute of Biotechnology, Academy of Science",
    abstract: "A detailed methodology on cloning specific promoters to enhance plant resistance against root pathogens. The study demonstrates significant improvements in expression vectors when combined with...",
    citations: 85,
    views: 3200,
    doi: "10.7324/JABB.2026.270827",
    size: "2.4 MB",
    isEditorChoice: true,
  },
  {
    id: 3,
    discipline: "Agriculture",
    date: "2025-11-20",
    title: "CRISPR Gene Editing: A new age technology for sustainable agriculture",
    authors: "Arun, Himani, Arjun",
    affiliations: "Agricultural Research Center",
    abstract: "Exploring the potential of CRISPR technology to improve crop resilience and nutritional value in changing climates.",
    citations: 412,
    views: 5100,
    doi: "10.1234/mpa.2026.003",
    size: "1.8 MB",
    isEditorChoice: false,
  },
  {
    id: 4,
    discipline: "Bioengineering",
    date: "2025-12-05",
    title: "Microalgal biorefinery: Challenges and strategy in bioprocessing",
    authors: "Himani, Arun",
    affiliations: "Faculty of Engineering",
    abstract: "Comprehensive analysis of microalgae carbohydrates for fine chemicals and biofuel production.",
    citations: 56,
    views: 8900,
    doi: "10.1234/mpa.2026.004",
    size: "3.1 MB",
    isEditorChoice: false,
  },
  {
    id: 5,
    discipline: "Nutrition Science",
    date: "2026-01-15",
    title: "Bioactive compounds in plant-based functional foods",
    authors: "Arjun, Arun",
    affiliations: "School of Nutrition and Health",
    abstract: "Current scenarios and future challenges of functional foods for human health.",
    citations: 234,
    views: 6700,
    doi: "10.1234/mpa.2026.005",
    size: "1.5 MB",
    isEditorChoice: false,
  },
  // Adding placeholders
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: 6 + i,
    discipline: "Interdisciplinary",
    date: "2026-02-01",
    title: `Emerging Trends and Methodologies in Modern Research Studies - Part ${i + 1}`,
    authors: "Himani, Arjun, Arun",
    affiliations: "Generic University",
    abstract: "Placeholder abstract text to simulate content for different research papers and disciplines.",
    citations: 50 + i,
    views: 1000 + i * 100,
    doi: `10.1234/mpa.test.${i}`,
    size: "1.0 MB",
    isEditorChoice: false,
  }))
];

export default function Articles() {
  const router = useRouter();
  const [activeView, setActiveView] = useState("home"); // "home" | "detail"
  const [selectedArticle, setSelectedArticle] = useState(null);

  // States for Home View
  const [editorIdx, setEditorIdx] = useState(0);

  // Data Filtering
  const editorChoices = mockArticles.filter((a) => a.isEditorChoice).slice(0, 2);
  // Show first 6 articles directly under Current Issue without tab filtering
  const currentJournals = mockArticles.slice(0, 6);
  const mostViewed = [...mockArticles].sort((a, b) => b.views - a.views).slice(0, 5);

  useEffect(() => {
    setActiveView("home");
  },[]);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setTimeout(() => {
      setActiveView("detail");

      setTimeout(() => {
        document
          .getElementById("article-detail")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }, 0);
  };

  const handleBack = () => {
    setActiveView("home");
    setSelectedArticle(null);
    window.scrollTo(0, 0);
  };

  // -----------------------------------------
  // RENDER: HOME PAGE LISTINGS
  // -----------------------------------------
  if (activeView === "home") {
    return (
      <section
        id="articles"
        className="scroll-mt-24 max-w-7xl mx-auto py-10 px-6 bg-white min-h-screen font-sans"
      >
        <Toaster position="top-center" reverseOrder={false} />

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#713F12] mb-4">Journal & Articles</h1>
          <p className="text-[#B45309] text-lg">Browse latest issues, editor selections, and most viewed articles.</p>
        </div>

        {/* SECTION 1: EDITOR'S SELECT */}
        <div className="mb-16">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-[#713F12] border-b-2 border-[#10B981] pb-2 inline-block">
              Editor's Choice
            </h2>
            <button className="flex items-center gap-2 text-sm text-[#10B981] hover:text-[#059669] font-semibold bg-[#FFFBEB] px-4 py-2 rounded-lg border border-[#FEF3C7]">
              <Edit size={16} /> Choose/Update Journals
            </button>
          </div>

          <div className="relative bg-[#FFFBEB] rounded-2xl border border-[#FEF3C7] shadow-sm p-8 flex items-center justify-between min-h-[300px]">
            {/* Left Arrow */}
            <button
              onClick={() => setEditorIdx(editorIdx === 0 ? 1 : 0)}
              className="absolute left-4 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-50 text-[#713F12]"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Content Card */}
            <div className="flex flex-col md:flex-row items-center gap-8 px-12 w-full cursor-pointer group" onClick={() => handleArticleClick(editorChoices[editorIdx])}>
              <div className="flex-1 space-y-4">
                <span className="text-[#10B981] text-sm font-bold tracking-wider uppercase">Highlight</span>
                <h3 className="text-3xl font-bold text-[#713F12] group-hover:text-[#10B981] transition-colors">
                  {editorChoices[editorIdx]?.title}
                </h3>
                <p className="text-[#B45309] text-lg">{editorChoices[editorIdx]?.authors}</p>
              </div>
              <div className="w-full md:w-1/3 aspect-video bg-white rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 group-hover:shadow-lg transition-shadow">
                <ImageIcon size={48} className="opacity-50" />
                <span className="ml-2">Figure Preview</span>
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => setEditorIdx(editorIdx === 0 ? 1 : 0)}
              className="absolute right-4 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-50 text-[#713F12]"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* SECTION 2: CURRENT JOURNALS */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-[#713F12] border-b-2 border-[#10B981] pb-2 inline-block -mb-[18px]">
              Current Issue
            </h2>
            <button className="text-[#10B981] font-semibold hover:underline">View All</button>
          </div>

          {/* Articles Grid (Without Tabs) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentJournals.map((article) => (
              <ArticleCard key={article.id} article={article} onClick={() => handleArticleClick(article)} />
            ))}
            {currentJournals.length === 0 && (
              <div className="col-span-3 text-center py-10 text-[#B45309]">No articles found.</div>
            )}
          </div>
        </div>

        {/* SECTION 3: MOST VIEWED */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#713F12] border-b-2 border-[#10B981] pb-2 inline-block">
              Most Viewed / Downloaded
            </h2>
            <button className="text-[#10B981] font-semibold hover:underline">View All</button>
          </div>

          <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide">
            {mostViewed.map((article) => (
              <div key={article.id} className="min-w-[300px] w-[300px] flex-shrink-0">
                <ArticleCard article={article} onClick={() => handleArticleClick(article)} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // -----------------------------------------
  // RENDER: DETAILED ABSTRACT PAGE
  // -----------------------------------------
  return (
    <div
      id="article-detail"
      className="min-h-screen bg-gray-50 pb-20 font-sans scroll-mt-24"
    >
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Detail Header Banner */}
      <div className="bg-[#22C55E] pt-8 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-white text-sm mb-6 flex items-center gap-2 cursor-pointer" onClick={handleBack}>
            <ChevronLeft size={16} /> Back to Home
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="bg-white text-[#064E3B] text-xs font-bold px-3 py-1 rounded">RESEARCH ARTICLE</span>
            <span className="text-gray-300 text-sm">OPEN ACCESS</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-snug">
            {selectedArticle.title}
          </h1>

          <p className="text-[#6EE7B7] text-lg font-medium mb-2">
            {selectedArticle.authors}
          </p>
          <p className="text-gray-300 text-sm italic">
            {selectedArticle.affiliations}
          </p>
        </div>
      </div>

      {/* Action Bar (Share/Download tools) */}
      <div className="bg-[#22C55E] border-t border-[#10B981]/30 px-6 py-4 shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-gray-100 text-sm">
            <span className="block md:inline mr-6"><strong>Published:</strong> {selectedArticle.date}</span>
            <span className="block md:inline"><strong>DOI:</strong> <a href="#" className="hover:underline">{selectedArticle.doi}</a></span>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-[#10B981] hover:bg-[#059669] text-white px-5 py-2.5 rounded shadow flex items-center gap-2 font-bold transition-colors">
              <FileText size={18} /> PDF [{selectedArticle.size}]
            </button>
            <ArticleToolsDropdown article={selectedArticle} />
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">

        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-1/4 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-32">
            <div className="p-4 bg-[#FFFBEB] border-b border-[#FEF3C7] text-[#713F12] font-bold">
              Article Contents
            </div>
            <nav className="flex flex-col text-[#45260b] text-sm">
              <SidebarLink icon={<FileText size={16} />} label="Abstract" active />
              <SidebarLink icon={<Globe size={16} />} label="HTML Full Text" />
              <SidebarLink icon={<BarChart2 size={16} />} label="Article Metrics" />
              <SidebarLink icon={<ShieldAlert size={16} />} label="Request Permission" />
              <SidebarLink icon={<BookOpen size={16} />} label="Related Records" />
              <SidebarLink icon={<ExternalLink size={16} />} label="View in Google Scholar" />
            </nav>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="w-full md:w-3/4 bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 text-gray-800">
          <h2 className="text-2xl font-bold text-[#064E3B] mb-6 border-b pb-4">Abstract</h2>
          <div className="prose max-w-none text-gray-700 leading-relaxed text-lg text-justify space-y-6">
            <p>{selectedArticle.abstract}</p>
            <p>
              In recent years, {selectedArticle.discipline.toLowerCase()} research has emphasized sustainable approaches. The data clearly shows that adapting modern frameworks significantly enhances overall efficiency. This study evaluates multiple vectors and control conditions across various testing grounds to ensure reliability.
            </p>
            <p>
              <strong>Conclusions:</strong> The implemented protocols yielded a 45% increase in base efficiency, laying the groundwork for future implementations at scale. We recommend further long-term studies to confirm these preliminary findings in diverse ecosystem structures.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-100">
            <h4 className="text-[#713F12] font-bold mb-3">Keywords:</h4>
            <div className="flex flex-wrap gap-2">
              {["Research", "Review", "Sustainable Methods", selectedArticle.discipline].map((kw, i) => (
                <span key={i} className="bg-gray-100 border border-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}

// -----------------------------------------
// SUB-COMPONENTS
// -----------------------------------------

// Article Card used in Lists
function ArticleCard({ article, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-[#10B981] transition-all duration-300 cursor-pointer flex flex-col h-full group"
    >
      <div className="w-full h-40 bg-gray-50 flex items-center justify-center border-b border-gray-100 group-hover:bg-[#FFFBEB] transition-colors relative">
        <ImageIcon size={40} className="text-gray-300" />
        {/* Replaced Category with Discipline */}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-xs font-bold text-[#10B981] px-2 py-1 rounded shadow-sm">
          {article.discipline}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-xs text-[#B45309] mb-2 flex justify-between">
          <span>Review Article</span>
          <span>{article.date}</span>
        </div>
        <h3 className="font-bold text-[#713F12] text-sm md:text-base leading-tight mb-3 line-clamp-3 group-hover:text-[#10B981] transition-colors">
          {article.title}
        </h3>
        <div className="mt-auto">
          <p className="text-xs text-gray-500 line-clamp-1 mb-2">{article.authors}</p>
          <p className="text-xs font-medium text-[#B45309]">Journal of App. Bio. ({article.views} views)</p>
        </div>
      </div>
    </div>
  );
}

// Article Tools Dropdown Component with Social Sharing logic
function ArticleToolsDropdown({ article }) {
  const [isOpen, setIsOpen] = useState(false);
  const[isSharing, setIsSharing] = useState(false);
  const dropdownRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsSharing(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  },[]);

  const shareTo = (platform) => {
    const url = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
    const title = encodeURIComponent(article?.title || "Check out this article!");

    let shareUrl = "";
    switch (platform) {
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      default:
        break;
    }
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const copyToClipboard = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
      setIsOpen(false);
      setIsSharing(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) setIsSharing(false);
        }}
        className="bg-[#0f766e] hover:bg-[#115e59] text-white border border-[#14b8a6] px-5 py-2.5 rounded shadow flex items-center gap-2 font-bold transition-colors"
      >
        Article Tools ▼
      </button>

      {/* Main Tools View */}
      {isOpen && !isSharing && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-50 text-gray-700 animate-in fade-in slide-in-from-top-2">
          <DropdownItem icon={<ShieldAlert size={16} />} label="Request Permission" />
          <DropdownItem icon={<Quote size={16} />} label="Download Citation" />
          <DropdownItem icon={<Download size={16} />} label="Download PDF" />
          <div className="h-px bg-gray-100 my-2"></div>
          
          <DropdownItem 
             icon={<Share2 size={16} />} 
             label="Share" 
             onClick={(e) => { e.stopPropagation(); setIsSharing(true); }} 
          />
          
          <DropdownItem icon={<Printer size={16} />} label="Print" />
        </div>
      )}

      {/* Share Social Links View */}
      {isOpen && isSharing && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-2xl border border-gray-200 py-3 z-50 text-gray-700 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 px-4 pb-2 border-b border-gray-100 mb-3">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsSharing(false); }} 
              className="p-1 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-800 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="font-semibold text-gray-800">Share Article</span>
          </div>
          
          <div className="grid grid-cols-4 gap-2 px-4 mb-3">
            {/* WhatsApp */}
            <button onClick={() => shareTo('whatsapp')} className="flex flex-col items-center gap-1.5 p-1 hover:bg-gray-50 rounded-lg group transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              </div>
              <span className="text-[11px] font-medium text-gray-500 group-hover:text-gray-800">WhatsApp</span>
            </button>
            {/* Facebook */}
            <button onClick={() => shareTo('facebook')} className="flex flex-col items-center gap-1.5 p-1 hover:bg-gray-50 rounded-lg group transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.325V1.325C24 .597 23.403 0 22.675 0z"/></svg>
              </div>
              <span className="text-[11px] font-medium text-gray-500 group-hover:text-gray-800">Facebook</span>
            </button>
            {/* Twitter */}
            <button onClick={() => shareTo('twitter')} className="flex flex-col items-center gap-1.5 p-1 hover:bg-gray-50 rounded-lg group transition-colors">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </div>
              <span className="text-[11px] font-medium text-gray-500 group-hover:text-gray-800">X (Twitter)</span>
            </button>
            {/* LinkedIn */}
            <button onClick={() => shareTo('linkedin')} className="flex flex-col items-center gap-1.5 p-1 hover:bg-gray-50 rounded-lg group transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
              </div>
              <span className="text-[11px] font-medium text-gray-500 group-hover:text-gray-800">LinkedIn</span>
            </button>
          </div>
          
          <div className="px-4">
             <button onClick={copyToClipboard} className="w-full flex items-center justify-center gap-2 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium transition-colors text-gray-700">
               <Copy size={16} /> Copy Link
             </button>
          </div>
        </div>
      )}
    </div>
  );
}

function DropdownItem({ icon, label, onClick }) {
  return (
    <button 
      onClick={onClick} 
      className="w-full text-left px-5 py-2.5 flex items-center gap-3 hover:bg-[#FFFBEB] hover:text-[#10B981] transition-colors text-sm font-medium"
    >
      <span className="text-[#064E3B] opacity-70">{icon}</span> {label}
    </button>
  );
}

function SidebarLink({ icon, label, active }) {
  return (
    <button className={`w-full text-left px-5 py-3.5 flex items-center gap-3 border-b border-gray-50 transition-colors ${active ? "bg-[#10B981]/10 text-[#064E3B] font-bold border-l-4 border-l-[#10B981]" : "hover:bg-gray-50 hover:text-[#10B981]"
      }`}>
      <span className={active ? "text-[#10B981]" : "text-gray-400"}>{icon}</span> {label}
    </button>
  );
}