import { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // NEW

  let { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/user/getCurrentUser`,
        {},
        { withCredentials: true }
      );
      console.log("Log from UserContext -:", res.data);
      setUserData(res.data.user);
    } catch (err) {
      setUserData(null);
      console.log("Error from User Context -:", err.message);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  useEffect(() => {
    getCurrentUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <userDataContext.Provider value={{ userData, setUserData, loading ,getCurrentUser}}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
