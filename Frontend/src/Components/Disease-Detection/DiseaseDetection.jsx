import { useEffect } from "react";
import Navbar from "../Navbar/navbar";
import DetectionPage from "./DetectionPage/detectionPage";
import WelcomePage from "./welcomePage/welcomepage";
import { useNavigate } from "react-router-dom";

function DiseaseDetection() {
  const navigate = useNavigate();
  console.log("pass is : ", localStorage.getItem("Token"));

  useEffect(() => {
    const d = new Date();
    let validate = localStorage.getItem("Token");
    validate = JSON.parse(validate);
    if (validate.id && validate.date === d.getDate()) {
      navigate("/diseaseDetection");
    } else {
      navigate("/signin");
    }
  }, []);
  return (
    <div className="DiseaseDetection">
      <Navbar />
      <WelcomePage />
      <DetectionPage />
    </div>
  );
}
export default DiseaseDetection;
