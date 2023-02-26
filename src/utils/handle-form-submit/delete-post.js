import { posts } from "../../constants/url";
import userdata from "./userdata";

export default async function (e) {
  const { accessToken } = userdata();
  console.log(e);
  //Adding ID to URL if it's an edit
  const url = `${posts.base}/${e.target.getAttribute("data")}`;
  e.preventDefault();
  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
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
