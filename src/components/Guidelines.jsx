"use client";

import React from "react";
import { BookOpen, AlertCircle, CheckCircle2, Award } from "lucide-react";

/* =========================================
   1️⃣ GuidelineCard - ISME HOVER RAKHA HAI
========================================= */
const GuidelineCard = ({ title, items, icon: Icon, hasBorder = false }) => (
  <div
    className={`bg-white p-8 rounded-xl transition-all duration-300 ease-in-out cursor-default
    border-2 shadow-sm
    ${hasBorder ? "border-emerald-400" : "border-gray-100"}
    /* Hover effect sirf yahan active hai */
    hover:border-emerald-500 hover:shadow-xl hover:-translate-y-1`}
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="bg-emerald-500 p-2 rounded-md text-white">
        <Icon size={28} strokeWidth={2.5} />
      </div>
      <h3 className="text-[26px] font-bold text-[#78350f]">{title}</h3>
    </div>
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="mt-1.5 shrink-0">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
          </span>
          <span className="text-gray-600 text-[16px] leading-snug font-medium">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

/* =========================================
   2️⃣ Peer Review Timeline (Static)
========================================= */
const PeerReviewTimeline = ({ steps }) => (
  <div className="bg-[#22c55e] rounded-2xl p-10 text-white shadow-lg">
    <h2 className="text-4xl font-bold mb-12">Peer Review Process</h2>
    <div className="space-y-10 max-w-5xl">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start gap-6">
          <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center font-bold text-xl">
            {index + 1}
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-2xl font-bold">{step.title}</h3>
              {step.day && (
                <span className="bg-white/20 text-[11px] px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-white/10">
                  {step.day}
                </span>
              )}
            </div>
            <p className="text-emerald-50 text-[17px] leading-relaxed">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* =========================================
   3️⃣ Document Checklist - HOVER REMOVED
========================================= */
const DocumentChecklist = ({ title, items }) => (
  <div className="bg-[#fdfbf7] border-2 border-emerald-100 p-10 rounded-2xl shadow-sm">
    <h3 className="text-[28px] font-bold text-[#78350f] mb-8">{title}</h3>
    <ul className="space-y-5">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-4 text-[#7c4d25] font-medium">
          <CheckCircle2 className="text-emerald-500 w-6 h-6 shrink-0" />
          <span className="text-[17px]">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

/* =========================================
   4️⃣ Quick Reference - HOVER REMOVED
========================================= */
const QuickReference = ({ title, data }) => (
  <div className="bg-[#fdf4f9] border-2 border-emerald-100 p-10 rounded-2xl shadow-sm">
    <h3 className="text-[28px] font-bold text-[#78350f] mb-8">{title}</h3>
    <div className="space-y-6">
      {data.map((item, index) => (
        <div key={index} className={`pb-4 ${index !== data.length - 1 ? 'border-b border-emerald-100' : ''}`}>
          <p className="text-[#78350f] font-bold text-[16px] mb-1">{item.label}</p>
          <p className="text-[#b45309] text-[17px]">{item.value}</p>
        </div>
      ))}
    </div>
  </div>
);

/* =========================================
   5️⃣ Main Page Component
========================================= */
const GuidelinesPage = () => {
  const authorItems = [
    "Manuscript length: 5,000-8,000 words (excluding references)",
    "Format: Double-spaced, 12pt Times New Roman",
    "Use 2.54cm margins on all sides",
    "Number all pages sequentially",
    "Include page numbers in bottom right corner",
    "Use section headings: Introduction, Methods, Results, Discussion, Conclusion",
  ];

  const ethicsItems = [
    "All research must comply with institutional ethics guidelines",
    "Include ethics approval number if applicable",
    "Disclose all conflicts of interest",
    "Ensure proper informed consent for human subjects",
    "Adhere to animal welfare standards where applicable",
    "Do not submit previously published or under-review work",
  ];

  const reviewItems = [
    "Initial editorial screening (1-2 weeks)",
    "Peer review by 2-3 experts (14-21 days)",
    "Editorial decision and feedback",
    "Revision period (typically 4 weeks)",
    "Final acceptance or rejection",
    "Average total time: 8-12 weeks",
  ];

  const citationItems = [
    "Use APA 7th edition format for references",
    "In-text citations: (Author Year)",
    "Organize references alphabetically by author",
    "Include DOI when available",
    "Format: Author, A. A. (Year). Title. Journal, volume(issue), pages.",
    "Example: Smith, J. (2025). Research title. Nature Reviews, 45(3), 123-145.",
  ];

  const timelineSteps = [
    { title: "Submission", day: "Day 1-2", desc: "Author submits complete manuscript with all required documents." },
    { title: "Initial Screening", day: "Day 3-7", desc: "Editorial team checks scope, format, and originality. Desk rejection may occur." },
    { title: "Reviewer Assignment", day: "Day 8-10", desc: "Suitable peer reviewers are identified and invited to review the manuscript." },
    { title: "Peer Review", day: "Day 11-30", desc: "Reviewers provide detailed feedback on methodology, results, and significance." },
    { title: "Editorial Decision", day: "Day 31-35", desc: "Editor evaluates reviews and makes recommendation: Accept, Revise, or Reject." },
    { title: "Revision & Resubmission", day: "Day 36-63", desc: "Author revises based on feedback and resubmits with response letter." },
    { title: "Final Review", day: "Day 64-75", desc: "Reviewers assess revisions and recommend final decision." },
  ];

  const checklistItems = [
    "Title page with author information",
    "Abstract (250-300 words)",
    "Keywords (5-7 terms)",
    "Main manuscript with headings",
    "References in APA format",
    "Figure captions and references",
    "Author contributions statement",
    "Conflict of interest declaration",
    "Acknowledgments (if applicable)"
  ];

  const quickRefData = [
    { label: "Word Limit", value: "5,000-8,000 words" },
    { label: "Review Timeline", value: "14-21 days" },
    { label: "Citation Format", value: "APA 7th Edition" },
    { label: "Revision Deadline", value: "4 weeks after review" },
    { label: "File Formats", value: "PDF, DOCX, RTF" },
    { label: "Language", value: "English preferred" }
  ];

  return (
    <div className="bg-[#fdfcfb] min-h-screen py-20 px-6 font-sans scroll-mt-28" id="guidelines">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-[#78350f] mb-6 tracking-tight">
            Author Guidelines & Peer Review
          </h1>
          <p className="text-[#a16207] text-xl max-w-3xl mx-auto leading-relaxed">
            Comprehensive guidelines to help authors prepare and submit high-quality research papers.
          </p>
        </div>

        {/* 4 Cards Grid - HOVER IS HERE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <GuidelineCard title="Author Guidelines" icon={BookOpen} items={authorItems} hasBorder={true} />
          <GuidelineCard title="Ethical Considerations" icon={AlertCircle} items={ethicsItems} />
          <GuidelineCard title="Review Process" icon={CheckCircle2} items={reviewItems} />
          <GuidelineCard title="Citation Format" icon={Award} items={citationItems} hasBorder={true} />
        </div>

        {/* Timeline Section - STATIC */}
        <div className="mb-20">
          <PeerReviewTimeline steps={timelineSteps} />
        </div>

        {/* Bottom Cards - STATIC (No Hover) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <DocumentChecklist title="Document Checklist" items={checklistItems} />
          <QuickReference title="Quick Reference" data={quickRefData} />
        </div>
        
      </div>
    </div>
  );
};

export default GuidelinesPage;