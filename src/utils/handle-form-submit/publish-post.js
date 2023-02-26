import { posts } from "../../constants/url";
import userdata from "./userdata";

export default async function (e) {
  const { accessToken } = userdata();
  const formData = e.target;
  const isEdit = formData.getAttribute("data") === "edit";
  //Adding ID to URL if it's an edit
  const url = `${posts.base}/${isEdit ? formData.getAttribute("name") : ""}`;
  e.preventDefault();
  console.log("form", e);
  const formDataObj = {};
  for (let i = 0; i < formData.length - 1; i++) {
    const value = formData[i].value;
    const name = formData[i].name;
    if (name === "tags") {
      let tagsArray = value.split(",");
      tagsArray = tagsArray.map((text) => text.trim());
      formDataObj[`${name}`] = tagsArray;
    } else {
      formDataObj[`${name}`] = value;
    }
  }
  console.log(formDataObj);
  try {
    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
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
