import { useState, useEffect } from "react";
import Button from "../Button/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Password(Props) {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState("");
  let data = "";
  const handlePassword = (e) => {
    setError("");
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setError("");
    setConfirmpassword(e.target.value);
  };
  let payload = localStorage.getItem("payload");

  payload = JSON.parse(payload);

  const userInfo = {
    id: "1234",
    name: payload.name,
    email: payload.email,
    number: payload.phone,
    password,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const sendUserData = async () => {
    console.log(userInfo);
    if (!password) {
      setError("Please enter the password");
      return;
    }
    if (!confirmpassword) {
      console.log("cpass");

      setError("Please enter the password");
      return;
    }
    if (password != confirmpassword) {
      setError("Password does not match");
      return;
    }
    try {
      data = await axios.post(
        "http://localhost:4000/api/user/signup",
        userInfo,
        config
      );
      console.log(data.data.msg.message);
      setError(data.data.msg.message);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
    console.log("after : ", localStorage.getItem("payload"));
    localStorage.removeItem("payload");
    localStorage.removeItem("otp");
    navigate("/diseaseDetection");
  };
  useEffect(() => {
    setError(data);
  }, []);
  return (
    <div>
      <div className="password">
        <h2>Enter the Password</h2>
        <div className="passwordbody">
          <div className="input-data">
            <input
              onChange={handlePassword}
              id="password"
              name="password"
              type="password"
              label="Password"
              required="required"
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-data">
            {" "}
            <input
              onChange={handleConfirmPassword}
              id="confirmpassword"
              name="confirmpassword"
              type="password"
              required="required"
            />
            <label htmlFor="confirmpassword">Confirm Password</label>
          </div>
          {error && error.length > 0 ? (
            <div class="alert alert-warning" role="alert">
              {error}
            </div>
          ) : (
            ""
          )}
          <div className="d-flex">
            <button onClick={sendUserData}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Password;
