import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Colours } from "../../../../global-styles";
import { SelectButton } from "../../button";
import GridFollowing from "./grid-following";
import GridFollowers from "./grid-followers";
import GridOwnPosts from "./grid-own-posts";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { base } from "../../../../constants/url";
import AuthContext from "../../../../context/AuthContext";
import FollowContext from "../../../../context/FollowContext";

const ProfileInfoElement = () => {
  //const [followed] = useContext(FollowContext);
  const [clicked, setClicked] = useState([true, false, false]);
  const [auth] = useContext(AuthContext);
  const [profileData, setProfileData] = useState([]);
  const [_counter, setCounter] = useState(0);
  const dataFetchedRef = useRef(false);

  const fetchData = async () => {
    if (auth) {
      try {
        const req = await axios.get(
          base + `profiles/${auth.name}?_following=true&_followers=true`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        console.log("Fetching following data...");
        setCounter((oldValue) => oldValue + 1);
        setProfileData(req.data);
      } catch (error) {
        console.log("Couldn't get posts, something went wrong: ", error);
      }
    }
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  }, []);

  const handleClick = (e) => {
    const itemIndex = e.target.attributes["data"].value;
    const newState = clicked.map((number, index) =>
      index == itemIndex ? (number = true) : (number = false)
    );
    setClicked(newState);
  };

  return (
    <main>
      <Container
        className="heading-spacer"
        style={{ height: "15rem" }}
      ></Container>
      <Container fluid style={{ backgroundColor: Colours.bgLightMode.medium }}>
        <Container style={{ maxWidth: "500px" }} className="py-5">
          <Row className="flex-md-row flex-column">
            <Col>
              <SelectButton
                state={clicked[0]}
                onClick={handleClick}
                data={0}
                fullWidth
              >
                Following
              </SelectButton>
            </Col>
            <Col>
              <SelectButton
                state={clicked[1]}
                onClick={handleClick}
                data={1}
                fullWidth
              >
                Followers
              </SelectButton>
            </Col>
            <Col>
              <SelectButton
                state={clicked[2]}
                onClick={handleClick}
                data={2}
                fullWidth
              >
                Posts
              </SelectButton>
            </Col>
          </Row>
        </Container>
        <GridFollowing
          state={clicked[0]}
          following={profileData.following}
          id="following"
        />
        <GridFollowers
          state={clicked[1]}
          followers={profileData.followers}
          id="followers"
        />
        <GridOwnPosts state={clicked[2]} id="own-post" />
      </Container>
    </main>
  );
};

export default ProfileInfoElement;
