import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from '../store/Auth';
import { toast } from 'react-toastify';

const Login = () => {

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS, API } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ FIXED: Using API variable instead of hardcoded localhost
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });

      const res_data = await response.json();

      if (response.ok) {
        // store token in localStorage
        storeTokenInLS(res_data.token);
        toast.success("Login Successful");
        setLogin({ email: "", password: "" });
        navigate("/");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        console.log("Invalid credentials");
      }
    } catch (error) {
      // ✅ ADDED: Error handling for network issues
      console.error("Login error:", error);
      toast.error("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="registration-form">
            <h1 className="main-heading mb-3">Login Form</h1>
            <br />
            <form onSubmit={handleSubmit}>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  autoComplete='off'
                  placeholder="name@example.com"
                  value={login.email}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  autoComplete='off'
                  placeholder="Minimum 8 characters"
                  value={login.password}
                  onChange={handleInput}
                />
              </div>
              <br />
              <button type="submit" className="btn">
                Login
              </button>
            </form>
          </div>
        </div>
      </main>
    </section>
  )
}

export default Login
