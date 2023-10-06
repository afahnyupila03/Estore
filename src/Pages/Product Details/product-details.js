import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getArrivalProductService } from "../../Services/HomeService/HomeService";

export default function ProdDetails() {
  const { productId, productName } = useParams();
  const { data, isLoading, error } = useQuery("product", () =>
  getArrivalProductService(productId, productName)
  );

  if (isLoading) {
    return <div style={{marginTop: '40rem'}}>Loading...</div>;
  }

  if (error) {
    return <div style={{marginTop: '40rem'}}>Error: {error.message}</div>;
  }

  if (!data) {
    return <div style={{marginTop: '40rem'}}>No product found</div>;
  }

  return (
    <React.Fragment>
      <div style={{marginTop: '40rem'}}>
      <h3>{data.name}</h3>
      <p>Price: {data.price}</p>
      </div>
    </React.Fragment>
  );
}
