"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Added useRouter
import { 
  LayoutDashboard, 
  FileText, 
  User, 
  Send, 
  Menu, 
  X,
  LogOut,
  Home
} from 'lucide-react';

const ResearcherSidebar = () => {
  const pathname = usePathname();
  const router = useRouter(); // Initialize router
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when route changes (on mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const menuItems = [
    { name: 'Home', icon: <Home size={20} />, path: '/' },
    { name: 'Overview', icon: <LayoutDashboard size={20} />, path: '/dashboard/overview' },
    { name: 'Profile', icon: <User size={20} />, path: '/dashboard/my-profile' },
    { name: 'My Submissions', icon: <Send size={20} />, path: '/dashboard/submissions' },
  ];

  const handleLogout = () => {
    // 1. Clear Storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // 2. Clear any other session identifiers if you have them
    // cookieStore.remove('token') etc.

    // 3. Close the mobile sidebar
    setIsOpen(false);

    // 4. Redirect to login
    router.push("/login");

    // Optional: If you use window.location, it performs a hard refresh which clears the Redux/API state
    // window.location.href = "/login"; 
  };

  return (
    <>
      {/* --- MOBILE HEADER & TOGGLE --- */}
      <div className="lg:hidden flex items-center justify-between bg-[#FDFBF7] border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center text-white mr-2">
            <FileText size={18} />
          </div>
          <span className="text-lg font-bold text-[#5D3A1A]">Researcher</span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-[#5D3A1A] hover:bg-orange-50 rounded-lg transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- BACKDROP (Mobile Only) --- */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#FDFBF7] border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col h-screen px-5 py-8 overflow-y-auto
      `}>
        
        {/* Logo Section */}
        <div className="hidden lg:flex items-center px-2 mb-10">
          <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center text-white mr-3 shadow-sm">
            <FileText size={18} />
          </div>
          <span className="text-[18px] font-bold text-[#5D3A1A]">
            Researcher <span className="text-[#10B981]">Pannel</span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col justify-between flex-1">
          <nav className="space-y-2">
            {menuItems.map((item) => {
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
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section: Logout */}
          <div className="mt-auto pt-6 border-t border-gray-100">
             <button 
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-red-50 text-red-600 font-bold border border-red-100 active:scale-95 transition-all hover:bg-red-100"
              >
                <LogOut size={20} /> 
                <span className="text-sm font-bold uppercase tracking-wider">Logout</span>
              </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ResearcherSidebar;