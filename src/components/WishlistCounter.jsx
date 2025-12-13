import React from 'react'
import useBookContext from '../contexts/BookContext'
const WishlistCounter = () => {
    const {wishlist} = useBookContext()
    // console.log(wishlist.length)
  return (
    <div>{wishlist.length>0 && wishlist.length}</div>
  )
}

export default WishlistCounter;
// WishlistCounter>0 &&