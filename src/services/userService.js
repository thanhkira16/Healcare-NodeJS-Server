import db from "../models/index";
const bcrypt = require("bcrypt");
const saltRounds = 10;

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isExist = await checkUserEmail(email);
      let userData = {};
      if (isExist) {
        userData = checkUserPassword(email, password);
        resolve(userData);
      } else {
        userData.errCode = 2;
        userData.errMsg = "Invalid email";
        resolve(userData);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserPassword = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      const user = await db.User.findOne({
        where: {
          email: email,
        },
        attributes: ["email", "roleId", "password"],
      });

      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          userData.errCode = 0;
          userData.errMsg = "Valid password";
          const safeUserData = { ...user.get(), password: undefined };
          userData.user = safeUserData;
          resolve(userData);
        } else {
          userData.errCode = 3;
          userData.errMsg = "Invalid password";
          resolve(userData);
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: {
          email: userEmail,
        },
      });

      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin,
};
