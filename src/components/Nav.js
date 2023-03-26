import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem("_id");
    //👇🏻 redirects to the login page
    navigate("/");
    alert("User signed out!");
  };
  return (
    <nav className="navbar">
      <h2>Threadify</h2>
      <div className="navbarRight">
        <button onClick={signOut}>Sign out</button>
      </div>
    </nav>
  );
};

export default Nav;
