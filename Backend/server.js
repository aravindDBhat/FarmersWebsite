const Express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Dotenv = require("dotenv");

const userService = require("./Routes/user.routes");
Dotenv.config();
const app = Express();
const allowedOrigins = [
  "https://farmers-website-rbwm.vercel.app",
  "https://farmers-website-gfxg.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(Express.json());
app.use(bodyparser.json());
app.use("/files", Express.static("files"));
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/user", userService);

app.listen(process.env.PORT || 4000, () => {
  console.log("server running on port 4000");
});
