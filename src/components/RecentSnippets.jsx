import React from 'react';
import { connect } from 'react-redux';

import Title from './common/Title';
import RecentSnippetItem from './RecentSnippetItem';
import * as actions from '../actions';

import '../styles/RecentSnippets.styl';

class RecentSnippets extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetchRecentSnippets);
  }

  render() {
    const { snippets, recent } = this.props;

    return ([
      <Title title="Recent snippets" additionalClass="recent-title" key="title-recent" />,
      <ul className="recent-snippet" key="recent-snippet">
        {recent.map(id => <RecentSnippetItem key={id} snippet={snippets.get(id)} />)}
      </ul>,
    ]);
  }
}

export default connect(state => ({
  snippets: state.snippets,
  recent: state.recent,
}))(RecentSnippets);
