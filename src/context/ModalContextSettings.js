import { useState, createContext } from "react";

const ModalContext = createContext();

export const ModalProviderSettings = ({ children }) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <ModalContext.Provider value={[modalShow, setModalShow]}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
