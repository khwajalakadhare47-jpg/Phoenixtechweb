import React, { useState } from "react";
import {
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  Search,
  Clock,
  Users,
  Award,
  Monitor,
  Code,
  MessageSquare,
} from "lucide-react";
import { useAdmin, Course } from "../../contexts/AdminContext";

export function AdminCourses() {
  const { courses, addCourse, deleteCourse, updateCourse } = useAdmin();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    duration: "",
    target: "",
    highlights: [] as string[],
    syllabus: [] as string[],
    iconType: "Award" as string,
  });
  const [highlightInput, setHighlightInput] = useState("");
  const [syllabusInput, setSyllabusInput] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const parseCommaList = (value: string) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const highlights = parseCommaList(highlightInput);
    const syllabus = parseCommaList(syllabusInput);

    if (
      !formData.title ||
      !formData.subtitle ||
      !formData.description ||
      !formData.duration ||
      !formData.target ||
      highlights.length === 0 ||
      syllabus.length === 0
    ) {
      alert("Please fill in all fields including highlights and syllabus");
      return;
    }

    if (editingId) {
      // Update existing course
      const updatedCourse: Course = {
        id: editingId,
        ...formData,
        highlights,
        syllabus,
      };
      await updateCourse(updatedCourse);
      setEditingId(null);
    } else {
      // Add new course
      await addCourse({
        ...formData,
        highlights,
        syllabus,
      });
    }

    resetForm();
    setShowAddForm(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      duration: "",
      target: "",
      highlights: [],
      syllabus: [],
      iconType: "Award",
    });
    setHighlightInput("");
    setSyllabusInput("");
  };

  const handleEdit = (course: Course) => {
    setFormData({
      title: course.title,
      subtitle: course.subtitle,
      description: course.description,
      duration: course.duration,
      target: course.target,
      highlights: course.highlights,
      syllabus: course.syllabus,
      iconType: course.iconType,
    });
    setHighlightInput(course.highlights.join(", "));
    setSyllabusInput(course.syllabus.join(", "));
    setEditingId(course.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await deleteCourse(id);
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    resetForm();
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const iconOptions = [
    { value: "Award", label: "Award (MS-CIT)" },
    { value: "Monitor", label: "Monitor (Basic Computer)" },
    { value: "Code", label: "Code (Coding Classes)" },
    { value: "MessageSquare", label: "MessageSquare (English Speaking)" },
  ];

  const getIcon = (iconType: string) => {
    const iconClass = "w-12 h-12 text-[#C9A24D]";
    switch (iconType) {
      case "Award":
        return <Award className={iconClass} />;
      case "Monitor":
        return <Monitor className={iconClass} />;
      case "Code":
        return <Code className={iconClass} />;
      case "MessageSquare":
        return <MessageSquare className={iconClass} />;
      default:
        return <Award className={iconClass} />;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F0F12] flex items-center gap-2">
              <BookOpen className="w-5 sm:w-6 h-5 sm:h-6 text-[#C9A24D]" />
              Course Manager
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">{filteredCourses.length} courses</p>
          </div>
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[#0F0F12] text-white rounded-lg hover:bg-[#2A2E35] transition font-medium text-sm"
            >
              <Plus className="w-4 h-4" />
              Create Course
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D] text-sm"
          />
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-[#0F0F12] mb-4">
            {editingId ? "Edit Course" : "Create New Course"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title and Subtitle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#4A4A4A] mb-2">
                  Course Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., MS-CIT"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#4A4A4A] mb-2">
                  Subtitle *
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Maharashtra State Certificate in IT"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D] text-sm"
                />
              </div>
            </div>

            {/* Duration and Target */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#4A4A4A] mb-2">
                  Duration *
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 3 Months"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#4A4A4A] mb-2">
                  Target Audience *
                </label>
                <input
                  type="text"
                  name="target"
                  value={formData.target}
                  onChange={handleInputChange}
                  placeholder="e.g., Students, Job seekers"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D] text-sm"
                />
              </div>
            </div>

            {/* Icon Type */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#4A4A4A] mb-2">
                Course Icon *
              </label>
              <select
                name="iconType"
                value={formData.iconType}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D] text-sm"
              >
                {iconOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#4A4A4A] mb-2">
                Course Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Write a detailed description of the course..."
                rows={3}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D] resize-none text-sm"
              />
            </div>

            {/* Course Highlights */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#4A4A4A] mb-2">
                Course Highlights *
              </label>
              <input
                type="text"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                placeholder="e.g., Industry projects, Certificate, Placement support"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D] text-sm"
              />
              <p className="text-[11px] sm:text-xs text-gray-500 mt-2">
                Separate each highlight with a comma.
              </p>
            </div>

            {/* Syllabus */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#4A4A4A] mb-2">
                Syllabus (What You'll Learn) *
              </label>
              <input
                type="text"
                value={syllabusInput}
                onChange={(e) => setSyllabusInput(e.target.value)}
                placeholder="e.g., Basics, Tools, Projects, Interview prep"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D] text-sm"
              />
              <p className="text-[11px] sm:text-xs text-gray-500 mt-2">
                Separate each topic with a comma.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[#C9A24D] text-[#0F0F12] rounded-lg hover:bg-[#B89040] transition font-semibold text-sm"
              >
                {editingId ? "Update Course" : "Create Course"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-4 py-2 bg-gray-200 text-[#0F0F12] rounded-lg hover:bg-gray-300 transition font-semibold text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Courses List */}
      <div className="space-y-4">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#C9A24D]/10 rounded-lg flex items-center justify-center">
                  {getIcon(course.iconType)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-[#0F0F12] mb-1">
                  {course.title}
                </h3>
                <p className="text-[#C9A24D] text-xs sm:text-sm mb-2">{course.subtitle}</p>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm mb-4">
                  <div className="flex items-center gap-2 text-[#7A7A7A]">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-2 text-[#7A7A7A]">
                    <Users className="w-4 h-4" />
                    {course.target}
                  </div>
                </div>

                {/* Highlights Preview */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-[#4A4A4A] mb-1">Highlights:</p>
                  <div className="flex flex-wrap gap-1">
                    {course.highlights.slice(0, 3).map((h, idx) => (
                      <span
                        key={idx}
                        className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded"
                      >
                        {h}
                      </span>
                    ))}
                    {course.highlights.length > 3 && (
                      <span className="bg-gray-100 text-gray-800 text-[10px] px-2 py-0.5 rounded">
                        +{course.highlights.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(course)}
                    className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium text-xs sm:text-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium text-xs sm:text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-8 sm:py-12 bg-white rounded-lg shadow-md">
          <BookOpen className="w-12 sm:w-16 h-12 sm:h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium text-sm sm:text-base">No courses found</p>
        </div>
      )}
    </div>
  );
}
