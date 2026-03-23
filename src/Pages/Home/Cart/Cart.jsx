import React, { useContext, useMemo, useState } from "react";
import "./Cart.css";
import { StoreContext } from "./../../../context/StoreContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cartItem, food_list, removeFromCart, getTotalCartAmount,url } = useContext(StoreContext);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = getTotalCartAmount();
  
  const discount = useMemo(() => {
    if (!promoApplied) return 0;
    return subtotal * 0.1;
  }, [promoApplied, subtotal]);

  const navigate = useNavigate()
  const handlePromoSubmit = () => {
    const normalized = promoCode.trim();
    setPromoApplied(normalized === "Safwan_Salman");
  };

  const safeDiscount = discount > 0 ? discount : 0;
  const total = subtotal + 2 - safeDiscount;

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Prize</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItem[item._id] > 0) {
            return (
              <div className="cart-items-title cart-items-item" key={item._id}>
                <img src={`${url}/images/${item.image}`} alt="" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItem[item._id]}</p>
                <p>${item.price * cartItem[item._id]}</p>
                <p onClick={()=>removeFromCart(item._id)}>x</p>
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
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
              <p>${2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Discount</p>
              <p>-${safeDiscount.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have promo code,Enter it here</p>
            <div className="cart-promocode-input">
              <input
                type="text"
                placeholder="promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={handlePromoSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
