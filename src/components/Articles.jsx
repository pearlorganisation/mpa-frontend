"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import {
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
  ExternalLink,
  Globe,
} from "lucide-react";

import Link from "next/link";

// --- MOCK DATA (Categorization removed) ---
const mockArticles = [
  {
    id: 1,
    date: "2026-01-25",
    title: "Biotechnological advances in RNA interference for mosquito control: Delivery platforms, gene targets, and field prospects (2015–2025)",
    authors: "Poonam Daswani, Yesh Sharma, Ashwani Kumar",
    affiliations: "Department of Zoology, University of Science, India",
    abstract: "Mosquito-borne diseases continue to be a significant public health threat. This systematic review highlights the recent advances in RNA interference (RNAi) as a novel control method for mosquito populations...",
    citations: 120,
    views: 4500,
    doi: "10.7324/JABB.2026.270826",
    size: "1.2 MB",
    isEditorChoice: true,
  },
  {
    id: 2,
    date: "2026-02-10",
    title: "Cloning the root-specific Asy promoter and genes encoding chitinase 42 kDa into plant expression vectors",
    authors: "Nguyen Hoang Tue, Tran Gia Cat Tuong, Pham Thi Huyen",
    affiliations: "Institute of Biotechnology, Academy of Science",
    abstract: "A detailed methodology on cloning specific promoters to enhance plant resistance against root pathogens...",
    citations: 85,
    views: 3200,
    doi: "10.7324/JABB.2026.270827",
    size: "2.4 MB",
    isEditorChoice: true,
  },
  {
    id: 3,
    date: "2025-11-20",
    title: "CRISPR Gene Editing: A new age technology for sustainable agriculture",
    authors: "Dr. Robert Miller, Dr. Alice Zhang",
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
    date: "2025-12-05",
    title: "Microalgal biorefinery: Challenges and strategy in bioprocessing",
    authors: "Tan Paul Meng, Rauf Harun",
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
    date: "2026-01-15",
    title: "Bioactive compounds in plant-based functional foods",
    authors: "Sarah Jenkins, Mark Otto",
    affiliations: "School of Nutrition and Health",
    abstract: "Current scenarios and future challenges of functional foods for human health.",
    citations: 234,
    views: 6700,
    doi: "10.1234/mpa.2026.005",
    size: "1.5 MB",
    isEditorChoice: false,
  },
];

