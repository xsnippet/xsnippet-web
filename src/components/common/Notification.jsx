import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/common/Notification.styl';

const Notification = ({ show, message }) => (
  <div className={`notification ${show && 'has-error'}`}>{message}</div>
);

Notification.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
};

Notification.defaultProps = {
  show: false,
  message: '',
};

export default Notification;
