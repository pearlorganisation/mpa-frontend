"use client";
import { useState, useMemo } from 'react';
import { useGetMeQuery, useGetMySubmissionsQuery } from '@/store/apiSlice';
import { 
  Loader2, FileText, ChevronRight, Clock, 
  CheckCircle2, AlertCircle, FileStack, Plus,
  ChevronLeft, Search, Filter
} from 'lucide-react';
import Link from 'next/link';

export default function MySubmissions() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Set how many manuscripts per page

  const { data: userData, isLoading: isUserLoading } = useGetMeQuery();
  const { data: subData, isLoading: isSubLoading } = useGetMySubmissionsQuery();

  const submissions = subData?.submissions || [];

  // --- Pagination Logic ---
  const totalPages = Math.ceil(submissions.length / itemsPerPage);
  
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return submissions.slice(start, start + itemsPerPage);
  }, [submissions, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusConfig = (status) => {
    const configs = {
      'Published': { color: 'text-emerald-700 bg-emerald-50 border-emerald-100', icon: <CheckCircle2 size={14} /> },
      'Accepted': { color: 'text-blue-700 bg-blue-50 border-blue-100', icon: <CheckCircle2 size={14} /> },
      'Rejected': { color: 'text-rose-700 bg-rose-50 border-rose-100', icon: <AlertCircle size={14} /> },
      'Revision Required': { color: 'text-amber-700 bg-amber-50 border-amber-100', icon: <Clock size={14} /> },
      'Under Review': { color: 'text-indigo-700 bg-indigo-50 border-indigo-100', icon: <Clock size={14} /> },
      'Submitted': { color: 'text-slate-600 bg-slate-50 border-slate-100', icon: <FileText size={14} /> },
      'default': { color: 'text-gray-600 bg-gray-50 border-gray-100', icon: <Clock size={14} /> }
    };
    return configs[status] || configs['default'];
  };

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7]">
        <div className="relative mb-4">
            <div className="w-20 h-20 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
            <FileText className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500" size={28} />
        </div>
        <p className="text-[#5D3A1A] font-bold tracking-wide animate-pulse text-lg">Initializing Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-24">
      {/* Header Banner */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#5D3A1A]">
                        My Submissions
                    </h1>
                    <p className="text-gray-500 text-lg font-medium max-w-2xl">
                        Welcome back! You have <span className="text-[#10B981] font-bold">{submissions.length}</span> total submissions in our system.
                    </p>
                </div>
                <Link href="/submit" className="inline-flex items-center justify-center gap-3 bg-[#10B981] hover:bg-[#059669] text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-200 active:scale-95 text-lg">
                    <Plus size={22} />
                    New Submission
                </Link>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* --- Quick Stats Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
                { label: 'Total Manuscripts', count: submissions.length, icon: <FileStack className="text-blue-500" />, bg: 'bg-blue-50' },
                { label: 'Published Papers', count: submissions.filter(s => s.status === 'Published').length, icon: <CheckCircle2 className="text-emerald-500" />, bg: 'bg-emerald-50' },
                { label: 'In Peer Review', count: submissions.filter(s => s.status === 'Under Review').length, icon: <Clock className="text-amber-500" />, bg: 'bg-amber-50' },
                { label: 'Total Rejections', count: submissions.filter(s => s.status === 'Rejected').length, icon: <AlertCircle className="text-rose-500" />, bg: 'bg-rose-50' },
            ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50 flex items-center gap-5 transition-transform hover:-translate-y-1">
                    <div className={`${stat.bg} w-14 h-14 rounded-2xl flex items-center justify-center`}>
                        {stat.icon}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-3xl font-black text-[#2D1B0B]">{stat.count}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* --- Main List Section --- */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between mb-2">
             <h2 className="text-xl font-bold text-[#5D3A1A]">Recent Activity</h2>
             {/* <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-emerald-600 bg-white border border-gray-100 rounded-lg"><Search size={18} /></button>
                <button className="p-2 text-gray-400 hover:text-emerald-600 bg-white border border-gray-100 rounded-lg"><Filter size={18} /></button>
             </div> */}
          </div>

          {isSubLoading ? (
            <div className="bg-white rounded-[32px] py-32 flex flex-col items-center">
                <Loader2 className="animate-spin text-emerald-500 mb-4" size={40} />
                <p className="text-gray-400 font-medium tracking-wide">Fetching your archive...</p>
            </div>
          ) : paginatedData.length > 0 ? (
            <>
                <div className="grid grid-cols-1 gap-4">
                    {paginatedData.map((manuscript) => {
                        const statusStyle = getStatusConfig(manuscript.status);
                        return (
                            <div key={manuscript._id} className="group bg-white border border-gray-100 rounded-[28px] p-6 transition-all hover:shadow-2xl hover:shadow-emerald-900/5 hover:border-emerald-100 flex flex-col md:flex-row md:items-center gap-8">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] font-bold border ${statusStyle.color}`}>
                                            {statusStyle.icon}
                                            {manuscript.status?.toUpperCase()}
                                        </span>
                                        <span className="text-[11px] font-black text-gray-300 uppercase tracking-widest">{manuscript.manuscriptType}</span>
                                    </div>

                                    <h3 className="text-xl font-bold text-[#2D1B0B] group-hover:text-emerald-600 transition-colors mb-4 line-clamp-1 leading-tight">
                                        {manuscript.title}
                                    </h3>

                                    <div className="flex flex-wrap items-center gap-6">
                                        <div className="flex items-center gap-2 text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                                            <CalendarIcon size={14} />
                                            <span className="text-xs font-bold uppercase tracking-tighter">
                                                {new Date(manuscript.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                        </div>
                                        <div className="text-[11px] text-gray-300 font-mono tracking-tighter">
                                            UUID: {manuscript._id}
                                        </div>
                                    </div>
                                </div>

                                <div className="shrink-0 flex items-center gap-4">
                                    <Link href={`/published-article/${manuscript._id}`} className="w-full md:w-auto">
                                        <button className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-gray-200">
                                            Review Submission
                                            <ChevronRight size={18} />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* --- Pagination Footer --- */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-12">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-3 rounded-xl border border-gray-200 bg-white text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-emerald-500 hover:text-emerald-500 transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <div className="flex items-center gap-2">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`w-12 h-12 rounded-xl font-bold transition-all ${
                                        currentPage === i + 1 
                                        ? 'bg-[#10B981] text-white shadow-lg shadow-emerald-100' 
                                        : 'bg-white border border-gray-200 text-gray-500 hover:border-emerald-500'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button 
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-3 rounded-xl border border-gray-200 bg-white text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-emerald-500 hover:text-emerald-500 transition-all"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </>
          ) : (
            <div className="text-center py-10 bg-white rounded-[40px] border-2 border-dashed border-gray-100">
              <div className="w-24 h-24 bg-[#FDFBF7] rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-inner">
                <FileText size={40} className="text-gray-200" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D1B0B] mb-3">No Manuscripts Found</h3>
              <p className="text-gray-400 mb-10 max-w-sm mx-auto font-medium">Your research journey starts here. Submit your first manuscript to begin the peer-review process.</p>
              <Link href="/submit" className="bg-[#10B981] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#059669] transition-all shadow-xl shadow-emerald-100">
                Begin Submission
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CalendarIcon({ size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
    )
}