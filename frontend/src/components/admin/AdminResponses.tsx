import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import {
  MessageSquare, Mail, Phone, Calendar, User,
  CheckCircle, AlertCircle, X, Search,
  Clock, BookOpen, Shield, ChevronDown,
} from "lucide-react";
import { useAdmin, AdmissionResponse } from "../../contexts/AdminContext";

// ─── Toast ────────────────────────────────────────────────────────────────────

type ToastType = "success" | "error";
interface ToastItem { id: number; message: string; type: ToastType }

function ToastContainer({ toasts, remove }: { toasts: ToastItem[]; remove: (id: number) => void }) {
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10 }}>
      {toasts.map((t) => (
        <div key={t.id} style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 16px", borderRadius: 12,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          backgroundColor: t.type === "success" ? "#f0fdf4" : "#fff1f2",
          border: `1px solid ${t.type === "success" ? "#bbf7d0" : "#fecdd3"}`,
          color: t.type === "success" ? "#166534" : "#be123c",
          fontWeight: 600, fontSize: 14, minWidth: 280,
          animation: "slideIn 0.2s ease",
        }}>
          {t.type === "success"
            ? <CheckCircle style={{ width: 18, height: 18, flexShrink: 0 }} />
            : <AlertCircle style={{ width: 18, height: 18, flexShrink: 0 }} />}
          <span style={{ flex: 1 }}>{t.message}</span>
          <button onClick={() => remove(t.id)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0 }}>
            <X style={{ width: 14, height: 14 }} />
          </button>
        </div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);
  const show = useCallback((message: string, type: ToastType = "success") => {
    const id = ++counter.current;
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4000);
  }, []);
  const remove = useCallback((id: number) => setToasts((p) => p.filter((t) => t.id !== id)), []);
  return { toasts, show, remove };
}

// ─── Status config ────────────────────────────────────────────────────────────

type Status = AdmissionResponse["status"];

const STATUS_CONFIG: Record<Status, {
  label: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  dotColor: string;
}> = {
  new:      { label: "New",      borderColor: "#f59e0b", badgeBg: "#fef3c7", badgeText: "#92400e", dotColor: "#f59e0b" },
  reviewed: { label: "Reviewed", borderColor: "#3b82f6", badgeBg: "#eff6ff", badgeText: "#1e40af", dotColor: "#3b82f6" },
  accepted: { label: "Accepted", borderColor: "#22c55e", badgeBg: "#f0fdf4", badgeText: "#166534", dotColor: "#22c55e" },
  rejected: { label: "Rejected", borderColor: "#e11d48", badgeBg: "#fff1f2", badgeText: "#be123c", dotColor: "#e11d48" },
};

