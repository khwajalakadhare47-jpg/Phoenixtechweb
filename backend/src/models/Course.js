const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    target: { type: String, required: true },
    highlights: [{ type: String }],
    syllabus: [{ type: String }],
    iconType: { type: String, default: "Award" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
