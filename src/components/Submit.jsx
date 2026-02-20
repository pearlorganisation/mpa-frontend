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
  AlertCircle 
} from "lucide-react";
import { useSubmitManuscriptMutation } from "../store/apiSlice";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast"; // Premium toast notifications

const Submit = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [submitManuscript, { isLoading }] = useSubmitManuscriptMutation();

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    email: "",
    abstract: "Scientific research abstract...",//Default Values
    keywords: "Research, MPA, Science", //Default Values       
  });

  const [manuscriptFile, setManuscriptFile] = useState(null);

  // Check authentication on mount
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/register");
    }
  }, [router]);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection with validation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate File Type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];
    
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF or Word documents are allowed");
      return;
    }

    // Validate File Size (Max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setManuscriptFile(file);
    toast.success("File attached successfully!");
  };

  const removeFile = () => {
    setManuscriptFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Main Submit Logic
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // 1. Basic Client-side Validation
    if (!manuscriptFile) {
      toast.error("Please upload your manuscript file");
      return;
    }

    const submissionToast = toast.loading("Uploading your research work...");

    try {
      // 2. Prepare Multipart Form Data
      const data = new FormData();
      data.append("title", formData.title);
      data.append("abstract", formData.abstract);
      data.append("keywords", formData.keywords);

      // 3. Format authors string into array for backend
      const authorsArray = formData.authors.split(",").map((name) => ({
        name: name.trim(),
        email: formData.email,
        affiliation: "MPA Affiliated",
      }));
      data.append("authors", JSON.stringify(authorsArray));

      // 4. Append File
      data.append("manuscriptFile", manuscriptFile);

      // 5. Trigger API Call
      const res = await submitManuscript(data).unwrap();

      // Success Feedback
      toast.success(`Submitted! ID: ${res.manuscriptId || "Success"}`, {
        id: submissionToast,
        duration: 5000,
      });

      // Clear form after success
      setFormData({
        title: "",
        authors: "",
        email: "",
        abstract: "",
        keywords: "",
      });
      setManuscriptFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

    } catch (err) {
      console.error("Submission error:", err);
      // Detailed Error Handling
      const errorMessage = err.data?.message || err.error || "Failed to submit. Check your connection.";
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
    <div className="bg-[#FFFBEB]/40 min-h-screen py-12 px-4 md:px-8 font-sans" id="submit">
      {/* Toast Provider */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#713F12] mb-6 tracking-tight">
            Submit Your <span className="text-[#10B981]">Manuscript</span>
          </h1>
          <p className="text-[#854D0E] text-lg max-w-2xl mx-auto leading-relaxed opacity-90">
            Join thousands of researchers publishing their work with MPA Research. 
            High impact, rigorous peer-review, and global reach.
          </p>
        </div>

        {/* Responsive Process Flow */}
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
                <h3 className="text-xl font-bold text-[#713F12] mb-2">{step.title}</h3>
                <p className="text-[#854D0E]/80 text-sm leading-relaxed">{step.desc}</p>
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

            <form className="space-y-5" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 gap-5">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Full Manuscript Title"
                  required
                  className="w-full p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:bg-white focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition-all"
                />
                
                <input
                  type="text"
                  name="authors"
                  value={formData.authors}
                  onChange={handleInputChange}
                  placeholder="Authors (e.g. John Doe, Jane Smith)"
                  required
                  className="w-full p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:bg-white focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition-all"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Corresponding Email Address"
                  required
                  className="w-full p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:bg-white focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Upload Area */}
              <div 
                className={`relative border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center 
                  ${manuscriptFile 
                    ? "border-[#10B981] bg-emerald-50" 
                    : "border-emerald-200 bg-emerald-50/20 hover:bg-emerald-50/40"
                  }`}
              >
                {!manuscriptFile ? (
                  <>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                      accept=".pdf,.docx,.doc"
                    />
                    <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                      <Upload size={32} className="text-[#10B981]" />
                    </div>
                    <p className="text-[#713F12] font-semibold text-center">
                      Click or drag manuscript here
                    </p>
                    <p className="text-xs text-[#854D0E] mt-2">
                      Accepted formats: PDF, DOCX (Max 10MB)
                    </p>
                  </>
                ) : (
                  <div className="flex items-center justify-between w-full bg-white p-4 rounded-xl border border-emerald-100">
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-100 p-2 rounded-lg">
                        <FileCheck className="text-[#10B981]" size={24} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[#713F12] font-medium truncate max-w-[200px] md:max-w-sm">
                          {manuscriptFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(manuscriptFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg 
                  ${isLoading 
                    ? "bg-emerald-300 cursor-not-allowed text-white" 
                    : "bg-[#10B981] text-white hover:bg-[#059669] hover:shadow-emerald-200 active:scale-[0.98]"
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
                    <strong>Originality:</strong> Submissions must be original work not published elsewhere.
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 bg-emerald-400/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                  </div>
                  <p className="text-emerald-50 leading-relaxed text-sm">
                    <strong>Format:</strong> Use standard APA format for citations and bibliography.
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 bg-emerald-400/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                  </div>
                  <p className="text-emerald-50 leading-relaxed text-sm">
                    <strong>Blind Review:</strong> Ensure the manuscript file does not contain author identities.
                  </p>
                </li>
              </ul>
            </div>

            {/* Support Card */}
            <div className="bg-white p-8 rounded-[2rem] border border-emerald-100 shadow-sm">
              <h4 className="text-[#713F12] font-bold mb-2">Need Help?</h4>
              <p className="text-[#854D0E]/70 text-sm mb-4">
                Facing issues during submission? Our technical team is here to help.
              </p>
              <a href="mailto:support@mparesearch.com" className="text-[#10B981] font-semibold text-sm hover:underline">
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