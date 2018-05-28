import React from 'react'
import PropTypes from 'prop-types'

import '../../styles/common/Title.styl'

const Title = ({ title, additionalClass }) => (
  <div className={`title ${additionalClass}`}>{ title }</div>
)

Title.propTypes = {
  title: PropTypes.string,
  additionalClass: PropTypes.string,
}

Title.defaultProps = {
  title: '',
  additionalClass: '',
}

export default Title
