import React from 'react'
import useBookContext from '../contexts/BookContext'
import { Link } from 'react-router-dom'
const Wishlist = () => {
    const {wishlist, wishlistLoading, wishlistError, removeFromWishlist, moveToCart} = useBookContext()
    // console.log(wishlist)
  return (
    <>
    {wishlistLoading?(<h4 className='text-center mt-5'>Loading...</h4>):(
      <>
      {wishlist.length == 0 ? (
        <div>
     <h1 className='text-center mt-5'>Wishlist is empty</h1> 
      </div>):(<div className='bg-secondary text-light'>
        <div className='container'>
<h1>WishList</h1>
{wishlist.map(book=>(<div key={book._id}>
                <Link to={`/bookDetails/${book.title}`}>
<img className='w-25 p-4' src={book.imgUrl}/>
</Link>
{book.title}
   <button className='btn btn-danger mx-2 my-2' onClick={() => removeFromWishlist(book)}>Remove from Wishlist</button>
   <button className='btn btn-primary mx-2 my-2' onClick={()=>moveToCart(book)}>Move to cart</button>
</div>))
}
</div>
</div>
)}
      </>
    )}
  </>

    
  )
}

export default Wishlist
