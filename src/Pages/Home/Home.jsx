import React, { useState } from 'react'
import './Home.css'
import Header from '../../Components/Navbar/Header/Header'
import ExploreMenu from '../../Components/Navbar/ExploreMenu/ExploreMenu'
import FoodDisplay from './../../Components/Navbar/Fooddisplay/FoodDisplay';
import AppDownload from '../../Components/AppDownload/AppDownload';
const Home = ({ searchQuery }) => {
  const [category,setCategory] =useState("All")
  return (
    <div>
      <Header/>
      <ExploreMenu category = {category} setCategory = {setCategory}/>
      <FoodDisplay category = {category} searchQuery={searchQuery}/>
      <AppDownload/>
    </div>
  )
}

export default Home
