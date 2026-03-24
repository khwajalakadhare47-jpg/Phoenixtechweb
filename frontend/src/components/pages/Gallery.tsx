import { useAdmin } from "../../contexts/AdminContext";
import { Camera, MapPin, ArrowRight } from "lucide-react";

/* ────────── Floating Particles Background ────────── */
function ParticleGrid() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(201, 162, 77, 0.08) 1px, transparent 1px)",
        backgroundSize: "40px 40px", opacity: 0.8,
      }} />
      <div style={{
        position: "absolute", top: "10%", right: "15%", width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(201, 162, 77, 0.08), transparent 70%)",
        borderRadius: "50%", filter: "blur(60px)", animation: "float 8s ease-in-out infinite",
      }} />
    </div>
  );
}

export function Gallery() {
  const { gallery } = useAdmin();

  return (
    <div style={{ background: "#FAFAFA" }}>
      {/* ===== HERO SECTION ===== */}
      <section style={{
        position: "relative",
        background: "linear-gradient(135deg, #0F0F12 0%, #1a1a2e 40%, #16213e 70%, #0F0F12 100%)",
        padding: "clamp(60px, 10vh, 120px) 0",
        display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
      }}>
        <ParticleGrid />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          {/* Badge */}
          <div style={{ marginBottom: "24px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 20px",
              borderRadius: "100px", background: "rgba(201, 162, 77, 0.1)",
              border: "1px solid rgba(201, 162, 77, 0.2)", color: "#C9A24D",
              fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em",
              textTransform: "uppercase", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            }}>
              <Camera style={{ width: 14, height: 14 }} />
              Our Campus
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, color: "#FFFFFF",
            lineHeight: 1.1, marginBottom: "24px", letterSpacing: "-0.03em",
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          }}>
            Explore Our{" "}
            <span style={{
              background: "linear-gradient(135deg, #C9A24D, #E8C97D, #C9A24D)",
              backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Gallery</span>
          </h1>

          <p style={{
            fontSize: "clamp(16px, 1.8vw, 20px)", color: "rgba(255, 255, 255, 0.6)",
            lineHeight: 1.6, maxWidth: "680px", margin: "0 auto",
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          }}>
            Take a visual tour through our state-of-the-art facilities, modern classrooms, and vibrant learning environment.
          </p>
        </div>
      </section>

      {/* ===== GALLERY GRID ===== */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) 0", background: "#FFFFFF", position: "relative", zIndex: 10 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {gallery.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px"
            }}>
              {gallery.map((image) => (
                <div key={image.id} style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: "#1a1a2e",
                  aspectRatio: "4/3",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(0,0,0,0.04)",
                  cursor: "pointer"
                }}
                className="group" // Used purely for tailwind-style group-hover behavior on the image tag if needed, but handles locally
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector("img");
                  const overlay = e.currentTarget.querySelector('.overlay');
                  if (img) img.style.transform = "scale(1.1)";
                  if (overlay) (overlay as HTMLElement).style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector("img");
                  const overlay = e.currentTarget.querySelector('.overlay');
                  if (img) img.style.transform = "scale(1)";
                  if (overlay) (overlay as HTMLElement).style.opacity = "0";
                }}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="overlay" style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(15,15,18,0.9) 0%, rgba(15,15,18,0.4) 50%, transparent 100%)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    display: "flex", alignItems: "flex-end", padding: "24px"
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: "18px", fontWeight: 700, color: "#FFFFFF",
                        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                        marginBottom: "4px"
                      }}>
                        {image.title || "Campus View"}
                      </h3>
                      <div style={{
                        width: "32px", height: "3px", background: "#C9A24D", borderRadius: "2px"
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <div style={{
                textAlign: "center", padding: "80px 0",
                background: "#F7F8FA", borderRadius: "24px", border: "1px dashed rgba(201,162,77,0.3)"
              }}>
                <div style={{
                  width: "64px", height: "64px", margin: "0 auto 20px", borderRadius: "16px",
                  background: "rgba(201, 162, 77, 0.1)", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Camera style={{ width: 32, height: 32, color: "#C9A24D" }} />
                </div>
                <h3 style={{
                  fontSize: "24px", fontWeight: 700, color: "#0F0F12", marginBottom: "12px",
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}>
                  No Images Yet
                </h3>
                <p style={{
                  fontSize: "16px", color: "#7A7A7A", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}>
                  Our gallery is currently being updated. Please check back soon!
                </p>
              </div>
          )}
        </div>
      </section>

      {/* ===== CTA FOOTER ===== */}
      <section style={{
        background: "linear-gradient(135deg, #0F0F12, #1a1a2e)",
        padding: "clamp(60px, 8vw, 100px) 0",
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: "#FFFFFF",
            marginBottom: "24px", letterSpacing: "-0.02em",
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          }}>
            Experience Our Facilities <span style={{ color: "#C9A24D" }}>in Person</span>
          </h2>
          <p style={{
            fontSize: "clamp(16px, 2vw, 18px)", color: "rgba(255, 255, 255, 0.6)",
            marginBottom: "40px", lineHeight: 1.6,
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          }}>
            Visit our Hadapsar center to see our state-of-the-art infrastructure and meet our expert faculty face-to-face.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Lane+No.+11-B,+Opposite+Etasha+Society,+Sayyad+Nagar,+Hadapsar,+Pune+411028"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px", padding: "16px 32px",
                borderRadius: "12px", background: "linear-gradient(135deg, #C9A24D, #E8C97D)",
                color: "#0F0F12", fontWeight: 700, fontSize: "16px", transition: "transform 0.2s, box-shadow 0.2s",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", boxShadow: "0 8px 24px rgba(201, 162, 77, 0.2)",
                textDecoration: "none"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(201, 162, 77, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(201, 162, 77, 0.2)";
              }}
            >
              <MapPin style={{ width: 18, height: 18 }} />
              Get Directions
              <ArrowRight style={{ width: 18, height: 18 }} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}