import React from 'react'
import AdminProfileSide from '../../components/AdminProfileSide/AdminProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import SpamCommentSide from '../../components/SpamCommentSide/SpamCommentSide'
const SpamComments = () => {
  return (
    <div className="Home">
    <AdminProfileSide/>
  <SpamCommentSide/>
  <RightSide/>
</div>
  )
}

export default SpamComments