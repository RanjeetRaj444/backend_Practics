const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user.routes");
const router2 = require("./routes/post.routes");
const cors = require("cors");
app.use(cors);
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/user", router);

app.use("/post", router2);

app.listen(process.env.PORT, async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("App is listening on port", process.env.PORT);
  } catch (err) {
    console.log(err);
  }
});
