import { useState } from "react";
import { AdminLogin } from "./AdminLogin";
import { AdminNavbar } from "./AdminNavbar";
import { AdminDashboard } from "./AdminDashboard";
import { AdminResponses } from "./AdminResponses";
import { AdminGallery } from "./AdminGallery";
import { AdminCourses } from "./AdminCourses";
import { useAdmin } from "../../contexts/AdminContext";

type AdminSection =
  | "dashboard"
  | "responses"
  | "gallery"
  | "courses";

interface AdminPanelProps {
  onExitToSite: () => void;
}

export function AdminPanel({ onExitToSite }: AdminPanelProps) {
  const { isLoggedIn } = useAdmin();
  const [currentSection, setCurrentSection] =
    useState<AdminSection>("dashboard");

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setCurrentSection("dashboard")} />;
  }

  const renderSection = () => {
    const navigate = (section: string) => {
      setCurrentSection(section as AdminSection);
    };

    switch (currentSection) {
      case "dashboard":
        return <AdminDashboard onNavigate={navigate} onExitToSite={onExitToSite} />;
      case "responses":
        return <AdminResponses />;
      case "gallery":
        return <AdminGallery />;
      case "courses":
        return <AdminCourses />;
      default:
        return <AdminDashboard onNavigate={navigate} onExitToSite={onExitToSite} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Horizontal Navbar at the top */}
      <AdminNavbar
        currentSection={currentSection}
        onNavigate={(section) => setCurrentSection(section as AdminSection)}
        onExitToSite={onExitToSite}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}
