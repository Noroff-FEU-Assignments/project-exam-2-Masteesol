import image from "./profile-image.jpg";
import { Container, Row, Col } from "react-bootstrap";
import RoundedImage from "../../rounded-image";

const gridProfiles = ({ state }) => {
  const display = state === true ? "d-block" : "d-none";
  return (
    <Container className={display} style={{ maxWidth: "1000px" }}>
      <Row>
        <Col md={2}>
          <RoundedImage src={image} size={"8rem"} />
          <h4>Example name</h4>
        </Col>
        <Col md={2}>
          <RoundedImage src={image} size={"8rem"} />
          <h4>Example name</h4>
        </Col>
        <Col md={2}>
          <RoundedImage src={image} size={"8rem"} />
          <h4>Example name</h4>
        </Col>
        <Col md={2}>
          <RoundedImage src={image} size={"8rem"} />
          <h4>Example name</h4>
        </Col>
        <Col md={2}>
          <RoundedImage src={image} size={"8rem"} />
          <h4>Example name</h4>
        </Col>
        <Col md={2}>
          <RoundedImage src={image} size={"8rem"} />
          <h4>Example name</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default gridProfiles;
