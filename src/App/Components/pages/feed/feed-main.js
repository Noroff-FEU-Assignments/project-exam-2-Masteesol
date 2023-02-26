import axios from "axios";
import { useContext, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AuthContext from "../../../../context/AuthContext";
import { Colours } from "../../../../global-styles";
import PostCard from "../../post-card/";
import Search from "./search";
import { base } from "../../../../constants/url";
import ContentSelectorButtons from "./buttons-content-selector";
import ContentContext from "./context/ContentContext";
import CardProfilePictures from "../../card-profile-pictures";

export default () => {
  const [auth] = useContext(AuthContext);
  const [allPosts, setAllPosts] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  const [_counterPosts, setCounterPosts] = useState(0);
  const [_counterProfiles, setCounterProfiles] = useState(0);
  const [selectedContent] = useContext(ContentContext);
  const dataFetchedRef = useRef(false);
  const dataFetchedRefProfiles = useRef(false);

  const fetchDataPosts = async () => {
    if (auth) {
      try {
        const req = await axios.get(
          base + `posts/?_author=true&_comments=true&_reactions=true`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        console.log("Fetching data...");
        setCounterPosts((oldValue) => oldValue + 1);
        setAllPosts(req.data);
      } catch (error) {
        console.log("Couldn't get posts, something went wrong: ", error);
      }
    }
  };

  const fetchDataProfiles = async () => {
    if (auth) {
      try {
        const req = await axios.get(base + "profiles", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        console.log("Fetching profiles data...");
        setCounterProfiles((oldValue) => oldValue + 1);
        setAllProfiles(req.data);
      } catch (error) {
        console.log("Couldn't get profiles, something went wrong: ", error);
      }
    }
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchDataPosts();
  }, []);
  useEffect(() => {
    if (dataFetchedRefProfiles.current) return;
    dataFetchedRefProfiles.current = true;
    fetchDataProfiles();
  }, []);
  //console.log(allPosts);
  //console.log(allProfiles);
  return (
    <main style={{ position: "relative" }}>
      <Container
        className="header-spacer"
        style={{ height: "15rem" }}
      ></Container>
      <Container fluid style={{ backgroundColor: Colours.bgLightMode.medium }}>
        <Container style={{ maxWidth: 700 }}>
          <Row></Row>
          <Row className="flex-column mt-5">
            <Col></Col>
            <Col className="my-4">
              <ContentSelectorButtons />
            </Col>
            <Search>
              <div
                id="posts-list"
                className={!selectedContent[0] ? "d-none" : ""}
              >
                {allPosts.map((data, index) => {
                  /*console.log(
                    data.reactions.length > 0
                      ? data.reactions[0].symbol.codePointAt(0).toString(16)
                      : false
                  );*/
                  if (index < 50) {
                    return (
                      <div key={index} data={data.title}>
                        <PostCard userData={[data, index]} />
                      </div>
                    );
                  }
                })}
              </div>
              <Row
                id="profiles-list"
                className={`${!selectedContent[1] ? "d-none" : ""}`}
              >
                {allProfiles.length > 0 &&
                  allProfiles.map((data, index) => {
                    //console.log("feed", data);
                    return (
                      <CardProfilePictures key={index} profileData={data} />
                    );
                  })}
              </Row>
            </Search>
          </Row>
        </Container>
      </Container>
    </main>
  );
};
