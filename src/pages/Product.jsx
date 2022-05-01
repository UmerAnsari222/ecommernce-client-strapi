import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../gql/queries";
import Carousel from "@brainhubeu/react-carousel";
import { BACKEND_URL } from "../utils/helpers";
import { useCart } from "react-use-cart";
import toast, { Toaster } from "react-hot-toast";

const Product = () => {
  const { addItem } = useCart();
  const { pid } = useParams();
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      productId: pid,
    },
  });
  if (loading) return <h1>Loading...</h1>;
  const { name, price, description, images } = data.product.data.attributes;

  const addToCart = () => {
    addItem({
      id: pid,
      name,
      price,
      img: images.data[0].attributes.url,
    });
    toast.success("Add Item Successfully into cart");
  };

  return (
    <div className="container" style={{ marginBottom: "2rem" }}>
      <Toaster position="top-right" reverseOrder={false} />
      <Carousel plugins={["arrows"]}>
        {images.data.map(({ attributes }) => {
          return (
            <>
              <img
                key={attributes}
                style={{ height: "50vh" }}
                src={attributes.url}
              />
              ;
            </>
          );
        })}
      </Carousel>

      <div>
        <h3>{name}</h3>
        <h5 className="green-text" style={{ fontWeight: "bold" }}>
          Rs {price}
        </h5>
        <p>{description}</p>
        <button className="btn deep-purple" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
