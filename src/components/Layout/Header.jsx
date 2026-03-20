"use client"
import { User, LogOut, LayoutDashboard, ChevronDown, Menu, X } from "lucide-react"; 
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/store/apiSlice";
// Removed unused 'useDispatch'

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const[isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const { data: userData, isLoading } = useGetMeQuery(undefined, {
    skip: !isLoggedIn,
  });

  // ✅ ADDED AI Policy Link Here
  const navLinks =[
    { name: "Home", href: "/#hero" },
    { name: "About", href: "/#about" },
    { name: "Articles", href: "/#articles" },
    { name: "Submit", href: "/#submit" },
    { name: "Editorial", href: "/#editorial-board" }, // Shortened name for better fit
    { name: "Guidelines", href: "/#guidelines" },
    { name: "AI Policy", href: "/#ai-policy" }, // <--- New Section Link
    { name: "Contact", href: "/#contact" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  },[]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
   
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    router.push("/login");
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-[100] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center h-20">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center hover:opacity-90 transition-opacity z-[110]">
          <div className="relative w-36 h-10 md:w-56 md:h-14">
            <Image src="/newLogo.png" alt="MPA Research Logo" fill className="object-contain" priority />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          <div className="flex items-center gap-4 xl:gap-6 border-r border-gray-200 pr-6">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-[#854D0E] hover:text-[#22C55E] transition-all duration-300 text-[14px] xl:text-[15px] font-semibold whitespace-nowrap">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <div className="bg-[#22C55E] text-white p-1.5 rounded-full">
                    <User size={18} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                    {isLoading ? "..." : userData?.user?.name || userData?.name || "User"}
                  </span>
                  <ChevronDown size={16} className={`text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-[110]">
                    <Link href="/dashboard/my-profile" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <hr className="my-1 border-gray-50" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#854D0E] text-white hover:bg-[#A16207] transition-all text-sm font-semibold shadow-sm">
                <User size={18} /> Login
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center z-[110]">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#854D0E] hover:bg-gray-100 rounded-lg transition-all"
          >
            {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        <div 
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} 
          onClick={() => setIsMobileMenuOpen(false)} 
        />

        {/* Mobile Sidebar Menu */}
        <div className={`fixed top-0 right-0 h-full w-[300px] bg-white z-[105] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex flex-col h-full pt-20">
            
            {/* User Profile Section (Mobile Only) */}
            <div className="px-6 py-6 border-b border-gray-100">
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <div className="bg-[#22C55E] text-white p-3 rounded-full shadow-sm">
                    <User size={24} />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs text-gray-500 font-medium">Signed in as</span>
                    <span className="text-base font-bold text-gray-800 truncate">
                      {isLoading ? "Loading..." : userData?.user?.name || userData?.name || "User"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-3">Sign in to access your dashboard and submit articles.</p>
                  <Link 
                    href="/login" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#854D0E] text-white text-sm font-bold"
                  >
                    <User size={18} /> Login
                  </Link>
                </div>
              )}
            </div>

            {/* Navigation Links (Mobile) */}
            <div className="flex-1 px-4 py-4 overflow-y-auto">
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 text-[16px] font-semibold text-gray-700 hover:text-[#22C55E] hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Account Actions (Mobile) */}
            {isLoggedIn && (
              <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col gap-2">
                {/* ✅ FIXED: Desktop aur Mobile dono ab /dashboard/my-profile par jayenge */}
                <Link 
                  href="/dashboard/my-profile" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white text-gray-700 font-bold border border-gray-200 shadow-sm active:scale-95 transition-transform"
                >
                  <LayoutDashboard size={20} className="text-[#22C55E]" /> 
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-red-50 text-red-600 font-bold border border-red-100 active:scale-95 transition-transform"
                >
                  <LogOut size={20} /> 
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;