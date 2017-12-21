import React from 'react';
import { NavLink } from 'react-router-dom';


const Header = () => (
  <header>
    <nav>
      <ul>
        <li><NavLink to="/" activeClassName="active">New snippet</NavLink></li>
        <li><NavLink to="/recent" activeClassName="active">Recent snippets</NavLink></li>
        <li><NavLink to="/upload" activeClassName="active">Upload snippet</NavLink></li>
        <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
        <li><NavLink to="/sign-in" activeClassName="active">Sign in</NavLink></li>
      </ul>
    </nav>
  </header>
);

export default Header;
