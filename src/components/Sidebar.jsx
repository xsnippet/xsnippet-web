import React from 'react'
import { NavLink } from 'react-router-dom'
import bemi from 'bemi'

import '../styles/Sidebar.styl'

const sidebar = bemi('sidebar')

const Sidebar = () => (
  <nav className={sidebar.b()}>
    <ul className={sidebar.e('list')}>
      <li className={sidebar.e('item')}>
        <NavLink exact to="/" activeClassName="active" title="New Snippet">
          <i className="icon-new" />
        </NavLink>
      </li>
      <li className={sidebar.e('item', 'border')}>
        <NavLink to="/recent" activeClassName="active" title="Recent Snippets">
          <i className="icon-recent" />
        </NavLink>
      </li>
      <li className={sidebar.e('item')}>
        <NavLink to="/about" activeClassName="active" title="About">
          <i className="icon-about" />
        </NavLink>
      </li>
    </ul>
  </nav>
)

export default Sidebar
