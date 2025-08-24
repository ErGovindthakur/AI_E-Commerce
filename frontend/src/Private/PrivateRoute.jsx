import React, { useContext } from "react";
import { userDataContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { userData, loading } = useContext(userDataContext);

  if (loading) {
    return <h2>Checking authentication...</h2>; // ⏳ Wait for API
  }

  return userData ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
