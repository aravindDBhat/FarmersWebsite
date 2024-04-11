const express = require("express");
const userService = require("../Services/user_service");
const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const users = await userService.getUsers(res);
    res.json({
      users,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      message: error.message,
    });
  }
});
Router.post("/post", async (req, res) => {
  try {
    const users = await userService.getPost(req, res);
    res.send({
      users,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      message: error.message,
    });
  }
});
Router.get("/posts", async (req, res) => {
  try {
    const users = await userService.getPosts(req, res);
    res.send({
      users,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      message: error.message,
    });
  }
});

Router.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const msg = await userService.validateUser(req, res);
    return res.json({
      msg,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      msg: error.message,
    });
  }
});

Router.post("/signin", async (req, res) => {
  try {
    const msg = await userService.getUsers(req, res);
    console.log("msg is : ", msg);
    return res.json({
      msg,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      msg: error.message,
    });
  }
});
Router.post("/poster", async (req, res) => {
  console.log(req.body.id);
  try {
    const msg = await userService.getPosterName(req, res);
    console.log("msg is : ", msg);
    return res.json({
      msg,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      msg: error.message,
    });
  }
});
Router.post("/vote", async (req, res) => {
  console.log(req.body.id);
  try {
    const msg = await userService.setVote(req, res);
    console.log("msg is : ", msg);
    return res.json({
      msg,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      msg: error.message,
    });
  }
});

Router.post("/EmailVerification", async (req, res) => {
  try {
    console.log(req.body);

    const data = await userService.otpSender(req, res);

    return res.json({
      msg: data,
    });
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
});

Router.post("/createpost", async (req, res) => {
  try {
    console.log(req.body);
    const data = await userService.validatePost(req, res);

    return res.json({
      msg: data,
    });
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
});

module.exports = Router;
