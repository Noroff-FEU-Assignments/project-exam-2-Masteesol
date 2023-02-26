import { Col } from "react-bootstrap";
import RoundedImage from "../rounded-image";
import { Colours } from "../../../global-styles";
import styled from "styled-components";
import ScreenSize from "../../../global-styles/display-sizes";
import { Link } from "react-router-dom";

const Inner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  padding: 1rem;
  background-color: ${Colours.bgLightMode.light};
  color: black;
  transition: ease-in-out 0.1s;
  &:hover {
    box-shadow: ${Colours.bgLightMode.boxShadow};
  }
  @media ${ScreenSize.tablet} {
    flex-direction: column;
    box-shadow: none;
    background-color: transparent;
    &:hover {
      box-shadow: ${Colours.bgLightMode.boxShadow};
      background-color: ${Colours.bgLightMode.light};
    }
  }
`;

export default ({ profileData }) => {
  const loaded = profileData ? profileData : false;
  if (loaded) {
    return (
      <Col md={3} className="my-3" data={profileData.name}>
        <Link to={`/user?name=${profileData.name}`}>
          <Inner>
            <RoundedImage src={profileData.avatar} size={"8rem"} />
            <h4 className="p-2" style={{ fontSize: "1.2rem" }}>
              {profileData.name}
            </h4>
          </Inner>
        </Link>
      </Col>
    );
  } else {
    return null;
  }
};
