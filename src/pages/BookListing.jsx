import React, { useState, useEffect } from 'react'
import useBookContext from '../contexts/BookContext'
import useFetch from '../useFetch';
import { useParams, useLocation, Link } from 'react-router-dom'
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

let books = []
const BookListing = () => {
     const {books,booksLoading,booksError,wishlist,addBooks, addToWishlist} = useBookContext()

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
      {booksLoading&& <p>Loading</p>}
      {booksError && <p>{booksError}</p>}
      {/* <input className='form-control py-4' onChange={(e)=>setSearch(e.target.value.toLowerCase())} placeholder='Search books'/> */}
    <div className='row'>
      <div className='col-md-2 px-4 bg-black text-light'>
          <h1>Filter section</h1>
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

  
 <button onClick={clearFilters}>Clear Filters</button>
          {/* --------------------------------------------- */}
        </div>

        <div className='col-md-10 bg-secondary text-light'>
      <div className='row'>
      {filteredBooks?.length == 0 ? (
        <div>
        <h3>No books found in this category.</h3>
      </div>) : (
        filteredBooks.map((book) => (
          <div key={book._id} className="col-md-4 py-3">
              <Link to={`/bookDetails/${book.title}`}>
            <div className="card bg-dark text-white">
              <img src={book.imgUrl} className='card-img' alt='book image'/>
            <div className='card-img-overlay'>
<h5 className='card-title'>{book.title}</h5>

            </div>
</div>
            </Link>
<div className='text-center'>
<h6>{book.title}</h6>
<h5>${book.price}</h5>
<h5>Rating: {book.rating}</h5>
<button className='btn btn-primary mx-2 my-2' onClick={()=>addBooks(book)}>Add to cart</button>
{
  <button
       className={wishlist.find(item=>item.title==book.title) ? "btn btn-muted mx-2 my-2" : "btn btn-warning mx-2 my-2"}
         onClick={() => addToWishlist(book)}
        //  disabled={isInWishlist}
      >
        {wishlist.find(item=>item.title==book.title) ? "Added to wishlist" : "Add to wishlist"}
       </button>
}



</div>

          </div>
        ))
      )}
      </div>
    {/* </div>     */}
    </div>
    </div>
    </div>
  )
  
  

}

export default BookListing