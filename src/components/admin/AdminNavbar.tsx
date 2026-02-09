import { 
  LayoutDashboard, 
  MessageSquare, 
  Image as ImageIcon, 
  BookOpen, 
  Home,
  LogOut 
} from "lucide-react";
import { useAdmin } from "../../contexts/AdminContext";
import logoImage from "../../assets/logophoneix.png";

interface AdminNavbarProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  onExitToSite: () => void;
}

export function AdminNavbar({ currentSection, onNavigate, onExitToSite }: AdminNavbarProps) {
  const { logout, adminUsername } = useAdmin();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  // Icon naming for each section
  const menuItems = [
    { 
      id: "dashboard", 
      label: "Dashboard", 
      icon: LayoutDashboard // Represents overview/stats
    },
    { 
      id: "responses", 
      label: "Admission", 
      icon: MessageSquare // Represents form submissions/communication
    },
    { 
      id: "gallery", 
      label: "Gallery", 
      icon: ImageIcon // Represents media management
    },
    { 
      id: "courses", 
      label: "Courses", 
      icon: BookOpen // Represents educational content
    },
  ];

  return (
    <nav className="bg-[#0F0F12] text-white shadow-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand Logo and Title */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <img 
              src={logoImage}
              alt="Phoenix Logo" 
              className="w-9 h-9 object-contain"
            />
            <div className="hidden sm:block">
              <span className="font-bold text-white block leading-none">Phoenix</span>
              <span className="text-[10px] text-[#C9A24D] uppercase tracking-widest font-bold">Admin Panel</span>
            </div>
          </div>

          {/* Center: Navigation Section (Icon List) */}
          <div className="flex items-center bg-[#1A1A1E] rounded-full p-1 border border-gray-800">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-sm font-semibold
                    ${isActive 
                      ? "bg-[#C9A24D] text-[#0F0F12] shadow-md" 
                      : "text-gray-400 hover:text-white hover:bg-[#2A2E35]"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden lg:block">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right: User Profile, Back to Site, & LogOut Icon */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Logged in as</span>
              <span className="text-sm font-medium text-[#C9A24D]">{adminUsername || 'Admin'}</span>
            </div>
            <button
              onClick={onExitToSite}
              className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-800 text-gray-300 hover:bg-[#2A2E35] hover:text-white transition-all text-sm font-semibold"
              title="Back to Website"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Site</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center p-2 rounded-full border border-gray-800 hover:bg-red-600/10 hover:border-red-600 hover:text-red-600 transition-all text-gray-400"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}