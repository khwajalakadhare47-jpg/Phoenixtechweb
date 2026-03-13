import {
  Users,
  MessageSquare,
  Image as ImageIcon,
  BookOpen,
  CalendarDays,
  ClipboardList,
  PlusSquare,
  Home,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AdminDashboardProps {
  onNavigate: (section: string) => void;
  onExitToSite: () => void;
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  /** Inline style object for the icon pill background */
  iconBg: string;
  /** Inline style hex for icon and link colour */
  iconHex: string;
  /** Inline style hex for the top border stripe */
  borderHex: string;
  trend?: { value: string; up: boolean };
  action?: { text: string; navigate: string };
  onNavigate?: (section: string) => void;
}

function StatCard({
  icon: Icon,
  label,
  value,
  iconBg,
  iconHex,
  borderHex,
  trend,
  action,
  onNavigate,
}: StatCardProps) {
  return (
    <div
      style={{ borderTop: `4px solid ${borderHex}` }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-lg transition-all duration-300"
    >
      {/* Top row: icon pill + trend badge */}
      <div className="flex justify-between items-start mb-4">
        <div
          style={{ backgroundColor: iconBg }}
          className="p-2.5 rounded-xl"
        >
          <Icon style={{ color: iconHex }} className="w-5 h-5" />
        </div>

        {trend && (
          <span
            style={{
              backgroundColor: trend.up ? "#f0fdf4" : "#fff1f2",
              color: trend.up ? "#16a34a" : "#e11d48",
            }}
            className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
          >
            {trend.up ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {trend.value}
          </span>
        )}
      </div>

      {/* Value & Label */}
      <h3 className="text-gray-500 text-sm font-medium mb-1">{label}</h3>
      <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
        {value.toLocaleString()}
      </p>

      {/* Action link */}
      {action && onNavigate && (
        <button
          onClick={() => onNavigate(action.navigate)}
          style={{ color: iconHex }}
          className="text-sm font-semibold inline-flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity"
        >
          {action.text} <span className="text-base">→</span>
        </button>
      )}
    </div>
  );
}

// ─── AdminDashboard ───────────────────────────────────────────────────────────

export function AdminDashboard({ onNavigate, onExitToSite }: AdminDashboardProps) {
  const stats = {
    totalVisitors: 1250,
    admissionRequests: 24,
    coursesCount: 8,
    galleryImages: 42,
  };

  const recentActivities = [
    {
      id: 1,
      type: "admission",
      message: "New admission request from John Doe",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "gallery",
      message: "Gallery updated with 5 new images",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      type: "course",
      message: "Web Development course created",
      timestamp: "1 day ago",
    },
    {
      id: 4,
      type: "admission",
      message: "New admission request from Jane Smith",
      timestamp: "2 days ago",
    },
  ];

  // Fully resolved config — no dynamic class names
  const activityConfig: Record<
    string,
    { Icon: React.ElementType; bgColor: string; iconColor: string; label: string }
  > = {
    admission: {
      Icon: MessageSquare,
      bgColor: "#ede9fe",   // purple-100 equivalent
      iconColor: "#7c3aed", // purple-600
      label: "Admission",
    },
    gallery: {
      Icon: ImageIcon,
      bgColor: "#fef3c7",   // amber-100
      iconColor: "#d97706", // amber-600
      label: "Gallery",
    },
    course: {
      Icon: BookOpen,
      bgColor: "#dcfce7",   // green-100
      iconColor: "#16a34a", // green-600
      label: "Course",
    },
  };

  return (
    <div className="space-y-5 sm:space-y-8">

      {/* ── Welcome Header ───────────────────────────────────────────── */}
      <div className="pt-4 pb-2">
        <h2 className="text-xl sm:text-3xl font-extrabold text-gray-800 mb-2">
          Welcome to{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #C9A24D 0%, #e8c87a 50%, #C9A24D 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Admin Dashboard
          </span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base font-medium max-w-2xl">
          Manage your website content, view submissions, and keep track of all
          administrative tasks.
        </p>
      </div>

      {/* ── Stat Cards ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <StatCard
          icon={Users}
          label="Total Visitors"
          value={stats.totalVisitors}
          iconBg="#dbeafe"
          iconHex="#2563eb"
          borderHex="#3b82f6"
          trend={{ value: "+12%", up: true }}
        />
        <StatCard
          icon={MessageSquare}
          label="Admission Requests"
          value={stats.admissionRequests}
          iconBg="#ede9fe"
          iconHex="#7c3aed"
          borderHex="#8b5cf6"
          trend={{ value: "+4%", up: true }}
          action={{ text: "View Responses", navigate: "responses" }}
          onNavigate={onNavigate}
        />
        <StatCard
          icon={BookOpen}
          label="Active Courses"
          value={stats.coursesCount}
          iconBg="#dcfce7"
          iconHex="#16a34a"
          borderHex="#22c55e"
          trend={{ value: "-1%", up: false }}
          action={{ text: "Manage Courses", navigate: "courses" }}
          onNavigate={onNavigate}
        />
        <StatCard
          icon={ImageIcon}
          label="Gallery Images"
          value={stats.galleryImages}
          iconBg="#fef3c7"
          iconHex="#d97706"
          borderHex="#f59e0b"
          trend={{ value: "+8%", up: true }}
          action={{ text: "Manage Gallery", navigate: "gallery" }}
          onNavigate={onNavigate}
        />
      </div>

      {/* ── Content Grid ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">

        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
            <CalendarDays className="w-5 h-5" style={{ color: "#C9A24D" }} />
            Recent Activities
          </h3>
          <div className="space-y-3">
            {recentActivities.map((activity) => {
              const cfg = activityConfig[activity.type] ?? activityConfig.admission;
              const ActivityIcon = cfg.Icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all duration-200"
                >
                  {/* Coloured icon badge */}
                  <div
                    style={{ backgroundColor: cfg.bgColor }}
                    className="p-2 rounded-lg flex-shrink-0 mt-0.5"
                  >
                    <ActivityIcon
                      style={{ color: cfg.iconColor }}
                      className="w-4 h-4"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 font-semibold text-sm">
                      {activity.message}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{activity.timestamp}</p>
                  </div>

                  {/* Type pill */}
                  <span
                    style={{
                      backgroundColor: cfg.bgColor,
                      color: cfg.iconColor,
                    }}
                    className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full flex-shrink-0 self-center hidden sm:inline-flex"
                  >
                    {cfg.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-5">Quick Actions</h3>
          <div className="space-y-3">

            {/* View New Submissions */}
            <button
              onClick={() => onNavigate("responses")}
              style={{ backgroundColor: "#f5f3ff", color: "#6d28d9" }}
              className="w-full p-4 rounded-xl font-bold text-sm text-left flex items-center gap-3 hover:opacity-90 transition-all duration-200"
            >
              <span
                style={{ backgroundColor: "#ede9fe" }}
                className="p-1.5 rounded-lg flex-shrink-0"
              >
                <ClipboardList style={{ color: "#7c3aed" }} className="w-4 h-4" />
              </span>
              View New Submissions
            </button>

            {/* Add Gallery Images */}
            <button
              onClick={() => onNavigate("gallery")}
              style={{ backgroundColor: "#fffbeb", color: "#b45309" }}
              className="w-full p-4 rounded-xl font-bold text-sm text-left flex items-center gap-3 hover:opacity-90 transition-all duration-200"
            >
              <span
                style={{ backgroundColor: "#fef3c7" }}
                className="p-1.5 rounded-lg flex-shrink-0"
              >
                <ImageIcon style={{ color: "#d97706" }} className="w-4 h-4" />
              </span>
              Add Gallery Images
            </button>

            {/* Create New Course */}
            <button
              onClick={() => onNavigate("courses")}
              style={{ backgroundColor: "#f0fdf4", color: "#166534" }}
              className="w-full p-4 rounded-xl font-bold text-sm text-left flex items-center gap-3 hover:opacity-90 transition-all duration-200"
            >
              <span
                style={{ backgroundColor: "#dcfce7" }}
                className="p-1.5 rounded-lg flex-shrink-0"
              >
                <PlusSquare style={{ color: "#16a34a" }} className="w-4 h-4" />
              </span>
              Create New Course
            </button>

            {/* Back to Website */}
            <button
              onClick={onExitToSite}
              style={{ backgroundColor: "#eff6ff", color: "#1d4ed8" }}
              className="w-full p-4 rounded-xl font-bold text-sm text-left flex items-center gap-3 hover:opacity-90 transition-all duration-200"
            >
              <span
                style={{ backgroundColor: "#dbeafe" }}
                className="p-1.5 rounded-lg flex-shrink-0"
              >
                <Home style={{ color: "#2563eb" }} className="w-4 h-4" />
              </span>
              Back to Website
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}