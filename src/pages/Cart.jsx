import React, { useState } from "react";
import { useCart } from "react-use-cart";
import Checkout from "../components/Checkout";

const Cart = () => {
  const [checkOut, setCheckOut] = useState(false);
  const { isEmpty, items, cartTotal, removeItem } = useCart();
  const jwt = localStorage.getItem("jwt");

  if (checkOut) {
    return (
      <div className="container">
        <h4>Payment</h4>
        <Checkout />
        <button
          style={{ marginTop: "10px", width: "100%" }}
          onClick={() => setCheckOut(false)}
          className="btn red"
        >
          Cancel
        </button>
      </div>
    );
  }

  if (isEmpty) return <h1>Cart is Empty</h1>;

  return (
    <div>
      <div className="container row">
        <ul className="collection col m8">
          {items.map((item) => (
            <li key={item.id} className="collection-item avatar">
              <img src={item.img} alt="" className="circle" />
              <span className="title">{item.name}</span>
              <p className="green-text">
                Rs {item.price} X {item.quantity} = Rs {item.itemTotal}
              </p>
              <i
                onClick={() => removeItem(item.id)}
                className="secondary-content material-icons red-text"
                style={{ cursor: "pointer" }}
              >
                remove_circle
              </i>
            </li>
          ))}
        </ul>
        <div
          className="col m3 offset-m1"
          style={{ position: "sticky", top: "2px" }}
        >
          <h4>Total Price</h4>
          <h5 className="green-text">Rs. {cartTotal}</h5>
          {jwt ? (
            <button
              onClick={() => setCheckOut(true)}
              className="btn deep-purple"
            >
              checkout
            </button>
          ) : (
            <span>Please Login to checkout</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
