import { useState, createContext } from "react";

const ModalContext = createContext();

export const ModalProviderProfiles = ({ children }) => {
  //second index is for the user id/name
  const [modalShow, setModalShow] = useState([false, ""]);
  return (
    <ModalContext.Provider value={[modalShow, setModalShow]}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
