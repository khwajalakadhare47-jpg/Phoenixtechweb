const Course = require("../models/Course");

const listCourses = async () => Course.find().sort({ createdAt: -1 });

const getCourse = async (id) => Course.findById(id);

const createCourse = async (data) => Course.create(data);

const updateCourse = async (id, data) =>
  Course.findByIdAndUpdate(id, data, { new: true });

const deleteCourse = async (id) => Course.findByIdAndDelete(id);

module.exports = {
  listCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
