import React from 'react'
import AdminProfileSide from '../../components/AdminProfileSide/AdminProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import WarningMessage from '../../components/WarningMessage/WarningMessage'
import './Warning.css'
const Warning = () => {
  return (
    <div className="Home">
    <AdminProfileSide/>
  
  <WarningMessage/>
  <RightSide/>
</div>
  )
}

export default Warning