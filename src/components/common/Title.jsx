import React from 'react'

import '../../styles/common/Title.styl'

const Title = ({ title, additionalClass }) => (
  <div className={`title ${additionalClass}`}>{ title }</div>
)

export default Title
