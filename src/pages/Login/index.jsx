import { Navigate, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { loginAsync, selectCurrentUser, selectError } from "../../redux/features/authentication/authenticationSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state?.redirect ?? "/";
  const currentUser = useSelector(selectCurrentUser);
  const loading = useSelector(selectError);
  const error = useSelector(selectError);
  const [name, setName] = useState("");

  const handleLogin = () => {
    dispatch(loginAsync({ name }));
    //navigate("/");
  }

  return !currentUser ? (
    <>
      {error && <p>error: {error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
          <button onClick={handleLogin}>Sign in</button>
        </>
      )}
    </>
  ) : (
    <Navigate to={redirect} replace={true}></Navigate>
  );
}