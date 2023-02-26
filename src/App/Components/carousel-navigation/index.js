import React, { useState } from "react";
import { useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import { Colours } from "../../../global-styles";
import Footer from "../footer";
import BannerSource from "../layout/context/BannerContext";
import "./index.scss";

export default function ({ children }) {
  const [auth] = useContext(AuthContext);
  const [_source, setSource] = useContext(BannerSource);
  setSource(auth.banner);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  let landingPageIndex = 1;
  let hidden = "";
  if (auth === false) {
    landingPageIndex = 0;
    hidden = "hidden";
  } else {
    landingPageIndex = searchParams.get("index")
      ? parseInt(searchParams.get("index"))
      : 1;
  }
  const [index, setIndex] = useState(landingPageIndex);
  const handleSelect = (selectedIndex, e) => {
    let urlParam = "";
    switch (selectedIndex) {
      case 0:
        urlParam = "app?index=0";
        break;
      case 1:
        urlParam = "app?index=1";
        break;
      case 2:
        urlParam = "app?index=2";
        break;
      default:
        urlParam = "app";
    }
    navigate("/" + urlParam);
    setIndex(selectedIndex);
  };
  return (
    <>
      <Carousel
        className={`container ${hidden}`}
        activeIndex={index}
        onSelect={handleSelect}
        interval={null}
        variant="dark"
      >
        {children.map((child, index) => CarouselItem(child, index))}
      </Carousel>
    </>
  );
}

const CarouselItem = (content, index) => {
  let navTitle = "";
  switch (index) {
    case 0:
      navTitle = "About Us";
      break;
    case 1:
      navTitle = "Feed";
      break;
    case 2:
      navTitle = "Profile";
      break;
    default:
      navTitle = "Navigation";
  }
  return (
    <Carousel.Item key={index}>
      <div className="fullscreen" id={`fullscreen-${index}`}>
        {content}
        <Footer />
      </div>
      <Carousel.Caption>
        <h4 style={{ color: Colours.primary }}>{navTitle}</h4>
      </Carousel.Caption>
    </Carousel.Item>
  );
};
