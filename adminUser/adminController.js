const Package = require("../model/packageModel");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const JwtPrivateKey = "ajay@ajay9587ajay@AJAY9587";

exports.getPackage = async (req, res) => {
  try {
    let AllPackage = await Package.find();
    return res.status(200).json({
      message: "Success",
      data: AllPackage,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.packageAdd = async (req, res) => {
  try {
    let DataSave = await Package.create(req.body);
    return res.status(200).json({
      message: "Success",
      data: DataSave,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.updatePackage = async (req, res) => {
  try {
    let DataSave = await Package.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    return res.status(200).json({
      message: "Success",
      data: DataSave,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    let DataSave = await Package.findByIdAndDelete(req.body._id);
    return res.status(200).json({
      message: "Success",
      data: DataSave,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// user section callback
exports.allUser = async (req, res) => {
  try {
    let DataSave = await User.find();
    return res.status(200).json({
      message: "Success",
      data: DataSave,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.signup = async (req, res) => {
  try {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      } else {
        if (req.body.role !== "tourforsoul") {
          return res.status(401).json({
            message: "Check Your Secure Key and Try Again",
          });
        } else {
          // create Jwt Token For login
          const authToken = jwt.sign(
            { _id: req.body._id, name: req.body.name, email: req.body.email },
            JwtPrivateKey
          );

          let data = {
            name: req.body.name,
            email: req.body.email,
            authToken: authToken,
            password: hash,
            isActive: req.body.isActive,
            image: req.body.image,
          };
          try {
            let DataSave = await User.create(data);
            return res.status(200).json({
              message: "success",
              data: DataSave,
            });
          } catch (error) {
            return res.status(400).json({ message: error.message });
          }
        }
      }
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    let DataSave = await User.findOne({ email: req.body.email });
    const match = await bcrypt.compare(req.body.password, DataSave.password);
    if (match) {
      // create Jwt Token For login
      const authToken = await jwt.sign(
        { _id: req.body._id, name: req.body.name, email: req.body.email },
        JwtPrivateKey
      );

      return res.status(200).json({ authToken: authToken });
    } else {
      return res.status(400).json({ message: "provide rigth credentials !" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
