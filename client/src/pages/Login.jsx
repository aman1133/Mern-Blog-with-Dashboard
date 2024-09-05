import "../assets/auth.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, reset } from "../features/auth/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  // Reset the state when the component unmounts or when isSuccess changes
  useEffect(() => {
    return () => {
      dispatch(reset()); // Clear state on unmount
    };
  }, [dispatch]);

  return (
    <div className="wrapper">
      <form className="form-signin" onSubmit={onSubmit}>
        <h2 className="form-signin-heading">Please login</h2>
        <input
          type="text"
          className="form-control"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="btn btn-lg btn-primary btn-block"
          type="submit"
          disabled={isLoading}
        >
          Login
        </button>
        {isError && <div>{message}</div>}
      </form>
    </div>
  );
}

export default Login;
