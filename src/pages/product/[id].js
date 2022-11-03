import React, { useEffect, useState } from 'react'

const Product = () => {
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

  return <div>Product</div>
}

export default Product
