import React from 'react'

const Notification = ({ notification }) => {
    const {message, error} = notification;
    if (message === null) {
      return null
    }
  
    return (
      <div className={error? 'error' : 'success'}>
        {message}
      </div>
    )
  }
  
export default Notification