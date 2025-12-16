import React, { createContext, useContext, useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import useFetch from "../useFetch";
// import { text } from "express";
const BookContext = createContext();
const useBookContext = () => useContext(BookContext);
export default useBookContext;
const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  // title: {
  // fontSize: "18px",
  // fontWeight: "600",
  // display: "-webkit-box",
  // WebkitLineClamp: 2,
  // WebkitBoxOrient: "vertical",
  // overflow: "hidden",
  // textOverflow: "ellipsis",
  // minHeight: "48px", // keeps height consistent
// },
  card: {
    position: "relative",
    // border: "1px solid #ddd",
    // padding: "5px",
    // borderRadius: "10px",
    textAlign: "center",
    background: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "300px",
    // objectFit: "cover",
    // borderRadius: "8px",
    // marginBottom: "10px",
  },
  price: {
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "10px",
  },
  btn: {
    padding: "10px 12px",
    background: "black",
    color: "white",
    border: "none",
    // borderRadius: "8px",
    cursor: "pointer",
        width: "100%",

  },
  heart: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
  },
};


export const BookProvider = ({ children }) => {
// const {data: categoriesData, loading:categoryLoading, error:categoryError } = useFetch("http://localhost:3000/categories")
// const { data: booksData, loading: booksLoading, error: booksError } = useFetch("http://localhost:3000/books");
// const { data: wishlistData, loading: wishlistLoading, error: wishlistError } = useFetch("http://localhost:3000/wishlist");
// const { data: cartData, loading: cartLoading, error: cartError } = useFetch("http://localhost:3000/cart");
// const { data: orderData, loading: orderLoading, error: orderError } = useFetch("http://localhost:3000/orders");

  const {data: categoriesData, loading:categoryLoading, error:categoryError } = useFetch("https://backend-fakebooks.vercel.app/categories")
const { data: booksData, loading: booksLoading, error: booksError } = useFetch("https://backend-fakebooks.vercel.app/books");
const { data: wishlistData, loading: wishlistLoading, error: wishlistError } = useFetch("https://backend-fakebooks.vercel.app/wishlist");
const { data: cartData, loading: cartLoading, error: cartError } = useFetch("https://backend-fakebooks.vercel.app/cart");
const { data: orderData, loading: orderLoading, error: orderError } = useFetch("https://backend-fakebooks.vercel.app/orders");
 const [categories, setCategories] = useState([]);
 const [books, setBooks] = useState([]);
  const [booksCart, setBooksCart] = useState([])
  const [wishlist, setWishlist] = useState([]);
  const [cartCounter, setCartCounter] = useState(0)
  const [wishlistCounter, setWishlistCounter] = useState(0)
  const [selectedAddress, setSelectedAddress] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  //userProfile
  const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("john@gmail.com");
    const [phone, setPhone] = useState("007-007");
    const [addresses, setAddresses] = useState(["villa 7, john street, johnpur, UP", "Nagpur"]);
const numberOfBooks = booksCart.reduce((acc,item)=>acc + item.quantity,0)
  const totalAmount = booksCart.reduce((acc,item)=>acc + item.price*item.quantity,0)

  useEffect(() => {
  if (categoriesData) {
    setCategories(categoriesData);
  }
}, [categoriesData]);

  useEffect(() => {
  if (booksData) {
    setBooks(booksData);
  }
}, [booksData]);

  useEffect(() => {
  if (wishlistData) {
    setWishlist(wishlistData);
  }
}, [wishlistData]);

  useEffect(() => {
  if (cartData) {
    setBooksCart(cartData);}
}, [cartData]);

useEffect(() => {
  if (orderData) {
    setOrders(orderData)
}
}, [orderData]);

useEffect(() => {
  setCartCounter(booksCart.reduce((sum, item) => sum + item.quantity, 0));
}, [booksCart]);

useEffect(() => {
  setWishlistCounter(wishlist.length);
}, [wishlist]);



const handleCheckout = async () => {
  if(selectedAddress == ""){
alert("select address first")
  }else{
try {
    const filteredItems = booksCart.map(item => ({
    title: item.title,
    description: item.description,
    imgUrl: item.imgUrl,
    price: item.price,
    rating: item.rating,
    quantity: item.quantity,
    category: item.category
  }));
     const res = await fetch("https://backend-fakebooks.vercel.app/orders/place", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: filteredItems,  // 📌 send full cart array to backend
        name,
       totalAmount,
      email,
       phone,
       address:selectedAddress,
       })
     });

     const data = await res.json();
     setCartCounter(0)
     if(data){
setOrders(data)

setOrderPlaced(true)

  }    
   } catch (error) {
     console.error("Checkout error:", error);
   }
  }
   
     
};


