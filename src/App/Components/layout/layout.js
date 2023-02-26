import Header from "../header";
import React, { useContext } from "react";
import ModalContextSettings from "../../../context/ModalContextSettings";
import ModalContextPosts from "../../../context/ModalContextPosts";
import { SettingsModal, PostModals } from "../modals";
import { NewPostButton } from "../button";
import AuthContext from "../../../context/AuthContext";
import { BannerSourceProvider } from "./context/BannerContext";

export default (props) => {
  const [modalShowSettings, setModalShowSettings] =
    useContext(ModalContextSettings);
  const [modalShowPost, setModalShowPost] = useContext(ModalContextPosts);
  const [auth] = useContext(AuthContext);

  return (
    <>
      <BannerSourceProvider>
        <Header />
        <div>{props.children}</div>
        {auth ? <NewPostButton /> : <div></div>}
        <SettingsModal
          show={modalShowSettings}
          onHide={() => setModalShowSettings(false)}
        />
        <PostModals
          show={modalShowPost[0]}
          onHide={() => setModalShowPost([false, ""])}
        />
      </BannerSourceProvider>
    </>
  );
};
