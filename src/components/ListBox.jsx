import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

class ListBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Consumers can either pass selected item via props, or let the component
    // to handle it on its own. The former might be useful when you want to
    // extend behaviour (e.g. some ListBoxWithSearchbar), while the latter -
    // when you want a standalone ListBox component.
    let selected = nextProps.selected || this.state.selected;

    // If selected item is not a part of new items, aggressively fallback to
    // first item from the list. We're doing it to be protected from cases
    // when nothing is selected.
    if (!selected || !nextProps.items.contains(selected)) {
      selected = nextProps.items.get(0);
      nextProps.onClick(selected);
    }

    this.setState({ selected });
  }

  onClick(e) {
    const { item } = e.target.dataset;

    this.setState({ selected: item });
    this.props.onClick(item);
  }

  render() {
    const { items } = this.props;
    const { selected } = this.state;

    return (
      // TODO: Get rid of domain specific CSS classes in favor of general one;
      //       this component is a good candidate to be extracted into separate
      //       library.
      <Scrollbars>
        <ul className="new-snippet-lang-list" role="presentation" onClick={this.onClick}>
          {items.size ? null : <li className="new-snippet-lang-empty">No results found</li>}
          {items.map(item => (
            <li
              className={`new-snippet-lang-item ${item === selected ? 'active' : ''}`}
              data-item={item}
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </Scrollbars>
    );
  }
}

export default ListBox;