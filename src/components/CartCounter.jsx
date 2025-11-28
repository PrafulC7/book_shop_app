import React from 'react'
import useBookContext from '../contexts/BookContext'
const CartCounter = () => {
    const {cartCounter} = useBookContext()
  return (
    <div>{cartCounter>0 && cartCounter}</div>
  )
}

export default CartCounter