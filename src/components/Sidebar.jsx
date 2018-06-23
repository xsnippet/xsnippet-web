import React from 'react'
import { NavLink } from 'react-router-dom'

import '../styles/Sidebar.styl'

const Sidebar = () => (
  <nav className="sidebar" key="navigation">
    <ul className="sidebar-list">
      <li className="sidebar-item">
        <NavLink exact to="/" activeClassName="active" title="New Snippet">
          <i className="icon-new" />
        </NavLink>
      </li>
      <li className="sidebar-item sidebar-item-border">
        <NavLink to="/recent" activeClassName="active" title="Recent Snippets">
          <i className="icon-recent" />
        </NavLink>
      </li>
      <li className="sidebar-item">
        <NavLink to="/about" activeClassName="active" title="About">
          <i className="icon-about" />
        </NavLink>
      </li>
    </ul>
  </nav>
)

export default Sidebar
