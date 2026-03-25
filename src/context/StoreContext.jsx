import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const StoreContext = createContext(null);

const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const [food_list,setFoodList] = useState([])
  const url = apiBaseUrl
  const [token,setToken]  = useState("")

  const loadCartData = async (authToken) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token: authToken } }
    );

    if (response.data.success) {
      setCartItem(response.data.cartData || {});
    }
  };

  const addToCart = async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItem((prev) => {
      if (!prev[itemId]) return prev;
      const next = { ...prev, [itemId]: prev[itemId] - 1 };
      if (next[itemId] <= 0) {
        delete next[itemId];
      }
      return next;
    });

    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const itemInfo = food_list.find(
          (product) => product._id === item || product._id === Number(item)
        );
        if (!itemInfo) continue;
        totalAmount += itemInfo.price * cartItem[item];
      }
    }

    return totalAmount;
  };

  const fecthFoodList = async()=>{
    try {
      const response = await axios.get(url+"/api/food/list")
      console.log("API Response from /api/food/list:", response.data);
      if (response.data.data && response.data.data.length > 0) {
        console.log("First food item:", {
          name: response.data.data[0].name,
          image: response.data.data[0].image,
          imageType: typeof response.data.data[0].image
        });
      }
      setFoodList(response.data.data)
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  }

 

  useEffect(() => {
    async function loadData() {
      await fecthFoodList();

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }

    loadData();
  }, [])

  useEffect(() => {
    if (!token) {
      setCartItem({});
      return;
    }

    loadCartData(token);
  }, [token])
  
  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
