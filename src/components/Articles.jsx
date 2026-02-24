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
} from "lucide-react";

// --- MOCK DATA ---
const categories = ["Biology", "Chemistry", "Physics", "Engineering", "Medicine"];

const mockArticles = [
  {
    id: 1,
    category: "Biology",
    date: "2026-01-25",
    title: "Biotechnological advances in RNA interference for mosquito control: Delivery platforms, gene targets, and field prospects (2015–2025)",
    authors: "Poonam Daswani, Yesh Sharma, Ashwani Kumar",
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
    category: "Physics",
    date: "2026-02-10",
    title: "Cloning the root-specific Asy promoter and genes encoding chitinase 42 kDa into plant expression vectors",
    authors: "Nguyen Hoang Tue, Tran Gia Cat Tuong, Pham Thi Huyen",
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
    category: "Biology",
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
    category: "Biology",
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
    category: "Medicine",
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
  // Adding placeholders to fill tabs
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: 6 + i,
    category: categories[i % categories.length],
    date: "2026-02-01",
    title: `Research Article Placeholder ${i + 1} for ${categories[i % categories.length]}`,
    authors: "Author A, Author B",
    affiliations: "Generic University",
    abstract: "Placeholder abstract text to simulate content for different department tabs.",
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
  const [activeTab, setActiveTab] = useState("Biology");

  // Data Filtering
  const editorChoices = mockArticles.filter((a) => a.isEditorChoice).slice(0, 2);
  const currentJournals = mockArticles.filter((a) => a.category === activeTab).slice(0, 3);
  const mostViewed = [...mockArticles].sort((a, b) => b.views - a.views).slice(0, 5);

  useEffect(() => {
    setActiveView("home");
  }, []);
  const handleArticleClick = (article) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      toast.error("Please login or signup to view this article.", {
        icon: '🔒',
        duration: 4000
      });

      setTimeout(() => {
        router.push("/register");
      }, 1500);
      return;
    }
    setSelectedArticle(article);
    setTimeout(() => {
      setActiveView("detail");
      window.scrollTo({ top: 0, behavior: "smooth" });
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
        className="max-w-7xl mx-auto py-10 px-6 bg-white min-h-screen font-sans"
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
            {/* Editor Tool Mockup */}
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

        {/* SECTION 2: CURRENT JOURNALS (Tabs) */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#713F12] border-b-2 border-[#10B981] pb-2 inline-block">
              Current Issue
            </h2>
            <button className="text-[#10B981] font-semibold hover:underline">View All</button>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2 rounded-t-lg font-medium transition-all duration-200 ${activeTab === cat
                  ? "bg-[#22C55E] text-white"
                  : "bg-gray-100 text-[#713F12] hover:bg-gray-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Top 3 Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentJournals.map((article) => (
              <ArticleCard key={article.id} article={article} onClick={() => handleArticleClick(article)} />
            ))}
            {currentJournals.length === 0 && (
              <div className="col-span-3 text-center py-10 text-[#B45309]">No articles found for this department.</div>
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
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* Detail Header Banner */}
      <div className="bg-[#064E3B] pt-8 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-[#6EE7B7] text-sm mb-6 flex items-center gap-2 cursor-pointer" onClick={handleBack}>
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
      <div className="bg-[#0f766e] border-t border-[#10B981]/30 px-6 py-4 shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-gray-100 text-sm">
            <span className="block md:inline mr-6"><strong>Published:</strong> {selectedArticle.date}</span>
            <span className="block md:inline"><strong>DOI:</strong> <a href="#" className="hover:underline">{selectedArticle.doi}</a></span>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-[#10B981] hover:bg-[#059669] text-white px-5 py-2.5 rounded shadow flex items-center gap-2 font-bold transition-colors">
              <FileText size={18} /> PDF [{selectedArticle.size}]
            </button>
            <ArticleToolsDropdown />
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
              In recent years, {selectedArticle.category.toLowerCase()} research has emphasized sustainable approaches. The data clearly shows that adapting modern frameworks significantly enhances overall efficiency. This study evaluates multiple vectors and control conditions across various testing grounds to ensure reliability.
            </p>
            <p>
              <strong>Conclusions:</strong> The implemented protocols yielded a 45% increase in base efficiency, laying the groundwork for future implementations at scale. We recommend further long-term studies to confirm these preliminary findings in diverse ecosystem structures.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-100">
            <h4 className="text-[#713F12] font-bold mb-3">Keywords:</h4>
            <div className="flex flex-wrap gap-2">
              {["Biotechnology", "Review", "Sustainable Methods", selectedArticle.category].map((kw, i) => (
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
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-xs font-bold text-[#10B981] px-2 py-1 rounded shadow-sm">
          {article.category}
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

// Article Tools Dropdown Component
function ArticleToolsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);



  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#0f766e] hover:bg-[#115e59] text-white border border-[#14b8a6] px-5 py-2.5 rounded shadow flex items-center gap-2 font-bold transition-colors"
      >
        Article Tools ▼
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-50 text-gray-700 animate-in fade-in slide-in-from-top-2">
          <DropdownItem icon={<ShieldAlert size={16} />} label="Request Permission" />
          <DropdownItem icon={<Quote size={16} />} label="Download Citation" />
          <DropdownItem icon={<Download size={16} />} label="Download PDF" />
          <div className="h-px bg-gray-100 my-2"></div>
          <DropdownItem icon={<Share2 size={16} />} label="Share" />
          <DropdownItem icon={<Printer size={16} />} label="Print" />
        </div>
      )}
    </div>
  );
}

function DropdownItem({ icon, label }) {
  return (
    <button className="w-full text-left px-5 py-2.5 flex items-center gap-3 hover:bg-[#FFFBEB] hover:text-[#10B981] transition-colors text-sm font-medium">
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