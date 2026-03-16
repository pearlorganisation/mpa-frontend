"use client";
import React from "react";
import { Bot, Eye, UserX, AlertCircle, Quote } from "lucide-react";

const AiPolicySection = () => {
  return (
    <section className="w-full bg-white py-20 px-6 scroll-mt-24" id="ai-policy">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#DCFCE7] text-[#166534] px-4 py-1.5 rounded-full text-sm font-semibold mb-6 shadow-sm border border-[#BBF7D0]">
            <Bot size={16} className="text-[#22C55E]" />
            Editorial Guidelines
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#713F12] tracking-tight mb-6">
            Authorship and AI Tools
          </h2>
          <div className="w-24 h-1.5 bg-[#22C55E] rounded-full"></div>
        </div>

        {/* Main Introduction Statement */}
        <div className="bg-[#FDF6ED] border-l-4 border-[#22C55E] rounded-r-2xl p-6 md:p-8 mb-10 shadow-sm">
          <div className="flex gap-4">
            <AlertCircle className="text-[#22C55E] shrink-0 mt-1" size={28} />
            <p className="text-[#854D0E] text-[17px] md:text-lg leading-relaxed font-medium">
              MPA Journals recognizes that there are a myriad of AI tools
              available, and our policy is designed to guide their responsible use
              while maintaining the integrity and excellence of scientific
              publishing in this journal. Authors using AI tools should use them
              transparently and ethically, in accordance with the Ethical Guidelines
              to Publication of Research and following the best practices and
              policies detailed below. Authors are responsible for all submitted
              content including the accuracy of AI-generated content as well as
              referencing associated material as appropriate.
            </p>
          </div>
        </div>

        {/* Policy Grid Details */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Transparency Card */}
          <div className="bg-white border border-green-100 hover:border-[#86EFAC] rounded-3xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 group relative overflow-hidden">
            {/* Background decorative blob */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#DCFCE7] rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-[#FDF6ED] rounded-2xl flex items-center justify-center text-[#d97706] mb-6 shadow-sm border border-[#F2E8DA]">
                <Eye size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#713F12] mb-4">
                Transparency
              </h3>
              <p className="text-[#854D0E] leading-relaxed mb-5">
                All use of AI tools should be disclosed within the submission. As
                stated in each journal&apos;s Author Guidelines:
              </p>
              
              {/* Blockquote for Author Guidelines */}
              <div className="relative bg-gray-50 rounded-xl p-5 border border-gray-100 italic text-gray-700 text-sm leading-relaxed">
                <Quote size={20} className="absolute text-gray-200 -top-2 -left-2 bg-white" />
                &quot;The use of AI tools for text or image generation should be
                disclosed in the manuscript within the Acknowledgment section with a
                description of when and how the tools were used. For more
                substantial use cases or descriptions of AI tool use, authors should
                provide full details within the Methods or other appropriate section
                of the manuscript.&quot;
              </div>
            </div>
          </div>

          {/* Authorship Card */}
          <div className="bg-white border border-green-100 hover:border-[#86EFAC] rounded-3xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 group relative overflow-hidden">
            {/* Background decorative blob */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#DCFCE7] rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>

            <div className="relative z-10">
              <div className="w-14 h-14 bg-[#FDF6ED] rounded-2xl flex items-center justify-center text-[#d97706] mb-6 shadow-sm border border-[#F2E8DA]">
                <UserX size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#713F12] mb-4">
                Authorship
              </h3>
              <p className="text-[#854D0E] leading-relaxed text-[17px]">
                AI tools cannot meet the requirements for authorship as they cannot
                take responsibility and accountability for the published work. As
                such, AI tools <strong className="text-red-600 font-semibold">should not be included</strong> in the
                authorship list. 
                <br /><br />
                Instead, AI tools should be acknowledged and
                mentioned transparently (as described in the Transparency
                guidelines).
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AiPolicySection;