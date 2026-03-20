import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Mail, 
  MapPin, 
  BookOpen, 
  Award, 
  BarChart3, 
  Calendar,
  ExternalLink,
  Edit3,
  FileText,
  Loader2,
  CheckCircle,
  X
} from 'lucide-react';
// Import your mutation alongside the queries
import { 
  useGetMeQuery, 
  useGetMySubmissionsQuery,
  // useUpdateProfileMutation // Uncomment this if you have the mutation ready
} from '@/store/apiSlice';

const MyProfile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '' });

  // 1. Fetch Data
  const { data: userData, isLoading: isUserLoading, error: userError } = useGetMeQuery();
  const { data: subData, isLoading: isSubLoading } = useGetMySubmissionsQuery();

  const user = userData?.user;
  const submissions = subData?.submissions || [];

  // 2. Handle Loading State
  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <Loader2 className="animate-spin text-[#10B981]" size={48} />
      </div>
    );
  }

  // 3. Handle Error State
  if (userError || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-orange-100">
          <h2 className="text-2xl font-bold text-[#5D3A1A]">Session Expired</h2>
          <p className="text-gray-500 mb-4">Please log in to view your profile.</p>
          <button className="bg-[#10B981] text-white px-6 py-2 rounded-lg">Login</button>
        </div>
      </div>
    );
  }

  const handleEditClick = () => {
    setFormData({ name: user.name });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Logic to call your update mutation would go here
    console.log("Updating name to:", formData.name);
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#5D3A1A]">My Profile</h1>
            <p className="text-gray-500 text-lg">Welcome back, {user.name}.</p>
          </div>
          <button 
            onClick={handleEditClick}
            className="flex items-center gap-2 bg-[#10B981] text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all active:scale-95"
          >
            <Edit3 size={18} />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Personal Info Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-emerald-50 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
                  <UserIcon size={40} className="text-[#10B981]" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-[#5D3A1A]">{user.name}</h2>
                  {user.isVerified && <CheckCircle size={18} className="text-blue-500" fill="currentColor" />}
                </div>
                <p className="text-emerald-600 font-medium capitalize mb-4">{user.role}</p>
                
                <div className="w-full space-y-3 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail size={18} className="text-gray-400" />
                    <span className="text-sm truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar size={18} className="text-gray-400" />
                    <span className="text-sm text-left">
                      Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Status Card */}
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
              <h3 className="text-[#5D3A1A] font-bold mb-2 flex items-center gap-2">
                <Award size={18} className="text-emerald-600" />
                Account Status
              </h3>
              <p className="text-sm text-emerald-800">
                {user.isVerified ? "Your account is verified for academic submissions." : "Verification pending review."}
              </p>
            </div>
          </div>

          {/* Right Column: Stats and Submissions */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Stats Grid */}
           

            {/* Submissions Section */}
            
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#FDFBF7]">
              <h2 className="text-xl font-bold text-[#5D3A1A]">Edit Profile</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#10B981] focus:ring-2 focus:ring-emerald-50 outline-none transition-all"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-1.5">Email Address (Cannot be changed)</label>
                <input 
                  type="email" 
                  disabled 
                  value={user.email}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 px-6 py-2.5 rounded-xl font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-2.5 rounded-xl font-semibold bg-[#10B981] text-white hover:bg-emerald-600 shadow-lg shadow-emerald-100 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;