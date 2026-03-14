"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Upload,
  FileText,
  Clock,
  CheckCircle,
  Loader2,
  X,
  FileCheck,
  AlertCircle,
  Lock, 
} from "lucide-react";
import { useSubmitManuscriptMutation } from "../store/apiSlice";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const Submit = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [submitManuscript, { isLoading }] = useSubmitManuscriptMutation();

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    email: "",
    abstract: "",
    keywords: "",
    affiliation: "",
  });

  const [files, setFiles] = useState({
    manuscriptFile: null,
    coverLetter: null,
    figures: null,
    tables: null,
    ethicalDeclaration: null,
    aiReport: null,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsCheckingAuth(false);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF or Word documents are allowed");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setFiles((prev) => ({ ...prev, [fileType]: file }));
    toast.success("File attached successfully!");
  };

  const removeFile = (fileType) => {
    setFiles((prev) => ({ ...prev, [fileType]: null }));

  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!files.manuscriptFile) {
      toast.error("Please upload your manuscript file");
      return;
    }

    const submissionToast = toast.loading("Uploading your research work...");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("abstract", formData.abstract);
      data.append(
        "keywords",
        JSON.stringify(
          formData.keywords.split(",").map((k) => k.trim())
        )
      );

      const authorsArray = formData.authors.split(",").map((name) => ({
        name: name.trim(),
        email: formData.email,
        affiliation: formData.affiliation,
      }));
      data.append("authors", JSON.stringify(authorsArray));
      if (files.manuscriptFile) {
        data.append("manuscriptFile", files.manuscriptFile);
      }
      if (files.coverLetter) {
        data.append("coverLetter", files.coverLetter);
      }
      if (files.figures) {
        data.append("figures", files.figures);
      }
      if (files.tables) {
        data.append("tables", files.tables);
      }
      if (files.ethicalDeclaration) {
        data.append("ethicalDeclaration", files.ethicalDeclaration);
      }
      if (files.aiReport) {
        data.append("aiReport", files.aiReport);
      }

      const res = await submitManuscript(data).unwrap();

      toast.success(`Submitted! ID: ${res.manuscriptId || "Success"}`, {
        id: submissionToast,
        duration: 5000,
      });

      setFormData({
        title: "",
        authors: "",
        email: "",
        abstract: "",
        keywords: "",
        affiliation: "",
      });
      setFiles({
        manuscriptFile: null,
        coverLetter: null,
        figures: null,
        tables: null,
        ethicalDeclaration: null,
        aiReport: null,
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Submission error:", err);
      const errorMessage =
        err.data?.message ||
        err.error ||
        "Failed to submit. Check your connection.";
      toast.error(errorMessage, { id: submissionToast });
    }
  };

  const steps = [
    {
      icon: <Upload size={24} />,
      title: "Submit Manuscript",
      desc: "Upload your research paper in PDF or Word format.",
    },
    {
      icon: <FileText size={24} />,
      title: "Initial Review",
      desc: "Our editorial team checks for scope and format compliance.",
    },
    {
      icon: <Clock size={24} />,
      title: "Peer Review",
      desc: "Your paper is sent to expert reviewers (typically 21 days).",
    },
    {
      icon: <CheckCircle size={24} />,
      title: "Decision",
      desc: "Receive acceptance, minor revision, or rejection decision.",
    },
  ];

  return (
    <div className="bg-[#FFFBEB]/40 min-h-screen py-12 px-4 md:px-8 font-sans scroll-mt-24" id="submit">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#713F12] mb-6 tracking-tight">
            Submit Your <span className="text-[#10B981]">Manuscript</span>
          </h1>
          <p className="text-[#854D0E] text-lg max-w-2xl mx-auto leading-relaxed opacity-90">
            Join thousands of researchers publishing their work with MPA
            Research. High impact, rigorous peer-review, and global reach.
          </p>
        </div>

        <div className="relative mb-20">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-emerald-200 -translate-y-12 z-0"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-50 hover:border-[#10B981] transition-all duration-300 group"
              >
                <div className="bg-[#10B981] group-hover:scale-110 transition-transform w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white shadow-lg shadow-emerald-100">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-[#713F12] mb-2">
                  {step.title}
                </h3>
                <p className="text-[#854D0E]/80 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Main Form Card */}
          <div className="lg:col-span-7 bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl shadow-emerald-900/5 border border-white">
            <h2 className="text-3xl font-bold text-[#713F12] mb-8 flex items-center gap-3">
              Submission Details
            </h2>

            {/* Check Authentication here instead of full page redirect */}
            {isCheckingAuth ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="animate-spin text-[#10B981]" size={40} />
                <p className="text-[#854D0E] mt-4">Checking access...</p>
              </div>
            ) : !isAuthenticated ? (
              // NON-LOGGED IN USER UI
              <div className="flex flex-col items-center justify-center py-12 text-center bg-emerald-50/50 rounded-2xl border border-emerald-100">
                <div className="bg-emerald-100 p-4 rounded-full mb-4">
                  <Lock size={40} className="text-[#10B981]" />
                </div>
                <h3 className="text-2xl font-bold text-[#713F12] mb-2">
                  Login Required
                </h3>
                <p className="text-[#854D0E] mb-8 max-w-sm">
                  You must be logged in to submit a manuscript. Please login or
                  create a new account to continue.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => router.push("/register")}
                    className="px-6 py-3 bg-[#10B981] text-white font-bold rounded-xl hover:bg-[#059669] transition-all shadow-lg shadow-emerald-200"
                  >
                    Register / Login
                  </button>
                </div>
              </div>
            ) : (
              // LOGGED IN USER FORM
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Title - Full Width */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-emerald-800 mb-1.5 ml-1">Manuscript Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter the full title of your manuscript"
                      required
                      className="w-full p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:bg-white focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Authors & Email - Side by Side */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-800 mb-1.5 ml-1">Author(s)</label>
                    <input
                      type="text"
                      name="authors"
                      value={formData.authors}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe, Jane Smith"
                      required
                      className="w-full p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:bg-white focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-800 mb-1.5 ml-1">Contact Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="author@university.edu"
                      required
                      className="w-full p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:bg-white focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Keywords - Full Width */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-emerald-800 mb-1.5 ml-1">Keywords</label>
                    <input
                      type="text"
                      name="keywords"
                      value={formData.keywords}
                      onChange={handleInputChange}
                      placeholder="e.g. AI, Machine Learning, Data Science"
                      required
                      className="w-full p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:bg-white focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Abstract - Changed to Textarea for better UX */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-emerald-800 mb-1.5 ml-1">Abstract</label>
                    <textarea
                      name="abstract"
                      value={formData.abstract}
                      onChange={handleInputChange}
                      placeholder="Summarize your research findings..."
                      required
                      rows={4}
                      className="w-full p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:bg-white focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Affiliations */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-emerald-800 mb-1.5 ml-1">Author Affiliations</label>
                    <textarea
                      name="affiliation"
                      value={formData.affiliation}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe - Department of CS, XYZ University, India"
                      required
                      rows={3}
                      className="w-full p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:bg-white focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition-all resize-none"
                    />
                  </div>

                </div>

                {/* File Upload Section */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-emerald-800 ml-1">Manuscript Documents</label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Dynamic Upload Boxes */}
                    {/* // 1. Update the loop to pass the ID correctly */}
                    {[
                      { id: "manuscriptFile", label: "Manuscript", sub: "PDF, DOCX" },
                      { id: "coverLetter", label: "Cover Letter", sub: "PDF, DOCX" },
                      { id: "figures", label: "Figures", sub: "Images/ZIP" },
                      { id: "tables", label: "Tables", sub: "Excel/Word" },
                      { id: "ethicalDeclaration", label: "Ethical Dec.", sub: "PDF" },
                      { id: "aiReport", label: "AI Report", sub: "PDF" },
                    ].map((item, index) => (
                      <div
                        key={item.id} // Better to use ID as key
                        className={`relative border-2 border-dashed rounded-2xl p-6 transition-all flex flex-col items-center justify-center text-center
      ${files[item.id]
                            ? "border-[#10B981] bg-emerald-50/50"
                            : "border-emerald-200 bg-emerald-50/20 hover:border-[#10B981] hover:bg-emerald-50/40"
                          }`}
                      >
                        {!files[item.id] ? (
                          <>
                            <input
                              type="file"
                              // We use the event target to reset the value instead of one shared ref
                              className="absolute inset-0 opacity-0 cursor-pointer z-10"
                              onChange={(e) => handleFileChange(e, item.id)} // FIXED: Pass item.id here
                              accept=".pdf,.docx,.doc"
                            />
                            <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                              <Upload size={20} className="text-[#10B981]" />
                            </div>
                            <p className="text-[#713F12] text-sm font-semibold">{item.label}</p>
                            <p className="text-[10px] text-[#854D0E] uppercase tracking-wider mt-1">{item.sub}</p>
                          </>
                        ) : (
                          <div className="flex flex-col items-center w-full">
                            <FileCheck className="text-[#10B981] mb-2" size={24} />
                            <p className="text-[#713F12] text-xs font-medium truncate w-full px-2">
                              {files[item.id].name}
                            </p>
                            <button
                              type="button"
                              onClick={() => removeFile(item.id)}
                              className="mt-2 text-xs text-red-500 hover:underline flex items-center gap-1"
                            >
                              <X size={12} /> Remove
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg mt-8
      ${isLoading
                      ? "bg-emerald-300 cursor-not-allowed text-white"
                      : "bg-[#10B981] text-white hover:bg-[#059669] hover:shadow-emerald-200 active:scale-[0.99]"
                    }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" /> Uploading Manuscript...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} /> Submit Manuscript
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Guidelines Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#10B981] p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-200 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                <FileText size={120} />
              </div>

              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <AlertCircle size={24} /> Submission Guidelines
              </h3>

              <ul className="space-y-6 relative z-10">
                <li className="flex gap-4">
                  <div className="w-6 h-6 bg-emerald-400/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                  </div>
                  <p className="text-emerald-50 leading-relaxed text-sm">
                    <strong>Originality:</strong> Submissions must be original
                    work not published elsewhere.
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 bg-emerald-400/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                  </div>
                  <p className="text-emerald-50 leading-relaxed text-sm">
                    <strong>Format:</strong> Use standard APA format for
                    citations and bibliography.
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 bg-emerald-400/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                  </div>
                  <p className="text-emerald-50 leading-relaxed text-sm">
                    <strong>Blind Review:</strong> Ensure the manuscript file
                    does not contain author identities.
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-emerald-100 shadow-sm">
              <h4 className="text-[#713F12] font-bold mb-2">Need Help?</h4>
              <p className="text-[#854D0E]/70 text-sm mb-4">
                Facing issues during submission? Our technical team is here to
                help.
              </p>
              <a
                href="mailto:support@mparesearch.com"
                className="text-[#10B981] font-semibold text-sm hover:underline"
              >
                Contact Support →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submit;
