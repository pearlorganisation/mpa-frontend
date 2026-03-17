"use client";
import React from "react";
import { useGetEditorialsQuery } from "../store/apiSlice";
import { Linkedin, Mail, ExternalLink } from "lucide-react";

const EditorialBoard = () => {
  // 1. Fetch data using RTK Query
  const { data: response, isLoading, isError } = useGetEditorialsQuery();

  // Extract the array of data from the API response
  const editorials = response?.data || [];

  // 2. Separate Top Leaders and Regular Editors based on the type
  // Fallback: If 'type' is somehow missing but 'bio' exists, we consider them Top Leaders
  const executiveEditors = editorials
    .filter((item) => item.type === "topLeader" || (!item.type && item.bio))
    .sort((a, b) => {
      const order = {
        "Chief Editor": 1,
        "Editor In-Chief": 2,
      };

      return (order[a.role] || 99) - (order[b.role] || 99);
    });

  // Filter regular editors who have type === "editor"
  const editorialBoard = editorials.filter((item) => item.type === "editor");

  // Helper function to extract initials if they are not provided by the backend
  const getInitials = (name, initials) => {
    if (initials) return initials;
    if (!name) return "ED";
    // Remove titles like Dr. or Prof. before getting initials
    const cleanName = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/i, "");
    const parts = cleanName.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return cleanName.substring(0, 2).toUpperCase();
  };

  // Show a loading screen while the API fetches data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFF9F2] flex items-center justify-center">
        <p className="text-xl text-[#7A3E00] font-bold animate-pulse">
          Loading Editorial Board...
        </p>
      </div>
    );
  }

  // Show an error message if the API call fails
  if (isError) {
    return (
      <div className="min-h-screen bg-[#FFF9F2] flex items-center justify-center">
        <p className="text-xl text-red-500 font-bold">
          Failed to load Editorial Board data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F2] pb-12 scroll-mt-24" id="editorial-board">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl md:text-5xl font-bold text-[#7A3E00] mb-4 text-center">
          Editorial Board
        </h2>
        <p className="text-center text-[#A75C1C] mb-16 max-w-3xl mx-auto text-lg">
          Our distinguished team of leading researchers ensures rigorous peer review and scientific excellence.
        </p>

        {/* ✅ Chief Editor & Editor In-Chief Section (Top Leaders Layout) */}
        {executiveEditors.length > 0 && (
          <div className="space-y-10 mb-20">
            {executiveEditors.map((leader) => (
              <div
                key={leader._id}
                className="bg-white rounded-2xl shadow-lg border border-transparent hover:border-[#10B981] transition-all duration-500 overflow-hidden flex flex-col md:flex-row"
              >
                {/* Profile Image Section */}
                <div className="md:w-1/4 bg-gray-100 flex items-center justify-center p-10 border-b md:border-b-0 md:border-r border-gray-100">
                  <div className="relative w-64 h-64 md:w-full md:h-80 overflow-hidden rounded-xl shadow-inner border-4 border-white">
                    <img
                      src={leader.image || "https://via.placeholder.com/400x500?text=No+Image"}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x500?text=Profile+Image" }}
                    />
                  </div>
                </div>

                {/* Bio Content Section */}
                <div className="md:w-2/3 p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="inline-block px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold mb-2 uppercase tracking-wider">
                      {leader.role}
                    </span>
                    <h3 className="text-3xl font-extrabold text-[#7A3E00] leading-tight">
                      {leader.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-6 text-justify">
                    {leader.bio}
                  </p>

                  {/* Buttons & Links */}
                  <div className="flex gap-4">
                    <a
                      href={`mailto:${leader.email}`}
                      className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-md"
                    >
                      <Mail size={18} /> Contact
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅Grid Section for Regular Editors */}
        {editorialBoard.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {editorialBoard.map((member) => (
              <div
                key={member._id}
                className="bg-[#FFFDF9] rounded-xl shadow-md border border-transparent hover:border-green-500 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Green Header Card with Initials */}
                <div className="bg-[#10B981] h-20 relative flex justify-center items-end">
                  <div className="translate-y-1/2 w-16 h-16 bg-[#4ade80] rounded-full flex items-center justify-center border-4 border-[#FFFDF9] shadow-sm">
                    <span className="text-white text-xl font-bold">
                      {getInitials(member.name, member.initials)}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 pt-10 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-[#7A3E00] mb-1 text-center">
                    {member.name}
                  </h3>
                  <p className="text-[#10B981] font-bold text-xs text-center mb-4 uppercase tracking-tighter">
                    {member.role}
                  </p>

                  <div className="space-y-3 mb-6 text-sm text-gray-600 flex-1">
                    <p>
                      <span className="font-semibold text-[#8B4513]">Institution:</span><br />
                      {member.institution || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold text-[#8B4513]">Interests:</span><br />
                      {member.interests || "N/A"}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-auto">
                    {/* View Profile Link */}
                    <a
                      href={member.profileLink && member.profileLink !== "#" ? member.profileLink : "#"}
                      target={member.profileLink && member.profileLink !== "#" ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-semibold py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-transparent"
                    >
                      <ExternalLink size={16} />
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Stats Section (Unchanged) */}
        {/* <div className="mt-20 bg-[#10B981] rounded-2xl p-8 md:p-12 text-white shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-green-400/30">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-green-50 font-medium text-sm md:text-base">Peer Reviewers Worldwide</div>
            </div>
            <div className="pt-8 md:pt-0">
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-green-50 font-medium text-sm md:text-base">Research Disciplines</div>
            </div>
            <div className="pt-8 md:pt-0">
              <div className="text-4xl font-bold mb-2">120+</div>
              <div className="text-green-50 font-medium text-sm md:text-base">Countries Represented</div>
            </div>
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default EditorialBoard;