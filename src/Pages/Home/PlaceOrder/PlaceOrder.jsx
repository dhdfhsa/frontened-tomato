import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";
import { StoreContext } from "../../../context/StoreContext";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, token, food_list, cartItem, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const total = subtotal + deliveryFee;

  const orderItems = useMemo(
    () =>
      food_list
        .filter((item) => cartItem[item._id] > 0)
        .map((item) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: cartItem[item._id],
          image: item.image,
        })),
    [food_list, cartItem],
  );

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!token) {
      navigate("/cart");
      return;
    }

    if (!orderItems.length) {
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/order/place`,
        {
          address: data,
          items: orderItems,
          amount: total,
        },
        { headers: { token } },
      );

      if (!response?.data) {
        console.error("Order response missing data", response);
        alert("Order gagal, silakan coba lagi.");
        return;
      }

      if (!response.data.success) {
        console.error("Order API error", response.data);
        alert(response.data.message || "Order gagal, silakan coba lagi.");
        return;
      }

      if (!response.data.session_url) {
        console.error("Stripe session_url tidak ada", response.data);
        alert("Tidak dapat membuat sesi pembayaran. Coba lagi nanti.");
        return;
      }

      window.location.replace(response.data.session_url);
    } catch (error) {
      console.error("PlaceOrder exception", error);
      alert("Terjadi kesalahan saat membuat pesanan. Coba lagi.");
    }
  };

  useEffect(() => {
   if (!token) {
    navigate('/cart')
   }
   else if(getTotalCartAmount()===0){
    navigate('/cart')
   }
  }, [token])
  
  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
          <p className='title'>Delivery Information</p>
          <div className="multi-fields">
            <input name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' required />
            <input name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' required />
          </div>
          <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email adress' required />
          <input name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required />
          <div className="multi-fields">
            <input name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
            <input name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required />
          </div>
          <div className="multi-fields">
            <input name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zipcode' required />
            <input name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required />
          </div>
          <input name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' required />
      </div>
      <div className="place-order-right">
          <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Free</p>
              <p>${deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${total}</p>
            </div>
          </div>
          <button type="submit" disabled={!orderItems.length}>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}
export default PlaceOrder
