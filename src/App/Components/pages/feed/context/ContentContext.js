import { useState, createContext } from "react";

const ContentContext = createContext();

export const SelectContentProvider = ({ children }) => {
  const [selectedContent, setSelectedContent] = useState([true, false]);
  return (
    <ContentContext.Provider value={[selectedContent, setSelectedContent]}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentContext;
