import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Synchronized with the fields in your Courses.tsx and Home.tsx
export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  target: string;
  highlights: string[];
  syllabus: string[];
  iconType: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  url: string;
  category: string;
  uploadedAt: string;
}

export interface AdmissionResponse {
  id: string;
  email: string; // From Form
  fullName: string;
  mobileNumber: string; // Specific field from Form
  inquiryType: string; // Student/Parent/Professional
  currentClass: string; // Specific field from Form
  interestedCourses: string[]; // Array for multiple checkboxes
  preferredBatch: string; // From Form
  consentToContact: string; // From Form
  submittedAt: string;
  status: "new" | "reviewed" | "accepted" | "rejected";
}

interface AdminContextType {
  isLoggedIn: boolean;
  adminUsername: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  courses: Course[];
  addCourse: (course: Omit<Course, "id">) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  updateCourse: (course: Course) => Promise<void>;
  gallery: GalleryImage[];
  addImage: (img: Omit<GalleryImage, "id" | "uploadedAt">) => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
  responses: AdmissionResponse[];
  addResponse: (res: Omit<AdmissionResponse, "id" | "submittedAt" | "status">) => Promise<boolean>;
  updateResponseStatus: (id: string, status: AdmissionResponse["status"]) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getToken = () => localStorage.getItem("adminToken");

const apiRequest = async (path: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }
  return res.json();
};

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(getToken()));
  const [adminUsername, setAdminUsername] = useState<string | null>(() => localStorage.getItem("adminUsername"));

  const [courses, setCourses] = useState<Course[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [responses, setResponses] = useState<AdmissionResponse[]>([]);

  useEffect(() => {
    const loadPublicData = async () => {
      try {
        const [coursesData, galleryData] = await Promise.all([
          apiRequest("/api/courses"),
          apiRequest("/api/gallery"),
        ]);

        setCourses(
          coursesData.map((c: any) => ({
            id: c._id,
            title: c.title,
            subtitle: c.subtitle,
            description: c.description,
            duration: c.duration,
            target: c.target,
            highlights: c.highlights || [],
            syllabus: c.syllabus || [],
            iconType: c.iconType || "Award",
          }))
        );

        setGallery(
          galleryData.map((g: any) => ({
            id: g._id,
            title: g.title,
            url: g.imageUrl,
            category: g.category || "general",
            uploadedAt: g.createdAt ? new Date(g.createdAt).toLocaleDateString() : "",
          }))
        );
      } catch (err) {
        console.error(err);
      }
    };

    loadPublicData();
  }, []);

  useEffect(() => {
    const loadResponses = async () => {
      if (!isLoggedIn) {
        setResponses([]);
        return;
      }
      try {
        const data = await apiRequest("/api/admissions");
        setResponses(
          data.map((r: any) => ({
            id: r._id,
            email: r.email,
            fullName: r.fullName,
            mobileNumber: r.mobileNumber,
            inquiryType: r.inquiryType,
            currentClass: r.currentClass,
            interestedCourses: r.interestedCourses || [],
            preferredBatch: r.preferredBatch,
            consentToContact: r.consentToContact,
            submittedAt: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "",
            status: r.status || "new",
          }))
        );
      } catch (err) {
        console.error(err);
      }
    };

    loadResponses();
  }, [isLoggedIn]);

  const login = async (username: string, password: string): Promise<boolean> => {
    const result = await apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    if (result?.token) {
      localStorage.setItem("adminToken", result.token);
      localStorage.setItem("adminUsername", result.admin?.username || username);
      setIsLoggedIn(true);
      setAdminUsername(result.admin?.username || username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAdminUsername(null);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
  };

  const addCourse = async (c: Omit<Course, "id">) => {
    const created = await apiRequest("/api/courses", {
      method: "POST",
      body: JSON.stringify(c),
    });
    setCourses((prev) => [
      {
        id: created._id,
        title: created.title,
        subtitle: created.subtitle,
        description: created.description,
        duration: created.duration,
        target: created.target,
        highlights: created.highlights || [],
        syllabus: created.syllabus || [],
        iconType: created.iconType || "Award",
      },
      ...prev,
    ]);
  };

  const deleteCourse = async (id: string) => {
    await apiRequest(`/api/courses/${id}`, { method: "DELETE" });
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCourse = async (updatedCourse: Course) => {
    const saved = await apiRequest(`/api/courses/${updatedCourse.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedCourse),
    });
    setCourses((prev) =>
      prev.map((c) =>
        c.id === updatedCourse.id
          ? {
              id: saved._id,
              title: saved.title,
              subtitle: saved.subtitle,
              description: saved.description,
              duration: saved.duration,
              target: saved.target,
              highlights: saved.highlights || [],
              syllabus: saved.syllabus || [],
              iconType: saved.iconType || "Award",
            }
          : c
      )
    );
  };

  const addImage = async (img: Omit<GalleryImage, "id" | "uploadedAt">) => {
    const created = await apiRequest("/api/gallery", {
      method: "POST",
      body: JSON.stringify({
        title: img.title,
        imageUrl: img.url,
        category: img.category,
      }),
    });
    setGallery((prev) => [
      {
        id: created._id,
        title: created.title,
        url: created.imageUrl,
        category: created.category || "general",
        uploadedAt: created.createdAt ? new Date(created.createdAt).toLocaleDateString() : "",
      },
      ...prev,
    ]);
  };

  const deleteImage = async (id: string) => {
    await apiRequest(`/api/gallery/${id}`, { method: "DELETE" });
    setGallery((prev) => prev.filter((i) => i.id !== id));
  };

  const addResponse = async (
    data: Omit<AdmissionResponse, "id" | "submittedAt" | "status">
  ) => {
    try {
      const created = await apiRequest("/api/admissions", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (isLoggedIn) {
        setResponses((prev) => [
          {
            id: created._id,
            email: created.email,
            fullName: created.fullName,
            mobileNumber: created.mobileNumber,
            inquiryType: created.inquiryType,
            currentClass: created.currentClass,
            interestedCourses: created.interestedCourses || [],
            preferredBatch: created.preferredBatch,
            consentToContact: created.consentToContact,
            submittedAt: created.createdAt ? new Date(created.createdAt).toLocaleDateString() : "",
            status: created.status || "new",
          },
          ...prev,
        ]);
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const updateResponseStatus = async (id: string, status: AdmissionResponse["status"]) => {
    const updated = await apiRequest(`/api/admissions/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    setResponses((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: updated.status || status } : r
      )
    );
  };

  return (
    <AdminContext.Provider value={{ 
      isLoggedIn, adminUsername, login, logout, 
      courses, addCourse, deleteCourse, updateCourse,
      gallery, addImage, deleteImage, 
      responses, addResponse, updateResponseStatus 
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) throw new Error("useAdmin must be used within AdminProvider");
  return context;
}