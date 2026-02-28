import React from 'react';
import { 
  User, 
  Mail, 
  MapPin, 
  BookOpen, 
  Award, 
  BarChart3, 
  Globe, 
  ExternalLink,
  Edit3,
  FileText
} from 'lucide-react';

const ResearcherProfile = () => {
  // Mock Data
  const researcher = {
    name: "Dr. Alexander Rivers",
    title: "Senior Researcher in Environmental Science",
    institution: "Global Institute of Sustainable Engineering",
    location: "Stockholm, Sweden",
    email: "a.rivers@gise-edu.org",
    bio: "Dedicated to advancing the understanding of renewable energy systems and their impact on urban ecosystems. With over 15 years of experience in multidisciplinary research, I focus on bridging the gap between engineering and social policy.",
    stats: [
      { label: "Publications", value: "42", icon: <FileText className="text-[#10B981]" /> },
      { label: "Citations", value: "1,284", icon: <BarChart3 className="text-[#10B981]" /> },
      { label: "H-Index", value: "18", icon: <Award className="text-[#10B981]" /> },
      { label: "Reviews", value: "24", icon: <BookOpen className="text-[#10B981]" /> },
    ],
    interests: ["Renewable Energy", "Urban Ecology", "Climate Policy", "Sustainability"],
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-8">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#5D3A1A]">Researcher Profile</h1>
            <p className="text-gray-500">Manage your academic identity and impact.</p>
          </div>
          <button className="flex items-center gap-2 bg-[#10B981] text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all">
            <Edit3 size={18} />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Personal Info Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-orange-50 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-[#FDFBF2] shadow-xl overflow-hidden">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-1 right-1 bg-[#10B981] p-2 rounded-full text-white border-4 border-white">
                  <Award size={16} />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-[#5D3A1A]">{researcher.name}</h2>
              <p className="text-[#10B981] font-semibold text-sm mb-4">{researcher.title}</p>
              
              <div className="w-full space-y-3 mt-4 text-left border-t border-gray-50 pt-6">
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <MapPin size={18} className="text-[#5D3A1A]/40" />
                  <span>{researcher.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <Mail size={18} className="text-[#5D3A1A]/40" />
                  <span>{researcher.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <Globe size={18} className="text-[#5D3A1A]/40" />
                  <span className="text-[#10B981] cursor-pointer hover:underline">ORCID ID: 0000-0002-1234</span>
                </div>
              </div>
            </div>

            {/* Research Interests */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-orange-50">
              <h3 className="text-lg font-bold text-[#5D3A1A] mb-4">Research Interests</h3>
              <div className="flex flex-wrap gap-2">
                {researcher.interests.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-orange-50 text-[#5D3A1A] text-xs font-bold rounded-full border border-orange-100">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Stats and Bio */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Stats Grid - Mirroring the style of the homepage cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {researcher.stats.map((stat, idx) => (
                <div key={idx} className="bg-[#FFFDF5] p-6 rounded-2xl border border-orange-100 flex flex-col items-center text-center">
                  <div className="p-3 bg-white rounded-xl shadow-sm mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-[#5D3A1A]">{stat.value}</div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* About / Bio */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-orange-50">
              <h3 className="text-xl font-bold text-[#5D3A1A] mb-4 flex items-center gap-2">
                <User className="text-[#10B981]" size={20} />
                About Researcher
              </h3>
              <p className="text-gray-600 leading-relaxed italic">
                "{researcher.bio}"
              </p>
            </div>

            {/* Recent Publications Preview */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-orange-50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[#5D3A1A]">Recent Publications</h3>
                <button className="text-[#10B981] text-sm font-bold flex items-center gap-1 hover:underline">
                  View All <ExternalLink size={14} />
                </button>
              </div>
              
              <div className="space-y-4">
                {[1, 2].map((item) => (
                  <div key={item} className="p-4 rounded-xl border border-gray-50 bg-[#FDFBF7]/50 hover:border-emerald-100 transition-colors cursor-pointer group">
                    <h4 className="font-bold text-[#5D3A1A] group-hover:text-[#10B981] transition-colors mb-1">
                      Sustainability in Urban Architecture: A 2024 Case Study
                    </h4>
                    <p className="text-xs text-gray-500 mb-2">MPA Research Journal • Published June 2024</p>
                    <div className="flex gap-4">
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">PEER REVIEWED</span>
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">OPEN ACCESS</span>
                    </div>
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

export default ResearcherProfile;