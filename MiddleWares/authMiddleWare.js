const userModel = require("../Models/userModel");

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
  console.log(userDetails)
  if (userDetails == null)
    response.status(404).json({ error: "User doesn't exisits,please try to sign up" });
  else {
    request.body.originalPassword = userDetails.dataValues.password;
    next();
  }
};

module.exports = {
  userExistCheckMiddleWareSignUp,
  userExistCheckMiddleWareSignIn,
};
