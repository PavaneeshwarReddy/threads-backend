const express = require("express");
const postModel = require("../Models/postModel");
const postRouter = express.Router();

postRouter.post("/create", async (request, response) => {
  const { userId, description } = request.body;
  try {
    await postModel.create({
      description: description,
      userId: userId,
    });
    response.status(200).json({ message: "Post created successfully" });
  } catch (e) {
    response.status(200).json({ e });
  }
});

postRouter.post("/getuserthreads", async (request, response) => {
  const { userId } = request.body;
  try {
    const allThreads = await postModel.findAll({ where: { userId: userId } });
    response.status(200).json({ message: allThreads });
  } catch (e) {
    response.status(200).json({ e });
  }
});

module.exports = postRouter;
