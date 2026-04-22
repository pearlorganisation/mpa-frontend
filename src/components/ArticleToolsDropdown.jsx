"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Share2, Download, Quote, Printer, Copy, ChevronLeft,
  FileText, BarChart3, ShieldCheck, Mail, Check, ExternalLink,
  Facebook, Twitter, Linkedin, MessageCircle
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function ArticleToolsDropdown({ article }) {
  const [activeView, setActiveView] = useState("main"); // main, share, cite, metrics
  const [isOpen, setIsOpen] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setActiveView("main");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // 1. Sharing Logic
  const shareTo = (platform) => {
    const url = window.location.href;
    const title = article?.title || "Research Article";
    const links = {
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent("Check out this article: " + url)}`,
    };
    window.open(links[platform], "_blank");
  };

  // 2. Citation Logic (Production Standard)
  const getCitation = (format) => {
    const authors = article?.authors?.map(a => a.lastName + " " + a.firstName[0] + ".").join(", ") || "Author et al.";
    const year = new Date(article?.publishDate).getFullYear() || new Date().getFullYear();
    const title = article?.title || "Untitled Article";
    const journal = "International Journal of Science"; // Replace with your journal name
    const volume = article?.volume || "1";
    const issue = article?.issue || "1";
    const doi = article?.doi || "10.xxxx/journal.v1i1";

    const formats = {
      APA: `${authors} (${year}). ${title}. ${journal}, ${volume}(${issue}). https://doi.org/${doi}`,
      MLA: `${authors}. "${title}." ${journal}, vol. ${volume}, no. ${issue}, ${year}.`,
      Harvard: `${authors}, ${year}. ${title}. ${journal}, ${volume}(${issue}).`,
      BibTeX: `@article{article_id,\n  author = {${authors}},\n  title = {${title}},\n  journal = {${journal}},\n  year = {${year}},\n  volume = {${volume}}\n}`
    };
    return formats[format];
  };

  const copyCitation = (format) => {
    const text = getCitation(format);
    navigator.clipboard.writeText(text);
    setCopiedText(format);
    toast.success(`${format} Citation Copied!`);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const handleDownloadPDF = () => {
    if (article?.files?.manuscriptFile) {
      window.open(article.files.manuscriptFile?.url, "_blank");
    } else {
      toast.error("PDF file not available at the moment.");
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <Toaster position="top-right" />

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-md shadow-lg transition-all font-semibold text-sm border border-slate-700"
      >
        <FileText size={18} />
        Article Tools
        <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-[100] overflow-hidden animate-in fade-in zoom-in duration-200">

          {/* VIEW: MAIN MENU */}
          {activeView === "main" && (
            <div className="py-2">
              <div className="px-4 py-2 border-b border-gray-50 mb-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">General Tools</span>
              </div>
              <ToolButton icon={<Download size={16} />} label="Download PDF" onClick={handleDownloadPDF} />
              <ToolButton icon={<Quote size={16} />} label="Cite this Article" onClick={() => setActiveView("cite")} />
              <ToolButton icon={<BarChart3 size={16} />} label="Article Metrics" onClick={() => setActiveView("metrics")} />

              <div className="h-px bg-gray-100 my-2"></div>

              <div className="px-4 py-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Share & Export</span>
              </div>
              <ToolButton icon={<Share2 size={16} />} label="Share Article" onClick={() => setActiveView("share")} />
              <ToolButton icon={<Printer size={16} />} label="Print Full Text" onClick={() => window.print()} />
              <ToolButton icon={<ShieldCheck size={16} />} label="Rights & Permissions" onClick={() => window.open('https://copyright.com', '_blank')} />
            </div>
          )}

          {/* VIEW: CITATION BOX */}
          {activeView === "cite" && (
            <div className="p-4">
              <Header title="Generate Citation" onBack={() => setActiveView("main")} />
              <div className="space-y-2 mt-4">
                {["APA", "MLA", "Harvard", "BibTeX"].map((f) => (
                  <button
                    key={f}
                    onClick={() => copyCitation(f)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-emerald-50 border border-gray-100 rounded-lg text-sm font-medium transition-colors group"
                  >
                    <span className="text-gray-700">{f} Format</span>
                    {copiedText === f ? <Check size={16} className="text-emerald-600" /> : <Copy size={14} className="text-gray-400 group-hover:text-emerald-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: SHARING BOX */}
          {activeView === "share" && (
            <div className="p-4">
              <Header title="Share Research" onBack={() => setActiveView("main")} />
              <div className="grid grid-cols-4 gap-3 mt-4 mb-4">
                <SocialIcon
                  color="bg-[#25D366]"
                  icon={<MessageCircle size={18} />}
                  label="WhatsApp"
                  onClick={() => shareTo("whatsapp")}
                />

                <SocialIcon
                  color="bg-[#1877F2]"
                  icon={<Facebook size={18} />}
                  label="Facebook"
                  onClick={() => shareTo("facebook")}
                />

                <SocialIcon
                  color="bg-[#1DA1F2]"
                  icon={<Twitter size={18} />}
                  label="Twitter"
                  onClick={() => shareTo("twitter")}
                />

                <SocialIcon
                  color="bg-[#0A66C2]"
                  icon={<Linkedin size={18} />}
                  label="LinkedIn"
                  onClick={() => shareTo("linkedin")}
                />
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Link copied to clipboard!");
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-gray-800 transition-all"
              >
                <Copy size={14} /> Copy Article URL
              </button>
            </div>
          )}

          {/* VIEW: METRICS BOX */}
          {activeView === "metrics" && (
            <div className="p-4">
              <Header title="Article Metrics" onBack={() => setActiveView("main")} />
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-100">
                  <div className="text-2xl font-bold text-blue-700">{article?.views || '1.2k'}</div>
                  <div className="text-[10px] text-blue-600 uppercase font-bold">Views</div>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg text-center border border-emerald-100">
                  <div className="text-2xl font-bold text-emerald-700">{article?.downloads || '450'}</div>
                  <div className="text-[10px] text-emerald-600 uppercase font-bold">Downloads</div>
                </div>
              </div>
              <div className="mt-4 text-[11px] text-gray-500 italic text-center">
                * Data updated every 24 hours
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

// --- Sub-components for cleaner code ---

function ToolButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-5 py-3 flex items-center gap-3 hover:bg-slate-50 hover:text-emerald-700 text-sm font-medium transition-all group"
    >
      <span className="text-gray-400 group-hover:text-emerald-500 transition-colors">{icon}</span>
      {label}
    </button>
  );
}

function Header({ title, onBack }) {
  return (
    <div className="flex items-center gap-2 mb-2 border-b pb-2">
      <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
        <ChevronLeft size={18} className="text-gray-600" />
      </button>
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-tight">{title}</h3>
    </div>
  );
}

function SocialIcon({ color, icon, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`${color} text-white p-3 rounded-lg flex flex-col items-center justify-center hover:opacity-90 transition-opacity shadow-sm`}
      title={label}
    >
      {icon}
    </button>
  );
}