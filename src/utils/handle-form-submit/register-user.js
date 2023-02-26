import { base } from "../../constants/url";

export default async function (e) {
  const formData = e.target;
  //Adding ID to URL if it's an edit
  const url = `${base}/auth/register`;
  e.preventDefault();
  console.log("form", e.target);
  const formDataObj = {};
  for (let i = 0; i < formData.length - 1; i++) {
    const value = formData[i].value;
    const name = formData[i].name;
    formDataObj[`${name}`] = value;
  }
  console.log(formDataObj);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
