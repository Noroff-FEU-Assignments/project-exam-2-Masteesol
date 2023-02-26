import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { HollowButton } from "../button";

import RoundedImage from "../rounded-image/rounded-image";
import ModalContextPosts from "../../../context/ModalContextPosts";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Colours } from "../../../global-styles";

import reformatTime from "../../../utils/reformat-time";

const { bgLightMode } = Colours;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const PostCard = ({ userData }) => {
  const [data, index] = userData;
  const { title, body, created, media, author, comments } = data;
  const { avatar, name } = author;
  const [_modalShowPost, setModalShowPost] = useContext(ModalContextPosts);
  const openPost = () => {
    setModalShowPost([true, "view", data]);
  };
  return (
    <Card
      className="my-2"
      style={{
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
      }}
      key={index}
    >
      <Card.Title style={{ backgroundColor: "transparent" }} className="m-0">
        <h5 style={{ color: Colours.mediumDark }}>{name}</h5>
      </Card.Title>

      {!media ? (
        <div name="no-media"></div>
      ) : (
        <Card.Header
          variant="top"
          className="rounded p-0 mb-3"
          style={{ height: "20rem", boxShadow: bgLightMode.boxShadowSmall }}
        >
          <Card.Img
            onClick={openPost}
            src={media}
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
        </Card.Header>
      )}

      <Card.Body
        style={{
          border: "none",
          backgroundColor: `${bgLightMode.light}`,
          margin: "1rem 0 0.5rem 0",
          boxShadow: bgLightMode.boxShadowSmall,
        }}
        className="rounded mt-0"
      >
        <Row>
          <Col className={`d-flex justify-content-center align-items-center`}>
            <Link to={"/user?name=" + name}>
              <RoundedImage size={"6rem"} src={avatar} />
            </Link>
          </Col>
          <Col sm={9} onClick={openPost}>
            <h5 style={{ fontWeight: 600 }}>{title}</h5>
            <Card.Text>{body}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
      <Footer onClick={openPost}>
        <HollowButton>{`Comments (${comments.length})`}</HollowButton>
        <i>
          {reformatTime(created)[0]} {reformatTime(created)[1]}
        </i>
      </Footer>
    </Card>
  );
};

export default PostCard;

PostCard.propTypes = {
  postData: PropTypes.object,
};
