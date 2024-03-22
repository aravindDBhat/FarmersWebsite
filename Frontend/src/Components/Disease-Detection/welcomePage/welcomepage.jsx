function WelcomePage() {
  return (
    <div className="diseaseDetectionBGImage">
      <span className="diseaseDetectionHeadder">
        Try our AI Powered <br />
        Disease Detection
      </span>
      <a href="">
        <button>
          <i class="fa-solid fa-cloud-arrow-up"></i> Try Now
        </button>
      </a>
      <div className="HowItWorks">
        <span>How It Works ?</span>
        <div className="steps">
          <div className="step">
            <i class="fa-solid fa-image"></i>{" "}
            <div className="stepnumber">1</div>
            <span className="stepHead">Take a photo</span>
          </div>

          <div className="step">
            <i class="fa-solid fa-cloud-arrow-up"></i>{" "}
            <div className="stepnumber">2</div>
            <span className="stepHead">Upload a photo</span>
          </div>

          <div className="step">
            <i class="fa-solid fa-list"></i> <div className="stepnumber">3</div>
            <span className="stepHead">Predict the disease</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WelcomePage;
