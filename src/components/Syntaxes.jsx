import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';

import Input from './common/Input';
import * as actions from '../actions';

class Syntaxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: -1 };
    this.onClickHandler = this.onClickHandler.bind(this);
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

  render() {
    const { syntaxes } = this.props;

    return (
      [
        <div className="new-snippet-lang-header" key="Syntax input">
          <Input placeholder="Type to search..." />
        </div>,
        <div className="new-snippet-lang-list-wrapper" key="Syntax list">
          <Scrollbars>
            <ul className="new-snippet-lang-list" onClick={this.onClickHandler} role="presentation">
              {syntaxes.map((syntax, index) => {
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
                })}
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
