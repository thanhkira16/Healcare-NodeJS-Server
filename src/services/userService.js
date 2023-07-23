import db from "../models/index";
const bcrypt = require("bcrypt");
const saltRounds = 10;

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isExist = await checkUserEmail(email);
      let userData = {};
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password"],
          where: {
            email: email,
          },
          raw: true,
        });

        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            console.log(check);
            userData.errCode = 0;
            userData.errMsg = "Login successfully";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMsg = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMsg = "User's not found";
        }
        resolve(userData);
      } else {
        userData.errCode = 1;
        userData.errMsg = "Invalid email";
        resolve(userData);
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

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = [];
      if (userId === "ALL" || !userId) {
        // If userId is "ALL" or not provided, retrieve all users
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
        console.log(users);
      } else {
        // If userId is specified, retrieve the user with that specific id
        const user = await db.User.findOne({
          where: {
            id: userId,
          },
          attributes: {
            exclude: ["password"],
          },
          raw: true, // Return plain object instead of model instance
        });

        if (user) {
          users.push(user); // Add the single user object to the array
        }
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin,
  getAllUsers,
};
