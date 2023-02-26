import { login } from "../../constants/url";
import { setLocalStorage } from "../storage";

export default async function (e) {
  e.preventDefault();
  const formData = e.target;
  console.log("form", e);
  const formDataObj = {};
  for (let i = 0; i < formData.length; i++) {
    formDataObj[`${formData[i].id}`] = formData[i].value;
  }
  console.log(formDataObj);
  try {
    const res = await fetch(login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
