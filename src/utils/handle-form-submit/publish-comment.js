import { base } from "../../constants/url";
import userdata from "./userdata";

export default async function (e) {
  const { accessToken } = userdata();
  const formData = e.target;
  const postID = e.target.getAttribute("data");
  const url = base + `posts/${postID}/comment`;
  e.preventDefault();
  console.log("ID", postID);
  const formDataObj = {
    body: formData[0].value,
  };

  console.log(formDataObj);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formDataObj),
    });
    const json = await res.json();
    console.log(json);
    if (res.status === 200) {
      window.location.reload(false);
    }
  } catch (error) {
    console.log(error);
  }
}
