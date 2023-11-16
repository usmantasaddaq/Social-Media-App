import React from 'react'
import AdminProfileCard from '../../components/AdminProfileCard/AdminProfileCard'
import RightSide from '../../components/RightSide/RightSide'
import AdminProfileLeft from '../../components/AdminProfileLeft/AdminProfileLeft'
import AdminPostSide from '../../components/AdminPostSide/AdminPostSide'
import './AdminProfile.css'
const AdminProfile = () => {
  return (
    <div className="Profile">
        <AdminProfileLeft/>

        <div className="Profile-center">
            <AdminProfileCard/>
            <AdminPostSide/>
        </div>

        <RightSide/>
    </div>
  )
}

export default AdminProfile