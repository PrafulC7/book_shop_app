import React from 'react'
import { Link } from 'react-router-dom'
import useBookContext from '../contexts/BookContext'
const Home = () => {
    const {categories,categoryLoading,categoryError} = useBookContext()
  return (
    <div className='bg-secondary text-light'>
    <div className='container'>
      {categoryLoading&& <p>Loading</p>}
      {/* {categoryError && <p>{categories?.error}</p>} */}
<h1>Home</h1>
<div className="row">
          {categories?.length > 0 ? (
          categories?.map((category) => (
            <div key={category._id} className="col-md-4 py-3">
              <div>
                {/* <Link to={`/bookListing/${category.category}`}> */}
                <Link to={`/books/${category.category}`}>
               <div className="card bg-dark text-white">
  <img src={category.imageUrl} className="card-img" alt="category image"/>
  <div className="card-img-overlay">
    <h5 className="card-title">{category.type}</h5>
    
  </div>
</div>

              </Link>
              </div>
              <h2>{category.category}</h2>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
      <h3>No category match your search/filter criteria.</h3>
    </div>
  )
}
    </div>
    </div>
    </div>
  )
}

export default Home