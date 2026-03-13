import { useState } from "react";
import {
  Users,
  MessageSquare,
  Image as ImageIcon,
  BookOpen,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

interface DashboardStats {
  totalVisitors: number;
  admissionRequests: number;
  coursesCount: number;
  galleryImages: number;
}

interface AdminDashboardProps {
  onNavigate: (section: string) => void;
  onExitToSite: () => void;
}

export function AdminDashboard({ onNavigate, onExitToSite }: AdminDashboardProps) {
  const [stats] = useState<DashboardStats>({
    totalVisitors: 1250,
    admissionRequests: 24,
    coursesCount: 8,
    galleryImages: 42,
  });

  const recentActivities = [
    { id: 1, type: "admission", message: "New admission request from John Doe", timestamp: "2 hours ago" },
    { id: 2, type: "gallery", message: "Gallery updated with 5 new images", timestamp: "5 hours ago" },
    { id: 3, type: "course", message: "Web Development course created", timestamp: "1 day ago" },
    { id: 4, type: "admission", message: "New admission request from Jane Smith", timestamp: "2 days ago" },
  ];

  // Refined StatCard to use the icons correctly and remove TS errors
  const StatCard = ({ icon: Icon, label, value, action, showIconBg }: any) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${showIconBg ? 'bg-amber-500' : 'bg-transparent'}`}>
          <Icon className={`w-5 h-5 ${showIconBg ? 'text-white' : 'text-gray-400'}`} />
        </div>
        <TrendingUp className="w-4 h-4 text-gray-400" />
      </div>
      <div>
        <h3 className="text-gray-500 text-sm font-medium mb-1">{label}</h3>
        <p className="text-3xl font-bold text-gray-900 mb-4">{value}</p>
      </div>
      {action && (
        <button
          onClick={() => onNavigate(action.navigate)}
          className="text-[#C9A24D] text-sm font-semibold hover:text-[#b08d3d] transition-colors inline-flex items-center gap-1"
        >
          {action.text} <span className="text-lg">→</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="pt-4 pb-2">
        <h2 className="text-3xl font-bold text-gray-800 opacity-90 mb-2">
          Welcome to Admin Dashboard
        </h2>
        <p className="text-gray-400 font-medium max-w-2xl">
          Manage your website content, view submissions, and keep track of all administrative tasks.
        </p>
      </div>

      {/* Stats Grid - Icons are now passed correctly to avoid TS errors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Total Visitors"
          value={stats.totalVisitors}
        />
        <StatCard
          icon={MessageSquare}
          label="Admission Requests"
          value={stats.admissionRequests}
          action={{ text: "View Responses", navigate: "responses" }}
        />
        <StatCard
          icon={BookOpen}
          label="Active Courses"
          value={stats.coursesCount}
          action={{ text: "Manage Courses", navigate: "courses" }}
        />
        <StatCard
          icon={ImageIcon}
          label="Gallery Images"
          value={stats.galleryImages}
          showIconBg={true} // Matches the highlight in your dashboard image
          action={{ text: "Manage Gallery", navigate: "gallery" }}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-[#C9A24D]" />
            Recent Activities
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 border border-gray-50 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="w-2 h-2 rounded-full bg-[#C9A24D] mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-gray-800 font-semibold text-sm">{activity.message}</p>
                  <p className="text-gray-400 text-xs mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { label: "View New Submissions", color: "bg-purple-50 text-purple-700", nav: "responses", emoji: "📋" },
              { label: "Add Gallery Images", color: "bg-amber-50 text-amber-700", nav: "gallery", emoji: "🖼️" },
              { label: "Create New Course", color: "bg-green-50 text-green-700", nav: "courses", emoji: "📚" },
            ].map((btn, i) => (
              <button
                key={i}
                onClick={() => onNavigate(btn.nav)}
                className={`w-full ${btn.color} p-4 rounded-xl hover:opacity-80 transition font-bold text-sm text-left flex items-center gap-3`}
              >
                <span className="text-base">{btn.emoji}</span>
                {btn.label}
              </button>
            ))}
            <button
              onClick={onExitToSite}
              className="w-full bg-blue-50 text-blue-700 p-4 rounded-xl hover:opacity-80 transition font-bold text-sm text-left flex items-center gap-3"
            >
              <span className="text-base">🏠</span>
              Back to Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}