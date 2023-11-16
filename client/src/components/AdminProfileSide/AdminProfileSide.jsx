import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import AdminLogoSearch from '../AdminLogoSearch/AdminLogoSearch'
import AdminProfileCard from '../AdminProfileCard/AdminProfileCard'

import "./AdminProfileSide.css"
const AdminProfileSide = () => {
  return (
    <div className="ProfileSide">
    <AdminLogoSearch/>
    <AdminProfileCard/>
    
</div>
  )
}

export default AdminProfileSide