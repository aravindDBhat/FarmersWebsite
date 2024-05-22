import { React, useState } from "react";
import OTP from "./Sign-In-Up/otp/otp";
import Password from "./Sign-In-Up/password/password";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserSignIn from "./Sign-In-Up/usersignin";
import UserSignUp from "./Sign-In-Up/usersignup";
import Welcomepage from "./Sign-In-Up/welcomepage";
import DiseaseDetection from "./Disease-Detection/DiseaseDetection";
import LandingPage from "./LandingPage/LandingPage";
import Post from "./Post_Problem/Post";
import CreatePost from "./Post_Problem/Issues/Create_Post/Createpost";
import Rating from "./Post_Problem/Rating";
import Ecommerce from "./Ecommerce/Ecommerce";
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
        <Route path="/post" element={<Post />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
      </Routes>
    </BrowserRouter>
  );
}
export default NavigatePage;
