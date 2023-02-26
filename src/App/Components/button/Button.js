import styled from "styled-components";
import { Colours } from "../../../global-styles";
const { passive, primary, primaryHover, bgLightMode } = Colours;

export const Button = styled.button`
  border-radius: 50px;
  border: 2px solid transparent;
  width: ${(props) => (props.fullWidth ? "100%" : false)};
  background-color: ${(props) => (props.primary ? primary : passive)};
  color: ${(props) => (props.primary ? "white" : "black")};
  padding: 0.5rem 1rem 0.5rem 1rem;
  transition: ease-in-out 0.1s;
  box-shadow: ${bgLightMode.boxShadowSmall};
  &:hover {
    background-color: ${(props) =>
      props.primary ? primaryHover : bgLightMode.light};
    box-shadow: ${bgLightMode.boxShadow};
  }
`;

export const HollowButtonElement = styled.button`
  color: ${bgLightMode.dark};
  border-radius: 50px;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border: 1px solid transparent;
  background-color: transparent;
  &:hover {
    border: 1px solid ${bgLightMode.dark};
  }
`;

export const SelectButtonElement = styled(Button)`
  background-color: ${(props) =>
    props.state === true ? `${Colours.primary}` : `${Colours.passive}`};
  color: ${(props) =>
    props.state === true ? `${Colours.bgLightMode.light}` : "black"};
  margin: 0.5rem 0.5rem 0;
  &:hover {
    background-color: ${(props) =>
      props.state === true ? `${Colours.primaryHover}` : `${Colours.passive}`};
  }
`;
