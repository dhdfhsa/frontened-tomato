import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./myOrder.css";
import { StoreContext } from "../../../context/StoreContext";

const MyOrder = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const authToken = token || localStorage.getItem("token");

      if (!authToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `${url}/api/order/userOrder`,
          {},
          { headers: { token: authToken } },
        );

        if (response.data.success) {
          setOrders(response.data.data || []);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, url]);

  const paidOrders = orders.filter((order) => order.payment).length;
  const totalSpent = orders.reduce((sum, order) => sum + Number(order.amount || 0), 0);

  const formatOrderItems = (items) =>
    items.map((item) => `${item.name} x ${item.quantity}`).join(" | ");

  const getStatusTone = (order) => {
    if (order.payment && order.status?.toLowerCase().includes("processing")) {
      return "cooking";
    }

    if (order.payment) {
      return "paid";
    }

    return "pending";
  };

  return (
    <div className="my-order">
      <div className="my-order-orb my-order-orb-one"></div>
      <div className="my-order-orb my-order-orb-two"></div>

      <div className="my-order-hero">
        <div className="my-order-hero-copy">
          <p className="my-order-kicker">Account</p>
          <h1>
            Your orders,
            <span> plated beautifully.</span>
          </h1>
          <p className="my-order-subtitle">
            Follow each meal from payment to preparation with a page that feels connected to the rest of your restaurant journey.
          </p>
        </div>

        <div className="my-order-insights">
          <div className="my-order-insight-card">
            <span>Total Orders</span>
            <strong>{orders.length}</strong>
          </div>
          <div className="my-order-insight-card">
            <span>Paid Orders</span>
            <strong>{paidOrders}</strong>
          </div>
          <div className="my-order-insight-card">
            <span>Total Spent</span>
            <strong>BDT {totalSpent}</strong>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="my-order-state">Loading your orders...</div>
      ) : !orders.length ? (
        <div className="my-order-state">No orders yet. Place your first order to see it here.</div>
      ) : (
        <div className="my-order-list">
          {orders
            .slice()
            .reverse()
            .map((order, index) => (
              <article className="my-order-card" key={order._id} style={{ "--card-delay": `${index * 90}ms` }}>
                <div className="my-order-card-glow"></div>

                <div className="my-order-card-top">
                  <div>
                    <p className="my-order-label">Order ID</p>
                    <h2>{order._id.slice(-8).toUpperCase()}</h2>
                  </div>
                  <span className={`my-order-badge ${getStatusTone(order)}`}>
                    {order.payment ? order.status : "Pending Payment"}
                  </span>
                </div>

                <div className="my-order-meta">
                  <p>
                    <span>Status</span>
                    {order.status}
                  </p>
                  <p>
                    <span>Date</span>
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p>
                    <span>Total</span>
                    BDT {order.amount}
                  </p>
                </div>

                <div className="my-order-story">
                  <div className="my-order-story-line"></div>

                  <div className="my-order-story-step active">
                    <div className="my-order-story-dot"></div>
                    <div>
                      <span>Cart Confirmed</span>
                      <p>{formatOrderItems(order.items)}</p>
                    </div>
                  </div>

                  <div className={`my-order-story-step ${order.payment ? "active" : ""}`}>
                    <div className="my-order-story-dot"></div>
                    <div>
                      <span>Payment</span>
                      <p>{order.payment ? "Payment received successfully." : "Waiting for payment confirmation."}</p>
                    </div>
                  </div>

                  <div className={`my-order-story-step ${order.payment ? "active" : ""}`}>
                    <div className="my-order-story-dot"></div>
                    <div>
                      <span>Kitchen Status</span>
                      <p>{order.status}</p>
                    </div>
                  </div>
                </div>

                <div className="my-order-items">
                  {order.items.map((item) => (
                    <div className="my-order-item" key={`${order._id}-${item._id}`}>
                      <div>
                        <h3>{item.name}</h3>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <strong>BDT {item.price * item.quantity}</strong>
                    </div>
                  ))}
                </div>

                <div className="my-order-address">
                  <p className="my-order-label">Delivery Address</p>
                  <p>
                    {order.address.firstName} {order.address.lastName}, {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}
                  </p>
                </div>
              </article>
            ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
