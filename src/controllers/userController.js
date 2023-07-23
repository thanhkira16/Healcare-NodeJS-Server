import db from "../models/index";
import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Email and password are required",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMsg,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  let users = await userService.getAllUsers();
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "No user ID provided",
      users: [],
    });
  }
  return res.status(200).json({
    errCode: 0,
    message: "ok",
    users: users,
  });
};
module.exports = {
  handleLogin,
  handleGetAllUsers,
};
