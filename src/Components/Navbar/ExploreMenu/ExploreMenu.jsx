import React from 'react'
import './ExplorMenu.css'
import { menu_list } from '../../../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <div className="explore-menu-head">
          <div>
            <span className="explore-menu-pill">Curated Categories</span>
            <h1>Explore our menu</h1>
            <p className='explore-menu-sub'>Choose a category to discover home-cooked favorites.</p>
          </div>
          <button className="explore-menu-btn">View All</button>
        </div>
        <div className="explore-menu-list">
            {
                menu_list.map((item,index)=>{
                    return (
                        <div
                          onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}
                          key={index}
                          className={`explore-menu-list-item ${category===item.menu_name?"active":""}`}
                        >
                            <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default ExploreMenu
