import React from 'react';
import { NavLink } from 'react-router-dom';

import '../styles/Sidebar.styl';

const Sidebar = () => (
  <nav className="sidebar" key="navigation">
    <ul className="">
      <li className="">
        <NavLink to="/" activeClassName="active">New snippet</NavLink>
      </li>
      <li className="">
        <NavLink to="/recent" activeClassName="active">Recent snippets</NavLink>
      </li>
      <li className="">
        <NavLink to="/upload" activeClassName="active">Upload snippet</NavLink>
      </li>
      <li className="">
        <NavLink to="/about" activeClassName="active">About</NavLink>
      </li>
      <li className="">
        <NavLink to="/sign-in" activeClassName="active">Sign in</NavLink>
      </li>
    </ul>
  </nav>
);

export default Sidebar;
