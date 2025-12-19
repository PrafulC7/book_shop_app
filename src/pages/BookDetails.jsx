import React from 'react'
import { useParams } from 'react-router-dom'
import useBookContext from '../contexts/BookContext'

const BookDetails = () => {
    const bookTitle = useParams()
    const {books, wishlist, addBooks, addToWishlist, styles, FaHeart, FaRegHeart, toggleWishlist} = useBookContext()
    const bookDetail = books.find(book=>book.title == bookTitle.bookTitle)
    
  return (
    // <div className='bg-light'>
      // <div style={styles.grid}>
        // <div className='container bg-success h-100'>
          <div className='row bg-white d-flex justify-content-center'>
        <div className='col-sm-5 col-md-6 col-lg-3 py-3 text-center'>
              <div style={styles.card}>
                <span
              onClick={() => toggleWishlist(bookDetail)}
              style={{
                ...styles.heart,
                color: wishlist.find(item=>item.title==bookDetail.title) ? "red" : "#aaa",
              }}
            >
              {wishlist.find(item=>item.title==bookDetail.title) ? <FaHeart size={38} /> : <FaRegHeart size={32} />}
            </span>
              <img src={bookDetail.imgUrl} alt={bookDetail.title} style={styles.image} />
              {/* <div className='col-md-8 bg-light py-4'> */}
                        <h4>{bookDetail.title}</h4>
            <p><strong>Rating:</strong> {bookDetail.rating}</p>
<p><strong>Price:</strong> ${bookDetail.price}</p><hr/>
<strong>Description:</strong>
<p>{bookDetail.description}</p>
<button style={styles.btn} onClick={() => addBooks(bookDetail)}>
              Add to Cart
            </button>
            
        </div>
        </div>
         </div>
        // </div>
    // </div>
    // </div>

  )
}

export default BookDetails
// d-flex min-vh-100