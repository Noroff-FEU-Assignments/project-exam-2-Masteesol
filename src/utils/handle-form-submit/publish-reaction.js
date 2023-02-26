import { base } from "../../constants/url";
import userdata from "./userdata";

export default async function (e) {
  const { accessToken } = userdata();
  const postID = e.target.getAttribute("data");
  const url = base + `posts/${postID}/react/🧡`;
  e.preventDefault();

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
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
