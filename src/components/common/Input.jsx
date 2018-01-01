import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/common/Input.styl';

const Input = (props) => {
  const {
    name, type, value, placeholder, additionalClass, onChangeHandler,
  } = props;

  return (
    <input
      className={`input ${additionalClass}`}
      placeholder={placeholder}
      name={name}
      type={type}
      value={value}
      onChange={onChangeHandler}
    />
  );
};

Input.propTypes = {
  additionalClass: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  onChangeHandler: PropTypes.func,
};

Input.defaultProps = {
  additionalClass: '',
  placeholder: 'Enter text',
  value: '',
  name: 'input',
  type: 'text',
  onChangeHandler: () => {},
};

export default Input;
