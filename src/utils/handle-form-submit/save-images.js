import { updateMedia } from "../../constants/url";
import { setLocalStorage, getLocalStorage } from "../storage";

const userData = () => {
  if (getLocalStorage("userdata")) {
    return getLocalStorage("userdata");
  } else {
    return null;
  }
};

export default async function (e) {
  const { accessToken, name } = userData();
  const formData = e.target;
  const myProfileUrl = updateMedia(name);
  console.log(myProfileUrl);
  e.preventDefault();
  console.log("form", e);
  const formDataObj = {};
  for (let i = 0; i < formData.length - 1; i++) {
    formDataObj[`${formData[i].id}`] = formData[i].value;
  }
  console.log(formDataObj);
  try {
    const res = await fetch(myProfileUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formDataObj),
    });
    const json = await res.json();
    console.log(json);
    if (res.status === 200) {
      setLocalStorage("userdata", json);
      window.location.reload(false);
    }
  } catch (error) {
    console.log(error);
  }
}
