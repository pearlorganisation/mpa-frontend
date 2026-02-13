import React from "react";
import { Upload, FileText, Clock, CheckCircle } from "lucide-react";

const Submit = () => {
  const steps = [
    {
      icon: <Upload size={24} className="text-white" />,
      title: "Submit Manuscript",
      desc: "Upload your research paper in PDF or Word format.",
    },
    {
      icon: <FileText size={24} className="text-white" />,
      title: "Initial Review",
      desc: "Our editorial team checks for scope and format compliance.",
    },
    {
      icon: <Clock size={24} className="text-white" />,
      title: "Peer Review",
      desc: "Your paper is sent to expert reviewers (typically 21 days).",
    },
    {
      icon: <CheckCircle size={24} className="text-white" />,
      title: "Decision",
      desc: "Receive acceptance, minor revision, or rejection decision.",
    },
  ];

  return (
    <div className="bg-[#FFFBEB]/30 min-h-screen py-16 px-6 font-sans" id="submit">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#713F12] mb-4 flex items-center justify-center gap-3">
            <span className=" h-10 inline-block mr-2"></span>
            Submit Your Manuscript
          </h1>
          <p className="text-[#854D0E] text-lg max-w-3xl mx-auto leading-relaxed">
            Join thousands of researchers publishing their work with MPA
            Research. Our streamlined submission process ensures your work
            reaches the right audience.
          </p>
        </div>

        {/* Process Flow Steps */}
        <div className="relative mb-24">
          {/* Connecting Line (Hidden on mobile) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-[#6EE7B7] -translate-y-12 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-50 hover:shadow-md transition-shadow"
              >
                <div className="bg-[#10B981] w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-[#713F12] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#854D0E] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content: Form and Sidebar */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Submission Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-emerald-50">
            <h2 className="text-3xl font-bold text-[#713F12] mb-8">
              Submission Form
            </h2>

            <form className="space-y-6">
              <div>
                <label className="block text-[#713F12] font-bold mb-2">
                  Manuscript Title
                </label>
                <input
                  type="text"
                  placeholder="Enter manuscript title"
                  className="w-full p-4 rounded-xl border border-[#6EE7B7] focus:outline-none focus:ring-2 focus:ring-[#10B981] placeholder-[#B45309]/50"
                />
              </div>

              <div>
                <label className="block text-[#713F12] font-bold mb-2">
                  Authors
                </label>
                <input
                  type="text"
                  placeholder="List all authors (comma-separated)"
                  className="w-full p-4 rounded-xl border border-[#6EE7B7] focus:outline-none focus:ring-2 focus:ring-[#10B981] placeholder-[#B45309]/50"
                />
              </div>

              <div>
                <label className="block text-[#713F12] font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Corresponding author email"
                  className="w-full p-4 rounded-xl border border-[#6EE7B7] focus:outline-none focus:ring-2 focus:ring-[#10B981] placeholder-[#B45309]/50"
                />
              </div>

              <div>
                <label className="block text-[#713F12] font-bold mb-2">
                  Research Category
                </label>
                <select className="w-full p-4 rounded-xl border border-[#6EE7B7] focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-white text-[#B45309]">
                  <option>Select a category</option>
                  <option>Physics</option>
                  <option>Biology</option>
                  <option>Chemistry</option>
                </select>
              </div>

              <div>
                <label className="block text-[#713F12] font-bold mb-2">
                  Upload Manuscript
                </label>
                <div className="border-2 border-dashed border-[#6EE7B7] rounded-2xl p-10 flex flex-col items-center justify-center bg-emerald-50/20 cursor-pointer hover:bg-emerald-50 transition-colors">
                  <Upload size={40} className="text-[#10B981] mb-4" />
                  <p className="text-[#713F12] font-bold text-lg">
                    Drag and drop or click to upload
                  </p>
                  <p className="text-[#854D0E] text-sm mt-1">
                    PDF or Word format, max 50MB
                  </p>
                </div>
              </div>

              <button className="w-full bg-[#10B981] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#059669] transition-all shadow-lg shadow-green-100">
                Submit Manuscript
              </button>
            </form>
          </div>

          {/* Right Sidebar: Guidelines and Dates */}
          <div className="lg:col-span-5 space-y-8">
            {/* Guidelines Box */}
            <div className="bg-[#10B981] p-8 rounded-[2rem] text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Submission Guidelines</h3>
              <ul className="space-y-5">
                {[
                  "Manuscripts should be original and not previously published",
                  "Format: Double-spaced, Times New Roman, 12pt",
                  "Include abstract (250-300 words) and keywords",
                  "References in APA format",
                  "Maximum 8000 words (excluding references)",
                  "Include author affiliations and contact information",
                ].map((text, i) => (
                  <li key={i} className="flex gap-3 leading-relaxed">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-white/95 font-medium">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Dates Box */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-emerald-50">
              <h3 className="text-2xl font-bold text-[#713F12] mb-6">
                Important Dates
              </h3>
              <div className="space-y-6">
                {[
                  { label: "Submission Deadline", date: "March 31, 2026" },
                  { label: "First Review", date: "April 21, 2026" },
                  { label: "Revision Deadline", date: "May 30, 2026" },
                  { label: "Publication Date", date: "June 30, 2026" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b border-emerald-50 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-[#854D0E] font-semibold">
                      {item.label}
                    </span>
                    <span className="text-[#10B981] font-bold">
                      {item.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submit;
