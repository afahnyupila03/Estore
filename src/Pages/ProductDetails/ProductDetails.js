import { useParams } from "react-router-dom";
import React from "react";


export default function ProductDetails({ prodId }) {
  const params = useParams();

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
      </div>
    </React.Fragment>
  );
}
