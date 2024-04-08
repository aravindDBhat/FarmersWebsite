const User = require("../models/usermodel");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

async function validateUser(req, res) {
  const { id, name, email, number, password, type } = req.body;
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
    if (!number) {
      return {
        StatusCode: 400,
        message: "Please enter the Number",
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
        number,
        password,
        type,
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

async function otpGenerate() {
  const otp = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return otp;
}

async function otpSender(req, res) {
  try {
    const { email } = req.body;
    const OTP = await otpGenerate();
    const transporter = nodemailer.createTransport({
      server: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });
    const info = await transporter.sendMail({
      from: "mitrakrushika02@gmail.com",
      to: email,
      subject: "OTP for email verification",
      text: "To verify your account, please enter the following verification code:", // plain text body
      html: `To verify your account, please enter the following verification code:<br><br>Your OTP is  <b>${OTP} </b><br><br>
   The verification code expires in 2 minutes. If you do not request this code, please ignore this message. `, // html body
    });
    return {
      StatusCode: 200,
      message: "Success",
      otp: OTP,
    };
  } catch (error) {
    return {
      StatusCode: 400,
      message: error.message,
    };
  }
}

async function getUsers(req, res) {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({ email });
    if (data) {
      if (email === data.email && password === data.password) {
        return {
          StatusCode: 200,
          msg: "Logged in",
          id: data.id,
        };
      } else {
        return {
          StatusCode: 400,
          msg: "Wrong Userid and Password",
        };
      }
    } else {
      return {
        StatusCode: 400,
        msg: "Wrong Userid and Password",
      };
    }
  } catch (error) {
    return res.json({
      StatusCode: 400,
      msg: error.message,
    });
  }
}

module.exports = {
  getUsers,
  validateUser,
  otpSender,
};
