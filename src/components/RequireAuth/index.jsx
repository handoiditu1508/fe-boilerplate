import { Navigate, useLocation } from "react-router-dom";

import React from "react";
import { selectCurrentUser } from "../../redux/features/authentication/authenticationSlice";
import { useSelector } from "react-redux";

export default function RequireAuth({ children }) {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace={true} state={{redirect: location.pathname + location.search}} />
  }

  return children;
}