const ALL_STATUSES: Status[] = ["new", "reviewed", "accepted", "rejected"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalizeConsent(val: string): boolean {
  return ["yes", "true", "1", "on"].includes(val?.toLowerCase?.() ?? "");
}

function normalizeBatch(val: string): string {
  return val?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ?? "—";
}

// Sort responses newest first
function sortResponses(arr: AdmissionResponse[]): AdmissionResponse[] {
  return [...arr].sort((a, b) => {
    const da = new Date(a.submittedAt).getTime();
    const db = new Date(b.submittedAt).getTime();
    if (isNaN(da) && isNaN(db)) return 0;
    if (isNaN(da)) return 1;
    if (isNaN(db)) return -1;
    return db - da;
  });
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function ResponseSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{
          background: "#fff", borderRadius: 16, padding: 24,
          border: "1px solid #f3f4f6", borderLeft: "4px solid #f3f4f6",
          display: "flex", flexDirection: "column", gap: 12,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ height: 18, width: "30%", borderRadius: 6, background: "#f3f4f6", animation: "pulse 1.5s ease infinite" }} />
            <div style={{ height: 24, width: 80, borderRadius: 999, background: "#f3f4f6", animation: "pulse 1.5s ease infinite" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[1, 2, 3].map((j) => (
              <div key={j} style={{ height: 40, borderRadius: 8, background: "#f3f4f6", animation: "pulse 1.5s ease infinite" }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Status Selector ──────────────────────────────────────────────────────────

function StatusSelector({ response, onUpdate }: {
  response: AdmissionResponse;
  onUpdate: (id: string, status: Status, name: string) => Promise<void>;
}) {
  const [updating, setUpdating] = useState(false);
  const cfg = STATUS_CONFIG[response.status];

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Status;
    setUpdating(true);
    await onUpdate(response.id, newStatus, response.fullName);
    setUpdating(false);
  };

  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <div style={{
        position: "absolute", left: 10, pointerEvents: "none",
        width: 8, height: 8, borderRadius: "50%", background: cfg.dotColor,
      }} />
      <select
        value={response.status}
        onChange={handleChange}
        disabled={updating}
        style={{
          paddingLeft: 24, paddingRight: 28, paddingTop: 6, paddingBottom: 6,
          borderRadius: 999, border: `1.5px solid ${cfg.borderColor}`,
          background: cfg.badgeBg, color: cfg.badgeText,
          fontWeight: 700, fontSize: 12, cursor: updating ? "not-allowed" : "pointer",
          outline: "none", appearance: "none", WebkitAppearance: "none",
          opacity: updating ? 0.6 : 1, transition: "all 0.2s",
        }}
      >
        {ALL_STATUSES.map((s) => (
          <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
        ))}
      </select>
      <ChevronDown style={{
        position: "absolute", right: 8, pointerEvents: "none",
        width: 12, height: 12, color: cfg.badgeText,
      }} />
    </div>
  );
}

// ─── Response Card ────────────────────────────────────────────────────────────

function ResponseCard({ res, onUpdate }: {
  res: AdmissionResponse;
  onUpdate: (id: string, status: Status, name: string) => Promise<void>;
}) {
  const cfg = STATUS_CONFIG[res.status];
  const consentYes = normalizeConsent(res.consentToContact);

  return (
    <div style={{
      background: "#fff", borderRadius: 16,
      border: "1px solid #f3f4f6",
      borderLeft: `4px solid ${cfg.borderColor}`,
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      overflow: "hidden",
      transition: "box-shadow 0.2s",
    }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.09)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)")}
    >
      {/* ── Card Header ─────────────────────────────────────────── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 12,
        padding: "16px 20px 12px",
        borderBottom: "1px solid #f9fafb",
      }}>
        {/* Name + inquiry type */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            background: cfg.badgeBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <User style={{ width: 18, height: 18, color: cfg.badgeText }} />
          </div>
          <div>
            <p style={{ fontWeight: 800, fontSize: 15, color: "#0F0F12", margin: 0 }}>{res.fullName}</p>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0, textTransform: "capitalize" }}>
              {res.inquiryType} enquiry
            </p>
          </div>
        </div>

        {/* Status selector */}
        <StatusSelector response={res} onUpdate={onUpdate} />
      </div>

      {/* ── Contact Row ──────────────────────────────────────────── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(180px, 100%), 1fr))",
        gap: 16, padding: "14px 20px",
        borderBottom: "1px solid #f9fafb",
      }}>
        <Field icon={<Mail style={{ width: 14, height: 14, color: "#6b7280" }} />} label="Email">
          <a href={`mailto:${res.email}`}
            style={{ color: "#C9A24D", fontWeight: 600, fontSize: 13, textDecoration: "none" }}>
            {res.email}
          </a>
        </Field>
        <Field icon={<Phone style={{ width: 14, height: 14, color: "#6b7280" }} />} label="Mobile">
          <a href={`tel:${res.mobileNumber}`}
            style={{ color: "#C9A24D", fontWeight: 600, fontSize: 13, textDecoration: "none" }}>
            {res.mobileNumber}
          </a>
        </Field>
        <Field icon={<BookOpen style={{ width: 14, height: 14, color: "#6b7280" }} />} label="Current Class">
          <span style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>{res.currentClass || "—"}</span>
        </Field>
        <Field icon={<Clock style={{ width: 14, height: 14, color: "#6b7280" }} />} label="Preferred Batch">
          <span style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>{normalizeBatch(res.preferredBatch)}</span>
        </Field>
      </div>

      {/* ── Courses + Consent + Date ──────────────────────────────── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 12, padding: "12px 20px",
      }}>
        {/* Interested courses — inline styles to avoid Tailwind purge */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Courses:
          </span>
          {res.interestedCourses.length > 0
            ? res.interestedCourses.map((c) => (
                <span key={c} style={{
                  background: "#fef3c7", color: "#92400e",
                  borderRadius: 999, padding: "2px 10px",
                  fontSize: 11, fontWeight: 700,
                }}>
                  {c}
                </span>
              ))
            : <span style={{ fontSize: 12, color: "#9ca3af" }}>None specified</span>}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          {/* Consent badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Shield style={{ width: 13, height: 13, color: consentYes ? "#16a34a" : "#e11d48" }} />
            <span style={{
              fontSize: 12, fontWeight: 700,
              color: consentYes ? "#16a34a" : "#e11d48",
            }}>
              {consentYes ? "Consent: Yes" : "Consent: No"}
            </span>
          </div>

          {/* Submitted date */}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Calendar style={{ width: 13, height: 13, color: "#9ca3af" }} />
            <span style={{ fontSize: 12, color: "#9ca3af" }}>{res.submittedAt || "—"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
        {icon}
        <span style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

// ─── AdminResponses ───────────────────────────────────────────────────────────

export function AdminResponses() {
  const { responses, updateResponseStatus } = useAdmin();
  const { toasts, show: showToast, remove: removeToast } = useToast();

  const [searchTerm,     setSearchTerm]     = useState("");
  const [activeFilter,   setActiveFilter]   = useState<Status | "all">("all");
  const [isLoading,      setIsLoading]      = useState(true);

  // Give API time to load before hiding skeleton
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, [responses]);

  // Status update with error handling
  const handleStatusUpdate = async (id: string, status: Status, name: string) => {
    try {
      await updateResponseStatus(id, status);
      showToast(`${name}'s status updated to "${STATUS_CONFIG[status].label}".`, "success");
    } catch (err: any) {
      showToast(err?.message || "Failed to update status. Please try again.", "error");
    }
  };

  // Stats summary
  const stats = useMemo(() => ({
    total:    responses.length,
    new:      responses.filter((r) => r.status === "new").length,
    reviewed: responses.filter((r) => r.status === "reviewed").length,
    accepted: responses.filter((r) => r.status === "accepted").length,
    rejected: responses.filter((r) => r.status === "rejected").length,
  }), [responses]);

  // Sort newest first, then filter
  const sorted = useMemo(() => sortResponses(responses), [responses]);

  const filtered = useMemo(() => sorted.filter((r) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !q ||
      r.fullName.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.mobileNumber.includes(q) ||
      r.currentClass.toLowerCase().includes(q) ||
      r.inquiryType.toLowerCase().includes(q) ||
      r.interestedCourses.some((c) => c.toLowerCase().includes(q));
    const matchesFilter = activeFilter === "all" || r.status === activeFilter;
    return matchesSearch && matchesFilter;
  }), [sorted, searchTerm, activeFilter]);

  const FILTER_TABS: { key: Status | "all"; label: string; count: number }[] = [
    { key: "all",      label: "All",      count: stats.total    },
    { key: "new",      label: "New",      count: stats.new      },
    { key: "reviewed", label: "Reviewed", count: stats.reviewed },
    { key: "accepted", label: "Accepted", count: stats.accepted },
    { key: "rejected", label: "Rejected", count: stats.rejected },
  ];

  const filterColor: Record<Status | "all", string> = {
    all: "#C9A24D", new: "#f59e0b", reviewed: "#3b82f6", accepted: "#22c55e", rejected: "#e11d48",
  };

  return (
    <>
      <style>{`
        @keyframes slideIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.45} }
      `}</style>

      <ToastContainer toasts={toasts} remove={removeToast} />

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

        {/* ── Header ─────────────────────────────────────────────── */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f3f4f6", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "20px 24px" }}>
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontWeight: 800, fontSize: 22, color: "#0F0F12", display: "flex", alignItems: "center", gap: 8, margin: 0 }}>
              <MessageSquare style={{ width: 22, height: 22, color: "#C9A24D" }} />
              Admission Responses
            </h2>
            <p style={{ color: "#9ca3af", fontSize: 13, marginTop: 2 }}>
              {stats.total} total submission{stats.total !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#9ca3af" }} />
            <input
              type="text"
              placeholder="Search by name, email, phone, course, class…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%", padding: "10px 14px 10px 38px",
                border: "1px solid #e5e7eb", borderRadius: 10,
                fontSize: 14, outline: "none", color: "#0F0F12",
                background: "#fafafa", boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        {/* ── Stats Banner ───────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12 }}>
          {([
            { label: "Total",    value: stats.total,    color: "#C9A24D", bg: "#fffbeb" },
            { label: "New",      value: stats.new,      color: "#d97706", bg: "#fef3c7" },
            { label: "Reviewed", value: stats.reviewed, color: "#2563eb", bg: "#eff6ff" },
            { label: "Accepted", value: stats.accepted, color: "#16a34a", bg: "#f0fdf4" },
            { label: "Rejected", value: stats.rejected, color: "#e11d48", bg: "#fff1f2" },
          ] as const).map(({ label, value, color, bg }) => (
            <div key={label} style={{
              background: bg, borderRadius: 14, padding: "14px 18px",
              border: `1px solid ${color}22`, textAlign: "center",
            }}>
              <p style={{ fontSize: 26, fontWeight: 900, color, margin: 0 }}>{value}</p>
              <p style={{ fontSize: 12, fontWeight: 600, color, margin: 0, opacity: 0.75 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* ── Filter Tabs ─────────────────────────────────────────── */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {FILTER_TABS.map(({ key, label, count }) => {
            const isActive = activeFilter === key;
            const color = filterColor[key];
            return (
              <button key={key} onClick={() => setActiveFilter(key)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "7px 14px", borderRadius: 999, cursor: "pointer",
                  border: isActive ? "none" : "1px solid #e5e7eb",
                  background: isActive ? color : "#fff",
                  color: isActive ? "#fff" : "#6b7280",
                  fontWeight: isActive ? 700 : 500, fontSize: 13,
                  transition: "all 0.2s",
                }}>
                {label}
                <span style={{
                  background: isActive ? "rgba(255,255,255,0.25)" : "#f3f4f6",
                  color: isActive ? "#fff" : "#6b7280",
                  borderRadius: 999, padding: "1px 7px", fontSize: 11, fontWeight: 700,
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Response List ───────────────────────────────────────── */}
        {isLoading ? (
          <ResponseSkeleton />
        ) : filtered.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {filtered.map((res) => (
              <ResponseCard key={res.id} res={res} onUpdate={handleStatusUpdate} />
            ))}
          </div>
        ) : (
          /* ── Empty State ────────────────────────────────────────── */
          <div style={{
            background: "#fff", borderRadius: 16, border: "1px solid #f3f4f6",
            padding: "56px 24px", textAlign: "center",
          }}>
            <div style={{ background: "#fef3c7", borderRadius: "50%", width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <MessageSquare style={{ width: 28, height: 28, color: "#C9A24D" }} />
            </div>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: "#0F0F12", marginBottom: 8 }}>
              {searchTerm || activeFilter !== "all" ? "No responses match your filter" : "No responses yet"}
            </h3>
            <p style={{ color: "#9ca3af", fontSize: 14 }}>
              {searchTerm || activeFilter !== "all"
                ? "Try adjusting your search or selecting a different status tab."
                : "Admission form submissions will appear here once received."}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
