import { Navigate, useLocation } from "react-router-dom";

import React from "react";
import { selectUserName } from "../../redux/features/authentication/authenticationSlice";
import { useSelector } from "react-redux";

export default function RequireAuth({ children }) {
  const userName = useSelector(selectUserName);
  const location = useLocation();

  if (!userName) {
    return <Navigate to="/login" replace={true} state={{redirect: location.pathname + location.search}} />
  }

  return children;
}