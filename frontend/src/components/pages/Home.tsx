import { Award, Laptop, Code, MessageSquare, TrendingUp, Monitor, GraduationCap, Wrench, BookMarked, ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { useAdmin, Course } from "../../contexts/AdminContext";
import { Page } from "../../App";
import { useEffect, useState } from "react";

interface HomeProps {
  onNavigate: (page: Page) => void;
}

/* ────────── Floating Particles Background ────────── */
function ParticleGrid() {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      pointerEvents: "none",
    }}>
      {/* Grid dots */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(201, 162, 77, 0.08) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        opacity: 0.8,
      }} />
      {/* Floating orb 1 */}
      <div style={{
        position: "absolute",
        top: "10%",
        right: "15%",
        width: "400px",
        height: "400px",
        background: "radial-gradient(circle, rgba(201, 162, 77, 0.08), transparent 70%)",
        borderRadius: "50%",
        filter: "blur(60px)",
        animation: "float 8s ease-in-out infinite",
      }} />
      {/* Floating orb 2 */}
      <div style={{
        position: "absolute",
        bottom: "20%",
        left: "10%",
        width: "300px",
        height: "300px",
        background: "radial-gradient(circle, rgba(99, 102, 241, 0.06), transparent 70%)",
        borderRadius: "50%",
        filter: "blur(50px)",
        animation: "float 10s ease-in-out infinite reverse",
      }} />
    </div>
  );
}

