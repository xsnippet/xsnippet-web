import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/common/Input.styl';

const Input = ({ additionalClass, placeholder, value }) => (
  <input className={`input ${additionalClass}`} placeholder={placeholder} value={value} />
);

Input.propTypes = {
  additionalClass: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

Input.defaultProps = {
  additionalClass: '',
  placeholder: 'Enter text',
  value: '',
};

export default Input;
