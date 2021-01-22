import React, { Fragment, useState } from 'react'
import { useSetRecoilState, useRecoilValueLoadable } from 'recoil'

import { recentSnippetsQuery, recentSnippetsState } from '../store'
import Spinner from './common/Spinner'
import RecentSnippetItem from './RecentSnippetItem'
import { scrollTop } from '../misc/snippet'

import '../styles/RecentSnippets.styl'

const RecentSnippets = () => {
  const [marker, setMarker] = useState(null)
  const setSnippets = useSetRecoilState(recentSnippetsState)
  const values = useRecoilValueLoadable(recentSnippetsQuery(marker))

  if (values.state !== 'hasValue') {
    return <Spinner />
  }

  const { pagination, recentIds, snippets } = values.contents

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
