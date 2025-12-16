import useBookContext from '../contexts/BookContext'
import { Link } from 'react-router-dom'

const Cart = () => {
  const {booksCart,wishlist,cartLoading,cartError, increaseQty,decreaseQty,removeBook,addToWishlist,numberOfBooks,totalAmount, addresses, selectedAddress, setSelectedAddress, handleCheckout, orderPlaced, orders} = useBookContext()
  return (
    <>
    {cartLoading? (<h4 className='text-center mt-5'>Loading...</h4>):(
      <>
      {booksCart.length>0?(
      <>
{!orderPlaced?(
  <>

      <div className='row bg-secondary text-light pt-3'>
     <div className=' col-md-8'>
     <div className='container'>
 <h1 className='text-center '>Cart</h1>
 {booksCart?.map(book=>(<div key={book._id}> <Link to={`/bookDetails/${book.title}`}><img className='w-25 p-4' src={book.imgUrl}/></Link>${book.price} {book.title} ({book.quantity})
   <div>
   <button className='btn btn-primary mx-2 my-2' onClick={() => increaseQty(book)}>+</button>
     <button className='btn btn-primary mx-2 my-2' onClick={() => decreaseQty(book)}>-</button>
     </div>
    <button className='btn btn-danger mx-2 my-2' onClick={() => removeBook(book)}>Remove from Cart</button>
    {
  <button
       className={wishlist.find(item=>item.title==book.title) ? "btn btn-muted mx-2 my-2" : "btn btn-warning mx-2 my-2"}
         onClick={() => addToWishlist(book)}
        //  disabled={isInWishlist}
      >
        {wishlist.find(item=>item.title==book.title) ? "Added to wishlist" : "Add to wishlist"}
       </button>
}

 </div>))}

     </div>
    </div>
     <div className='col-md-4 text-center pb-5 mb-5'>
       

<h1>Checkout</h1>

<h4>Select Address</h4>
      {addresses.map((addr, index) => (
        <label key={index} style={{ display: "block", margin: "8px" }}>
          <input
            type="radio"
            name="address"
            value={addr}
            checked={selectedAddress === addr}
            onChange={(e) => setSelectedAddress(e.target.value)}
          />{" "}
          {addr}
        </label>
      ))}

      <h3 className="mt-6">Order Summary</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {booksCart.map((item) => (
          <li key={item._id}>
            {item.title} — ${item.price}
          </li>
        ))}
      </ul>

      <h4>Total: ${totalAmount}</h4>

      <button
        onClick={handleCheckout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Checkout
      </button>
  

 </div>     
</div>
</>
):(
<div className="text-center mt-10">
          <h2>🛍️ Order Summary</h2>
          <p><strong>Items:</strong> {numberOfBooks}</p>
          <p><strong>Total:</strong> ${orders.at(-1)?.totalAmount}</p>
          <p><strong>Shipping to:</strong> {selectedAddress}</p>
          <p><strong>Name:</strong> {orders.at(-1)?.name}</p>
          <p><strong>Phone:</strong> {orders.at(-1)?.phone}</p>
          <h3 style={{ color: "green", marginTop: "20px" }}>
            ✅ Order Placed Successfully!
          </h3>
          <button className=' btn btn-warning mt-4'><Link to="/" className="nav-link"><h4>Browse again</h4></Link></button>
        </div>
)}
 </>   ):(
     <h1 className='text-center mt-5'>cart is empty</h1> 
    )}
      </>
    )}
    
</>
)
}

export default Cart


