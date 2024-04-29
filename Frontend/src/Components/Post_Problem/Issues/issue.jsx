import Footer from "./Footer/footer";
import Body from "./Body/body";
import { useState, useEffect } from "react";
import Axios from "axios";

function Issue() {
  const [issues, setIssues] = useState();
  const [search, setSearch] = useState();
  let Token = localStorage.getItem("Token");
  Token = JSON.parse(Token);
  console.log("here : ", typeof Token.type);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const getAllIssues = async () => {
    const data = await Axios.get("http://localhost:4000/api/user/posts");
    if (Token.type == "2") {
      setIssues(data.data.users.data.slice(0));
    } else {
      setIssues(data.data.users.data);
    }
    console.log("get method : ", data.data.users.data.slice(0, 2));
  };
  const searchIssue = async () => {
    const p = {
      search,
    };
    if (search) {
      console.log("searching : ");
      const data = await Axios.post("http://localhost:4000/api/user/post", p);
      setIssues(data.data.users.data);
      console.log("post method", data.data.users.data);
    } else {
      getAllIssues();
    }
  };
  useEffect(() => {
    getAllIssues();
    setIssues();
    setSearch();
  }, []);
  return (
    <div>
      <Footer function={handleSearch} function2={searchIssue} />
      <Body issues={issues} search={search} />
    </div>
  );
}
export default Issue;
