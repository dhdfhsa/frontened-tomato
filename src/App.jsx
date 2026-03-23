import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Home/Cart/Cart'
import PlaceOrder from './Pages/Home/PlaceOrder/PlaceOrder'
import Verify from './Pages/Home/Verify/Verify'
import LoginPopup from './Components/LoginPopup/LoginPopup';
import MyOrder from './Pages/Home/myOrder/MyOrder'

const App = () => {
  const [showLogin,setShowLogin] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin = {setShowLogin}/> : null}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path='/myorders' element = {<MyOrder/>}/>
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
