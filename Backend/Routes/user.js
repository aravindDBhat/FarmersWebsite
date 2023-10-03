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

module.exports = Router;
