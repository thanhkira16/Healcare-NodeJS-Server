import db from "../models/index";
import userService from "../services/userService";

let handleClientLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(403).json({
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

module.exports = {
  handleClientLogin,
};
