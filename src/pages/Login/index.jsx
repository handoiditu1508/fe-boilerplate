import { Navigate, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { login, selectUserName } from "../../redux/features/authentication/authenticationSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state?.redirect ?? "/";
  const userName = useSelector(selectUserName);
  const [name, setName] = useState("");

  const handleLogin = () => {
    dispatch(login(name));
    //navigate("/");
  }

  return !userName ? (
    <>
      <input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleLogin}>Sign in</button>
    </>
  ) : (
    <Navigate to={redirect} replace={true}></Navigate>
  );
}