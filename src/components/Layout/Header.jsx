import { Search } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Articles", href: "/articles" },
    { name: "Submit", href: "submit" },
    { name: "Editorial Board", href: "submit" },
    { name: "Guidelines", href: "submit" },
    { name: "Contact", href: "contact" },
  ];

  return (
    <header className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#FFD700] rounded-md flex items-center justify-center overflow-hidden border border-pink-200">
          <Image
            height={300}
            width={300}
            src="/logo.jpeg"
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#713F12] leading-tight tracking-tight">
            MPA RESEARCH
          </h1>
          <p className="text-[10px] text-[#A16207] italic -mt-0.5">
            Passion for Research
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden lg:flex items-center gap-6">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-[#854D0E] hover:text-[#22C55E] transition-colors text-[15px] font-medium"
          >
            {link.name}
          </a>
        ))}
        <button className="ml-2 p-1 text-[#854D0E] hover:text-[#22C55E]">
          <Search size={20} />
        </button>
      </nav>
    </header>
  );
};

export default Header;
