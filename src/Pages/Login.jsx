import React, { useEffect, useState } from "react";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {

  let [loginUser, setLoginUser] = useState ({
    useremail: "",
    userpassword: "",
  });

  // for fetching register user
  let [allRegisterUser, setAllRegisterUser] = useState(null);

  //  Navigate for Profile
  let navigate = useNavigate();

  let handleLoginUser = (e) => {
    let {name, value} = e.target;
    setLoginUser({...loginUser,[name]: value})
  };

  // Fetching Register Users
  useEffect(() => {
    async function fetchRegisterUser(){
      let {data} = await axios.get("http://localhost:5000/users");
      setAllRegisterUser(data);
    }
    fetchRegisterUser();
  },[]);


  let loginSubmit = (e) => {
    e.preventDefault();
    // console.log(loginUser);
    let authUser = allRegisterUser.find((user) => {
      return(
        user.useremail === loginUser.useremail && user.userpassword === loginUser.userpassword
      );
    });

    console.log(authUser);

    // for Admin 
    if(authUser.useremail === "admin@gmail.com" && 
      authUser.userpassword === "Admin@1223"
    ) 
     {
      toast.success(`Welcome ${authUser.username}`);
      localStorage.setItem("userID");
      navigate("/admin");
     } else if(authUser) {
      toast.success(`Welcome ${authUser.username}`);
      // Set local Storage SetItem for id
      localStorage.setItem("userID", authUser.id);
       //  for Login Navigate
       navigate("/profile");
    } else {
      toast.error("Access Denied");
    }
  }

  return (
    <div id={style.login}>
    
    <form className="form" onSubmit={loginSubmit}>
    <h1>Login Form</h1>
      
      <div>
        <label>email</label>
        <input type="email" 
        required placeholder="Enter email" 
        name="useremail" 
        value={loginUser.useremail} 
        onChange={handleLoginUser}/>
      </div>      
      <div>
        <label>password</label>
        <input type="password" 
        required placeholder="Enter password" 
        name="userpassword" 
        value={loginUser.userpassword} 
        onChange={handleLoginUser}/>
      </div>
      <button className="btn" type="submit">Login</button>
    </form>
</div>
  );
};

export default Login;