import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";
// eslint-disable-next-line react-refresh/only-export-components
export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState();

  let { serverUrl } = useContext(authDataContext);

  let getCurrentUser = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/user/getCurrentUser`,
        {}, // <-- empty body
        { withCredentials: true } // <-- config goes here
      );

      console.log("Log from UserContext -: ", res.data);
      setUserData(res.data.user);
    } catch (err) {
      setUserData(null);
      console.log("Error from User Context -: ", err.message);
    }
  };
  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let value = {
    userData,
    setUserData,
    getCurrentUser,
  };
  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
