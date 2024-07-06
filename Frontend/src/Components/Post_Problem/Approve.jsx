import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import img from "./Issues/leaf.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Approve() {
  const [issues, setIssue] = useState(null);
  const [data, setData] = useState();
  const [flip, setFlip] = useState(0);
  const [poster, setPoster] = useState();
  const [voluenteer, setVoluenteer] = useState();
  const [voluenteerEmail, setVoluenteerEmail] = useState();
  const navigate = useNavigate();

  let Token = localStorage.getItem("Token");
  Token = JSON.parse(Token);
  const getApprovalData = async () => {
    const Payload = {
      id: Token.id,
      type: Token.type,
    };
    const data = await axios.post(
      "https://farmerwebsitebackend.onrender.com/api/user/Approvalposts",
      Payload
    );
    console.log(data.data.msg);
    if (data.data.msg) {
      console.log(data.data.msg.data);

      await setIssue(data.data.msg.data);
    }
  };
  const viewSolution = async (e) => {
    try {
      const payload = {
        id: e.id,
      };
      const data = await axios.post(
        "https://farmerwebsitebackend.onrender.com/api/user/getsolution",
        payload
      );
      console.log("333333333", data.data.data.data);
      window.open(
        `https://farmerwebsitebackend.onrender.com/files/${data.data.data.data}`
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleApprove = async (e, approve) => {
    try {
      const payload = {
        id: e.id,
        approve,
      };
      localStorage.setItem("data", JSON.stringify(payload));
      navigate("/rating");
    } catch (error) {}
  };

  const getcardData = async (d, i) => {
    const payload = {
      id: i,
      voluenteer: d.voluenteer,
    };
    const posterdata = await axios.post(
      "https://farmerwebsitebackend.onrender.com/api/user/poster",
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
    getApprovalData();
    setIssue();
  }, []);
  return (
    <div className="approve">
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
              </div>
            </div>
          </div>
        ) : (
          <div className="issueBody">
            {console.log("seeee", issues)}
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
                            {Token.type && Token.type == "1" ? (
                              <div>
                                <Button
                                  onClick={() => {
                                    viewSolution(issue);
                                  }}
                                  variant="primary"
                                >
                                  {" "}
                                  Solution
                                </Button>
                              </div>
                            ) : (
                              <Button
                                onClick={() => {
                                  viewSolution(issue);
                                }}
                                variant="primary"
                              >
                                {" "}
                                Solution
                              </Button>
                            )}
                            {Token.type && Token.type == "1" ? (
                              <div className="approvebttons">
                                <Button
                                  onClick={() => {
                                    handleApprove(issue, "Yes");
                                  }}
                                  variant="success"
                                >
                                  {" "}
                                  <i class="fa-solid fa-thumbs-up"></i>{" "}
                                </Button>
                                <Button
                                  className="ms-3"
                                  onClick={() => {
                                    handleApprove(issue, "No");
                                  }}
                                  variant="danger"
                                >
                                  {" "}
                                  <i class="fa-solid fa-thumbs-down"></i>
                                </Button>
                              </div>
                            ) : (
                              "wait for approval"
                            )}
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
    </div>
  );
}
export default Approve;
