import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_CATEGORY } from "../gql/queries";
import Card from "../components/Card";

const ProductByCategory = () => {
  const { cid } = useParams();
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_CATEGORY, {
    variables: {
      categoryId: cid,
    },
  });
  console.log(data);
  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="homeroot">
      {data.category.data.attributes.products.data.map(({ id, attributes }) => (
        <Card
          key={id}
          id={id}
          name={attributes.name}
          price={attributes.price}
          description={attributes.description}
          img={attributes.images.data[0].attributes.url}
        />
      ))}
    </div>
  );
};

export default ProductByCategory;
