import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import uuid4 from "uuid4";
import axios from "axios";

function CreatePost() {
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [vote, setVote] = useState();
  const [posterid, setPosterid] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [selectedPdf, setSelectedPdf] = useState();
  const [file, setFile] = useState();
  const [uploaded, setUploaded] = useState(0);
  const [assignedTask, setAssignedTask] = useState();
  const [solutionTitle, setSolutionTitle] = useState();
  const [solutionDescription, setSlotionDescription] = useState();
  const date = new Date();
  let pid = localStorage.getItem("Token");
  pid = JSON.parse(pid);
  console.log("the pid is equal to : ", pid.id);
  const handleAssignedTask = async () => {
    const payload = {
      id: pid.id,
    };
    const data = await axios.post(
      "https://farmerwebsitebackend.onrender.com/api/user/getAssignedTask",
      payload
    );
    console.log("all post data :", data.data.msg.data);
    setAssignedTask(data.data.msg.data.task);
    if (data.data.msg.data.task && data.data.msg.data.task != "false") {
      setSolutionTitle(data.data.msg.post.title);
      setSlotionDescription(data.data.msg.post.description);
    }
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
    setError("");
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
    setError("");
  };

  const handleSolution = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setSelectedPdf("");
    console.log("kkkkkk : ", e.target.files[0]);
  };

  const handlePdfUpload = () => {
    if (!file) {
      console.log("File is not uploaded");
      setError("Please select a file");
      return;
    }

    try {
      setUploaded(!uploaded);
      console.log("File is uploaded");
    } catch (err) {
      setError("Please select an Pdf");
      setFile("");
    }
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

  const solutionSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("assignedTask", assignedTask);
      formData.append("id", pid.id);
      const data = await axios.post(
        "https://farmerwebsitebackend.onrender.com/api/user/postSolution",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data.data.msg.data);
      setError(data.data.msg.data);
    } catch (error) {}
    setSelectedPdf("");
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
      const data = await axios.post(
        "https://farmerwebsitebackend.onrender.com/api/user/createpost",
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
    setPosterid(pid.id);
    generateAndSetToken();
    setError();
    setSelectedImage();
    setUploaded();
    handleAssignedTask();
  }, []);

  return (
    <div className="createpost">
      <h2 className="postheading">Create New Post</h2>
      {pid.type == "2" ? (
        <div className="mt-4 postSolution">
          {solutionTitle ? (
            <form onSubmit={solutionSubmit}>
              <h5>
                <b>Title : </b>
                {solutionTitle}
              </h5>
              <h5>
                <b>Discription : </b>
                {solutionDescription}
              </h5>
              <h5>Upload the solution :</h5>
              <div className="uploadImage">
                <input
                  className="image"
                  type="file"
                  accept="application/pdf"
                  onChange={handleSolution}
                  required
                />
                {uploaded ? (
                  <i class=" ms-5 fa-solid fa-circle-check fa-xl"></i>
                ) : (
                  <Button onClick={handlePdfUpload}>Upload</Button>
                )}
              </div>{" "}
              {error && error.length > 0 ? (
                <div class="mt-3 alert alert-warning" role="alert">
                  {error}
                </div>
              ) : (
                ""
              )}
              <button type="submit">submit</button>
            </form>
          ) : (
            "You are not assigned with any task"
          )}
        </div>
      ) : (
        <div>
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
      )}
    </div>
  );
}
export default CreatePost;
