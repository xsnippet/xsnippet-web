import React, { FC } from 'react'

import '../../styles/common/Title.styl'

const Title: FC<{title:string, additionalClass?:string}> = ({ title, additionalClass = '' }) => (
  <div className={`title ${additionalClass}`}>{title}</div>
)

export default Title
