import React, { useContext, useEffect, useRef, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
const Navbar = ({setShowLogin, searchQuery, setSearchQuery}) => {
  const [menu,setMenu] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  const {getTotalCartAmount,token,setToken } = useContext(StoreContext)
  const navigate  = useNavigate()
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (showSearch && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showSearch]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setShowProfileMenu(false);
    navigate("/")
  };

  return (
    <div className={`navbar${isScrolled ? ' navbar-scrolled' : ''}`}>
      <div className="navbar-brand-wrap">
        <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
        <button
          type="button"
          className={`navbar-menu-toggle${showMobileMenu ? " active" : ""}`}
          onClick={() => setShowMobileMenu((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <ul className={`navbar-menu${showMobileMenu ? " active" : ""}`}>
        <Link to='/' onClick={() => { setMenu("home"); setShowMobileMenu(false); }} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => { setMenu("menu"); setShowMobileMenu(false); }} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => { setMenu("mobile-app"); setShowMobileMenu(false); }} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => { setMenu("contact us"); setShowMobileMenu(false); }} className={menu === "contact us" ? "active" : ""}>contact us</a>
      </ul>
      <div className="navbar-right">
        <div className={`navbar-search-panel${showSearch ? " active" : ""}`}>
          <button
            type="button"
            className="navbar-search-toggle"
            onClick={() => setShowSearch((prev) => !prev)}
          >
            <img src={assets.search_icon} alt="" className="navbar-icon navbar-icon-search" />
          </button>
          <input
            ref={searchRef}
            type="text"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
        <div className="navbar-search-icon">
          <Link to='/cart'> <img src={assets.basket_icon} alt="" className="navbar-icon navbar-icon-cart" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {
          !token?<button onClick={()=>setShowLogin(true)}>sign in</button>:<div className='navbar-profile' ref={profileRef}>
            <img
              src={assets.profile_icon}
              alt=""
              onClick={() => setShowProfileMenu((prev) => !prev)}
            />
            <ul className={`nav-profile-dropdown${showProfileMenu ? " active" : ""}`}>
              <li onClick={() => {
                setShowProfileMenu(false);
                navigate('/myorders');
              }}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        }
        
      </div>
    </div>
  )
}

export default Navbar
