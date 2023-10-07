import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getArrivalItemByIdService } from "../../Services/HomeService/HomeService";

export default function ProdDetails() {
  const { productId, productName } = useParams();
  const { data, isLoading, error } = useQuery("product", () =>
  getArrivalItemByIdService(productId, productName)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No product found</div>;
  }

  return (
    <React.Fragment>
      <h3>{data.name}</h3>
      <p>Price: {data.price}</p>
      <img src={data.image} alt={data.name} />
    </React.Fragment>
  );
}
