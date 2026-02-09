const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true, trim: true },
    inquiryType: { type: String, required: true },
    currentClass: { type: String, required: true },
    interestedCourses: [{ type: String }],
    preferredBatch: { type: String, required: true },
    consentToContact: { type: String, required: true },
    message: { type: String },
    status: { type: String, default: "new" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admission", admissionSchema);
