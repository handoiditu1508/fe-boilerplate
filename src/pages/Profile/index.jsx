import React from "react";
import { selectCurrentUser } from "../../redux/features/authentication/authenticationSlice";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector(selectCurrentUser);

  return (
    <>
      <p>Hello user {user.name}</p>
      <p>Id: {user.id}</p>
    </>
  );
}