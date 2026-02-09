import { Menu, X, LogIn } from "lucide-react";
import { useState } from "react";
import logoImage from "../assets/logophoneix.png";

type Page = "home" | "about" | "courses" | "admissions" | "gallery" | "contact" | "admin";

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About Us", id: "about" },
    { name: "Courses", id: "courses" },
    { name: "Admissions", id: "admissions" },
    { name: "Gallery", id: "gallery" },
    { name: "Contact Us", id: "contact" },
  ];

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer flex-shrink-0"
            onClick={() => handleNavigate("home")}
          >
            <img 
              src={logoImage} 
              alt="Phoenix Tech Academy Logo" 
              className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-[#0F0F12] font-semibold text-base sm:text-xl md:text-2xl leading-tight">
                Phoenix Tech Academy
              </span>
              <span className="text-[#C9A24D] text-[10px] sm:text-xs md:text-sm">
                From Ideas to Impact
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1 xl:space-x-2 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id as Page)}
                className={`px-3 xl:px-4 py-2 rounded-lg transition-colors text-sm xl:text-base ${
                  currentPage === item.id
                    ? "bg-[#C9A24D] text-white"
                    : "text-[#4A4A4A] hover:bg-[#F7F8FA]"
                }`}
              >
                {item.name}
              </button>
            ))}
            {/* Admin Button */}
            <button
              onClick={() => handleNavigate("admin")}
              className={`ml-2 px-3 xl:px-4 py-2 rounded-lg transition-colors text-sm xl:text-base flex items-center gap-2 ${
                currentPage === "admin"
                  ? "bg-red-600 text-white"
                  : "text-[#0F0F12] hover:bg-red-100 border-2 border-red-600"
              }`}
              title="Back to Admin Panel"
            >
              <LogIn className="w-4 h-4" />
              Back to Admin
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-[#F7F8FA] flex-shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#0F0F12]" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[#0F0F12]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 space-y-1 sm:space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id as Page)}
                className={`block w-full text-left px-4 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                  currentPage === item.id
                    ? "bg-[#C9A24D] text-white"
                    : "text-[#4A4A4A] hover:bg-[#F7F8FA]"
                }`}
              >
                {item.name}
              </button>
            ))}
            {/* Mobile Admin Button */}
            <button
              onClick={() => handleNavigate("admin")}
              className={`block w-full text-left px-4 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base flex items-center gap-2 font-semibold ${
                currentPage === "admin"
                  ? "bg-red-600 text-white"
                  : "text-[#0F0F12] hover:bg-red-100 border-2 border-red-600"
              }`}
            >
              <LogIn className="w-4 h-4" />
              Back to Admin
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}