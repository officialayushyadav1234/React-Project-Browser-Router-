import React from "react";
import style from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  // get Id from local Storage
  let userID = localStorage.getItem("userID");
  console.log(userID, "Navbar");

  let navigate = useNavigate();

  let logout = () => {
    localStorage.removeItem("userID");
    navigate("/login");
  };

  // for delete Account to fetch userID
  let deleteProfile = () => {
 
    let consfirmation = confirm("Are you sure");
    console.log(consfirmation);

    if(consfirmation) {

      axios
      .delete(`http://localhost:5000/users/${userID}`)
      .then(() => {
       toast.success("Account deleted");
       localStorage.removeItem("userID");
       navigate("/register");
      })
      .catch(() => {
       toast.error("Something went wrong");
      });
    }

  };

  return (
    <div>
      <nav>
        <aside className={style.logo}>Logo</aside>
        <ul className={style.menu}>
          <li>
            <Link to="home">home</Link>
          </li>
          <li>
            <Link to="about">about</Link>
          </li>

          {/* for get Id from LocalStorage */}
          {userID ? (
            <>
              <li className={style.drop}>
                <Link to="/profile">profile</Link>
                <ul className={style.dropdown}>
                  <li><Link to="/updateprofile" >Update</Link></li>
                  <li onClick={deleteProfile}>delete</li>
                  <li onClick={logout}>Logout</li>
                </ul>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="register">register</Link>
              </li>
              <li>
                <Link to="login">login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
