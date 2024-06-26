const Express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Dotenv = require("dotenv");

const userService = require("./Routes/user.routes");
Dotenv.config();
const app = Express();
app.use(Express.json());
app.use(bodyparser.json());
app.use("/files", Express.static("files"));
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(cors());
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

app.listen(4000 || PORT, () => {
  console.log("server running on port 4000");
});
