import React, { useState } from "react";
import { Colours } from "../../../../global-styles";
import { Button, Form } from "react-bootstrap";
import ContentContext from "./context/ContentContext";
import { useContext } from "react";
import { modifyClassNames } from "../../../../utils/manage-elements";

export default ({ children }) => {
  const [selectedContent] = useContext(ContentContext);
  const [searchActive, setSearchActive] = useState(false);
  let placeholder;
  //console.log(children);
  const setPlaceholder = () => {
    selectedContent.forEach((item, index) => {
      if (item === true) {
        switch (index) {
          case 0:
            placeholder = "Search by post title...";
            break;
          case 1:
            placeholder = "Enter username to find user...";
            break;
          default:
            break;
        }
      }
    });
  };
  setPlaceholder();
  /*console.log(selectedContent);*/

  const handleSearch = (e) => {
    const clicked = e.target;
    if (clicked.id === "search-button") {
      //console.log(clicked);

      //A bit of traversing up and down the DOM tree
      const searchParentElement =
        clicked.parentElement.parentElement.parentElement;
      const searchInput =
        searchParentElement.firstChild.childNodes[1].firstChild.firstChild;
      const compareText = (a, b) => {
        return !a.toLowerCase().includes(b.toLowerCase()) ? true : false;
      };
      const searchText = searchInput.value;
      if (selectedContent[0]) {
        const postsListElement = Array.from(
          searchParentElement.childNodes[1].childNodes
        );
        console.log(postsListElement);
        postsListElement.forEach((element) => {
          if (!searchText) {
            modifyClassNames(element, "", "d-none");
          } else {
            compareText(element.getAttribute("data"), searchText)
              ? modifyClassNames(element, "d-none")
              : modifyClassNames(element, "", "d-none");
          }
        });
      } else {
        const profileListElement = Array.from(
          searchParentElement.childNodes[2].childNodes
        );
        profileListElement.forEach((element) => {
          if (!searchText) {
            modifyClassNames(element, "", "d-none");
          } else {
            compareText(element.getAttribute("data"), searchText)
              ? modifyClassNames(element, "d-none")
              : modifyClassNames(element, "", "d-none");
          }
        });
      }
    }
  };

  return (
    <div name="search-field" onClick={handleSearch}>
      <div className="d-flex mb-5" style={{ height: "3rem" }}>
        <div>
          <Button
            style={{
              backgroundColor: Colours.passive,
              border: 0,
              borderRadius: "5px 0px 0px 5px",
              height: "100%",
            }}
            id="search-button"
          >
            {!searchActive ? "Search" : "Close"}
          </Button>
        </div>
        <div style={{ flex: "1 1 0" }}>
          <Form.Group
            className="mb-3"
            controlId="search-bar"
            style={{ height: "100%" }}
          >
            <Form.Control
              type="text"
              placeholder={placeholder}
              style={{ borderRadius: "0px 5px 5px 0px", height: "100%" }}
            />
          </Form.Group>
        </div>
      </div>
      {children[0]}
      {children[1]}
    </div>
  );
};
