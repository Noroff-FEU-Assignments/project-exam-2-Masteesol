import { Container, Row } from "react-bootstrap";
import CardProfileImage from "../../card-profile-pictures";

export default (props) => {
  const display = props.state === true ? "d-block" : "d-none";
  console.log(props.following);
  return (
    <Container className={`${display}`} style={{ maxWidth: "1000px" }}>
      <Row className="w-100">
        {props.following
          ? props.following.map((data, index) => {
              return <CardProfileImage key={index} profileData={data} />;
            })
          : ""}
      </Row>
    </Container>
  );
};
