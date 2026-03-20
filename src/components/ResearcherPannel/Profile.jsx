"use client";
import React from 'react';
import NextLink from 'next/link'; // Renamed to avoid conflict with Lucide Link icon
import { 
  User as UserIcon, 
  Mail, 
  MapPin, 
  BookOpen, 
  Award, 
  BarChart3, 
  ExternalLink,
  FileText,
  Loader2,
  Link as LinkIcon
} from 'lucide-react';
import { useGetMeQuery, useGetMySubmissionsQuery } from '@/store/apiSlice';

const ResearcherProfile = () => {
  const { data: userData, isLoading: isUserLoading, error: userError } = useGetMeQuery();
  const { data: subData, isLoading: isSubLoading } = useGetMySubmissionsQuery();

  const user = userData?.user;
  const submissions = subData?.submissions || [];

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <Loader2 className="animate-spin text-[#10B981]" size={48} />
      </div>
    );
  }

  if (userError || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] px-4">
        <div className="text-center bg-white p-8 rounded-3xl shadow-sm border border-orange-100 max-w-sm w-full">
          <h2 className="text-2xl font-bold text-[#5D3A1A]">Session Expired</h2>
          <p className="text-gray-500 mb-6">Please log in to view your profile.</p>
          <NextLink href="/login" className="inline-block bg-[#10B981] text-white px-8 py-3 rounded-xl font-bold">
            Login
          </NextLink>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Submissions", value: submissions.length, icon: <FileText className="text-[#10B981]" size={20} /> },
    { label: "Role", value: user.role, icon: <Award className="text-[#10B981]" size={20} /> },
    { label: "Status", value: user.isVerified ? "Verified" : "Pending", icon: <BookOpen className="text-[#10B981]" size={20} /> },
    { label: "Citations", value: "0", icon: <BarChart3 className="text-[#10B981]" size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#5D3A1A]">Researcher Dashboard</h1>
            <p className="text-gray-500 text-sm sm:text-base">Managing academic identity and contributions.</p>
          </div>
          <div className="hidden sm:block text-right text-xs font-medium text-gray-400">
            Last updated: {new Date(user.updatedAt).toLocaleDateString()}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Column: Personal Info Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-orange-50 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#FDFBF2] shadow-xl overflow-hidden bg-emerald-50 flex items-center justify-center">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {user.isVerified && (
                  <div className="absolute bottom-1 right-1 bg-[#10B981] p-1.5 sm:p-2 rounded-full text-white border-4 border-white shadow-sm">
                    <Award size={14} className="sm:w-[16px] sm:h-[16px]" />
                  </div>
                )}
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-[#5D3A1A] break-words w-full px-2">{user.name}</h2>
              <p className="text-[#10B981] font-semibold text-xs sm:text-sm mb-4 capitalize bg-emerald-50 px-3 py-1 rounded-full mt-2">
                {user.role} Researcher
              </p>
              
              <div className="w-full space-y-4 mt-4 text-left border-t border-gray-50 pt-6">
                <div className="flex items-start gap-3 text-gray-600 text-sm">
                  <MapPin size={18} className="text-[#5D3A1A]/40 mt-0.5 shrink-0" />
                  <span className="leading-tight">{user.affiliation || "Independent Researcher"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <Mail size={18} className="text-[#5D3A1A]/40 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <LinkIcon size={18} className="text-[#5D3A1A]/40 shrink-0" />
                  <span className="text-blue-500 truncate cursor-pointer hover:underline">scholar.profile/id</span>
                </div>
              </div>
            </div>

            {/* Research Interests (Desktop & Tablet only) */}
            <div className="hidden sm:block bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-orange-50">
              <h3 className="text-lg font-bold text-[#5D3A1A] mb-4">Research Specialization</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-orange-50 text-[#5D3A1A] text-xs font-bold rounded-full border border-orange-100">
                  Primary: {user.affiliation || "General Research"}
                </span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100">
                  Verified Author
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Stats Grid - Responsive columns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-4 sm:p-6 rounded-2xl border border-orange-100 flex flex-col items-center text-center shadow-sm">
                  <div className="p-2 sm:p-3 bg-[#FDFBF7] rounded-xl mb-3 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-[#5D3A1A] uppercase truncate w-full">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Affiliation / Bio */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-orange-50">
              <h3 className="text-xl font-bold text-[#5D3A1A] mb-4 flex items-center gap-2">
                <UserIcon className="text-[#10B981]" size={22} />
                Background
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed italic border-l-4 border-emerald-100 pl-4">
                "{user.name} is currently affiliated with <strong>{user.affiliation || 'the academic community'}</strong>. As a {user.role}, they contribute to the MPA Research Platform, maintaining high standards of academic integrity."
              </p>
            </div>

            {/* Submissions Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-orange-50 overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
                <h3 className="text-xl font-bold text-[#5D3A1A]">Recent Activity</h3>
                <NextLink href="/dashboard/submissions" className="text-[#10B981] text-xs sm:text-sm font-bold flex items-center gap-1 hover:underline">
                  All Submissions <ExternalLink size={14} />
                </NextLink>
              </div>
              
              <div className="space-y-4">
                {isSubLoading ? (
                  <div className="flex flex-col items-center py-10 gap-2">
                    <Loader2 className="animate-spin text-emerald-500" />
                    <p className="text-gray-400 text-sm font-medium">Loading manuscripts...</p>
                  </div>
                ) : submissions.length > 0 ? (
                  submissions.slice(0, 3).map((manuscript) => (
                    <div key={manuscript._id} className="p-4 rounded-2xl border border-gray-50 bg-[#FDFBF7]/50 hover:border-emerald-100 hover:bg-white transition-all group">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-[#5D3A1A] group-hover:text-[#10B981] transition-colors mb-1 line-clamp-1">
                            {manuscript.title}
                          </h4>
                          <p className="text-[11px] text-gray-400 font-medium">
                            {new Date(manuscript.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} • ID: {manuscript._id.slice(-8).toUpperCase()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 self-start sm:self-center">
                          <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter ${
                            manuscript.status === 'published' 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {manuscript.status || 'Under Review'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 px-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                      <FileText size={24} className="text-gray-300" />
                    </div>
                    <p className="text-gray-400 text-sm italic">No manuscripts submitted yet.</p>
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