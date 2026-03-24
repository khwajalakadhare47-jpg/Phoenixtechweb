import { Menu, X, LogIn, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import logoImage from "../assets/logophoneix.png";
import { useAdmin } from "../contexts/AdminContext";

type Page = "home" | "about" | "courses" | "admissions" | "gallery" | "contact" | "admin";

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Courses", id: "courses" },
    { name: "Admissions", id: "admissions" },
    { name: "Gallery", id: "gallery" },
    { name: "Contact", id: "contact" },
  ];

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: scrolled
          ? "rgba(15, 15, 18, 0.95)"
          : "rgba(15, 15, 18, 0.85)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: scrolled
          ? "1px solid rgba(201, 162, 77, 0.15)"
          : "1px solid rgba(255, 255, 255, 0.05)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: scrolled
          ? "0 8px 32px rgba(0, 0, 0, 0.4)"
          : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center" style={{ height: scrolled ? "64px" : "76px", transition: "height 0.3s ease" }}>
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer flex-shrink-0"
            onClick={() => handleNavigate("home")}
            style={{ gap: "12px" }}
          >
            <div style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <div style={{
                position: "absolute",
                inset: "-4px",
                background: "radial-gradient(circle, rgba(201, 162, 77, 0.2), transparent 70%)",
                borderRadius: "50%",
                filter: "blur(8px)",
              }} />
              <img
                src={logoImage}
                alt="Phoenix Tech Academy Logo"
                style={{
                  height: scrolled ? "38px" : "44px",
                  width: scrolled ? "38px" : "44px",
                  objectFit: "contain",
                  transition: "all 0.3s ease",
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              <span style={{
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: scrolled ? "16px" : "18px",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                transition: "font-size 0.3s ease",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              }}>
                Phoenix Tech Academy
              </span>
              <span style={{
                color: "#C9A24D",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                opacity: 0.9,
              }}>
                From Ideas to Impact
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center" style={{ gap: "4px" }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id as Page)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "8px",
                  transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                  fontSize: "14px",
                  fontWeight: currentPage === item.id ? 600 : 500,
                  letterSpacing: "0.01em",
                  color: currentPage === item.id ? "#C9A24D" : "rgba(255,255,255,0.75)",
                  background: currentPage === item.id ? "rgba(201, 162, 77, 0.1)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== item.id) {
                    e.currentTarget.style.color = "#FFFFFF";
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== item.id) {
                    e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {item.name}
                {currentPage === item.id && (
                  <span style={{
                    position: "absolute",
                    bottom: "2px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "20px",
                    height: "2px",
                    background: "linear-gradient(90deg, transparent, #C9A24D, transparent)",
                    borderRadius: "2px",
                  }} />
                )}
              </button>
            ))}

            {/* Divider */}
            <div style={{
              width: "1px",
              height: "24px",
              background: "rgba(255,255,255,0.1)",
              margin: "0 8px",
            }} />

            {/* Admin Button */}
            <button
              onClick={() => handleNavigate("admin")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 18px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.02em",
                color: isLoggedIn ? "#0F0F12" : "rgba(255,255,255,0.85)",
                background: isLoggedIn
                  ? "linear-gradient(135deg, #C9A24D, #E8C97D)"
                  : "rgba(255,255,255,0.06)",
                border: isLoggedIn ? "none" : "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              }}
              onMouseEnter={(e) => {
                if (!isLoggedIn) {
                  e.currentTarget.style.background = "rgba(201, 162, 77, 0.15)";
                  e.currentTarget.style.borderColor = "rgba(201, 162, 77, 0.3)";
                  e.currentTarget.style.color = "#C9A24D";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoggedIn) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                }
              }}
              title={isLoggedIn ? "Back to Admin Panel" : "Admin Login"}
            >
              <LogIn style={{ width: "15px", height: "15px" }} />
              {isLoggedIn ? "Admin Panel" : "Admin"}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              padding: "10px",
              borderRadius: "10px",
              background: mobileMenuOpen ? "rgba(201, 162, 77, 0.15)" : "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              color: mobileMenuOpen ? "#C9A24D" : "rgba(255,255,255,0.8)",
            }}
          >
            {mobileMenuOpen ? (
              <X style={{ width: "22px", height: "22px" }} />
            ) : (
              <Menu style={{ width: "22px", height: "22px" }} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div style={{
          maxHeight: mobileMenuOpen ? "600px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}>
          <nav className="lg:hidden" style={{
            paddingBottom: mobileMenuOpen ? "20px" : "0px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}>
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id as Page)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  textAlign: "left",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  fontSize: "15px",
                  fontWeight: currentPage === item.id ? 600 : 500,
                  color: currentPage === item.id ? "#C9A24D" : "rgba(255,255,255,0.8)",
                  background: currentPage === item.id ? "rgba(201, 162, 77, 0.1)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  animationDelay: `${index * 50}ms`,
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}
              >
                {item.name}
                <ChevronRight style={{
                  width: "16px",
                  height: "16px",
                  opacity: currentPage === item.id ? 1 : 0.3,
                  color: currentPage === item.id ? "#C9A24D" : "rgba(255,255,255,0.4)",
                }} />
              </button>
            ))}
            
            {/* Divider */}
            <div style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(201, 162, 77, 0.2), transparent)",
              margin: "8px 0",
            }} />

            {/* Mobile Admin Button */}
            <button
              onClick={() => handleNavigate("admin")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                textAlign: "left",
                padding: "14px 16px",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: 600,
                color: isLoggedIn ? "#0F0F12" : "#C9A24D",
                background: isLoggedIn
                  ? "linear-gradient(135deg, #C9A24D, #E8C97D)"
                  : "rgba(201, 162, 77, 0.08)",
                border: isLoggedIn ? "none" : "1px solid rgba(201, 162, 77, 0.2)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              }}
            >
              <LogIn style={{ width: "16px", height: "16px" }} />
              {isLoggedIn ? "Back to Admin Panel" : "Admin Login"}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}