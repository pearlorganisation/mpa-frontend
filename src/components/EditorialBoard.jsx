import React from "react";
import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";

const editorialBoard = [
  {
    name: "Prof. Dr. Sarah Anderson",
    role: "Editor-in-Chief",
    specialty: "Quantum Computing",
    institution: "MIT",
    initials: "SA",
    email: "sarah@example.com",
    linkedin: "#",
  },
  {
    name: "Prof. Dr. Michael Zhang",
    role: "Deputy Editor",
    specialty: "Biotechnology",
    institution: "Cambridge University",
    initials: "MZ",
    email: "michael@example.com",
    linkedin: "#",
  },
  {
    name: "Prof. Dr. Emma Martinez",
    role: "Associate Editor - Physics",
    specialty: "Materials Science",
    institution: "Stanford University",
    initials: "EM",
    email: "emma@example.com",
    linkedin: "#",
  },
  {
    name: "Prof. Dr. James Wilson",
    role: "Associate Editor - Chemistry",
    specialty: "Organic Chemistry",
    institution: "Oxford University",
    initials: "JW",
    email: "james@example.com",
    linkedin: "#",
  },
  {


    name: "Prof. Dr. Priya Sharma",
    role: "Associate Editor - Medicine",
    specialty: "Medical Imaging",
    institution: "Harvard Medical School",
    initials: "PS",
    email: "priya@example.com",
    linkedin: "#",
  },
  {
    name: "Prof. Dr. David Lee",
    role: "Associate Editor - Engineering",
    specialty: "Renewable Energy",
    institution: "Berkeley",
    initials: "DL",
    email: "david@example.com",
    linkedin: "#",
  },
];

const EditorialBoard = () => {
  return (
    <div className="min-h-screen bg-[#FFF9F2] pb-12" id="editorial-board">

      {/* ✅ Page Content */}
      <section className="max-w-7xl mx-auto px-6 py-18">
        <h2 className="text-3xl md:text-4xl font-bold text-[#7A3E00] mb-4 text-center">
          Editorial Board
        </h2>

        <p className="text-center text-[#A75C1C] mb-12 max-w-2xl mx-auto">
          Our distinguished team of leading researchers ensures rigorous peer review and scientific excellence.
        </p>

        {/* ✅ Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {editorialBoard.map((member, index) => (
            <div
              key={index}
              className="bg-[#FFFDF9] rounded-xl shadow-md border border-transparent hover:border-green-500 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Green Header */}
              <div className="bg-[#10B981] h-24 relative flex justify-center items-end">
                <div className="translate-y-1/2 w-16 h-16 bg-[#4ade80] rounded-full flex items-center justify-center border-4 border-[#FFFDF9] shadow-sm">
                  <span className="text-white text-xl font-bold">
                    {member.initials}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 pt-10 flex-1 flex flex-col text-center md:text-left">
                <h3 className="text-lg font-bold text-[#7A3E00] mb-1">
                  {member.name}
                </h3>

                <p className="text-[#10B981] font-medium text-sm mb-4">
                  {member.role}
                </p>

                <div className="space-y-2 mb-6 text-sm text-gray-600 flex-1">
                  <p>
                    <span className="font-semibold text-[#8B4513]">
                      Specialty:
                    </span>{" "}
                    {member.specialty}
                  </p>
                  <p>
                    <span className="font-semibold text-[#8B4513]">
                      Institution:
                    </span>{" "}
                    {member.institution}
                  </p>
                </div>

                {/* ✅ Buttons with Hover Green Border */}
                <div className="flex gap-3 mt-auto">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-semibold py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-transparent hover:border-green-600"
                  >
                    <Mail size={16} />
                    Contact
                  </a>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-lg text-gray-600 hover:border-green-500 hover:text-green-600 transition-all duration-300"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Stats Section */}
        <div className="mt-20 bg-[#10B981] rounded-2xl p-8 md:p-12 text-white shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-green-400/30">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-green-50 font-medium">
                Peer Reviewers Worldwide
              </div>
            </div>
            <div className="pt-8 md:pt-0">
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-green-50 font-medium">
                Research Disciplines
              </div>
            </div>
            <div className="pt-8 md:pt-0">
              <div className="text-4xl font-bold mb-2">120+</div>
              <div className="text-green-50 font-medium">
                Countries Represented
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditorialBoard;
