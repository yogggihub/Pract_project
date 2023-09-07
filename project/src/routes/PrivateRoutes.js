import React from "react";
import { Navigate } from "react-router-dom";
import { login } from "../util/utils";
import { USER_TYPES } from "../const/const";

//  Admin Routes
const PrivateRoute = ({ children }) => {
  const { auth, token, userRole } = login();
  if (auth && token && USER_TYPES.ADMIN === userRole) {
    return children;
  } else if (auth && token) {
    return <Navigate to="/dashboard/home" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};
export default PrivateRoute;
