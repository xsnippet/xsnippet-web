import React from 'react';
import { NavLink } from 'react-router-dom';

import '../styles/Header.styl';
import Logo from '../assets/xsnippet.svg';

const Header = () => (
  <header className="header" key="header">
    <div className="header-logo">
      <NavLink exact to="/">
        <img src={Logo} alt="XSnippet" />
      </NavLink>
    </div>
    <div className="header-inner">
      <div className="header-slogan">
        <span className="header-slogan-x">X</span>SNIPPET
      </div>
      <div className="header-sign-in">
        <NavLink to="/sign-in">
          <span>Sign in</span>
          <i className="icon-user" />
        </NavLink>
      </div>
    </div>
  </header>
);

export default Header;
