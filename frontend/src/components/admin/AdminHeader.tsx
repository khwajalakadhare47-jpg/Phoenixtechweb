import { LogOut, Menu, LayoutDashboard, MessageSquare, Image, BookOpen, X } from "lucide-react";
import logoImage from "../../assets/logophoneix.png";
import { useAdmin } from "../../contexts/AdminContext";
import { useState } from "react";

interface AdminHeaderProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

export function AdminHeader({
  currentSection,
  onNavigate,
}: AdminHeaderProps) {
  const { logout, adminUsername } = useAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "responses", label: "Responses", icon: MessageSquare },
    { id: "gallery", label: "Gallery", icon: Image },
    { id: "courses", label: "Courses", icon: BookOpen },
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="w-full px-3 sm:px-6 lg:px-8">
        {/* Top Row - Logo and Controls */}
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo and Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <img
              src={logoImage}
              alt="Phoenix Tech Academy"
              className="h-8 sm:h-10 w-8 sm:w-10 object-contain flex-shrink-0"
            />
            <div className="hidden sm:block min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-[#0F0F12] truncate">
                Phoenix Tech Academy
              </h1>
              <p className="text-xs text-[#C9A24D]">Admin Panel</p>
            </div>
          </div>

          {/* Right - Admin Info and Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-xs sm:text-sm font-medium text-[#4A4A4A]">
                Welcome, <span className="text-[#C9A24D]">{adminUsername}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium text-xs sm:text-sm flex-shrink-0"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#0F0F12] p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Bar - Desktop Always Visible, Mobile Toggle */}
        <nav className={`
          border-t border-gray-200
          ${mobileMenuOpen ? 'block' : 'hidden lg:block'}
        `}>
          <div className="flex flex-col lg:flex-row gap-1 py-2 sm:py-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg 
                    transition whitespace-nowrap text-xs sm:text-sm font-medium
                    ${isActive
                      ? 'bg-[#C9A24D] text-[#0F0F12]'
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden">{item.label.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
