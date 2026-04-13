"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Upload,
  FileText,
  Clock,
  CheckCircle,
  X,
  FileCheck,
  AlertCircle,
  Lock,
  Plus,
  Trash2,
  User,
  ChevronDown,
  Loader2,
  ShieldCheck,
  Search,
} from "lucide-react";
import { useSubmitManuscriptMutation } from "../store/apiSlice";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";


const Submit = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [submitManuscript, { isLoading }] = useSubmitManuscriptMutation();

  // Basic Form States
  const [formData, setFormData] = useState({
    title: "",
    discipline: "",
    abstract: "",
    keywords: "",
    manuscriptType: ""
  });

  // Dynamic Authors State
  const [authorsList, setAuthorsList] = useState([
    { name: "", email: "", affiliation: "" },
  ]);

  const [files, setFiles] = useState({
    manuscriptFile: null,
    coverLetter: null,
    figures: [],
    tables: null,
    ethicalDeclaration: null,
    aiReport: null,
    manuscriptImage: null,
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
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

  const handleAuthorChange = (index, field, value) => {
    const updatedAuthors = [...authorsList];
    updatedAuthors[index][field] = value;
    setAuthorsList(updatedAuthors);
  };

  const addAuthor = () => {
    if (authorsList.length < 15) {
      setAuthorsList([...authorsList, { name: "", email: "", affiliation: "" }]);
      setTimeout(() => {
        const container = document.getElementById("authors-container");
        if (container) container.scrollTop = container.scrollHeight;
      }, 100);
    } else {
      toast.error("You can only add a maximum of 15 authors.");
    }
  };

  const removeAuthor = (index) => {
    if (authorsList.length > 1) {
      const updatedAuthors = authorsList.filter((_, i) => i !== index);
      setAuthorsList(updatedAuthors);
    }
  };

  const handleFileChange = (e, fileType) => {
    if (fileType === "figures") {
      const newFiles = Array.from(e.target.files);
      const validImages = newFiles.filter(file => file.type.startsWith("image/"));
      if (validImages.length !== newFiles.length) {
        toast.error("Only image files allowed for Figures");
        return;
      }
      setFiles(prev => ({ ...prev, figures: [...prev.figures, ...validImages] }));
      toast.success(`${validImages.length} figures added!`);
      return;
    }
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isDoc = file.type === "application/pdf" || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    if (fileType === "manuscriptImage" || fileType === "figures") {
      if (!isImage) { toast.error("Only image files allowed (JPG, PNG, WEBP)"); return; }
    } else {
      if (!isDoc) { toast.error("Only PDF or Word files allowed"); return; }
    }

    if (file.size > 10 * 1024 * 1024) { toast.error("File must be less than 10MB"); return; }
    setFiles((prev) => ({ ...prev, [fileType]: file }));
    toast.success("File attached!");
  };

  const removeFile = (fileType) => {
    setFiles((prev) => ({ ...prev, [fileType]: fileType === "figures" ? [] : null }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!files.manuscriptFile) { toast.error("Please upload your manuscript file"); return; }

    for (let i = 0; i < authorsList.length; i++) {
      const author = authorsList[i];
      if (!author.name.trim() || !author.email.trim() || !author.affiliation.trim()) {
        toast.error(`Please fill all details for Author ${i + 1}`);
        return;
      }
    }

    const submissionToast = toast.loading("Uploading your research work...");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("discipline", formData.discipline);
      data.append("abstract", formData.abstract);
      data.append("manuscriptType", formData.manuscriptType);
      data.append("keywords", JSON.stringify(formData.keywords.split(",").map((k) => k.trim())));

      const formattedAuthors = authorsList.map((a) => ({
        name: a.name.trim(), email: a.email.trim(), affiliation: a.affiliation.trim(),
      }));
      data.append("authors", JSON.stringify(formattedAuthors));

      if (files.manuscriptFile) data.append("manuscriptFile", files.manuscriptFile);
      if (files.coverLetter) data.append("coverLetter", files.coverLetter);
      if (files.figures.length > 0) files.figures.forEach((f) => data.append("figures", f));
      if (files.tables) data.append("tables", files.tables);
      if (files.ethicalDeclaration) data.append("ethicalDeclaration", files.ethicalDeclaration);
      if (files.aiReport) data.append("aiReport", files.aiReport);
      if (files.manuscriptImage) data.append("manuscriptImage", files.manuscriptImage);

      const res = await submitManuscript(data).unwrap();

      toast.success("Submitted successfully!", { id: submissionToast });
      setIsSubmitted(true);

      // Clear Form
      setFormData({ title: "", discipline: "", abstract: "", keywords: "", manuscriptType: "" });
      setAuthorsList([{ name: "", email: "", affiliation: "" }]);
      setFiles({ manuscriptFile: null, coverLetter: null, figures: [], tables: null, ethicalDeclaration: null, aiReport: null, manuscriptImage: null });
    } catch (err) {
      toast.error(err.data?.message || "Failed to submit.", { id: submissionToast });
    }
  };

  const resetForm = () => setIsSubmitted(false);

  const steps = [
    { icon: <Upload size={24} />, title: "Submit Manuscript", desc: "Upload your research paper in PDF or Word format." },
    { icon: <FileText size={24} />, title: "Initial Review", desc: "Our editorial team checks for scope and format compliance." },
    { icon: <Clock size={24} />, title: "Peer Review", desc: "Your paper is sent to expert reviewers (typically 21 days)." },
    { icon: <CheckCircle size={24} />, title: "Decision", desc: "Receive acceptance, minor revision, or rejection decision." },
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
            Join thousands of researchers publishing their work with MPA Research.
          </p>
        </div>

        <div className="relative mb-20">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-emerald-200 -translate-y-12 z-0"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-50 hover:border-[#10B981] transition-all group">
                <div className="bg-[#10B981] group-hover:scale-110 transition-transform w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white shadow-lg shadow-emerald-100">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-[#713F12] mb-2">{step.title}</h3>
                <p className="text-[#854D0E]/80 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start relative">
          <div className="lg:col-span-7 bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl shadow-emerald-900/5 border border-white min-h-[600px]">
            {isSubmitted ? (
              <div className="text-center py-10">
                <h2 className="text-3xl font-bold text-green-600">
                  Submission Successful 
                </h2>
                <p className="text-gray-600 mt-2">
                  Your manuscript has been submitted successfully.
                </p>

                <button
                  onClick={resetForm}
                  className="mt-6 px-5 py-2 bg-green-500 text-white rounded-lg"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-[#713F12] mb-8 flex items-center gap-3">
                  Submission Details
                </h2>

                {isCheckingAuth ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="animate-spin text-[#10B981]" size={40} />
                    <p className="text-[#854D0E] mt-4">Checking access...</p>
                  </div>
                ) : !isAuthenticated ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center bg-emerald-50/50 rounded-2xl border border-emerald-100">
                    <div className="bg-emerald-100 p-4 rounded-full mb-4"><Lock size={40} className="text-[#10B981]" /></div>
                    <h3 className="text-2xl font-bold text-[#713F12] mb-2">Login Required</h3>
                    <p className="text-[#854D0E] mb-8 max-w-sm">You must be logged in to submit a manuscript.</p>
                    <button onClick={() => router.push("/register")} className="px-6 py-3 bg-[#10B981] text-white font-bold rounded-xl hover:bg-[#059669] shadow-lg shadow-emerald-200">Register / Login</button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-emerald-800 mb-1.5 ml-1">Manuscript Title *</label>
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter the full title" required className="w-full p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:bg-white focus:ring-2 focus:ring-[#10B981] outline-none transition-all" />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-emerald-800 mb-2 ml-1">Manuscript Cover Image</label>
                        <div className="relative border-2 border-dashed border-emerald-200 rounded-2xl p-5 bg-emerald-50/30 hover:border-[#10B981] transition-all">
                          {!files.manuscriptImage ? (
                            <>
                              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "manuscriptImage")} className="absolute inset-0 opacity-0 cursor-pointer" />
                              <div className="flex flex-col items-center justify-center text-center">
                                <div className="bg-white p-3 rounded-full shadow mb-3"><Upload size={22} className="text-[#10B981]" /></div>
                                <p className="text-sm font-semibold text-[#713F12]">Upload Cover Image</p>
                                <p className="text-xs text-[#854D0E] mt-1">JPG, PNG • 16:9 Recommended</p>
                              </div>
                            </>
                          ) : (
                            <div className="relative group">
                              <img src={URL.createObjectURL(files.manuscriptImage)} className="w-full h-56 object-cover rounded-xl" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-xl flex items-center justify-center gap-3">
                                <button type="button" onClick={() => removeFile("manuscriptImage")} className="bg-white text-red-500 px-3 py-1 rounded-lg text-sm">Remove</button>
                                <label className="bg-white text-[#10B981] px-3 py-1 rounded-lg text-sm cursor-pointer">Change<input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "manuscriptImage")} className="hidden" /></label>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-emerald-800 mb-1.5 ml-1">Discipline *</label>
                        <input type="text" name="discipline" value={formData.discipline} onChange={handleInputChange} placeholder="e.g. Computer Science" required className="w-full p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:bg-white focus:ring-2 focus:ring-[#10B981] outline-none transition-all" />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-emerald-800 mb-1.5 ml-1">Submission Type *</label>
                        <div className="relative">
                          <select name="manuscriptType" value={formData.manuscriptType} onChange={handleInputChange} required className="w-full p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:ring-2 focus:ring-[#10B981] outline-none appearance-none transition-all">
                            <option value="">Select manuscript type</option>
                            <option value="Review Article">Review Article</option>
                            <option value="Mini Review">Mini Review</option>
                            <option value="Systematic Review">Systematic Review</option>
                            <option value="Research Article">Research Article</option>
                            <option value="Short Communication">Short Communication</option>
                            <option value="Case Report">Case Report</option>
                            <option value="Editorial">Editorial</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 pointer-events-none" size={20} />
                        </div>
                      </div>

                      <div className="md:col-span-2 mt-2 mb-2 p-5 bg-[#F8FAFC]/80 border border-emerald-100 rounded-2xl shadow-sm">
                        <div className="flex justify-between items-center mb-5">
                          <div>
                            <h3 className="text-xl font-bold text-[#713F12]">Authors Information</h3>
                            <p className="text-xs text-[#854D0E]/70 mt-1">Add up to 15 authors.</p>
                          </div>
                          <span className="text-xs font-bold px-3 py-1.5 bg-emerald-100 text-[#059669] rounded-full">{authorsList.length} / 15</span>
                        </div>
                        <div id="authors-container" className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                          {authorsList.map((author, index) => (
                            <div key={index} className="p-4 rounded-xl border border-emerald-100 bg-white relative group hover:border-[#10B981] transition-all">
                              <div className="flex justify-between items-center mb-4 border-b border-emerald-50 pb-3">
                                <h4 className="font-semibold text-emerald-800 flex items-center gap-2">
                                  <div className="bg-emerald-100 p-1.5 rounded-lg text-[#10B981]"><User size={16} /></div>
                                  Author {index + 1} {index === 0 && <span className="text-[10px] bg-[#10B981] text-white px-2 py-0.5 rounded-md ml-2 tracking-wide">Primary</span>}
                                </h4>
                                {authorsList.length > 1 && <button type="button" onClick={() => removeAuthor(index)} className="text-red-400 hover:text-red-600 flex items-center gap-1 text-sm font-semibold"><Trash2 size={16} /> <span className="hidden sm:inline">Remove</span></button>}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" value={author.name} onChange={(e) => handleAuthorChange(index, "name", e.target.value)} placeholder="Full Name" required className="p-3 text-sm rounded-lg border border-emerald-100 bg-emerald-50/20 focus:ring-2 focus:ring-[#10B981] outline-none" />
                                <input type="email" value={author.email} onChange={(e) => handleAuthorChange(index, "email", e.target.value)} placeholder="Email Address" required className="p-3 text-sm rounded-lg border border-emerald-100 bg-emerald-50/20 focus:ring-2 focus:ring-[#10B981] outline-none" />
                                <input type="text" value={author.affiliation} onChange={(e) => handleAuthorChange(index, "affiliation", e.target.value)} placeholder="Affiliation / Institute" required className="md:col-span-2 p-3 text-sm rounded-lg border border-emerald-100 bg-emerald-50/20 focus:ring-2 focus:ring-[#10B981] outline-none" />
                              </div>
                            </div>
                          ))}
                        </div>
                        {authorsList.length < 15 && <button type="button" onClick={addAuthor} className="mt-5 w-full py-3 border-2 border-dashed border-[#10B981]/50 text-[#059669] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#10B981] hover:text-white transition-all"><Plus size={20} /> Add Author</button>}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-emerald-800 mb-1.5 ml-1">Keywords *</label>
                        <input type="text" name="keywords" value={formData.keywords} onChange={handleInputChange} placeholder="e.g. AI, Machine Learning (comma separated)" required className="w-full p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:bg-white focus:ring-2 focus:ring-[#10B981] outline-none transition-all" />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-emerald-800 mb-1.5 ml-1">Abstract *</label>
                        <textarea name="abstract" value={formData.abstract} onChange={handleInputChange} placeholder="Summarize findings..." required rows={5} className="w-full p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:bg-white focus:ring-2 focus:ring-[#10B981] outline-none resize-none transition-all" />
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-emerald-100 mt-6">
                      <label className="block text-xl font-bold text-[#713F12] ml-1">Manuscript Documents</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                          { id: "manuscriptFile", label: "Manuscript *", sub: "PDF, DOCX" },
                          { id: "coverLetter", label: "Cover Letter", sub: "PDF, DOCX" },
                          { id: "figures", label: "Figures", sub: "Images" },
                          { id: "tables", label: "Tables", sub: "Excel/Word" },
                          { id: "ethicalDeclaration", label: "Ethical Dec.", sub: "PDF" },
                          { id: "aiReport", label: "AI Report", sub: "PDF" },
                        ].map((item) => (
                          <div key={item.id} className={`relative border-2 border-dashed rounded-2xl p-6 transition-all flex flex-col items-center justify-center text-center ${(item.id === "figures" ? files.figures.length > 0 : files[item.id]) ? "border-[#10B981] bg-emerald-50/60" : "border-emerald-200 bg-emerald-50/20 hover:border-[#10B981]"}`}>
                            {item.id === "figures" && files.figures.length > 0 ? (
                              <div className="w-full relative z-20">
                                <div className="grid grid-cols-3 gap-1 mb-3">{files.figures.map((f, i) => (<div key={i} className="aspect-square rounded border overflow-hidden bg-white"><img src={URL.createObjectURL(f)} className="w-full h-full object-cover" /></div>))}</div>
                                <p className="text-[#713F12] text-[10px] font-bold uppercase">{files.figures.length} Figures</p>
                                <div className="flex gap-2 justify-center mt-2">
                                  <label className="cursor-pointer text-[10px] font-bold text-emerald-600">+ Add<input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, "figures")} /></label>
                                  <button type="button" onClick={() => removeFile("figures")} className="text-[10px] font-bold text-red-500">Clear</button>
                                </div>
                              </div>
                            ) : (item.id !== "figures" && files[item.id]) ? (
                              <div className="flex flex-col items-center w-full relative z-20">
                                <FileCheck className="text-[#10B981] mb-2" size={24} />
                                <p className="text-[#713F12] text-xs font-semibold truncate w-full px-2">{files[item.id].name}</p>
                                <button type="button" onClick={() => removeFile(item.id)} className="mt-3 px-3 py-1 bg-white border border-red-200 text-xs text-red-500 rounded-lg shadow-sm hover:bg-red-50">Remove</button>
                              </div>
                            ) : (
                              <>
                                <input type="file" multiple={item.id === "figures"} className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => handleFileChange(e, item.id)} accept={item.id === "figures" ? "image/*" : ".pdf,.docx,.doc"} />
                                <div className="bg-white p-3 rounded-full shadow-sm mb-3"><Upload size={20} className="text-[#10B981]" /></div>
                                <p className="text-[#713F12] text-sm font-semibold">{item.label}</p>
                                <p className="text-[10px] text-[#854D0E] uppercase tracking-wider mt-1">{item.sub}</p>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button type="submit" disabled={isLoading} className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg mt-8 ${isLoading ? "bg-emerald-300 cursor-not-allowed text-white" : "bg-[#10B981] text-white hover:bg-[#059669] active:scale-[0.99]"}`}>
                      {isLoading ? <><Loader2 className="animate-spin" /> Uploading...</> : <><CheckCircle size={22} /> Submit Manuscript</>}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>

          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28 self-start">
            <div className="bg-[#10B981] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform"><FileText size={120} /></div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><AlertCircle size={24} /> Submission Guidelines</h3>
              <ul className="space-y-6 relative z-10">
                <li className="flex gap-4"><div className="w-6 h-6 bg-emerald-400/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1"><div className="w-2 h-2 bg-yellow-300 rounded-full"></div></div><p className="text-emerald-50 leading-relaxed text-sm"><strong>Originality:</strong> Submissions must be original work.</p></li>
                <li className="flex gap-4"><div className="w-6 h-6 bg-emerald-400/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1"><div className="w-2 h-2 bg-yellow-300 rounded-full"></div></div><p className="text-emerald-50 leading-relaxed text-sm"><strong>Format:</strong> Use standard APA format for citations.</p></li>
                <li className="flex gap-4"><div className="w-6 h-6 bg-emerald-400/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1"><div className="w-2 h-2 bg-yellow-300 rounded-full"></div></div><p className="text-emerald-50 leading-relaxed text-sm"><strong>Blind Review:</strong> Do not include author identities in manuscript.</p></li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-emerald-100 shadow-sm">
              <h4 className="text-[#713F12] text-xl font-bold mb-2">Need Help?</h4>
              <p className="text-[#854D0E]/70 text-sm mb-5 leading-relaxed">Facing issues during submission? Our technical team is here to help.</p>
              <a href="mailto:support@mparesearch.com" className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-50 text-[#10B981] font-bold text-sm rounded-xl hover:bg-[#10B981] hover:text-white transition-all">Contact Support →</a>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `.custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #6EE7B7; border-radius: 10px; }` }} />
    </div>
  );
};

export default Submit;