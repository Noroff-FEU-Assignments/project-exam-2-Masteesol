import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Colours } from "../../../global-styles";
import ModalContext from "../../../context/ModalContextPosts";
import { useContext } from "react";

const RoundButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  cursor: pointer;
  .pen-icon {
    color: ${Colours.primary};
    font-size: 3rem;
    padding: 1rem;
  }
`;

const Container = styled.div`
  box-shadow: ${Colours.bgLightMode.boxShadowSmall};
  transition: 0.2s ease-in-out;
  position: fixed;
  bottom: 3rem;
  right 3rem;
  background-color: white;
  border-radius: 50px;
  z-index: 2000;
  &:hover {
    box-shadow: ${Colours.bgLightMode.boxShadow};
    transform: scale(1.1,1.1)
  }
`;

export default () => {
  const [_modalShow, setModalShow] = useContext(ModalContext);
  const handleClick = () => {
    setModalShow([true, "write"]);
  };
  return (
    <Container>
      <RoundButton onClick={handleClick}>
        <FontAwesomeIcon icon={faPen} className="pen-icon" />
      </RoundButton>
    </Container>
  );
};
