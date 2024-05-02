import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import img from "./Issues/leaf.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

function Work() {
  const [issues, setIssues] = useState(null);

  let Token = localStorage.getItem("Token");
  Token = JSON.parse(Token);
  console.log("here : ", typeof Token.type);

  const [data, setData] = useState();
  const [flip, setFlip] = useState(0);
  const [poster, setPoster] = useState();
  const [voluenteer, setVoluenteer] = useState();
  const [voluenteerEmail, setVoluenteerEmail] = useState();
  const [searchs, setSearchs] = useState();

  const handleSearchs = (e) => {
    console.log("ddddddd", e.target.value);
    setSearchs(e.target.value);
  };

  const handleIssues = async () => {
    try {
      const payload = {
        title: searchs,
      };
      const data = await axios.post(
        "http://localhost:4000/api/user/approvedposts",
        payload
      );
      console.log("aaaaaaaa", data);
      if (data.data.users) {
        setIssues(data.data.users.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const viewSolution = async (e) => {
    try {
      const payload = {
        id: e.id,
      };
      const data = await axios.post(
        "http://localhost:4000/api/user/getsolution",
        payload
      );
      window.open(`http://localhost:4000/files/${data.data.data.data}`);
    } catch (error) {}
  };

  const getcardData = async (d, i) => {
    const payload = {
      id: i,
      voluenteer: d.voluenteer,
    };
    const posterdata = await axios.post(
      "http://localhost:4000/api/user/poster",
      payload
    );
    if (d.voluenteer) {
      setVoluenteer(posterdata.data.msg.voluenteerData[0].name);
      setVoluenteerEmail(posterdata.data.msg.voluenteerData[0].email);
    } else {
      setVoluenteer("Not Assigned");
      setVoluenteerEmail("-");
    }
    setPoster(posterdata.data.msg.data[0].name);

    console.log("card data : ", d);
    setData(d);
    setFlip(!flip);
  };
  const handleFlip = () => {
    setFlip(!flip);
  };

  useEffect(() => {
    setIssues();
    handleIssues();
  }, []);
  return (
    <>
      {flip ? (
        <div className="cardDetail" onClick={handleFlip}>
          <div className="detailcard">
            <div className="detailcardHeading">
              {" "}
              <h3>{data.title}</h3>
            </div>
            <div className="detailcarddescription">
              {" "}
              <p>
                <b className="subhead">Description : </b>
                <br></br>
                {data.description}
              </p>
              <p>
                {" "}
                <b className="subhead">Posted by : </b> {poster}
              </p>
              <p>
                {" "}
                <b className="subhead">Date : </b> {data.date}
              </p>
              <p>
                {" "}
                <b className="subhead">Task assigned to : </b>{" "}
                {`${voluenteer} (${voluenteerEmail})`}
              </p>
              <p>
                {" "}
                <b className="subhead">Approved : </b> {data.approved}
              </p>
              <p>
                {" "}
                <b className="subhead">Feedback : </b> {data.feedback}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="issueBody">
          <div className="issueFooter">
            <div className="footerserachbar">
              <input
                onChange={handleSearchs}
                className="footersearch"
                placeholder="Search for Issue"
                type="text"
              />
              <button onClick={handleIssues} type="submit">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
          {console.log("all issues : ", issues)}
          {issues && issues.length > 0
            ? issues.map((issue) => {
                const desc = issue.description;
                return (
                  <div>
                    <Card
                      className="card"
                      style={{ height: "23rem", width: "18rem" }}
                    >
                      <Card.Img
                        className="cardimage"
                        variant="top"
                        src={
                          issue.image && issue.image.length > 5
                            ? issue.image
                            : img
                        }
                      />
                      <Card.Body>
                        <Card.Title>{issue.title}</Card.Title>
                        <Card.Text className="desc">
                          {desc.slice(0, 40)}

                          <p
                            onClick={() => {
                              getcardData(issue, issue.posterid);
                            }}
                          >
                            Read More...
                          </p>
                        </Card.Text>
                        <div className="cardfooter">
                          <Button
                            onClick={() => {
                              viewSolution(issue);
                            }}
                            variant="primary"
                          >
                            {" "}
                            Solution
                          </Button>

                          <span>
                            <i
                              style={{ color: "orange" }}
                              class="me-2 fa-solid fa-star"
                            ></i>
                            {issue.rate}{" "}
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })
            : "No result"}
        </div>
      )}
    </>
  );
}
export default Work;
