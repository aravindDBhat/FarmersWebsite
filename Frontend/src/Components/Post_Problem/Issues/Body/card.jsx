import Button from "react-bootstrap/Button";
import Cards from "./card";
import img from "../leaf.jpg";
function Card(Props) {
  console.log("dsfdf", Props.title);
  const click = () => {
    Props.function(Props.issue);
  };
  return (
    <Cards
      className="card"
      style={{
        height: "23rem",
        width: "18rem",
      }}
    >
      <Cards.Img
        className="cardimage"
        variant="top"
        src={Props.image && Props.image.length > 5 ? Props.image : img}
      />
      <Cards.Body>
        <Cards.Title>{Props.title}</Cards.Title>
        <Cards.Text>
          {Props.des}
          <button onClick={click}>Read More...</button>
        </Cards.Text>
        <div className="cardfooter">
          <Button variant="primary"> Vote for Issue</Button>
          <span>{Props.vote} votes</span>
        </div>
      </Cards.Body>
    </Cards>
  );
}
export default Card;
