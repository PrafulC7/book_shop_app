import React from 'react'
import { Link } from 'react-router-dom'
import useBookContext from '../contexts/BookContext'
const Home = () => {
    const {categories,categoryLoading,categoryError, styles} = useBookContext()
  return (
    <div className='container'>
      {categoryLoading&&  <h5 className='text-center mt-5'>Loading...</h5>}
      {categoryError && <p>{categories?.error}</p>}
<div className="row mb-5">
          {categories?.length > 0 ? (
           <>
                <h1>Home</h1>
          {categories?.map((category) => (
            <div key={category._id} className="col-md-4 py-3">
              <div style={styles.card}>
                {/* <Link to={`/bookListing/${category.category}`}> */}
                <Link to={`/books/${category.category}`}>
               <div>
  <img src={category.imageUrl}  style={styles.image} alt="category image"/>
  <div>
    <h5 className="card-title">{category.type}</h5>
    
  </div>
</div>

              </Link>
              </div>
              <h2>{category.category}</h2>
            </div>
          ))
        }
        </> ) : (
          <div className="col-12 text-center py-5">
      {/* <h3>No category match your search/filter criteria.</h3> */}
    </div>
  )
}
    </div>
    </div>
  )
}

export default Home