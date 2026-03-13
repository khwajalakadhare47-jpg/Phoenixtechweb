import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  BookOpen, Plus, Trash2, Edit2, Search,
  Clock, Users, Award, Monitor, Code,
  MessageSquare, X, CheckCircle, AlertCircle,
  ChevronRight,
} from "lucide-react";
import { useAdmin, Course } from "../../contexts/AdminContext";

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

// ─── Confirm Modal ─────────────────────────────────────────────────────────────

function ConfirmModal({ title, message, onConfirm, onCancel }: {
  title: string; message: string; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9998, backgroundColor: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onCancel}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 28, maxWidth: 380, width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ background: "#fff1f2", borderRadius: 10, padding: 8 }}>
            <Trash2 style={{ width: 20, height: 20, color: "#e11d48" }} />
          </div>
          <h3 style={{ fontWeight: 700, fontSize: 16, color: "#0F0F12", margin: 0 }}>{title}</h3>
        </div>
        <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>{message}</p>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onCancel} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "1px solid #e5e7eb", background: "#f9fafb", color: "#374151", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
            Cancel
          </button>
          <button onClick={onConfirm} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "none", background: "#e11d48", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Tag Input ────────────────────────────────────────────────────────────────

function TagInput({ label, tags, onChange, placeholder }: {
  label: string; tags: string[]; onChange: (tags: string[]) => void; placeholder: string;
}) {
  const [inputVal, setInputVal] = useState("");

  const addTag = () => {
    const val = inputVal.trim();
    if (val && !tags.includes(val)) {
      onChange([...tags, val]);
    }
    setInputVal("");
  };

  const removeTag = (idx: number) => onChange(tags.filter((_, i) => i !== idx));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !inputVal && tags.length) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div>
      <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 6 }}>
        {label} <span style={{ color: "#e11d48" }}>*</span>
      </label>
      <div style={{
        display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center",
        border: "1px solid #e5e7eb", borderRadius: 10, padding: "8px 10px",
        background: "#fafafa", minHeight: 44, cursor: "text",
      }}
        onClick={(e) => (e.currentTarget.querySelector("input") as HTMLInputElement)?.focus()}
      >
        {tags.map((tag, idx) => (
          <span key={idx} style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            background: "#fef3c7", color: "#92400e",
            borderRadius: 999, padding: "3px 10px", fontSize: 12, fontWeight: 600,
          }}>
            {tag}
            <button type="button" onClick={() => removeTag(idx)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#92400e", padding: 0, lineHeight: 1, display: "flex" }}>
              <X style={{ width: 11, height: 11 }} />
            </button>
          </span>
        ))}
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={tags.length === 0 ? placeholder : "Add more…"}
          style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: "#374151", minWidth: 120, flex: 1 }}
        />
      </div>
      <p style={{ color: "#9ca3af", fontSize: 11, marginTop: 5 }}>Press Enter or comma to add each item</p>
    </div>
  );
}

// ─── Icon Picker ──────────────────────────────────────────────────────────────

const ICON_OPTIONS = [
  { value: "Award",        label: "MS-CIT / Certificate",    Icon: Award },
  { value: "Monitor",      label: "Basic Computer",           Icon: Monitor },
  { value: "Code",         label: "Coding Classes",           Icon: Code },
  { value: "MessageSquare",label: "English Speaking",         Icon: MessageSquare },
];

function getIconComponent(iconType: string): React.ElementType {
  return ICON_OPTIONS.find((o) => o.value === iconType)?.Icon ?? Award;
}

function IconPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 8 }}>
        Course Icon <span style={{ color: "#e11d48" }}>*</span>
      </label>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
        {ICON_OPTIONS.map(({ value: v, label, Icon }) => {
          const active = value === v;
          return (
            <button key={v} type="button" onClick={() => onChange(v)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px", borderRadius: 10, cursor: "pointer",
                border: active ? "2px solid #C9A24D" : "1px solid #e5e7eb",
                background: active ? "#fffbeb" : "#fafafa",
                fontWeight: active ? 700 : 500,
                fontSize: 13, color: active ? "#92400e" : "#6b7280",
                transition: "all 0.15s",
              }}>
              <Icon style={{ width: 18, height: 18, color: active ? "#C9A24D" : "#9ca3af", flexShrink: 0 }} />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Skeleton Loader ──────────────────────────────────────────────────────────

function CourseSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f3f4f6", display: "flex", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 12, background: "#f3f4f6", flexShrink: 0, animation: "pulse 1.5s ease infinite" }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ height: 18, borderRadius: 6, background: "#f3f4f6", width: "40%", animation: "pulse 1.5s ease infinite" }} />
            <div style={{ height: 13, borderRadius: 6, background: "#f3f4f6", width: "60%", animation: "pulse 1.5s ease infinite" }} />
            <div style={{ height: 12, borderRadius: 6, background: "#f3f4f6", width: "80%", animation: "pulse 1.5s ease infinite" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Form initial state ───────────────────────────────────────────────────────

const EMPTY_FORM = {
  title: "", subtitle: "", description: "",
  duration: "", target: "", iconType: "Award",
};

// ─── AdminCourses ─────────────────────────────────────────────────────────────

export function AdminCourses() {
  const { courses, addCourse, deleteCourse, updateCourse } = useAdmin();
  const { toasts, show: showToast, remove: removeToast } = useToast();

  const [showForm,    setShowForm]    = useState(false);
  const [editingId,  setEditingId]   = useState<string | null>(null);
  const [searchTerm, setSearchTerm]  = useState("");
  const [formData,   setFormData]    = useState(EMPTY_FORM);
  const [highlights, setHighlights]  = useState<string[]>([]);
  const [syllabus,   setSyllabus]    = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading,    setIsLoading]   = useState(true);
  const [deleteTarget, setDeleteTarget]= useState<{ id: string; title: string } | null>(null);
  const [hoveredCard,  setHoveredCard] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  // Detect when courses have loaded from API
  useEffect(() => {
    // courses array comes from context; once context finishes its useEffect the
    // reference changes — treat any defined value (even []) as "loaded"
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [courses]);

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 14px",
    border: "1px solid #e5e7eb", borderRadius: 10,
    fontSize: 14, outline: "none", color: "#0F0F12",
    background: "#fafafa", boxSizing: "border-box",
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openForm = () => {
    setShowForm(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setHighlights([]);
    setSyllabus([]);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (course: Course) => {
    setFormData({
      title: course.title, subtitle: course.subtitle,
      description: course.description, duration: course.duration,
      target: course.target, iconType: course.iconType,
    });
    setHighlights([...course.highlights]);
    setSyllabus([...course.syllabus]);
    setEditingId(course.id);
    setShowForm(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: string[] = [];
    if (!formData.title.trim())       errors.push("Course title");
    if (!formData.subtitle.trim())    errors.push("Subtitle");
    if (!formData.description.trim()) errors.push("Description");
    if (!formData.duration.trim())    errors.push("Duration");
    if (!formData.target.trim())      errors.push("Target audience");
    if (highlights.length === 0)      errors.push("At least one highlight");
    if (syllabus.length === 0)        errors.push("At least one syllabus topic");

    if (errors.length) {
      showToast(`Please fill in: ${errors.join(", ")}.`, "error");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateCourse({
          id: editingId, ...formData,
          title: formData.title.trim(),
          subtitle: formData.subtitle.trim(),
          description: formData.description.trim(),
          duration: formData.duration.trim(),
          target: formData.target.trim(),
          highlights, syllabus,
        });
        showToast(`"${formData.title}" updated successfully.`, "success");
      } else {
        await addCourse({
          ...formData,
          title: formData.title.trim(),
          subtitle: formData.subtitle.trim(),
          description: formData.description.trim(),
          duration: formData.duration.trim(),
          target: formData.target.trim(),
          highlights, syllabus,
        });
        showToast(`"${formData.title}" created successfully.`, "success");
      }
      resetForm();
    } catch (err: any) {
      showToast(err?.message || "Failed to save course. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteCourse(deleteTarget.id);
      showToast(`"${deleteTarget.title}" deleted.`, "success");
    } catch (err: any) {
      showToast(err?.message || "Failed to delete course.", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  // Broad search across all text fields
  const filteredCourses = courses.filter((c) => {
    const q = searchTerm.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.subtitle.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.target.toLowerCase().includes(q) ||
      c.highlights.some((h) => h.toLowerCase().includes(q)) ||
      c.syllabus.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateX(20px) } to { opacity:1; transform:translateX(0) } }
        @keyframes pulse   { 0%,100% { opacity:1 } 50% { opacity:.45 } }
        @keyframes spin    { to { transform: rotate(360deg) } }
      `}</style>

      <ToastContainer toasts={toasts} remove={removeToast} />

      {deleteTarget && (
        <ConfirmModal
          title="Delete Course"
          message={`Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

        {/* ── Header ───────────────────────────────────────────────── */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f3f4f6", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "20px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
            <div>
              <h2 style={{ fontWeight: 800, fontSize: 22, color: "#0F0F12", display: "flex", alignItems: "center", gap: 8, margin: 0 }}>
                <BookOpen style={{ width: 22, height: 22, color: "#C9A24D" }} />
                Course Manager
              </h2>
              <p style={{ color: "#9ca3af", fontSize: 13, marginTop: 2 }}>
                {courses.length} course{courses.length !== 1 ? "s" : ""} total
              </p>
            </div>
            {!showForm && (
              <button onClick={openForm}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "10px 18px", borderRadius: 10, border: "none",
                  background: "#C9A24D", color: "#0F0F12",
                  fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <Plus style={{ width: 16, height: 16 }} />
                Create Course
              </button>
            )}
          </div>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#9ca3af" }} />
            <input
              type="text"
              placeholder="Search by title, topic, audience, highlights…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 38 }}
            />
          </div>
        </div>

        {/* ── Create / Edit Form ────────────────────────────────────── */}
        {showForm && (
          <div ref={formRef} style={{ background: "#fff", borderRadius: 16, border: "1px solid #f3f4f6", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: 24 }}>
            <h3 style={{ fontWeight: 700, fontSize: 17, color: "#0F0F12", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
              {editingId
                ? <><Edit2 style={{ width: 18, height: 18, color: "#C9A24D" }} /> Edit Course</>
                : <><Plus style={{ width: 18, height: 18, color: "#C9A24D" }} /> Create New Course</>}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              {/* Title + Subtitle */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px,100%), 1fr))", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 6 }}>
                    Course Title <span style={{ color: "#e11d48" }}>*</span>
                  </label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange}
                    placeholder="e.g., MS-CIT" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 6 }}>
                    Subtitle <span style={{ color: "#e11d48" }}>*</span>
                  </label>
                  <input type="text" name="subtitle" value={formData.subtitle} onChange={handleInputChange}
                    placeholder="e.g., Maharashtra State Certificate in IT" style={inputStyle} />
                </div>
              </div>

              {/* Duration + Target */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px,100%), 1fr))", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 6 }}>
                    Duration <span style={{ color: "#e11d48" }}>*</span>
                  </label>
                  <input type="text" name="duration" value={formData.duration} onChange={handleInputChange}
                    placeholder="e.g., 3 Months" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 6 }}>
                    Target Audience <span style={{ color: "#e11d48" }}>*</span>
                  </label>
                  <input type="text" name="target" value={formData.target} onChange={handleInputChange}
                    placeholder="e.g., Students, Job seekers" style={inputStyle} />
                </div>
              </div>

              {/* Icon Picker */}
              <IconPicker value={formData.iconType} onChange={(v) => setFormData((p) => ({ ...p, iconType: v }))} />

              {/* Description */}
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 6 }}>
                  Description <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <textarea name="description" value={formData.description} onChange={handleInputChange}
                  placeholder="Write a detailed description of the course…"
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
              </div>

              {/* Tag inputs */}
              <TagInput
                label="Course Highlights"
                tags={highlights}
                onChange={setHighlights}
                placeholder="e.g., Industry projects"
              />
              <TagInput
                label="Syllabus Topics"
                tags={syllabus}
                onChange={setSyllabus}
                placeholder="e.g., Basics of MS Office"
              />

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
                <button type="submit" disabled={isSubmitting}
                  style={{
                    flex: 1, padding: "11px 0", borderRadius: 10, border: "none",
                    background: isSubmitting ? "#e8c87a" : "#C9A24D",
                    color: "#0F0F12", fontWeight: 700, fontSize: 14,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}>
                  {isSubmitting
                    ? <><span style={{ width: 16, height: 16, border: "2px solid #0F0F12", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} /> Saving…</>
                    : editingId ? "Update Course" : "Create Course"}
                </button>
                <button type="button" onClick={resetForm}
                  style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: "1px solid #e5e7eb", background: "#f9fafb", color: "#374151", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── Course List ───────────────────────────────────────────── */}
        {isLoading ? (
          <CourseSkeleton />
        ) : filteredCourses.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filteredCourses.map((course) => {
              const IconComp = getIconComponent(course.iconType);
              const isHovered = hoveredCard === course.id;
              return (
                <div key={course.id}
                  onMouseEnter={() => setHoveredCard(course.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: "#fff", borderRadius: 16,
                    border: "1px solid #f3f4f6",
                    boxShadow: isHovered ? "0 8px 24px rgba(0,0,0,0.09)" : "0 1px 4px rgba(0,0,0,0.06)",
                    padding: 24, display: "flex", gap: 20, transition: "box-shadow 0.25s",
                    flexWrap: "wrap",
                  }}>
                  {/* Icon */}
                  <div style={{ background: "#fef3c7", borderRadius: 14, width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <IconComp style={{ width: 32, height: 32, color: "#C9A24D" }} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontWeight: 800, fontSize: 17, color: "#0F0F12", marginBottom: 2 }}>{course.title}</h3>
                    <p style={{ color: "#C9A24D", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{course.subtitle}</p>
                    <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 12, lineHeight: 1.6,
                      display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {course.description}
                    </p>

                    {/* Meta row */}
                    <div style={{ display: "flex", gap: 20, marginBottom: 12, flexWrap: "wrap" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#6b7280", fontSize: 13 }}>
                        <Clock style={{ width: 14, height: 14 }} /> {course.duration}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#6b7280", fontSize: 13 }}>
                        <Users style={{ width: 14, height: 14 }} /> {course.target}
                      </span>
                    </div>

                    {/* Highlights pills */}
                    {course.highlights.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                        {course.highlights.slice(0, 4).map((h, idx) => (
                          <span key={idx} style={{ background: "#fef3c7", color: "#92400e", borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>
                            {h}
                          </span>
                        ))}
                        {course.highlights.length > 4 && (
                          <span style={{ background: "#f3f4f6", color: "#6b7280", borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 600 }}>
                            +{course.highlights.length - 4} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Action buttons — Edit always visible, Delete separated with gap */}
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <button onClick={() => handleEdit(course)}
                        style={{
                          display: "flex", alignItems: "center", gap: 6,
                          padding: "8px 14px", borderRadius: 8, border: "none",
                          background: "#eff6ff", color: "#1d4ed8",
                          fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "opacity 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
                        <Edit2 style={{ width: 14, height: 14 }} /> Edit
                      </button>

                      {/* Visual separator */}
                      <div style={{ width: 1, height: 24, background: "#e5e7eb", margin: "0 4px" }} />

                      <button
                        onClick={() => setDeleteTarget({ id: course.id, title: course.title })}
                        style={{
                          display: "flex", alignItems: "center", gap: 6,
                          padding: "8px 14px", borderRadius: 8, border: "none",
                          background: isHovered ? "#fff1f2" : "#f9fafb",
                          color: isHovered ? "#e11d48" : "#9ca3af",
                          fontWeight: 600, fontSize: 13, cursor: "pointer",
                          transition: "all 0.2s",
                        }}>
                        <Trash2 style={{ width: 14, height: 14 }} /> Delete
                      </button>

                      {/* View syllabus summary */}
                      {course.syllabus.length > 0 && (
                        <span style={{ marginLeft: "auto", color: "#9ca3af", fontSize: 12, display: "flex", alignItems: "center", gap: 3 }}>
                          <ChevronRight style={{ width: 13, height: 13 }} />
                          {course.syllabus.length} syllabus topics
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ── Empty State with CTA ──────────────────────────────── */
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f3f4f6", padding: "56px 24px", textAlign: "center" }}>
            <div style={{ background: "#fef3c7", borderRadius: "50%", width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <BookOpen style={{ width: 28, height: 28, color: "#C9A24D" }} />
            </div>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: "#0F0F12", marginBottom: 8 }}>
              {searchTerm ? "No courses match your search" : "No courses yet"}
            </h3>
            <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 24 }}>
              {searchTerm
                ? "Try a different keyword — search covers titles, topics, audience, highlights and more."
                : "Create your first course to get started."}
            </p>
            {!searchTerm && (
              <button onClick={openForm}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "11px 24px", borderRadius: 10, border: "none",
                  background: "#C9A24D", color: "#0F0F12",
                  fontWeight: 700, fontSize: 14, cursor: "pointer",
                }}>
                <Plus style={{ width: 16, height: 16 }} />
                Create First Course
              </button>
            )}
          </div>
        )}

      </div>
    </>
  );
}
