"use client"
import { Search, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Articles", href: "#articles" },
    { name: "Submit", href: "#submit" },
    { name: "EditorialBoard", href: "#editorial-board" },
    { name: "Guidelines", href: "#guidelines" },
    { name: "Contact", href: "#contact" },
  ];

  // Logic to check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }

    // Close dropdown if clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    router.push("/login"); // Redirect to login after logout
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-[100] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center h-20">

        {/* Logo Section */}
        <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
          <div className="relative w-48 h-12 md:w-56 md:h-14">
            <Image
              src="/newLogo.png"
              alt="MPA Research Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Navigation Section */}
        <nav className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6 border-r border-gray-200 pr-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                scroll={true}
                className="text-[#854D0E] hover:text-[#22C55E] transition-all duration-300 text-[15px] font-semibold"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Icons: Search and Profile */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-[#854D0E] hover:bg-gray-100 rounded-full transition-all duration-300">
              <Search size={22} />
            </button>

            {/* Auth Logic: Show Profile Dropdown if logged in, else show Login link */}
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 p-1 pr-2 rounded-full border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <div className="bg-[#22C55E] text-white p-1.5 rounded-full">
                    <User size={18} />
                  </div>
                  <ChevronDown size={16} className={`text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-[110] animate-in fade-in slide-in-from-top-2">
                    {/* <Link 
                      href="/submit" 
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-[#F0FDF4] hover:text-[#22C55E] transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Link> */}
                    <hr className="my-1 border-gray-50" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* If NOT Logged In */
              <Link
                href="/login"
                className="flex items-center justify-center p-2 rounded-full border-2 border-transparent hover:border-[#22C55E] bg-[#854D0E]/5 hover:bg-[#22C55E]/10 text-[#854D0E] hover:text-[#22C55E] transition-all duration-300"
                title="Login"
              >
                <User size={24} />
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile View */}
        <div className="lg:hidden flex items-center gap-4">
          <Link href={isLoggedIn ? "/submit" : "/login"} className="text-[#854D0E]">
            <User size={24} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;