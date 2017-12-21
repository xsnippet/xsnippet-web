import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to="/">New snippet</Link></li>
        <li><Link to="/recent">Recent snippets</Link></li>
        <li><Link to="/upload">Upload snippet</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/sign-in">Sign in</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
