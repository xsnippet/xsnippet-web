import React, { Fragment, useState, useCallback } from 'react'

import ListBox from './ListBox'

import { regExpEscape } from '../misc/reqExp'

const ListBoxWithSearch = ({ items, onClick }) => {
  const [ searchQuery, setSearchQuery ] = useState(null)

  const onSearch = useCallback(e => {
    setSearchQuery(e.target.value.trim())
  })

  // Normalize items arrays so each item is always an object.
  items = items.map((item) => {
    if (item !== Object(item)) {
      return { name: item, value: item }
    }

    return item
  })

  // Filter out only those items that match search query. If no query is
  // set, do nothing and use the entire set.
  if (searchQuery) {
    const regExp = new RegExp(regExpEscape(searchQuery), 'gi')
    items = items.filter(item => item.name.match(regExp))
  }

  return (
    <Fragment>
      <div className="new-snippet-lang-header" key="Syntax input">
        <input className="input" placeholder="Type to search..." onChange={onSearch} />
      </div>
      <div className="new-snippet-lang-list-wrapper" key="Syntax list">
        <ListBox
          items={items}
          onClick={onClick}
        />
      </div>
    </Fragment>
  )
}

export default ListBoxWithSearch
