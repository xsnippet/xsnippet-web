import React from 'react'

import '../../styles/common/Notification.styl'

const Notification = ({ message }) => (
  <div className="notification has-error">{message}</div>
)

export default Notification
