import { useState } from "react";
import {
  LayoutDashboard, MessageSquare, Image as ImageIcon,
  BookOpen, Home, LogOut, X, ChevronDown,
} from "lucide-react";
import { useAdmin } from "../../contexts/AdminContext";
import logoImage from "../../assets/logophoneix.png";

interface AdminNavbarProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  onExitToSite: () => void;
}

const SECTION_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  responses: "Admission",
  gallery:   "Gallery",
  courses:   "Courses",
};

function LogoutModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div onClick={onCancel} style={{
      position: "fixed", inset: 0, zIndex: 99999,
      backgroundColor: "rgba(0,0,0,0.55)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 18, padding: "clamp(20px,5vw,32px)",
        maxWidth: 360, width: "100%",
        boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div style={{ background: "#fff1f2", borderRadius: 12, padding: 10, display: "inline-flex" }}>
            <LogOut style={{ width: 22, height: 22, color: "#e11d48" }} />
          </div>
          <button onClick={onCancel} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 4 }}>
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>
        <h3 style={{ fontWeight: 800, fontSize: 17, color: "#0F0F12", margin: "0 0 8px" }}>Sign out?</h3>
        <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6, margin: "0 0 24px" }}>
          You'll be returned to the login screen. Any unsaved changes will be lost.
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onCancel} style={{
            flex: 1, padding: "11px 0", borderRadius: 10,
            border: "1px solid #e5e7eb", background: "#f9fafb",
            color: "#374151", fontWeight: 600, fontSize: 14, cursor: "pointer",
          }}>Stay</button>
          <button onClick={onConfirm} style={{
            flex: 1, padding: "11px 0", borderRadius: 10,
            border: "none", background: "#e11d48",
            color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer",
          }}>Sign Out</button>
        </div>
      </div>
    </div>
  );
}

