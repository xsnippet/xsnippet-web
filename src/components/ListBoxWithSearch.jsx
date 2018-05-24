import React from 'react'

import ListBox from './ListBox'
import * as misc from '../misc'

class ListBoxWithSearch extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: null,
    }
    this.onSearch = this.onSearch.bind(this)
  }

  onSearch(e) {
    this.setState({ searchQuery: e.target.value.trim() })
  }

  render() {
    const { searchQuery } = this.state
    let { items } = this.props

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
      const regExp = new RegExp(misc.regExpEscape(searchQuery), 'gi')
      items = items.filter(item => item.name.match(regExp))
    }

    return (
      [
        <div className="new-snippet-lang-header" key="Syntax input">
          <input className="input" placeholder="Type to search..." onChange={this.onSearch} />
        </div>,
        <div className="new-snippet-lang-list-wrapper" key="Syntax list">
          <ListBox
            items={items}
            onClick={this.props.onClick}
          />
        </div>,
      ]
    )
  }
}

export default ListBoxWithSearch
