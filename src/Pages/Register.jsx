import React, { useState } from "react";
import style from "./Register.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {

  let [registerUser, setregisterUser] = useState ({
    username : "",
    useremail: "",
    userpassword: "",
    userphone: "",
  });

  // For Navigate Login page
  let navigate = useNavigate();

  let RegisterHandle = (e) => {
    let { name, value } = e.target;
    setregisterUser((registerUser) => ({
      ...registerUser,[name]:value}));
  };

  let RegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Registering User", registerUser);
    
    axios
    .post("http://localhost:5000/users", registerUser)
    .then(() => {
      toast.success("Register Successfully");
      setregisterUser({
        username: "",
        useremail: "",
        userpassword: "",
        userphone: "",
      });

      //  for Login Navigate
      navigate("/login");

    })
    .catch((error) => {
      console.error("Registration error:", error);
      alert("Not Successfully");
    });
  }

  //-----------  return statement ------------
  return (
  <div id={style.register}>
    <form className="form" onSubmit={RegisterSubmit}>
    <h1>Register</h1>
      <div>
        <label>Name</label>
        <input type="text" 
        required placeholder="Enter Your Name" 
        name="username" 
        value={registerUser.username} 
        onChange={RegisterHandle}/>
      </div>

      <div>
        <label>email</label>
        <input type="email" 
        required placeholder="Enter email" 
        name="useremail" 
        value={registerUser.useremail} 
        onChange={RegisterHandle} />
      </div>
      <br />
      <div>
        <label>password</label>
        <input type="password" 
        required placeholder="Enter password" 
        name="userpassword" 
        value={registerUser.userpassword} 
        onChange={RegisterHandle}/>
      </div>
      <br/>
      <div>
        <label>Phone</label>
        <input type="tel" 
        pattern="[0-9]{10}" 
        required placeholder="Enter Phone Number" 
        name="userphone" 
        value={registerUser.userphone} 
        onChange={RegisterHandle}/>
      </div>
      <br /><br />
      <button className="btn" type="submit">Register</button>
    </form>

  </div>
  );
};

export default Register;