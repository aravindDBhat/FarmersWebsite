import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import img from "../leaf.jpg";
function Body() {
  return (
    <div className="issueBody">
      <Card className="card" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the <a href="#">read more...</a>
          </Card.Text>
          <div className="cardfooter">
            <Button variant="primary"> Vote for Issue</Button>
            <span>400</span>
          </div>
        </Card.Body>
      </Card>
      <Card className="card" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the <a href="#">read more...</a>
          </Card.Text>
          <div className="cardfooter">
            <Button variant="primary"> Vote for Issue</Button>
            <span>400</span>
          </div>
        </Card.Body>
      </Card>
      <Card className="card" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the <a href="#">read more...</a>
          </Card.Text>
          <div className="cardfooter">
            <Button variant="primary"> Vote for Issue</Button>
            <span>400</span>
          </div>
        </Card.Body>
      </Card>
      <Card className="card" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the <a href="#">read more...</a>
          </Card.Text>
          <div className="cardfooter">
            <Button variant="primary"> Vote for Issue</Button>
            <span>400</span>
          </div>
        </Card.Body>
      </Card>
      <Card className="card" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the <a href="#">read more...</a>
          </Card.Text>
          <div className="cardfooter">
            <Button variant="primary"> Vote for Issue</Button>
            <span>400</span>
          </div>
        </Card.Body>
      </Card>
      <Card className="card" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the <a href="#">read more...</a>
          </Card.Text>
          <div className="cardfooter">
            <Button variant="primary"> Vote for Issue</Button>
            <span>400</span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
export default Body;
