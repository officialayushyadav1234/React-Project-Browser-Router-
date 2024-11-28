import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {

  let userID = localStorage.getItem("userID");
  return (
    <div>
      {userID?
      ( <>{children}</> ):
      ( <><Navigate to={"/login"} /></>)}
    </div>
  )
}

export default PrivateRoute;