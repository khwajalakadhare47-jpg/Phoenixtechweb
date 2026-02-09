const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const createToken = (admin) => {
  const payload = { id: admin._id, username: admin.username, role: admin.role };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const registerAdmin = async ({ username, password }) => {
  const existing = await Admin.findOne({ username });
  if (existing) {
    const error = new Error("Username already exists");
    error.statusCode = 409;
    throw error;
  }
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const admin = await Admin.create({ username, passwordHash });
  const token = createToken(admin);
  return { admin: { id: admin._id, username: admin.username }, token };
};

const loginAdmin = async ({ username, password }) => {
  const admin = await Admin.findOne({ username });
  if (!admin) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }
  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }
  const token = createToken(admin);
  return { admin: { id: admin._id, username: admin.username }, token };
};

module.exports = {
  registerAdmin,
  loginAdmin,
};
