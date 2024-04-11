import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import uuid4 from "uuid4";
import Axios from "axios";

function CreatePost() {
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [vote, setVote] = useState();
  const [posterid, setPosterid] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const date = new Date();

  const handleTitle = (e) => {
    setTitle(e.target.value);
    setError("");
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
    setError("");
  };
  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setError("");
    setSelectedImage("");
  };
  const handleUpload = () => {
    if (!image) {
      console.log("image is not uploaded");
      setError("Please select an Image");
      return;
    }
    console.log("image is uploaded");
    try {
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.oneerror = (err) => {
        setError(err.message);
      };
    } catch (err) {
      setError("Please select an Image");
      setImage("");
    }
  };

  const postSubmit = async () => {
    try {
      const payload = {
        id: id,
        posterid,
        description,
        title,
        image: selectedImage,
        vote: 1,
        date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
      };
      console.log(payload);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await Axios.post(
        "http://localhost:4000/api/user/createpost",
        payload,
        config
      );
      console.log("data is : ", data.data.msg);
      if (data) {
        setError(data.data.msg.message);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }

    setTitle("");
    setDescription("");
    setImage("");
    setSelectedImage("");
  };

  const generateAndSetToken = () => {
    const postid = uuid4();

    const isValid = uuid4.valid(postid);
    console.log("id is valid:", isValid);

    console.log("Generated id:", postid);
    setId(postid);
  };

  useEffect(() => {
    let pid = localStorage.getItem("Token");
    pid = JSON.parse(pid);
    setPosterid(pid.id);
    generateAndSetToken();
    setError();
    setSelectedImage();
  }, []);

  return (
    <div className="createpost">
      <h2 className="postheading">Create New Post</h2>
      <div className="uploadImage">
        <input className="image" onChange={handleImage} type="file" />
        {selectedImage && selectedImage.length > 0 ? (
          <i class="fa-solid fa-circle-check fa-xl"></i>
        ) : (
          <Button onClick={handleUpload}>Upload</Button>
        )}
      </div>

      <div className="mt-4 inputbody">
        <div className="input-data">
          <input
            id="Title"
            value={title}
            onChange={handleTitle}
            name="Title"
            type="text"
            required="required"
          />
          <label className="" htmlFor="Title">
            Title
          </label>
        </div>
      </div>

      <textarea
        className="postdetail"
        placeholder="Explaination"
        name=""
        value={description}
        onChange={handleDescription}
        id=""
        rows="5"
      ></textarea>
      {error && error.length > 0 ? (
        <div class="mt-3 alert alert-warning" role="alert">
          {error}
        </div>
      ) : (
        ""
      )}
      <Button onClick={postSubmit}>Submit</Button>
    </div>
  );
}
export default CreatePost;
