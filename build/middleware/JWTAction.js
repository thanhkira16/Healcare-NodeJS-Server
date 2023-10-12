"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
require("dotenv").config();
var createJWT = function createJWT() {
  try {
    var payload = {
      name: "VKU healcare",
      address: "Da Nang"
    };
    var key = process.env.JWT_SECRET;
    var token = _jsonwebtoken["default"].sign(payload, key);
    return token;
  } catch (error) {
    // If an error occurs during signing, handle it here
    console.error("Error creating JWT:", error.message);
    return null;
  }
};
var verifyJWT = function verifyJWT(token) {
  try {
    var key = process.env.JWT_SECRET;
    var decoded = _jsonwebtoken["default"].verify(token, key);
    console.log("verifying", decoded);
    return decoded;
  } catch (error) {
    // If the token is invalid or expired, you can handle the error here
    console.error("Error verifying JWT:", error.message);
    return null;
  }
};
module.exports = {
  createJWT: createJWT,
  verifyJWT: verifyJWT
};