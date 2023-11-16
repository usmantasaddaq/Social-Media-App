import React from 'react'
import './WarningMessage.css'
const WarningMessage = () => {
  return (
 <div class="back">
  <div class="back-container">
    <div class="screen">
      <div class="screen-header">
        <div class="screen-header-left">
          <div class="screen-header-button close"></div>
          <div class="screen-header-button maximize"></div>
          <div class="screen-header-button minimize"></div>
        </div>
        <div class="screen-header-right">
          <div class="screen-header-ellipsis"></div>
          <div class="screen-header-ellipsis"></div>
          <div class="screen-header-ellipsis"></div>
        </div>
      </div>
      <div class="screen-body">
        <div class="screen-body-item left">
          <div class="app-title">
            <span>Send</span>
            <span>Warning</span>
          </div>
         
        </div>
        <div class="screen-body-item">
          <div class="app-form">
          
            <div class="app-form-group">
              <input class="app-form-control" placeholder="EMAIL" />
            </div>
           
            <div class="app-form-group message">
              <input class="app-form-control" placeholder="MESSAGE"/>
            </div>
            <div class="app-form-group buttons">
              <button class="app-form-button">CANCEL</button>
              <button class="app-form-button">SEND</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
  )
}

export default WarningMessage