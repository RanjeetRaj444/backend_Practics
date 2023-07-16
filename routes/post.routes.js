const express = require("express");
const mongoose = require("mongoose");
const postModel = require("../models/post.models");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../middleware/user.auth");
router.use(express.json());

router.get("/get", async (req, res) => {
  try {
    const posts = await postModel.find();
    if (posts.length == 0) return res.status(400).send("Create a post first!");
    res.status(200).send({ posts });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});
router.use(auth);
router.post("/create", async (req, res) => {
  const data = req.body;
  try {
    const posts = await postModel.create(data);
    res.status(200).send({ posts });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  //   console.log(req.body);
  try {
    const data = await postModel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).send({ data });
  } catch (err) {
    // console.log("error")
    res.status(400).send({ error: err.message });
  }
});
router.delete("/Delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await postModel.findByIdAndDelete({ _id: id });
    res.status(200).send("Deleted");
  } catch (err) {
    // console.log("error")
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
