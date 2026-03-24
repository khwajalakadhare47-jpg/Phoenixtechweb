import { MapPin, Phone, Mail, Clock, ArrowRight, MessageSquare, ChevronDown } from "lucide-react";
import { useState } from "react";

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

export function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contactOptions = [
    {
      icon: <MapPin style={{ width: 28, height: 28, color: "#C9A24D" }} />,
      title: "Address",
      desc: (
        <>
          Lane No. 11-B, Opposite Etasha Society<br />
          Sayyad Nagar, Hadapsar<br />
          Pune 411028, Maharashtra
        </>
      )
    },
    {
      icon: <Phone style={{ width: 28, height: 28, color: "#C9A24D" }} />,
      title: "Phone",
      desc: (
        <>
          <a href="tel:+918605601030" style={{ color: "inherit", textDecoration: "none" }} className="hover:text-[#C9A24D] transition-colors block mb-1">
            +91 86056 01030
          </a>
          <a href="tel:+918007577648" style={{ color: "inherit", textDecoration: "none" }} className="hover:text-[#C9A24D] transition-colors block">
            +91 80075 77648
          </a>
        </>
      )
    },
    {
      icon: <Mail style={{ width: 28, height: 28, color: "#C9A24D" }} />,
      title: "Email",
      desc: (
        <>
          <a href="mailto:info@phoenix-tech.in" style={{ color: "inherit", textDecoration: "none", wordBreak: "break-all" }} className="hover:text-[#C9A24D] transition-colors block mb-1">
            info@phoenix-tech.in
          </a>
          <a href="http://www.phoenix-tech.in" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none", wordBreak: "break-all" }} className="hover:text-[#C9A24D] transition-colors block">
            www.phoenix-tech.in
          </a>
        </>
      )
    },
    {
      icon: <Clock style={{ width: 28, height: 28, color: "#C9A24D" }} />,
      title: "Office Hours",
      desc: (
        <>
          Monday - Saturday<br />
          9:00 AM - 7:00 PM<br />
          <span style={{ color: "#EF4444" }}>Sunday: Closed</span>
        </>
      )
    }
  ];

  const faqs = [
    { q: "What are the batch timings?", a: "We offer flexible batch timings including morning, afternoon, and evening batches. Contact us to know the current schedule." },
    { q: "Is there any age limit for courses?", a: "Most of our courses are open to all age groups. MS-CIT requires students to be 14+ years. Coding classes are designed for students in Class 6-12." },
    { q: "Do you provide certificates?", a: "Yes, we provide course completion certificates. MS-CIT students receive government-approved certification from MKCL after passing the examination." },
    { q: "Can I visit the center before admission?", a: "Absolutely! We encourage you to visit our center, meet our faculty, and see our facilities before making a decision. No appointment necessary during office hours." }
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
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" style={{ relative: true, zIndex: 1, textAlign: "center" }}>
          {/* Badge */}
          <div style={{ marginBottom: "24px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 20px",
              borderRadius: "100px", background: "rgba(201, 162, 77, 0.1)",
              border: "1px solid rgba(201, 162, 77, 0.2)", color: "#C9A24D",
              fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em",
              textTransform: "uppercase", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            }}>
              <MessageSquare style={{ width: 14, height: 14 }} />
              We're Here to Help
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, color: "#FFFFFF",
            lineHeight: 1.1, marginBottom: "24px", letterSpacing: "-0.03em",
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          }}>
            Get In{" "}
            <span style={{
              background: "linear-gradient(135deg, #C9A24D, #E8C97D, #C9A24D)",
              backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Touch</span>
          </h1>

          <p style={{
            fontSize: "clamp(16px, 1.8vw, 20px)", color: "rgba(255, 255, 255, 0.6)",
            lineHeight: 1.6, maxWidth: "680px", margin: "0 auto",
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          }}>
            Have questions about our courses or admissions? Visit our center in Hadapsar, Pune or reach out to us directly.
          </p>
        </div>
      </section>

      {/* ===== INFO CARDS SECTION ===== */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) 0", background: "#FFFFFF", marginTop: "-60px", position: "relative", zIndex: 10 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: "24px" }}>
            {contactOptions.map((opt, i) => (
              <div key={i} style={{
                background: "#FFFFFF", borderRadius: "20px", padding: "32px 24px",
                border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
                textAlign: "center", transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.borderColor = "rgba(201,162,77,0.3)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.06)";
              }}>
                <div style={{
                  width: "64px", height: "64px", margin: "0 auto 20px", borderRadius: "16px",
                  background: "linear-gradient(135deg, rgba(201, 162, 77, 0.15), rgba(201, 162, 77, 0.05))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {opt.icon}
                </div>
                <h3 style={{
                  fontSize: "18px", fontWeight: 700, color: "#0F0F12", marginBottom: "12px",
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}>
                  {opt.title}
                </h3>
                <p style={{
                  fontSize: "15px", color: "#4A4A4A", lineHeight: 1.6,
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}>
                  {opt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAP AND DIRECT CONTACT INFO ===== */}
      <section style={{ padding: "clamp(40px, 6vw, 80px) 0", background: "#F7F8FA" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(32px, 5vw, 64px)" }}>
            
            {/* Embedded Google Map */}
            <div>
              <h2 style={{
                fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#0F0F12",
                letterSpacing: "-0.02em", marginBottom: "24px", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              }}>
                Find Us on <span style={{ color: "#C9A24D" }}>Map</span>
              </h2>
              <div style={{
                borderRadius: "24px", overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                height: "clamp(350px, 50vh, 500px)", background: "#FFFFFF",
              }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.7!2d73.9347!3d18.5089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMwJzMyLjAiTiA3M8KwNTYnMDUuMCJF!5e0!3m2!1sen!2sin!4v1234567890&q=Lane+No.+11-B,+Opposite+Etasha+Society,+Sayyad+Nagar,+Hadapsar,+Pune+411028"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Phoenix Tech Academy Map Location"
                />
              </div>
            </div>

            {/* Direct Contact Info Card */}
            <div>
               <h2 style={{
                fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#0F0F12",
                letterSpacing: "-0.02em", marginBottom: "24px", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              }}>
                Visit Our <span style={{ color: "#C9A24D" }}>Center</span>
              </h2>
              <div style={{
                background: "#FFFFFF", borderRadius: "24px", padding: "clamp(32px, 4vw, 48px)",
                border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 20px 60px rgba(0,0,0,0.04)"
              }}>
                <div style={{ marginBottom: "32px" }}>
                  <p style={{
                    fontSize: "16px", color: "#4A4A4A", lineHeight: 1.7,
                    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                  }}>
                    We welcome you to visit our state-of-the-art facility in Hadapsar, Pune. 
                    Our team will be happy to show you around and answer all your questions about our courses.
                  </p>
                </div>

                <div style={{
                  paddingTop: "32px", borderTop: "1px solid rgba(0,0,0,0.08)", marginBottom: "32px"
                }}>
                  <h3 style={{
                    fontSize: "20px", fontWeight: 700, color: "#0F0F12", marginBottom: "16px",
                    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                  }}>
                    Directions
                  </h3>
                  <p style={{
                    fontSize: "15px", color: "#4A4A4A", marginBottom: "20px", lineHeight: 1.6,
                    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                  }}>
                    Phoenix Tech Academy is highly accessible by public transport and private vehicles.
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {[
                      "Opposite Etasha Society, Sayyad Nagar",
                      "Ample parking space available for students",
                      "Well connected by local buses and auto-rickshaws"
                    ].map((item, i) => (
                      <li key={i} style={{
                        display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "12px",
                        fontSize: "15px", color: "#4A4A4A", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                      }}>
                        <div style={{
                          width: "6px", height: "6px", borderRadius: "50%", background: "#C9A24D", marginTop: "8px", flexShrink: 0
                        }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ paddingTop: "32px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                  <h3 style={{
                    fontSize: "20px", fontWeight: 700, color: "#0F0F12", marginBottom: "16px",
                    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                  }}>
                    Need Immediate Assistance?
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                    <a href="tel:+918605601030" style={{
                      display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px",
                      borderRadius: "10px", background: "linear-gradient(135deg, #C9A24D, #E8C97D)",
                      color: "#0F0F12", fontWeight: 700, fontSize: "15px", transition: "transform 0.2s, box-shadow 0.2s",
                      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", boxShadow: "0 8px 24px rgba(201, 162, 77, 0.2)",
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
                      Call Now
                    </a>
                    <a href="mailto:info@phoenix-tech.in" style={{
                      display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px",
                      borderRadius: "10px", background: "#FFFFFF", border: "1px solid rgba(201,162,77,0.5)",
                      color: "#C9A24D", fontWeight: 600, fontSize: "15px", transition: "all 0.2s",
                      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.background = "rgba(201,162,77,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.background = "#FFFFFF";
                    }}>
                      Email Us
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) 0", background: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 64px)" }}>
            <span style={{
              display: "inline-block", padding: "6px 16px", borderRadius: "100px",
              background: "rgba(201, 162, 77, 0.08)", border: "1px solid rgba(201, 162, 77, 0.15)",
              color: "#C9A24D", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", marginBottom: "16px", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            }}>
              Got Questions?
            </span>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#0F0F12",
              letterSpacing: "-0.03em", marginBottom: "16px", lineHeight: 1.2,
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            }}>
              Frequently Asked <span style={{ color: "#C9A24D" }}>Questions</span>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} style={{
                  background: "#FFFFFF", borderRadius: "16px",
                  border: isOpen ? "1px solid rgba(201, 162, 77, 0.3)" : "1px solid rgba(0,0,0,0.08)",
                  boxShadow: isOpen ? "0 12px 32px rgba(201, 162, 77, 0.08)" : "none",
                  overflow: "hidden", transition: "all 0.3s ease",
                }}>
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    style={{
                      width: "100%", padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
                      background: "transparent", border: "none", cursor: "pointer", textAlign: "left",
                    }}
                  >
                    <h3 style={{
                      fontSize: "18px", fontWeight: 600, color: isOpen ? "#C9A24D" : "#0F0F12",
                      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", margin: 0,
                    }}>
                      {faq.q}
                    </h3>
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      width: "32px", height: "32px", borderRadius: "50%",
                      background: isOpen ? "rgba(201, 162, 77, 0.1)" : "rgba(0,0,0,0.04)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "all 0.3s ease"
                    }}>
                      <ChevronDown style={{ width: 16, height: 16, color: isOpen ? "#C9A24D" : "#4A4A4A" }} />
                    </div>
                  </button>
                  
                  <div style={{
                    maxHeight: isOpen ? "500px" : "0", opacity: isOpen ? 1 : 0, 
                    overflow: "hidden", transition: "all 0.3s ease-in-out",
                  }}>
                    <div style={{ 
                      padding: "0 32px 24px 32px", color: "#4A4A4A", fontSize: "15px", lineHeight: 1.6,
                      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                    }}>
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}