import React from 'react';
import { 
  User as UserIcon, 
  Mail, 
  MapPin, 
  BookOpen, 
  Award, 
  BarChart3, 
  Globe, 
  ExternalLink,
  Edit3,
  FileText,
  Loader2,
  Link
} from 'lucide-react';
// 1. Import the hooks from your apiSlice
import { useGetMeQuery, useGetMySubmissionsQuery } from '@/store/apiSlice';

const ResearcherProfile = () => {
  // 2. Fetch Data from API
  const { data: userData, isLoading: isUserLoading, error: userError } = useGetMeQuery();
  const { data: subData, isLoading: isSubLoading } = useGetMySubmissionsQuery();

  const user = userData?.user;
  const submissions = subData?.submissions || [];

  // 3. Handle Loading State
  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <Loader2 className="animate-spin text-[#10B981]" size={48} />
      </div>
    );
  }

  // 4. Handle Unauthenticated or Error State
  if (userError || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#5D3A1A]">Session Expired</h2>
          <p className="text-gray-500">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  // Formatting stats dynamically based on API data
  const stats = [
    { label: "Submissions", value: submissions.length, icon: <FileText className="text-[#10B981]" /> },
    { label: "Role", value: user.role?.toUpperCase(), icon: <Award className="text-[#10B981]" /> },
    { label: "Status", value: user.isVerified ? "Verified" : "Pending", icon: <BookOpen className="text-[#10B981]" /> },
    { label: "Citations", value: "0", icon: <BarChart3 className="text-[#10B981]" /> }, // Placeholder
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#5D3A1A]">Researcher Profile</h1>
            <p className="text-gray-500">Welcome back, {user.name}.</p>
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
                <div className="w-32 h-32 rounded-full border-4 border-[#FDFBF2] shadow-xl overflow-hidden bg-emerald-50 flex items-center justify-center">
                  {/* Dynamic Avatar using DiceBear with User Name */}
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {user.isVerified && (
                  <div className="absolute bottom-1 right-1 bg-[#10B981] p-2 rounded-full text-white border-4 border-white">
                    <Award size={16} />
                  </div>
                )}
              </div>
              
              <h2 className="text-2xl font-bold text-[#5D3A1A]">{user.name}</h2>
              <p className="text-[#10B981] font-semibold text-sm mb-4 capitalize">{user.role} Account</p>
              
              <div className="w-full space-y-3 mt-4 text-left border-t border-gray-50 pt-6">
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <MapPin size={18} className="text-[#5D3A1A]/40" />
                  <span>{user.affiliation || "Affiliation not set"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <Mail size={18} className="text-[#5D3A1A]/40" />
                  <span className="truncate">{user.email}</span>
                </div>
               
              </div>
            </div>

            {/* Research Interests (Placeholder tags) */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-orange-50">
              <h3 className="text-lg font-bold text-[#5D3A1A] mb-4">Research Area</h3>
              <div className="flex flex-wrap gap-2">
                 <span className="px-3 py-1 bg-orange-50 text-[#5D3A1A] text-xs font-bold rounded-full border border-orange-100">
                    {user.affiliation || "General Research"}
                  </span>
              </div>
            </div>
          </div>

          {/* Right Column: Stats and Bio */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-[#FFFDF5] p-6 rounded-2xl border border-orange-100 flex flex-col items-center text-center">
                  <div className="p-3 bg-white rounded-xl shadow-sm mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-xl font-bold text-[#5D3A1A]">{stat.value}</div>
                  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* About / Bio (Using affiliation as a fallback) */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-orange-50">
              <h3 className="text-xl font-bold text-[#5D3A1A] mb-4 flex items-center gap-2">
                <UserIcon className="text-[#10B981]" size={20} />
                Researcher Affiliation
              </h3>
              <p className="text-gray-600 leading-relaxed italic">
                "{user.name} is currently affiliated with {user.affiliation || 'the academic community'}. Verified researcher on MPA Research Platform."
              </p>
            </div>

            {/* Real Submissions from API */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-orange-50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[#5D3A1A]">My Submissions</h3>
                <Link href="/dashboard" className="text-[#10B981] text-sm font-bold flex items-center gap-1 hover:underline">
                  View Dashboard <ExternalLink size={14} />
                </Link>
              </div>
              
              <div className="space-y-4">
                {isSubLoading ? (
                  <p className="text-center text-gray-400">Loading manuscripts...</p>
                ) : submissions.length > 0 ? (
                  submissions.slice(0, 3).map((manuscript) => (
                    <div key={manuscript._id} className="p-4 rounded-xl border border-gray-50 bg-[#FDFBF7]/50 hover:border-emerald-100 transition-colors group">
                      <h4 className="font-bold text-[#5D3A1A] group-hover:text-[#10B981] transition-colors mb-1">
                        {manuscript.title}
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">
                        Submitted on: {new Date(manuscript.createdAt).toLocaleDateString()}
                      </p>
                      <div className="flex gap-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          manuscript.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'
                        }`}>
                          {manuscript.status || 'Under Review'}
                        </span>
                        <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                          ID: {manuscript._id.slice(-6)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400 italic">No manuscripts submitted yet.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearcherProfile;