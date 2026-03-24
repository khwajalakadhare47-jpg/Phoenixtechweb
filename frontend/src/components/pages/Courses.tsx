import { Award, Monitor, Code, MessageSquare, Clock, Users, BookOpen, CheckCircle2, ArrowRight } from "lucide-react";
import { useAdmin } from "../../contexts/AdminContext";

type Page = "home" | "about" | "courses" | "admissions" | "gallery" | "contact";

interface CoursesProps {
  onNavigate: (page: Page) => void;
}

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

export function Courses({ onNavigate }: CoursesProps) {
  const { courses } = useAdmin();

  const getIcon = (iconType: string) => {
    const iconClass = { width: 32, height: 32, color: "#C9A24D" };
    switch (iconType) {
      case "Award": return <Award style={iconClass} />;
      case "Monitor": return <Monitor style={iconClass} />;
      case "Code": return <Code style={iconClass} />;
      case "MessageSquare": return <MessageSquare style={iconClass} />;
      default: return <Award style={iconClass} />;
    }
  };

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
          <div style={{ marginBottom: "24px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 20px",
              borderRadius: "100px", background: "rgba(201, 162, 77, 0.1)",
              border: "1px solid rgba(201, 162, 77, 0.2)", color: "#C9A24D",
              fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em",
              textTransform: "uppercase", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            }}>
              <BookOpen style={{ width: 14, height: 14 }} />
              Academic Programs
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
            }}>Courses</span>
          </h1>

          <p style={{
            fontSize: "clamp(16px, 1.8vw, 20px)", color: "rgba(255, 255, 255, 0.6)",
            lineHeight: 1.6, maxWidth: "680px", margin: "0 auto",
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          }}>
            Choose from our carefully designed syllabus to kickstart your career. We offer modern, industry-aligned training programs.
          </p>
        </div>
      </section>

      {/* ===== COURSES LIST ===== */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) 0", background: "#F7F8FA" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(32px, 4vw, 48px)" }}>
            {courses.length === 0 ? (
              <div style={{ textAlign: "center", padding: "64px 0", color: "#7A7A7A" }}>
                <p>No courses available at the moment. Please check back later.</p>
              </div>
            ) : (
              courses.map((course) => (
                <div key={course.id} style={{
                  background: "#FFFFFF", borderRadius: "24px", padding: "clamp(32px, 5vw, 48px)",
                  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.04)", border: "1px solid rgba(0, 0, 0, 0.04)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease", position: "relative",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 24px 60px rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.border = "1px solid rgba(201,162,77,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.04)";
                  e.currentTarget.style.border = "1px solid rgba(0, 0, 0, 0.04)";
                }}>
                  
                  {/* Floating Top-Right Accent */}
                  <div style={{
                    position: "absolute", top: 0, right: 0, width: "150px", height: "150px",
                    background: "radial-gradient(circle at top right, rgba(201,162,77,0.1), transparent 70%)",
                    pointerEvents: "none"
                  }} />

                  {/* Course Header */}
                  <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", marginBottom: "32px", flexWrap: "wrap" }}>
                    <div style={{
                      width: "80px", height: "80px", borderRadius: "20px",
                      background: "linear-gradient(135deg, rgba(201, 162, 77, 0.15), rgba(201, 162, 77, 0.05))",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      {getIcon(course.iconType)}
                    </div>
                    
                    <div style={{ flex: "1 1 min-content" }}>
                      <h2 style={{
                        fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 800, color: "#0F0F12",
                        letterSpacing: "-0.02em", marginBottom: "8px", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                      }}>
                        {course.title}
                      </h2>
                      <p style={{
                        fontSize: "16px", fontWeight: 600, color: "#C9A24D", marginBottom: "16px",
                        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                      }}>
                        {course.subtitle}
                      </p>
                      
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px",
                          color: "#7A7A7A", fontWeight: 500, fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                        }}>
                          <Clock style={{ width: 16, height: 16, color: "#C9A24D" }} />
                          {course.duration}
                        </span>
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px",
                          color: "#7A7A7A", fontWeight: 500, fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                        }}>
                          <Users style={{ width: 16, height: 16, color: "#C9A24D" }} />
                          {course.target}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div style={{ marginBottom: "32px" }}>
                    <p style={{
                      fontSize: "15px", color: "#4A4A4A", lineHeight: 1.7,
                      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                    }}>
                      {course.description}
                    </p>
                  </div>

                  {/* Highlights and Syllabus Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "32px", marginBottom: "40px" }}>
                    
                    {/* Highlights */}
                    <div style={{ background: "rgba(201, 162, 77, 0.03)", padding: "24px", borderRadius: "16px", border: "1px solid rgba(201,162,77,0.1)" }}>
                      <h3 style={{
                        fontSize: "18px", fontWeight: 700, color: "#0F0F12", marginBottom: "16px",
                        display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                      }}>
                        <CheckCircle2 style={{ width: 20, height: 20, color: "#C9A24D" }} />
                        Course Highlights
                      </h3>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {course.highlights.map((highlight, idx) => (
                          <li key={idx} style={{
                            display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "12px",
                            fontSize: "14px", color: "#4A4A4A", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                          }}>
                            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#C9A24D", marginTop: "8px", flexShrink: 0 }} />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Syllabus */}
                    <div style={{ background: "rgba(0, 0, 0, 0.02)", padding: "24px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)" }}>
                      <h3 style={{
                        fontSize: "18px", fontWeight: 700, color: "#0F0F12", marginBottom: "16px",
                        display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                      }}>
                        <BookOpen style={{ width: 20, height: 20, color: "#C9A24D" }} />
                        What You'll Learn
                      </h3>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {course.syllabus.map((topic, idx) => (
                          <li key={idx} style={{
                            display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "12px",
                            fontSize: "14px", color: "#4A4A4A", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                          }}>
                            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0F0F12", marginTop: "8px", flexShrink: 0 }} />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Enroll Call to Action */}
                  <div style={{ paddingTop: "32px", borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", justifyContent: "flex-end" }}>
                    <button
                      onClick={() => onNavigate("admissions")}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px",
                        borderRadius: "12px", background: "linear-gradient(135deg, #C9A24D, #E8C97D)",
                        color: "#0F0F12", fontWeight: 700, fontSize: "16px", transition: "transform 0.2s, box-shadow 0.2s",
                        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", boxShadow: "0 8px 24px rgba(201, 162, 77, 0.2)",
                        border: "none", cursor: "pointer"
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
                      Enroll Now
                      <ArrowRight style={{ width: 18, height: 18 }} />
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>

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
            Not Sure Which Course to Choose?
          </h2>
          <p style={{
            fontSize: "clamp(16px, 2vw, 18px)", color: "rgba(255, 255, 255, 0.6)",
            marginBottom: "40px", lineHeight: 1.6,
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          }}>
            Contact our advisory team for personalized guidance and course recommendations based on your goals.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
               onClick={() => onNavigate("contact")}
               style={{
                 display: "inline-flex", alignItems: "center", gap: "8px", padding: "16px 32px",
                 borderRadius: "12px", background: "transparent", border: "1px solid rgba(255,255,255,0.2)",
                 color: "#FFFFFF", fontWeight: 600, fontSize: "16px", transition: "all 0.2s",
                 fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", cursor: "pointer"
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.transform = "translateY(-2px)";
                 e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                 e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.transform = "translateY(0)";
                 e.currentTarget.style.background = "transparent";
                 e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
               }}
            >
              Contact Us Let's Talk
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}