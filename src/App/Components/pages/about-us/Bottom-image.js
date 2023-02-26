import styled from "styled-components";
import BottomImageLogo from "./logo-light.png";
import { Col, Row, Container } from "react-bootstrap";
import { Colours, LayoutUtilities } from "../../../../global-styles";
import backgroundImage from "./images/hands.jpg";
const { primary } = Colours;
const { dFlexCentering } = LayoutUtilities;

const BottomImageStyles = styled.div`
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-image: url("${backgroundImage}");
  background-position: center;
  background-size: cover;
  h3 {
    color: ${primary};
  }
  .row {
    flex: 1 1 0;
    .col {
      ${dFlexCentering}
    }
  }
`;
const BottomImage = () => {
  return (
    <BottomImageStyles>
      <Container
        fluid
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Row>
          <Col className="p-0">
            <div className="ms-lg-auto" style={{ maxWidth: 500 }}>
              <h3>Something relevant</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                ut posuere sem. Aliquam et mauris scelerisque, varius elit
                maximus, pretium ex. Praesent mattis metus sed dapibus aliquet.
              </p>
            </div>
          </Col>
        </Row>
        <Row className={"flex-md-row flex-column"}>
          <Col className="p-0">
            <div style={{ maxWidth: 500 }}>
              <h3>Something relevant</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                ut posuere sem. Aliquam et mauris scelerisque, varius elit
                maximus, pretium ex. Praesent mattis metus sed dapibus aliquet.
              </p>
            </div>
          </Col>
          <Col className="p-0">
            <img
              src={BottomImageLogo}
              alt=""
              style={{ width: "100%", maxWidth: 500 }}
            />
          </Col>
        </Row>
      </Container>
    </BottomImageStyles>
  );
};

export default BottomImage;
