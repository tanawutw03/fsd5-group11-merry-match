import React from "react";
import stripePackage from "stripe";

function OrderPackage(props) {
  const stripe = stripePackage(process.env.Publishable_key);
  const API_PORT = "http://localhost:4008";

  const sentOrderData = async (data) => {
    const data = {
      user: {
        name: data.name,
        address: data.address,
      },
      product: {
        name: props.packageName,
        price: props.packagePrice,
        quantity: 1,
      },
    };

    const response = axios.post(`${API_PORT}/checkout`, data);
    const sessionId = response.data.session_id;
    stripe.redirectToCheckout({ sessionId });
  };

  return (
    <>
      <div>
        <div>Checkout</div>
        <input type="text" name="fullname" />
      </div>
      <div>
        <div>Address</div>
        <input type="text" name="address" />
      </div>
    </>
  );
}

export default OrderPackage;
