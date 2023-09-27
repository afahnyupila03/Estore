import { useParams } from "react-router-dom";
import React from "react";

import { getProdNum } from "../../Components/New Arrivals/new-data";

export default function ProductDetails({ prodId }) {
  const params = useParams();
  // const prodParams = useParams()

  let newData = getProdNum(parseInt(params.productId));

  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    const databaseUrl = `https://timezone-2cf9b-default-rtdb.europe-west1.firebasedatabase.app/arrivals.json/${prodId}.json`;

    fetch(databaseUrl)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [prodId]);

  if (!product) {
    return;
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
        <h3>
          {newData.name} : {newData.number}
        </h3>
        <p>Amount: {newData.amount} </p>
        <p>Due date: {newData.due} </p>
      </div>
      {/* Test */}

      {/* Test With Link Database */}
      <div>
        <img src={product.image} alt={product.name} />
        <h4>{product.name}</h4>
        <p>{product.price}</p>
      </div>
      {/* Test With Link Database */}
    </React.Fragment>
  );
}
