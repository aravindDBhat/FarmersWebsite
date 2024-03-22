import Signin from "./signin";
import Welcomepage from "./welcomepage";
function UserSignIn() {
  return (
    <div>
      {" "}
      <div className="container">
        <Welcomepage link="/signup" pageType="Sign Up" />
        <Signin />
      </div>
    </div>
  );
}
export default UserSignIn;
