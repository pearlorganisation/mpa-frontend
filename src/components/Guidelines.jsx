"use client";

import React, { useState } from "react";
import { BookOpen, AlertCircle, CheckCircle2, Award, X } from "lucide-react";

/* =========================================
   NEW: Modal Component for Full Text
========================================= */
const FullTextModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#fdfcfb]">
          <h2 className="text-2xl font-bold text-[#78350f]">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-8 overflow-y-auto text-gray-700 leading-relaxed text-[17px]">
          {content}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-100 flex justify-end bg-[#fdfcfb]">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================
   1️⃣ GuidelineCard - Updated with Read More
========================================= */
const GuidelineCard = ({ title, items, icon: Icon, hasBorder = false, onReadMore }) => (
  <div
    className={`bg-white p-8 rounded-xl transition-all duration-300 ease-in-out cursor-default
    border-2 shadow-sm flex flex-col h-full
    ${hasBorder ? "border-emerald-400" : "border-gray-100"}
    hover:border-emerald-500 hover:shadow-xl hover:-translate-y-1`}
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="bg-emerald-500 p-2 rounded-md text-white">
        <Icon size={28} strokeWidth={2.5} />
      </div>
      <h3 className="text-[26px] font-bold text-[#78350f]">{title}</h3>
    </div>
    <ul className="space-y-4 flex-grow">
      {items.slice(0, 6).map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="mt-1.5 shrink-0">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
          </span>
          <span className="text-gray-600 text-[16px] leading-snug font-medium line-clamp-2">{item}</span>
        </li>
      ))}
    </ul>
    
    {onReadMore && (
      <button 
        onClick={onReadMore}
        className="mt-6 text-emerald-600 font-bold flex items-center gap-2 hover:underline group w-fit"
      >
        Read Full Statement 
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </button>
    )}
  </div>
);

/* =========================================
   (Components 2, 3, 4 remain same logic-wise)
========================================= */
const PeerReviewTimeline = ({ steps }) => (
  <div className="bg-[#22c55e] rounded-2xl p-10 text-white shadow-lg">
    <h2 className="text-4xl font-bold mb-12">Peer Review Process</h2>
    <div className="space-y-10 max-w-5xl">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start gap-6">
          <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center font-bold text-xl">{index + 1}</div>
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-2xl font-bold">{step.title}</h3>
              {step.day && <span className="bg-white/20 text-[11px] px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-white/10">{step.day}</span>}
            </div>
            <p className="text-emerald-50 text-[17px] leading-relaxed">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const authorItems = [
    "Manuscript length: 5,000-8,000 words",
    "Format: Double-spaced, 12pt Times New Roman",
    "Use 2.54cm margins on all sides",
    "Section headings: Intro, Methods, Results, Discussion",
  ];

  // This is what shows on the CARD
  const ethicsSummary = [
    "Commitment to high ethical standards and high-quality research",
    "Editors make decisions based solely on scientific quality",
    "Reviewers provide fair, constructive, and timely evaluations",
    "Authors must ensure original work free from plagiarism",
    "Disclosure of potential conflicts of interest is mandatory",
    "Protection of confidentiality for all submitted manuscripts"
  ];

  // This is the FULL TEXT for the Modal
  const FullEthicsText = (
    <div className="space-y-6">
      <p className="font-bold text-lg text-[#78350f]">Publication Ethics and Malpractice Statement</p>
      <p>The publication of scientific research is a responsible and systematic process that requires professionalism and integrity from publishers, editors, reviewers, and authors. MPA Journals is committed to maintaining high ethical standards.</p>
      
      <div className="space-y-2">
        <h4 className="font-bold text-emerald-700 underline">Responsibilities of Editors</h4>
        <p>Editors play a key role in making final decisions based solely on scientific quality, originality, and relevance. Manuscripts are evaluated without discrimination based on race, gender, nationality, or institutional affiliation.</p>
      </div>

      <div className="space-y-2">
        <h4 className="font-bold text-emerald-700 underline">Responsibilities of Reviewers</h4>
        <p>Peer reviewers contribute significantly to quality. They must provide timely evaluations, focus on scientific validity, and keep all manuscript information confidential.</p>
      </div>

      <div className="space-y-2">
        <h4 className="font-bold text-emerald-700 underline">Responsibilities of Authors</h4>
        <p>Authors must ensure work is original. Manuscripts must not be under consideration elsewhere. All sources must be properly acknowledged and conflicts of interest disclosed.</p>
      </div>

      <div className="space-y-2">
        <h4 className="font-bold text-emerald-700 underline">Responsibilities of the Publisher</h4>
        <p>MPA Journals supports editors and maintains transparent practices including conflict management, confidentiality protection, and article corrections.</p>
      </div>
    </div>
  );

  const reviewItems = ["Initial screening (1-2 weeks)", "Peer review (14-21 days)", "Revision period (4 weeks)", "Average total: 8-12 weeks"];
  const citationItems = ["APA 7th edition format", "(Author Year) style", "Alphabetical organization", "Include DOI when available"];
  
  const timelineSteps = [
    { title: "Submission", day: "Day 1-2", desc: "Author submits complete manuscript with all required documents." },
    { title: "Initial Screening", day: "Day 3-7", desc: "Editorial team checks scope, format, and originality." },
    { title: "Reviewer Assignment", day: "Day 8-10", desc: "Suitable peer reviewers are identified and invited." },
    { title: "Peer Review", day: "Day 11-30", desc: "Reviewers provide feedback on methodology and significance." },
    { title: "Editorial Decision", day: "Day 31-35", desc: "Editor evaluates reviews: Accept, Revise, or Reject." },
    { title: "Revision & Resubmission", day: "Day 36-63", desc: "Author revises based on feedback and resubmits." },
    { title: "Final Review", day: "Day 64-75", desc: "Reviewers assess revisions and recommend final decision." },
  ];

  const checklistItems = ["Title page", "Abstract (250-300 words)", "Keywords (5-7 terms)", "Main manuscript", "References in APA format", "Author contributions statement"];

  const quickRefData = [
    { label: "Word Limit", value: "5,000-8,000 words" },
    { label: "Review Timeline", value: "14-21 days" },
    { label: "Citation Format", value: "APA 7th Edition" },
    { label: "File Formats", value: "PDF, DOCX, RTF" }
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

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <GuidelineCard title="Author Guidelines" icon={BookOpen} items={authorItems} hasBorder={true} />
          
          {/* ETHICS CARD WITH READ MORE */}
          <GuidelineCard 
            title="Ethical Considerations" 
            icon={AlertCircle} 
            items={ethicsSummary} 
            onReadMore={() => setIsModalOpen(true)}
          />
          
          <GuidelineCard title="Review Process" icon={CheckCircle2} items={reviewItems} />
          <GuidelineCard title="Citation Format" icon={Award} items={citationItems} hasBorder={true} />
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <PeerReviewTimeline steps={timelineSteps} />
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <DocumentChecklist title="Document Checklist" items={checklistItems} />
          <QuickReference title="Quick Reference" data={quickRefData} />
        </div>
      </div>

      {/* Full Text Modal */}
      <FullTextModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Publication Ethics and Malpractice Statement"
        content={FullEthicsText}
      />
    </div>
  );
};

export default GuidelinesPage;