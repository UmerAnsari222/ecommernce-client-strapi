import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORY } from "../gql/queries";
import { Link } from "react-router-dom";

const Category = () => {
  const { data, loading, error } = useQuery(GET_ALL_CATEGORY);

  if (loading) return <h1>Loading category</h1>;
  return (
    <div className="category">
      {data.categories.data.map(({ id, attributes }) => {
        return (
          <Link key={id} to={`/category/${id}`}>
            <h4 className="chip btn white">{attributes.name}</h4>
          </Link>
        );
      })}
    </div>
  );
};

export default Category;
