import BannerLogo from "./logo-dark.png";
import Header from "./Header";
import Grid from "./grid";
import BottomImage from "./Bottom-image";
import { Colours } from "../../../../global-styles";
import { Container, Col, Form, Button, Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import ModalContext from "../../../../context/ModalContextSettings";
import { useContext } from "react";
import AuthContext from "../../../../context/AuthContext";
import {
  modifyClassNames,
  selectElement,
} from "../../../../utils/manage-elements";
import registerUser from "../../../../utils/handle-form-submit/register-user";

const LoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease-in-out;
  width: 100%;
  max-width: 500px;
  border-radius: 50px;
  border: solid 1px lightgray;
  &:hover {
    box-shadow: ${Colours.bgLightMode.boxShadow};
  }
  cursor: pointer;
`;

const AboutUs = () => {
  const [_modalShow, setModalShow] = useContext(ModalContext);
  const [auth] = useContext(AuthContext);

  const activateSaveButton = (e) => {
    //console.log(e);
    const [username, email, bannerUrl, avatarUrl, submitButton] = selectElement(
      "#form-register-user"
    );
    const isValid = [username, email, bannerUrl, avatarUrl].filter((input) => {
      if (input.value.length === 0) {
        modifyClassNames(input, "border-danger", "border-success");
      } else {
        modifyClassNames(input, "border-success", "border-danger");
        return input;
      }
    });
    isValid.length === 4
      ? (submitButton.disabled = false)
      : (submitButton.disabled = true);
  };
  const handleClick = () => {
    setModalShow(true);
  };

  return (
    <div
      className="content-body about-us"
      style={{ backgroundColor: Colours.bgLightMode.light }}
    >
      <Header>
        <img src={BannerLogo} alt="bannerlogo" />
      </Header>
      <main>
        <Container
          className={`my-5 d-flex flex-column align-items-center ${
            auth ? "d-none" : ""
          }`}
        >
          <h3 className="text-center" style={{ color: Colours.primary }}>
            Link Up today
          </h3>
          <Col className="d-flex justify-content-center mt-4 w-100">
            <LoginButton onClick={handleClick}>
              <h4 className="m-0">LOGIN</h4>
              <FontAwesomeIcon
                icon={faRightToBracket}
                style={{
                  fontSize: "1.5rem",
                  color: Colours.primary,
                  cursor: "pointer",
                  padding: "1rem",
                }}
              />
            </LoginButton>
          </Col>
          <Col
            className="d-flex flex-column mt-5 w-100"
            style={{ maxWidth: "500px" }}
          >
            <Accordion className="w-100">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h3
                    className="text-center w-100"
                    style={{ color: Colours.primary }}
                  >
                    Sign up
                  </h3>
                </Accordion.Header>
                <Accordion.Body className="p-3">
                  <Form id="form-register-user" onSubmit={registerUser}>
                    <Form.Group
                      className="mb-3"
                      controlId="banner"
                      name="banner"
                    >
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        onKeyUp={activateSaveButton}
                        type="text"
                        name="name"
                        placeholder={`A desired user name`}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="banner"
                      name="banner"
                    >
                      <Form.Label>User email</Form.Label>
                      <Form.Control
                        onKeyUp={activateSaveButton}
                        type="text"
                        name="email"
                        placeholder={`Your email`}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="banner"
                      name="banner"
                    >
                      <Form.Label>Banner URL</Form.Label>
                      <Form.Control
                        onKeyUp={activateSaveButton}
                        type="text"
                        name="banner"
                        placeholder={`Banner URL`}
                      />{" "}
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="banner"
                      name="banner"
                    >
                      <Form.Text className="text-muted">
                        Please enter a valid URL
                      </Form.Text>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="avatar"
                      name="avatar"
                    >
                      <Form.Label>Avatar URL</Form.Label>
                      <Form.Control
                        onKeyUp={activateSaveButton}
                        type="text"
                        placeholder={`Avatar image url..`}
                        name="avatar"
                      />
                      <Form.Text className="text-muted">
                        Please enter a valid URL
                      </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled>
                      Register
                    </Button>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Container>
        <Grid />
        <BottomImage />
      </main>
    </div>
  );
};

export default AboutUs;
