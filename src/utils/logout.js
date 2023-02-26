import { removeLocalStorage } from "./storage";

export default () => {
  removeLocalStorage("userdata");
  window.location.reload(false);
};
