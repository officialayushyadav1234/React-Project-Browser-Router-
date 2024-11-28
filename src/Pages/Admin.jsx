import axios from "axios";
import React, { useEffect, useState } from "react";

const Admin = () => {
 
  let [allUsers, setAllUsers] = useState(null);
  let [toggle, setTogle] = useState(false);

  useEffect(() => {
      async function fetchAllRegisterUser(){
        let {data} = await axios.get("http://localhost:5000/users");
       console.log(data);
       setAllUsers(data);
      }
      fetchAllRegisterUser();
    
  }, [toggle]);

  let deleteUser = (x) => {
     axios.delete(`http://localhost:5000/users/${x}`)
     .then(() => {
        toast.success("user deleted");

        setTogle(!toggle);
     })
     .catch(() => {
      toast.error("Unable to delete");
     })
  }
 
  return (
    <form className="form" onSubmit={RegisterSubmit}>
    <h1>Admin Pannel</h1>
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
      <button className="btn" type="submit">Update</button>
      <button className="btn" type="submit">delete</button>
    </form>
  )
}
export default Admin;