import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../../assets/assets'
import { StoreContext } from '../../../context/StoreContext'
// import FoodItem from './FoodItem';
const FoodItem = ({id,name,image,price,description,category}) => {

    const {cartItem,addToCart,removeFromCart,url} = useContext(StoreContext)
    const itemCount = cartItem[id] || 0

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img src={`${url}/images/${image}`} className='food-item-img' alt={name} />
        {
            !itemCount
            ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white}/>
            :<div className='food-item-counter'>
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                <p>{itemCount}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
            </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-rating">
            <p>{name}</p>
            <span className="food-item-tag">{category}</span>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-des">
            {description}
        </p>
        <p className="food-item-prize">
            ${price}
        </p>
      </div>
    </div>
  )
}

export default FoodItem
