const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database/db");

// router file
const AdminRouter = require("./adminUser/adminRouter");

const PORT = 5004;

// For parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Added cors policy of the website to access the backend
app.use(cors({ origin: "*" }));

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,access_token"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// integrate the router on index page
app.use("/admin", AdminRouter);

app.listen(PORT, () => {
  console.log(`Server listen at addresh :http://localhost:${PORT} `);
});
