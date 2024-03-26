import { React, useState } from "react";
import OTP from "./Sign-In-Up/otp/otp";
import Password from "./Sign-In-Up/password/password";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserSignIn from "./Sign-In-Up/usersignin";
import UserSignUp from "./Sign-In-Up/usersignup";
import Welcomepage from "./Sign-In-Up/welcomepage";
import DiseaseDetection from "./Disease-Detection/DiseaseDetection";
import LandingPage from "./LandingPage/LandingPage";
function NavigatePage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/Emailverification" element={<OTP />} />
        <Route path="/setPassword" element={<Password />} />
        <Route path="/diseaseDetection" element={<DiseaseDetection />} />
      </Routes>
    </BrowserRouter>
  );
}
export default NavigatePage;
