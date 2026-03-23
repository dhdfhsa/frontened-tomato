import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";

const Verify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { url, token, setCartItem } = useContext(StoreContext);
  const authToken = token || localStorage.getItem("token");

  useEffect(() => {
    const verifyPayment = async () => {
      const success = searchParams.get("success");
      const orderId = searchParams.get("orderId");

      if (!authToken || !orderId) {
        navigate("/");
        return;
      }

      try {
        const response = await axios.post(
          `${url}/api/order/verify`,
          { success, orderId },
          { headers: { token: authToken } },
        );

        if (response.data.success) {
          setCartItem({});
        }
      } catch (error) {
        console.log(error);
      } finally {
        navigate("/");
      }
    };

    verifyPayment();
  }, [authToken, navigate, searchParams, setCartItem, url]);

  return <div className="place-order">Verifying payment...</div>;
};

export default Verify;
