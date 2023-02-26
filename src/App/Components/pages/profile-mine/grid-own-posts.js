import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { base } from "../../../../constants/url";
import AuthContext from "../../../../context/AuthContext";
import ModalContext from "../../../../context/ModalContextPosts";
import { Colours } from "../../../../global-styles";
import reformatTime from "../../../../utils/reformat-time";
import Button, { HollowButton } from "../../button";
import { deletePost } from "../../../../utils/handle-form-submit/";
const Inner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 5px;
  cursor: pointer;
  padding: 1rem;
  background-color: ${Colours.bgLightMode.light};
  transition: ease-in-out 0.1s;
  box-shadow: ${Colours.bgLightMode.boxShadowSmall};
  }
`;

export default ({ state }) => {
  const display = state === true ? "d-block" : "d-none";
  const [auth] = useContext(AuthContext);
  const [postData, setPostData] = useState([]);
  const [_counter, setCounter] = useState(0);
  const dataFetchedRef = useRef(false);
  const fetchData = async () => {
    if (auth) {
      try {
        const req = await axios.get(
          base + `profiles/${auth.name}/posts?_comments=true&_reactions=true`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        console.log("Fetching data...");
        setCounter((oldValue) => oldValue + 1);
        setPostData(req.data);
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
  //console.log(postData);

  return (
    <Row className={display} style={{ maxWidth: "1200px", margin: "auto" }}>
      {postData.map((post, index) => {
        post["author"] = {
          name: auth.name,
          avatar: auth.avatar,
        };
        return <Card key={index} data={post} />;
      })}
    </Row>
  );
};

const Card = ({ data }) => {
  const [modalShowPost, setModalShowPost] = useContext(ModalContext);
  const openPostView = () => {
    setModalShowPost([true, "view", data]);
  };
  const openPostEdit = () => {
    console.log("tetwtetwe");
    setModalShowPost([true, "edit", data]);
  };
  const [buttonsVisible, setButtonsVisible] = useState([
    "",
    "",
    "d-none",
    "d-none",
  ]);
  const deletePostView = (e) => {
    const buttonElement = e.target;
    const buttonID = buttonElement.id;
    if (buttonID === "delete-post") {
      setButtonsVisible(["d-none", "d-none", "", ""]);
    } else if (buttonID === "cancel-delete-post") {
      setButtonsVisible(["", "", "d-none", "d-none"]);
    }
  };

  return (
    <Col className="mb-2">
      <Inner onClick={openPostView}>
        <h3>{data.title}</h3>
        <p>{data.body}</p>
        <div className="d-flex justify-content-between w-100">
          <i>{data.comments.length} comments</i>
          <i>
            {reformatTime(data.created)[0]} {reformatTime(data.created)[1]}
          </i>
        </div>
      </Inner>
      <div className="w-100 d-flex justify-content-center my-2">
        <div onClick={openPostEdit}>
          <HollowButton className={buttonsVisible[0]}>Edit</HollowButton>
        </div>
        <div onClick={deletePostView} className="d-flex">
          <HollowButton className={buttonsVisible[1]} id="delete-post">
            Delete
          </HollowButton>
          <form
            className={buttonsVisible[2]}
            data={data.id}
            onSubmit={deletePost}
          >
            <Button primary id="confirm-delete-post">
              Confirm
            </Button>
          </form>
          <Button className={buttonsVisible[2]} id="cancel-delete-post">
            Cancel
          </Button>
        </div>
      </div>
    </Col>
  );
};
