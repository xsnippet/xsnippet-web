import React, { useState, useEffect } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

const ListBox = (props) => {
  const [selected, setSelected] = useState(null)
  const { items, className } = props

  useEffect(() => {
    // Consumers can either pass selected item via props, or let the component
    // to handle it on its own. The former might be useful when you want to
    // extend behaviour (e.g. some ListBoxWithSearchbar), while the latter -
    // when you want a standalone ListBox component.
    let select = props.selected || selected
    const def = props.items[0]

    // If selected item is not a part of new items, aggressively fallback to
    // first item from the list. We're doing it to be protected from cases
    // when nothing is selected.
    if ((!select || !props.items.find(item => item.value === select)) && def) {
      select = def.value
      props.onClick(select)

      setSelected(select)
    }
  }, [props])

  const onClick = e => {
    const { value } = e.target.dataset

    setSelected(value)
    props.onClick(value)
  }

  const renderItems = () => {
    if (!items.length) {
      return <li className={`${className}-empty`}>No results found</li>
    }

    return items.map(item => (
      <li
        className={`${className}-item ${item.value === selected ? 'active' : ''}`}
        data-value={item.value}
        key={item.value}
      >
        {item.name}
      </li>
    ))
  }

  return (
    // TODO: Get rid of domain specific CSS classes in favor of general one;
    //       this component is a good candidate to be extracted into separate
    //       library.
    <Scrollbars>
      <ul className={`${className}-list`} role="presentation" onClick={onClick}>
        {renderItems()}
      </ul>
    </Scrollbars>
  )
}

export default ListBox
