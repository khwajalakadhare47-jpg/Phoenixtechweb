const authService = require("../services/authService");

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await authService.registerAdmin({ username, password });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await authService.loginAdmin({ username, password });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
