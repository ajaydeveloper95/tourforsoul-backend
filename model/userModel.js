const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    authToken: {
      type: String,
      require: true,
    },
    isActive: {
      type: Boolean,
      require: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// create model of using this schema

const userModel = new mongoose.model("User", userSchema);
module.exports = userModel;
