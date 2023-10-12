import db from "../models/index";
const bcrypt = require("bcrypt");
const saltRounds = 10;

let handleUserLogin = (email, password) => {
  console.log("Login", email, password);
  return new Promise(async (resolve, reject) => {
    try {
      const isExist = await checkUserEmail(email);
      let userData = {};
      if (isExist) {
        let user = await db.User.findOne({
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "firstName",
            "lastName",
          ],
          where: {
            email: email,
          },
          raw: true,
        });

        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            // console.log(check);
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
        // console.log(users);
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
        firstName: data.firstname,
        lastName: data.lastname,
        address: data.address,
        image: data.image,
        phonenumber: data.phonenumber,
        gender: data.gender,
        roleId: data.roleId,
        positionId: data.roleId,
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
  // console.log(userId);
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

const updateUserData = async (data) => {
  try {
    const { id, email, roleId, positionId, gender } = data;
    if (!id || !email || !gender || !roleId || !positionId) {
      return {
        errCode: 2,
        errMsg: "Required fields missing",
      };
    }
    const user = await db.User.findOne({
      where: { id },
      raw: false,
    });

    if (user) {
      const updatedData = {
        email: data.email,
        firstName: data.firstname,
        lastName: data.lastname,
        address: data.address,
        phonenumber: data.phonenumber,
        image: data.image,
        gender: data.gender,
        roleId: data.roleId,
        positionId: data.positionId,
      };
      if (data.image) {
        updatedData.image = data.image;
      }
      console.log("update image", updatedData.image);
      await db.User.update(updatedData, { where: { id } });

      return {
        errCode: 0,
        errMsg: "User updated successfully",
      };
    } else {
      return {
        errCode: 1,
        errMsg: "User not found",
      };
    }
  } catch (error) {
    throw new Error("Error from update user: " + error);
  }
};

let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        let res = {
          errCode: 1,
          errMsg: "Missing or invalid 'typeInput'",
        };
        resolve(res);
        return;
      }

      let res = {};
      let allcode = await db.Allcode.findAll({
        where: { type: typeInput },
      });
      res.errCode = 0;
      res.data = allcode;
      resolve(res);
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
  getAllCodeService,
};
