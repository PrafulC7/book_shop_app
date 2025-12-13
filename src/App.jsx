import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { BookProvider } from './contexts/BookContext';
import Nav from "./components/Nav";
import Footer from "./components/Footer";
// import "./styles.css";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import BookListing from "./pages/BookListing";
import BookDetails from "./pages/BookDetails";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

function App() {
      // const {books} = useBookContext()
return (
    <BookProvider>
<Router>
  <Nav/>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/userProfile" element={<UserProfile/>} />
    <Route path="/books/:category" element={<BookListing/>} />
    <Route path="/books" element={<BookListing/>} />
    <Route path="/bookDetails/:bookTitle" element={<BookDetails/>} />
    <Route path="/wishlist" element={<Wishlist/>} />
    <Route path="/cart" element={<Cart/>} />
    <Route path="/checkout" element={<Checkout/>} />
</Routes>
<Footer/>
</Router>
    </BookProvider>
  )
}

export default App

