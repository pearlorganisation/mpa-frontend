"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // This detects which page you are on
import { 
  LayoutDashboard, 
  FileText, 
  Search, 
  Send, 
  User, 
  Settings, 
  LogOut, 
  Bell
} from 'lucide-react';

const ResearcherSidebar = () => {
  const pathname = usePathname(); // Get current URL path

  const menuItems = [
    { name: 'Overview', icon: <LayoutDashboard size={20} />, path: '/dashboard/overview' },
    { name: 'Profile', icon: <User size={20} />, path: '/dashboard/my-profile' },
    { name: 'My Submissions', icon: <Send size={20} />, path: '/dashboard/submissions' },
    { name: 'Peer Reviews', icon: <Search size={20} />, path: '/dashboard/reviews' },
    { name: 'Articles', icon: <FileText size={20} />, path: '/dashboard/articles' },
    { name: 'Notifications', icon: <Bell size={20} />, path: '/dashboard/notifications', badge: 3 },
    { name: 'Settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
  ];

  return (
    <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-[#FDFBF7] border-r border-gray-200 sticky top-0">
      {/* Logo Section */}
      <div className="flex items-center px-2 mb-10">
        <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center text-white mr-3 shadow-sm">
          <FileText size={18} />
        </div>
        <span className="text-xl font-bold text-[#5D3A1A]">MPA <span className="text-[#10B981]">Panel</span></span>
      </div>

      {/* User Info Card */}
      <div className="flex items-center p-3 mb-6 bg-white rounded-2xl shadow-sm border border-orange-50">
        <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-[#10B981] overflow-hidden">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="avatar" 
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-bold text-[#5D3A1A]">Dr. Alex Rivers</p>
          <p className="text-xs text-gray-500 font-medium">Lead Researcher</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            // Check if this item is the currently active route
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center justify-between w-full px-4 py-3 transition-all duration-300 rounded-xl group ${
                  isActive 
                    ? 'bg-[#10B981] text-white shadow-lg shadow-emerald-100' 
                    : 'text-[#5D3A1A] hover:bg-orange-50 hover:text-[#10B981]'
                }`}
              >
                <div className="flex items-center">
                  <span className={`${isActive ? 'text-white' : 'text-[#10B981]'} group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </span>
                  <span className="mx-4 font-semibold text-sm">{item.name}</span>
                </div>
                
                {item.badge && (
                  <span className={`px-2 py-0.5 text-xs rounded-full ${isActive ? 'bg-white text-[#10B981]' : 'bg-red-500 text-white'}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-10">
          <button className="flex items-center w-full px-4 py-3 text-gray-400 transition-colors duration-300 rounded-xl hover:bg-red-50 hover:text-red-600 group">
            <LogOut size={20} />
            <span className="mx-4 font-semibold text-sm">Logout</span>
          </button>
          
          <div className="mt-6 p-4 bg-[#78350F]/5 rounded-2xl">
            <p className="text-xs font-semibold text-[#78350F] mb-2 text-center">Need Help?</p>
            <button className="w-full py-2 bg-white text-[#78350F] text-xs font-bold rounded-lg border border-orange-100 hover:bg-[#10B981] hover:text-white transition-all shadow-sm">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ResearcherSidebar;