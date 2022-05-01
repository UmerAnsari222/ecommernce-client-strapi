import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { CartProvider } from "react-use-cart";
import { BACKEND_URL } from "./utils/helpers";

const client = new ApolloClient({
  uri: `${BACKEND_URL}/graphql`,
  cache: new InMemoryCache(),
});

// const root = ReactDOM.createRoot(document.getElementById("root"));
ReactDOM.render(
  <BrowserRouter>
    <CartProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </CartProvider>
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
