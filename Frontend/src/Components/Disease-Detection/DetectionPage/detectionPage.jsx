import { useState } from "react";
import axios from "axios";
function DetectionPage() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const handleImage = (e) => {
    console.log(e.target.files[0]);
    console.log(e.target.files);
    setImage(e.target.files[0]);
    setError("");
    try {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
    } catch (err) {
      setError("Select an Image");
      setSelectedImage("");
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Please select an Image");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", image);
      console.log("check : ", formData);
      const response = await axios.post(
        "http://localhost:8000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded successfully: ", response.data.class);
      setError(response.data.class);
    } catch (err) {
      console.error("Error uploading image:", err);
      setError(err.message);
    }
  };

  return (
    <div className="diseaseDetectioncontainer mt-5 pb-5">
      <div className="selectfile">
        <h1>select file</h1>
        <div class="inputfile">
          <input
            type="file"
            id="file"
            action="image/*"
            onChange={handleImage}
            name="file"
          ></input>
          <label htmlFor="file">Choose a Photo</label>
        </div>
      </div>
      <div className="result">
        <h1>Result</h1>
        {error ? (
          <div className="predictedResult">
            {" "}
            <img src={selectedImage}></img>
            {error}
          </div>
        ) : (
          <div class="inputfile">
            <button onClick={handleUpload}>Predict</button>
          </div>
        )}

        <br />
      </div>
    </div>
  );
}
export default DetectionPage;
