import React from 'react'
import { NavLink } from 'react-router-dom'

import bemi from 'bemi'

import Logo from '../assets/icons/xsnippet.svg'

import '../styles/Header.styl'

const header = bemi('header')

const Header = () => (
  <header className={header.b()}>
    <div className={header.e('logo')}>
      <NavLink exact to="/">
        <img src={Logo} alt="XSnippet" />
      </NavLink>
    </div>
    <div className={header.e('inner')}>
      <div className={header.e('slogan')}>
        <span className={header.e('slogan-x')}>X</span>SNIPPET
      </div>
      <div className={header.e('sign-in')}>
        <NavLink to="/sign-in">
          <span>Sign in</span>
          <i className="icon-user" />
        </NavLink>
      </div>
    </div>
  </header>
)

export default Header
