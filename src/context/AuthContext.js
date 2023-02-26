//Source: Noroff

import React, { useState } from "react";
import setAuthOnLoad from "./auth";

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [auth, setAuth] = useState(setAuthOnLoad);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
