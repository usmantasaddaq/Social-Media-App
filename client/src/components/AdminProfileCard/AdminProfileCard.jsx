import React from 'react'
import Cover from "../../img/cover.jpg";
import { Link } from "react-router-dom";
import Profile from "../../img/riphah.jpg";
import "./AdminProfileCard.css";
const AdminProfileCard = () => {
    const ProfilePage = true;
  return (
    <div className="ProfileCard">
    <div className="ProfileImages">
      <img src={Cover} alt="" />
      <img src={Profile} alt="" />
    </div>

    <div className="ProfileName">
      <span>Admin</span>
      <span>IT Department</span>
    </div>

    <div className="followStatus">
      
    </div>
    <Link to="/AdminProfile" className="profile">
      My Profile
    </Link>
 
  </div>
  )
}

export default AdminProfileCard