import axios from "axios";
import style from "./Profile.module.css";
import React, { useEffect, useState } from "react";

const Profile = () => {
  let userID = localStorage.getItem("userID");

  let [profileUser, setProfileUser] = useState(null);
  let [APIUsers, setAPIUsers] = useState(null);

  useEffect(() => {
    async function fetchAuthUser() {
      //! Fetching inidividual user dynamically
      let { data } = await axios.get(`http://localhost:5000/users/${userID}`);
      setProfileUser(data);
    }
    fetchAuthUser();
  }, []);

  useEffect(() => {
    async function fetchAPIUsers() {
      let { data } = await axios.get("https://api.github.com/users");
      setAPIUsers(data);
    }
    fetchAPIUsers();
  }, []);

  return (
    <div id={style.profile}>

      <h1>Welcome {profileUser?.username}</h1>
      <br /><br /><br /><br />
      {APIUsers?.map((user) => {
        let { login, avatar_url, html_url, type, id } = user;
        return (
          <section key={id}>
            <h1>{login}</h1>
            <img src={avatar_url} height={200} width={200} />
            <p>
              <a href={html_url}>view more</a>
            </p>
            <h3>{type}</h3>
          </section>
        );
      })}
    </div>
  );
};

export default Profile;
