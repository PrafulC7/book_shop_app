import React from 'react'
import { useParams } from 'react-router-dom'
import useBookContext from '../contexts/BookContext'

const BookDetails = () => {
    const bookTitle = useParams()
    const {books, wishlist, addBooks, addToWishlist, styles, FaHeart, FaRegHeart, toggleWishlist} = useBookContext()
    const bookDetail = books.find(book=>book.title == bookTitle.bookTitle)
    
  return (
    <div>
     <div className='row'>
        <div className='col-md-4'>
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
              <button style={styles.btn} onClick={() => addBooks(bookDetail)}>
              Add to Cart
            </button>

</div>
        </div>
        <div className='col-md-8 bg-light p-4'>
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