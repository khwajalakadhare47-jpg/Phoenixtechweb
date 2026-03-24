import { Award, Target, Eye, Heart, BookOpen, ShieldCheck, Briefcase } from "lucide-react";

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

export function About() {
  const values = [
    { icon: <Heart style={{ width: 24, height: 24, color: "#C9A24D" }} />, title: "Student-Centric", desc: "Every decision we make prioritizes the learning experience and success of our students." },
    { icon: <Award style={{ width: 24, height: 24, color: "#C9A24D" }} />, title: "Excellence", desc: "We maintain the highest standards in curriculum, teaching methods, and student outcomes." },
    { icon: <ShieldCheck style={{ width: 24, height: 24, color: "#C9A24D" }} />, title: "Integrity", desc: "We build trust through honest communication, transparent processes, and ethical practices." },
    { icon: <Briefcase style={{ width: 24, height: 24, color: "#C9A24D" }} />, title: "Industry-Ready", desc: "Our programs are designed to equip students with practical skills demanded by the market." },
  ];

  return (
    <div style={{ background: "#FAFAFA" }}>
      {/* ===== HEADER / HERO SECTION ===== */}
      <section style={{
        position: "relative",
        background: "linear-gradient(135deg, #0F0F12 0%, #1a1a2e 40%, #16213e 70%, #0F0F12 100%)",
        padding: "clamp(60px, 10vh, 120px) 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        <ParticleGrid />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}>
          {/* Badge */}
          <div style={{ marginBottom: "24px" }}>
            <span style={{
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
              textTransform: "uppercase",
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            }}>
              <BookOpen style={{ width: 14, height: 14 }} />
              Our Story
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1.1,
            marginBottom: "24px",
            letterSpacing: "-0.03em",
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          }}>
            About{" "}
            <span style={{
              background: "linear-gradient(135deg, #C9A24D, #E8C97D, #C9A24D)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Phoenix Tech Academy
            </span>
          </h1>

          <p style={{
            fontSize: "clamp(16px, 1.8vw, 20px)",
            color: "rgba(255, 255, 255, 0.6)",
            lineHeight: 1.6,
            maxWidth: "680px",
            margin: "0 auto",
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          }}>
            Empowering minds through quality education and technology training in Hadapsar, Pune. Building careers since 2020.
          </p>
        </div>
      </section>

      {/* ===== WHO WE ARE SECTION ===== */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) 0", background: "#FFFFFF", position: "relative" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(40px, 6vw, 80px)", alignItems: "center" }}>
            {/* Left Content */}
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
                Introduction
              </span>
              <h2 style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 800,
                color: "#0F0F12",
                letterSpacing: "-0.03em",
                marginBottom: "24px",
                lineHeight: 1.2,
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              }}>
                Who We <span style={{ color: "#C9A24D" }}>Are</span>
              </h2>
              <div style={{
                fontSize: "16px",
                color: "#4A4A4A",
                lineHeight: 1.8,
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              }}>
                <p>
                  Phoenix Tech Academy is a premier computer and skill development institute located in Hadapsar, Pune. We are dedicated to providing quality education and training to students, professionals, and individuals seeking to enhance their computer skills.
                </p>
                <div style={{ 
                  padding: "24px", 
                  borderRadius: "16px", 
                  background: "rgba(201, 162, 77, 0.05)",
                  borderLeft: "4px solid #C9A24D"
                }}>
                  <p style={{ color: "#0F0F12", fontWeight: 500 }}>
                    As an authorized training center affiliated with MKCL (Maharashtra Knowledge Corporation Limited), we offer government-approved MS-CIT certification along with other professional courses designed to meet industry standards.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div style={{ position: "relative" }}>
               {/* Pattern Background */}
              <div style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                bottom: "20px",
                left: "20px",
                background: "repeating-linear-gradient(45deg, rgba(201,162,77,0.1) 0, rgba(201,162,77,0.1) 2px, transparent 2px, transparent 10px)",
                borderRadius: "24px",
                zIndex: 0,
              }} />
              <div style={{
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 24px 80px rgba(0, 0, 0, 0.1)",
                position: "relative",
                zIndex: 1,
              }}>
                <img
                  src="https://images.unsplash.com/photo-1763568258299-0bac211f204e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwZWR1Y2F0aW9uJTIwY29kaW5nfGVufDF8fHx8MTc3MDIxMTcyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Technology education"
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MISSION & VISION SECTION ===== */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) 0", background: "#F7F8FA" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "24px" }}>
            {/* Mission Card */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: "24px",
              padding: "clamp(32px, 5vw, 48px)",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.04)",
              border: "1px solid rgba(0, 0, 0, 0.04)",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, rgba(201, 162, 77, 0.15), rgba(201, 162, 77, 0.05))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
              }}>
                <Target style={{ width: 32, height: 32, color: "#C9A24D" }} />
              </div>
              <h3 style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#0F0F12",
                marginBottom: "16px",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              }}>
                Our Mission
              </h3>
              <p style={{
                fontSize: "15px",
                color: "#4A4A4A",
                lineHeight: 1.7,
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              }}>
                To provide accessible, affordable, and high-quality computer education and skill development training that empowers individuals to achieve their full potential in the digital world. We strive to bridge the gap between traditional education and industry requirements through practical, hands-on training.
              </p>
            </div>

            {/* Vision Card */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: "24px",
              padding: "clamp(32px, 5vw, 48px)",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.04)",
              border: "1px solid rgba(0, 0, 0, 0.04)",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #C9A24D, #E8C97D)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
              }}>
                <Eye style={{ width: 32, height: 32, color: "#0F0F12" }} />
              </div>
              <h3 style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#0F0F12",
                marginBottom: "16px",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              }}>
                Our Vision
              </h3>
              <p style={{
                fontSize: "15px",
                color: "#4A4A4A",
                lineHeight: 1.7,
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              }}>
                To become the leading computer education institute in Pune, recognized for excellence in teaching, innovation in curriculum, and success of our students. We envision a future where every individual has the digital skills necessary to thrive in an increasingly technology-driven world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CORE VALUES SECTION ===== */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) 0", background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 64px)" }}>
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
              Our Principles
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
              Core <span style={{ color: "#C9A24D" }}>Values</span>
            </h2>
            <p style={{
              fontSize: "clamp(15px, 1.5vw, 16px)",
              color: "#7A7A7A",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.7,
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            }}>
              The guiding principles that shape our teaching methods and interactions with students.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "24px" }}>
            {values.map((val, index) => (
              <div key={index} style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "32px 24px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.03)",
                transition: "all 0.3s ease",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.borderColor = "rgba(201,162,77,0.3)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.03)";
              }}>
                <div style={{
                  width: "56px",
                  height: "56px",
                  margin: "0 auto 20px",
                  borderRadius: "14px",
                  background: "rgba(201, 162, 77, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {val.icon}
                </div>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#0F0F12",
                  marginBottom: "12px",
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}>
                  {val.title}
                </h3>
                <p style={{
                  fontSize: "14px",
                  color: "#7A7A7A",
                  lineHeight: 1.6,
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}>
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}