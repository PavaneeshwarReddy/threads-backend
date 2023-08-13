const express = require("express");
const authRouter = express.Router();

const {
  userExistCheckMiddleWareSignUp,
  userExistCheckMiddleWareSignIn,
} = require("../MiddleWares/authMiddleWare");
const userModel = require("../Models/userModel");

authRouter.post(
  "/signup",
  userExistCheckMiddleWareSignUp,
  async (request, response) => {
    const { username, password } = request.body;
    //if u have any validation it is better to use build else you can go with create
    const newUser = userModel.build({
      username: username,
      password: password,
    });
    try {
      await newUser.save();
      response.json({ message: "User registered succesfully" });
    } catch (error) {
      response.json({ error: error });
    }
  }
);

authRouter.post(
  "/signin",
  userExistCheckMiddleWareSignIn,
  async (request, response) => {
    const { username, password, originalPassword } = request.body;
    if (originalPassword == password)
      response.status(200).json({ message: "logged in successfully" });
    else {
      response.status(404).json({ message: "Invalid password" });
    }
  }
);

module.exports = authRouter;
