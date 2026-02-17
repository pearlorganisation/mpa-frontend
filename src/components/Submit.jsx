"use client"; // Mandatory for Next.js Client Side hooks
import React, { useEffect, useState } from "react";
import { Upload, FileText, Clock, CheckCircle, Loader2 } from "lucide-react";
import { useSubmitManuscriptMutation } from "../store/apiSlice";
import { useRouter } from "next/navigation";

const Submit = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to submit a manuscript");
      router.push("/register");
    }
  }, []);
  const [submitManuscript, { isLoading }] = useSubmitManuscriptMutation();

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    authors: "", 
    email: "",
    abstract: "Scientific research abstract...",
    keywords: "Research, MPA, Science",
  });

  const [manuscriptFile, setManuscriptFile] = useState(null);

  // Function to handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Main Submit Logic
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!manuscriptFile) return alert("Please upload a manuscript file");

    try {
      // 1. Prepare Multipart Form Data
      const data = new FormData();
      data.append("title", formData.title);
      data.append("abstract", formData.abstract);
      data.append("keywords", formData.keywords);

      // 2. Format authors string into array for backend
      const authorsArray = formData.authors.split(",").map((name) => ({
        name: name.trim(),
        email: formData.email,
        affiliation: "MPA Affiliated",
      }));
      data.append("authors", JSON.stringify(authorsArray));

      // 3. Append Files (Names must match backend upload.fields keys)
      data.append("manuscriptFile", manuscriptFile);

      // 4. Trigger API Call
      const res = await submitManuscript(data).unwrap();

      alert(`Manuscript submitted successfully! ID: ${res.manuscriptId}`);

      // Clear form after success
      setFormData({
        title: "",
        authors: "",
        email: "",
        abstract: "",
        keywords: "",
      });
      setManuscriptFile(null);
    } catch (err) {
      console.error("Submission error:", err);
      alert(
        err.data?.message ||
          "Failed to submit. Please ensure you are logged in.",
      );
    }
  };

  // Step flow data
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
    <div
      className="bg-[#FFFBEB]/30 min-h-screen py-16 px-6 font-sans"
      id="submit"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#713F12] mb-4">
            Submit Your Manuscript
          </h1>
          <p className="text-[#854D0E] text-lg max-w-3xl mx-auto leading-relaxed">
            Join thousands of researchers publishing their work with MPA
            Research.
          </p>
        </div>

        {/* Process Flow */}
        <div className="relative mb-24">
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

        {/* Form and Guidelines */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-emerald-50">
            <h2 className="text-3xl font-bold text-[#713F12] mb-8">
              Submission Form
            </h2>

            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Manuscript Title"
                required
                className="w-full p-4 rounded-xl border border-[#6EE7B7] focus:ring-2 focus:ring-[#10B981] outline-none"
              />
              <input
                type="text"
                name="authors"
                value={formData.authors}
                onChange={handleInputChange}
                placeholder="Authors (comma-separated)"
                required
                className="w-full p-4 rounded-xl border border-[#6EE7B7] focus:ring-2 focus:ring-[#10B981] outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Contact Email"
                required
                className="w-full p-4 rounded-xl border border-[#6EE7B7] focus:ring-2 focus:ring-[#10B981] outline-none"
              />

              <div className="relative border-2 border-dashed border-[#6EE7B7] rounded-2xl p-10 flex flex-col items-center justify-center bg-emerald-50/20 cursor-pointer">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => setManuscriptFile(e.target.files[0])}
                  accept=".pdf,.docx"
                />
                <Upload size={40} className="text-[#10B981] mb-4" />
                <p className="text-[#713F12] font-bold">
                  {manuscriptFile
                    ? manuscriptFile.name
                    : "Drag and drop or click to upload PDF/Word"}
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#10B981] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#059669] transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" /> Submitting...
                  </>
                ) : (
                  "Submit Manuscript"
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#10B981] p-8 rounded-[2rem] text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Submission Guidelines</h3>
              <ul className="space-y-5">
                <li className="flex gap-3 leading-relaxed">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Include original research data only.</span>
                </li>
                <li className="flex gap-3 leading-relaxed">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>References must be in APA format.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submit;
