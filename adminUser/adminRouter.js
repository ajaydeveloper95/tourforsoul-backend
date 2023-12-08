const express = require("express");
const router = express.Router();
const AdminController = require("./adminController");
const Auth = require("../middleware/authVerify");
const { celebrate, Joi } = require("celebrate");

router.get("/", AdminController.getPackage);

router.post(
  "/addPackage",
  celebrate({
    body: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.string().required(),
      duration: Joi.string().required(),
      pickup: Joi.string().required(),
      redirectLink: Joi.string().required(),
      slug: Joi.string().required(),
      packageInfo: Joi.string().required(),
      isActive: Joi.boolean().required(),
      isHomePage: Joi.boolean().required(),
      image: Joi.string().optional(),
    }),
  }),
  Auth.verify,
  AdminController.packageAdd
);

router.post(
  "/updatePackage",
  celebrate({
    body: Joi.object({
      _id: Joi.string().required(),
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      price: Joi.string().optional(),
      duration: Joi.string().optional(),
      pickup: Joi.string().optional(),
      slug: Joi.string().optional(),
      packageInfo: Joi.string().optional(),
      redirectLink: Joi.string().optional(),
      isActive: Joi.boolean().optional(),
      isHomePage: Joi.boolean().optional(),
      image: Joi.string().optional(),
    }),
  }),
  Auth.verify,
  AdminController.updatePackage
);

router.post(
  "/deletePackage",
  celebrate({
    body: Joi.object({
      _id: Joi.string().required(),
    }),
  }),
  Auth.verify,
  AdminController.deletePackage
);

// create user or user router here
router.get("/allUser", AdminController.allUser);

router.post(
  "/signup",
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      isActive: Joi.boolean().required(),
      image: Joi.string().optional(),
      role: Joi.string().required(),
    }),
  }),
  AdminController.signup
);

router.post(
  "/login",
  celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  AdminController.login
);

// Importing the router
module.exports = router;
