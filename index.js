const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { sequelize, connectToDb } = require("./database");
const authRouter = require("./Routes/authRouter");
const postRouter = require("./Routes/postRouter");


//this has to be at the top always.
dotenv.config();
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));

app.use(express.json());
app.use("/auth", authRouter);
app.use("/post",postRouter);





app.listen(5105, async () => {
  console.log("server started port:5000");
  await connectToDb();
  //this force will drop the existing tables if changes happen
  sequelize.sync({force:false}).then(()=>console.log("sequelize successfull"));
});
