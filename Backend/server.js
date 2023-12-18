const Express = require("express");
const bodyparser = require("body-parser");
const Core = require("cores");
const mongoose = require("mongoose");
const Dotenv = require("dotenv");
const userService = require("./Routes/user.routes");
Dotenv.config();
const app = Express();
app.use(Express.json());
app.use(bodyparser.json());
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

app.listen(3000, () => {
  console.log("server running on port 3000");
});
