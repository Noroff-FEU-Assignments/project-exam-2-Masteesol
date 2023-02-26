import { getLocalStorage } from "../../utils/storage";

export default () => {
  if (getLocalStorage("userdata")) {
    return getLocalStorage("userdata");
  } else {
    return false;
  }
};