// Add to cart

  const addBooks = async (product) => {
  let updatedCart;
  const existingBook = booksCart.find((item) => item.title === product.title);

  if (existingBook) {
    // Increase quantity in backend
    const res = await fetch(`https://backend-fakebooks.vercel.app/cart/increase/${existingBook._id}`, {
      method: "PUT"
    });
    updatedCart = await res.json();
    toast.success(`Increased quantity of ${product.title}`);

  } else {
    // Add new book to backend
    const res = await fetch("https://backend-fakebooks.vercel.app/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: product.title,
        rating: product.rating,
        price: product.price,
        imgUrl: product.imgUrl,
        description: product.description,
        category: product.category,
        quantity: 1
      })
    });

    updatedCart = await res.json();
    setBooksCart(updatedCart)
    toast.success(`${product.title} added to CART`);
  }

}

const moveToCart = async (product) => {
  let updatedCart;
  const existingBook = booksCart.find((item) => item.title === product.title);

  if (existingBook) {
    // Increase quantity in backend
    const res = await fetch(`https://backend-fakebooks.vercel.app/cart/increase/${existingBook._id}`, {
      method: "PUT"
    });
    updatedCart = await res.json();
  } else {
    // Add new book to backend
    const res = await fetch("https://backend-fakebooks.vercel.app/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: product.title,
        rating: product.rating,
        price: product.price,
        imgUrl: product.imgUrl,
        description: product.description,
        category: product.category,
        quantity: 1
      })
    });

    updatedCart = await res.json();
  }
removeFromWishlist(product)
// Set state AFTER async finished
 setBooksCart(updatedCart);
toast.success(`${product.title} added to CART`);

};


const increaseQty = async (product) => {
  // setBooksCart((prev)=>{
      let updatedCart;
const existingBook = booksCart.find((item)=>item.title == product.title)
      if (existingBook){
         const res = await fetch(`https://backend-fakebooks.vercel.app/cart/increase/${existingBook._id}`, {
      method: "PUT"
    });
        updatedCart = await res.json();
      }
   setBooksCart(updatedCart);
toast.success(`Increased quantity of ${product.title}`);
};
// Decrease quantity (but not below 1)
const decreaseQty = async (product) => {
 const existingBook = booksCart.find((item)=>item.title == product.title)
      let updatedCart;
      if (existingBook.quantity>1){
const res = await fetch(`https://backend-fakebooks.vercel.app/cart/decrease/${existingBook._id}`, {
      method: "PUT"
    });
  updatedCart = await res.json();
setBooksCart(updatedCart);
}else{
        removeBook(product)
       }
  toast.info(`Decreased quantity of ${product.title}`);

};

// Remove book completely
const removeBook = async (product) => {
  const bookToRemove = booksCart.find((item)=>item.title == product.title)
try {
    const res = await fetch(`https://backend-fakebooks.vercel.app/cart/delete/${bookToRemove._id}`, {
      method: "DELETE",
    });
const data = await res.json(); // updated cart after delete
    setBooksCart(data);
} catch (error) {
    console.error("Delete failed", error);
  }
toast.info(`${product.title} removed from CART`);
};



const addToWishlist = async (product) =>{
  let updatedWishlist;
const existingBook = wishlist.find(item=>item.title === product.title);
  if(!existingBook){
const res = await fetch("https://backend-fakebooks.vercel.app/wishlist/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: product.title,
        rating: product.rating,
        price: product.price,
        imgUrl: product.imgUrl,
        description: product.description,
        category: product.category,
      })
    });
updatedWishlist = await res.json();
  setWishlist(updatedWishlist)
toast.success(`${product.title} added to WISHLIST`);
  }else{
    toast.info(`${product.title} already exists in WISHLIST`);
  }
}

const removeFromWishlist = async (product) => {
  const bookToRemove = wishlist.find((item)=>item.title == product.title)
try {
    const res = await fetch(`https://backend-fakebooks.vercel.app/wishlist/delete/${bookToRemove._id}`, {
      method: "DELETE",
    });
const data = await res.json(); // updated cart after delete
    setWishlist(data);
} catch (error) {
    console.error("Delete failed", error);
  }
  toast.info(`${product.title} removed from WISHLIST`)
};

const toggleWishlist = (product) => {
    const existingBook = wishlist.find(item=>item.title === product.title);
  if(!existingBook){
addToWishlist(product)
  }else{
    removeFromWishlist(product)
  }
}
const emptyCart = () => {
  setBooksCart([]);
  setCartCounter(0)
}
// console.log(wishlistCounter)
  return (
    <BookContext.Provider value={{ categories, books, addBooks, moveToCart, booksCart, wishlistCounter, cartCounter, wishlist, increaseQty, decreaseQty,removeBook, addToWishlist, removeFromWishlist,numberOfBooks,totalAmount, emptyCart, addresses, setAddresses, selectedAddress, setSelectedAddress, name, setName, email, setEmail, phone, setPhone, handleCheckout, orderPlaced, orders,categoryLoading,categoryError,booksLoading,booksError,wishlistLoading,wishlistError,cartLoading,cartError,orderLoading,orderError, styles, FaHeart, FaRegHeart, toggleWishlist}}>
      {children}
    </BookContext.Provider>
  );
};
