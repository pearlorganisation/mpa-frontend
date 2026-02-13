"use client"
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const Header = () => {
  const navLinks = [
    { name: "Home", href: "/#hero" },
    { name: "About", href: "/#about" },
    { name: "Articles", href: "/#articles" },
    { name: "Submit", href: "/#submit" },
    // { name: "EditorialBoard", href: "/editorial-board" },
   { name: "EditorialBoard", href: "/#editorial-board" },
    { name: "Guidelines", href: "/#guidelines" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-100">
      <div className=" flex justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative w-56 h-14">
            <Image
              src="/logo.jpeg.png"
              alt="MPA Research Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[#854D0E] hover:text-[#22C55E] transition-colors text-[15px] font-medium"
            >
              {link.name}
            </Link>
          ))}

          <button className="ml-2 p-1 text-[#854D0E] hover:text-[#22C55E] transition">
            <Search size={20} />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
