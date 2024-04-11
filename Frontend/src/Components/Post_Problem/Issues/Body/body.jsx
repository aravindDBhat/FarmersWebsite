import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import img from "../leaf.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

function Body(props) {
  const [issues, setIssues] = useState();
  const [search, setSearch] = useState();
  const [data, setData] = useState();
  const [flip, setFlip] = useState(0);
  const [poster, setPoster] = useState();
  const getcardData = async (d) => {
    const payload = {
      id: d.posterid,
    };
    const posterdata = await axios.post(
      "http://localhost:4000/api/user/poster",
      payload
    );
    console.log("poster is : ", posterdata.data.msg.data[0].name);
    setPoster(posterdata.data.msg.data[0].name);
    console.log("card data : ", d);
    setData(d);
    setFlip(!flip);
  };
  const handleFlip = () => {
    setFlip(!flip);
  };

  useEffect(() => {}, []);
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
            </div>
          </div>
        </div>
      ) : (
        <div className="issueBody">
          {console.log("all issues : ", props.issues)}
          {props.issues && props.issues.length > 0
            ? props.issues.map((issue) => {
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
                          {issue.description}
                        </Card.Text>
                        <div className="cardfooter">
                          <Button
                            onClick={() => {
                              getcardData(issue);
                            }}
                            variant="primary"
                          >
                            {" "}
                            Vote for Issue
                          </Button>
                          <span>{issue.vote} votes</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })
            : ""}
          {/* <Card className="card" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>Inefficient water usage</Card.Title>
          <Card.Text>
            Seeking solutions to improve water efficiency for farmers.
          </Card.Text>
          <div className="cardfooter">
            <Button variant="primary"> Vote for Issue</Button>
            <span>9 votes</span>
          </div>
        </Card.Body>
      </Card>
      <Card className="card" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={img2} />
        <Card.Body>
          <Card.Title> Tomato spider-mite</Card.Title>
          <Card.Text>
            Need assistance with controlling spider mites infesting my tomato
            plants.
          </Card.Text>
          <div className="cardfooter">
            <Button variant="primary"> Vote for Issue</Button>
            <span>4 votes</span>
          </div>
        </Card.Body>
      </Card> */}
        </div>
      )}
    </>
  );
}
export default Body;
