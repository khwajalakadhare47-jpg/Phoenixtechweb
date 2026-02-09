const galleryService = require("../services/galleryService");

const list = async (req, res, next) => {
  try {
    const items = await galleryService.listGallery();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const item = await galleryService.getGalleryItem(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Gallery item not found" });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const item = await galleryService.createGalleryItem(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const item = await galleryService.updateGalleryItem(req.params.id, req.body);
    if (!item) {
      return res.status(404).json({ message: "Gallery item not found" });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const item = await galleryService.deleteGalleryItem(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Gallery item not found" });
    }
    res.json({ message: "Gallery item deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { list, getOne, create, update, remove };
