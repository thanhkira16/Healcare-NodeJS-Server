import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import setCorsHeaders from "./config/cors";
import { createJWT, verifyJWT } from "./middleware/JWTAction";

require("dotenv").config();

let app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb" }));

//test jwt
verifyJWT(createJWT());

// Use the CORS middleware
app.use(setCorsHeaders);

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log("Backend Node.js is running on port " + port);
});
