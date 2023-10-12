require("dotenv").config();
import jwt from "jsonwebtoken";

const createJWT = () => {
  try {
    let payload = { name: "VKU healcare", address: "Da Nang" };
    let key = process.env.JWT_SECRET;
    let token = jwt.sign(payload, key);
    return token;
  } catch (error) {
    // If an error occurs during signing, handle it here
    console.error("Error creating JWT:", error.message);
    return null;
  }
};

const verifyJWT = (token) => {
  try {
    let key = process.env.JWT_SECRET;
    let decoded = jwt.verify(token, key);
    console.log("verifying", decoded);
    return decoded;
  } catch (error) {
    // If the token is invalid or expired, you can handle the error here
    console.error("Error verifying JWT:", error.message);
    return null;
  }
};

module.exports = {
  createJWT,
  verifyJWT,
};
