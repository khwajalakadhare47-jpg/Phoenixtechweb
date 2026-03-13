import React, { useState } from "react";
import { Image as ImageIcon, Upload, Trash2, Plus, Search } from "lucide-react";
import { useAdmin } from "../../contexts/AdminContext";

export function AdminGallery() {
  const { gallery, addImage, deleteImage } = useAdmin();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "campus",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.match(/image\/(jpg|jpeg|png)/)) {
        alert("Please upload only JPG or PNG images");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !imageFile || !imagePreview) {
      alert("Please fill in all fields and select an image");
      return;
    }

    await addImage({
      title: formData.title,
      url: imagePreview, // base64 image data
      category: formData.category,
    });
    setFormData({ title: "", category: "campus" });
    setImageFile(null);
    setImagePreview("");
    setShowUploadForm(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      await deleteImage(id);
    }
  };

  const filteredImages = gallery.filter((img) =>
    img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F0F12] flex items-center gap-2">
              <ImageIcon className="w-5 sm:w-6 h-5 sm:h-6 text-[#C9A24D]" />
              Gallery Manager
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">{filteredImages.length} images</p>
          </div>
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[#0F0F12] text-white rounded-lg hover:bg-[#2A2E35] transition font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Image
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D] text-sm"
          />
        </div>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-[#0F0F12] mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#C9A24D]" />
            Add New Image
          </h3>
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#4A4A4A] mb-2">
                Image Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Campus Building"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#4A4A4A] mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D] text-sm"
              >
                <option value="campus">Campus</option>
                <option value="classroom">Classroom</option>
                <option value="events">Events</option>
                <option value="facilities">Facilities</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#4A4A4A] mb-2">
                Upload Image (JPG or PNG)
              </label>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D] text-sm"
              />
              {imagePreview && (
                <div className="mt-3">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-lg border border-gray-300"
                  />
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Accepts JPG and PNG files (max 5MB)
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[#C9A24D] text-[#0F0F12] rounded-lg hover:bg-[#B89040] transition font-semibold text-sm"
              >
                Upload Image
              </button>
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-[#0F0F12] rounded-lg hover:bg-gray-300 transition font-semibold text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredImages.map((image) => (
          <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            {/* Image */}
            <div className="relative w-full h-40 sm:h-48 bg-gray-200 overflow-hidden">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <button
                onClick={() => handleDelete(image.id)}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                title="Delete image"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Details */}
            <div className="p-3 sm:p-4">
              <h3 className="font-semibold text-[#0F0F12] mb-2 text-sm sm:text-base">{image.title}</h3>
              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
                <span className="px-2 sm:px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold capitalize">
                  {image.category}
                </span>
                <span className="text-xs">{image.uploadedAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-8 sm:py-12 bg-white rounded-lg shadow-md">
          <ImageIcon className="w-12 sm:w-16 h-12 sm:h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium text-sm sm:text-base">No images found</p>
        </div>
      )}
    </div>
  );
}
