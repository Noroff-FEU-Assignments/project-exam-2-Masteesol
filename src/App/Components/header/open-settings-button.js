import RoundedImage from "../rounded-image";
import styled from "styled-components";
import ModalContext from "../../../context/ModalContextSettings";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Colours, LayoutUtilities, ScreenSizes } from "../../../global-styles";

const OpenSettings = styled.div`
  ${LayoutUtilities.dFlexCentering}
  width: 3rem;
  height: 3rem;
  position: relative;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2000;
  margin: 1rem;
  @media ${ScreenSizes.tablet} {
    width: 4rem;
    height: 4rem;
  }
`;

export default () => {
  const [modalShow, setModalShow] = useContext(ModalContext);
  const [auth] = useContext(AuthContext);
  const handleClick = () => {
    setModalShow(true);
  };
  return (
    <OpenSettings onClick={handleClick}>
      {auth === false ? (
        <FontAwesomeIcon
          icon={faRightToBracket}
          style={{
            fontSize: "1.2rem",
            color: "white",
            backgroundColor: Colours.primary,
            cursor: "pointer",
            padding: "1rem",
          }}
        />
      ) : (
        <RoundedImage size={"100%"} src={auth.avatar} />
      )}
    </OpenSettings>
  );
};

//
