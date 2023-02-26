import { base } from "../../constants/url";
import userdata from "./userdata";

export default async function (e) {
  e.preventDefault();
  const { accessToken } = userdata();
  const profileName = e.target.getAttribute("name");
  const followed = e.target.getAttribute("data");
  const url = base + `profiles/${profileName}/${followed}`;
  console.log("ProfileName", profileName);
  console.log("Followed", followed);
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: "",
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
