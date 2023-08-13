const express = require("express");

const app = express();
const { sequelize, connectToDb } = require("./database");
const authRouter = require("./Routes/authRouter");
const postRouter = require("./Routes/postRouter");
app.use(express.json());

app.use("/auth", authRouter);
app.use("/post",postRouter);

app.get("/", (request, response) => {
  response.status(200).json({ messsage: "recieved received successfully" });
});



app.listen(5000, async () => {
  console.log("server started port:5000");
  await connectToDb();
  //this force will drop the existing tables if changes happen
  sequelize.sync({force:true}).then(()=>console.log("sequelize successfull"));
});
