import Button from "react-bootstrap/Button";

function CreatePost() {
  return (
    <div className="createpost">
      <h2 className="postheading">Create New Post</h2>
      <input className="image" type="file" />
      <div className="mt-4 inputbody">
        <div className="input-data">
          <input id="Title" name="Title" type="text" required="required" />
          <label htmlFor="Title">Title</label>
        </div>
      </div>

      <textarea
        className="postdetail"
        placeholder="Explaination"
        name=""
        id=""
        cols="60"
        rows="5"
      ></textarea>
      <Button type="submit">Submit</Button>
    </div>
  );
}
export default CreatePost;
