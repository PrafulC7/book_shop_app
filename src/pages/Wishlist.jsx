import React from 'react'
import useBookContext from '../contexts/BookContext'
import { Link } from 'react-router-dom'
const Wishlist = () => {
    const {wishlist,wishlistLoading,wishlistError, removeFromWishlist, moveToCart} = useBookContext()
    // console.log(wishlist)
  return (
    <div className='bg-secondary text-light'>
    <div className='container'>
      {wishlistLoading&& <p>Loading</p>}
      {/* {wishlistError && <p>{wishlist?.error}</p>} */}
<h1>WishList</h1>
{wishlist.length == 0 ? (
        <div>
        <h3>Wish List is empty.</h3>
      </div>):(
wishlist.map(book=>(<div key={book._id}>
                <Link to={`/bookDetails/${book.title}`}>
<img className='w-25 p-4' src={book.imgUrl}/>
</Link>
{book.title}
   <button className='btn btn-danger mx-2 my-2' onClick={() => removeFromWishlist(book)}>Remove from Wishlist</button>
   <button className='btn btn-primary mx-2 my-2' onClick={()=>moveToCart(book)}>Move to cart</button>
</div>)))}

    </div>
    </div>
  )
}

export default Wishlist
