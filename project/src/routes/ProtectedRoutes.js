import React from "react";
import { Navigate } from "react-router-dom";
import { login } from "../util/utils";
import { USER_TYPES } from "../const/const";

//  Route for User
const ProtectedRoutes = ({ children }) => {
  const { auth, token, userRole } = login();
  if (auth && token) {
    if (USER_TYPES.USER === userRole || USER_TYPES.ADMIN === userRole) {
      return children;
    }
  } else {
    return <Navigate to="/login" replace />;
  }
};
export default ProtectedRoutes;
