const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

const {
  userExistCheckMiddleWareSignUp,
  userExistCheckMiddleWareSignIn,
  validatejsonwebtoken,
} = require("../MiddleWares/authMiddleWare");
const userModel = require("../Models/userModel");

authRouter.get("/validate", validatejsonwebtoken, (request, response) => {
    response.status(200).json({message:"valid access Token"});
});

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
    const { username, password, originalPassword, userId } = request.body;
    console.log(request.body);
    if (originalPassword == password) {
      const accessToken =  jwt.sign(
        { userId: userId, username: username },
        process.env.JWT_ACCESS_SECRET,
      );
      response
        .status(200).cookie("accessToken",accessToken)
        .json({ username: username,accessToken:accessToken });
    } else {
      response.status(404).json({ message: "Invalid password" });
    }
  }
);

module.exports = authRouter;
