import { CheckCircle2, FileText, Calendar, UserCheck, ArrowRight, ShieldCheck } from "lucide-react";
import { EnquiryForm } from "../EnquiryForm";

/* ────────── Floating Particles Background ────────── */
function ParticleGrid() {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      pointerEvents: "none",
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(201, 162, 77, 0.08) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        opacity: 0.8,
      }} />
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
    </div>
  );
}

export function Admissions() {
  const steps = [
    {
      icon: <CheckCircle2 style={{ width: 28, height: 28, color: "#C9A24D" }} />,
      title: "Fill Enquiry Form",
      description: "Complete the student enquiry form below with your details"
    },
    {
      icon: <FileText style={{ width: 28, height: 28, color: "#C9A24D" }} />,
      title: "Submit Documents",
      description: "Upload the required documents for verification"
    },
    {
      icon: <Calendar style={{ width: 28, height: 28, color: "#C9A24D" }} />,
      title: "Schedule Interview",
      description: "We will schedule an interview with you"
    },
    {
      icon: <UserCheck style={{ width: 28, height: 28, color: "#C9A24D" }} />,
      title: "Start Learning",
      description: "Begin your journey with us and achieve your goals"
    }
  ];

  return (
    <div style={{ background: "#FAFAFA" }}>
      {/* ===== HERO SECTION ===== */}
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
              <ShieldCheck style={{ width: 14, height: 14 }} />
              Enrollment Center
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
            Join{" "}
            <span style={{
              background: "linear-gradient(135deg, #C9A24D, #E8C97D, #C9A24D)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Phoenix Tech
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
            Start your learning journey with Phoenix Tech Academy today. Our streamlined admission procedure ensures a smooth enrollment.
          </p>
        </div>
      </section>

      {/* ===== ADMISSION PROCESS ===== */}
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
              How It Works
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
              Simple <span style={{ color: "#C9A24D" }}>Admission Process</span>
            </h2>
            <p style={{
              fontSize: "clamp(15px, 1.5vw, 16px)",
              color: "#7A7A7A",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.7,
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            }}>
              Getting started is easy - just follow these four simple steps to enroll in your desired course.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "24px" }}>
            {steps.map((step, index) => (
              <div key={index} style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "32px 24px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.03)",
                transition: "all 0.3s ease",
                textAlign: "center",
                position: "relative",
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
                {/* Step Number Badge */}
                <div style={{
                  position: "absolute",
                  top: "-12px",
                  right: "-12px",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #C9A24D, #E8C97D)",
                  color: "#0F0F12",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  boxShadow: "0 4px 12px rgba(201, 162, 77, 0.3)",
                }}>
                  {index + 1}
                </div>

                <div style={{
                  width: "64px",
                  height: "64px",
                  margin: "0 auto 20px",
                  borderRadius: "16px",
                  background: "rgba(201, 162, 77, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {step.icon}
                </div>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#0F0F12",
                  marginBottom: "12px",
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: "14px",
                  color: "#7A7A7A",
                  lineHeight: 1.6,
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REQUIREMENTS SECTION ===== */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) 0", background: "#F7F8FA" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 64px)" }}>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              color: "#0F0F12",
              letterSpacing: "-0.03em",
              marginBottom: "16px",
              lineHeight: 1.2,
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            }}>
              Admission <span style={{ color: "#C9A24D" }}>Requirements</span>
            </h2>
          </div>
          
          <div style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            padding: "clamp(32px, 5vw, 48px)",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(0, 0, 0, 0.04)",
          }}>
            <div className="space-y-6">
              {[
                { title: "For MS-CIT", desc: "Basic knowledge of English, Age 14+ years" },
                { title: "For Basic Computer Course", desc: "No prior knowledge required, All ages welcome" },
                { title: "For Coding Classes", desc: "Students from Class 6 to 12, Interest in programming" },
                { title: "For English Speaking", desc: "All age groups, Basic English understanding helpful" }
              ].map((req, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "rgba(201, 162, 77, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}>
                    <CheckCircle2 style={{ width: 16, height: 16, color: "#C9A24D" }} />
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#0F0F12",
                      marginBottom: "4px",
                      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                    }}>
                      {req.title}
                    </h4>
                    <p style={{
                      fontSize: "15px",
                      color: "#7A7A7A",
                      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                    }}>
                      {req.desc}
                    </p>
                  </div>
                </div>
              ))}

              <div style={{
                marginTop: "32px",
                paddingTop: "32px",
                borderTop: "1px solid rgba(0,0,0,0.08)"
              }}>
                <h4 style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#0F0F12",
                  marginBottom: "16px",
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}>
                  Documents Required:
                </h4>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "16px",
                }}>
                  {[
                    "Recent passport size photograph",
                    "ID proof (Aadhaar Card / School ID)",
                    "Address proof (if required)"
                  ].map((doc, i) => (
                    <div key={i} style={{
                      padding: "16px",
                      borderRadius: "12px",
                      background: "rgba(201, 162, 77, 0.04)",
                      border: "1px solid rgba(201, 162, 77, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      fontSize: "14px",
                      color: "#4A4A4A",
                      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                    }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#C9A24D" }} />
                      {doc}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ENQUIRY FORM SECTION ===== */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) 0", background: "#FFFFFF", position: "relative" }}>
        {/* Background Decorative Graphic */}
        <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            background: "#F7F8FA",
            zIndex: 0,
        }} />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(40px, 5vw, 48px)" }}>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              color: "#0F0F12",
              letterSpacing: "-0.03em",
              marginBottom: "16px",
              lineHeight: 1.2,
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            }}>
              Student <span style={{ color: "#C9A24D" }}>Enquiry Form</span>
            </h2>
            <p style={{
              fontSize: "clamp(15px, 1.5vw, 16px)",
              color: "#7A7A7A",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.7,
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            }}>
              Fill out the form below and our admission team will get back to you shortly
            </p>
          </div>

          <div style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(201, 162, 77, 0.1)",
            overflow: "hidden",
          }}>
            <EnquiryForm />
          </div>

          <p style={{
            textAlign: "center",
            marginTop: "32px",
            fontSize: "14px",
            color: "#7A7A7A",
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          }}>
            Alternatively, you can visit us directly at our Hadapsar center or call us for immediate assistance.
          </p>
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
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 800,
            color: "#FFFFFF",
            marginBottom: "24px",
            letterSpacing: "-0.02em",
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          }}>
            Need Help with Admissions?
          </h2>
          <p style={{
            fontSize: "clamp(16px, 2vw, 18px)",
            color: "rgba(255, 255, 255, 0.6)",
            marginBottom: "40px",
            lineHeight: 1.6,
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          }}>
            Our team is here to guide you through the admission process step-by-step
          </p>
          <div style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}>
            <a href="tel:+91XXXXXXXXXX" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "16px 32px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #C9A24D, #E8C97D)",
              color: "#0F0F12",
              fontWeight: 700,
              fontSize: "16px",
              transition: "transform 0.2s, box-shadow 0.2s",
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              boxShadow: "0 8px 24px rgba(201, 162, 77, 0.2)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(201, 162, 77, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(201, 162, 77, 0.2)";
            }}>
              Call Us Now
              <ArrowRight style={{ width: 18, height: 18 }} />
            </a>
            
            <a href="mailto:info@phoenix-tech.in" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "16px 32px",
              borderRadius: "12px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: "16px",
              transition: "all 0.2s",
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              textDecoration: "none",
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
            }}>
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}