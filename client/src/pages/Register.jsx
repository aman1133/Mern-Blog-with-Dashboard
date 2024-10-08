import "../assets/auth.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extract auth states from Redux
  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password, role }));
  };

  // Redirect to dashboard if the user is already authenticated or found in localStorage
  useEffect(() => {
    if (user) {
      navigate("/dashboard"); // Navigate to dashboard if user is authenticated or exists in localStorage
    }
  }, [user, navigate]);

  // Reset the state when the component unmounts or when isSuccess changes
  useEffect(() => {
    if (isSuccess) {
      navigate("/login"); // Navigate to login page on successful registration
      dispatch(reset());
    }

    return () => {
      dispatch(reset()); // Clear state on unmount
    };
  }, [isSuccess, navigate, dispatch]);

  return (
    <div className="authWrapper">
      <form className="form-signin" onSubmit={onSubmit}>
        <h2 className="form-signin-heading">Please Register</h2>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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
        <select
          className="form-control"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="user">User</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
        <button
          className="btn btn-lg btn-primary btn-block"
          type="submit"
          disabled={isLoading}
        >
          Register
        </button>
        <div className="authLink">
          <p>Do you have an account?</p>
          <Link to="/login">Login here</Link>
        </div>
        {isError && <div>{message}</div>}
        {isSuccess && <div>Registration successful!</div>}
      </form>
    </div>
  );
}

export default Register;