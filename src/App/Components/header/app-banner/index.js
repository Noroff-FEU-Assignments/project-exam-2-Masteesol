import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import AuthContext from "../../../../context/AuthContext";
import { LayoutUtilities } from "../../../../global-styles";
import BannerSource from "../../layout/context/BannerContext";

const Figure = styled.figure`
  ${LayoutUtilities.dFlexCentering}
  width: 100%;
  height: 15rem;
  overflow-y: hidden;
  position: absolute;
  top: 0;
  z-index: 0;
  img {
    width: 100%;
  }
`;
export default () => {
  const [auth] = useContext(AuthContext);
  const [source] = useContext(BannerSource);
  return (
    <Figure className="banner">
      <img src={source ? source : auth.banner} alt="bannerimage" />
    </Figure>
  );
};
