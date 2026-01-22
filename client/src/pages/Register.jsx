import React from 'react'
import "./Register.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../store/Auth";
import { toast } from 'react-toastify';
const Register = () => {
   
  const [user, setUser] = useState({
    username: "",
    email:"",
    phone:"",
    password:"",
  });
   
    const navigate = useNavigate();
    const {storeTokenInLS, API} = useAuth();

  //handling the input  values
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  //handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    const response = await fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const res_data = await response.json();
    console.log(res_data.extraDetails);
     
    if(response.ok){
      // store token in localhost
      storeTokenInLS(res_data.token); 
      setUser({username: "", email:"", phone:"", password:""});
      toast.success("Registration Successful")
      navigate("/");
    }else{
      toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
    }
  
  };


  return (
    <section>
      <main>
        <div className="section-registration">
           <div className="registration-form">
              <h1 className="main-heading mb-3">Registration Form</h1>
              <br />
              <form onSubmit={handleSubmit} >
                <div>
                  <label htmlFor="username">Name</label>
                  <input
                    type="text"
                    name="username"
                    id='username'
                    required
                    autoComplete='off'
                    placeholder="John Doe"
                    value={user.username}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id='email'
                    required
                    autoComplete='off'
                    placeholder="name@example.com"
                    value={user.email}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    id='phone'
                    placeholder="+91 98765 43210"
                     required
                    autoComplete='off'
                    value={user.phone}
                    onChange={handleInput}

                  />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id='password'
                     required
                    autoComplete='off'

                    placeholder="Minimum 8 characters"
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>
                <br />
                <button type="submit" className="btn">
                  Register Now
                </button>
              </form>
            </div>
        </div>
      </main>
    </section>

  )
}

export default Register
