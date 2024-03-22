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
  console.log(req.body.email);
  console.log(req.body.password);

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

module.exports = Router;