export function AdminNavbar({ currentSection, onNavigate, onExitToSite }: AdminNavbarProps) {
  const { logout, adminUsername, responses } = useAdmin();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);

  const handleLogoutConfirm = () => { setShowLogoutModal(false); logout(); };

  const newResponseCount = responses.filter((r) => r.status === "new").length;

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: 0 },
    { id: "responses", label: "Admission",  icon: MessageSquare,  badge: newResponseCount },
    { id: "gallery",   label: "Gallery",    icon: ImageIcon,       badge: 0 },
    { id: "courses",   label: "Courses",    icon: BookOpen,        badge: 0 },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {showLogoutModal && <LogoutModal onConfirm={handleLogoutConfirm} onCancel={() => setShowLogoutModal(false)} />}

      <style>{`
        @media (max-width: 639px) { .nav-desktop { display: none !important; } .nav-mobile-toggle { display: flex !important; } }
        @media (min-width: 640px) { .nav-desktop { display: flex !important; } .nav-mobile-toggle { display: none !important; } }
        @media (max-width: 767px) { .nav-username { display: none !important; } .nav-divider { display: none !important; } }
        @media (min-width: 768px) { .nav-username { display: flex !important; } .nav-divider { display: block !important; } }
        @media (max-width: 767px) { .nav-label-text { display: none !important; } }
        @media (min-width: 768px) { .nav-label-text { display: inline !important; } }
        @media (max-width: 1023px) { .nav-breadcrumb { display: none !important; } }
        @media (min-width: 1024px) { .nav-breadcrumb { display: flex !important; } }
        @media (max-width: 639px) { .nav-back-text { display: none !important; } }
        @media (min-width: 640px) { .nav-back-text { display: inline !important; } }
      `}</style>

      <nav style={{
        background: "#0F0F12", color: "#fff",
        borderBottom: "1px solid #1f2937",
        boxShadow: "0 2px 16px rgba(0,0,0,0.4)",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(12px,3vw,20px)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, gap: 8 }}>

            {/* ── Left: Brand ──────────────────────────────────────── */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, minWidth: 0 }}>
              <img src={logoImage} alt="Phoenix Logo"
                style={{ width: 32, height: 32, objectFit: "contain", flexShrink: 0 }} />
              <div style={{ lineHeight: 1, flexShrink: 0 }}>
                <span style={{ fontWeight: 800, fontSize: 13, color: "#fff", display: "block" }}>Phoenix</span>
                <span style={{ fontSize: 9, color: "#C9A24D", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>
                  Admin
                </span>
              </div>

              {/* Breadcrumb — hidden on tablet & below */}
              <div className="nav-breadcrumb" style={{ alignItems: "center", gap: 8, marginLeft: 10 }}>
                <span style={{ color: "#374151", fontSize: 18 }}>/</span>
                <span style={{
                  fontSize: 12, fontWeight: 700, color: "#C9A24D",
                  background: "rgba(201,162,77,0.12)", borderRadius: 6, padding: "3px 9px",
                }}>
                  {SECTION_LABELS[currentSection] ?? currentSection}
                </span>
              </div>
            </div>

            {/* ── Center: Desktop Pill Nav ──────────────────────────── */}
            <div className="nav-desktop" style={{
              alignItems: "center",
              background: "#1A1A1E", borderRadius: 999,
              padding: "3px", border: "1px solid #1f2937", gap: 2,
              flex: "0 1 auto", overflow: "hidden",
            }}>
              {menuItems.map(({ id, label, icon: Icon, badge }) => {
                const isActive = currentSection === id;
                return (
                  <div key={id} style={{ position: "relative" }}>
                    <button onClick={() => handleNavClick(id)} title={label} aria-label={label}
                      style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "7px 12px", borderRadius: 999, border: "none",
                        background: isActive ? "#C9A24D" : "transparent",
                        color: isActive ? "#0F0F12" : "#9ca3af",
                        fontWeight: isActive ? 700 : 500,
                        fontSize: 13, cursor: "pointer", transition: "all 0.2s", position: "relative",
                      }}>
                      <Icon style={{ width: 14, height: 14, flexShrink: 0 }} />
                      <span className="nav-label-text">{label}</span>
                      {badge > 0 && (
                        <span style={{
                          position: "absolute", top: 2, right: 2,
                          background: "#e11d48", color: "#fff", borderRadius: "50%",
                          width: 15, height: 15, fontSize: 9, fontWeight: 800,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          border: "2px solid #0F0F12", lineHeight: 1,
                        }}>
                          {badge > 9 ? "9+" : badge}
                        </span>
                      )}
                    </button>

                  </div>
                );
              })}
            </div>

            {/* ── Mobile Section label + hamburger ─────────────────── */}
            <button className="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen((v) => !v)}
              style={{
                display: "none", alignItems: "center", gap: 6,
                background: "#1A1A1E", borderRadius: 999, border: "1px solid #1f2937",
                padding: "7px 12px", cursor: "pointer", color: "#C9A24D",
                fontWeight: 700, fontSize: 13, flexShrink: 0,
              }}>
              {SECTION_LABELS[currentSection]}
              <ChevronDown style={{ width: 13, height: 13, transition: "transform 0.2s", transform: mobileMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
              {newResponseCount > 0 && (
                <span style={{
                  background: "#e11d48", color: "#fff", borderRadius: "50%",
                  width: 15, height: 15, fontSize: 9, fontWeight: 800,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {newResponseCount > 9 ? "9+" : newResponseCount}
                </span>
              )}
            </button>

            {/* ── Right: Username + Actions ────────────────────────── */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>

              <div className="nav-username" style={{ flexDirection: "column", alignItems: "flex-end", lineHeight: 1.2 }}>
                <span style={{ fontSize: 9, color: "#4b5563", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Logged in as
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#C9A24D" }}>
                  {adminUsername || "Admin"}
                </span>
              </div>

              <div className="nav-divider" style={{ width: 1, height: 24, background: "#1f2937" }} />

              <button onClick={onExitToSite} title="Back to Website" aria-label="Back to Website"
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "7px 12px", borderRadius: 999,
                  border: "1px solid #1f2937", background: "transparent",
                  color: "#9ca3af", fontSize: 13, fontWeight: 600, cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#1f2937"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9ca3af"; }}>
                <Home style={{ width: 14, height: 14 }} />
                <span className="nav-back-text">Back to Site</span>
              </button>

              <button onClick={() => setShowLogoutModal(true)} title="Sign Out" aria-label="Sign Out"
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "7px 12px", borderRadius: 999,
                  border: "1px solid #1f2937", background: "transparent",
                  color: "#9ca3af", fontSize: 13, fontWeight: 600, cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(225,29,72,0.12)"; e.currentTarget.style.borderColor = "#e11d48"; e.currentTarget.style.color = "#e11d48"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#1f2937"; e.currentTarget.style.color = "#9ca3af"; }}>
                <LogOut style={{ width: 14, height: 14 }} />
                <span className="nav-back-text">Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile dropdown menu ──────────────────────────────────── */}
        {mobileMenuOpen && (
          <div style={{
            background: "#111827", borderTop: "1px solid #1f2937",
            padding: "8px 16px 12px",
          }}>
            {menuItems.map(({ id, label, icon: Icon, badge }) => {
              const isActive = currentSection === id;
              return (
                <button key={id} onClick={() => handleNavClick(id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    width: "100%", padding: "10px 12px", borderRadius: 10,
                    border: "none", marginBottom: 4,
                    background: isActive ? "#C9A24D" : "transparent",
                    color: isActive ? "#0F0F12" : "#9ca3af",
                    fontWeight: isActive ? 700 : 500, fontSize: 14, cursor: "pointer",
                    textAlign: "left", position: "relative",
                  }}>
                  <Icon style={{ width: 16, height: 16, flexShrink: 0 }} />
                  {label}
                  {badge > 0 && (
                    <span style={{
                      marginLeft: "auto", background: "#e11d48", color: "#fff",
                      borderRadius: 999, padding: "1px 7px", fontSize: 10, fontWeight: 800,
                    }}>
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </nav>
    </>
  );
}