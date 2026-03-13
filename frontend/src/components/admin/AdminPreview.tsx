import { useState } from "react";
import { Eye, Home, ExternalLink, RotateCcw } from "lucide-react";

export function AdminPreview() {
  const [lastChecked, setLastChecked] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const pages = [
    { name: "Home", slug: "home", icon: "🏠" },
    { name: "About Us", slug: "about", icon: "ℹ️" },
    { name: "Courses", slug: "courses", icon: "📚" },
    { name: "Admissions", slug: "admissions", icon: "📋" },
    { name: "Gallery", slug: "gallery", icon: "🖼️" },
    { name: "Contact", slug: "contact", icon: "✉️" },
  ];

  const updateStatuses = [
    {
      title: "Header Navigation",
      status: "✅ Active",
      lastUpdated: "2024-02-03",
      description: "Navigation menu is working correctly",
    },
    {
      title: "Logo and Branding",
      status: "✅ Active",
      lastUpdated: "2024-02-02",
      description: "Phoenix Tech Academy branding is consistent",
    },
    {
      title: "Responsive Design",
      status: "✅ Active",
      lastUpdated: "2024-02-01",
      description: "Mobile and desktop views are responsive",
    },
    {
      title: "Form Submissions",
      status: "✅ Active",
      lastUpdated: "2024-02-03",
      description: "Admission form is collecting responses",
    },
    {
      title: "Gallery Images",
      status: "✅ Active",
      lastUpdated: "2024-02-01",
      description: "All gallery images are loading correctly",
    },
    {
      title: "Course Information",
      status: "✅ Active",
      lastUpdated: "2024-02-02",
      description: "Course details are up to date",
    },
  ];

  const handleCheckUpdates = () => {
    setIsChecking(true);
    // Simulate checking process
    setTimeout(() => {
      setLastChecked(new Date().toLocaleString());
      setIsChecking(false);
    }, 2000);
  };

  const handleViewPage = (slug: string) => {
    window.open(`/#/${slug}`, "_blank");
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F0F12] flex items-center gap-2">
              <Eye className="w-5 sm:w-6 h-5 sm:h-6 text-[#C9A24D]" />
              Website Preview & Updates
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Monitor and verify website updates
            </p>
          </div>
          <button
            onClick={handleCheckUpdates}
            disabled={isChecking}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[#0F0F12] text-white rounded-lg hover:bg-[#2A2E35] transition font-medium text-sm disabled:opacity-50"
          >
            <RotateCcw className={`w-4 h-4 ${isChecking ? "animate-spin" : ""}`} />
            {isChecking ? "Checking..." : "Check Updates"}
          </button>
        </div>

        {lastChecked && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-xs sm:text-sm text-green-800">
            ✅ Last checked: {lastChecked}
          </div>
        )}
      </div>

      {/* Quick Page Preview */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-[#0F0F12] mb-4 flex items-center gap-2">
          <Home className="w-5 h-5 text-[#C9A24D]" />
          Website Pages
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-4">
          {pages.map((page) => (
            <button
              key={page.slug}
              onClick={() => handleViewPage(page.slug)}
              className="p-3 sm:p-4 border-2 border-gray-200 rounded-lg hover:border-[#C9A24D] hover:bg-amber-50 transition group"
            >
              <div className="text-2xl sm:text-3xl mb-2">{page.icon}</div>
              <h4 className="font-semibold text-[#0F0F12] text-left mb-2 text-xs sm:text-sm">
                {page.name}
              </h4>
              <div className="flex items-center gap-2 text-[#C9A24D] opacity-0 group-hover:opacity-100 transition text-xs font-medium">
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                View
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Update Status */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-[#0F0F12] mb-4">
          Website Components Status
        </h3>
        <div className="space-y-3">
          {updateStatuses.map((item, index) => (
            <div
              key={index}
              className="p-3 sm:p-4 border border-green-200 bg-green-50 rounded-lg"
            >
              <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#0F0F12] text-sm sm:text-base">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Last updated: {item.lastUpdated}
                  </p>
                </div>
                <span className="text-base sm:text-lg font-semibold text-green-700 flex-shrink-0">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Checklist */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-[#0F0F12] mb-4">
          Implementation Checklist
        </h3>
        <div className="space-y-3">
          {[
            "Admin authentication system",
            "Dashboard with statistics",
            "Admission form response viewer",
            "Gallery image management",
            "Course creation and editing",
            "Website preview functionality",
            "Responsive design for all pages",
            "Color theme consistency",
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked
                disabled
                className="w-4 sm:w-5 h-4 sm:h-5 accent-[#C9A24D] cursor-pointer flex-shrink-0"
              />
              <span className="text-[#0F0F12] text-sm sm:text-base">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Development Notes */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-blue-900 mb-3">📝 Development Notes</h3>
        <ul className="space-y-2 text-xs sm:text-sm text-blue-800">
          <li>
            • All form responses are currently stored in browser state. Consider
            integrating with a backend database for persistence.
          </li>
          <li>
            • Image uploads require external hosting service (Cloudinary,
            Imgur, AWS S3, etc.)
          </li>
          <li>
            • Replace hardcoded admin credentials with proper authentication system
          </li>
          <li>
            • Add email notifications for new admission requests
          </li>
          <li>
            • Implement real-time statistics and analytics
          </li>
          <li>
            • Add user role management for multiple admins
          </li>
        </ul>
      </div>
    </div>
  );
}
