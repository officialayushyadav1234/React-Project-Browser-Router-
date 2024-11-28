import React from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRouter";
import { Toaster } from "react-hot-toast";
import Profile from "./Pages/Profile";
import UpdateProfile from "./Pages/UpdateProfile";
import Admin from "./Pages/Admin";

const App = () => {
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route  path="/updateprofile"
          element=
          {<PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>}/>
         
          <Route  path="/admin"
          element=
          {<PrivateRoute>
            <Admin />
          </PrivateRoute>}/>
            
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
