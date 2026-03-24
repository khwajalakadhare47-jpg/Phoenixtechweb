import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import logoImage from "../assets/logophoneix.png";

export function Footer() {
  return (
    <footer style={{
      background: "#0F0F12",
      color: "#FFFFFF",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle top gradient */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(201, 162, 77, 0.3), transparent)",
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ padding: "clamp(40px, 6vw, 64px) 16px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "clamp(32px, 4vw, 48px)" }}>
          {/* About Section */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
              <div style={{ position: "relative" }}>
                <div style={{
                  position: "absolute",
                  inset: "-3px",
                  background: "radial-gradient(circle, rgba(201, 162, 77, 0.15), transparent 70%)",
                  borderRadius: "50%",
                  filter: "blur(6px)",
                }} />
                <img
                  src={logoImage}
                  alt="Phoenix Tech Academy Logo"
                  style={{
                    height: "48px",
                    width: "48px",
                    objectFit: "contain",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </div>
              <div>
                <h3 style={{
                  color: "#FFFFFF",
                  fontSize: "17px",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}>
                  Phoenix Tech Academy
                </h3>
                <p style={{
                  color: "#C9A24D",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}>
                  From Ideas to Impact
                </p>
              </div>
            </div>
            <p style={{
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "14px",
              lineHeight: 1.7,
              maxWidth: "320px",
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            }}>
              Empowering students with computer skills and technology education in Hadapsar, Pune. Building careers since 2020.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "20px",
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            }}>
              Quick Links
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {["MS-CIT Course", "Basic Computer Course", "Coding Classes", "English Speaking"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "rgba(255, 255, 255, 0.5)",
                      fontSize: "14px",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#C9A24D";
                      e.currentTarget.style.paddingLeft = "4px";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
                      e.currentTarget.style.paddingLeft = "0";
                    }}
                  >
                    <ArrowRight style={{ width: 12, height: 12, opacity: 0.6 }} />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 style={{
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "20px",
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            }}>
              Contact Us
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "rgba(201, 162, 77, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <MapPin style={{ width: 16, height: 16, color: "#C9A24D" }} />
                </div>
                <span style={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}>
                  Lane No. 11-B, Opposite Etasha Society, Sayyad Nagar, Hadapsar, Pune 411028
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "rgba(201, 162, 77, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Phone style={{ width: 16, height: 16, color: "#C9A24D" }} />
                </div>
                <div style={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontSize: "13px",
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}>
                  <a href="tel:+918605601030" style={{ color: "inherit", textDecoration: "none", transition: "color 0.3s" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#C9A24D"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)"}
                  >86056 01030</a>
                  <span style={{ margin: "0 8px", opacity: 0.3 }}>|</span>
                  <a href="tel:+918007577648" style={{ color: "inherit", textDecoration: "none", transition: "color 0.3s" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#C9A24D"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)"}
                  >80075 77648</a>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "rgba(201, 162, 77, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Mail style={{ width: 16, height: 16, color: "#C9A24D" }} />
                </div>
                <a href="mailto:info@phoenix-tech.in" style={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontSize: "13px",
                  textDecoration: "none",
                  transition: "color 0.3s",
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#C9A24D"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)"}
                >
                  info@phoenix-tech.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          marginTop: "clamp(32px, 4vw, 48px)",
          paddingTop: "24px",
          textAlign: "center",
        }}>
          <p style={{
            color: "rgba(255, 255, 255, 0.3)",
            fontSize: "13px",
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          }}>
            &copy; 2026 Phoenix Tech Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}