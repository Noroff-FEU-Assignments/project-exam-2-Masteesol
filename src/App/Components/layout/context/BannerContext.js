import { useState, createContext } from "react";

const BannerSource = createContext();

export const BannerSourceProvider = ({ children }) => {
  const [source, setSource] = useState("");
  return (
    <BannerSource.Provider value={[source, setSource]}>
      {children}
    </BannerSource.Provider>
  );
};

export default BannerSource;
