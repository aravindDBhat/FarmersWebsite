import { React, useState } from "react";
import Signup from "./signup";
import Welcomepage from "./welcomepage";

function UserSignUp() {
  return (
    <div>
      {" "}
      <div className="container">
        <Welcomepage link="/signin" pageType="Sign In" />
        <Signup />
      </div>
    </div>
  );
}
export default UserSignUp;
