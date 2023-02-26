import { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ModalContext from "../../../context/ModalContextPosts";
import { Form, Button, Card, Tab, Tabs, Accordion } from "react-bootstrap";
import {
  modifyClassNames,
  selectElement,
} from "../../../utils/manage-elements";
import { publishPost } from "../../../utils/handle-form-submit";
import RoundedImage from "../rounded-image";
import { Colours } from "../../../global-styles";
import reformatTime from "../../../utils/reformat-time";
import { publishComment } from "../../../utils/handle-form-submit";
import colours from "../../../global-styles/colours";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import publishReaction from "../../../utils/handle-form-submit/publish-reaction";

export default function (props) {
  const [showModal] = useContext(ModalContext);
  const [wordCountOne, setWordCountOne] = useState();
  const [wordCountTwo, setWordCountTwo] = useState();

  //resetting counter on hide
  useEffect(() => {
    if (!showModal[0]) {
      setWordCountOne(0);
      setWordCountTwo(0);
    }
  });
  const charCountLimit = {
    title: 30,
    body: 200,
  };

  //console.log(showModal);

  const activateSaveButton = (e) => {
    const form =
      selectElement("#new-post-form") || selectElement("#new-comment-form");
    const formElements = Array.from(form);

    const formTextInput = formElements.filter(
      (element) => element.tagName === "INPUT" || element.tagName === "TEXTAREA"
    );
    const submitButton = formElements.filter(
      (element) => element.type === "submit"
    )[0];
    const isValid = formTextInput.filter((input) => {
      if (input.name === "title") {
        setWordCountOne(input.value.trim().length);
        if (
          input.value.length <= charCountLimit.title &&
          input.value.trim() !== ""
        ) {
          modifyClassNames(input, "border-success", "border-danger");
          return input;
        } else {
          modifyClassNames(input, "border-danger", "border-success");
        }
      } else if (input.name === "body") {
        setWordCountTwo(input.value.trim().length);
        if (
          input.value.length <= charCountLimit.body &&
          input.value.trim() !== ""
        ) {
          modifyClassNames(input, "border-success", "border-danger");
          return input;
        } else {
          modifyClassNames(input, "border-danger", "border-success");
        }
      } else {
        return input;
      }
    });

    isValid.length === formTextInput.length
      ? (submitButton.disabled = false)
      : (submitButton.disabled = true);
    //console.log(isValid.length, formTextInput.length);
  };
  const { title, body, author, media, comments, id, tags, reactions } =
    showModal[2] ? showModal[2] : -1;
  const { name, avatar } = author ? author : -1;
  //console.log(reactions);
  if (showModal[1] === "view") {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="d-flex flex-column">
          {media ? (
            <Accordion defaultActiveKey="0" className="w-100">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Media</Accordion.Header>
                <Accordion.Body className="p-0">
                  <div
                    className="w-100"
                    style={{
                      height: "30rem",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={media}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        objectPosition: "center center",
                      }}
                    ></img>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ) : (
            <div></div>
          )}
          <div className="w-100 d-flex justify-content-start align-items-center mt-4">
            <RoundedImage size={"6rem"} src={avatar} />
            <Modal.Title id="contained-modal-title-vcenter" className="ms-3">
              {name}
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <h4 className="d-flex justify-content-between">
            {title}{" "}
            <form onSubmit={publishReaction} data={id}>
              <button
                type="submit"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{
                    fontSize: "1.5rem",
                    color: Colours.primary,
                    cursor: "pointer",
                    padding: "1rem",
                  }}
                />
              </button>
            </form>
          </h4>
          <p>{body}</p>
          <div className="d-flex">
            {reactions &&
              reactions.map((item) => {
                return (
                  <div>
                    <span>{item.symbol}</span>
                    <span style={{ color: colours.bgLightMode.dark }}>
                      {item.count}
                    </span>
                  </div>
                );
              })}
          </div>
          <Tabs
            defaultActiveKey="comments"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab
              eventKey="add-comment"
              title="Add comment"
              style={{ height: "15rem" }}
            >
              <Form
                className=""
                id="new-comment-form"
                onSubmit={publishComment}
                data={id}
              >
                <Form.Group>
                  <Form.Control
                    name="body"
                    as="textarea"
                    placeholder="Write a comment..."
                    onKeyUp={activateSaveButton}
                  />
                </Form.Group>
                <div className="mt-3">
                  <Button disabled={true} type="submit">
                    Save
                  </Button>
                  <Form.Text className="text-muted ms-2">
                    Characters: <span id="text-count-2">{wordCountTwo}</span> of{" "}
                    {charCountLimit.body}
                  </Form.Text>
                </div>
              </Form>
            </Tab>
            <Tab
              eventKey="comments"
              title="Comments"
              style={{ height: "15rem", overflowY: "auto" }}
            >
              <Card style={{ border: "none" }}>
                <Card.Body>
                  {comments.length > 0 ? (
                    comments.map((comment, index) => (
                      <div key={index} className="mb-3">
                        <h5 className="font-weight-bold">{comment.owner}</h5>
                        <Card.Text>{comment.body}</Card.Text>
                        <Card.Text>
                          <i style={{ color: Colours.bgLightMode.dark }}>
                            {reformatTime(comment.created)[0]}{" "}
                            {reformatTime(comment.created)[1]}
                          </i>
                        </Card.Text>
                      </div>
                    ))
                  ) : (
                    <p>0 comments</p>
                  )}
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  } else if (showModal[1] === "write" || showModal[1] === "edit") {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {showModal[1] === "write" ? "New Post" : "Edit Post"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            id="new-post-form"
            onSubmit={publishPost}
            data={showModal[1]}
            name={id}
          >
            <Form.Group className="mb-3" controlId="newpostform.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                onKeyUp={activateSaveButton}
                type="text"
                placeholder="Your post title"
                defaultValue={showModal[1] === "write" ? "" : title}
              />
              <Form.Text className="text-muted">
                Characters: <span id="text-count-1">{wordCountOne}</span> of{" "}
                {charCountLimit.title}
              </Form.Text>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="newpostform.ControlTextarea1"
            >
              <Form.Label>Text</Form.Label>
              <Form.Control
                name="body"
                as="textarea"
                rows={3}
                onKeyUp={activateSaveButton}
                placeholder="Your post text"
                defaultValue={showModal[1] === "write" ? "" : body}
              />
              <Form.Text className="text-muted">
                Characters: <span id="text-count-2">{wordCountTwo}</span> of{" "}
                {charCountLimit.body}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="newpostform.ControlInput2">
              <Form.Label>Post image</Form.Label>
              <Form.Control
                name="media"
                type="text"
                placeholder="https://url-to-public-image.com"
                defaultValue={showModal[1] === "write" ? "" : media}
              />
              <Form.Text className="text-muted">(Optional)</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="newpostform.ControlInput3">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                placeholder="Cats, Cute, Fluffy"
                defaultValue={showModal[1] === "write" ? "" : tags}
              />
              <Form.Text className="text-muted">(optional)</Form.Text>
            </Form.Group>
            <Button disabled={true} type="submit">
              {showModal[1] === "write" ? "Publish" : "Save Changes"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
