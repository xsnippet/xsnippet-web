import React, { Fragment, useState } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { loadable } from 'jotai/utils'

import { recentSnippetsQuery, recentSnippetsState } from '../store'
import Spinner from './common/Spinner'
import RecentSnippetItem from './RecentSnippetItem'
import { scrollTop } from '../misc/snippet'

import '../styles/RecentSnippets.styl'

const RecentSnippets = () => {
  const [marker, setMarker] = useState(null)
  const setSnippets = useSetAtom(recentSnippetsState)
  const values = useAtomValue(loadable(recentSnippetsQuery(marker)))

  if (values.state !== 'hasData') {
    return <Spinner />
  }

  const { pagination, recentIds, snippets } = values.data

  setSnippets(snippets)

  const getSetOfSnippets = (direction) => {
    setMarker(pagination[direction].marker)
    scrollTop()
  }

  return (
    <Fragment>
      <ul className="recent-snippet">
        {recentIds.map(id => <RecentSnippetItem key={id} snippet={snippets[id]} />)}
      </ul>
      <div className="pagination">
        <span
          className={`pagination-item next ${pagination.prev ? '' : 'disabled'}`}
          onClick={() => getSetOfSnippets('prev')}
          role="presentation"
        >
          &lsaquo; Newer
        </span>
        <span
          className={`pagination-item prev ${pagination.next ? '' : 'disabled'}`}
          onClick={() => getSetOfSnippets('next')}
          role="presentation"
        >
          Older &rsaquo;
        </span>
      </div>
    </Fragment>
  )
}

export default RecentSnippets
