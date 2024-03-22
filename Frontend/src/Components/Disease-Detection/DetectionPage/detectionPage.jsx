import { useState } from "react";

function DetectionPage() {
  const [image, setImage] = useState(null);
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const response = await axios.post("YOUR_BACKEND_ENDPOINT", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
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
            onChange={handleImage}
            name="file"
          ></input>
          <label htmlFor="file">Choose a Photo</label>
        </div>
      </div>
      <div className="result">
        <h1>Result</h1>
        <div class="inputfile">
          <input
            type="submit"
            onClick={handleUpload}
            id="file"
            name="file"
          ></input>
          <label htmlFor="file">Pridict</label>
        </div>
        <br />
      </div>
    </div>
  );
}
export default DetectionPage;
