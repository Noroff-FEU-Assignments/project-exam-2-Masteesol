import { useState, createContext } from "react";

const FollowContext = createContext();

export const FollowProvider = ({ children }) => {
  const [followed, setFollowed] = useState([]);
  return (
    <FollowContext.Provider value={[followed, setFollowed]}>
      {children}
    </FollowContext.Provider>
  );
};

export default FollowContext;
