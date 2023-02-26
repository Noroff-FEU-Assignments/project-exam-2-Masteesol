import React from "react";
import styled from "styled-components";
import { Colours, LayoutUtilities } from "../../../global-styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Picture = styled.picture`
  ${LayoutUtilities.dFlexCentering};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  min-width: 3rem;
  min-height: 3rem;
  max-width: 15rem;
  max-height: 15rem;
  overflow: hidden;
  border-radius: 50%;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default (props) => {
  return (
    <Picture size={props.size}>
      {!props.src ? (
        <FontAwesomeIcon
          icon={faUser}
          style={{ height: "70%", width: "auto", color: Colours.primary }}
          className="profile-icon"
        />
      ) : (
        <img src={props.src} alt="profile-image" />
      )}
    </Picture>
  );
};