export function Home({ onNavigate }: HomeProps) {
  const { courses } = useAdmin();
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  const getIcon = (iconType: string, size = 24, color = "#C9A24D") => {
    const props = { style: { width: size, height: size, color } };
    switch (iconType) {
      case "Award": return <Award {...props} />;
      case "Laptop": return <Laptop {...props} />;
      case "Code": return <Code {...props} />;
      case "MessageSquare": return <MessageSquare {...props} />;
      default: return <TrendingUp {...props} />;
    }
  };

  const features = [
    { icon: <Monitor style={{ width: 28, height: 28, color: "#C9A24D" }} />, title: "Modern Labs", desc: "State-of-the-art computer labs with the latest hardware and software" },
    { icon: <GraduationCap style={{ width: 28, height: 28, color: "#C9A24D" }} />, title: "Expert Faculty", desc: "Experienced instructors with industry expertise and passion for teaching" },
    { icon: <Wrench style={{ width: 28, height: 28, color: "#C9A24D" }} />, title: "Hands-on Training", desc: "Practical, project-based learning approach for real-world skills" },
    { icon: <BookMarked style={{ width: 28, height: 28, color: "#C9A24D" }} />, title: "Industry Curriculum", desc: "Courses designed to match current industry standards and demands" },
  ];

  return (
    <div style={{ background: "#FAFAFA" }}>
      {/* ===== KEYFRAME ANIMATIONS ===== */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(3deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(201, 162, 77, 0.15); }
          50% { box-shadow: 0 0 40px rgba(201, 162, 77, 0.3); }
        }
        .hero-title { 
          animation: fadeSlideUp 0.8s ease-out forwards; 
          opacity: 0;
        }
        .hero-subtitle { 
          animation: fadeSlideUp 0.8s ease-out 0.2s forwards; 
          opacity: 0;
        }
        .hero-cta { 
          animation: fadeSlideUp 0.8s ease-out 0.4s forwards; 
          opacity: 0;
        }
        .hero-image { 
          animation: scaleIn 1s ease-out 0.3s forwards; 
          opacity: 0;
        }
        .course-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(201, 162, 77, 0.15) !important;
        }
        .feature-card:hover {
          transform: translateY(-4px) !important;
          background: rgba(201, 162, 77, 0.04) !important;
          border-color: rgba(201, 162, 77, 0.2) !important;
        }
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(201, 162, 77, 0.4);
        }
        .cta-secondary:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.12) !important;
        }
        @media (max-width: 768px) {
          .hero-badge { font-size: 12px !important; padding: 6px 14px !important; }
        }
      `}</style>

      {/* ===== HERO SECTION ===== */}
      <section style={{
        position: "relative",
        background: "linear-gradient(135deg, #0F0F12 0%, #1a1a2e 40%, #16213e 70%, #0F0F12 100%)",
        minHeight: "min(92vh, 900px)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}>
        <ParticleGrid />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          paddingTop: "clamp(40px, 8vh, 80px)",
          paddingBottom: "clamp(60px, 10vh, 100px)",
        }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(32px, 5vw, 72px)", alignItems: "center" }}>
            {/* Left Content */}
            <div style={{ order: 2, display: "flex", flexDirection: "column", gap: "0" }}>
              {heroVisible && (
                <>
                  {/* Badge */}
                  <div className="hero-title" style={{ marginBottom: "24px" }}>
                    <span className="hero-badge" style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 20px",
                      borderRadius: "100px",
                      background: "rgba(201, 162, 77, 0.1)",
                      border: "1px solid rgba(201, 162, 77, 0.2)",
                      color: "#C9A24D",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                    }}>
                      <Sparkles style={{ width: 14, height: 14 }} />
                      Hadapsar's Leading Tech Academy
                    </span>
                  </div>

                  {/* Heading */}
                  <h1 className="hero-title" style={{
                    fontSize: "clamp(36px, 5.5vw, 64px)",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    lineHeight: 1.1,
                    marginBottom: "24px",
                    letterSpacing: "-0.03em",
                    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                  }}>
                    Transform Your Future{" "}
                    <br />
                    With{" "}
                    <span style={{
                      background: "linear-gradient(135deg, #C9A24D, #E8C97D, #C9A24D)",
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      animation: "shimmer 3s linear infinite",
                    }}>
                      Technology
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <p className="hero-subtitle" style={{
                    fontSize: "clamp(15px, 1.8vw, 18px)",
                    color: "rgba(255, 255, 255, 0.6)",
                    lineHeight: 1.7,
                    marginBottom: "36px",
                    maxWidth: "520px",
                    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                  }}>
                    Empowering students with essential computer skills and technology education. Join Phoenix Tech Academy in Hadapsar, Pune and build the career you deserve.
                  </p>

                  {/* CTA Buttons */}
                  <div className="hero-cta" style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                  }}>
                    <button
                      className="cta-primary"
                      onClick={() => onNavigate("admissions")}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "16px 32px",
                        borderRadius: "14px",
                        background: "linear-gradient(135deg, #C9A24D, #D4AF61)",
                        color: "#0F0F12",
                        fontSize: "15px",
                        fontWeight: 700,
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        boxShadow: "0 8px 30px rgba(201, 162, 77, 0.3)",
                        letterSpacing: "0.01em",
                        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                      }}
                    >
                      Enquire Now
                      <ArrowRight style={{ width: 18, height: 18 }} />
                    </button>
                    <button
                      className="cta-secondary"
                      onClick={() => onNavigate("courses")}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "16px 32px",
                        borderRadius: "14px",
                        background: "rgba(255, 255, 255, 0.06)",
                        color: "#FFFFFF",
                        fontSize: "15px",
                        fontWeight: 600,
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        cursor: "pointer",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        letterSpacing: "0.01em",
                        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                      }}
                    >
                      View Courses
                      <ChevronRight style={{ width: 18, height: 18 }} />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Right - Hero Image */}
            <div className="hero-image" style={{
              order: 1,
              position: "relative",
            }}>
              {/* Glow effect */}
              <div style={{
                position: "absolute",
                inset: "-20px",
                background: "radial-gradient(ellipse at center, rgba(201, 162, 77, 0.12), transparent 70%)",
                borderRadius: "32px",
                filter: "blur(30px)",
              }} />
              
              {/* Main image card */}
              <div style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid rgba(201, 162, 77, 0.15)",
                animation: "pulse-glow 4s ease-in-out infinite",
              }}>
                <img
                  src="https://images.unsplash.com/photo-1723987135977-ae935608939e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGNsYXNzcm9vbSUyMHN0dWRlbnRzJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzcwMjExNzIwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Students learning computer skills at Phoenix Tech Academy"
                  style={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                {/* Image overlay gradient */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 50%, rgba(15, 15, 18, 0.4))",
                }} />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ===== COURSES SECTION ===== */}
      <section style={{ padding: "clamp(48px, 8vw, 96px) 0", background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: "clamp(40px, 5vw, 64px)" }}>
            <span style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "100px",
              background: "rgba(201, 162, 77, 0.08)",
              border: "1px solid rgba(201, 162, 77, 0.15)",
              color: "#C9A24D",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "16px",
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            }}>
              What We Offer
            </span>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              color: "#0F0F12",
              letterSpacing: "-0.03em",
              marginBottom: "16px",
              lineHeight: 1.2,
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            }}>
              Our Professional{" "}
              <span style={{ color: "#C9A24D" }}>Courses</span>
            </h2>
            <p style={{
              fontSize: "clamp(14px, 1.5vw, 16px)",
              color: "#7A7A7A",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.7,
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            }}>
              Choose from our range of professional courses designed to build your skills and advance your career
            </p>
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "24px" }}>
            {courses.slice(0, 4).map((course: Course, index: number) => (
              <div
                key={course.id || index}
                className="course-card"
                style={{
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  padding: "28px 24px",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                }}
                onClick={() => onNavigate("courses")}
              >
                {/* Accent border top */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "linear-gradient(90deg, #C9A24D, #E8C97D)",
                  borderRadius: "20px 20px 0 0",
                }} />

                {/* Icon */}
                <div style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  background: "rgba(201, 162, 77, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}>
                  {getIcon(course.iconType, 26, "#C9A24D")}
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#0F0F12",
                  marginBottom: "8px",
                  lineHeight: 1.3,
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}>
                  {course.title}
                </h3>

                {/* Duration badge */}
                <span style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: "100px",
                  background: "rgba(201, 162, 77, 0.08)",
                  color: "#C9A24D",
                  fontSize: "12px",
                  fontWeight: 600,
                  marginBottom: "12px",
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}>
                  {course.duration}
                </span>

                {/* Description */}
                <p style={{
                  fontSize: "13px",
                  color: "#7A7A7A",
                  lineHeight: 1.6,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}>
                  {course.description}
                </p>
              </div>
            ))}
          </div>

          {/* Explore All CTA */}
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <button
              onClick={() => onNavigate("courses")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 36px",
                borderRadius: "14px",
                background: "transparent",
                color: "#C9A24D",
                fontSize: "15px",
                fontWeight: 600,
                border: "2px solid #C9A24D",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#C9A24D";
                e.currentTarget.style.color = "#0F0F12";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(201, 162, 77, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#C9A24D";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Explore All {courses.length} Courses
              <ArrowRight style={{ width: 18, height: 18 }} />
            </button>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US / INFRASTRUCTURE ===== */}
      <section style={{
        padding: "clamp(48px, 8vw, 96px) 0",
        background: "linear-gradient(180deg, #FAFAFA, #F0F0F5)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle background pattern */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(201, 162, 77, 0.03) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: "relative" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(32px, 5vw, 64px)", alignItems: "center" }}>
            {/* Left - Image */}
            <div style={{ position: "relative" }}>
              <div style={{
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 24px 80px rgba(0, 0, 0, 0.1)",
                position: "relative",
              }}>
                <img
                  src="https://images.unsplash.com/photo-1764720572930-eb63afd14b06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjbGFzc3Jvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzAxNDk1NTR8MA"
                  alt="Modern infrastructure at Phoenix Tech Academy"
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* Decorative element */}
              <div style={{
                position: "absolute",
                top: "-16px",
                left: "-16px",
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, rgba(201, 162, 77, 0.15), rgba(201, 162, 77, 0.05))",
                border: "1px solid rgba(201, 162, 77, 0.15)",
                zIndex: -1,
              }} />
              <div style={{
                position: "absolute",
                bottom: "-12px",
                right: "-12px",
                width: "60px",
                height: "60px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, rgba(201, 162, 77, 0.1), transparent)",
                zIndex: -1,
              }} />
            </div>

            {/* Right - Content */}
            <div>
              <span style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: "100px",
                background: "rgba(201, 162, 77, 0.08)",
                border: "1px solid rgba(201, 162, 77, 0.15)",
                color: "#C9A24D",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "16px",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              }}>
                Why Choose Us
              </span>
              <h2 style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 800,
                color: "#0F0F12",
                letterSpacing: "-0.03em",
                marginBottom: "16px",
                lineHeight: 1.2,
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              }}>
                World-Class{" "}
                <span style={{ color: "#C9A24D" }}>Infrastructure</span>
              </h2>
              <p style={{
                fontSize: "clamp(14px, 1.5vw, 16px)",
                color: "#7A7A7A",
                lineHeight: 1.7,
                marginBottom: "32px",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              }}>
                Our state-of-the-art facilities provide the perfect environment for learning and growth. Every aspect is designed to help you succeed.
              </p>

              {/* Feature Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="feature-card"
                    style={{
                      padding: "20px",
                      borderRadius: "16px",
                      background: "#FFFFFF",
                      border: "1px solid rgba(0, 0, 0, 0.06)",
                      transition: "all 0.3s ease",
                      cursor: "default",
                    }}
                  >
                    <div style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "14px",
                      background: "rgba(201, 162, 77, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "14px",
                    }}>
                      {feature.icon}
                    </div>
                    <h3 style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#0F0F12",
                      marginBottom: "6px",
                      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                    }}>
                      {feature.title}
                    </h3>
                    <p style={{
                      fontSize: "12px",
                      color: "#7A7A7A",
                      lineHeight: 1.6,
                      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                    }}>
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section style={{
        background: "linear-gradient(135deg, #0F0F12 0%, #1a1a2e 50%, #0F0F12 100%)",
        padding: "clamp(48px, 8vw, 80px) 0",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "400px",
          background: "radial-gradient(circle, rgba(201, 162, 77, 0.1), transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{
          position: "relative",
          textAlign: "center",
        }}>
          <h2 style={{
            fontSize: "clamp(24px, 4vw, 42px)",
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-0.03em",
            marginBottom: "16px",
            lineHeight: 1.2,
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          }}>
            Ready to Start Your{" "}
            <span style={{
              background: "linear-gradient(135deg, #C9A24D, #E8C97D)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Tech Journey
            </span>
            ?
          </h2>
          <p style={{
            fontSize: "clamp(14px, 1.5vw, 17px)",
            color: "rgba(255, 255, 255, 0.55)",
            maxWidth: "500px",
            margin: "0 auto 36px",
            lineHeight: 1.7,
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          }}>
            Join hundreds of students who have transformed their careers through our professional courses.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <button
              onClick={() => onNavigate("admissions")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 36px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #C9A24D, #D4AF61)",
                color: "#0F0F12",
                fontSize: "15px",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 30px rgba(201, 162, 77, 0.3)",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(201, 162, 77, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(201, 162, 77, 0.3)";
              }}
            >
              Enquire Now
              <ArrowRight style={{ width: 18, height: 18 }} />
            </button>
            <button
              onClick={() => onNavigate("contact")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 36px",
                borderRadius: "14px",
                background: "rgba(255, 255, 255, 0.06)",
                color: "#FFFFFF",
                fontSize: "15px",
                fontWeight: 600,
                border: "1px solid rgba(255, 255, 255, 0.12)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Contact Us
              <ChevronRight style={{ width: 18, height: 18 }} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}