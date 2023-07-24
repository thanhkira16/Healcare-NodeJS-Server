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

const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Validate the data
      if (
        !data.email ||
        !data.password ||
        !data.firstName ||
        !data.lastName ||
        !data.roleId
      ) {
        resolve({
          errCode: 1,
          errMsg: "Incomplete data. Please provide all required fields.",
        });
        return;
      }

      // Validate email format (this is a simple email regex, a more comprehensive one can be used)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        resolve({
          errCode: 2,
          errMsg: "Invalid email format.",
        });
        return;
      }
      // Check if the email already exists in the database
      const existingUser = await checkUserEmail(data.email);
      if (existingUser === true) {
        // If the email already exists, return an error response
        resolve({
          errCode: 1,
          errMsg: "Email already exists",
        });
        return;
      }
      // If the email doesn't exist, proceed with creating the new user
      let hashedPassword = await hashPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });

      // Return success response after user creation
      resolve({
        errCode: 0,
        errMsg: "User created successfully",
      });
    } catch (error) {
      // If there was an error during the user creation process, reject with the error
      reject(error);
    }
  });
};

let hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

let deleteUser = (userId) => {
  console.log(userId);
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: false,
      });

      if (!user) {
        resolve({
          errCode: 2,
          errMsg: "User not found",
        });
        return;
      }

      // Use the `destroy()` method to delete the user from the database
      await user.destroy();

      resolve({
        errCode: 0,
        errMsg: "User deleted successfully",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userId = data.id;
      console.log(userId);
      if (!userId) {
        resolve({
          errCode: 2,
          errMsg: "Incomplete data. Please provide all required fields.",
        });
        return;
      }
      let user = await db.User.findOne({
        where: { id: userId },
        raw: false,
      });
      console.log(user);

      if (user) {
        let { ...updatedData } = data;
        await db.User.update(updatedData, { where: { id: userId } });
        resolve({
          errCode: 0,
          errMsg: "User updated successfully",
        });
      } else {
        resolve({
          errCode: 1,
          errMsg: "User not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUserData,
};
