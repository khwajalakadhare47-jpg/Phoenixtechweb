const mongoose = require("mongoose");

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    category: { type: String, default: "general" },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GalleryItem", galleryItemSchema);
