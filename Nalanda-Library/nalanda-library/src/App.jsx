import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
/* import Cart from './components/cart' */
import LoginUser from './components/loginUser'
/* import MyOrders from './components/myOrders' */
import NavigationBar from './components/navigationBar'
import BooksGallery from './components/booksGallery'
 import RegisterUser from './components/registerUser' 
import Transaction from './components/Transaction';
import Profile from './components/profile'


// used to register react-toastify
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { login } from './features/authSlice'

function App() {
  // use selector accepts a function which passes the store global state
  // at the moment we are interested only in auth slice
  const loginStatus = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()

  useEffect(() => {
    // first read the current sessionStorage and see if user is logged in
    if (sessionStorage['id'] && sessionStorage['id'].length > 0) {
      // update the auth slice status to true
      dispatch(login())
    }
  }, [])

  return (
    <div className='container-fluid'>
      {/* navigation bar here */}
      {/* conditional rendering */}
      {loginStatus && <NavigationBar />}
      <div className='container'>
        <Routes>
          

          {/* login component */}
          <Route path='/' element={<LoginUser />} />

          {/* register component */}
           <Route path='/register' element={<RegisterUser />} />
 
          {/* book-gallery component */}
          <Route path='/Library-gallery' element={<BooksGallery />} />

           {/* showing all data of transaction to the user where which books he have issued */}
           <Route path='/Transactions' element={<Transaction />} />

          {/* showing all data of transaction to the user where which books he have issued */}
          <Route path='/Profile' element={<Profile />} />
      
 
        </Routes>
    </div>
      <ToastContainer />
    </div>
  )
}

export default App
