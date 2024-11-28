import React, { useEffect, useState } from "react";
import style from "./Update.module.css";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateProfile = () => {

  let userID = localStorage.getItem("userID");
  let navigate = useNavigate();

  let [userDetails, setUserDetails] = useState(null); 

  useEffect(() => {
    async function fetchUser() {
      try {
        let { data } = await axios.get(`http://localhost:5000/users/${userID}`);
        console.log(data);
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Failed to load user data");
      }
    }    
    fetchUser();
  },[]);

  let handleChange = (e) => {
    let {name, value} = e.target;
    setUserDetails({...userDetails,[name]: value})
  };

  let UpdatedFormSubmit = (e) => {
     
    e.preventDefault();
    axios.put(`http://localhost:5000/users/${userID}`,userDetails).then(() => {
      toast.success("Profile Updated");
      navigate("/profile");
    }).catch(() => {
      toast.error("Update Failed");
    });
    console.log("Updated Value", userDetails);
  }

  return (
    <div id={style.updateprofile}>

      <form className="form" onSubmit={UpdatedFormSubmit}>
      <h1>Update Profile</h1>
      <div>
        <label>Name</label>
        <input type="text" required placeholder="Enter Your Name" name="username" value={userDetails?.username} readOnly/>
      </div>

      <div>
        <label>email</label>
        <input type="email" required placeholder="Enter email" name="useremail" value={userDetails?.useremail} readOnly/>
      </div>
      <div>
        <label>password</label>
        <input type="password" required placeholder="Enter password" name="userpassword" value={userDetails?.userpassword}  onChange={handleChange}/>
      </div>
      <div>
        <label>Phone</label>
        <input type="tel"
         pattern="[0-9]{10}"
         required placeholder="Enter Phone Number" 
         name="userphone" 
         value={userDetails?.userphone} 
         onChange={handleChange}/>
      </div>
      <button type="submit">Update</button>
    </form>
    </div>
  )
}
export default UpdateProfile;