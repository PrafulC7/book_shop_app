import React from 'react'
import { useParams } from 'react-router-dom'
import useBookContext from '../contexts/BookContext'

const BookDetails = () => {
    const bookTitle = useParams()
    const {books, wishlist, addBooks, addToWishlist} = useBookContext()
    const bookDetail = books.find(book=>book.title == bookTitle.bookTitle)
    
  return (
    <div>
     <div className='row'>
        <div className='col-md-4 bg-black'>
              <div className="card bg-dark text-white">
              <img src={bookDetail.imgUrl} className='card-img' alt='book image'/>

</div>
<div className='text-center'>
<button className='btn btn-primary mx-2 my-2' onClick={()=>addBooks(bookDetail)}>Add to cart</button>

{
  <button
       className={wishlist.find(item=>item.title==bookDetail.title) ? "btn btn-muted mx-2 my-2" : "btn btn-warning mx-2 my-2"}
         onClick={() => addToWishlist(bookDetail)}
        //  disabled={isInWishlist}
      >
        {wishlist.find(item=>item.title==bookDetail.title) ? "Added to wishlist" : "Add to wishlist"}
       </button>
}
{/* <button className='btn btn-warning mx-2 my-2' onClick={()=>addToWishlist(bookDetail)}>Add to wishlist</button> */}
        </div>
        </div>
        <div className='col-md-8 bg-secondary p-4'>
                        <h6>{bookDetail.title}</h6>
            <h4>Rating: {bookDetail.rating}</h4>
<h2>Price: ${bookDetail.price}</h2><hr/>
<h4>Description:</h4>
<p>{bookDetail.description}</p>

            
        </div>
    </div>

        </div>
  )
}

export default BookDetails