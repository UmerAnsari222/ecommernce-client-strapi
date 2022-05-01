import React, { useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "react-use-cart";
import { BACKEND_URL } from "../utils/helpers";

import toast, { Toaster } from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51Jp4NYEkFe1dErWsVGANNIfSDMxgp6pnZPkgirvMeFJUeGOnMbcqEVasYxpFbJ59VTRGXj4dRpW1kN9Q75dwzbb100dkXDBbye"
);

const CheckoutForm = () => {
  const [formData, setFormData] = useState({});
  const stripe = useStripe();
  const elements = useElements();
  const { cartTotal, items, emptyCart } = useCart();
  const [payButton, setPayButton] = useState(true);
  const [payProcessing, setPayProcessing] = useState(false);

  let navigate = useNavigate();

  //amount,shippingAddress,city,state,pin,token
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const makePaymentRequest = async (allformData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify(allformData),
      });
      if (res.status != 200) throw Error("Payment failed");

      toast.success("Payment Successfully Done!");
      return await res.json();
    } catch (error) {
      // alert("Error: " + error.message);
      console.log(error.message);
      toast.error("Payment Failed!");
      return;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const payload = await stripe.createToken(cardElement);
    const allFormData = {
      ...formData,
      token: payload.token.id,
      amount: cartTotal,
      items: items,
    };
    // console.log(allFormData);
    setPayProcessing(true);
    await makePaymentRequest(allFormData);
    setPayProcessing(false);
    emptyCart();
    navigate("/");
  };

  if (payProcessing) return <h1>Payment is processing...</h1>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="shippingAddress"
        placeholder="shipping address"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="city"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="state"
        placeholder="state"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="pin"
        placeholder="pin code"
        onChange={handleChange}
        required
      />
      <CardElement
        onChange={(e) => {
          if (e.complete) {
            setPayButton(false);
          } else {
            setPayButton(true);
          }
        }}
      />
      <button
        style={{ marginTop: "20px", width: "100%" }}
        className="btn deep-purple"
        type="submit"
        disabled={!stripe || !elements || payButton}
      >
        Pay
      </button>
    </form>
  );
};

const Checkout = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </>
  );
};

export default Checkout;
