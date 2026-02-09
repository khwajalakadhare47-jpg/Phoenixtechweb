const courseService = require("../services/courseService");

const list = async (req, res, next) => {
  try {
    const courses = await courseService.listCourses();
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const course = await courseService.getCourse(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const course = await courseService.createCourse(req.body);
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const course = await courseService.updateCourse(req.params.id, req.body);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const course = await courseService.deleteCourse(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { list, getOne, create, update, remove };
