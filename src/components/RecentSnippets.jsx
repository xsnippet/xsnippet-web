import React from 'react'
import { connect } from 'react-redux'

import RecentSnippetItem from './RecentSnippetItem'
import * as actions from '../actions'

import '../styles/RecentSnippets.styl'

class RecentSnippets extends React.Component {
  constructor(props) {
    super(props)
    this.newerSetOfSnippets = this.newerSetOfSnippets.bind(this)
    this.olderSetOfSnippets = this.olderSetOfSnippets.bind(this)
    this.scrollTop = () => {
      window.scroll({ top: 0, behavior: 'smooth' })
    }
  }

  componentDidMount() {
    const { dispatch, recent, pagination } = this.props
    let marker = null

    if (pagination.get('prev')) {
      marker = recent.get(0) + 1
    }

    dispatch(actions.fetchRecentSnippets(marker))
  }

  newerSetOfSnippets() {
    const { dispatch, pagination } = this.props
    const prev = pagination.get('prev')

    if (prev) {
      const marker = Number(prev.marker)

      dispatch(actions.fetchRecentSnippets(marker))
    }
    this.scrollTop()
  }

  olderSetOfSnippets() {
    const { dispatch, pagination } = this.props
    const marker = Number(pagination.get('next').marker)

    dispatch(actions.fetchRecentSnippets(marker))
    this.scrollTop()
  }

  render() {
    const { snippets, recent, pagination } = this.props
    const older = pagination.get('next')
    const newer = pagination.get('prev')

    return ([
      <ul className="recent-snippet" key="recent-snippet">
        {recent.map(id => <RecentSnippetItem key={id} snippet={snippets.get(id)} />)}
      </ul>,
      <div className="pagination" key="pagination">
        <span
          className={`pagination-item next ${newer ? '' : 'disabled'}`}
          onClick={this.newerSetOfSnippets}
          role="presentation"
        >
          &lsaquo; Newer
        </span>
        <span
          className={`pagination-item prev ${older ? '' : 'disabled'}`}
          onClick={this.olderSetOfSnippets}
          role="presentation"
        >
          Older &rsaquo;
        </span>
      </div>,
    ])
  }
}

export default connect(state => ({
  snippets: state.get('snippets'),
  recent: state.get('recent'),
  pagination: state.get('pagination'),
}))(RecentSnippets)
