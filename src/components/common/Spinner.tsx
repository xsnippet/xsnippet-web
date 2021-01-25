import React, { FC } from 'react'
import SpinnerImg from '../../assets/icons/ripple.svg'

import '../../styles/common/Spinner.styl'

const Spinner: FC = () => (
  <div className="spinner">
    <img src={SpinnerImg} alt="Loading..." />
  </div>
)

export default Spinner
