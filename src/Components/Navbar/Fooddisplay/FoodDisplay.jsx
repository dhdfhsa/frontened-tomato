import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../../context/StoreContext';
import FoodItem from '../FooItem/FoodItem';
const FoodDisplay = ({category, searchQuery}) => {
    const {food_list}  = useContext(StoreContext)
    const normalizedQuery = searchQuery.trim().toLowerCase()
    const filteredFood = food_list.filter((item) => {
      const matchesCategory = category === "All" || category === item.category
      const matchesSearch = !normalizedQuery
        || item.name.toLowerCase().includes(normalizedQuery)
        || item.category.toLowerCase().includes(normalizedQuery)
        || item.description.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesSearch
    })

    // Debug: Log food items with images
    console.log("FoodDisplay - Total foods:", food_list.length);
    console.log("FoodDisplay - Filtered foods:", filteredFood.length);
    if (filteredFood.length > 0) {
        console.log("Sample food item:", {
            name: filteredFood[0].name,
            image: filteredFood[0].image,
            imageExists: !!filteredFood[0].image
        });
    }
  return (
    <div className='food-display' id='food-display'>
      <div className="food-display-head">
        <div>
          <h2>{normalizedQuery ? `Results for "${searchQuery}"` : 'Top dishes near you'}</h2>
          <p>
            {normalizedQuery
              ? `${filteredFood.length} matching dishes found across your menu.`
              : 'Curated picks from home chefs in your area.'}
          </p>
        </div>
        <button className="food-display-btn">View all</button>
      </div>
      <div className="food-dsiplay-list">
        {
          filteredFood.length ? filteredFood.map((item,index)=>(
            <FoodItem key={index} id={item._id} name={item.name} category={item.category} image={item.image } price={item.price} description={item.description} />
          )) : (
            <div className='food-display-empty'>
              <h3>No dishes found</h3>
              <p>Try another name, category, or keyword.</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default FoodDisplay
