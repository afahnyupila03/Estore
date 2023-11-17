import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import React from "react";
import { getArrivalProductService } from "../../Services/HomeService/HomeService";

export default function ProductDetails({ prodId }) {
  const { productId, productName } = useParams();
  const { data, isLoading, error } = useQuery("product", () =>
    getArrivalProductService(productId, productName)
  );

  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div style={{ marginTop: "40rem" }}>Error: {error.message}</div>;
  }
  if (!data) {
    return <div style={{ marginTop: "40rem" }}>No product found</div>;
  }

  return (
    <React.Fragment>
      {/* Test with Local Database */}
      <h1
        style={{
          textAlign: "center",
          marginTop: "2rem",
          marginBottom: "2rem",
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        Product Details
      </h1>
      <div className="text-center font-bold text-3xl align-items-center mb-20">
        <div style={{ marginTop: "40rem" }}>
          <h3>{data.name}</h3>
          <p>Price: {data.price}</p>
        </div>
      </div>
    </React.Fragment>
  );
}
