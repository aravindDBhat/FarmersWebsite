const User = require("../models/usermodel");
const Post = require("../models/postsmodel");
const Vote = require("../models/votingmodel");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { post } = require("../Routes/user.routes");
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

async function getVoterData(voterid, postid) {
  try {
    console.log(" ids are ", voterid, "/n", postid);
    const data = await Vote.find({ voterid: voterid, postid: postid });
    console.log("getting data : ", data);
    if (data[0]) {
      console.log("running");
      return;
    }

    const newVote = new Vote({
      voterid,
      postid,
    });
    await newVote.save();
    console.log("success");

    return data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
}

async function getPosterName(req, res) {
  const { id, voluenteer } = req.body;
  const data = await User.find({ id });
  const voluenteerData = await User.find({ id: voluenteer });
  return {
    data,
    voluenteerData,
  };
}
async function validatePost(req, res) {
  const { id, posterid, title, description, image, vote, date, voluenteer } =
    req.body;
  try {
    if (!posterid) {
      return {
        StatusCode: 400,
        message: "Something went wrong",
      };
    }
    if (!title) {
      return {
        StatusCode: 400,
        message: "Please enter the title",
      };
    }
    if (!description) {
      return {
        StatusCode: 400,
        message: "Please enter the Description",
      };
    }

    const Exist = await Post.findOne({
      title: title,
      approved: { $in: ["Yes", null] },
    });
    if (Exist) {
      return {
        StatusCode: 409,
        message: "This Issue is alredy posted",
      };
    } else {
      const newPost = new Post({
        id,
        posterid,
        title,
        description,
        image,
        vote,
        date,
        voluenteer,
      });
      await newPost.save();
      return {
        StatusCode: 200,
        message: "Successfully posted",
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
async function setVoluenteer(req, res) {
  try {
    const { id, voluenteer } = req.body;
    console.log("voluenteer : ", voluenteer);
    const taskAssigned = await User.find({ id: voluenteer });
    console.log("data is : ", taskAssigned);
    if (taskAssigned[0].task) {
      return {
        data: "Please complete the assigned task before selecting new task",
      };
    }
    const data = await Post.find({ id });
    console.log("post data : ", data);
    if (data[0].voluenteer) {
      return {
        data: "This task is already assigned ",
      };
    }
    const voluenteerupdate = await User.updateOne(
      { id: voluenteer },
      { $set: { task: id } }
    );
    const voluenteerupdat = await User.find({ id: voluenteer });
    console.log(voluenteerupdat);
    await Post.updateOne({ id }, { $set: { voluenteer: voluenteer } });
    return {
      data: "Task is successfully assigned ",
    };
  } catch (error) {
    return {
      data: error.message,
    };
  }
}

async function postSolution(req, res) {
  try {
    const { id, assignedTask } = req.body;
    const { filename, path, originalname } = req.file;
    console.log("solution is : ", filename);
    const data = await Post.updateOne(
      { id: assignedTask },
      {
        $set: {
          solution: filename,
          path,
          fileOriginalName: originalname,
        },
      }
    );
    await User.updateOne(
      { id },
      {
        $set: {
          task: null,
        },
      }
    );
    return {
      data: "Successfully Posted",
    };
  } catch (error) {
    return {
      data: error.message,
    };
  }
}

async function setVote(req, res) {
  const { id, vote, voterid } = req.body;
  console.log(req.body);
  console.log(voterid);

  try {
    const voteData = await getVoterData(voterid, id);
    console.log("voter data : ", voteData);
    if (voteData) {
      const data = await Post.updateOne({ id }, { $set: { vote: vote + 1 } });
      return {
        data: "Successfully voted for ",
      };
    }
    return {
      data: "You have already voted for ",
    };
  } catch (error) {
    return res.json({
      data: error.message,
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
async function getAssignedTask(req, res) {
  try {
    const { id } = req.body;
    const data = await User.findOne({ id });
    const post = await Post.findOne({ id: data.task });
    return {
      data,
      post,
    };
  } catch (error) {
    return {
      data: error.message,
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
          type: data.type,
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
async function getPost(req, res) {
  const title = req.body.search;
  console.log(title);
  const data = await Post.find({ title });
  return {
    data,
  };
}
async function getApprovalPosts(req, res) {
  try {
    const { id, type } = req.body;
    console.log(id, type);
    if (type == "1") {
      const data = await Post.find({
        posterid: id,
        approved: null,
        solution: { $ne: null },
      });
      if (data[0]) {
        return {
          data,
        };
      }
    } else {
      const data = await Post.find({
        voluenteer: id,
        approved: null,
        solution: { $ne: null },
      });
      console.log(data);
      if (data[0]) {
        return {
          data,
        };
      }
    }
  } catch (error) {
    return {
      data: error.message,
    };
  }
}
async function setApprove(req, res) {
  try {
    const { id, approve, rate, feedback } = req.body;
    let data = await Post.updateOne(
      { id },
      {
        $set: {
          approved: approve,
          rate,
          feedback,
        },
      }
    );
    data = await Post.find({ id });
    return data;
  } catch (error) {
    return error.message;
  }
}
async function getApprovedPosts(req, res) {
  try {
    const { title } = req.body;
    console.log("title is ", title);
    if (title) {
      const data = await Post.find({ title: title, approved: { $ne: null } });
      return {
        data,
      };
    }
    const data = await Post.find({ approved: { $ne: null } });
    return {
      data,
    };
  } catch (error) {
    return {
      data: error.message,
    };
  }
}
async function getPosts(res) {
  try {
    const data = await Post.find({ voluenteer: null }).sort({ vote: -1 });
    return {
      data,
    };
  } catch (error) {
    return {
      data: error.message,
    };
  }
}
async function getsolution(req, res) {
  const { id } = req.body;
  try {
    const data = await Post.findOne({ id });
    return {
      data: data.solution,
    };
  } catch (error) {
    return {
      data: error.message,
    };
  }
}

module.exports = {
  getPost,
  setVote,
  getPosts,
  getUsers,
  validateUser,
  otpSender,
  validatePost,
  getPosterName,
  setVoluenteer,
  postSolution,
  getAssignedTask,
  getApprovalPosts,
  setApprove,
  getApprovedPosts,
  getsolution,
};
