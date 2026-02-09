require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const admissionRoutes = require("./routes/admissionRoutes");

const app = express();

connectDB();

const corsOriginEnv = process.env.CORS_ORIGIN || "*";
const corsOrigins = corsOriginEnv
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: corsOrigins.includes("*") ? "*" : corsOrigins,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "TechWeb API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/admissions", admissionRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
