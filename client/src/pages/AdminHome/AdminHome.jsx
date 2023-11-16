import React, { useState } from 'react'
import Adddeparment from '../../components/Adddeparment'
import AdminPostSide from '../../components/AdminPostSide/AdminPostSide'
import AdminProfileSide from '../../components/AdminProfileSide/AdminProfileSide'
import RightSide from '../../components/RightSide/RightSide'


const AdminHome = () => {
  const [dept, setdept] = useState(false)
  const show = () => {
    setdept(!dept)
  }

  return (
    <div className="Home">
      <AdminProfileSide />
      {
        dept === false ? <AdminPostSide /> : <Adddeparment />
      }
      <RightSide showcomp={show} />
    </div>
  )
}

export default AdminHome