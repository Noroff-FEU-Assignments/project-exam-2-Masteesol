import { createGlobalStyle } from "styled-components";
import archivo from "./ArchivoBlack-Regular.ttf";
import ColoursObject from "./colours.js";
import LayoutUtilitiesObject from "./layout-utilities.js";
import ScreenSizesElement from "./display-sizes.js";

export const Colours = ColoursObject;

export const LayoutUtilities = LayoutUtilitiesObject;

export const ScreenSizes = ScreenSizesElement;

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Roboto Condensed';
  src: url(${archivo}) format('tff');
}
#root {
  font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  height: 100vh;
}
}
main {
  min-height: 100vh;
}
h1, h2, h3 {
  font-family: 'Archivo Black', Segoe UI
}
#root{
  background-color: ${Colours.bgLightMode.medium};
}
body, html {
  overflow-y: auto;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
a {
  text-decoration: none;
}
.btn-primary {
  background-color: ${Colours.primary};
  border: none;
  &:hover {
    background-color: ${Colours.primaryHover};
  }
}
}
`;

export default GlobalStyle;
