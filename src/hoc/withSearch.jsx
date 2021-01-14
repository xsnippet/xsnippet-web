import React, { Fragment, useState, useCallback } from 'react'

import { regExpEscape } from '../misc/reqExp'

const withSearch = BaseComponent => (props) => {
  const [searchQuery, setSearchQuery] = useState(null)
  const { items, onClick, className } = props

  const onSearch = useCallback(e => {
    setSearchQuery(e.target.value.trim())
  })

  // Normalize items arrays so each item is always an object.
  let notmalizedItems = items.map((item) => {
    if (item !== Object(item)) {
      return { name: item, value: item }
    }

    return item
  })

  // Filter out only those items that match search query. If no query is
  // set, do nothing and use the entire set.
  if (searchQuery) {
    const regExp = new RegExp(regExpEscape(searchQuery), 'gi')
    notmalizedItems = notmalizedItems.filter(item => item.name.match(regExp))
  }

  return (
    <Fragment>
      <div className={`${className}-header`} key="Syntax input">
        <input className="input" placeholder="Type to search..." onChange={onSearch} />
      </div>
      <div className={`${className}-list-wrapper`} key="Syntax list">
        <BaseComponent
          {...props}
          className={className}
          items={notmalizedItems}
          onClick={onClick}
        />
      </div>
    </Fragment>
  )
}

export default withSearch
