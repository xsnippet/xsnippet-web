import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

import '../styles/Sidebar.styl'

const Sidebar: FC = () => (
  <nav className="sidebar">
    <ul className="sidebar-list">
      <li className="sidebar-item">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} title="New Snippet" end>
          <i className="icon-new" />
        </NavLink>
      </li>
      <li className="sidebar-item sidebar-item-border">
        <NavLink to="/recent" className={({ isActive }) => isActive ? "active" : ""} title="Recent Snippets">
          <i className="icon-recent" />
        </NavLink>
      </li>
      <li className="sidebar-item">
        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""} title="About">
          <i className="icon-about" />
        </NavLink>
      </li>
    </ul>
  </nav>
)

export default Sidebar
