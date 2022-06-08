import React from "react";
import { selectUserName } from "../../redux/features/authentication/authenticationSlice";
import { useSelector } from "react-redux";

export default function Profile(){
  const userName = useSelector(selectUserName);

  return (
    <p>Hello user {userName}</p>
  );
}