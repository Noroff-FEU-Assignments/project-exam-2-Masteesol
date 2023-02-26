import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AuthContext from "../../../context/AuthContext";
import { useContext } from "react";
import { login, saveImages } from "../../../utils/handle-form-submit/";
import {
  modifyClassNames,
  selectElement,
} from "../../../utils/manage-elements";
import { removeLocalStorage } from "../../../utils/storage";

export default function (props) {
  const [auth] = useContext(AuthContext);
  const activateSaveButton = () => {
    const [bannerUrl, avatarUrl, submitButton] = selectElement(
      "#form-update-images"
    );
    const validUrlRegEx = /(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*/;
    const isValid = [bannerUrl, avatarUrl].filter((input) => {
      if (validUrlRegEx.test(input.value)) {
        modifyClassNames(input, "border-success", "border-danger");
        return input;
      } else {
        modifyClassNames(input, "border-danger", "border-success");
      }
    });
    isValid.length === 2
      ? (submitButton.disabled = false)
      : (submitButton.disabled = true);
  };
  const onLogout = () => {
    removeLocalStorage("userdata");
    window.location.reload(false);
  };
  if (auth) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Profile Settings
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>Username</h5>
            <p>{auth.name}</p>
          </div>
          <div>
            <h5>Email</h5>
            <p>{auth.email}</p>
          </div>
          <Form id="form-update-images" onSubmit={saveImages}>
            <Form.Group className="mb-3" controlId="banner" name="banner">
              <Form.Label>Banner URL</Form.Label>
              <Form.Control
                type="text"
                placeholder={`${auth.banner}`}
                onKeyUp={activateSaveButton}
              />
              <Form.Text className="text-muted">
                Please enter a valid URL
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="avatar" name="avatar">
              <Form.Label>Avatar URL</Form.Label>
              <Form.Control
                type="text"
                placeholder={`${auth.avatar}`}
                onKeyUp={activateSaveButton}
              />
              <Form.Text className="text-muted">
                Please enter a valid URL
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" disabled>
              Save changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={onLogout}>Logout</Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={login}>
            <Form.Group className="mb-3" controlId="email" name="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password" name="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Log in
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
