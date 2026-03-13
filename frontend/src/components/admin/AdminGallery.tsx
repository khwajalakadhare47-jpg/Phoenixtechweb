import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Plus,
  Search,
  X,
  CheckCircle,
  AlertCircle,
  CloudUpload,
} from "lucide-react";
import { useAdmin } from "../../contexts/AdminContext";

// ─── Toast ────────────────────────────────────────────────────────────────────

type ToastType = "success" | "error";
interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

function ToastContainer({ toasts, remove }: { toasts: Toast[]; remove: (id: number) => void }) {
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10 }}>
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 16px",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            backgroundColor: t.type === "success" ? "#f0fdf4" : "#fff1f2",
            border: `1px solid ${t.type === "success" ? "#bbf7d0" : "#fecdd3"}`,
            color: t.type === "success" ? "#166534" : "#be123c",
            fontWeight: 600,
            fontSize: 14,
            minWidth: "min(280px, calc(100vw - 48px))",
            animation: "slideIn 0.2s ease",
          }}
        >
          {t.type === "success" ? <CheckCircle style={{ width: 18, height: 18, flexShrink: 0 }} /> : <AlertCircle style={{ width: 18, height: 18, flexShrink: 0 }} />}
          <span style={{ flex: 1 }}>{t.message}</span>
          <button onClick={() => remove(t.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0 }}>
            <X style={{ width: 14, height: 14 }} />
          </button>
        </div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);

  const show = useCallback((message: string, type: ToastType = "success") => {
    const id = ++counter.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, show, remove };
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

function ConfirmModal({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9998,
        backgroundColor: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
      onClick={onCancel}
    >
      <div
        style={{
          background: "#fff", borderRadius: 16, padding: 28,
          maxWidth: 360, width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ background: "#fff1f2", borderRadius: 10, padding: 8 }}>
            <Trash2 style={{ width: 20, height: 20, color: "#e11d48" }} />
          </div>
          <h3 style={{ fontWeight: 700, fontSize: 16, color: "#0F0F12", margin: 0 }}>Delete Image</h3>
        </div>
        <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>{message}</p>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: "10px 0", borderRadius: 10, border: "1px solid #e5e7eb",
              background: "#f9fafb", color: "#374151", fontWeight: 600, fontSize: 14, cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1, padding: "10px 0", borderRadius: 10, border: "none",
              background: "#e11d48", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Drag-and-drop File Zone ───────────────────────────────────────────────────

function DropZone({
  file,
  preview,
  onChange,
  onClear,
  error,
}: {
  file: File | null;
  preview: string;
  onChange: (file: File, preview: string) => void;
  onClear: () => void;
  error?: string;
}) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = (f: File) => {
    if (!f.type.match(/image\/(jpg|jpeg|png|webp)/)) {
      return "Only JPG, PNG, or WebP images are allowed.";
    }
    if (f.size > 5 * 1024 * 1024) {
      return "Image must be under 5 MB.";
    }
    const url = URL.createObjectURL(f);
    onChange(f, url);
    return null;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) processFile(f);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) processFile(f);
          e.target.value = "";
        }}
      />

      {preview ? (
        <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", border: "1px solid #e5e7eb" }}>
          <img src={preview} alt="Preview" style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
          <button
            type="button"
            onClick={onClear}
            style={{
              position: "absolute", top: 8, right: 8,
              background: "rgba(0,0,0,0.6)", border: "none", borderRadius: "50%",
              width: 28, height: 28, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <X style={{ width: 14, height: 14, color: "#fff" }} />
          </button>
          <div style={{
            position: "absolute", bottom: 8, left: 8,
            background: "rgba(0,0,0,0.6)", borderRadius: 6, padding: "2px 8px",
            color: "#fff", fontSize: 11, fontWeight: 600,
          }}>
            {file?.name}
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? "#C9A24D" : error ? "#e11d48" : "#d1d5db"}`,
            borderRadius: 12,
            padding: "32px 16px",
            textAlign: "center",
            cursor: "pointer",
            background: dragging ? "#fffbeb" : "#fafafa",
            transition: "all 0.2s",
          }}
        >
          <CloudUpload style={{ width: 36, height: 36, color: dragging ? "#C9A24D" : "#9ca3af", margin: "0 auto 10px" }} />
          <p style={{ fontWeight: 600, color: "#374151", fontSize: 14, marginBottom: 4 }}>
            Drag & drop or <span style={{ color: "#C9A24D" }}>browse</span>
          </p>
          <p style={{ color: "#9ca3af", fontSize: 12 }}>JPG, PNG, WebP — max 5 MB</p>
        </div>
      )}
      {error && <p style={{ color: "#e11d48", fontSize: 12, marginTop: 6, fontWeight: 500 }}>{error}</p>}
    </div>
  );
}

// ─── Category tabs config ─────────────────────────────────────────────────────

const CATEGORIES = ["all", "campus", "classroom", "events", "facilities"];

// ─── AdminGallery ─────────────────────────────────────────────────────────────

export function AdminGallery() {
  const { gallery, addImage, deleteImage } = useAdmin();
  const { toasts, show: showToast, remove: removeToast } = useToast();

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", category: "campus" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [fileError, setFileError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Revoke preview object URL on unmount to avoid memory leak
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file: File, preview: string) => {
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(file);
    setImagePreview(preview);
    setFileError("");
  };

  const handleFileClear = () => {
    if (imagePreview && imagePreview.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview("");
    setFileError("");
  };

  const resetForm = () => {
    handleFileClear();
    setFormData({ title: "", category: "campus" });
    setFileError("");
    setShowUploadForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showToast("Please enter an image title.", "error");
      return;
    }
    if (!imageFile || !imagePreview) {
      setFileError("Please select an image to upload.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert file to base64 for the JSON API (backend stores imageUrl as a string)
      const base64Url = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });

      await addImage({
        title: formData.title.trim(),
        url: base64Url,      // sent to API and stored in backend
        category: formData.category,
      });

      showToast(`"${formData.title}" uploaded successfully.`, "success");
      resetForm();
    } catch (err: any) {
      showToast(err?.message || "Upload failed. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteImage(deleteTarget.id);
      showToast(`"${deleteTarget.title}" deleted.`, "success");
    } catch (err: any) {
      showToast(err?.message || "Failed to delete image.", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  // Filter by search + active category
  const filteredImages = gallery.filter((img) => {
    const matchesSearch =
      img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || img.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    fontSize: 14,
    outline: "none",
    color: "#0F0F12",
    background: "#fafafa",
    boxSizing: "border-box",
  };

  return (
    <>
      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>

      <ToastContainer toasts={toasts} remove={removeToast} />

      {deleteTarget && (
        <ConfirmModal
          message={`Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

        {/* ── Header Card ──────────────────────────────────────────── */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f3f4f6", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "20px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
            <div>
              <h2 style={{ fontWeight: 800, fontSize: 22, color: "#0F0F12", display: "flex", alignItems: "center", gap: 8, margin: 0 }}>
                <ImageIcon style={{ width: 22, height: 22, color: "#C9A24D" }} />
                Gallery Manager
              </h2>
              <p style={{ color: "#9ca3af", fontSize: 13, marginTop: 2 }}>
                {gallery.length} image{gallery.length !== 1 ? "s" : ""} total
              </p>
            </div>
            <button
              onClick={() => setShowUploadForm((v) => !v)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 18px", borderRadius: 10, border: "none",
                background: "#C9A24D", color: "#0F0F12",
                fontWeight: 700, fontSize: 14, cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <Plus style={{ width: 16, height: 16 }} />
              Add Image
            </button>
          </div>

          {/* Search bar */}
          <div style={{ position: "relative" }}>
            <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#9ca3af" }} />
            <input
              type="text"
              placeholder="Search by title or category…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 38 }}
            />
          </div>
        </div>

        {/* ── Category Filter Tabs ─────────────────────────────────── */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "7px 16px",
                  borderRadius: 999,
                  border: isActive ? "none" : "1px solid #e5e7eb",
                  background: isActive ? "#C9A24D" : "#fff",
                  color: isActive ? "#0F0F12" : "#6b7280",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 13,
                  cursor: "pointer",
                  textTransform: "capitalize",
                  transition: "all 0.2s",
                }}
              >
                {cat === "all" ? "All Images" : cat}
              </button>
            );
          })}
        </div>

        {/* ── Upload Form ──────────────────────────────────────────── */}
        {showUploadForm && (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f3f4f6", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "24px" }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: "#0F0F12", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
              <Upload style={{ width: 18, height: 18, color: "#C9A24D" }} />
              Upload New Image
            </h3>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Title */}
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 6 }}>
                  Image Title <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Campus Building"
                  style={inputStyle}
                />
              </div>

              {/* Category */}
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 6 }}>
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  style={{ ...inputStyle, appearance: "auto" }}
                >
                  <option value="campus">Campus</option>
                  <option value="classroom">Classroom</option>
                  <option value="events">Events</option>
                  <option value="facilities">Facilities</option>
                </select>
              </div>

              {/* Drag-and-drop file zone */}
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 6 }}>
                  Image File <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <DropZone
                  file={imageFile}
                  preview={imagePreview}
                  onChange={handleFileChange}
                  onClear={handleFileClear}
                  error={fileError}
                />
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    flex: 1, padding: "11px 0", borderRadius: 10, border: "none",
                    background: isSubmitting ? "#e8c87a" : "#C9A24D",
                    color: "#0F0F12", fontWeight: 700, fontSize: 14, cursor: isSubmitting ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span style={{ width: 16, height: 16, border: "2px solid #0F0F12", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                      Uploading…
                    </>
                  ) : (
                    <>
                      <Upload style={{ width: 15, height: 15 }} />
                      Upload Image
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    flex: 1, padding: "11px 0", borderRadius: 10,
                    border: "1px solid #e5e7eb", background: "#f9fafb",
                    color: "#374151", fontWeight: 600, fontSize: 14, cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── Gallery Grid ─────────────────────────────────────────── */}
        {filteredImages.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))",
              gap: 16,
            }}
          >
            {filteredImages.map((image) => (
              <div
                key={image.id}
                onMouseEnter={() => setHoveredCard(image.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  border: "1px solid #f3f4f6",
                  overflow: "hidden",
                  boxShadow: hoveredCard === image.id ? "0 8px 24px rgba(0,0,0,0.1)" : "0 1px 4px rgba(0,0,0,0.06)",
                  transition: "box-shadow 0.25s",
                }}
              >
                {/* Image with hover-only delete */}
                <div style={{ position: "relative", height: 180, background: "#f3f4f6", overflow: "hidden" }}>
                  <img
                    src={image.url}
                    alt={image.title}
                    style={{
                      width: "100%", height: "100%", objectFit: "cover", display: "block",
                      transform: hoveredCard === image.id ? "scale(1.04)" : "scale(1)",
                      transition: "transform 0.35s ease",
                    }}
                  />
                  {/* Delete button — only visible on hover */}
                  <button
                    onClick={() => setDeleteTarget({ id: image.id, title: image.title })}
                    style={{
                      position: "absolute", top: 10, right: 10,
                      background: "#e11d48", border: "none", borderRadius: 8,
                      padding: 8, cursor: "pointer",
                      opacity: hoveredCard === image.id ? 1 : 0,
                      transform: hoveredCard === image.id ? "scale(1)" : "scale(0.8)",
                      transition: "opacity 0.2s, transform 0.2s",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                    title="Delete image"
                  >
                    <Trash2 style={{ width: 15, height: 15, color: "#fff" }} />
                  </button>
                </div>

                {/* Card details */}
                <div style={{ padding: "12px 16px" }}>
                  <h3 style={{ fontWeight: 700, fontSize: 14, color: "#0F0F12", marginBottom: 8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {image.title}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span
                      style={{
                        background: "#fef3c7", color: "#92400e",
                        borderRadius: 999, padding: "3px 10px",
                        fontSize: 11, fontWeight: 700, textTransform: "capitalize",
                      }}
                    >
                      {image.category}
                    </span>
                    {image.uploadedAt && (
                      <span style={{ color: "#9ca3af", fontSize: 11 }}>{image.uploadedAt}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ── Empty State with CTA ──────────────────────────────── */
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #f3f4f6",
              padding: "56px 24px",
              textAlign: "center",
            }}
          >
            <div style={{ background: "#fef3c7", borderRadius: "50%", width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <ImageIcon style={{ width: 28, height: 28, color: "#C9A24D" }} />
            </div>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: "#0F0F12", marginBottom: 8 }}>
              {searchTerm || activeCategory !== "all" ? "No images match your filter" : "No images yet"}
            </h3>
            <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 24 }}>
              {searchTerm || activeCategory !== "all"
                ? "Try adjusting your search or selecting a different category."
                : "Upload your first image to populate the gallery."}
            </p>
            {!searchTerm && activeCategory === "all" && (
              <button
                onClick={() => setShowUploadForm(true)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "11px 24px", borderRadius: 10, border: "none",
                  background: "#C9A24D", color: "#0F0F12",
                  fontWeight: 700, fontSize: 14, cursor: "pointer",
                }}
              >
                <Plus style={{ width: 16, height: 16 }} />
                Upload First Image
              </button>
            )}
          </div>
        )}

      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
