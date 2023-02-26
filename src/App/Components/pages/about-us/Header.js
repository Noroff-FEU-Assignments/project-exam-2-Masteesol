import styled from "styled-components";
import { Colours, LayoutUtilities } from "../../../../global-styles/";

const { primary } = Colours;
const { dFlexCentering } = LayoutUtilities;

export default styled.header`
  background-color: ${primary};
  height: 22rem;
  ${dFlexCentering};
  img {
    width: 95%;
    max-width: 800px;
    max-height: 95%;
  }
`;
