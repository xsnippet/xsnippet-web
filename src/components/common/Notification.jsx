import React from 'react'
import PropTypes from 'prop-types'

import '../../styles/common/Notification.styl'

const Notification = ({ message }) => (
  <div className="notification has-error">{message}</div>
)

Notification.propTypes = {
  message: PropTypes.string,
}

Notification.defaultProps = {
  message: '',
}

export default Notification
