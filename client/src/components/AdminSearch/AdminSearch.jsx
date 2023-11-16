import React from 'react'

import {UilSearch} from '@iconscout/react-unicons'
import './AdminSearch.css'

const AdminSearch = () => {
  return (
    <div className="LogoSearch">
  
    <div className="Search">
        <input type="text" placeholder='Enter Email' />
        <div className="s-icon">
            <UilSearch/>
        </div>
        
    </div>
    <div className="Search">
        <input type="text" placeholder='Enrollment Year' />
        
      
    </div>
    <div className="Search">
        <input type="text" placeholder='Gender' />
      
    </div>
    <div className="Search">
        <input type="text" placeholder='Status' />
      
    </div>
</div>
  )
}

export default AdminSearch