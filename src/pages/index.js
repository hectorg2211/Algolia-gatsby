import * as React from 'react'
import {
  RefinementList,
  InfiniteHits,
  Highlight,
  InstantSearch,
} from 'react-instantsearch-hooks-web'
import algoliasearch from 'algoliasearch/lite'
import { Link } from 'gatsby'

const searchClient = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76')

const IndexPage = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName='instant_search' routing={true}>
      <RefinementList attribute='brand' hitComponent={ProductHit} />
      <InfiniteHits hitComponent={ProductHit} />
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
