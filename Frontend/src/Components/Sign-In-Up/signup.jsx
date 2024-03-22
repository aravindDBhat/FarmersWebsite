import Input from "./InputField/input";
import Button from "./Button/button";
import SocialIcons from "./SocialIcon/socialicon";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
function Signup() {
  const navigate = useNavigate();

  const [signupemail, setSignupEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [signuppassword, setSignupPassword] = useState("");
  const [error, setError] = useState("");
  let data = "";
  const handleEmail = (e) => {
    setError("");
    setSignupEmail(e.target.value);
  };
  const handleName = (e) => {
    setError("");
    setName(e.target.value);
  };
  const handlePhone = (e) => {
    setError("");
    setPhone(e.target.value);
  };

  const sendOtp = async () => {
    const payload = {
      email: signupemail,
      name,
      phone,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    localStorage.setItem("payload", JSON.stringify(payload));
    console.log(payload);

    navigate("/Emailverification");
  };
  const ValidatePayload = () => {
    if (!name) {
      setError("Enter the User Name");
      return;
    }
    if (!phone) {
      setError("Enter the Phone Number");
      return;
    }
    if (!signupemail) {
      setError("Enter the Email address");
      return;
    }
    sendOtp();
  };
  useEffect(() => {
    setError(data);
  }, []);
  return (
    <div className="signin">
      <h2>Sign Up</h2>
      <span>or use your email for Signup</span>
      <Input func={handleName} type="text" placeholder="Name" />
      <Input func={handlePhone} type="text" placeholder="Phone Number" />
      <Input func={handleEmail} type="email" placeholder="Email" />
      {error && error.length > 0 ? (
        <div class="alert alert-warning" role="alert">
          {error}
        </div>
      ) : (
        ""
      )}
      <Button func={ValidatePayload} text="Sign Up" />
    </div>
  );
}
export default Signup;
