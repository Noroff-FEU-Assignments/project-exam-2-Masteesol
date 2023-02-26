import { getLocalStorage } from "../storage";

export default () => {
  if (getLocalStorage("userdata")) {
    return getLocalStorage("userdata");
  } else {
    return null;
  }
};