export default function Articles() {
  const [activeView, setActiveView] = useState("home"); 
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [editorIdx, setEditorIdx] = useState(0);

  // Logic: "Current Issue" now just shows the first 3 items, "Most Viewed" sorts by views
  const editorChoices = mockArticles.filter((a) => a.isEditorChoice).slice(0, 2);
  const currentIssueArticles = mockArticles.slice(0, 3);
  const mostViewed = [...mockArticles].sort((a, b) => b.views - a.views).slice(0, 5);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setActiveView("detail");
    setTimeout(() => {
      document.getElementById("article-detail")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const handleBack = () => {
    setActiveView("home");
    setSelectedArticle(null);
    window.scrollTo(0, 0);
  };

  if (activeView === "home") {
    return (
      <section id="articles" className="scroll-mt-24 max-w-7xl mx-auto py-10 px-6 bg-white min-h-screen font-sans">
        <Toaster position="top-center" />

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#713F12] mb-4">Journal & Articles</h1>
          <p className="text-[#B45309] text-lg">Browse latest issues, editor selections, and most viewed articles.</p>
        </div>

        {/* SECTION: BRAND STATEMENT (Added from your previous request) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-green-100 pt-12 mb-16 items-center">
            <div className="md:col-span-2">
                <h2 className="text-3xl md:text-4xl font-medium text-[#854D0E] leading-tight">
                We publish articles with the{" "}
                <span className="text-[#22C55E] font-bold">highest quality rate</span> and{" "}
                <span className="text-[#22C55E] font-bold">remarkable impact factor</span>.
                </h2>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-1 gap-4 md:border-l border-green-100 md:pl-10">
                <div>
                    <div className="text-2xl font-bold text-[#22C55E]">98%</div>
                    <div className="text-[10px] font-bold text-[#854D0E] uppercase">Quality Rate</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-[#22C55E]">2.5</div>
                    <div className="text-[10px] font-bold text-[#854D0E] uppercase">Impact Factor</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-[#22C55E]">5000+</div>
                    <div className="text-[10px] font-bold text-[#854D0E] uppercase">Articles</div>
                </div>
            </div>
        </div>

        {/* SECTION 1: EDITOR'S SELECT */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#713F12] border-b-2 border-[#10B981] pb-2 mb-6 inline-block">Editor's Choice</h2>
          <div className="relative bg-[#FFFBEB] rounded-2xl border border-[#FEF3C7] shadow-sm p-8 flex items-center justify-between min-h-[300px]">
            <button onClick={() => setEditorIdx(editorIdx === 0 ? 1 : 0)} className="absolute left-4 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-50 text-[#713F12]">
              <ChevronLeft size={24} />
            </button>
            <div className="flex flex-col md:flex-row items-center gap-8 px-12 w-full cursor-pointer group" onClick={() => handleArticleClick(editorChoices[editorIdx])}>
              <div className="flex-1 space-y-4">
                <span className="text-[#10B981] text-sm font-bold tracking-wider uppercase">Highlight</span>
                <h3 className="text-3xl font-bold text-[#713F12] group-hover:text-[#10B981] transition-colors">{editorChoices[editorIdx]?.title}</h3>
                <p className="text-[#B45309] text-lg">{editorChoices[editorIdx]?.authors}</p>
              </div>
              <div className="w-full md:w-1/3 aspect-video bg-white rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 group-hover:shadow-lg">
                <ImageIcon size={48} className="opacity-50" />
              </div>
            </div>
            <button onClick={() => setEditorIdx(editorIdx === 0 ? 1 : 0)} className="absolute right-4 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-50 text-[#713F12]">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* SECTION 2: CURRENT ISSUE (Generic list) */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#713F12] border-b-2 border-[#10B981] pb-2 inline-block">Current Issue</h2>
            <Link href="/#editorial-board" className="text-[#10B981] font-semibold hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentIssueArticles.map((article) => (
              <ArticleCard key={article.id} article={article} onClick={() => handleArticleClick(article)} />
            ))}
          </div>
        </div>

        {/* SECTION 3: MOST VIEWED */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#713F12] border-b-2 border-[#10B981] pb-2 inline-block">Most Viewed</h2>
            {/* <Link href="/all-articles" className="text-[#10B981] font-semibold hover:underline">View All</Link> */}
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

  // --- DETAIL VIEW ---
  return (
    <div id="article-detail" className="min-h-screen bg-gray-50 pb-20 font-sans scroll-mt-24">
      <div className="bg-[#22C55E] pt-8 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-white text-sm mb-6 flex items-center gap-2 cursor-pointer" onClick={handleBack}>
            <ChevronLeft size={16} /> Back to Home
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-white text-[#064E3B] text-xs font-bold px-3 py-1 rounded">RESEARCH ARTICLE</span>
            <span className="text-gray-300 text-sm">OPEN ACCESS</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-snug">{selectedArticle.title}</h1>
          <p className="text-[#6EE7B7] text-lg font-medium mb-2">{selectedArticle.authors}</p>
          <p className="text-gray-300 text-sm italic">{selectedArticle.affiliations}</p>
        </div>
      </div>

      <div className="bg-[#22C55E] border-t border-[#10B981]/30 px-6 py-4 sticky top-0 z-20 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-gray-100 text-sm">
            <span className="mr-6"><strong>Published:</strong> {selectedArticle.date}</span>
            <span><strong>DOI:</strong> {selectedArticle.doi}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-[#10B981] text-white px-5 py-2.5 rounded shadow flex items-center gap-2 font-bold">
              <FileText size={18} /> PDF [{selectedArticle.size}]
            </button>
            <ArticleToolsDropdown />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
        <aside className="w-full md:w-1/4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-32">
            <div className="p-4 bg-[#FFFBEB] text-[#713F12] font-bold border-b border-[#FEF3C7]">Article Contents</div>
            <nav className="flex flex-col text-sm">
              <SidebarLink icon={<FileText size={16} />} label="Abstract" active />
              <SidebarLink icon={<Globe size={16} />} label="HTML Full Text" />
              <SidebarLink icon={<BarChart2 size={16} />} label="Metrics" />
              <SidebarLink icon={<ExternalLink size={16} />} label="Google Scholar" />
            </nav>
          </div>
        </aside>

        <main className="w-full md:w-3/4 bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-[#064E3B] mb-6 border-b pb-4">Abstract</h2>
          <div className="prose max-w-none text-gray-700 leading-relaxed text-justify space-y-6">
            <p>{selectedArticle.abstract}</p>
            <p>Our recent research emphasizes sustainable and rigorous scientific approaches. The data demonstrates that adapting modern frameworks significantly enhances overall outcome efficiency.</p>
          </div>
        </main>
      </div>
    </div>
  );
}

// --- REUSABLE SUB-COMPONENTS ---

function ArticleCard({ article, onClick }) {
  return (
    <div onClick={onClick} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-[#10B981] transition-all cursor-pointer flex flex-col h-full group">
      <div className="w-full h-40 bg-gray-50 flex items-center justify-center border-b group-hover:bg-[#FFFBEB]">
        <ImageIcon size={40} className="text-gray-300" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-xs text-[#B45309] mb-2 flex justify-between">
          <span>Review Article</span>
          <span>{article.date}</span>
        </div>
        <h3 className="font-bold text-[#713F12] text-sm md:text-base leading-tight mb-3 line-clamp-3 group-hover:text-[#10B981]">
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

function ArticleToolsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="bg-[#0f766e] text-white px-5 py-2.5 rounded shadow flex items-center gap-2 font-bold">
        Tools ▼
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-50">
          <button className="w-full text-left px-5 py-2 hover:bg-[#FFFBEB] text-sm flex items-center gap-2"><Quote size={14}/> Citation</button>
          <button className="w-full text-left px-5 py-2 hover:bg-[#FFFBEB] text-sm flex items-center gap-2"><Share2 size={14}/> Share</button>
          <button className="w-full text-left px-5 py-2 hover:bg-[#FFFBEB] text-sm flex items-center gap-2"><Printer size={14}/> Print</button>
        </div>
      )}
    </div>
  );
}

function SidebarLink({ icon, label, active }) {
  return (
    <button className={`w-full text-left px-5 py-3 flex items-center gap-3 transition-colors ${active ? "bg-[#10B981]/10 text-[#064E3B] font-bold border-l-4 border-[#10B981]" : "hover:bg-gray-50"}`}>
      <span className={active ? "text-[#10B981]" : "text-gray-400"}>{icon}</span> {label}
    </button>
  );
}