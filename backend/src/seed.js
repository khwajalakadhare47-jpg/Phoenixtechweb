require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const Admin = require("./models/Admin");
const Course = require("./models/Course");
const GalleryItem = require("./models/GalleryItem");
const Admission = require("./models/Admission");

const seed = async () => {
  await connectDB();

  const adminUsername = process.env.SEED_ADMIN_USERNAME || "admin";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "admin@123";

  const existingAdmin = await Admin.findOne({ username: adminUsername });
  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);
    await Admin.create({ username: adminUsername, passwordHash });
    console.log("Seeded admin user");
  }

  await Course.deleteMany({});
  await GalleryItem.deleteMany({});
  await Admission.deleteMany({});

  await Course.insertMany([
    {
      title: "MS-CIT",
      subtitle: "Maharashtra State Certificate in Information Technology",
      iconType: "Award",
      duration: "3 Months",
      target: "Students, Job seekers, Government employees",
      description:
        "Government of Maharashtra approved certification program by MKCL. This comprehensive course covers essential computer skills required in today's digital workplace.",
      highlights: [
        "Government approved certification",
        "Recognized by MKCL",
        "Theory and practical training",
        "Official examination center",
        "Certificate valid across Maharashtra",
        "Mandatory for government jobs",
      ],
      syllabus: [
        "Introduction to Computers",
        "Windows Operating System",
        "MS Word - Document Processing",
        "MS Excel - Spreadsheets",
        "MS PowerPoint - Presentations",
        "Internet & Email",
        "Digital Security",
      ],
    },
    {
      title: "Basic Computer Course",
      subtitle: "Foundation Course for Beginners",
      iconType: "Monitor",
      duration: "1-2 Months",
      target: "Complete beginners, School students, Homemakers",
      description:
        "Perfect for those starting their computer journey. Learn fundamental concepts and gain confidence in using computers for daily tasks.",
      highlights: [
        "No prior knowledge required",
        "Hands-on practical training",
        "Learn at your own pace",
        "Certificate on completion",
        "Typing speed development",
        "Real-world applications",
      ],
      syllabus: [
        "Computer Basics & Hardware",
        "Keyboard & Mouse Usage",
        "Typing Practice",
        "File Management",
        "Internet Browsing",
        "Email Usage",
        "Basic MS Office",
      ],
    },
  ]);

  await GalleryItem.insertMany([
    {
      title: "Main Campus Building",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
      category: "campus",
      description: "Front view of the campus building",
    },
    {
      title: "Computer Lab",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
      category: "facilities",
      description: "Modern computer lab setup",
    },
    {
      title: "Classroom Session",
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
      category: "classroom",
      description: "Interactive classroom session",
    },
  ]);

  await Admission.insertMany([
    {
      fullName: "Rohit Sharma",
      email: "rohit@example.com",
      mobileNumber: "9876543210",
      inquiryType: "student",
      currentClass: "12th",
      interestedCourses: ["MS-CIT", "Basic Computer"],
      preferredBatch: "morning",
      consentToContact: "Yes",
      status: "new",
    },
    {
      fullName: "Neha Verma",
      email: "neha@example.com",
      mobileNumber: "9123456780",
      inquiryType: "professional",
      currentClass: "BSc",
      interestedCourses: ["Coding"],
      preferredBatch: "evening",
      consentToContact: "Yes",
      status: "reviewed",
    },
  ]);

  console.log("Seed data inserted");
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
