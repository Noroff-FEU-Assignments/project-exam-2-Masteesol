import axios from "axios";
import { useContext, useState, useEffect, useRef } from "react";
import { Container, Row } from "react-bootstrap";
import PostCard from "../../post-card";
import {
  base,
  URLSingleUserPost,
  URLUserdata,
} from "../../../../constants/url";
import AuthContext from "../../../../context/AuthContext";
import { Colours } from "../../../../global-styles";
import { useSearchParams } from "react-router-dom";
import BannerSource from "../../layout/context/BannerContext";
import RoundedImage from "../../rounded-image";
import styled from "styled-components";
import Button from "../../button";
import { followUnfollow } from "../../../../utils/handle-form-submit/";
import FollowContext from "../../../../context/FollowContext";

const ProfileImage = styled.span`
  position: absolute;
  top: 12rem;
  left: 6%;
  width: 12vw;
  height: 12vw;
  min-width: 6rem;
  min-height: 6rem;
`;

const FollowButton = styled.span`
  position: absolute;
  top: 15.5rem;
  right: 6%;
`;

export default () => {
  const [followed, setFollowed] = useContext(FollowContext);
  const [auth] = useContext(AuthContext);
  const [allPosts, setAllPosts] = useState([]);
  const [userData, setUserData] = useState();
  const [ownProfileData, setOwnProfileData] = useState([]);
  const [_source, setSource] = useContext(BannerSource);

  const [searchParams] = useSearchParams();
  const username = searchParams.get("name");
  const postsUrl = URLSingleUserPost(username);
  const userUrl = URLUserdata(username);
  const [_counterPost, setCounterPost] = useState(0);
  const dataFetchedRefPost = useRef(false);

  const [_counterUser, setCounterUser] = useState(0);
  const dataFetchedRefUser = useRef(false);

  const [_counterOwnProfile, setCounterOwnProfile] = useState(0);
  const dataFetchedRefOwnProfile = useRef(false);

  const fetchData = async () => {
    try {
      const req = await axios.get(postsUrl, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      console.log("Fetching post data...");
      setCounterPost((oldValue) => oldValue + 1);
      setAllPosts(req.data);
    } catch (error) {
      console.log("Something went wrong: ", error);
    }
  };

  useEffect(() => {
    if (dataFetchedRefPost.current) return;
    dataFetchedRefPost.current = true;
    fetchData();
  }, []);

  const fetchUser = async () => {
    try {
      const req = await axios.get(userUrl, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      console.log("Fetching user data...");
      setCounterUser((oldValue) => oldValue + 1);
      setSource(req.data.banner);
      setUserData(req.data);
    } catch (error) {
      console.log("Something went wrong when fetching user: ", error);
    }
  };

  useEffect(() => {
    if (dataFetchedRefUser.current) return;
    dataFetchedRefUser.current = true;
    fetchUser();
  }, []);

  const fetchOwnProfileData = async () => {
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
        setCounterOwnProfile((oldValue) => oldValue + 1);
        setOwnProfileData(req.data);
      } catch (error) {
        console.log("Couldn't get posts, something went wrong: ", error);
      }
    }
  };

  useEffect(() => {
    if (dataFetchedRefOwnProfile.current) return;
    dataFetchedRefOwnProfile.current = true;
    fetchOwnProfileData();
  }, []);

  //console.log(userData);
  //console.log(allPosts);
  setFollowed(ownProfileData ? ownProfileData.following : "");

  const isFollowed = followed
    ? followed.filter(
        (object) => object.name === (userData ? userData.name : "")
      )
    : "";
  console.log("isFollowed", isFollowed);
  return (
    <main style={{ position: "relative" }}>
      <ProfileImage>
        <RoundedImage size={"100%"} src={!userData ? "" : userData.avatar} />
      </ProfileImage>
      <FollowButton>
        <Button
          primary
          onClick={followUnfollow}
          name={!userData ? "" : userData.name}
          data={isFollowed.length > 0 ? "unfollow" : "follow"}
        >
          {isFollowed.length > 0 ? "Unfollow" : "Follow"}
        </Button>
      </FollowButton>
      <Container
        className="header-spacer"
        style={{ height: "15rem" }}
      ></Container>
      <Container fluid style={{ backgroundColor: Colours.bgLightMode.medium }}>
        <Container style={{ maxWidth: 700 }}>
          <Row></Row>
          <Row className="flex-column mt-5">
            {allPosts.map((postData, index) => {
              if (userData) {
                postData["author"] = {
                  name: username,
                  avatar: userData.avatar,
                };
                if (index < 10) {
                  return <PostCard key={index} userData={[postData, index]} />;
                }
              }
            })}
          </Row>
        </Container>
      </Container>
    </main>
  );
};
