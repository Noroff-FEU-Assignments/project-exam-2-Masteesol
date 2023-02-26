import React from "react";
import Logo from "./logo small.png";
import styled from "styled-components";
import { ScreenSizes } from "../../../global-styles";
import { Link } from "react-router-dom";

const Picture = styled.picture`
  img {
    position: fixed;
    z-index: 2000;
    width: 3rem;
    height: auto;
    margin: 1rem;
    @media ${ScreenSizes.tablet} {
      width: 4rem;
    }
  }
`;

export default () => {
  return (
    <Link to="/app/">
      <Picture className="logo-small">
        <img src={Logo} alt="company-logo" />
      </Picture>
    </Link>
  );
};
