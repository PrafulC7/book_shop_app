import React from 'react'
import useBookContext from '../contexts/BookContext'
import { Link } from 'react-router-dom'
const Wishlist = () => {
    const {wishlist, wishlistLoading, wishlistError, removeFromWishlist, moveToCart, styles} = useBookContext()
    // console.log(wishlist)
  return (
    <>
    {wishlistLoading?(<h4 className='text-center mt-5'>Loading...</h4>):(
      <>
      {wishlist.length == 0 ? (
        <div>
     <h1 className='text-center mt-5'>Wishlist is empty</h1> 
      </div>):(<>
        <div className='container pb-5 pt-3'>
<h1 className='text-center'>WishList</h1>
<div className='row'>
{wishlist.map(book=>(<div key={book._id} className='col-sm-12 col-md-6 col-lg-4 my-2 d-flex'>
  <div>
<div className='row'>
<div className='col-sm-12 d-flex align-items-center justify-content-center'>
                 <Link to={`/bookDetails/${book.title}`}><img style={styles.image} src={book.imgUrl}/></Link>
</div>
<div className='col-sm-12 d-flex align-items-center justify-content-center'>
{book.title}
</div>
<div className='col-sm-12 d-flex align-items-center justify-content-center'>
   <button className='btn btn-danger mx-2 my-2' onClick={() => removeFromWishlist(book)}>Remove from Wishlist</button>
   <button className='btn btn-primary mx-2 my-2' onClick={()=>moveToCart(book)}>Move to cart</button>
   </div>
   </div>
</div>
</div>))
}

</div>
</div>
</>
)}
      </>
    )}
  </>

    
  )
}

export default Wishlist
