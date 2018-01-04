import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';

import regExpEscape from './../helpers';
import * as actions from '../actions';

class Syntaxes extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { activeIndex: -1 };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onSyntaxSearch = this.onSyntaxSearch.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetchSyntaxes);
  }

  onClickHandler(e) {
    const { index, syntax } = e.target.dataset;

    this.setState({ activeIndex: Number(index) });
    this.props.onClick(syntax);
  }

  onSyntaxSearch(e) {
    this.setState({ searchSyntax: e.target.value.trim() });
  }

  getSyntaxes() {
    let { syntaxes } = this.props;

    if (this.state.searchSyntax) {
      syntaxes = this.filterSyntaxes(regExpEscape(this.state.searchSyntax));
    }

    return syntaxes.map((syntax, index) => {
      const active = this.state.activeIndex === index ? 'active' : '';
      return (
        <li
          className={`new-snippet-lang-item ${active}`}
          data-syntax={syntax}
          data-index={index}
          key={syntax}
        >
          {syntax}
        </li>
      );
    });
  }

  filterSyntaxes(searchSyntax) {
    const { syntaxes } = this.props;
    const regExp = new RegExp(searchSyntax, 'gi');
    return syntaxes.filter(syntax => syntax.match(regExp));
  }

  render() {
    const syntaxes = this.getSyntaxes();

    return (
      [
        <div className="new-snippet-lang-header" key="Syntax input">
          <input className="input" placeholder="Type to search..." onChange={this.onSyntaxSearch} />
        </div>,
        <div className="new-snippet-lang-list-wrapper" key="Syntax list">
          {syntaxes.size ? null : <div className="new-snippet-lang-empty">No results found</div>}
          <Scrollbars>
            <ul className="new-snippet-lang-list" onClick={this.onClickHandler} role="presentation">
              {syntaxes}
            </ul>
          </Scrollbars>
        </div>,
      ]
    );
  }
}

export default connect(state => ({
  syntaxes: state.syntaxes,
}))(Syntaxes);
