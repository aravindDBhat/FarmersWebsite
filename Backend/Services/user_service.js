const User = require("../models/usermodel");
async function validateUser(req, res) {
  const { id, name, email, password } = req.body;
  try {
    if (!name) {
      return {
        StatusCode: 400,
        message: "Please enter the Name",
      };
    }
    if (!email) {
      return {
        StatusCode: 400,
        message: "Please enter the Email",
      };
    }
    if (!password) {
      return {
        StatusCode: 400,
        message: "Please enter the Password",
      };
    }
    const Exist = await User.findOne({ email });
    if (Exist) {
      return {
        StatusCode: 409,
        message: "User alredy exist. Please login.",
      };
    } else {
      const newUser = new User({
        id,
        name,
        email,
        password,
      });
      await newUser.save();
      return {
        StatusCode: 200,
        message: "Successfully registered",
      };
    }
  } catch (error) {
    console.log(error.message);
    return res.json({
      StatusCode: 400,
      message: error.message,
    });
  }
}

async function getUsers() {
  const data = await User.find({});
  return data;
}

module.exports = {
  getUsers,
  validateUser,
};
