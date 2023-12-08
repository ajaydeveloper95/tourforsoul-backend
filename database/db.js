const mongoose = require("mongoose");

const dbString = "mongodb://127.0.0.1:27017/tourForSoul-db?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.0";

mongoose.connect(dbString)
  .then(() => {
    console.log("Database connect successfully");
  })
  .catch(() => {
    console.log("some issue to connect to database");
  });

module.exports = mongoose