import React, { useState } from 'react'
import useBookContext from '../contexts/BookContext'
import { Link } from 'react-router-dom'

const Checkout = () => {
      const {booksCart, finalAmount, emptyCart} = useBookContext()
      let productInfo = booksCart.map(product=>({title:product.title, quantity:product.quantity, price:product.price}))
    //   let productName = booksCart.map(product=>product.title)
    //   let productQuantity = booksCart.map(product=>product.quantity)
    //   let productPrice = booksCart.map(product=>product.price)
let message = "Your order has been placed"
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const[orderMessage, setOrderMessage] = useState(false)
    const submitHandler = (e) => {
        e.preventDefault()
        let OrderData = {
            name,
            phone,
            address,
            productInfo,
            finalAmount
        }
        if(booksCart.length>0){
console.log(OrderData)
// console.log("booksCart", booksCart)
        setName("")
        setPhone("")
        setAddress("")
        setOrderMessage(true)
        emptyCart()
        }
        
    }
  return (
    <>
    <div className='container text-center mt-5'>
    <div>Checkout</div>
    {booksCart.length>0&&
    <h1>${finalAmount}</h1>
    }
    <form onSubmit={submitHandler}>
    <input className='form-control' type='text' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} required/><br/><br/>
    <input className='form-control' type='number' placeholder='Phone' value={phone} onChange={(e)=>setPhone(e.target.value)} required/><br/><br/>
    <input className='form-control' type='text' placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)} required/><br/><br/>
    {booksCart.length>0&&
    <button type='submit'>Checkout</button>
    }
    </form>
   
    {orderMessage
   &&<div>
    <p className='mt-3'>{message}</p>
   <Link to='/' className='btn btn-primary'>Shop Again</Link>
   </div>}
    </div>
    </>
  )
}

export default Checkout