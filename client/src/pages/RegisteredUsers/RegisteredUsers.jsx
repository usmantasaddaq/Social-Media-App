import React from 'react'

import AdminProfileSide from '../../components/AdminProfileSide/AdminProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import Users from '../../components/Users/Users'
const RegisteredUsers = () => {
  return (
    <div className="Home">
    <AdminProfileSide/>
  <Users/>
  <RightSide/>
</div>
  )
}

export default RegisteredUsers