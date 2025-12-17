import React, { useState, useEffect } from 'react'
import useBookContext from '../contexts/BookContext'
import useFetch from '../useFetch';
import { useParams, useLocation, Link } from 'react-router-dom'
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// let books = []
const BookListing = () => {
     const {books,booksLoading,booksError,wishlist,addBooks, addToWishlist, styles, FaHeart, FaRegHeart, toggleWishlist} = useBookContext()

const bookCategory = useParams()
    const query = useQuery();
  const searchTerm = query.get("search")?.toLowerCase() || "";
  const searchedBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm)
  );
       const booksMatched = books.filter(book=>book.category == bookCategory.category)
    const [filteredBooks, setFilteredBooks] = useState(booksMatched);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [rating, setRating] = useState(0);
    const [sortOrder, setSortOrder] = useState("");

    const clearFilters = () => {
  setSelectedCategories([]);
  setRating(0);
  setSortOrder("");
};
    const handleCategoryChange = (category) => {
  setSelectedCategories((prev) =>
    prev.includes(category)
      ? prev.filter((c) => c !== category) // remove if already selected
      : [...prev, category] // add if not selected
  );
};

// rating slider
const handleRatingChange = (e) => {
  setRating(Number(e.target.value));
};

// sort radio
const handleSortChange = (e) => {
  setSortOrder(e.target.value);
};

useEffect(() => {
  let updated = [...booksMatched];
if(searchTerm != ""){
  updated = [...searchedBooks]
}

  // filter by categories
  if (selectedCategories.length > 0) {
    updated = books.filter((book) =>
      selectedCategories.includes(book.category)
    );
  }

  // filter by rating
  updated = updated.filter((book) => book.rating >= rating);

  // sort by price
  if (sortOrder == "lowToHigh") {
    updated.sort((a, b) => a.price - b.price);
  } else if (sortOrder == "highToLow") {
    updated.sort((a, b) => b.price - a.price);
  }
  setFilteredBooks(updated);
  
}, [searchTerm, books, selectedCategories, rating, sortOrder]);
  
  return (
    <div>
      {booksLoading ? (<h5 className='text-center mt-5'>Loading...</h5>):(
        <>
        <div className='row'>
          <div className="d-sm-none p-2">
    <button
      className="btn btn-dark w-100"
      data-bs-toggle="collapse"
      data-bs-target="#filterPanel"
    >
      Filters
    </button>
  </div>
      <div id="filterPanel" className='col-sm-3 col-lg-2 px-4 bg-black text-light collapse d-sm-block'>
          <h4 className='pt-3'>Filter section</h4>
<h4>Categories</h4>
  {["Fiction", "Self-Help", "Autobiography", "Mystery", "Fantasy", "Horror", "Romance"].map((category) => (
    <div key={category}>
    <label>
      <input
        type="checkbox"
        checked={selectedCategories.includes(category)}
        onChange={() => handleCategoryChange(category)}
      />
      {category}
    </label>
    <br/>
   </div>
  )
  )}
<br/>
  {/* Rating slider */}
  <h4>Rating</h4>
  <input
    type="range"
    min="0"
    max="5"
    value={rating}
    onChange={handleRatingChange}
  />
  {rating > 0 &&
  <span> {rating} & UP ★</span>
  }
<br/><br/>
  {/* Sort radio */}
  <h4>Sort by Price</h4>
  <label>
    <input
      type="radio"
      value="lowToHigh"
      checked={sortOrder == "lowToHigh"}
      onChange={handleSortChange}
    />
    Low to High
  </label>
  <br/>
  <label>
    <input
      type="radio"
      value="highToLow"
      checked={sortOrder == "highToLow"}
      onChange={handleSortChange}
    />
    High to Low
  </label> 
    <br/>
    <br/>
 
 <button onClick={clearFilters} className='mb-sm-2 mb-md-5'>Clear Filters</button>
          {/* --------------------------------------------- */}
        </div>

        <div className='col-sm-9 col-lg-10 bg-light mb-sm-4 mb-md-5'>
      <div className='container'>
      <div className='row'>
{filteredBooks?.length == 0 ? (
        <div>
        <h3 className='text-center mt-5'>No Books Found.</h3>
      </div>) : (<>
{filteredBooks.map((book) => (
          <div key={book._id} className="col-sm-5 col-md-6 col-lg-3 py-3 d-flex">
                  {/* <div style={styles.grid}> */}

          <div style={styles.card}>
<span
              onClick={() => toggleWishlist(book)}
              style={{
                ...styles.heart,
                color: wishlist.find(item=>item.title==book.title) ? "red" : "#aaa",
              }}
            >
              {wishlist.find(item=>item.title==book.title) ? <FaHeart size={38} /> : <FaRegHeart size={32} />}
            </span>
<Link to={`/bookDetails/${book.title}`}><img src={book.imgUrl} alt={book.title} style={styles.image} /></Link>
<h4>{book.title}</h4>
<p>⭐ {book.rating}</p>
<p style={styles.price}>$ {book.price}</p>
<button style={styles.btn} onClick={() => addBooks(book)}>
              Add to Cart
            </button>

          </div>
          </div>

        ))
}
         </>)}
    </div>
    </div>
    </div>
    </div>
        </>
      )}
  
    </div>
      )
  }

export default BookListing


