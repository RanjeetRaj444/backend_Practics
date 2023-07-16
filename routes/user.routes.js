const express = require("express");
const mongoose = require("mongoose");
const userModel = require("../models/user.models");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../middleware/user.auth");

router.get("/", auth, async (req, res) => {
  console.log(req.body);
  try {
    const user = await userModel.find();
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post("/register", async function (req, res) {
  const { name, email, password, age } = req.body;
  //   console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(password, 5);
    const data = await userModel.create({
      name,
      email,
      password: newPassword,
      age,
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.post("/login", async function (req, res) {
  const { email, password } = req.body;
  try {
    const data = await userModel.findOne({ email });
    console.log(data);
    if (!data) res.status(400).send("Invalid credentials Register First.");
    const verify = bcrypt.compare(password, data.password, (err, result) => {
      if (result) {
        let token = jwt.sign({ userID: data._id, name: data.name }, "practics");
        res.status(200).send({ token: token, msg: "Login success" });
      } else {
        res.status(400).send("Password not macthed");
      }
    });
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = router;
