import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import bemi from 'bemi'

import RecentSnippetItem from './RecentSnippetItem'

import { fetchRecentSnippets } from '../actions'

import '../styles/RecentSnippets.styl'

const scrollTop = () => {
  window.scroll({ top: 0, behavior: 'smooth' })
}

const rsi = bemi('recent-snippet')
const pag = bemi('pagination')

const RecentSnippets = ({ fetchRecentSnippets, pagination, snippets, recent }) => {
  const older = pagination.get('next')
  const newer = pagination.get('prev')

  useEffect(() => {
    let marker = null

    if (pagination.get('prev')) {
      marker = recent.get(0) + 1
    }

    fetchRecentSnippets(marker)
  }, [])

  const newerSetOfSnippets = () => {
    const prev = pagination.get('prev')

    if (prev) {
      const marker = Number(prev.marker)

      fetchRecentSnippets(marker)
    }

    scrollTop()
  }

  const olderSetOfSnippets = () => {
    const marker = Number(pagination.get('next').marker)

    fetchRecentSnippets(marker)

    scrollTop()
  }

  const renderRecentSnippets = () => (
    <ul className={rsi.b()}>
      {recent.map(id => <RecentSnippetItem key={id} snippet={snippets.get(id)} />)}
    </ul>
  )

  return (
    <Fragment>
      {renderRecentSnippets()}
      <div className={pag.b()}>
        <span
          className={pag.e('item', { next: true, disabled: !newer })}
          onClick={newerSetOfSnippets}
          role="presentation"
        >
          &lsaquo; Newer
        </span>
        <span
          className={pag.e('item', { prev: true, disabled: !older })}
          onClick={olderSetOfSnippets}
          role="presentation"
        >
          Older &rsaquo;
        </span>
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  snippets: state.get('snippets'),
  recent: state.get('recent'),
  pagination: state.get('pagination'),
})

const mapDispatchToProps = dispatch => ({
  fetchRecentSnippets: marker => dispatch(fetchRecentSnippets(marker)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentSnippets)
