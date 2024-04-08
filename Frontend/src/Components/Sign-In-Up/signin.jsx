import { useState, useEffect } from "react";
import Input from "./InputField/input";
import Button from "./Button/button";
import SocialIcons from "./SocialIcon/socialicon";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
function Signin(Props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const date = new Date();
  const handleEmail = (e) => {
    setError("");
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setError("");
    setPassword(e.target.value);
  };

  const payload = {
    email,
    password,
  };
  let data = "";
  const credentialSubmit = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    data = await Axios.post(
      "http://localhost:4000/api/user/signin",
      payload,
      config
    );
    console.log("data is : ", data.data.msg);
    if (data) {
      setError(data.data.msg.msg);
    }
    if (data.data.msg.StatusCode == 200) {
      const Token = {
        id: data.data.msg.id,
        date: date.getDate(),
      };
      localStorage.setItem("Token", JSON.stringify(Token));

      console.log(localStorage.getItem("Token", Token));

      navigate("/");
    }
    setEmail("");
    setPassword("");
  };

  const validatePayload = () => {
    if (!email) {
      setError("Enter the Email address");
      return;
    }
    if (!password) {
      setError("Please enter the Password");
      return;
    }
    credentialSubmit();
  };

  useEffect(() => {
    setError(data);
  }, []);
  return (
    <div className="signin">
      <h2>Sign In</h2>
      <SocialIcons />
      <span>or use your email for login</span>
      <div className="inputbody">
        <Input
          func={handleEmail}
          val={email}
          type="email"
          placeholder="Email"
        />
        <Input
          func={handlePassword}
          val={password}
          type="password"
          placeholder="Password"
        />
      </div>

      {error && error.length > 0 ? (
        <div class="alert alert-warning" role="alert">
          {error}
        </div>
      ) : (
        ""
      )}
      <a href="/">Forget password?</a>
      <Button func={validatePayload} text="Sign In" />
    </div>
  );
}
export default Signin;
