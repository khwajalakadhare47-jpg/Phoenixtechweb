import { useState, useRef, useEffect } from "react";
import {
  AlertCircle, Lock, ArrowLeft, Eye, EyeOff, Shield, LogIn,
} from "lucide-react";
import logoImage from "../../assets/logophoneix.png";
import { useAdmin } from "../../contexts/AdminContext";

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onExitToSite: () => void;
}

const MAX_ATTEMPTS_WARN = 3;

export function AdminLogin({ onLoginSuccess, onExitToSite }: AdminLoginProps) {
  const [username,       setUsername]       = useState("");
  const [password,       setPassword]       = useState("");
  const [showPassword,   setShowPassword]   = useState(false);
  const [error,          setError]          = useState("");
  const [isLoading,      setIsLoading]      = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [errorVisible,   setErrorVisible]   = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const { login } = useAdmin();

  useEffect(() => { usernameRef.current?.focus(); }, []);

  useEffect(() => {
    if (error) {
      setErrorVisible(false);
      const t = setTimeout(() => setErrorVisible(true), 10);
      return () => clearTimeout(t);
    }
    setErrorVisible(false);
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }
    setIsLoading(true);
    try {
      const success = await login(username, password);
      if (success) {
        setUsername(""); setPassword(""); setFailedAttempts(0);
        onLoginSuccess();
      } else {
        const attempts = failedAttempts + 1;
        setFailedAttempts(attempts);
        setPassword("");
        setError(
          attempts >= MAX_ATTEMPTS_WARN
            ? `Invalid credentials. ${attempts} failed attempt${attempts > 1 ? "s" : ""} — repeated failures may lock your account.`
            : "Invalid username or password. Please try again."
        );
      }
    } catch (err) {
      setFailedAttempts((a) => a + 1);
      setPassword("");
      if (err instanceof Error) {
        if (err.message.toLowerCase().includes("network") || err.message.includes("Failed to fetch"))
          setError("Network error — please check your connection.");
        else if (err.message.toLowerCase().includes("timeout"))
          setError("Request timed out. Please try again.");
        else setError("Login failed — " + err.message);
      } else { setError("An unexpected error occurred."); }
    } finally { setIsLoading(false); }
  };

  const isDisabled = isLoading || !username.trim() || !password.trim();
  const showBruteWarning = failedAttempts >= MAX_ATTEMPTS_WARN;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0B0C10 0%, #111827 50%, #1a1f2e 100%)",
      padding: "16px",
      position: "relative", overflow: "hidden",
      boxSizing: "border-box",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: "min(500px, 90vw)", height: "min(500px, 90vw)", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,162,77,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Card — fluid width, capped at 440px */}
      <div style={{
        width: "100%", maxWidth: 440,
        background: "rgba(255,255,255,0.97)",
        borderRadius: "clamp(14px, 4vw, 22px)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(201,162,77,0.15)",
        overflow: "hidden", position: "relative",
      }}>
        {/* Gold top stripe */}
        <div style={{ height: 4, background: "linear-gradient(90deg,#C9A24D,#e8c87a,#C9A24D)" }} />

        <div style={{ padding: "clamp(20px,5vw,32px)" }}>

          {/* Back link */}
          <button type="button" onClick={onExitToSite} style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 13, fontWeight: 600, color: "#6b7280",
            background: "none", border: "none", cursor: "pointer",
            padding: "4px 0", marginBottom: 20, transition: "color 0.2s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A24D")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}>
            <ArrowLeft style={{ width: 15, height: 15 }} /> Back to Website
          </button>

          {/* Brand — stack vertically on very small screens */}
          <div style={{ textAlign: "center", marginBottom: "clamp(18px,4vw,28px)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
              <img src={logoImage} alt="Phoenix Tech Academy"
                style={{ width: "clamp(36px,8vw,48px)", height: "clamp(36px,8vw,48px)", objectFit: "contain" }} />
              <div style={{ textAlign: "left" }}>
                <h1 style={{ fontSize: "clamp(16px,4vw,20px)", fontWeight: 800, color: "#0F0F12", margin: 0, lineHeight: 1.2 }}>
                  Phoenix Tech Academy
                </h1>
                <p style={{ fontSize: 12, color: "#C9A24D", fontWeight: 700, margin: 0, letterSpacing: "0.04em" }}>
                  Admin Panel
                </p>
              </div>
            </div>
            <p style={{ fontSize: "clamp(12px,3vw,14px)", color: "#9ca3af", margin: 0, marginTop: 8 }}>
              Sign in to manage your website
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div style={{
              display: "flex", gap: 10, alignItems: "flex-start",
              padding: "11px 13px", borderRadius: 12, marginBottom: 18,
              background: showBruteWarning ? "#fff7ed" : "#fff1f2",
              border: `1px solid ${showBruteWarning ? "#fed7aa" : "#fecdd3"}`,
              opacity: errorVisible ? 1 : 0,
              transform: errorVisible ? "translateY(0)" : "translateY(-6px)",
              transition: "opacity 0.25s, transform 0.25s",
            }}>
              <AlertCircle style={{ width: 16, height: 16, flexShrink: 0, marginTop: 1, color: showBruteWarning ? "#ea580c" : "#e11d48" }} />
              <p style={{ fontSize: 13, margin: 0, lineHeight: 1.5, color: showBruteWarning ? "#9a3412" : "#be123c", fontWeight: 500 }}>
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Username */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                Username
              </label>
              <input
                ref={usernameRef} type="text" value={username}
                onChange={(e) => { setUsername(e.target.value); setError(""); }}
                placeholder="Enter admin username"
                disabled={isLoading} autoComplete="username"
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: 12, boxSizing: "border-box",
                  border: "1.5px solid #e5e7eb", background: "#fafafa",
                  fontSize: "clamp(14px,3.5vw,15px)", color: "#0F0F12", outline: "none",
                  opacity: isLoading ? 0.6 : 1, transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#C9A24D")}
                onBlur={(e)  => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            {/* Password + show/hide */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="Enter admin password"
                  disabled={isLoading} autoComplete="current-password"
                  style={{
                    width: "100%", padding: "12px 46px 12px 14px", borderRadius: 12, boxSizing: "border-box",
                    border: "1.5px solid #e5e7eb", background: "#fafafa",
                    fontSize: "clamp(14px,3.5vw,15px)", color: "#0F0F12", outline: "none",
                    opacity: isLoading ? 0.6 : 1, transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#C9A24D")}
                  onBlur={(e)  => (e.target.style.borderColor = "#e5e7eb")}
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: "#9ca3af",
                    padding: 3, display: "flex", transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A24D")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}>
                  {showPassword ? <EyeOff style={{ width: 18, height: 18 }} /> : <Eye style={{ width: 18, height: 18 }} />}
                </button>
              </div>
            </div>

            {/* Microcopy */}
            {isDisabled && !isLoading && (
              <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", margin: "-2px 0 0" }}>
                Enter your credentials above to continue
              </p>
            )}

            {/* Submit */}
            <button type="submit" disabled={isDisabled}
              style={{
                width: "100%", padding: "clamp(11px,3vw,14px)",
                borderRadius: 12, border: "none",
                background: isDisabled ? "#e5e7eb" : "linear-gradient(135deg,#C9A24D,#e8c87a,#C9A24D)",
                color: isDisabled ? "#9ca3af" : "#0F0F12",
                fontWeight: 800, fontSize: "clamp(14px,3.5vw,15px)",
                cursor: isDisabled ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                boxShadow: isDisabled ? "none" : "0 4px 20px rgba(201,162,77,0.35)",
                transition: "all 0.25s", marginTop: 2,
              }}
              onMouseEnter={(e) => { if (!isDisabled) e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}>
              {isLoading ? (
                <><span style={{
                  width: 17, height: 17, border: "2.5px solid #0F0F12",
                  borderTopColor: "transparent", borderRadius: "50%",
                  display: "inline-block", animation: "spin 0.7s linear infinite",
                }} /> Signing in…</>
              ) : (
                <><LogIn style={{ width: 16, height: 16 }} /> Sign In</>
              )}
            </button>
          </form>

          {/* Security note */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            marginTop: 20, paddingTop: 18, borderTop: "1px solid #f3f4f6",
          }}>
            <Shield style={{ width: 13, height: 13, color: "#d1d5db" }} />
            <p style={{ fontSize: 12, color: "#d1d5db", margin: 0 }}>
              Credentials are securely encrypted end-to-end
            </p>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );
}