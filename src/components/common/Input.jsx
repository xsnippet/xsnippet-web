import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/common/Input.styl';

const Input = props => (
  <input className={`input ${props.additionalClass}`} placeholder={props.placeholder} />
);

Input.propTypes = {
  additionalClass: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  additionalClass: '',
  placeholder: 'Enter text',
};

export default Input;
