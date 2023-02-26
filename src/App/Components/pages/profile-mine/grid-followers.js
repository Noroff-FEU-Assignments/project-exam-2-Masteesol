import { Container, Row } from "react-bootstrap";
import CardProfileImage from "../../card-profile-pictures";

const gridProfiles = (props) => {
  const display = props.state === true ? "d-block" : "d-none";
  return (
    <Container className={display} style={{ maxWidth: "1000px" }}>
      <Row className="w-100">
        {props.followers
          ? props.followers.map((data, index) => {
              return <CardProfileImage key={index} profileData={data} />;
            })
          : ""}
      </Row>
    </Container>
  );
};

export default gridProfiles;
