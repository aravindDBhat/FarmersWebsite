import Navbar from "../Navbar/navbar";
import DetectionPage from "./DetectionPage/detectionPage";
import WelcomePage from "./welcomePage/welcomepage";
function DiseaseDetection() {
  return (
    <div className="DiseaseDetection">
      <Navbar />
      <WelcomePage />
      <DetectionPage />
    </div>
  );
}
export default DiseaseDetection;
