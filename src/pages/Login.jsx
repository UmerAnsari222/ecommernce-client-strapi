import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../gql/mutation";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

  if (loading) return <h1>Loading...</h1>;

  if (data) {
    localStorage.setItem("jwt", data.login.jwt);
    navigate("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({
      variables: {
        input: formData,
      },
    });
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      {error && <div className="card-panel red">{error.message}</div>}

      <h3>Login </h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email or username"
          name="identifier"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn deep-purple">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
