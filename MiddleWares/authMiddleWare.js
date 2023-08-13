const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");


const userExistCheckMiddleWareSignUp = async (request, response, next) => {
  const { username, password } = request.body;
  const userDetails = await userModel.findOne({
    where: { username: username },
  });
  if (userDetails == null) next();
  else {
    response.status(404).json({ error: "User already exisits" });
  }
};

const userExistCheckMiddleWareSignIn = async (request, response, next) => {
  const { username, password } = request.body;
  const userDetails = await userModel.findOne({
    where: { username: username },
  });
  if (userDetails ===null)
    response.status(404).json({ message: "username not found,please try to sign up" });
  else {
    request.body.originalPassword = userDetails.dataValues.password;
    request.body.userId = userDetails.dataValues.id;
    next();
  }
};



//this is to validate the json web token
const validatejsonwebtoken = (request, response, next) => {
  const { accessToken } = request.cookies; // Use request.cookies instead of request.cookie
  console.log(accessToken);
  jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (error, decoded) => {
      console.log("decoded token " + decoded.userId);
      if (!error) {
          next();
      } else {
          response.status(403).json({error:"In-valid access token"});
      }
  });
};






module.exports = {
  userExistCheckMiddleWareSignUp,
  userExistCheckMiddleWareSignIn,
  validatejsonwebtoken
};
