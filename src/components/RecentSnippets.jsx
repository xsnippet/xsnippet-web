import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import RecentSnippetItem from './RecentSnippetItem'
import { fetchRecentSnippets } from '../actions'
import { scrollTop } from '../misc/dom'

import '../styles/RecentSnippets.styl'

class RecentSnippets extends React.Component {
  componentDidMount() {
    const { dispatch, recent, pagination } = this.props
    let marker = null

    if (pagination.get('prev')) {
      marker = recent.get(0) + 1
    }

    dispatch(fetchRecentSnippets(marker))
  }

  newerSetOfSnippets = () => {
    const { dispatch, pagination } = this.props
    const prev = pagination.get('prev')

    if (prev) {
      const marker = Number(prev.marker)

      dispatch(fetchRecentSnippets(marker))
    }

    scrollTop()
  }

  olderSetOfSnippets = () => {
    const { dispatch, pagination } = this.props
    const marker = Number(pagination.get('next').marker)

    dispatch(fetchRecentSnippets(marker))
    scrollTop()
  }

  renderRecentSnippets() {
    const { snippets, recent } = this.props

    return (
      <ul className="recent-snippet" key="recent-snippet">
        {recent.map(id => <RecentSnippetItem key={id} snippet={snippets.get(id)} />)}
      </ul>
    )
  }

  render() {
    const { pagination } = this.props
    const older = pagination.get('next')
    const newer = pagination.get('prev')

    return (
      <Fragment>
        {this.renderRecentSnippets()}
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
        </div>
      </Fragment>
    )
  }
}

export default connect(state => ({
  snippets: state.get('snippets'),
  recent: state.get('recent'),
  pagination: state.get('pagination'),
}))(RecentSnippets)
