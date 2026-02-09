const GalleryItem = require("../models/GalleryItem");

const listGallery = async () => GalleryItem.find().sort({ createdAt: -1 });

const getGalleryItem = async (id) => GalleryItem.findById(id);

const createGalleryItem = async (data) => GalleryItem.create(data);

const updateGalleryItem = async (id, data) =>
  GalleryItem.findByIdAndUpdate(id, data, { new: true });

const deleteGalleryItem = async (id) => GalleryItem.findByIdAndDelete(id);

module.exports = {
  listGallery,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
};
