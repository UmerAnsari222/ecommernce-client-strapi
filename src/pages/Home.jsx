import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import { GET_ALL_PRODUCTS } from "../gql/queries";

export default function Home() {
  const [page, setPage] = useState(1);
  const { loading, data, error, refetch } = useQuery(GET_ALL_PRODUCTS, {
    variables: {
      pagination: {
        page: page,
        pageSize: 3,
      },
    },
  });
  const updatePage = (page) => {
    setPage(page);
  };
  useEffect(() => {
    if (page != 1) refetch();
  }, [page]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <Search />
      <div className="homeroot">
        {data.products.data.map(({ id, attributes }) => (
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
      <Pagination
        updatePage={updatePage}
        pageCount={data.products.meta.pagination.pageCount}
      />
    </div>
  );
}
