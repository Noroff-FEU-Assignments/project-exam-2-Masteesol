import React from "react";
import styled from "styled-components";
import { Colours, LayoutUtilities } from "../../../global-styles";

const Footer = styled.footer`
  background-color: ${Colours.primary};
  color: white;
  height: 10rem;
  ${LayoutUtilities.dFlexCentering}
`;

export default () => {
  return (
    <Footer>
      <table className="mb-5">
        <tbody>
          <tr>
            <td>Address</td>
            <td>Email</td>
          </tr>
          <tr>
            <td>Example Street 555</td>
            <td>example@email.com</td>
          </tr>
        </tbody>
      </table>
    </Footer>
  );
};
