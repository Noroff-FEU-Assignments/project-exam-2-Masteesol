import React from "react";
import ImageOne from "./images/community.jpg";
import ImageTwo from "./images/socialmedia.jpg";
import ImageThree from "./images/offices.jpg";
import { Col, Row, Container } from "react-bootstrap";

const grid = () => {
  return (
    <>
      <Container className="pt-5">
        <h1 className="text-center mb-5">About Us</h1>
        <p className="my-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut
          posuere sem. Aliquam et mauris scelerisque, varius elit maximus,
          pretium ex. Praesent mattis metus sed dapibus aliquet. Maecenas in
          efficitur lorem. Nullam neque augue, condimentum a est et, eleifend
          faucibus sapien. Phasellus auctor, nibh blandit fermentum sagittis,
          erat nibh bibendum erat, ut sagittis augue orci vitae quam. In cursus
          urna eu placerat mol.....
        </p>
      </Container>
      <Container className="grid">
        <Row className="bg-variant-light">
          <Col className="d-flex align-items-center">
            <div>
              <h2>Something relevant</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                ut posuere sem. Aliquam et mauris scelerisque, varius elit
                maximus, pretium ex. Praesent mattis metus sed dapibus aliquet.
                Maecenas in efficitur lorem. Nullam neque augue, condimentum a
                est et, eleifend faucibus sapien. Phasellus auctor, nibh blandit
                fermentum sagittis, erat nibh bibendum erat, ut sagittis augue
                orci vitae quam. In cursus urna eu placerat mol.....
              </p>
            </div>
          </Col>
          <Col>
            <img className="w-100" src={ImageOne} alt="community"></img>
          </Col>
        </Row>
        <Row>
          <Col>
            <img className="w-100" src={ImageTwo} alt="social media"></img>
          </Col>
          <Col className="d-flex align-items-center">
            <div>
              <h2>Something relevant</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                ut posuere sem. Aliquam et mauris scelerisque, varius elit
                maximus, pretium ex. Praesent mattis metus sed dapibus aliquet.
                Maecenas in efficitur lorem. Nullam neque augue, condimentum a
                est et, eleifend faucibus sapien. Phasellus auctor, nibh blandit
                fermentum sagittis, erat nibh bibendum erat, ut sagittis augue
                orci vitae quam. In cursus urna eu placerat mol.....
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-center">
            <div>
              <h2>Something relevant</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                ut posuere sem. Aliquam et mauris scelerisque, varius elit
                maximus, pretium ex. Praesent mattis metus sed dapibus aliquet.
                Maecenas in efficitur lorem. Nullam neque augue, condimentum a
                est et, eleifend faucibus sapien. Phasellus auctor, nibh blandit
                fermentum sagittis, erat nibh bibendum erat, ut sagittis augue
                orci vitae quam. In cursus urna eu placerat mol.....
              </p>
            </div>
          </Col>
          <Col>
            <img className="w-100" src={ImageThree} alt="offices"></img>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default grid;
