"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _viewEngine = _interopRequireDefault(require("./config/viewEngine"));
var _web = _interopRequireDefault(require("./route/web"));
var _connectDB = _interopRequireDefault(require("./config/connectDB"));
var _cors = _interopRequireDefault(require("./config/cors"));
var _JWTAction = require("./middleware/JWTAction");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
require("dotenv").config();
var app = (0, _express["default"])();
app.use(
  _bodyParser["default"].json({
    limit: "50mb",
  })
);
app.use(
  _bodyParser["default"].urlencoded({
    limit: "50mb",
  })
);

//test jwt
(0, _JWTAction.verifyJWT)((0, _JWTAction.createJWT)());

// Use the CORS middleware
app.use(_cors["default"]);
(0, _viewEngine["default"])(app);
(0, _web["default"])(app);
(0, _connectDB["default"])();
var port = process.env.PORT || 6969;
app.listen(port, function () {
  console.log("Backend Node.js is running on port " + port);
});
