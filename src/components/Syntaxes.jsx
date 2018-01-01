import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';

import Input from './common/Input';
import * as actions from '../actions';

class Syntaxes extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetchSyntaxes);
  }

  render() {
    const { syntaxes } = this.props;

    return (
      [
        <div className="new-snippet-lang-header">
          <Input placeholder="Type to search..." />
        </div>,
        <div className="new-snippet-lang-list-wrapper">
          <Scrollbars>
            <ul className="new-snippet-lang-list">
              {syntaxes.map(syntax => <li className="new-snippet-lang-item">{syntax}</li>)}
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
