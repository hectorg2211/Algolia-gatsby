import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react'
import {
  RefinementList,
  InfiniteHits,
  Highlight,
  InstantSearch,
  useInstantSearch,
} from 'react-instantsearch-hooks-web'
import algoliasearch from 'algoliasearch/lite'
import { Link } from 'gatsby'

const searchClient = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76')

const IndexPage = ({ location }) => {
  const [div, setDiv] = useState(null)

  const ref = useCallback((node) => {
    if (node !== null) {
      setDiv(node)
    }
  }, [])

  return (
    <InstantSearch searchClient={searchClient} indexName='instant_search' routing={true}>
      <RefinementList attribute='brand' hitComponent={ProductHit} />
      <RestoreScrollPosition div={div} />
      <InfiniteHits hitComponent={ProductHit} />
      <div style={{ margin: 'auto', width: '500px', height: '500px', background: 'red' }}></div>
      <div style={{ margin: 'auto', width: '500px', height: '500px', background: 'blue' }}></div>
      <div
        ref={ref}
        style={{ margin: 'auto', width: '500px', height: '500px', background: 'green' }}
        id='green'></div>
    </InstantSearch>
  )
}

export default IndexPage

function ProductHit({ hit }) {
  const onProductClick = () => {
    sessionStorage.setItem('scrollPosition', window.pageYOffset)
  }

  return (
    <Link to={`/product/${hit.objectID}`} onClick={onProductClick}>
      <Highlight attribute='name' hit={hit} />
    </Link>
  )
}

function RestoreScrollPosition({ div }) {
  const { results } = useInstantSearch()
  const [wasNavigatedBackwards, setWasNavigatedBackwards] = useState(false)

  useEffect(() => {
    const backwardsNavigation = window.addEventListener('popstate', () => {
      console.log('Event listener called')
      setWasNavigatedBackwards(true)
    })

    return () => {
      window.removeEventListener('popstate', backwardsNavigation)
    }
  }, [])

  console.log(wasNavigatedBackwards)

  useLayoutEffect(() => {
    // Detect if the current page url contains a search query
    const searchQuery = window.location.search
    if (searchQuery && Boolean(div))
      window?.scrollTo({
        top: div.getBoundingClientRect().top,
        behavior: 'smooth',
      })
  }, [window.location, results.nbHits, div])

  return <>{wasNavigatedBackwards && <h1 style={{ background: 'red' }}>Test</h1>}</>
}

// function RestoreScrollPosition({ div }) {
//   const [wasNavigatedBackwards, setWasNavigatedBackwards] = useState(false)
//   const { results } = useInstantSearch()

//   useLayoutEffect(() => {
//     // Detect if the current page url contains a search query
//     const searchQuery = window.location.search
//     window.addEventListener('popstate', () => {
//       setWasNavigatedBackwards(true)
//     })

//     if (searchQuery && Boolean(div)) {
//       window?.scrollTo({
//         top: div?.getBoundingClientRect().top,
//         behavior: 'smooth',
//       })
//     }

//     console.log(div?.getBoundingClientRect().top)
//   }, [window.location, results.nbHits, div])

//   return null
// }
