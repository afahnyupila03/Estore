import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import React from "react";
import { getArrivalProductService, getPopularProductService, getProductService } from "../../Services/HomeService/HomeService";

export default function ProductDetails({ prodId }) {
  const { productId, productName } = useParams();
  const { data = [], isLoading, error } = useQuery("product", () =>
    getArrivalProductService(productId, productName)
  );

  let productDetail;
  if(isLoading) {
    productDetail = <div>Loading.....</div>
  } else if(error) {
    productDetail = <div>Error....</div>
  } else {
    productDetail = <div>{data}</div>
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
        <div style={{ marginTop: "10rem" }}>
          {productDetail}
        </div>
      </div>
    </React.Fragment>
  );
}
