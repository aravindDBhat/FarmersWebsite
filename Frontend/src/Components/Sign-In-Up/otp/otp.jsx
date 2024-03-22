import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OTP(Props) {
  const navigate = useNavigate();
  const [prestate, setPrestate] = useState(0);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const handleState = () => {
    setError("");
    setPrestate(!prestate);
  };
  const handleOtp = (e) => {
    setError("");
    setOtp(e.target.value);
  };
  let data = "";
  let actualOtp = "";
  let p = localStorage.getItem("payload");
  p = JSON.parse(p);
  const sendOtp = async () => {
    try {
      const payload = {
        email: p.email,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      data = await axios.post(
        "http://localhost:4000/api/user/EmailVerification",
        payload,
        config
      );
      localStorage.setItem("otp", data.data.msg.otp);
      console.log("actualOtp is : ", data.data.msg.otp);
    } catch (err) {
      setError(err.message);
    }
  };

  const checkOtp = () => {
    console.log(typeof otp + " " + otp);
    console.log(typeof actualOtp + " " + actualOtp);
    actualOtp = localStorage.getItem("otp");
    if (actualOtp == otp) {
      console.log("correct");

      navigate("/setPassword");

      return;
    }
    setError("Incorrect OTP");
    console.log("wrong");
  };
  useEffect(() => {
    setError(data);
  }, []);
  return (
    <div>
      <div className="otp">
        {!prestate ? (
          <div>
            <h2>Verification of Email Id</h2>
            <div className="otpbody">
              <p>Send OTP to {p.email}</p>
              <button
                onClick={() => {
                  handleState();
                  sendOtp();
                }}
                className="btn btn-info btn-sm"
              >
                Send OTP
              </button>
            </div>

            <div className="stateButtons">
              <a href="">
                <button className="btn btn-danger">Previous</button>
              </a>
            </div>
          </div>
        ) : (
          <div>
            <h2>Verification of Email Id</h2>
            <div className="otpbody">
              <p>OTP sent to {p.email}</p>
              <div className="passwordbody">
                <div className="input-data">
                  <input
                    className="otpinput"
                    name="OTP"
                    id="OTO"
                    type="text"
                    required="required"
                    onChange={handleOtp}
                  />
                  <label htmlFor="OTP">OTP</label>
                </div>
              </div>
            </div>
            {error && error.length > 0 ? (
              <div class="alert alert-warning" role="alert">
                {error}
              </div>
            ) : (
              ""
            )}
            <div className="stateButtons">
              <a href="/signup">
                <button className="btn btn-danger">Previous</button>
              </a>

              <button onClick={checkOtp} className="btn btn-success">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default OTP;
