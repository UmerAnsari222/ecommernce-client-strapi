import React from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../utils/helpers";

const Card = ({ id, name, description, img, price }) => {
  return (
    <Link to={`/product/${id}`}>
      <div className="card pcard">
        <div className="card-image">
          <img className="cimg" src={img} />
        </div>
        <div className="card-content black-text">
          <span className="card-title truncate">{name}</span>
          <p className="truncate">{description}</p>
          <h6 className="green-text">Rs {price}</h6>
        </div>
      </div>
    </Link>
  );
};

export default Card;
